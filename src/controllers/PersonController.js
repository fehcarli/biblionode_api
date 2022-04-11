const db = require('../models');
const User = db.usuarios;
const Person = db.pessoas;

exports.findById = async (req, res) => {
    const id = req.params.user_id;
    await Person.findByPk(id, {
        include: { association: 'usuarios' }
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

exports.createPersonalData = async (req, res) => {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).send({ error: 'Usuário não encontrado' });
    }

    const PERSON_MODEL = {
        user_id: user,
        cpf: req.body.cpf,
        endereco: req.body.endereco,
        numeroEndereco: req.body.numeroEndereco,
        matricula: req.body.matricula,
        unidade: req.body.unidade
    };

    Person.create(PERSON_MODEL).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ocorreu ao cadastrar os Dados Pessoais."
        });
    });
}

exports.updateById = async (req, res) =>{
    const id = req.params.user_id
    await Person.update(req.body, {
        where: { id: id }
    }).then(() => {
        res.status(200).send({
             message: "Dados Pessoais Atualizados com sucesso."
        });
    }).catch(err => {
        const id = req.params.id;
        res.status(500).send({
            message:
                err.message || "Erro ao atualizar o Usuário com id= " + id
        });
    });
}