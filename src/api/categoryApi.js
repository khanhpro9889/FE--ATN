import axiosClient from './axiosClient';

export const getAllcategories = async () => {
    const url = 'http://localhost:3001/category';
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const addCategory = async (body) => {
    const url = 'http://localhost:3001/category';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const deleteCategory = async (id) => {
    const url = `http://localhost:3001/category/${id}`;
    try {
        const res = await axiosClient.delete(url);
        return res;
    } catch(err) {
        return err;
    }
}
