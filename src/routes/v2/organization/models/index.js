import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../../../db/index.js';

const Organization = sequelize.define(
  'organization',
  {
    store: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gupshupUserid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gupshupPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gupshuptemplate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'organizations',
    timestamps: true,
  }
);

export default Organization;
