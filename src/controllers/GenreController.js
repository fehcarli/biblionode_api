const db = require('../models')
const Genres = db.generos;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
    const genre = req.params.nomeGenero;
    const condition = genre ? { genre: { [Op.iLike]: `%${nomeGenero}%`}} : null;
    Genres.findAll({where: condition}).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu internamente."
        });
    });
};

exports.findById = async (req, res) => {
    const id = req.params.id;
    Genres.findByPk(id).then(data =>{
        if(data){
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar gênero literário de id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Erro ao buscar gênero literário de id=" + id
        });
    });
};

exports.createGenre = async (req, res) => {
    if(!req.body.nomeGenero && !req.body.corEtiqueta){
        res.status(400).send({
            message: "Conteúdo não pode ficar vazio para cadastro."
        });
    }
    const GENRE_MODEL = {
        nomeGenero: req.body.nomeGenero,
        corEtiqueta: req.body.corEtiqueta
    };
    Genres.create(GENRE_MODEL).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu ao criar o gênero literário."
        });
    });
};

exports.updateById = async (req, res) =>{
    Genres.update(req.body, {
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).send({
             message: "Gênero literário Atualizado com sucesso."
        });
    }).catch(err => {
        const id = req.params.id;
        res.status(500).send({
            message:
                err.message || "Erro ao atualizar o Gênero Literário com id= " + id
        });
    });
};