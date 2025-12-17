import { API_BASE_URL, STORAGE_KEYS } from '@/libs/config';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.setupInterceptors()
    }

    private async clearAuthData() {
        try {
            await SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN)
            await SecureStore.deleteItemAsync(STORAGE_KEYS.USER)
        } catch (error) {
            console.log("Error clering auth data : ", error);
        }
    }

    private handleError(error: any): Error {
        if (error.response) {
            const message = error.response.data?.message || 'An error occurred';
            return new Error(message);
        } else if (error.request) {
            return new Error('No response received from server');
        } else {
            return new Error(error.message || "An unexpected error occured")
        }
    }

    private setupInterceptors() {
        this.client.interceptors.request.use(
            async (config) => {
                try {
                    const token = await SecureStore.getItemAsync(STORAGE_KEYS.TOKEN)
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`
                    }

                    console.log("[API_REQUEST]", config.method?.toUpperCase(), config.url, {
                        headers: config.headers,
                        params: config.params,
                        data: config.data
                    });

                } catch (error) {
                    console.log("Error getting token:", error)
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        this.client.interceptors.response.use(
            (respone: AxiosResponse) => {
                console.log("[API_RESPONSE]", respone.status, respone.config.url, respone.data);
                return respone
            },
            async (error: AxiosError) => {
                console.log("[API_ERROR]", error.config?.url, error.response?.status, error.response?.data);
                if (error.response?.status === 401) {
                    await this.clearAuthData()
                }
            }
        )
    }

    async get<T>(url: string): Promise<T> {
        try {
            const response = await this.client.get(url)
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    async post<T>(url: string, data?: any): Promise<T> {
        try {
            const response = await this.client.post(url, data)
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    async put<T>(url:string, data?:any): Promise<T> {
        try {
            const response = await this.client.put(url,data)
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    async delete<T>(url:string): Promise<T> {
        try {
            const response = await this.client.delete(url)
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    async postFormData<T>(url:string, formData:FormData): Promise<T> {
        try {
            const response = await this.client.post(url,formData,{
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            })
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }
}
export const apiClient = new ApiClient()
