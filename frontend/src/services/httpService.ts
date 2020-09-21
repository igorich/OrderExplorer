declare var SERVICE_URL: string;
const CONNECTION_STRING = `${SERVICE_URL}/api/`;

export const HttpService = {
    async get(url: string, params?: object, responseType: string = '') {
        return await this.runFetch('GET', url, params, {}, responseType);
    },
    async put(url: string, params?: object, body?: object) {
        return await this.runFetch('PUT', url, params, body);
    },
    async post(url: string, params?: object, body?: object) {
        return await this.runFetch('POST', url, params, body);
    },
    async patch(url: string, params?: object, body?: object) {
        return await this.runFetch('PATCH', url, params, body);
    },
    async delete(url: string, params?: object) {
        return await this.runFetch('DELETE', url, params);
    },
    async runFetch(
        methodType: string,
        url: string,
        params: object = {},
        requestBody: object = {},
        responseType?: string
    ) {
        const response = await fetch(CONNECTION_STRING + url + this.getUrlParam(params), {
            method: methodType,
            headers: {
                'Content-Type': responseType ? responseType : 'application/json',
                accept: responseType ? responseType : '',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH, DELETE',
            },
            body: Object.keys(requestBody).length ? JSON.stringify(requestBody) : null,
        });

        if (!response.ok || response.status === 204) {
            try {
                const json = await response.json();
                return Promise.reject(json);
            } catch (err) {
                return Promise.reject(`${response.statusText}: ${response.url}`);
            }
        }

        if (responseType) {
            try {
                const clone = response.clone();
                return await clone.blob();
            } catch (err) {
                const config: NotificationConfig = {
                    message: 'Error during downloading report',
                    description: err,
                };
            }
        }

        try {
            return await response.json();
        } catch (err) {
            // In this case, if the response body is empty and the request returns 200 code, it returns true.
            return await JSON.stringify(response);
        }
    },
    getUrlParam(params: object): string {
        const keys = Object.keys(params);
        if (!keys.length) {
            return '';
        }
        const encodedParams = keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        return `?${encodedParams.join('&')}`;
    },
};
