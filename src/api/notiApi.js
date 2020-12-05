import axiosClient from './axiosClient';

export const getNotiByUser = async (id) => {
    const url = `http://localhost:3001/notifications/user/${id}`;
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const getQuantityNotiByUser = async (id) => {
    const url = `http://localhost:3001/notifications/quantity/user/${id}`;
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

