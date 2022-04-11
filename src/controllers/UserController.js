const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const authConfig = require("../config/authConfig.json");
const { user } = require("pg/lib/defaults");
const Users = db.usuarios;
const People = db.pessoas;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
    await Users.findAll({
        order: [['id', 'ASC']],
        include: [{
            model: People,
            attributes: ['user_id', 'cpf', 'endereco', 'numeroEndereco', 'matricula', 'unidade'],
        }]
    }).then(data => {
        res.status(200).send({data, usersInSession: req.userId});
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu internamente."
        });
    });
};

exports.findById = async (req, res) => {
    const id = req.params.id;
    await Users.findByPk(id, {
        include: [{
            model: People,
            attributes: ['user_id', 'cpf', 'endereco', 'numeroEndereco', 'matricula', 'unidade'],
        }]
    }).then(data => {
        if(data){
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar a Usuário de id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu internamente."
        });
    });
};

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400,
    }) 
}

exports.createUser = async (req, res) => {
    await bcrypt.hash(req.body.password, 10).then(hash => {
        const encrypted = hash;
        
        const USER_MODEL = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            password: encrypted,
        };

        Users.create(USER_MODEL).then(data => {
            res.status(200).send({
                data, 
                token: generateToken({id: user.id})
            });
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu ao cadastrar o Usuário."
            });
        });  
    });
}

exports.login = async (req, res) => {
    const { password } = req.body;
    const user = await Users.findOne({
        where: {
            email: req.body.email
        },
        attributes: ['id', 'nome', 'sobrenome', 'email', 'password']
    });
    if (!user) {
        return res.status(400).send({
            error: 'Usuário não encontrado na base de dados'
        })
    };
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({
            error: 'Senha Inválida'
        });
    };
    res.send({
        message: "Login Realizado com sucesso",
        user,
        token: generateToken({id: user.id})
    });
}

exports.updateById = async (req, res) =>{
    await Users.update(req.body, {
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).send({
             message: "Usuário Atualizado com sucesso."
        });
    }).catch(err => {
        const id = req.params.id;
        res.status(500).send({
            message:
                err.message || "Erro ao atualizar o Usuário com id= " + id
        });
    });
}

exports.logout = async(req, res) => {
    
}