import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;

const loginUser = (email, password) => {
	return post(`${serverURL}/auth/user/login`, { email, password });
};

const checkSession = async (email) => {
	return get(`${serverURL}/auth/user/session/check`, {params:{email}});
};

const registerUser = async (values) => {
	return post(`${serverURL}/auth/user/register`, values);
};

const logoutUser = async () => {
	return post(`${serverURL}/auth/user/logout`);
};

export {
	loginUser,
	registerUser,
	checkSession,
	logoutUser
};