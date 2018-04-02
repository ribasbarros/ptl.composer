const authService = require('../authenticator/auth-service');
const repository = require('./upload-repository')
const mongoose = require('mongoose');

exports.post = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: data.id,     
            url: req.file.path
        });

        res.status(201).send({
            message: 'Upload feito com sucesso!'
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.approve = async(req, res, next) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.update(req.params.id, {
            'status' : 'approved',
            'updateDate' : new Date(),
            'updateBy' : data.id
        });

        res.status(200).send({
            message: 'Upload aprovado com sucesso!'
        });
        
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.rejected = async(req, res, next) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        await repository.update(req.params.id, {
            'status' : 'rejected',
            'updateDate' : new Date(),
            'updateBy' : data.id
        });

        res.status(200).send({
            message: 'Upload reprovado com sucesso!'
        });
        
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};