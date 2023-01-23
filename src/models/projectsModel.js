import Sequelize from 'sequelize'


export default function projectsModel(sequelize) {
  const Projects = sequelize.define('projects', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.TEXT('long'),
      allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: true,
      },
  });

  sequelize.sync({ force: false });

  return Projects;
}