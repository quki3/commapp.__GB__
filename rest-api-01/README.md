primero creamos los archivos en el entorno de trabajo
- >npm init -y `//? -y le da la configurafion por default
              //? podriamos darle un git init` 
- >creamos .gitigmore podemos tener una ayuda colocando las herrramientas que vamos a trabajar en esta pagina y nos dara una lista con los archivos que deberiamos ignorar https://www.toptal.com/developers/gitignore
- >creamos el archivo de configuracion .editorconfig podemos hacer trabajar al equipo con las mismas reglas info acahttps://editorconfig.org/
- >creamos el archivo de buenas practicas .eslintrc.json
- >creamos el archivo inicial index.js

vamos al package!
- > primero tratemos de levantar un entorno de desarrollo con nodemon hacer el start y lint
```json
"scripts": {
    "dev": "nodemon index.js",
    "start":"node index.js",
    "lint":"eslint"
  },
```
- > para que esto funcione instalamos algunas dependencias de desarrolo
`npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D`
- > tambien vamos a instalar express
- > para crear el  servidor vamos el index.js y requerimos express y definimos las rutas
```js
const express = require('express');
const { removeAllListeners } = require('nodemon');

const app = express();

const port =3000;

app.get('/',(req,res)=>{
  res.send('hola mi servidor')
})
app.get('/nueva-ruta',(req,res)=>{
  res.send('hola soy una nueva ruta')
})
app.get('/productos',(req,res)=>{
  res.json([
    {
    name:'name',
    price:1000
    },
    {
      name:'producto 2',
      price:2000
    }
])
})
app.get('/products/:id',(req,res)=>{
  const id = req.params.id;
  res.json({

      name:'producto 2',
      price:2000,
      id
  })
})
app.get('/categories/:categoryId/productos/:productId',(req,res)=>{
  const {categoryId,ProductId}= req.params;
  res.json({
    categoryId,
    ProductId
  });
})

app.listen(port,()=>{
  console.log('acorriendo en ',port)
})

```

- > vamos a ver los query params
-> como funcionan por medio de paramaetros tipo querys que son opcionales puedo hacer coropntamientos como paginar hacer filtros
`api.example.com/products`
`api.example.com/products?page=1`
`api.example.com/products?limit=10&offset=o`
`api.example.com/products?region=USA`
`api.example.com/products?region=USA&brand=XYZ`
```js
//querys
app.get('/users',(req,res)=>{
  const {limit,offset}= req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send('no hay params');
  }
})
```
veamos algunos datos fake
instalemos faker
`npm i faker`
- > la imporetamos y usamos
```js
const { response } = require('express');
const express = require('express');
const faker = require('faker');
const { removeAllListeners } = require('nodemon');

const app = express();

const port =3000;

app.get('/',(req,res)=>{
  res.send('hola mi servidor')
})
app.get('/nueva-ruta',(req,res)=>{
  res.send('hola soy una nueva ruta')
})
app.get('/products',(req,res)=>{
  const products = [];
  const {size} = req.query;
  const limit = size || 10;
  for (let index=0;index<limit;index++){
    products.push({
      name:faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image:faker.image.imageUrl()
    })
  }
  res.json(products)
})

app.get('/products/filter',(req,res)=>{
  res.send('soy un filter')
})



app.get('/products/:id',(req,res)=>{
  const id = req.params.id;
  res.json({

      name:'producto 2',
      price:2000,
      id
  })
})
app.get('/categories/:categoryId/productos/:productId',(req,res)=>{
  const {categoryId,ProductId}= req.params;
  res.json({
    categoryId,
    ProductId
  });
})

//querys
app.get('/users',(req,res)=>{
  const {limit,offset}= req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send('no hay params');
  }
})

app.listen(port,()=>{
  console.log('corriendo en ',port)
})
```
- > usemos un poco el single responsibility pronciple
- >  creamos una carpeta routes
`mkdir routes/products.routes.js`
- y lo mismo con cualquier nombre de ruta de mas que tengamos
```js
const express = require('express');
const faker = requiere('faker');

const router = express.Router();

router.get('/',(req,res)=>{
  const products = [];
  const {size} = req.query;
  const limit = size || 10;
  for (let index=0;index<limit;index++){
    products.push({
      name:faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image:faker.image.imageUrl()
    })
  }
  res.json(products)
})

router.get('/filter',(req,res)=>{
  res.send('soy un filter')
})



router.get('/:id',(req,res)=>{
  const id = req.params.id;
  res.json({

      name:'producto 2',
      price:2000,
      id
  })
})
module.exports = router


```
- creamos la carpeta /routes/index.js
```js
const productsRouter = require('./products.routes');
//const usersRouter = require('./users.routes')

function routerApi(app){
  app.use('/products',productsRouter);
  //app.use('/users',)
}
module.exports = routerApi;
```

