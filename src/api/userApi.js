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

export const deleteUser = async (uid) => {
    const url = 'http://localhost:3001/users';
    try {
        const res = await axiosClient.delete(url + `/${uid}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const getUserProfileAuthApi = async (uid) => {
    const url = 'http://localhost:3001/users/get-user-for-auth';
    try {
        const res = await axiosClient.get(url + `/${uid}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const getAllUser = async (page, search) => {
    const url = 'http://localhost:3001/users';
    try {
        const res = await axiosClient.get(url + `?page=${page}&search=${search}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const updateProfileApi = async (uid, body) => {
    const url = 'http://localhost:3001/users';
    try {
        const res = await axiosClient.patch(url + `/${uid}`, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const changeRole = async (uid, body) => {
    const url = 'http://localhost:3001/users/change-role';
    try {
        const res = await axiosClient.patch(url + `/${uid}`, body);
        return res;
    } catch(err) {
        return err;
    }
}