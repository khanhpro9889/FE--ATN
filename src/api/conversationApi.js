import axiosClient from './axiosClient';

export const getConversation = async (uid) => {
    const url = `http://localhost:3001/conversations`;
    try {
        const res = await axiosClient.get(url + `/${uid}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const getMessages = async ({conversationId, uid, page}) => {
    const url = `http://localhost:3001/messages`;
    try {
        const res = await axiosClient.get(url + `/${conversationId}?uid=${uid}&page=${page}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const addMessage = async (body) => {
    const url = `http://localhost:3001/messages`;
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const deleteMessage = async (uid) => {
    const url = `http://localhost:3001/messages/${uid}`;
    try {
        const res = await axiosClient.delete(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const addConversation = async (body) => {
    const url = `http://localhost:3001/conversations`;
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}