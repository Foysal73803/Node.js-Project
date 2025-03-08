//packages imports
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-doc";
import dotenv  from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";
//security
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
//Files import
import connectDB from "./config/db.js";
//Routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoute.js";
import errorMiddleware from "./middelwares/errorMiddleware.js";
import authMiddleware from "./middelwares/authMiddleware.js";

dotenv.config();

const app = express();
////middlewares 
app.use(ExpressMongoSanitize());
app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

///////routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

app.use(errorMiddleware);

//mongo connection
connectDB();

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Node server running in development mode on port no ${PORT}`.bgCyan.white);
    console.log(`${process.env.MONGO_URL}`.bgGreen.white);
});