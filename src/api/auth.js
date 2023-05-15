import axios from 'axios';


const BASE_URL = process.env.REACT_APP_CRM_BACKEND_URL;

export async function userSignUp(data){
    return axios.post(`${BASE_URL}/crm/api/v1/auth/signup`,data);
}

export async function userSignIn(data){
    return axios.post(`${BASE_URL}/crm/api/v1/auth/signin`,data);
}