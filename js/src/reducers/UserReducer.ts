import {
    LOGIN_PENDING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    PROFILE_FAIL,
    PROFILE_PENDING,
    PROFILE_SUCCESS
} from '../constants';
import { IAction } from '../actions/IAction';
import IUserModel from '../models/IUserModel';
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';

const InitialState: IUserModel = {
    name: '',
    email: '',
    loginStatus: ''
};

const UserReducer = (state = InitialState, action: IAction): IUserModel => {
    if (!action) {
        return state;
    }

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
        case PROFILE_SUCCESS:
            return {
                ...state,
                name: action.payload.data.name,
                email: action.payload.data.email,
                loginStatus: LOGIN_SUCCESS
            }; 
        case PROFILE_PENDING:
            return {
                ...state,
                loginStatus: PROFILE_PENDING
            };
        case PROFILE_FAIL:
            return {
                ...state,
                loginStatus: PROFILE_FAIL
            };
        default:
            return state;
    }
};

export default UserReducer;
