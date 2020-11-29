//Puertos

process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Vencimiento de token

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//Semilla

process.env.SEED = process.env.SEED || 'seed';


//base de datos

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO_URI;
}

process.env.URLDB = urlBD;