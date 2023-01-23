import BaseModel from '../models/baseModel.js';
import usersModel from '../models/UsersModel.js';
import sequelize from '../db/sequelize.js';
import  bcrypt  from 'bcrypt';

class UsersDao extends BaseModel {
    constructor() {
    const model = usersModel(sequelize);
    super(model);
    }
    
    async create(data) {
        data.password = await bcrypt.hash(data.password, 10);
        return super.create(data);
    }
    
    async findOneByEmail(email) {
        return this.model.findOne({ where: { email } });
    }

    async findOneById(id) {
        return this.model.findOne({ where: { id } });
    }

    async findOneAndComparePassword(email, plaintextPassword) {
        const user = await this.findOneByEmail(email);
        if (!user) {
            return false;
        }
        return await bcrypt.compare(plaintextPassword, user.password);
    }
    
    async updateUser(userId, data, currentUser) {
        const user = await this.getOne({ where: { id: currentUser.id } });
        if (data.roles && !user.roles === "admin") { 
            throw new Error("Not authorized to change roles");
        }
        if(user.roles ==="admin"|| currentUser.id === userId) {
            if(data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }
            return super.updateOne(data, {id: userId});
        } else {
            throw new Error('Not authorized to update this user');
        }
    }
        
    async deleteUser(userId, currentUser) {
        const user = await this.getOne({ where: { id: currentUser.id } });
        if(user.roles === "admin" || currentUser.id === userId) {
            return super.deleteOne(userId);
        } else {
            throw new Error('Not authorized to delete this user');
        }
    }
}
   
    export default new UsersDao();