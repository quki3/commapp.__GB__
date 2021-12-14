const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./routes')
const router_api = require('./routes/index.js')
/*seting*/
app.set('port',process.env.PORT || 3000);	/*('set'creamos una variable en set la vamos a poder 
						obtener desde cualquier parte de mi aplicacion*/

/*middlewares*/
app.use(morgan('dev'));				/*Muestra en consola las peticiones del servidor
						resive como parametros dev , combined, etc*/

app.use(express.json());			/*para soportar archivos json*/

app.use(express.urlencoded())			/*para poder soportar datos desde un formulario
						enviado desde el input html*/

app.use('json spaces',2);			/*es una configuracion opcional a los archivos json*/

/*routes*/
router_api(app);

/*starting the server*/
app.listen(app.get('port'),()=>{
	console.log(`Server v102 port ${app.set('port')}`);
});


