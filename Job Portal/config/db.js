import mongoose from "mongoose";
import  colors  from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL);
    } catch (error) {
        console.log(`Mongodb Error ${error}`.bgRed.black);
    }
};
export default connectDB;