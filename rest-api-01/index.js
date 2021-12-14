const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

/*MIDDLEWARE*/

app.use(express.json())

const whitelist = ['C:/Users/gabriel/OneDrive/Escritorio/GIT/API_rest.__GB__/html.html'];
const options = {
  origin:(origin,callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error("No permitido"))
    }
  }
}
app.use(cors(options));

routerApi(app);

//con los middleware error tener en cuenta el orden con el que se van a ejecutar
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);


app.listen(port,()=>{
  console.log('corriendo en ',port)
})
