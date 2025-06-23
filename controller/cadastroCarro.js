import { Veiculos } from "../models/veiculos.js";
import { Usuarios } from "../models/usuarios.js";

export const cadastrarCarro = async (req, res) => {
    try {
        const usuario_id = req.user?.id_usuario;

        if (!usuario_id) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }

        const { placa, tipo_veiculo, modelo } = req.body;

        const veiculoExistente = await Veiculos.findOne({ where: { placa } });
        if (veiculoExistente) {
            return res.status(400).json({ mensagem: 'Veículo já cadastrado' });
        }

        const novoVeiculo = await Veiculos.create({
            usuario_id,
            placa,
            tipo_veiculo,
            modelo,
        });

        return res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso', veiculo: novoVeiculo });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao cadastrar veículo', erro: error.message });
    }
};

export const listarCarros = async (req, res) => {
    try {
        const veiculos = await Veiculos.findAll({
            include: {
                model: Usuarios,
                attributes: ['id_usuario', 'nome', 'email'],
            },
        });

        return res.status(200).json({ mensagem: 'Veículos listados com sucesso', veiculos });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao listar veículos', erro: error.message });
    }
};

// Atualizar veículo
export const atualizarCarro = async (req, res) => {
    const { id } = req.params; // ID do veículo a ser atualizado
    const { placa, tipo_veiculo, modelo } = req.body;

    try {
        const veiculo = await Veiculos.findByPk(id);
        if (!veiculo) {
            return res.status(404).json({ mensagem: 'Veículo não encontrado' });
        }

        await veiculo.update({ placa, tipo_veiculo, modelo });

        return res.status(200).json({ mensagem: 'Veículo atualizado com sucesso', veiculo });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao atualizar veículo', erro: error.message });
    }
};

// Excluir veículo
export const excluirCarro = async (req, res) => {
    const { id } = req.params; // ID do veículo a ser excluído

    try {
        const veiculo = await Veiculos.findByPk(id);
        if (!veiculo) {
            return res.status(404).json({ mensagem: 'Veículo não encontrado' });
        }

        await veiculo.destroy();

        return res.status(200).json({ mensagem: 'Veículo excluído com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao excluir veículo', erro: error.message });
    }
};