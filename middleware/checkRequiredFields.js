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
  const missingFields = [];

  requiredShipperFields.forEach(field => {
    if (!req.body.hasOwnProperty(field)) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required fields.",
      fields: missingFields
    });
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
  const missingFields = [];

  requiredCarrierFields.forEach(field => {
    if (!req.body.hasOwnProperty(field)) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return res.status(404).json({
      message: "Missing required fields.",
      fields: missingFields
    });
  }

  next();
};

export const checkRequiredLoadFields = (req, res, next) => {
  const requiredFields = [
      'origin_address', 'origin_city', 'origin_state', 'origin_country', 'origin_zip_code',
      'destination_address', 'destination_city', 'destination_state', 'destination_country', 'destination_zip_code',
      'pick_up_date', 'pick_up_time', 'delivery_date', 'delivery_time', 'freight_type',
      'freight_weight', 'dimension_length', 'dimension_width', 'dimension_height',
      'freight_description', 'trailer_needed', 'special_equipment_description', 'rate',
      'payment_term', 'check_in_instruction', 'reference_number', 'hazmat'
  ];

  const missingFields = [];

  requiredFields.forEach(field => {
      if (!req.body.hasOwnProperty(field)) {
          missingFields.push(field);
      }
  });

  if (missingFields.length > 0) {
      return res.status(400).json({
          error: 'Missing required fields',
          fields: missingFields
      });
  }

  next();
};