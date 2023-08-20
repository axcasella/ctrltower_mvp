import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import vendorRoutes from './routes/vendors.js';
import generalRoutes from './routes/general.js';
import contractManagementRoutes from './routes/contract_management.js';
import dealsRoutes from './routes/deals.js';
import settingsRoutes from './routes/settings.js';

// Mock data import
import User from "./models/user.js";
import { dataUser } from "./data/index.js";

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
// for vendors
app.use("/vendors", vendorRoutes);
// for dashboard
app.use("/general", generalRoutes); 
// for management of contracts
app.use("/contract_management", contractManagementRoutes);
// for deal status
app.use("/deals", dealsRoutes);
// for settings
app.use("/settings", settingsRoutes);

// Mongoose
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    // Mock data
    // Do this only once
    // User.insertMany(dataUser).then(() => console.log("Mock user data inserted"));

}).catch((error) => console.log(error.message));

