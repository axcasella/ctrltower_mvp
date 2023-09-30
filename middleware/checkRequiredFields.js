const requiredShipperFields = [
  "name",
  "description",
  "industry",
  "address",
  "city",
  "state",
  "zip",
  "phone",
  "email",
  "website",
  "primary_contact_name"
];

export const checkRequiredShipperFields = (req, res, next) => {
  for (let field of requiredShipperFields) {
    if (!req.body.hasOwnProperty(field)) {
      return res.status(400).json({ message: "Missing required fields." });
    }
  }
  next();
};

const requiredCarrierFields = [
  "name",
  "description",
  "freight_types",
  "address",
  "city",
  "state",
  "zip",
  "country",
  "phone",
  "email",
  "primary_contact_name",
  "support_hazard",
  "insurance_on_file",
  "fleet_size",
  "driver_count",
  "usdot",
  "mc_number"
];

export const checkRequiredCarrierFields = (req, res, next) => {
  for (let field of requiredCarrierFields) {
    if (!req.body.hasOwnProperty(field)) {
      return res.status(404).json({ message: "Missing required fields." });
    }
  }
  next();
};
