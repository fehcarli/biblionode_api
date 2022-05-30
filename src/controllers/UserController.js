require('dotenv').config()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const db = require("../models");
const mailer = require('../services/mailer');
const { token } = require('morgan');
const User = db.usuarios;
const UserInfo = db.info;

exports.findAll = async (req, res) => {
    await User.findAndCountAll({
        order: [['id', 'ASC']],
        include: [{
            model: UserInfo,
            attributes: ['nome', 'sobrenome', 'cpf', 'endereco', 'numero', 'cep'],
        }],
        limit: 10
    }).then(data => {
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
    await User.findByPk(id, {
        include: [{
            model: UserInfo,
            attributes: ['nome', 'sobrenome', 'cpf', 'endereco', 'numero', 'cep'],
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
    jwt.sign(params, process.env.SECRET,{
        expiresIn: 86400,
    })
    return res.json({ auth: true, token: token }); 
};

exports.createUser = async (req, res) => {
    await bcrypt.hash(req.body.password, 10).then(hash => {
        const encrypted = hash;
        const USER_MODEL = {
            username: req.body.username,
            email: req.body.email,
            password: encrypted,
            role_id: 2
        };
        User.create(USER_MODEL).then(data => {
            res.status(201).send({
                data, 
                token: generateToken({id: User.id})
            });
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu ao cadastrar o Usuário."
            });
        });  
    });
};

exports.login = async (req, res) => {
    const { password } = req.body;
    const email = req.body.email
    const user = await User.findOne({
        where: {
            email: email
        },
        attributes: ['id', 'email', 'password'],
        include: [{
            model: UserInfo,
            attributes: ['nome', 'sobrenome', 'cpf', 'endereco', 'numero', 'cep']
        }],
        paranoid: false
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
    if(user.isSoftDeleted){
        await user.restore(); 
    }
    res.send({
        message: "Login Realizado com sucesso",
        user,
        token: generateToken({id: user.id})
    });
};

exports.updateById = async (req, res) =>{
    const { username, email, password } = req.body;
    const id = req.params.id;
    const user = await User.findOne({
        where: {
            id: id
        }
    });
    if (!user) {
        return res.status(400).send({
            error: 'Usuário não encontrado na base de dados'
        })
    };
    const updatedPassword = await bcrypt.hash(password, 10).then(hash => {
        const encrypted = hash;
        const newPassword = {
            password: encrypted
        }
        user.password = newPassword
    });
    const USER_MODEL_UPDATED = {
        username: username,
        email: email,
        password: updatedPassword
    }
    user.update(USER_MODEL_UPDATED).then(() => {
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
};

exports.createUserInfo = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk({
        where: { id: id},
        include: [{
            model: UserInfo,
            attributes: ['user_id', 'nome', 'sobrenome', 'cpf', 'endereco', 'numero', 'cep'],
        }]
    });
    if (!user) {
      return res.status(400).send({ 
          error: 'Usuário não encontrado' 
        });
    }
    const INFO_MODEL = {
        user_id: id,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        cpf: req.body.cpf,
        endereco: req.body.endereco,
        numero: req.body.numero,
        cep: req.body.cep
    };
    UserInfo.create(INFO_MODEL).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu ao cadastrar os Dados Pessoais."
        });
    });
};

exports.updateUserInfo = async (req, res) =>{
    const id = req.params.id;
    await UserInfo.update(req.body, {
        where: { id: id}
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
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: email
            },
            paranoid: false
        });
        if (!user) {
            return res.status(400).send({
                error: 'Usuário não encontrado na base de dados'
            })
        };
        const token = crypto.randomBytes(20).toString('hex');
        const expiredDate = new Date();
        expiredDate.setHours(expiredDate.getHours() + 1);
        await user.update({ 
            passwordResetToken: token,
            passwordResetExpires: expiredDate
        })
        mailer.sendMail({
            to: email,
            from: 'reset-mail@biblionode.com.br',
            subject: 'Reset de Senha',
            template: 'forgot_password',
            context: { token }
        }, (err) => {
            if (err) {
                console.log(err)
                return res.status(400).send({ error: 'Não pode enviar o token'})
            }
            return res.send();
        });
    } catch(err) {
        res.status(400).send({
            message:
                err.message || "Algum erro ocorreu ao recuperar a senha, tente novamente."
        });
    }
};

exports.resetPassword = async (req, res)=> {
    const {token, email, password} = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: ['id', 'passwordResetToken', 'passwordResetExpires']
        });
        if (!user) {
            return res.status(400).send({
                error: 'Usuário não encontrado na base de dados'
            })
        };
        if(token !== user.passwordResetToken) {
            return res.status(400).send({ 
                error: 'Token Inválido'
            })
        };
        const now = new Date();
        if(now > user.passwordResetExpires) {
            return res.status(400).send({ 
                error: 'Token com periodo expirado'
            })
        };
        await bcrypt.hash(password, 10).then(hash => {
            const encrypted = hash;
            const newPassword = {
                password: encrypted
            }
            user.update(user.password = newPassword);
        });
        return res.send();
    } catch (err) {
        res.status(400).send({
            message:
                err.message || "Algum erro ocorreu ao resetar a senha, tente novamente."
        });
    }
};

exports.inactiveUser = async(req, res) => {
    const id = req.params.id;
    User.destroy({
        where: { id: id }
    }).then(data => {
        if (data) {
            res.send({
                message: "Usuário foi desativado com sucesso!"
            });
        } else {
            res.send({
                message: `Não possível desativar usuário de id=${id}. Usuário não encontrado!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || `Você não pode desativar usuário de id=${id}`
        });
    });
};

exports.logout = async(req, res) => {
    res.json({ auth: false, token: null });
}