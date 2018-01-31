import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants';
import { IAction } from './IAction';
import axios from 'axios';

const Login = (dispatch) => async (email: string, password: string) => {
    try {
        const loginResponse = await axios.get(`/api/login?email=${email}&password=${password}`, {});
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                status: loginResponse.status,
                data: loginResponse.data.profile,
                token: loginResponse.data.token
            }
        });
    } catch (e) {
        dispatch({
            type: LOGIN_FAIL,
            payload: {
                status: e.response.status,
                message: e.response.data.message
            }
        })
    }
}
export default Login;
