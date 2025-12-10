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

// Flexible CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests from localhost, 172.x.x.x, and Vercel domains
        if (!origin || 
            origin === 'http://localhost:5174' || 
            origin === 'http://localhost:5173' ||
            origin.includes('172.') || 
            origin.includes('vercel.app') ||
            process.env.CLIENT_URL === origin) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for now
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Morgan middleware for logging (simplified for Vercel)
try {
    app.use(morgan('combined', { stream: dualStream }));
} catch (e) {
    console.log('Morgan logging not available in production');
}

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'OWL ROLES Backend API',
        status: 'running',
        timestamp: new Date()
    });
});

app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is healthy' });
});

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

// For Vercel Serverless Functions
export const handler = app;
