import Sequelize from 'sequelize'


export default function usersModel(sequelize) {
  const users = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    roles: {
      type: Sequelize.STRING,
      defaultValue: 'admin'
      },
    img: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  sequelize.sync({ force: false });

  return users;
}