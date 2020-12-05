import axiosClient from './axiosClient';

export const login = async (body) => {
    const url = 'http://localhost:3001/auth/login';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const loginSocial = async (body) => {
    const url = 'http://localhost:3001/auth/social-login';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const signUp = async (body) => {
    const url = 'http://localhost:3001/auth/register';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const resendEmail = async (body) => {
    const url = 'http://localhost:3001/auth/resend-email';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const resetPassword = async (body) => {
    const url = 'http://localhost:3001/auth/reset';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const resetPassword2nd = async (body) => {
    const url = 'http://localhost:3001/auth/reset-2nd';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}

export const verifyRegister = async (body) => {
    const url = 'http://localhost:3001/auth/verify';
    try {
        const res = await axiosClient.post(url, body);
        return res;
    } catch(err) {
        return err;
    }
}
