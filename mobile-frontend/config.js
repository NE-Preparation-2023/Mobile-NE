import axios from "axios";
import * as SecureStorage from 'expo-secure-store';

export const axiosInstance = axios.create({
    baseURL: "http://192.168.0.226:2500",
    headers: {
        Authorization: SecureStorage.getItemAsync("token")
    }
})
export default axiosInstance;