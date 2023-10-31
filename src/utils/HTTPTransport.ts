import { BASE_API_URL } from "../config";
import { IResult } from "../types/IResult";
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

type HTTPMethod = <R = IResult>(url: string, options?: IOptionsRequest) => Promise<R>;

export class HTTPTransport {
  private readonly baseUrl: string = '';

  constructor(base_url?: string) {
    this.baseUrl = base_url || BASE_API_URL;
  }

  private request = <TResponse>(url: string, options: IOptionsRequest = { method: METHODS.GET, }, timeout = 5000) => {
    console.log({ url });
    const { method, data, headers } = options;

    return new Promise<TResponse>((resolve, reject) => {

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
          resolve(resultData as TResponse);
        }
        else resolve(xhr as TResponse);
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

  get: HTTPMethod = (url, options = {}) => {
    return this.request(this.baseUrl + url + queryString(options.params as NonNullable<unknown> || {}) || '', {
      ...options,
      method: METHODS.GET
    }, options.timeout);
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(this.baseUrl + url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(this.baseUrl + url, { ...options, method: METHODS.POST }, options.timeout);
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(this.baseUrl + url, { ...options, method: METHODS.DELETE }, options.timeout);
  };
}
