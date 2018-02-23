import {
    FETCH_PENDING,
    FETCH_SUCCESS,
    FETCH_FAIL
} from '../constants';
import { IAction } from './IAction';
import axios from 'axios';
import { Dispatcher } from '../store/createStore';

const TodosAction = (dispatch: Dispatcher) => async (token: string) => {
    dispatch({
        type: FETCH_PENDING
    });
    try {
        const todoFetch = await axios.get('/api/todos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (todoFetch.status === 200) {
            dispatch({
                type: FETCH_SUCCESS,
                payload: {
                    status: todoFetch.status,
                    data: todoFetch.data.todos
                }
            });
        } else {
            dispatch({
                type: FETCH_FAIL,
                payload: {
                    status: todoFetch.status,
                    message: todoFetch.data.message
                }
            })
        }
    } catch (e) {
        dispatch({
            type: FETCH_FAIL,
            payload: {
                status: e.response.status,
                message: e.response.data.message
            }
        })
    }
};

export default TodosAction;
