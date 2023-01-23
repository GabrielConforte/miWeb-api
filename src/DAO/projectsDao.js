import BaseModel from '../models/baseModel.js';
import projectsModel from '../models/projectsModel.js';
import sequelize from '../db/sequelize.js';

class ProjectsDao extends BaseModel {
  
  constructor() {
    const model = projectsModel(sequelize);
    super(model);
  }

  async findOneById(id) {
    return this.model.findOne({ where: {id: id} });
    }

    async updateOne(id, data) {
      try {
        const project = await this.findOneById(id);
        if (!project) {
          throw new Error('Project with that ID does not exist');
        }
        return project.update(data);
      } catch (error) {
        throw error;
      }
    }

}



export default new ProjectsDao();