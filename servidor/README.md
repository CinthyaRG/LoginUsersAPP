# servidor

## Instalar dependecias de package.json

```
npm install
```

### Compilar y correr proyecto para desarrollo

```
npm start
```

### Compilar y crear los ejecutación para producción

```
npm run build
```

### Archivo de ejemplo para las variables de entorno

```
PORT=3000
MONGO_URI="mongodb://url/database"
TOKEN_SECRET="token-secret"
CLOUDINARY_CLOUD_NAME="cloud_cloudinary"
CLOUDINARY_API_KEY="key"
CLOUDINARY_API_SECRET="api_secret"
```

- `Crear un archivo llamado .env con las variables anteriores. Para obtener el valor de las variables CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET se debe registrar en https://cloudinary.com/users/register/free y seguir los pasos.`
