"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseError = exports.responseDto = void 0;
const camelcase_keys_1 = __importDefault(require("camelcase-keys"));
function responseDto(res) {
    var _a;
    const axiosData = res && (res === null || res === void 0 ? void 0 : res.data);
    if (((_a = res === null || res === void 0 ? void 0 : res.config) === null || _a === void 0 ? void 0 : _a.responseType) === 'blob') {
        return res;
    }
    const data = Object.assign(Object.assign(Object.assign({}, axiosData), { success: !!((res === null || res === void 0 ? void 0 : res.status) < 400) }), (0, camelcase_keys_1.default)(axiosData, { deep: true }));
    return Object.assign(Object.assign({}, res), { data });
}
exports.responseDto = responseDto;
function responseError(toast) {
    return (error) => {
        var _a, _b;
        const response = error && (error === null || error === void 0 ? void 0 : error.response);
        const message = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message;
        let errorMessage = message;
        if (!errorMessage)
            errorMessage = error ? `${error.code || error.message}` : 'TIMEOUT';
        if (error === null || error === void 0 ? void 0 : error.code) {
            errorMessage = ['ECONNABORTED'].includes(error === null || error === void 0 ? void 0 : error.code)
                ? 'Aplicativo Offline'
                : errorMessage;
        }
        const data = { success: false, message: errorMessage };
        if (!response)
            return Promise.resolve({ data });
        if (Array.isArray(errorMessage)) {
            let count = 200;
            errorMessage.forEach((message) => {
                toast === null || toast === void 0 ? void 0 : toast(message, { type: 'error', delay: count, autoClose: 3000 });
                count += 200;
            });
        }
        else
            toast === null || toast === void 0 ? void 0 : toast(errorMessage, { type: 'error' });
        return Promise.resolve(response);
    };
}
exports.responseError = responseError;
