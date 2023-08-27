import mongoose from "mongoose";

// Carrier equipment types
// UNKNOWN, VAN, REFRIGERATED, CONTAINER, FLAT_BED, POWER_ONLY, DECK, TAUTLINER, TANKER, CONESTOGA, MEGATRAILER, ROADTRAIN, JUMBO, TILT, BOX

// Carrier accessorial charge types
// “DRIVER_ASSIST”, “DRIVER_INCENTIVE”, “EQUIPMENT_RENTAL”, “EXPEDITED_TEAM_SERVICE”, “FUEL_SURCHARGE”, “HAZMAT”, “LAYOVER”, “LUMPER”, “MULTI_STOP_CHARGE”, “OTHER”, “OUT_OF_ROUTE_MILEAGE” “RECONSIGNMENT”, “TONU”, “TWIC_ESCORT”, “DETENTION_UNLOADING”, “SCALING_CHARGE”, “TIER_PRICING”, “LIQUOR_PERMIT”, “PRE_LOADING_CHARGE”, “ON_TIME_INCENTIVE”, “LATE_FEE”, “EXTRA_STOP_CHARGE”, “TRAILER_WASH”, “PALLET_EXCHANGE_FEE”, “HOLIDAY_DELIVERY”, “WEEKEND_DELIVERY” “TRADE_SHOW_DELIVERY” “INSIDE_DELIVERY” “PALLET_JACK_DELIVERY”, ”STORAGE_FEE”, “LIFTGATE_CHARGE”, “TOLL_CHARGE”, “EXCESSIVE_VALUE_CHARGE” “TRAILER_RELOCATION” “TRAILER_DETENTION”, “BOBTAIL_FEE”, “TRAILER_RENTAL_FEE”, “FLAT_RATE”, “NON_ACCOMODATING_FEE” “RETURNED_LOAD”, “DETENTION_LOADING”.

// Shipment requirements
// https://developer.uberfreight.com/docs/uf-real-time-pricing-and-tendering-apis/1/types/requirements

// Shipment item types
// BAG, BAL, BOX, BUNDLE, CASE, CRATE, CARTON, DRUM, FLOOR, GAYLORD, LOOSE, PALLET, PIECE, ROLL, SKID, SPOOL, TANK, TOTE, WRAPPED, OTHER

// Shipment special handling types
// HVY - Heavy freight
// LGT - Light freight * HVA - High value * LVA - Low cost * DNS - Densely packaged * STK - Stackable * NST - Non-stackable * DAM - Easily damaged * LRG - Large * LOW - Very low * VOL - Extremely volatile * HZD - Hazardous * PAL - Palletized * ODI - Over-dimensional * HOT - Hot load
// HVY, LGT, HVA, LVA, DNS, STK, NST, DAM, LRG, LOW, VOL, HZD, PAL, ODI, HOT
const VendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: Number,
    },
    phone_number: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;