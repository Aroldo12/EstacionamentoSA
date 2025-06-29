import jwt from 'jsonwebtoken';
import { Usuarios } from '../models/usuarios.js';

export const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, telefone, tipo_usuario } = req.body;

    const usuarioExistente = await Usuarios.findOne({ where: { email } })
    if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Usuario existente' })
    }
    const novo = await Usuarios.create({
        nome,
        email,
        senha,
        telefone,
        tipo_usuario
    })
    res.status(201).json(novo)
}
export const login = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Usuarios.findOne({ where: { email, senha } });
    if (!usuario) {
        return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
    }
    const token = jwt.sign(
        { id: usuario.id_usuario, tipo_usuario: usuario.tipo_usuario }, // Inclui o tipo_usuario no token
        process.env.SEGREDO_JWT,
        { expiresIn: '1h' }
    );
    res.json({ token, tipo_usuario: usuario.tipo_usuario }); // Retorna o tipo_usuario na resposta
};
export const atualizarUsuario = async (req, res) => {
    const { id } = req.params; // ID do usuário a ser atualizado
    const { nome, email, senha, telefone, tipo_usuario } = req.body;

    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        await usuario.update({ nome, email, senha, telefone, tipo_usuario });

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', usuario });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: error.message });
    }
}

// Excluir usuário
export const excluirUsuario = async (req, res) => {
    const { id } = req.params; // ID do usuário a ser excluído

    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        await usuario.destroy();

        return res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao excluir usuário', erro: error.message });
    }
}
export const visualizarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll({
            attributes: ['id_usuario', 'nome', 'email', 'telefone', 'tipo_usuario'],
            order: [['nome', 'ASC']]
        });
        return res.status(200).json({ mensagem: 'Usuarios listados com sucesso', usuarios })
    }
    catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao listar usuarios',
            erro: error.mensagem
        })
    }


}

