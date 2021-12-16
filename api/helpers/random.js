const { random: randomCFG } = require('../../config');

/**
 * Se encarga de generar seudo-aleatoreamente dos cosas:
 *  - si va a fallar el apicall
 *  - la cantidad de elementos a pedir (en caso de hacer el apicall)
 * 
 * @returns {{failureCondition: boolean, imageCount: number}} un objeto cuyos nodos son un flag de error y la cantidad de imagenes a pedir.
 */
function randomGenerator() {
    const random = Math.floor(Math.random() * randomCFG.seed);
    const imageCount = random % randomCFG.amount;
    const failureCondition = imageCount === 0;

    return { failureCondition, imageCount };
}

module.exports = { randomGenerator };