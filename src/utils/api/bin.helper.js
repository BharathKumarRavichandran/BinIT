import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;


const getBinsList = async () => {
	return get(`${serverURL}/bin/list/all`);
};

const getBinDetails = async () => {
	return get(`${serverURL}/details/get`);
};

const updateBinDetails = async () => {
	return post(`${serverURL}/details/update`);
};

const updateBinWeight = async () => {
	return post(`${serverURL}/weight/update`);
};

export {
	getBinsList,
	getBinDetails,
	updateBinDetails,
	updateBinWeight
};