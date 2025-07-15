// src/data/saveData.js

export const savedUserData = {
  name: "Embedding Check again",
  email: "Embeddingagain@example.com",
  type: "individual",
  businessAddress: "Model Town, Lahore",
  phoneNumber: { countryCode: "+92", phoneNo: "3001234567" },
  imgUrl: "https://via.placeholder.com/150",
  location: {
    name: "Lahore",
    coordinates: [74.3587, 31.5204],
  },
};

export const savedCarData = {
  title: "Embedding Check____again 2025",
  regNo: "LEC-2020",
  description: "Top condition, no accidents, single owner.",
  make: "Honda",
  model: 2020,
  variant: "Oriel",
  color: "Black",
  fuel: "Petrol",
  transmission: "Manual",
  condition: "Excellent",
  features: {
    exterior: ["Alloy Rims", "Fog Lights"],
    interior: ["Push Start", "Cruise Control"],
  },
  noOfOwners: 1,
  horsePower: 125,
  mileage: 35000,
  engineSize: 1500,
  accidentHistory: "None",
  location: {
    name: "Lahore",
    coordinates: [74.3587, 31.5204],
  },
  postedOn: new Date().toISOString().slice(0, 16),
  duration: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // +3 days
images: {
  exterior: [],
  interior: [],
  wheels: [],
  tyreTreads: [],
  carVideo: [],
},

  // ✅ Add these missing fields:
  staringBidPrice: 1000, // fix typo if applicable
  reserveBidPrice: 15000,
  buyNowPrice: 20000,
  
  traderDiscount: 0,
};



export const savedInspectionReport = {
  interiorChecks: {
    glowPlugLight: "OK",
    airbagWarningLight: "OK",
    oilWarningLight: "OK",
    absWarningLight: "OK",
    breakWearIndicatorLight: "OK",
    engineManagementLight: "OK",
  },
  essentialChecks: {
    wipers: "OK",
    electricMirrors: "OK",
    electricWindows: "OK",
    indicators: "OK",
    fogLight: "OK",
    brakeLight: "OK",
    sideLight: "OK",
    headLight: "OK",
  },
  dynamicOperations: {
    suspensionRideHeight: "OK",
    steeringNoise: "OK",
    reverseClutchSlip: "OK",
    staticGearSelection: "OK",
    handBrakeTest: "OK",
    breakEfficiency: "OK",
  },
};

export const savedDamageReport = {
  front: [],
  back: ["Scratches"],
  left: [],
  right: [],
  roof: [],
};
