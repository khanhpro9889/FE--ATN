import { ADD_CONVERSATION, CLOSE, OPEN, REMOVE_CONVERSATION } from './ChatFrameActionType';

const initialState = {
    open: false,
    conversation: null
}

const ChatFrameReducer = (state = initialState, action) => {
    switch(action.type){
        case CLOSE: {
            return {
                ...state,
                open: false
            }
        }
        case OPEN: {
            return {
                ...state,
                open: true
            }
        }
        case ADD_CONVERSATION: {
            return {
                ...state,
                conversation: action.payload
            }
        }
        case REMOVE_CONVERSATION: {
            return {
                ...state,
                conversation: null
            }
        }
        default: 
            return state;
    }
}

export default ChatFrameReducer;
