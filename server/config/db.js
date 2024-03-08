module.exports = {
  HOST: "chatroom-db.postgres.database.azure.com",
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: "chatroom_prod",
  PORT: 5432,
  dialect: "postgres",
  SSL: true,
};
