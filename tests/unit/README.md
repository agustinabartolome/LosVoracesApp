# Documentación de los tests

## Propósito

El proyecto incluye una suite de tests automatizados para asegurar la calidad y el correcto funcionamiento de los distintos módulos: modelos, controladores y rutas. Los tests validan tanto la lógica de negocio como el manejo de errores y las respuestas de la API.

## Estructura

Los tests se encuentran en la carpeta `tests/unit/` y están organizados en subcarpetas según el tipo de componente:
- `model/`: Pruebas de los modelos de datos (Book, Magazine, Order, Sale, SchoolSupply, Supplier, Product).
- `controller/`: Pruebas de los controladores de cada entidad.
- `routes/`: Pruebas de las rutas de la API.

Cada archivo de test sigue la convención `<Nombre>.test.js` y utiliza Jest como framework de testing.

## Ejecución

Para ejecutar todos los tests, usa el siguiente comando en la raíz del proyecto:

```powershell
npm test
```

Para ejecutar los tests en modo observador (útil durante el desarrollo):

```powershell
npm run test:watch
```

## Dependencias

- [Jest](https://jestjs.io/): Framework principal de testing.
- [supertest](https://www.npmjs.com/package/supertest): Para pruebas de endpoints HTTP.

## Cobertura

La configuración de Jest (`jest.config.js`) está preparada para generar reportes de cobertura en la carpeta `coverage/`.

## Buenas prácticas

- Los tests cubren casos exitosos y de error.
- Se utilizan mocks para aislar dependencias externas (por ejemplo, acceso a archivos JSON).
- Se sigue la convención AAA (Arrange, Act, Assert) en la estructura de los tests.
