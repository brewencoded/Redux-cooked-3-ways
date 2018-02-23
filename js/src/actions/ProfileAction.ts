import { PROFILE_PENDING, PROFILE_SUCCESS, PROFILE_FAIL } from '../constants';
import { IAction } from './IAction';
import axios from 'axios';
import { Dispatcher } from '../store/createStore';

const ProfileAction = (dispatch: Dispatcher) => async (token: string) => {
    dispatch({
        type: PROFILE_PENDING
    });
    try {
        const loginResponse = await axios.get('/api/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (loginResponse.status === 200) {
            dispatch({
                type: PROFILE_SUCCESS,
                payload: {
                    status: loginResponse.status,
                    data: loginResponse.data.profile
                }
            });
        } else {
            // What we could do here instead is dispatch different types depending on what kind
            // of error message we recieved
            dispatch({
                type: PROFILE_FAIL,
                payload: {
                    status: loginResponse.status,
                    message: loginResponse.data.message
                }
            });
        }
    } catch (e) {
        console.dir(e);
        dispatch({
            type: PROFILE_FAIL,
            payload: {
                status: e.response.status,
                message: e.response.data.message
            }
        })
    }
};

export default ProfileAction;
