import Axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';

class ApiClient {
    private static instance: ApiClient;

    private axios: AxiosInstance;

    private constructor() {
        if (ApiClient.instance) {
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }

        let baseURL = '/api/';
        if (process.env.NODE_ENV === 'development') {
            baseURL = 'http://localhost:8000/';
        } else {
            baseURL = 'https://api.enwork.de/'; //process.env.REACT_APP_API_ADDRESS;
        }

        this.axios = Axios.create({
            baseURL: baseURL,
            timeout: 5000,
            headers: {}
        });

        this.axios.interceptors.response.use(
            function (response) {
                return response
            },
            function (error) {
                console.log(error);
                console.log(error.response);
                return error
            }
        );

        ApiClient.instance = this;
    }

    public static getInstance() {
        return this.instance || (this.instance = new ApiClient());
    }

    /**
     * Sends a GET-request to a given url and returns a corresponding promise.
     * @param {string} url - The url to call.
     * @param {AxiosRequestConfig} config - Some axios config object.
     * @returns {AxiosPromise} A promise of the request response.
     */
    public get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axios.get(url, config);
    }
}

export const apiClientInstance = ApiClient.getInstance();