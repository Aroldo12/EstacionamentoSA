import { DataTypes } from "sequelize";
import { database } from '../database/index.js'
export const Usuarios = database.define('usuarios',{
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: DataTypes.STRING,
     email: DataTypes.STRING,
     senha: DataTypes.STRING,
     telefone: DataTypes.STRING,
     tipo_usuario: {
        type: DataTypes.ENUM('Adimin', 'Cliente')
     }
     

},{
    timestamps:true, 
});
