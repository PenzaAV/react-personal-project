// Core
import React, { PureComponent } from "react";

// Instruments
import Styles from "./styles.m.css";

// Components
import Star from "../../theme/assets/Star";
import Remove from "../../theme/assets/Remove";
import Edit from "../../theme/assets/Edit";
import Checkbox from "../../theme/assets/Checkbox";

export default class Task extends PureComponent {
    taskInput = React.createRef();

    state = {
        isTaskEditing: false,
        newMessage:    this.props.message,
    };

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

    _toggleTaskCompletedState = () => {
        const { completed } = this.props;

        const taskModel = this._getTaskShape({ completed: !completed });

        this.props._updateTaskAsync(taskModel);
    };
    _setTaskEditingState = (bool) => {
        this.setState({
            isTaskEditing: bool,
        });

        if (bool) {
            this.taskInput.current.focus();
        }
    };
    _updateNewTaskMessage = () => {
        this.setState({
            newMessage: this.taskInput.current.value,
        });
    };
    _updateTask = () => {
        // const task = this._getTaskShape({});
        //
        // console.log(task);
        // this.props._updateTaskAsync(task);
    };
    _updateTaskMessageOnClick = () => {
        const { isTaskEditing } = this.state;

        if (!isTaskEditing) {
            this._setTaskEditingState(true);
        }
    };
    _cancelUpdatingTaskMessage = () => {};
    _updateTaskMessageOnKeyDown = () => {};
    _toggleTaskFavoriteState = () => {
        const { favorite } = this.props;

        const taskModel = this._getTaskShape({ favorite: !favorite });

        this.props._updateTaskAsync(taskModel);
    };
    _removeTask = () => {
        this.props._removeTaskAsync(this.props.id);
    };

    _handleTaskMessageKeydown = (event) => {
        switch (event.key) {
            case "Enter":
                this._updateTaskMessageOnKeyDown();
                break;
            case "Escape":
                this._cancelUpdatingTaskMessage();
                break;
            default:
                break;
        }
    };

    render () {
        const { completed, favorite, id } = this.props;
        const { isTaskEditing, newMessage } = this.state;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleTaskCompletedState }
                    />

                    <input
                        disabled = { !isTaskEditing }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { newMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._handleTaskMessageKeydown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
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
