import { TOKEN_TYPE, Authorization } from 'services/auth';
import { AUTH_ROUTE } from 'components/appRouter/routes';
import { vpNotifications } from 'components';
import { NotificationConfig } from 'components/vpNotification/vpNotification';
import { once } from 'services/helper';

declare var VACATION_SERVICE_URL: string;
const CONNECTION_STRING = `${VACATION_SERVICE_URL}/api/`;
const AUTH = new Authorization();

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
        const token = await AUTH.getToken();
        if (!token) {
            this.redirectToLoginPage();
            return;
        }

        const response = await fetch(CONNECTION_STRING + url + this.getUrlParam(params), {
            method: methodType,
            headers: {
                'Content-Type': responseType ? responseType : 'application/json',
                accept: responseType ? responseType : '',
                Authorization: `${TOKEN_TYPE} ${token}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH, DELETE',
            },
            body: Object.keys(requestBody).length ? JSON.stringify(requestBody) : null,
        });

        if (response.status === 401) {
            once(this.redirectToLoginPage());
        }

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
                vpNotifications.error(err, config);
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

    redirectToLoginPage(): void {
        if (!window.location.href.includes(AUTH_ROUTE)) {
            // Prevent multiple redirects
            window.location.href = `${window.location.origin}${AUTH_ROUTE}`;
        }
    },
};