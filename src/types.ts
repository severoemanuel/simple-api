import type { AxiosRequestConfig } from 'axios'
import { ToastContent, ToastOptions } from 'react-toastify'

export type ResponseApi<T = any> = T & {
  success?: boolean
  message?: string | string[]
}

export type Toast = (message: ToastContent, options?: ToastOptions) => any

export type ApiConfig = AxiosRequestConfig & {
  enableRefreshToken?: boolean
  disableIncFetch?: boolean
  toast?: Toast
}

export type IApiStorageData = {
  readonly token: string
  readonly refreshToken: string
}

export interface IResponseRefreshToken extends ResponseApi {
  token?: string
  refreshToken?: string
}
