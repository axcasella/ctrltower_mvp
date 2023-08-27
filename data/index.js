export const dataUser = [
  {
    _id: "63701cc1f03239c72c00017f",
    name: "Matt Kennedy",
    email: "matt@frida.com",
    password: "pass0",
    company: "Frida",
    phone: "8346315874",
    occupation: "Staff"
  },
  {
    _id: "63701cc1f03239c72c000180",
    name: "Cole Hamilton",
    email: "cole@littlespoon.com",
    password: "pass0",
    phone: "9981906117",
    company: "Little Spoon",
    occupation: "Staff"
  },
];

export const dataVendor = [
  {
    _id: "6371259df03239e680000035",
    name: "Greyhound",
    type: "carrier",
    description: "Long haul carrier based out of California",
    tags: [
      "long-haul", "flat-bed"
    ],
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: 94105,
    phone_number: "415-555-5555",
    email: "info@greyhound.com",
    website: "https://www.greyhound.com/",
  },
  {
    _id: "6371259ef032398675000198",
    name: "GREYS WAY LLC",
    type: "carrier",
    description: "Long haul carrier based out of California",
    tags: [
      "long-haul", "heavy-freight"
    ],
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: 94105,
    phone_number: "415-555-5555",
    email: "info@greyhound.com",
    website: "https://www.greyhound.com/",
  },
  {
    _id: "6371259df03239b7f7000083",
    name: "A & B BLACKTOPPING INC",
    type: "carrier",
    description: "Tanker carrier, large storage capacity",
    tags: [
      "tanker"
    ],
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: 94105,
    phone_number: "415-555-5555",
    email: "info@greyhound.com",
    website: "https://www.greyhound.com/",
  },
  {
    _id: "6371259df03239444100035a",
    name: "BLACK & MEEK MILLING CO",
    type: "carrier",
    description: "Long haul carrier, family business",
    tags: [
      "long-haul"
    ],
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: 94105,
    phone_number: "415-555-5555",
    email: "info@greyhound.com",
    website: "https://www.greyhound.com/",
  },
  {
    _id: "6371259df03239d81e000083",
    name: "BLACK INK TRANSPORTATION LLC",
    type: "carrier",
    description: "Has a fleet of mega carriers and dry beds.",
    tags: [
      "dry-bed", "mega-trailer"
    ],
    address: "123 Main St",
    city: "Catskills",
    state: "NY",
    zip: 94105,
    phone_number: "877-555-5555",
    email: "info@greyhound.com",
    website: "https://www.greyhound.com/",
  }
];

export const dataVendorCompliance = [
  {
    _id: "6371251df03239e680000033",
    vendorID: "6371259df03239e680000035",
    rating: 5,
    safer_fmcsa: {
      entity_type: "",
      legal_name: "",
      physical_address: "",
      phone: "", 
      mailing_address: "", 
      usdot: "", 
      duns_number: "", 
      drivers: "", 
      mileage: "", 
      out_of_service_date: "", 
      operation_classification: "", 
      cargo_carried: "", 
      tow: "", 
      injury: "", 
      fatal: "", 
      safety_rating: "", 
      safety_rating_date: "", 
      safety_review_date: ""
    }
  },
  {
    _id: "6371251df03239e680000034",
    vendorID: "6371259ef032398675000198",
    rating: 3,
    safer_fmcsa: {
      entity_type: "",
      legal_name: "",
      physical_address: "",
      phone: "", 
      mailing_address: "", 
      usdot: "", 
      duns_number: "", 
      drivers: "", 
      mileage: "", 
      out_of_service_date: "", 
      operation_classification: "", 
      cargo_carried: "", 
      tow: "", 
      injury: "", 
      fatal: "", 
      safety_rating: "", 
      safety_rating_date: "", 
      safety_review_date: ""
    }
  },
  {
    _id: "6371251df032398675000196",
    vendorID: "6371259df03239b7f7000083",
    rating: 4,
    safer_fmcsa: {
      entity_type: "",
      legal_name: "",
      physical_address: "",
      phone: "", 
      mailing_address: "", 
      usdot: "", 
      duns_number: "", 
      drivers: "", 
      mileage: "", 
      out_of_service_date: "", 
      operation_classification: "", 
      cargo_carried: "", 
      tow: "", 
      injury: "", 
      fatal: "", 
      safety_rating: "", 
      safety_rating_date: "", 
      safety_review_date: ""
    }
  },
  {
    _id: "6371251df032398675000197",
    vendorID: "6371259df03239444100035a",
    rating: 5,
    safer_fmcsa: {
      entity_type: "",
      legal_name: "",
      physical_address: "",
      phone: "", 
      mailing_address: "", 
      usdot: "", 
      duns_number: "", 
      drivers: "", 
      mileage: "", 
      out_of_service_date: "", 
      operation_classification: "", 
      cargo_carried: "", 
      tow: "", 
      injury: "", 
      fatal: "", 
      safety_rating: "", 
      safety_rating_date: "", 
      safety_review_date: ""
    }
  },
  {
    _id: "6371251df03239b7f7000081",
    vendorID: "6371259df03239d81e000083",
    rating: 3,
    safer_fmcsa: {
      entity_type: "",
      legal_name: "",
      physical_address: "",
      phone: "", 
      mailing_address: "", 
      usdot: "", 
      duns_number: "", 
      drivers: "", 
      mileage: "", 
      out_of_service_date: "", 
      operation_classification: "", 
      cargo_carried: "", 
      tow: "", 
      injury: "", 
      fatal: "", 
      safety_rating: "", 
      safety_rating_date: "", 
      safety_review_date: ""
    }
  },
];