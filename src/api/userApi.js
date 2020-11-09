import axiosClient from './axiosClient';

export const getUserProfileApi = async (uid) => {
    const url = 'http://localhost:3001/users';
    try {
        const res = await axiosClient.get(url + `/${uid}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const updateProfileApi = async (uid, body) => {
    const url = 'http://localhost:3001/users';
    try {
        const res = await axiosClient.post(url + `/${uid}`, body);
        return res;
    } catch(err) {
        return err;
    }
}