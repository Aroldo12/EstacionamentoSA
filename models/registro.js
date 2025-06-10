import { DataTypes } from "sequelize";
import { database } from '../database/index.js'
import { Usuarios } from './usuarios.js'
import { Veiculos} from './veiculos.js'
export const Registro = database.define('registro', {
acesso_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
veiculo_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'veiculos',
        key: 'id_veiculo'
    }
},
hora_entrada: {
    type: DataTypes.DATE,
    allowNull: false
},
hora_saida: {
    type: DataTypes.DATE,
    allowNull: true
},
statatus: {
    type: DataTypes.ENUM('ativo', 'inativo'),
    allowNull: false,
    defaultValue: 'ativo'
}
})