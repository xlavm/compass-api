const cors = require('cors');
const postsRouter = require('./routes/posts');
const { errorMiddleware, notFoundMiddlware } = require('../errors/middleware');

module.exports = function (app) {
    app.use(cors());
    app.use('/api/posts', postsRouter);
    app.get('*', notFoundMiddlware);
    app.use(errorMiddleware);
};