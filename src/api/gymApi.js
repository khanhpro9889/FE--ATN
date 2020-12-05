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

export const getNotApproveGym = async () => {
    const url = 'http://localhost:3001/gym?approve=false&complete=true';
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const getApproveGym = async () => {
    const url = 'http://localhost:3001/gym?approve=true&complete=true';
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const getTopRating = async () => {
    const url = 'http://localhost:3001/gym/top-rating';
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const getTopWeek = async () => {
    const url = 'http://localhost:3001/gym/top-week';
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const getNewestGyms = async () => {
    const url = 'http://localhost:3001/gym/get-newest-gym';
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const getQuantity = async () => {
    const url = 'http://localhost:3001/gym/get-quantity-hn-dn-hcm';
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

export const deleteGym1st = async (id, body) => {
    const url = `http://localhost:3001/gym/delete/${id}`;
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const deleteGym2nd = async (id, body) => {
    const url = `http://localhost:3001/gym/verify-delete/${id}`;
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

export const getOneGymToUpdate = async (id) => {
    const url = `http://localhost:3001/gym/to-update/${id}`;
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const updateGym = async (id, body) => {
    const url = `http://localhost:3001/gym/${id}`;
    try {
        const res = await axiosClient.patch(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const updateGymFormData = async (id, body) => {
    const url = `http://localhost:3001/gym/update-gym-form-data/${id}`;
    try {
        const res = await axiosClient.patch(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const findGym = async (query) => {
    const url = `http://localhost:3001/gym/search${query}`;
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const approveGym = async (id, body) => {
    const url = `http://localhost:3001/gym/approve/${id}`;
    try {
        const res = await axiosClient.patch(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const getRelativeGym = async (id) => {
    const url = `http://localhost:3001/gym/search?district=${id}&province=-1&search`;
    try {
        const res = await axiosClient.get(url);
        return res;
    } catch(err) {
        return err;
    }
}
