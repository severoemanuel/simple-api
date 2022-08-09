import type { AxiosRequestConfig } from 'axios';
import { ToastContent, ToastOptions } from 'react-toastify';
export declare type ResponseApi<T = any> = T & {
    success?: boolean;
    message?: string | string[];
};
export declare type Toast = (message: ToastContent, options?: ToastOptions) => any;
export declare type ApiConfig = AxiosRequestConfig & {
    enableRefreshToken?: boolean;
    disableIncFetch?: boolean;
    toast?: Toast;
};
export declare type IApiStorageData = {
    readonly token: string;
    readonly refreshToken: string;
};
export interface IResponseRefreshToken extends ResponseApi {
    token?: string;
    refreshToken?: string;
}
//# sourceMappingURL=types.d.ts.map