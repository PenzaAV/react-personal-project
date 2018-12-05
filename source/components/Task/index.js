// Core
import React, { PureComponent } from 'react';

// Instruments
import Styles from './styles.m.css';
import palette from '../../theme/palette.css';

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

    render () {
        const { completed } = this.state;
        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#fff'
                        inlineBlock
                        onClick = { this._completeTask }
                    />
                    <input disabled type = 'text' value = { `test task` } />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        className = { Styles.toggleTaskFavoriteState }
                        inlineBlock

                    />
                    <Edit
                        className = { Styles.updateTaskMessageOnClick }
                        inlineBlock
                    />
                    <Remove inlineBlock />
                </div>

            </li>);
    }
}
