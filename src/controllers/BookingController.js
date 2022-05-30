const db = require('../models');
const Bookings = db.reservas;
const Book = db.livros;
const User = db.usuarios;


exports.findAllBookings = async(req, res) =>{
    await Bookings.findAll({
        order: [['id', 'ASC']],
        include: [{
            model: User,
            attributes: ['username']
        }],
        include: [{
            model: Book,
            attributes: ['titulo']
        }],
        limit: 10
    }).then(bookings =>{
        if(bookings){
            res.status(200).send(bookings);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar a lista de reservas.`
            });
        }
    })
}

exports.findBookingByUser = async(req, res) =>{

}