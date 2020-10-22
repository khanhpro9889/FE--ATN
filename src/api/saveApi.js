import axiosClient from './axiosClient';

export const getSavesByUser = async (uid) => {
    const url = 'http://localhost:3001/saves/user';
    try {
        const res = await axiosClient.get(url + `/${uid}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const addSave = async (body) => {
    const url = 'http://localhost:3001/saves';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const deleteSave = async (id) => {
    const url = `http://localhost:3001/saves/${id}`;
    try {
        const res = await axiosClient.delete(url);
        return res;
    } catch(err) {
        return err;
    }
}
