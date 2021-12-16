// @ts-check
const { randomGenerator } = require('./random');

// Simula la respuesta de una dependencia hacia nuestro backend.
const backendResponse = [{
    title: 'Hola mundo CSS',
    image: 'url de la imagen',
    tag: 'CSS',
    date: '2021-10-23T18:44:34+0000',
},
{
    title: 'Hola mundo JS',
    image: 'url de la imagen',
    tag: 'JAVASCRIPT',
    date: '2021-10-23T18:44:34+0000',
},
{
    title: 'Hola mundo JAVA',
    image: 'url de la imagen',
    tag: 'JAVA',
    date: '2021-10-23T18:44:34+0000',
},
{
    title: 'Hola mundo GO',
    image: 'url de la imagen',
    tag: 'GO',
    date: '2021-10-23T18:44:34+0000',
},
{
    title: 'Hola mundo HASKELL',
    image: 'url de la imagen',
    tag: 'HASKELL',
    date: '2021-10-23T18:44:34+0000',
},
];

/**
 * Dado una url, retorna un post.
 * 
 * @param {string} dogImage url de una imagen de un perro.
 * @param {number} i indice del elemento actual.
 * @returns {{ id: number, title: string, image: string, tag: string, date: string }} un post
 */
function dogImageToBackendResponse(dogImage, i) {
    const { imageCount: index } = randomGenerator();
    const currentPost = backendResponse[index];

    return {
        ...currentPost,
        image: dogImage,
        id: i,
    };
}

module.exports = { dogImageToBackendResponse };