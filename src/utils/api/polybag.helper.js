import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;


const getPolybagsList = async () => {
	return get(`${serverURL}/polybag/list/all`);
};

const addNewPolybag = async (to, handler_id, type, weight) => {
	return post(`${serverURL}/polybag/add`, {
        to,
        handler_id,
        type,
        weight
    });
};

const getPolybagDetails = async () => {
	return post(`${serverURL}/details/get`);
};

export {
    getPolybagsList,
    addNewPolybag,
    getPolybagDetails,
};