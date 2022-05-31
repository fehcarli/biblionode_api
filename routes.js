const express = require('express');
const router = express.Router();

const UserController = require('./src/controllers/UserController');
const GenreController = require('./src/controllers/GenreController');
const BookController = require('./src/controllers/BookController');
const BookingController = require('./src/controllers/BookingController');

const { tokenSession } = require('./src/middleware/auth');
const { createUser } = require('./src/middleware/validator');

//rota para home
router
    .get('/api', (req, res) => {
        res.status(200).json({
            success: 'true',
            message: 'Seja bem-vindo a API Biblionode, para consultar sobre cada endpoint acesse /api/v1',
            version: '1.0.0',
        });
    });

router
    .get('/users', tokenSession, UserController.findAll)
    .get('/user/:id', tokenSession, UserController.findById)
    .get('/user/:id', tokenSession, UserController.findById)
    .post('/register', createUser.validateEmail, createUser.handler, UserController.createUser)
    .post('/user/:id/info', tokenSession, UserController.createUserInfo)
    .post('/login', UserController.login)
    .post('/forgot-password', UserController.forgotPassword)
    .post('/reset-password', UserController.resetPassword)
    .put('/user/:id', tokenSession, UserController.updateById)
    .put('/user/:id/info', tokenSession, UserController.updateUserInfo)
    .delete('/user/:id/inactive-user', tokenSession, UserController.inactiveUser);
    
//rotas de gêneros literários
router
    .get('/genres', tokenSession, GenreController.findAll)
    .get('/genre/:id', tokenSession, GenreController.findById)
    .post('/genre', tokenSession, GenreController.createGenre)
    .put('/genre/:id', tokenSession, GenreController.updateById);

//rotas de livros
router
    .post('/book', tokenSession, BookController.createBook)
    .get('/books', tokenSession, BookController.findAll)
    .get('/book/:id', tokenSession, BookController.findById)
    .put('/book/:id', tokenSession, BookController.updateById)
    .delete('/book/:id', tokenSession, BookController.deleteById);

//rotas de reservas e emprestimos a serem definidas
router
    .get('/bookings', BookingController.findAllBookings);

module.exports = router;