import { DataTypes } from "sequelize";
import { database } from '../database/index.js'
import { Usuarios } from './usuarios.js'
const Veiculos = database.define('veiculos', {
    id_veiculo: {
        type: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }},
        usuario_id: {
            type: DataTypes.INTEGER,

            references: {
                model: Usuarios,
                key: 'id_usuario'
            }},
            placa: DataTypes.STRING,
            tipo_veiculo: {
                type: DataTypes.ENUM('carro', 'moto', 'caminhao', 'onibus'),
                allowNull: false
            },
            modelo: DataTypes.STRING,



    
})