import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../../../db/index.js';

const OtpVerification = sequelize.define(
  'verifyotp',
  {
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    store: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
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
    tablename:'verifyotps',
    timestamps: true,
  }
);

export default OtpVerification;
