import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
import User from './user.model.js';
import Role from './role.model.js'

//TODO: Move this to db folder


const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;
db.ROLES = ['user', 'admin', 'moderator'];

export default db;