// Core
import React, { Component } from "react";

//Components
import Task from "../../components/Task";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    state = {
        newTaskMessage:  "",
        tasksFilter:     "",
        isTasksFetching: false,
        tasks:           [],
    };

    componentDidMount () {
        this._fetchTasksAsync();
        console.log(this.state);
    }
    _updateTasksFilter = (event) => {
        this.setState({
            tasksFilter: event.target.value,
        });
    };
    _updateNewTaskMessage = (event) => {
        this.setState({
            newTaskMessage: event.target.value,
        });
        console.log(this.state);
    };
    _setTasksFetchingState = (bool) => {
        this.setState({
            isTasksFetching: bool,
        });
    };

    _createTaskAsync = async (event) => {
        const { newTaskMessage } = this.state;

        console.log(newTaskMessage);
        if (!newTaskMessage) {
            return null;
        }
        event.preventDefault();
        this._setTasksFetchingState(true);
        const newTask = await api.createTask(newTaskMessage);

        this.setState({
            tasks:          newTask,
            newTaskMessage: "",
        });
    };

    _fetchTasksAsync = async () => {
        this._setTasksFetchingState(true);
        const tasks = await api.fetchTasks();

        this.setState({
            tasks,
        });
        this._setTasksFetchingState(false);
    };
    render () {
        const { tasks } = this.state;

        const tasksJSX = tasks.map((task) => {
            const { id, completed, favorite, message } = task;

            return (
                <Task
                    completed = { completed }
                    favorite = { favorite }
                    id = { id }
                    key = { id }
                    message = { message }
                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            type = 'search'
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                placeholder = { `Описание новой задачи` }
                                type = 'text'
                                onInput = { this._updateNewTaskMessage }
                            />
                            <button type = 'submit'>Добавить задачу</button>
                        </form>
                        <ul>
                            <div>{tasksJSX}</div>
                        </ul>
                    </section>
                </main>
            </section>
        );
    }
}
