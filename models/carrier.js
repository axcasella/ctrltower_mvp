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
const CarrierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    freight_types: {
      type: [String],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    primary_contact_name: {
      type: String,
      required: true,
    },
    equipment_types: {
      type: [String],
    },
    support_hazard: {
      type: Boolean,
      required: true,
    },
    insurance_on_file: {
      type: String,
      required: true,
    },
    fleet_size: {
      type: Number,
      required: true,
    },
    driver_count: {
      type: Number,
      required: true,
    },
    usdot: {
      type: String,
      required: true,
    },
    mc_number: {
      type: String,
      required: true,
    },
    preferred_routes: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Carrier = mongoose.model("Carrier", CarrierSchema);
export default Carrier;