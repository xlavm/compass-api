// @ts-check
const logger = require('../helpers/logger');
const { datadogRecordInternalApiResponse } = require('../helpers/metrics');

/**
 * Middleware de errores.
 * Se encarga de:
 *  - levantar metricas correspondientes
 *  - disparar logs correspondientes
 *  - responder al cliente cuando sucede un error
 * 
 * @param {Error&{status:number}} error app error instance
 * @param {*} req ExpressJS request node
 * @param {*} res ExpressJS response node
 * @param {*} next ExpressJS function for call next middleware (or error middleware).
 */
function errorMiddleware(error, req, res, next) {
    const isHandled = Boolean(error.status);
    const statusCode = error.status || 500;
    const type = isHandled ? 'error' : 'error_unhandled';
    /** @type string */
    const path = req.path;

    logger.error(error.message);
    logger.error(`screen: ${req.baseUrl}${path}`);
    logger.error('status_code: statusCode');
    logger.error(`stack_trace: ${error.stack}`);

    datadogRecordInternalApiResponse(type, { redirect: 'no-redirect', statusCode, path, redirectUrl: '' } );

    res.status(statusCode).json({
        error: {
            msg: error.message
        }
    });
}

/**
 * Middleware para controlar rutas y/o verbos incorrectos
 * Se encarga de:
 *  - levantar metricas correspondientes
 *  - disparar logs correspondientes
 *  - responder al cliente cuando sucede requiere una ruta inexistente
 * 
 * @param {*} req ExpressJS request node
 * @param {*} res ExpressJS response node
 */
function notFoundMiddlware(req, res) {
    /** @type string */
    const path = req.path;
    const statusCode = 404;

    logger.warn(`screen: ${req.baseUrl}${path}`);

    datadogRecordInternalApiResponse('success', { redirect: 'no-redirect', statusCode, path, redirectUrl: '' });

    // por seguridad no respondemos nada... es como si no existieramos
    res.status(statusCode).send(); 
}

module.exports = {
    errorMiddleware,
    notFoundMiddlware
};