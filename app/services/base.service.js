const config = require('../../config/general.config');
import axios from 'axios';

export default class BaseService {
    _api;
    _baseURL;

    constructor() {
        this._baseURL = `${config.api_url}`;
        this._api = axios.create({
            baseURL: this._baseURL
        });
    }

    getBaseURL = () => this._baseURL;

    getApi = () => this._api;

    getMessageFromError = (error, defaultMessage = 'Error') => {
        let message = defaultMessage;

        if (error.response === undefined)
            message += `: the server is unreachable or your connection is lost`;
        else if (error.response && error.response.data && error.response.data.message)
            message += `: ${error.response.data.message}`;

        return message;
    }
}
