import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants';
import { IAction } from './IAction';
import axios from 'axios';
import { Dispatcher } from '../store/createStore';

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
        dispatch({
            type: LOGIN_FAIL,
            payload: {
                status: e.response.status,
                message: e.response.data.message
            }
        })
    }
};

export default Login;
