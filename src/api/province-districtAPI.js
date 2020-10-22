import axiosClient from './axiosClient';

export const getProvinces = async () => {
    const url = 'http://localhost:3001/provinces';
    try {
        const res = await axiosClient.get(url);
        return res.data.provinces;
    } catch(err) {
        return err;
    }
}

export const getDistrictsByProvince = async (code) => {
    const url = `http://localhost:3001/districts/province/${code}`;
    try {
        const res = await axiosClient.get(url);
        return res.districts;
    } catch(err) {
        return err;
    }
}