import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});

const User = model('User', userSchema);
export default User;