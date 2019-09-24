import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;


const getHospiAccessLogs = async () => {
	return get(`${serverURL}/hospi/logs/get`);
};

export {
	getHospiAccessLogs
};