import React, { Component, createContext } from "react";

const { Provider, Consumer } = createContext();

const fromContext = (Enhanceable) => {
    return class WithProfile extends Component {
        render () {
            return (
                <Consumer>
                    {(context) => <Enhanceable { ...context } { ...this.props } />}
                </Consumer>
            );
        }
    };
};

export { Provider, Consumer, fromContext };
