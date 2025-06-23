import jwt from 'jsonwebtoken';

const segredoJwt = process.env.SEGREDO_JWT;

export const validarToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).send({ mensagem: 'Acesso negado: token não fornecido' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send({ mensagem: 'Acesso negado: token inválido' });
        }

        const conteudoDoToken = jwt.verify(token, segredoJwt);

        req.id_usuario = conteudoDoToken.id;
        req.tipo_usuario = conteudoDoToken.tipo_usuario;

        next();
    } catch (erro) {
        return res.status(401).send({ mensagem: 'Acesso negado' });
    }
};

export const verificarAdmin = (req, res, next) => {
    if (req.tipo_usuario !== 'Adimin') {
        return res.status(403).send({ mensagem: 'Acesso permitido somente para administradores' });
    }

    next();
};