import {
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_FAILURE,
    GET_USER_PROFILE_SUCCESS,
    CLEAR_PROFILE,
    UPDATE_PROFILE
} from './ProfileActionType';

const initialState = {
    loading: false,
    userProfile: null,
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                userProfile: action.payload
            }
        case GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                userProfile: null
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                userProfile: null
            }   
        case UPDATE_PROFILE:
            return {
                ...state,
                userProfile: action.payload
            } 
        default:
            return state;
    }
}

export default profileReducer;