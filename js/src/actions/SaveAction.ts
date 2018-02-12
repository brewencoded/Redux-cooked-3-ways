import {
    SAVE_PENDING,
    SAVE_SUCCESS,
    SAVE_FAIL
} from '../constants';
import { IAction } from './IAction';
import axios from 'axios';

const SaveAction = (dispatch) => async (todos, token) => {
    dispatch({
        type: SAVE_PENDING
    });
    try {
        const loginResponse = await axios.post(`/api/todos`, {
            todos
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (loginResponse.status === 200) {
            dispatch({
                type: SAVE_SUCCESS,
                payload: {
                    status: loginResponse.status
                }
            });
        } else {
            dispatch({
                type: SAVE_FAIL,
                payload: {
                    status: loginResponse.status,
                    message: loginResponse.data.message
                }
            })
        }
    } catch (e) {
        dispatch({
            type: SAVE_FAIL,
            payload: {
                status: e.response.status,
                message: e.response.data.message
            }
        })
    }
};

export default SaveAction;
