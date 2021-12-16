// @ts-check
/**
 * Transforma la respuesta del backend a la firma esperada.
 * 
 * @param {Array<{ id: number, title: string, image: string, tag: string, date: string }>} articles Lista de 'posts'
 * @returns {{ posts: Array<{ id: number, title: string, image: string, tag: string, date: string }>}}
 */
function buildSignature(articles = []) {
    return { posts: articles };
}

module.exports = { buildSignature };