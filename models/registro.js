import { DataTypes } from "sequelize";
import { database } from '../database/index.js';
import { Veiculos } from './veiculos.js';

export const Registro = database.define('registro', {
    id_registro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    veiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Veiculos, // Referência ao modelo importado
            key: 'id_veiculo',
        },
    },
    hora_entrada: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hora_saida: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'ativo',
    },
    vaga: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true, // Mantém os campos createdAt e updatedAt
});

// Limite máximo de registros ativos por vaga
const MAX_VAGAS = 10;

// Hook para validar o limite de registros ativos por vaga
Registro.beforeCreate(async (registro, options) => {
    const count = await Registro.count({
        where: {
            vaga: registro.vaga,
            status: 'ativo'
        }
    });

    if (count >= MAX_VAGAS) {
        return `A vaga ${registro.vaga} já atingiu o limite máximo de ${MAX_VAGAS} registros ativos.`;
    }
});

Registro.beforeUpdate(async (registro, options) => {
    if (registro.status === 'ativo') {
        const count = await Registro.count({
            where: {
                vaga: registro.vaga,
                status: 'ativo'
            }
        });

        if (count >= MAX_VAGAS) {
            return `A vaga ${registro.vaga} já atingiu o limite máximo de ${MAX_VAGAS} registros ativos.`;
        }
    }
});