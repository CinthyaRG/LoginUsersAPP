import jsonwebtoken from 'jsonwebtoken';
import env from 'node-env-file';

env('./.env');

const token = process.env.TOKEN_SECRET || 'token_secret';
const expiresIn = process.env.EXPIRES_IN || '1h';

export const signIn = payload => jsonwebtoken.sign(payload, token, { expiresIn });

export const verify = token => {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, process.env.TOKEN_SECRET, {}, (err, payload) => {
            if (err) {
                return reject(err);
            }
            return resolve(payload);
        })
    })
}

export const throwErrorIfUserNotAuthenticated = user => {
    if (!user) throw new Error('Usted no esta autenticado.')
}
