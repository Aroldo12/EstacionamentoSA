import express from 'express';
import { login, cadastrarUsuario, excluirUsuario, atualizarUsuario } from '../controller/cadastroUsuario.js';
import { autenticar } from '../middlewares/authMiddleware.js';
import { cadastrarCarro, listarCarros, atualizarCarro, excluirCarro } from '../controller/cadastroCarro.js';
import { registrarEntrada, registrarSaida } from '../controller/registro.js';
import { validarToken, verificarAdmin } from '../middlewares/authMiddleware.js';
import { visualizarVagasDisponiveis } from '../controller/registro.js';


export const rotas = express.Router();

rotas.post('/usuarios/cadastrar', cadastrarUsuario);
rotas.post('/usuarios/login', login);
rotas.use(autenticar)

rotas.post('/veiculos/cadastrar', cadastrarCarro)
rotas.get('/veiculos/listar', listarCarros)

rotas.post('/acessos/entrada', registrarEntrada);
rotas.post('/acessos/saida', registrarSaida);

rotas.put('/usuarios/atualizar/:id', atualizarUsuario);
rotas.delete('/usuarios/excluir/:id', excluirUsuario)

rotas.put('/veiculos/:id', atualizarCarro); 
rotas.delete('/veiculos/:id', excluirCarro); 


rotas.get('/vagas/disponiveis', visualizarVagasDisponiveis);

rotas.delete('/usuarios/:id', verificarAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
        await usuario.destroy();
        res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao excluir usuário', erro: error.message });
    }
});