// @ts-check
const logger = require('../helpers/logger');

/**
 * Incrementa un contador de datadog.
 *
 * @param {String} metricName nombre de la metrica
 * @param {Array<string>} customTags ['key:value', 'key2:value2']
 */
function datadogRecordIncrement(metricName, customTags) {
    // (por ahora es una funcion dummy, la idea es que use la lib statd)
    logger.info('METRIC INCREMENT >>', metricName, ...customTags);
}

/**
 * Incrementa un histograma de datadog.
 * 
 * @param {String} metricName nombre de la metrica
 * @param {number} time nombre de la metrica
 * @param {Array<string>} customTags ['key:value', 'key2:value2']
 */
function datadogRecordHistogram(metricName, time, customTags) {
    // (por ahora es una funcion dummy, la idea es que use la lib statd)
    logger.info('METRIC HISTOGRAM INCREMENT >>', metricName, time, ...customTags);
}

/**
 * Es un contador para armar una metrica de las respuestas del server
 * 
 * @param {'success'|'error'|'error_unhandled'} type 
 * @param {{ statusCode:number, path:string, redirect:'redirect'|'no-redirect', redirectUrl:string }} extraInfo
 */
function datadogRecordInternalApiResponse(type, { statusCode = 200, path, redirect, redirectUrl = '' }) {
    const [withoutQueryParams] = redirectUrl.split('?');
    const tags = [
        `status:${statusCode}`,
        `path:${path}`,
        `type:${type}`,
        `redirect:${redirect}`,
        `redirect_url:${withoutQueryParams}`,
    ];
    datadogRecordIncrement('internal.api.response', tags);
}

/**
 * Es un histograma para armar una metrica de las dependencias
 * 
 * @param {'success'|'error'} type 
 * @param {{ statusCode:number, path:string, api:string, action:string, time:number }} extraInfo
 */
function datadogRecordExternalApiResponse(type, { api, action, path, statusCode, time }) {
    const tags = [
        `api:${api}`,
        `action:${action}`,
        `path:${path}`,
        `statuscode:${statusCode}`,
        `type:${type}`,
    ];

    datadogRecordHistogram('external.api.response', time, tags);
}

module.exports = {
    datadogRecordInternalApiResponse,
    datadogRecordExternalApiResponse,
};