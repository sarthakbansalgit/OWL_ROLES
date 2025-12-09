import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"
import morgan from "morgan";
import connectDB from "../utils/db.js";
import userRoute from "../routes/user.route.js";
import companyRoute from "../routes/company.route.js";
import jobRoute from "../routes/job.route.js";
import chartRoutes from "../routes/chart.route.js";
import applicationRoute from "../routes/application.route.js";
import blogRoutes from "../routes/blog.route.js"
import b2bAnalyticsRoutes from "../routes/b2b.route.js";
import setupSwagger from '../docs/swaggerDocs.js';
import { accessLogStream, dualStream } from "../utils/morganConfig.js";

dotenv.config({ path: './.env' });

const app = express();

// External middlewares (3rd party)
app.use(helmet());

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Morgan middleware for logging
app.use(morgan('combined', { stream: dualStream }));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);
app.use("/api/v1/blog" ,blogRoutes);
app.use('/api/v1/charts', chartRoutes);
app.use("/api/v1/b2b/analytics", b2bAnalyticsRoutes);

// Setup Swagger documentation
setupSwagger(app);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// Connect to database
connectDB();

export default app;
