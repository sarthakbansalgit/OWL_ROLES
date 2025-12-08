import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet"
import connectDB from "../../backend/utils/db.js";
import userRoute from "../../backend/routes/user.route.js";
import companyRoute from "../../backend/routes/company.route.js";
import jobRoute from "../../backend/routes/job.route.js";
import chartRoutes from "../../backend/routes/chart.route.js";
import applicationRoute from "../../backend/routes/application.route.js";
import blogRoutes from "../../backend/routes/blog.route.js"
import b2bAnalyticsRoutes from "../../backend/routes/b2b.route.js";

// Environment variables are already loaded by Netlify from dashboard

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://owlrole.netlify.app', process.env.CLIENT_URL || '*'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma']
}

app.use(cors(corsOptions));
app.use(cookieParser());

// Connect DB on startup
let dbConnected = false;

const initDB = async () => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log('Database connected for Netlify Functions');
    } catch (error) {
      console.error('Failed to connect database:', error);
    }
  }
};

// Initialize database connection
initDB();

// Add middleware to ensure DB is connected before handling requests
app.use((req, res, next) => {
  if (!dbConnected) {
    console.warn('Database not yet connected, attempting reconnection...');
    initDB().then(() => next()).catch(err => {
      console.error('Database connection failed:', err);
      next();
    });
  } else {
    next();
  }
});

// Routes - Note: Netlify strips /api prefix, so routes start from /v1
app.use("/v1/user", userRoute);
app.use("/v1/company", companyRoute);
app.use("/v1/job", jobRoute);
app.use("/v1/application", applicationRoute);
app.use("/v1/blog", blogRoutes);
app.use('/v1/charts', chartRoutes);
app.use("/v1/b2b/analytics", b2bAnalyticsRoutes);

// Root route
app.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "OWL ROLES API on Netlify 🦉"
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// Export for Netlify Functions
export { app as default };

