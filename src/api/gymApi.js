import axiosClient from './axiosClient';

export const getAllGyms = async () => {
    const url = 'http://localhost:3001/gym';
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const getAllGymsByUser = async (uid) => {
    const url = `http://localhost:3001/gym/user/${uid}`;
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const addGym = async (body) => {
    const url = 'http://localhost:3001/gym';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const deleteGym = async (id) => {
    const url = `http://localhost:3001/gym/${id}`;
    try {
        const res = await axiosClient.delete(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const getOneGym = async (id) => {
    const url = `http://localhost:3001/gym/${id}`;
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}