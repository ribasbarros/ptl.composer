const authService = require('../authenticator/auth-service');
const repository = require('./upload-repository')

exports.post = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        console.log(req.file);
        console.log(data)

        await repository.create({
            customer: data.id,            
            items: req.body.items,
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