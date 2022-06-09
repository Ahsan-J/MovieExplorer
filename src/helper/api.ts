import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'react-native-config';

export interface IApiParam {
  path?: AxiosRequestConfig['url'];
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  cancelToken?: AxiosRequestConfig['cancelToken'],
  onUploadProgress?: AxiosRequestConfig['onUploadProgress'],
  onDownloadProgress?: AxiosRequestConfig['onDownloadProgress'],
  headers?: AxiosRequestConfig['headers'],
  responseType?: 'arraybuffer' | 'document' | 'json' | 'text' | 'stream' | 'blob'
}

export const apiCall = (params: IApiParam, onSuccess?: Function, onFailure?: Function) => new Promise<AxiosResponse['data']>((resolve, reject) => {
  const requestingObject: AxiosRequestConfig = {
    url: Config.BASE_URL,
    headers: params.headers,
    method: params.method ? params.method : 'GET',
    data: params.data || undefined,
    params: {
        apikey: Config.API_KEY,
    },
    responseType: params.responseType || "json",
  };

  if (params.params) Object.assign(requestingObject.params, params.params);

  return axios(requestingObject)
    .then((response: AxiosResponse) => {
      // OnSuccess common validations
      if (onSuccess) onSuccess(response.data, params);
      else console.log("onSuccess", requestingObject.url, response.data)
      resolve(response.data);
    })
    .catch((err: AxiosError) => {
      // onFailure common validations
      if (onFailure) onFailure(err, params);
      else console.log("onFailure", requestingObject.url, err, err.response?.data)
      reject(err);
    });
});
