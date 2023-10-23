import { BASE_API_URL } from "../config";
import { IResult } from "../types";
import { queryString } from "./helpers";

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type IOptionsRequest = {
  data?: unknown;
  method?: METHODS.GET | METHODS.POST | METHODS.PUT | METHODS.DELETE;
  timeout?: number;
  headers?: Record<string, string>;
  params?: object;
}

type HTTPMethod = (url: string, options?: IOptionsRequest) => Promise<IResult>

export class HTTPTransport {
  private readonly baseUrl: string = '';
  constructor(base_url?: string) {
      this.baseUrl = base_url || BASE_API_URL;
  }

  get: HTTPMethod = (url, options = {}): Promise<IResult> => {
    return this.request(this.baseUrl + url + queryString(options.params as NonNullable<unknown> || {}) || '', {
      ...options,
      method: METHODS.GET
    }, options.timeout) as Promise<IResult>;
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(this.baseUrl + url, { ...options, method: METHODS.PUT }, options.timeout) as Promise<IResult>;
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(this.baseUrl + url, { ...options, method: METHODS.POST }, options.timeout) as Promise<IResult>;
  };

  delete: HTTPMethod = (url, options = {}) => {

    return this.request(this.baseUrl + url, { ...options, method: METHODS.DELETE }, options.timeout) as Promise<IResult>;
  };

  request = (url: string, options: IOptionsRequest = { method: METHODS.GET, }, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.open(method || METHODS.GET, url);
      xhr.withCredentials = true;
      xhr.timeout = timeout;

      if (headers) {
        Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
      }



      xhr.onload = () => {
        if (xhr.getResponseHeader('content-type')?.includes('application/json')) {
          const resultData = { status: xhr.status, data: JSON.parse(xhr.responseText) };
          resolve(resultData);
        }
        else resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });

  }
}
