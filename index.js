const express = require('express'),
    app = express(),
    session = require('express-session');

const cors = require('cors');

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));


const config = {
    application: {
        cors: {
            server: [{
                origin: "localhost:3000",
                credentials: true
            }]
        }
    }
}

//middelwares
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors(
    config.application.cors.server
));

app.use(cors({
    origin: true,
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//routes
app.use(require('./routers/employees.routes'));
app.use(require('./routers/validator.routes'));
app.listen(3000);
console.log('Servidor levantado en el puerto: 3000');
