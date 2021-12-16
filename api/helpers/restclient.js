/** 
 * En un futuro me gustaria hacer un wrapper de Axios y llevarlo a una lib.
 * Ventajas:
 *  - la implementacion del restclient queda aislada.
 *  - puedo agregar las metricas que necesite. 
 */ 
const restClient = require('axios').default;

module.exports = restClient;