import { Registro } from '../models/registro.js';
import { Veiculos } from '../models/veiculos.js';

export const registrarEntrada = async (req, res) => {
    try {
        const { placa, vaga } = req.body;

        
        const veiculo = await Veiculos.findOne({ where: { placa } });
        if (!veiculo) {
            return res.status(403).json({ mensagem: 'Veículo não autorizado' });
        }

        
        const registrosAtivos = await Registro.count({ where: { vaga, status: 'ativo' } });
        if (registrosAtivos >= 10) { 
            return res.status(403).json({ mensagem: 'Vaga ${vaga} está lotada' });
        }

       
        const novoRegistro = await Registro.create({
            veiculo_id: veiculo.id_veiculo,
            hora_entrada: new Date(),
            vaga,
            status: 'ativo',
        });

        return res.status(201).json({ mensagem: 'Entrada registrada com sucesso', registro: novoRegistro });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao registrar entrada', erro: error.message });
    }
};

export const registrarSaida = async (req, res) => {
    try {
        const { placa } = req.body;

        
        const veiculo = await Veiculos.findOne({ where: { placa } });
        if (!veiculo) {
            return res.status(403).json({ mensagem: 'Veículo não encontrado' });
        }

        
        const registro = await Registro.findOne({
            where: { veiculo_id: veiculo.id_veiculo, status: 'ativo' },
        });

        if (!registro) {
            return res.status(404).json({ mensagem: 'Registro de entrada não encontrado' });
        }

        registro.hora_saida = new Date();
        registro.status = 'inativo';
        await registro.save();

        return res.status(200).json({ mensagem: 'Saída registrada com sucesso', registro });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao registrar saída', erro: error.message });
    }
};

export const visualizarVagasDisponiveis = async (req, res) => {
    try {
        const totalVagas = 10; 
        const vagasOcupadas = await Registro.count({ where: { status: 'ativo' } });
        const vagasDisponiveis = totalVagas - vagasOcupadas;

        res.status(200).json({
            totalVagas,
            vagasOcupadas,
            vagasDisponiveis,
        });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao obter vagas disponíveis', erro: error.message });
    }
};