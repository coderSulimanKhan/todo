import "dotenv/config"

const envs = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
};

export default envs;