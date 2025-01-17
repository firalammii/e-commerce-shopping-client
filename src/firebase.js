// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: "AIzaSyB7cJt9eKO4QZI-ztDe3ccsn9g2Xj9diJM",
// 	authDomain: "e-commerce-8430d.firebaseapp.com",
// 	projectId: "e-commerce-8430d",
// 	storageBucket: "e-commerce-8430d.firebasestorage.app",
// 	messagingSenderId: "932356102620",
// 	appId: "1:932356102620:web:723ac55bcab2ff196f9719",
// 	measurementId: "G-8J0R7FYR6N"
// };

const firebaseConfig = {
	apiKey: "AIzaSyD4nv-TH95WwfhqmbEjyxxsBZV9pCElhZk",
	authDomain: "jobify-job-board-9e312.firebaseapp.com",
	projectId: "jobify-job-board-9e312",
	storageBucket: "jobify-job-board-9e312.appspot.com",
	messagingSenderId: "377411475663",
	appId: "1:377411475663:web:4821269999b5134b16ffba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);