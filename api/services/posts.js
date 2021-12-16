// @ts-check
const { backendUrl: baseURL} = require('../../config');
const { randomGenerator} = require('../helpers/random');
const { dogImageToBackendResponse } = require('../helpers/backend');
const { datadogRecordExternalApiResponse } = require('../helpers/metrics');
const restclient = require('../helpers/restclient');

/**
 * Servicio que obtiene los datos del backend.
 * 
 * @param {string} path endpoint que invoca el servicio.
 * @returns {Promise<Array<{ id: number, title: string, image: string, tag: string, date: string }>>} Una promesa cumplida (fulfilled) con una lista de posts o una promesa rechazada (rejected) con un error. 
 */
async function getPosts(path) {
    const { failureCondition, imageCount } = randomGenerator();

    if (failureCondition) { // falla con los multiplos de 5
        throw new Error('Validation fails!');
    }

    // Hago un apicall a la api publica https://dog.ceo/dog-api/documentation/
    // para obtener las imagenes.
    const startTime = new Date();
    const { data: responseBody } = await restclient
        .get(`/api/breeds/image/random/${imageCount}`, { baseURL })
        .then(response => {
            const elapsedTime = new Date().getDate() - startTime.getDate();
            const metricConfig = {
                api: 'dog-api', action: 'get_random_dogs', statusCode: response.status, path, time: elapsedTime,
            };
            datadogRecordExternalApiResponse('success', metricConfig);
            return response;
        })
        .catch(err => {
            const statusCode = (err.response && err.response.status);
            const elapsedTime = new Date().getDate() - startTime.getDate();
            const metricConfig = {
                api: 'dog-api', action: 'get_random_dogs', statusCode, path, time: elapsedTime,
            };
            datadogRecordExternalApiResponse('error', metricConfig);
            throw err;
        });

    const { message } = responseBody;
    return message.map(dogImageToBackendResponse);
}

module.exports = { getPosts };