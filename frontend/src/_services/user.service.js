import config from 'config';
import { fetchWrapper } from '@/_helpers';

//const baseUrl = `http://10.57.71.85:8000/api`;
const baseUrl = `http://127.0.0.1:8000/api`;

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    sort
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
    return fetchWrapper.put(`${baseUrl}/${comp}/${id}/`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id, comp) {
    return fetchWrapper.delete(`${baseUrl}/${comp}/${id}`);
}

function sort(params, comp) {
    return fetchWrapper.post(`${baseUrl}/${comp}/sort`, params);
}


