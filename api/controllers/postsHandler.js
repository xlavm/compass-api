const { getPosts } = require('../services/posts');
const { buildSignature } = require('../services/signature');
const logger = require('../helpers/logger');
const { datadogRecordInternalApiResponse } = require('../helpers/metrics');

/**
 * Controller para el endpoint GET /posts
 * 
 * @param {*} req ExpressJS request node
 * @param {*} res ExpressJS response node
 * @param {*} next ExpressJS function for call next middleware (or error middleware).
 */
async function postsHandler(req, res, next) {
    try {
    // 1. invoco al servicio que obtiene los posts
        const posts = await getPosts('/posts');
    
        // 2. builder de la firma
        const signature = buildSignature(posts);
    
        // 3. Logs, metricas y respuesta
        logger.info(`postHandler: send ${posts.length} posts`);
        datadogRecordInternalApiResponse('success', { path: '/posts', redirect: 'no-redirect' });
        res.json(signature);
    } catch(e) {
        const controllerError = new Error(`postHandler error: ${e.message}`);
        next(controllerError);
    }
}

module.exports = { postsHandler };