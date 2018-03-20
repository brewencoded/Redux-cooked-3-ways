import {
    LOGOUT_PENDING,
    LOGOUT_SUCCESS,
    CLEAR_STORE
} from '../constants';
import { IAction } from './IAction';

const removeToken = () => new Promise((resolve, reject) => {
    localStorage.removeItem('todoAppToken');
    resolve();
});

const LogoutAction = (dispatch) => async () => {
    dispatch({
        type: LOGOUT_PENDING
    });
    await removeToken();
    dispatch({
        type: LOGOUT_SUCCESS
    });
    dispatch({
        type: CLEAR_STORE
    });
};

export default LogoutAction;
