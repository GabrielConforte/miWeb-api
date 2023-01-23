class BaseModel {
    constructor(model) {
      this.model = model;
    }
  
    async create(data) {
      return this.model.create(data);
    }
  
    async findAll() {
      return this.model.findAll();
    }
  
    async getOne(id) {
      return this.model.findByPk(id);
    }
  
    async updateOne(data, id) {
      return this.model.update(data, { where: { id } });
    }
  
    async deleteOne(id) {
      return this.model.destroy({ where: { id } });
    }
  }
  
  export default BaseModel;
  