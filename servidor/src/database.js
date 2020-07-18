import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        })

        console.log('Base de datos conectada correctamente.');
    }
    catch (e) {
        console.log('Ha ocurrido un error en la conexión con la base de datos.');
        console.log(e);
    }
}