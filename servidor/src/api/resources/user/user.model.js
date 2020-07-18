import { Schema, model } from 'mongoose';
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

userSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.password !== undefined) {
        this._update.password = bcrypt.hashSync(this._update.password, 10)
    };
    next()
})

export default model('Users', userSchema);