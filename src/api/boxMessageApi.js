import axiosClient from './axiosClient';

export const getByGym = async (id) => {
    const url = `http://localhost:3001/box-message/gym/${id}`;
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const addMessage = async (body) => {
    const url = 'http://localhost:3001/box-message';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const deleteMessage = async (id) => {
    const url = `http://localhost:3001/box-message/${id}`;
    try {
        const res = await axiosClient.delete(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const updateMessage = async (id, body) => {
    const url = `http://localhost:3001/box-message/${id}`;
    try {
        const res = await axiosClient.patch(url, body);
        return res;
    } catch(err) {
        return err;
    }
}
