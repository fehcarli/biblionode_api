const db = require('../models')
const UserImages = db.userimages;
const BookImages = db.bookimages;

exports.uploadUserImage = async (req, res) =>{
    res.send({
        message: 'Uploading user image'
    })
}

exports.deleteUserImage = async (req, res) =>{
    const id = req.params.id;
    UserImages.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
            message: "Imagem foi deletada com sucesso!"
            });
        } else {
            res.send({
            message: `Não é possível deletar imagem vinculada ao id=${id}. Imagem de Usuário não encontrada!`
            });
        }
    });
}