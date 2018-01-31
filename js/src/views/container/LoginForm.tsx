import * as React from 'react';
import Todo from '../../models/TodoModel';

const headerStyle: React.CSSProperties = {
    backgroundColor: '#444',
    padding: 10,
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#4caf50',
    borderColor: 'transparent',
    borderRadius: 4,
    color: 'white',
    cursor: 'pointer',
    outline: 0,
    padding: '4px',
};

const inputStyle: React.CSSProperties  = {
    padding: '4px',
    borderRadius: 4,
    border: '2px solid #888',
    outline: 0,
    marginRight: 10,
};

import {
    AddTodo
} from '../../actions';

export interface ILoginFormProps {
    login: (email: string, password: string) => void;
}

const LoginForm: React.SFC<ILoginFormProps> = ({ login }) => {
    // Input tracker
    let email: HTMLInputElement;
    let password: HTMLInputElement;

    return (
        <div style={headerStyle}>
            <input
                style={inputStyle}
                placeholder="Email"
                ref={(node) => { email = node; }}
            />
            <input
                style={inputStyle}
                placeholder="Password"
                ref={(node) => { password = node; }}
            />
            <button
                style={buttonStyle}
                onClick={() => {
                    login(email.value, password.value);
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default LoginForm;
