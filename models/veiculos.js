import { DataTypes } from "sequelize";
import { database } from '../database/index.js';
import { Usuarios } from './usuarios.js';

export const Veiculos = database.define('veiculos', {
    id_veiculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuarios,
            key: 'id_usuario',
        },
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_veiculo: {
        type: DataTypes.ENUM('carro', 'moto', 'caminhao', 'onibus'),
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps:true, 
});

// Relacionamento com o modelo Usuarios
Veiculos.belongsTo(Usuarios, {
    foreignKey: 'usuario_id',
});