import BaseService from './base.service'

export default class CosmeticsService extends BaseService {
    get(filter, fnSuccess, fnError) {
        return this.getApi().get(`/cosmetics?s=${filter}`)
            .then(response => fnSuccess(response))
            .catch(error => fnError(this.getMessageFromError(error, 'Error obtaining cosmetics')));
    }
}
