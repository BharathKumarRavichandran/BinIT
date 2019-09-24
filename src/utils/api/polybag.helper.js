import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;


const getPolybagsList = async () => {
	return get(`${serverURL}/polybag/list/all`);
};

const addNewPolybag = async () => {
	return post(`${serverURL}/add`);
};

const getPolybagDetails = async () => {
	return post(`${serverURL}/details/get`);
};

const updatePolybagDetails = async () => {
	return post(`${serverURL}/details/update`);
};

export {
    getPolybagsList,
    addNewPolybag,
    getPolybagDetails,
    updatePolybagDetails
};