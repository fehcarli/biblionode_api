const express = require('express');
const router = express.Router();

const UserController = require('./src/controllers/UserController');
const PersonController = require('./src/controllers/PersonController');
const GenreController = require('./src/controllers/GenreController');
const BookController = require('./src/controllers/BookController');

const { tokenSession } = require('./src/middleware/auth');
const {createUser} = require('./src/middleware/validator');

//rota para home
router
    .get('/api', (req, res) => {
    res.status(200).json({
       success: 'true',
       message: 'Seja bem-vindo a API Biblionode',
       version: '1.0.0',
    });
});

//rotas de usuario
router
    .get('/api/users', tokenSession, UserController.findAll)
    .get('/api/users/:id', tokenSession, UserController.findById)
    .post('/api/users', createUser.validateEmail, createUser.handler, UserController.createUser)
    .post('/api/login', UserController.login)
    .put('/api/users/:id', tokenSession, UserController.updateById)    
    .get('/api/logout', tokenSession, UserController.logout);

//rotas para dados pessoais de usuarios
router
    .get('/api/users/:user_id/person', tokenSession, PersonController.findById)
    .post('/api/users/:user_id/person', tokenSession, PersonController.createPersonalData)
    .put('/api/users/:user_id/person', tokenSession, PersonController.updateById);
    
//rotas de gêneros litrerários
router
    .get('/api/genres', tokenSession, GenreController.findAll)
    .get('/api/genres/:id', tokenSession, GenreController.findById)
    .post('/api/genres', tokenSession, GenreController.createGenre)
    .put('/api/genres/:id', tokenSession, GenreController.updateById);

//rotas de livros
router
    .get('/api/books', tokenSession, BookController.findAll)
    .get('/api/books/:id', tokenSession, BookController.findById)
    .post('/api/books', tokenSession, BookController.createBook)
    .put('/api/books/:id', tokenSession, BookController.updateById);

module.exports = router;