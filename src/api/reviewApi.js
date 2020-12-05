import axiosClient from './axiosClient';

export const getReviewsByGym = async (id) => {
    const url = 'http://localhost:3001/reviews/get-reviews-by-gym';
    try {
        const res = await axiosClient.get(url + `/${id}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const getReviewsByUser = async (uid) => {
    const url = 'http://localhost:3001/reviews/user';
    try {
        const res = await axiosClient.get(url + `/${uid}`);
        return res;
    } catch(err) {
        return err;
    }
}

export const addReview = async (body) => {
    const url = 'http://localhost:3001/reviews';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const deleteReview = async (id) => {
    const url = `http://localhost:3001/reviews/${id}`;
    try {
        const res = await axiosClient.delete(url);
        return res;
    } catch(err) {
        return err;
    }
}

export const updateReview = async (id, body) => {
    const url = `http://localhost:3001/reviews/${id}`;
    try {
        const res = await axiosClient.patch(url, body);
        return res;
    } catch(err) {
        return err;
    }
}
