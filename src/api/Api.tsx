// RootProvider.tsx에서 호출

import axios from 'axios'

export default function getAxiosInstance(token: string) {
    const instance = axios.create({
        baseURL: "http://13.209.48.180:8080/",
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use(
        (config) => {
            if (token && config.headers) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )

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
    return instance
}