import axiosInstance from 'axios'
const baseURL = 'http://localhost:3500/api';
const prodResourceURL = 'http://localhost:3500/images/products/';
// const baseURL = 'https://eco-server-thwo.onrender.com';
// const prodResourceURL = 'https://eco-server-thwo.onrender.com/images/products/';


const axios = axiosInstance.create({
	baseURL,
	headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
	withCredentials: true,
});

const axiosInterceptor = axiosInstance.create({
	baseURL,
	headers: { 'Content-Type': 'application/json', },
	withCredentials: true,

});

// axiosInterceptor.interceptors.request.use((config) => {
// 	if (!config.headers.Authorization || !config) {
// 		const authData = JSON.parse(localStorage.getItem('authData'));
// 		config.headers['Authorization'] = `Bearer ${authData?.accessToken}`;
// 	}
// 	return config;
// }, (error) => Promise.reject(error));
// 
// axiosInterceptor.interceptors.response.use(
// 	response => response,
// 	async (error) => {
// 		const prevRequest = error?.config;
// 		if (error?.response?.status === 403 && !prevRequest?.sent) {
// 			prevRequest.sent = true;
// 			try {
// 				const { data } = await axiosInterceptor.get(URL.refreshURL);
// 				localStorage.setItem('authData', JSON.stringify(data));
// 				prevRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
// 				return axiosInterceptor(prevRequest);
// 			} catch (error) {
// 				console.error(error);
// 				if (error?.response?.status === 401) {
// 					store.dispatch(signOut());
// 				}
// 			}
// 		}
// 		return Promise.reject(error);
// 	});

export { axios, axiosInterceptor, baseURL, prodResourceURL };
