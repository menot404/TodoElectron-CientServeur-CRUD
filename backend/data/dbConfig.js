const { default: mongoose } = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/todoapp";
const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`✅ Connecté à mongoDB`);
  } catch (error) {
    console.error(`❌ Error Connect: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect();
