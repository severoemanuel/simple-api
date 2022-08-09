"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleApi = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
class SimpleApi {
    constructor(appName, store, config = {}) {
        this.appName = appName;
        this.store = store;
        const { enableRefreshToken, disableIncFetch, toast } = config, options = __rest(config, ["enableRefreshToken", "disableIncFetch", "toast"]);
        this.api = axios_1.default.create(options);
        this.enableRefreshToken = !!enableRefreshToken;
        this.disableIncFetch = !!disableIncFetch;
        if (toast)
            this.toast = toast;
        this.fetchId = 0;
        this.setInterceptorRequest();
        this.setInterceptorResponse();
    }
    setInterceptorRequest() {
        this.api.interceptors.request.use((config) => {
            var _a;
            const token = (_a = this.getApiStorageData()) === null || _a === void 0 ? void 0 : _a.token;
            if (token && config.headers)
                config.headers.Authorization = `Bearer ${token}`;
            // console.log('REQUEST', `${config.baseURL}`, `${config.url}`);
            // if (config?.data) config.data = decamelcase(config.data);
            return config;
        });
    }
    /**
     * Removido implementação de refresh token
     */
    setInterceptorResponse() {
        this.api.interceptors.response.use(utils_1.responseDto, (0, utils_1.responseError)(this.toast));
    }
    normalizeUrl(path) {
        const [base = '', query = ''] = `${path}`.split('?');
        const params = new URLSearchParams(query);
        params.set('fetchId', `${this.fetchId}`);
        if (this === null || this === void 0 ? void 0 : this.disableIncFetch)
            params.delete('fetchId');
        const q = new URLSearchParams(params);
        const hasProperties = !!Array.from(q.keys()).length;
        const result = [
            base.replace(/^(.*)\/$/, '$1'),
            hasProperties ? q.toString() : '',
        ].filter((f) => !!f);
        return result.length > 1 ? result.join('?') : result[0];
    }
    getApiStorageData() {
        var _a, _b;
        const state = (_b = (_a = this === null || this === void 0 ? void 0 : this.store) === null || _a === void 0 ? void 0 : _a.getState) === null || _b === void 0 ? void 0 : _b.call(_a);
        return {
            token: (state === null || state === void 0 ? void 0 : state.token) || '',
            refreshToken: (state === null || state === void 0 ? void 0 : state.refreshToken) || '',
        };
    }
    getDefault(path, config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchId += 1;
            const url = this.normalizeUrl(path);
            const response = yield this.api.get(url, config);
            return response && response.data;
        });
    }
    postDefault(path, payload, config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchId += 1;
            const url = this.normalizeUrl(path);
            const response = yield this.api.post(url, payload, config);
            return response && response.data;
        });
    }
    putDefault(path, payload, config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchId += 1;
            const url = this.normalizeUrl(path);
            const response = yield this.api.put(url, payload, config);
            return response && response.data && response.data;
        });
    }
    patchDefault(path, payload, config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchId += 1;
            const url = this.normalizeUrl(path);
            const response = yield this.api.patch(url, payload, config);
            return response && response.data;
        });
    }
    deleteDefault(path, config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchId += 1;
            const url = this.normalizeUrl(path);
            const response = yield this.api.delete(url, config);
            return response && response.data;
        });
    }
}
exports.SimpleApi = SimpleApi;
__exportStar(require("./types"), exports);
