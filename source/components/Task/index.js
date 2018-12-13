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

    _completeTask = () => {
        const { completed } = this.state;

        this.setState({
            completed: !completed,
        });
    };
    _setTaskEditingState = () => {};
    _updateNewTaskMessage = () => {};
    _updateTask = () => {};
    _updateTaskMessageOnClick = () => {};
    _cancelUpdatingTaskMessage = () => {};
    _updateTaskMessageOnKeyDown = () => {};
    _toggleTaskCompletedState = () => {};
    _toggleTaskFavoriteState = () => {};
    _removeTask = () => {};
    render () {
        const { completed, message, favorite, id } = this.props;

        return (
            <li className = { Styles.task } id = { id }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#fff'
                        onClick = { this._completeTask }
                    />
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
