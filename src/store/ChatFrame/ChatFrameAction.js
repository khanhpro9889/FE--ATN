import { CLOSE, OPEN, REMOVE_CONVERSATION, ADD_CONVERSATION } from './ChatFrameActionType';

export const close = () => {
    return {
        type: CLOSE
    }
}

export const open = () => {
    return {
        type: OPEN
    }
}

export const addConversationStore = (payload) => {
    return {
        type: ADD_CONVERSATION,
        payload: payload
    }
}

export const removeConversation = () => {
    return {
        type: REMOVE_CONVERSATION
    }
}