const express = require('express');
const router = express.Router();

const UserController = require('./src/controllers/UserController');
const PersonController = require('./src/controllers/PersonController');
const GenreController = require('./src/controllers/GenreController');
const BookController = require('./src/controllers/BookController');
const ImagesController = require('./src/controllers/ImagesController');
const BookingController = require('./src/controllers/BookingController')

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
    .get('/users', tokenSession, UserController.findAll)
    .get('/users/:id', tokenSession, UserController.findById)
    .post('/users', createUser.validateEmail, createUser.handler, UserController.createUser)
    .post('/login', UserController.login)
    .post('/forgot-password', UserController.forgotPassword)
    .post('/reset-password', UserController.resetPassword)
    .put('/users/:id', tokenSession, UserController.updateById)    
    .get('/logout', tokenSession, UserController.logout);

//rotas para dados pessoais de usuarios
router
    .get('/users/:user_id/person', tokenSession, PersonController.findById)
    .post('/users/:user_id/person', tokenSession, PersonController.createPersonalData)
    .post('/users/upload-image', ImagesController.uploadUserImage)
    .delete('/users/images/:id', ImagesController.deleteUserImage)
    .put('/users/:user_id/person', tokenSession, PersonController.updateById);
    
//rotas de gêneros literários
router
    .get('/genres', tokenSession, GenreController.findAll)
    .get('/genres/:id', tokenSession, GenreController.findById)
    .post('/genres', tokenSession, GenreController.createGenre)
    .put('/genres/:id', tokenSession, GenreController.updateById);

//rotas de livros
router
    .get('/books', tokenSession, BookController.findAll)
    .get('/books/:id', tokenSession, BookController.findById)
    .post('/books', tokenSession, BookController.createBook)
    .put('/books/:id', tokenSession, BookController.updateById);

//rotas de reservas e emprestimos a serem definidas
router
    .get('/bookings')

module.exports = router;