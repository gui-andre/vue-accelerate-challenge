import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig, CancelTokenSource } from 'axios';
import { isObject } from 'lodash-es';

export class Api {
  public optionalHeaders?: { [key: string]: any };
  private http: AxiosInstance;
  private cancelToken = axios.CancelToken;
  private disableHandleErrors?: boolean;

  constructor(baseURL?: string, disableHandleErrors?: boolean) {
    this.http = axios.create({
      baseURL: baseURL || process.env.VUE_APP_API_URL,
      timeout: 30000,
      responseType: 'json'
    });
    this.disableHandleErrors = disableHandleErrors;
    this.updateInterceptors();
  }

  public get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.http.get<T>(url, options).then(this.getData);
  }

  public post<T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
    return this.http.post(url, data, options).then(this.getData);
  }

  public put<T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
    return this.http.put(url, data, options).then(this.getData);
  }

  public upload<T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
    return this.http.put(url, data.file, options).then(this.getData);
  }

  public patch<T>(url: string, data?: any, options?: AxiosRequestConfig): Promise<T> {
    return this.http.patch(url, data, options).then(this.getData);
  }

  public delete<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    return this.http.delete(url, options).then(this.getData);
  }

  public getCancelTokenSource(): CancelTokenSource {
    return this.cancelToken.source();
  }

  public updateInterceptors() {
    this.http.interceptors.request.use(this.setHeaders);
    this.http.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  public cancelRequest(source: CancelTokenSource): boolean {
    try {
      source.cancel(`${source.token} canceled`);

      return true;
    } catch (e) {
      return false;
    }
  }

  private setHeaders = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const optionalHeaders = this.optionalHeaders || {};

    config.headers = {
      'Content-Type': 'application/json',
      ...optionalHeaders
    };

    return config;
  };

  private getData<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  private handleSuccess(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleError = (error: AxiosError): Promise<AxiosError> => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error && error.response) {
      const { data } = error.response
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (isObject(data) && data.suggestedAction && !this.disableHandleErrors) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        switch (data.suggestedAction) {
          case 'discardAccessToken':
            localStorage.removeItem('warren.accounts.accessToken');
            localStorage.removeItem('warren.accounts.customerReferralId');

            window.location.hash = '#/signin';
        }
      }

      if (data) return Promise.reject(data);
    }

    return Promise.reject(error);
  };
}

const apiSingleton = new Api();
export default apiSingleton;
