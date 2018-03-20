import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants';
import { IAction } from './IAction';
import axios from 'axios';
import { Dispatcher } from '../store/createStore';
import TodosAction from './TodosAction';

const setToken = (token: string) => {
    localStorage.setItem('todoAppToken', token);
};

const Login = (dispatch: Dispatcher) => async (email: string, password: string) => {
    dispatch({
        type: LOGIN_PENDING
    });
    try {
        const loginResponse = await axios.get(`/api/login?email=${email}&password=${password}`, {});
        if (loginResponse.status === 200) {
            setToken(loginResponse.data.token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    status: loginResponse.status,
                    data: loginResponse.data.profile,
                    token: loginResponse.data.token
                }
            });
            const fetchTodos = TodosAction(dispatch);
            fetchTodos(loginResponse.data.token);
        } else {
            dispatch({
                type: LOGIN_FAIL,
                payload: {
                    status: loginResponse.status,
                    message: loginResponse.data.message
                }
            })
        }
    } catch (e) {
        const status = e.response ? e.response.status : 500;
        const message = e.response ? e.response.message : e.message;
        dispatch({
            type: LOGIN_FAIL,
            payload: {
                status,
                message
            }
        })
    }
};

export default Login;
