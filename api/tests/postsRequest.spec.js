const request = require('supertest');
const nock = require('nock');
const sinon = require('sinon');
const axios = require('axios');
const { connect, disconnect } = require('./util/server');
const { baseUrl, port } = require('../../config');
const { datadogRecordExternalApiResponse } = require('../helpers/metrics');
const dogResponse = require('./util/dogResponse')
var app;

// al iniciar las pruebas me conecto al server y creo mi caja de arena
beforeAll(async function () {
    app = await connect();
    sandBox = sinon.createSandbox();
});
// al terminar las pruebas me desconecto del server
afterAll(async function () { await disconnect(); });
// antes de cada prueba restauro mi sandBox
beforeEach(function () { sandBox ? sandBox.restore() : ""; });

describe("Dado que quiero realizar la prueba de integración para la API", function () {

    it('Cuando ingreso el endpoint /posts de metodo GET, Entonces debería ver todos los posts existentes', async function () {
        request('https://dog.ceo')
            .get('/api/breeds/image/random/14')
            .expect(200, dogResponse);
        sandBox.stub(Math, 'random').returns(0.463).onCall(0)
        const posts = await axios.get(`${baseUrl}:${port}/api/posts`);
        expect.objectContaining(posts.data)
    });

    it('Cuando se produzca un error 500 al obtener una imagen, Entonces debería de activarse la metrica', async function () {
        sandBox.stub(datadogRecordExternalApiResponse);
        sandBox.stub(Math, 'random').returns(0.4634425588622133);
        nock('https://dog.ceo')
            .get('/api/breeds/image/random/14')
            .reply(500);
        const spy = sandBox.spy(console, 'info');
        await axios.get(`${baseUrl}:${port}/api/posts`).catch(function () {
            expect(spy.called).toBe(true)
        });
    });

    it('Cuando me dirija a una api-path incorrecta, Entonces debería obtener un estado de 404', function (done) {
        request(app)
            .get('/api/posts/nacho')
            .expect(404)
            .then(response => {
                expect(response.status).toEqual(404);
                done();
            }).catch(err => done(err))
    })

    it('Cuando realize una función incorrecta en el servidor, Entonces debería obtener un estado de 500', function (done) {
        request(app)
            .get('/api/posts/')
            .expect(500)
            .then(response => {
                expect(response.status).toEqual(500);
                done();
            }).catch(err => done(err))
    })
});

