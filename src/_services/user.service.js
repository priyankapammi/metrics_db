import config from 'config';
import { fetchWrapper } from '@/_helpers';

const baseUrl = `http://127.0.0.1:8000/api`;

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll(comp) {
    return fetchWrapper.get(`${baseUrl}/${comp}/`);
}

function getById(id, comp) {
    return fetchWrapper.get(`${baseUrl}/${comp}/${id}`);
}

function create(params, comp) {
    return fetchWrapper.post(`${baseUrl}/${comp}/`, params);
}

function update(id, params, comp) {
    return fetchWrapper.put(`${baseUrl}/${comp}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id, comp) {
    return fetchWrapper.delete(`${baseUrl}/${comp}/${id}`);
}

function sortUsers(params) {
    console.log('params', params)
    return fetchWrapper.post(`${baseUrl}/sort`, params);
}

function usersFilter(params) {
    console.log('usersFilter', params)
    if (params !== null) {
        return fetchWrapper.post(`${baseUrl}/filterUser`, params);
    }

}


