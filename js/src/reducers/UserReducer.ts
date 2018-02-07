import {
    LOGIN_PENDING,
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from '../constants';
import { IAction } from '../actions/IAction';
import IUserModel from '../models/IUserModel';

const InitialState: IUserModel = {
    name: '',
    email: '',
    loginStatus: ''
};

const UserReducer = (state = InitialState, action: IAction): IUserModel => {
    if (!action) {
        return state;
    }

    console.dir(action.payload);

    switch(action.type) {
        case LOGIN_PENDING:
            return {
                ...state,
                loginStatus: LOGIN_PENDING
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loginStatus: LOGIN_FAIL
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                name: action.payload.data.name,
                email: action.payload.data.email,
                loginStatus: LOGIN_SUCCESS
            };
        
        default:
            return state;
    }
};

export default UserReducer;
