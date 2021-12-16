# Challenge Backend

## Requerimientos

Hacer un enpoint (get) que devuelva algunos post (3 o mas). El enpoint debería quedar como `/posts` (get).
El resultado:

```json
{
  "posts": [
    {
      "id": 1,
      "title": "Hola mundo CSS",
      "image": "url de la imagen",
      "tag": "CSS",
      "date": "2021-10-23T18:44:34+0000"
    },
    {
      "id": 2,
      "title": "Hola mundo JS",
      "image": "url de la imagen",
      "tag": "JAVASCRIPT",
      "date": "2021-10-23T18:44:34+0000"
    },
    {
      "id": 3,
      "title": "Hola mundo JAVA",
      "image": "url de la imagen",
      "tag": "JAVA",
      "date": "2021-10-23T18:44:34+0000"
    }
  ]
}
```

## Propuesta

En la propuesta se detallan las carateristicas del endpoint:

- Se separan la logica para responder (controller) de la logica para obtener y procesar los datos.
- Se agregan tipos (usando @ts-check) para mejora la documentacion y el desarrollo
- Se simulan metricas, restclient propio, logger, entre otras cosas
- Controlar los errores 404 y 500
- Entrega en github
- Documentacion en este readme

A continuacion se muestra un grafico que diseñe para bajar los requerimientos "a papel":

> Las cosas que figuran como "opcionales" son ideas para completar la experiencia original.

![propuesta-backend](https://user-images.githubusercontent.com/8606443/139524045-dd51951e-2ab4-4314-b8b4-148df92da3ca.png)

## Tests

Por cuestiones de tiempo, no pude realizar los test que queria hacer.
Me hubiera justado hacer al menos tests de integracion para:

- el caso feliz
- un error de la api (en la dependencia mockeada)
- una direccion que no ruteamos

## Corriendo la aplicación por primera vez

1. Instalar dependencias:

   ```
   npm install
   ```

2. Correr la aplicación, en otro tab de la terminal:

   ```
   npm run dev
   ```

3. Ejecutar el curl

   ```
   curl http://localhost:3001/api/posts
   ```
