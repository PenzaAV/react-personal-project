// Core
import React, { Component } from "react";
import { func, string, number, array } from "prop-types";
//Components
import Task from "../../components/Task";
import Checkbox from "../../theme/assets/Checkbox";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST";
import Spinner from "../Spinner"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    state = {
        newTaskMessage:  "",
        tasksFilter:     "",
        isTasksFetching: false,
        tasks:           [],
    };

    componentDidMount () {
        this._fetchTasksAsync();
        console.log(typeof this.state.tasks);
    }
    _getAllCompleted = () => {
        const { tasks } = this.state;
        const hasTasksIncomplete = tasks.some((task) => {
            return task.completed === false;
        });

        return !hasTasksIncomplete;
    };
    _updateTasksFilter = (event) => {
        this.setState({
            tasksFilter: event.target.value.toLowerCase(),
        });
    };
    _updateTaskAsync = async (taskModel) => {
        this._setTasksFetchingState(true);
        const updatedTask = await api.updateTask(taskModel);

        this.setState(({ tasks }) => ({
            tasks: tasks.map(
                (task) => task.id === updatedTask.id ? updatedTask : task
            ),
        }));
        this._setTasksFetchingState(false);
    };
    _removeTaskAsync = async (taskId) => {
        this._setTasksFetchingState(true);
        await api.removeTask(taskId);
        this.setState(({ tasks }) => ({
            tasks: tasks.filter((task) => task.id !== taskId),
        }));
        this._setTasksFetchingState(false);
    };
    _completeAllTasksAsync = async () => {
        const notCompletedTasks = this.state.tasks.filter((task) => {
            return !task.completed;
        });

        if (notCompletedTasks.length === 0) {
            return null;
        }
        this._setTasksFetchingState(true);
        console.log(notCompletedTasks);
        await api.completeAllTasks(notCompletedTasks);

        const completedTasks = this.state.tasks.map((task) => {
            task.completed = true;

            return task;
        });

        this.setState({
            tasks: completedTasks,
        });
        this._setTasksFetchingState(false);
    };

    _updateNewTaskMessage = (event) => {
        this.setState({
            newTaskMessage: event.target.value,
        });
    };
    _setTasksFetchingState = (bool) => {
        this.setState({
            isTasksFetching: bool,
        });
    };

    _createTaskAsync = async (event) => {
        const { newTaskMessage } = this.state;

        if (!newTaskMessage) {
            return null;
        }
        event.preventDefault();
        this._setTasksFetchingState(true);
        const newTask = await api.createTask(newTaskMessage);

        this.setState({
            tasks:          [newTask, ...this.state.tasks],
            newTaskMessage: "",
        });
        this._setTasksFetchingState(false);
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
                    _removeTaskAsync = { this._removeTaskAsync }
                    _updateTaskAsync = { this._updateTaskAsync }
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
                <Spinner isSpinning = { this.state.isTasksFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { this.state.tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { this.state.newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <ul>
                            <div>{tasksJSX}</div>
                        </ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { false }
                            color1 = '#363636'
                            color2 = '#fff'
                            height = { 25 }
                            width = { 25 }
                            onClick = { this._completeAllTasksAsync }
                        />
                    </footer>
                </main>
            </section>
        );
    }
}
