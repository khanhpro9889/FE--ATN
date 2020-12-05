import axiosClient from './axiosClient';

export const getRepliesByReview = async (id) => {
    const url = 'http://localhost:3001/replies/get-replies-by-review';
    try {
        const res = await axiosClient.get(url + `/${id}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const addReply = async (body) => {
    const url = 'http://localhost:3001/replies';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const deleteReply = async (id) => {
    const url = `http://localhost:3001/replies/${id}`;
    try {
        const res = await axiosClient.delete(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const updateReply = async (id, body) => {
    const url = `http://localhost:3001/replies/${id}`;
    try {
        const res = await axiosClient.patch(url, body);
        return res;
    } catch(err) {
        return err;
    }
}
