import { AxiosError, AxiosResponse } from 'axios';
import { Toast } from './types';
export declare function responseDto(res: AxiosResponse): AxiosResponse;
export declare function responseError<T>(toast?: Toast): (error?: AxiosError<any>) => Promise<{
    data: any;
}>;
//# sourceMappingURL=utils.d.ts.map