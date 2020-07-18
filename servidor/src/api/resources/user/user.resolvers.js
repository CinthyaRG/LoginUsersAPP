import User from './user.model';
import { uploadFile } from './images.upload'
import { emailValidate, emailExist } from './validators';
import { signIn, verify } from '../user/auth';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export const userResolvers = {
    Query: {
        async users() {
            const users = await User.find();
            return users;
        },

        async user_auth(root, args, { user }, info) {
            if (!user) {
                throw new Error('No esta autenticado.');
            }

            const userdb = await User.findOne({ email: user.email });
            userdb.token = signIn({ id: userdb._id, email: userdb.email });

            return userdb;
        }
    },
    Mutation: {
        async createUser(root, { input }) {
            const errors = [];

            if (await emailExist(input.email) !== null) {
                errors.push("El email ingresado ya esta registrado.");
                return {
                    errors: errors,
                    token: null
                };
            }

            if (emailValidate(input.email)) {
                errors.push("El email no tiene un formato correcto.");
                return {
                    errors: errors,
                    token: null
                };
            }

            const { image, ...userObject } = await input;

            let url = "";
            if (image) {
                const result = await uploadFile(image);
                url = result.url;
            }

            Object.assign(userObject, { image: url });

            const newUser = new User(userObject);
            await newUser.save();
            console.log("Usuario creado correctamente.");
            newUser.token = signIn({ id: newUser._id, email: newUser.email });

            return newUser;
        },
        async deleteUser(_, { _id }) {
            return await User.findByIdAndDelete(_id);
        },
        async updateUser(_, { _id, input }) {
            if (input.email !== undefined) {
                if (await emailExist(input.email) !== null) {
                    errors.push("El email ingresado ya esta registrado.");
                    return {
                        errors: errors,
                        token: null
                    };
                }

                if (emailValidate(input.email)) {
                    errors.push("El email no tiene un formato correcto.");
                    return {
                        errors: errors,
                        token: null
                    };
                }
            };

            return await User.findOneAndUpdate({ _id: _id }, input, { new: true, useFindAndModify: false });
        },
        async loginUser(root, { input }) {
            const user = await User.findOne({ email: input.email });
            const errors = [];

            if (user) {
                if (bcrypt.compareSync(input.password, user.password)) {
                    user.token = signIn({ id: user._id, email: user.email });
                    return user;
                } else {
                    errors.push("Los datos ingresados son incorrectos.");
                    return {
                        errors: errors,
                        token: null
                    };
                }
            } else {
                errors.push("Los datos ingresados son incorrectos.");
                return {
                    errors: errors,
                    token: null
                };
            }

        }
    }
};