process.env.NODE_ENV !== 'production' ? require('dotenv').config() : null;

const express = require ('express');
const swaggerUi = require ('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const bodyParser = require('body-parser');
const cors = require('cors');

const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || '4000';

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);

app.listen(port, ()=> {
    console.log(`Servidor está rodando na porta http://localhost:${port}/api`)
});