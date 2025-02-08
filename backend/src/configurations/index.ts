export default () => ({
    port: process.env.PORT,
    db_uri: process.env.DB_PORT,
    secret_jwt: process.env.JWT_SECRET,
    expire_jwt: process.env.EXPIRE_JWT
})