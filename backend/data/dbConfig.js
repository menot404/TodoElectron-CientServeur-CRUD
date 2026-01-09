const { default: mongoose } = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.DATABASE_URL;
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`✅ Connecté à mongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error Connect: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect();
