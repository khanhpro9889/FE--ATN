import axiosClient from './axiosClient';

export const getAllUtilities = async () => {
    const url = `http://localhost:3001/utility`;
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}