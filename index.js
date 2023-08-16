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