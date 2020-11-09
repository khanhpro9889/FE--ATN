import { 
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_SUCCESS,
    CLEAR_PROFILE,
    UPDATE_PROFILE
} from './ProfileActionType';
import { getUserProfileApi } from '../../api/userApi';
import jwtDecode from 'jwt-decode';

export const getUserProfileRequest = () => {
    return {
        type: GET_USER_PROFILE_REQUEST
    }
}

export const getUserProfileSuccess = (userProfile) => {
    return {
        type: GET_USER_PROFILE_SUCCESS,
        payload: userProfile
    }
}

export const getUserProfileFailure = (error) => {
    return {
        type: GET_USER_PROFILE_FAILURE,
        payload: error
    }
}

export const clearProfile = () => {
    return {
        type: CLEAR_PROFILE
    }
}

export const updateProfile = (payload) => {
    return {
        type: UPDATE_PROFILE,
        payload: payload
    }
}

export const getUserProfile = () => {
    return async (dispatch) => {
        try {
            if(localStorage.getItem('token')) {
                const decoded = jwtDecode(localStorage.getItem('token'));
                dispatch(getUserProfileRequest());
                const user = await getUserProfileApi(decoded.userId);
                dispatch(getUserProfileSuccess(user));
            } 
        } catch (err) {
            dispatch(getUserProfileFailure(err));
        }
    }
}
