import express from 'express';
import { login, cadastrarUsuario, excluirUsuario, atualizarUsuario, visualizarUsuarios } from '../controller/cadastroUsuario.js';
// import { autenticar } from '../middlewares/authMiddleware.js';
import { cadastrarCarro, listarCarros, atualizarCarro, excluirCarro } from '../controller/cadastroCarro.js';
import { registrarEntrada, registrarSaida } from '../controller/registro.js';
import { validarToken, verificarAdmin } from '../middlewares/authMiddleware.js';
import { visualizarVagasDisponiveis } from '../controller/registro.js';

export const rotas = express.Router();

// Rotas de usuários
rotas.post('/usuarios/cadastrar', cadastrarUsuario);
rotas.post('/usuarios/login', login);
rotas.post('/usuarios/buscar', visualizarUsuarios)
rotas.use(validarToken); // Middleware de autenticação aplicado globalmente

rotas.put('/usuarios/atualizar/:id', atualizarUsuario);
rotas.delete('/usuarios/excluir/:id', verificarAdmin, excluirUsuario); // Exclusão restrita a administradores

// Rotas de veículos
rotas.post('/veiculos/cadastrar',verificarAdmin, cadastrarCarro);
rotas.get('/veiculos/listar',verificarAdmin, listarCarros);
rotas.put('/veiculos/:id',verificarAdmin, atualizarCarro);
rotas.delete('/veiculos/:id',verificarAdmin, excluirCarro);

// Rotas de acessos
rotas.post('/acessos/entrada',verificarAdmin, registrarEntrada);
rotas.post('/acessos/saida',verificarAdmin, registrarSaida);

// Rotas de vagas
rotas.get('/vagas/disponiveis', visualizarVagasDisponiveis);