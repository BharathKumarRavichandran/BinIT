import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;


const getWmcAccessLogs = async () => {
	return get(`${serverURL}/wmc/logs/get`);
};

export {
	getWmcAccessLogs
};