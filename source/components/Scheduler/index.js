// Core
import React, { Component } from 'react';

//Components
import Task from 'components/Task';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    state = {
        tasks: {},
    };
    componentDidMount () {
        this.setState({
            tasks: api.fetchTasks(),
        });
    }

    render () {
        console.log(this.state);
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input type = 'search' />
                    </header>
                    <section>
                        <form>
                            <input placeholder = { `Описание новой задачи` } type = 'text' />
                            <button>Добавить задачу</button>
                        </form>
                        <ul>
                            <div>
                                <Task completed = { false } favorite = { false } id = { '1' } message = { `test task` } />
                            </div>
                        </ul>
                    </section>
                </main>
            </section>
        );
    }
}
