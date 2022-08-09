import { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { EnhancedStore } from '@reduxjs/toolkit';
import type { ApiConfig, IApiStorageData, ResponseApi } from './types';
export declare class SimpleApi<T extends IApiStorageData> {
    readonly appName: string;
    store?: EnhancedStore<T, import("redux").AnyAction, readonly import("redux").Middleware<{}, T, import("redux").Dispatch<import("redux").AnyAction>>[]> | undefined;
    fetchId: number;
    readonly api: AxiosInstance;
    private readonly disableIncFetch;
    private readonly enableRefreshToken;
    private readonly toast?;
    constructor(appName: string, store?: EnhancedStore<T, import("redux").AnyAction, readonly import("redux").Middleware<{}, T, import("redux").Dispatch<import("redux").AnyAction>>[]> | undefined, config?: ApiConfig);
    private setInterceptorRequest;
    /**
     * Removido implementação de refresh token
     */
    private setInterceptorResponse;
    private normalizeUrl;
    private getApiStorageData;
    getDefault<T = any>(path?: string, config?: AxiosRequestConfig): Promise<ResponseApi<T>>;
    postDefault<T = any, P = any>(path: string, payload: P, config?: AxiosRequestConfig): Promise<ResponseApi<T>>;
    putDefault<T = any, P = any>(path: string, payload: P, config?: AxiosRequestConfig): Promise<ResponseApi<T>>;
    patchDefault<T = any, P = any>(path: string, payload: P, config?: AxiosRequestConfig): Promise<ResponseApi<T>>;
    deleteDefault<T = any>(path: string, config?: AxiosRequestConfig): Promise<ResponseApi<T>>;
}
export * from './types';
//# sourceMappingURL=index.d.ts.map