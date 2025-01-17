import { axios } from './axios';

export const fileUploader = async (file, url) => {
	console.log(file);
	const { error, data } = await axios.post(url, file, { headers: { 'Content-Type': 'multipart/form-data' } });

	console.log(error, data);
};