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
    .post('/users', createUser.validateEmail, createUser.handler, UserController.createUser)
    .get('/users', tokenSession, UserController.findAll)
    .get('/users/:id', tokenSession, UserController.findById)
    .put('/users/:id', tokenSession, UserController.updateById)
    .post('/login', UserController.login)
    .post('/logout', tokenSession, UserController.logout)
    .post('/forgot-password', UserController.forgotPassword)
    .post('/reset-password', UserController.resetPassword)
    .delete('/users/inactive-user/:id', UserController.inactiveUser);

//rotas para dados pessoais de usuarios
router
    .get('/users/:user_id/person', tokenSession, PersonController.findById)
    .post('/users/:user_id/person', tokenSession, PersonController.createPersonalData)
    .put('/users/:user_id/person', tokenSession, PersonController.updateById);
    
//rotas de gêneros literários
router
    .get('/genres', tokenSession, GenreController.findAll)
    .get('/genres/:id', tokenSession, GenreController.findById)
    .post('/genres', tokenSession, GenreController.createGenre)
    .put('/genres/:id', tokenSession, GenreController.updateById);

//rotas de livros
router
    .post('/books', tokenSession, BookController.createBook)
    .get('/books', tokenSession, BookController.findAll)
    .get('/books/:id', tokenSession, BookController.findById)
    .put('/books/:id', tokenSession, BookController.updateById)
    .delete('/books/:id', tokenSession, BookController.deleteById);

//rotas de reservas e emprestimos a serem definidas
router
    .get('/bookings')

module.exports = router;