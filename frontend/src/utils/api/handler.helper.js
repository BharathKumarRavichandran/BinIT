import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;


const getHandlersList = async () => {
	return get(`${serverURL}/handler/list/all`);
};

export {
	getHandlersList
};