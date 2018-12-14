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
    state = {
        completed: false,
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
        const { completed } = this.state;

        const task = this._getTaskShape({ completed: !completed });

        console.log(!completed);

        this.props._updateTaskAsync({ task });
    };
    _setTaskEditingState = () => {};
    _updateNewTaskMessage = () => {};
    _updateTask = () => {
        const task = this._getTaskShape({});

        console.log(task);
        //this.props._updateTaskAsync(task);
    };
    _updateTaskMessageOnClick = () => {};
    _cancelUpdatingTaskMessage = () => {};
    _updateTaskMessageOnKeyDown = () => {};
    _toggleTaskFavoriteState = () => {};
    _removeTask = () => {};
    render () {
        const { completed, message, favorite, id } = this.props;

        return (
            <li className = { Styles.task } id = { id }>
                <Checkbox
                    inlineBlock
                    checked = { completed }
                    className = { Styles.toggleTaskCompletedState }
                    color1 = '#3B8EF3'
                    color2 = '#fff'
                    onClick = { this._toggleTaskCompletedState }
                />
                <div className = { Styles.content }>
                    <input disabled type = 'text' value = { message } />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        className = { Styles.toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        className = { Styles.updateTaskMessageOnClick }
                    />
                    <Remove inlineBlock />
                </div>
            </li>
        );
    }
}
