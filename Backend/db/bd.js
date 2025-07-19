import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("DataBase Connected");
  } catch (error) {
    console.error("DataBase Connected Failed"); //ITS same as console.log but show error messages in red color

    process.exit(1); //Ye Nodejs ki app ko bolte ha stop immidiately
  }
};

export default connectDB;
