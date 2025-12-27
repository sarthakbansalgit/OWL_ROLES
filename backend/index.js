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
import { initializeGridFS } from "./utils/gridfs.js";
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
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173', 
            'http://localhost:5174',
            'http://localhost:3000',
            "https://cubicles.netlify.app", 
            "https://owl-roles-um59.vercel.app", 
            "https://owl-roles2-59yw49qv9-sarthaks-projects-ba3df7d0.vercel.app",
            "https://owl-roles-1.onrender.com",  // Render frontend
            "https://owl-roles.onrender.com",    // Render backend (for same-origin)
            process.env.CLIENT_URL,
        ];
        
        // Check against allowed origins or regex patterns
        const isAllowed = allowedOrigins.includes(origin) || 
                         /\.onrender\.com$/.test(origin) || 
                         /\.up\.railway\.app$/.test(origin) ||
                         /\.netlify\.app$/.test(origin) ||
                         !origin; // Allow requests with no origin (like mobile apps)
        
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma']
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("combined", { stream: dualStream }));

// Increase timeout for file upload routes
app.use('/api/v1/user/profile/update', (req, res, next) => {
    req.setTimeout(120000); // 2 minutes for file uploads
    next();
});

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

// Start server on all environments except Vercel
if (process.env.VERCEL !== '1') {
    app.listen(PORT, '0.0.0.0', async ()=>{
        await connectDB();
        await initializeGridFS();
        console.log(`\n${'='.repeat(50)}`);
        console.log(`✓ Server running at http://0.0.0.0:${PORT}`);
        console.log(`✓ API Docs: http://localhost:${PORT}/api-docs`);
        console.log(`${'='.repeat(50)}\n`);
    });
} else {
    // Connect DB on startup for Vercel
    connectDB().then(() => initializeGridFS());
}

// Export for Vercel
export default app;