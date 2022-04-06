import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRootContext } from '../RootProvider';

const instance = axios.create({
    baseURL: "http://52.78.202.206:8080",
    headers: {
        "Content-Type": "application/json",
    },
});
instance.interceptors.request.use(
    (config) => {
        // const token = AsyncStorage.getItem('accessToken');
        // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b29ueWVzbGVAc29va215dW5nLmFjLmtyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0OTI0MjgyMn0.pZ8Q9ej9PuLlB3T-e1YYM933fiM3Z1XxIrwCSD61CVg-_UacFwtoUS_JTR1x7EllY_GYQdBQX8-rap31ah9WpA'
        // console.log('accessToken: ' + token)
        // const token = useRootContext().user.token
        // if (token && config.headers) {
        //     config.headers["Authorization"] = 'Bearer ' + token;
        // }
        // return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        //   const originalConfig = err.config;
        //   if (originalConfig.url !== "/auth/signin" && err.response) {
        //     // Access Token was expired
        //     if (err.response.status === 401 && !originalConfig._retry) {
        //       originalConfig._retry = true;
        //       try {
        //         const rs = await instance.post("/auth/refreshtoken", {
        //           refreshToken: TokenService.getLocalRefreshToken(),
        //         });
        //         const { accessToken } = rs.data;
        //         TokenService.updateLocalAccessToken(accessToken);
        //         return instance(originalConfig);
        //       } catch (_error) {
        //         return Promise.reject(_error);
        //       }
        //     }
        //   }
        return Promise.reject(err);
    }
);

const api = instance

export default api;