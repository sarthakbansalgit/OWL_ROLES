import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"
import morgan from "morgan";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import chartRoutes from "./routes/chart.route.js";
import applicationRoute from "./routes/application.route.js";
import blogRoutes from "./routes/blog.route.js"
import b2bAnalyticsRoutes from "./routes/b2b.route.js";
import setupSwagger from './docs/swaggerDocs.js';
import { accessLogStream, dualStream } from "./utils/morganConfig.js";
dotenv.config({ path: './.env' });

const app = express();

// Application level middlewares (1)

// External middlewares (3rd party) (2)
app.use(helmet());
// app.use(rate_limiter);          // To prevent DOS attacks  [Fix too many requests error]

// Built-in middlewares (3)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', "https://cubicles.netlify.app", "https://owl-roles-um59.vercel.app", "https://owl-roles2-59yw49qv9-sarthaks-projects-ba3df7d0.vercel.app", process.env.CLIENT_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma']
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("combined", { stream: dualStream }));

const PORT = process.env.PORT || 3000;

// Root route
app.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "OWL ROLES Backend API is running! 🦉",
        endpoints: {
            api: "/api/v1",
            docs: "/api-docs"
        }
    });
});

// api's / Router level middlewares (4)
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/blog" ,blogRoutes);
app.use('/api/v1/charts', chartRoutes);
app.use("/api/v1/b2b/analytics", b2bAnalyticsRoutes);
// Setup Swagger documentation
setupSwagger(app);

// Global Error Handling Middleware (5)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

app.listen(PORT, '0.0.0.0', ()=>{
    connectDB();
    console.log(`\n${'='.repeat(50)}`);
    console.log(`✓ Server running at http://172.20.10.2:${PORT}`);
    console.log(`✓ Or access locally: http://localhost:${PORT}`);
    console.log(`✓ API Docs: http://172.20.10.2:${PORT}/api-docs`);
    console.log(`${'='.repeat(50)}\n`);
});

// Export for Vercel
export default app;