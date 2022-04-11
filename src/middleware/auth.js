const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/authConfig.json')

module.exports = {
    tokenSession: async (req, res, next)=>{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).send({
                error: 'Token não informado'
            })
        }

        const parts = authHeader.split(' ');

        if(!parts.length === 2){
            return res.status(401).send({
                error: 'Token está errado'
            })
        }

        const [, token] = parts;

        if(!token){
            return res.status(400).json({
                error: true,
                message: "Necessário estar autenticado"
            })
        }

        try {
            const decode = await promisify(jwt.verify)(token, authConfig.secret);
            req.userId = decode.id;
            return next();
        } catch (err) {
            return res.status(400).json({
                err: true,
                message: "Token de acesso inválido para está operação"
            })
        }
    }
}