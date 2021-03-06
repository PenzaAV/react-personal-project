// Core
import React, { PureComponent } from "react";

// Instruments
import Styles from "./styles.m.css";
import cx from "classnames";
import { func, string, bool } from "prop-types";

// Components
import Star from "../../theme/assets/Star";
import Remove from "../../theme/assets/Remove";
import Edit from "../../theme/assets/Edit";
import Checkbox from "../../theme/assets/Checkbox";

export default class Task extends PureComponent {
    static propTypes = {
        completed:        bool.isRequired,
        favorite:         bool.isRequired,
        id:               string.isRequired,
        message:          string.isRequired,
        _removeTaskAsync: func,
        _updateTaskAsync: func,
    };

    state = {
        isTaskEditing: false,
        newMessage:    this.props.message,
    };

    taskInput = React.createRef();

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _taskInputFocus = () => {
        this.taskInput.current.focus();
    };

    _toggleTaskCompletedState = () => {
        const { completed, _updateTaskAsync } = this.props;

        const taskModel = this._getTaskShape({ completed: !completed });

        _updateTaskAsync(taskModel);
    };

    _setTaskEditingState = (boolValue) => {
        this.setState({
            isTaskEditing: boolValue,
        }, () => {
            if (boolValue) {
                this._taskInputFocus();
            }
        });
    };

    _updateNewTaskMessage = (event) => {
        this.setState({
            newMessage: event.target.value,
        });
    };

    _updateTask = () => {
        const { message, _updateTaskAsync } = this.props;
        const { newMessage } = this.state;

        if (message === newMessage) {
            this._setTaskEditingState(false);

            return null;
        }
        const task = this._getTaskShape({ message: newMessage });

        _updateTaskAsync(task);
        this._setTaskEditingState(false);
    };

    _updateTaskMessageOnClick = () => {
        const { isTaskEditing } = this.state;

        if (isTaskEditing) {
            const { newMessage } = this.state;
            const taskModel = this._getTaskShape({
                message: newMessage,
            });

            this._updateTask(taskModel);

            return null;
        }
        this._setTaskEditingState(true);
    };

    _cancelUpdatingTaskMessage = () => {
        const { message } = this.props;

        this.setState({
            newMessage:    message,
            isTaskEditing: false,
        });
    };

    _updateTaskMessageOnKeyDown = (event) => {
        const { newMessage } = this.state;
        const taskModel = this._getTaskShape({
            message: newMessage,
        });

        if (event.key === "Escape") {
            this._cancelUpdatingTaskMessage();
        }
        if (event.key === "Enter" && newMessage !== "") {
            this._updateTask(taskModel);
        }

        return null;
    };

    _toggleTaskFavoriteState = () => {
        const { favorite, _updateTaskAsync } = this.props;

        const taskModel = this._getTaskShape({ favorite: !favorite });

        _updateTaskAsync(taskModel);
    };

    _removeTask = () => {
        const { id, _removeTaskAsync } = this.props;

        _removeTaskAsync(id);
    };

    _getTaskStyles = () => {
        const { completed } = this.props;

        return cx(Styles.task, {
            [Styles.completed]: completed,
        });
    };

    render () {
        const { completed, favorite } = this.props;
        const { isTaskEditing, newMessage } = this.state;
        const taskStyles = this._getTaskStyles();

        return (
            <li className = { taskStyles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        height = { 25 }
                        width = { 25 }
                        onClick = { this._toggleTaskCompletedState }
                    />

                    <input
                        disabled = { !isTaskEditing }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { newMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 19 }
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 19 }
                        width = { 19 }
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = 'removeTask'
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 17 }
                        width = { 17 }
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
