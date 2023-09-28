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
import rfp_managementRoutes from './routes/rfp_management.js';
import settingsRoutes from './routes/settings.js';
import dealsRoutes from './routes/deals.js';

// Mock data import
import User from "./models/user.js";
import Shipper from "./models/shipper.js";
import Vendor from "./models/vendor.js";
import VendorCompliance from "./models/vendorCompliance.js";
import VendorShipperStats from "./models/vendorShipperStats.js";

import { dataUser, dataVendor, dataVendorCompliance, dataShipper, dataVendorShipperStats } from "./data/index.js";

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
// for RFPs
app.use("/rfp_management", rfp_managementRoutes);

// Mongoose
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    // Mock data
    // Do this only once
    
    // User.insertMany(dataUser).then(() => console.log("Mock user data inserted"));
    // Vendor.insertMany(dataVendor).then(() => console.log("Mock vendor data inserted"));
    // VendorCompliance.insertMany(dataVendorCompliance).then(() => console.log("Mock vendor compliance data inserted"));
    // Shipper.insertMany(dataShipper).then(() => console.log("Mock shipper data inserted"));
    // VendorShipperStats.insertMany(dataVendorShipperStats).then(() => console.log("Mock vendor shipper stats inserted"));

}).catch((error) => console.log(error.message));

