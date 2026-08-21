export const products = [
  {
    id: 1,
    slug: "copper-rod",
    name: "Copper Rod",
    description:
      "High-purity copper rods for cable manufacturing and transformer/motor windings—engineered for consistent purity and conductivity.",
    sku: "01/05",
    featured: true,
    icon: "/products/product1-card.webp",
    longDescription:
      "High-purity copper rods for wire drawing, cable manufacturing, and industrial applications requiring consistent quality.",
    applications: [
      "Cable manufacturing (power, communication)",
      "Enameled copper wire production",
      "Transformer and motor windings",
      "Super fine wire applications",
      "Electrical and mechanical uses requiring high conductivity",
      "Round and sector conductor use",
      "Telephone and network cabling",
      "Automotive wire harnesses",
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Telurium, max", unit: "% min", astm: "2.0", ucr: "<2.0" },
      { parameter: "Selenium, max", unit: "% max", astm: "2.0", ucr: "<2.0" },
      { parameter: "Bismuth, max", unit: "ppm", astm: "1.0", ucr: "<1.0" },
      { parameter: "Antimony, max", unit: "ppm", astm: "3.0", ucr: "<3.0" },
      { parameter: "Tin, max", unit: "ppm", astm: "4.0", ucr: "<4.0" },
      { parameter: "Lead, max", unit: "ppm", astm: "5.0", ucr: "<5.0" },
      { parameter: "Iron, max", unit: "ppm", astm: "5.0", ucr: "<5.0" },
      { parameter: "Nickel, max", unit: "ppm", astm: "5.0", ucr: "<5.0" },
      { parameter: "Sulfur, max", unit: "ppm", astm: "10.0", ucr: "<10.0" },
      { parameter: "Silver, max", unit: "ppm", astm: "10.0", ucr: "<15.0" },
      { parameter: "Bismuth, min", unit: "ppm", astm: "15.0", ucr: "<25.0" },
      { parameter: "Oxygen", unit: "ppm", astm: "25.0", ucr: "200-350" },
      { parameter: "Surface oxide", unit: "ppm", astm: "100-650", ucr: "<350" },
      { parameter: "Elongation", unit: "%", astm: "Max 750", ucr: ">40%" },
      { parameter: "Tensile strength", unit: "Mpa", astm: "Min 30", ucr: "<210" },
      { parameter: "Diameter", unit: "Tolerance in mm", astm: "+0.38", ucr: "+0.38" },
      { parameter: "Rod conductivity", unit: "% IACS", astm: "Min 100%", ucr: ">101%" },
    ],
    packagingDimensions: {
      outerDiameter: "1750 mm",
      innerDiameter: "900 mm",
      heightOfCoils: "600 mm",
      weightRanges: "3050 - 4800 Kgs (Weld free with End seals on earth end)",
      coilLaidType: "Laid Type",
      packaging:
        "Compacted, Strapped & Wrapped with polyethylene wraps and complete protection of copper with tube cover seaworthy packaging",
    },
    sizes: ["8 mm", "12.5 mm", "16 mm"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards",
  },
  {
    id: 2,
    slug: "drawn-wire",
    name: "Drawn wire",
    description:
      "Copper wire for power cables manufacturers, communication cables, round/sector conductors, and high-conductivity electrical applications.",
    sku: "02/05",
    featured: false,
    icon: "/products/product2-card.webp",
    longDescription:
      "Drawn copper wire used across power, communication, and transformer/motor winding applications.",
    applications: [
      "Power cables manufacturers",
      "Automotive wire harness",
      "Communication cables",
      "Enameled copper wire",
      "Round and sector conductors",
      "Transformer and motor windings",
      "Electrical and mechanical applications requiring high conductive copper",
      "Super fine wire applications",
      "Telephone and network cables",
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "-", ucr: ">99.95" },
      { parameter: "Oxygen", unit: "ppm", astm: "-", ucr: "100-650" },
      { parameter: "Temper", unit: "-", astm: "-", ucr: "Hard/Soft (Annealed)" },
      {
        parameter: "Elongation",
        unit: "%",
        astm: "-",
        ucr: "Min 25% for .5mm-2.55, Min 30% for 2.5mm & above",
      },
      { parameter: "Diameter", unit: "Tolerance in %", astm: "-", ucr: "Min 210" },
      { parameter: "Rod Conductivity", unit: "% IACS", astm: "-", ucr: "Min 100%" },
      { parameter: "Surface Condition", unit: "-", astm: "-", ucr: "Clean & Scratch-free" },
    ],
    packagingDimensions: {
      weightRanges: "300 - 1200 Kgs",
      packaging: "Hexagon Box / Steel Baskets",
    },
    sizes: ["1.02 mm to 4 mm"],
    productSpecification: "BSEN/IEC 60228, ASTM B3-13 (2018)",
  },
  {
    id: 3,
    slug: "tin-coated-copper-wire",
    name: "Tin coated copper wire",
    description:
      "Tin-coated copper wire for solar cables manufacturers, earthing applications, and high-conductivity anti-corrosion wiring.",
    sku: "03/05",
    featured: false,
    icon: "/products/product3-card.webp",
    longDescription:
      "Tin coated copper wire with protective tin coating designed for superior corrosion resistance and demanding applications.",
    applications: [
      "For solar cables manufacturers",
      "Earthing",
      "Electrical & mechanical applications requiring high conductive and anti-corrosion copper",
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "-", ucr: ">99.95" },
      { parameter: "Tin Thickness", unit: "Micron", astm: "-", ucr: "1 to 20" },
      { parameter: "Temper", unit: "-", astm: "-", ucr: "Hard/Soft (Annealed)" },
      { parameter: "Elongation", unit: "%", astm: "-", ucr: "Min EAB 27%" },
      { parameter: "Tensile Strength", unit: "Mpa", astm: "-", ucr: "Min 210" },
      { parameter: "Diameter", unit: "Tolerance in %", astm: "-", ucr: "+1%" },
      { parameter: "Rod Conductivity", unit: "% IACS", astm: "-", ucr: "Min 100%" },
      { parameter: "Surface Condition", unit: "-", astm: "-", ucr: "Clean & Scratch-free" },
    ],
    packagingDimensions: {
      weightRanges: "300 - 1200 Kgs",
      packaging: "Hexagon box / Steel Baskets",
    },
    sizes: ["1.25 mm to 3.75 mm"],
    productSpecification: "BSEN/IEC 60228, ASTM B33",
  },
  {
    id: 4,
    slug: "drawn-wire-for-can-welding",
    name: "Drawn Copper Wire for Can Welding",
    description:
      "Drawn copper wire for food & beverage can weld, aerosol can weld, and industrial can/container body welding.",
    sku: "04/05",
    featured: false,
    icon: "/products/product4-card.webp",
    imageFit: "contain",
    longDescription:
      "Drawn copper wire for can welding applications including food & beverage, aerosol, and industrial containers.",
    applications: [
      "Food and beverage can weld",
      "Aerosol can weld",
      "Industrial can and metal container body welding",
    ],
    technicalParameters: [
      { parameter: "Shape of Wire", unit: "-", astm: "-", ucr: "Round" },
      { parameter: "Temper", unit: "-", astm: "-", ucr: "Hard, soft, annealed & unannealed" },
      { parameter: "Specific Gravity", unit: "g/cm3", astm: "-", ucr: "8.89" },
      { parameter: "Color", unit: "-", astm: "-", ucr: "Reddish" },
      { parameter: "Surface Condition", unit: "-", astm: "-", ucr: "Clean, smooth & scratch-free" },
      { parameter: "Number of Wires", unit: "-", astm: "-", ucr: "1" },
      { parameter: "Nominal Diameter", unit: "mm", astm: "-", ucr: "1.24, 1.38 & 1.50" },
      { parameter: "Tensile Strength", unit: "MPa", astm: "-", ucr: "245 - 285" },
      { parameter: "Yield Strength, Rp0.2 (min.)", unit: "MPa", astm: "-", ucr: "180" },
      { parameter: "Elongation", unit: "%", astm: "-", ucr: "22 - 28" },
      { parameter: "Conductivity at 20 °C, min.", unit: "% IACS", astm: "-", ucr: "99.14" },
      { parameter: "Resistivity at 20 °C, max.", unit: "Ω mm²/m", astm: "-", ucr: "0.01739" },
      { parameter: "Copper Purity", unit: "%", astm: "-", ucr: "≥99.90" },
      { parameter: "Oxygen, max.", unit: "ppm", astm: "-", ucr: "400" },
      { parameter: "Total Impurities, max.", unit: "ppm", astm: "-", ucr: "65" },
    ],
    packagingDimensions: {
      cartonBoxOuterDiameter: "1100 mm",
      cartonBoxInnerDiameter: "1080 mm",
      heightOfCartonBox: "1390 mm",
      netWeightRanges: "500 - 1400 kg",
      wireLayingType: "Orbital",
      packaging: "Octabin box + wooden pallet with green straps (IPPC seal)",
    },
    sizes: ["1.24 mm", "1.38 mm", "1.50 mm"],
    productSpecification: "ASTM B1, ASTM B3 & ASTM B49",
  },
  {
    id: 5,
    slug: "oxygen-free-copper-rods",
    name: "Oxygen-Free Copper Rods",
    description:
      "High-quality oxygen-free copper rods with an oxygen content of 3–5 ppm for fine/super-fine electrical wires and high-conductivity applications.",
    sku: "05/05",
    featured: false,
    icon: "/products/product5-card.webp",
    longDescription:
      "Oxygen-free copper rods designed for high-conductivity and demanding electrical applications.",
    applications: [
      "Fine and super-fine electrical wires (UNS C10100)",
      "Overhead traction contact wires (UNS C10700)",
      "Communication and coaxial cable conductors",
      "Electrical windings",
      "Busbars and high-conductivity electrical conductors",
      "Printed-circuit foil",
      "Transformer and motor winding wires and strips",
      "Transistor bases",
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.99", ucr: "99.95 (inc. Ag)" },
      { parameter: "Telurium, max", unit: "ppm", astm: "2.0", ucr: "-" },
      { parameter: "Selenium, max", unit: "ppm", astm: "3.0", ucr: "-" },
      { parameter: "Bismuth, max", unit: "ppm", astm: "1.0", ucr: "5.0" },
      { parameter: "Antimony, max", unit: "ppm", astm: "4.0", ucr: "-" },
      { parameter: "Arsenic, max", unit: "ppm", astm: "5.0", ucr: "-" },
      { parameter: "Tin, max", unit: "ppm", astm: "2.0", ucr: "-" },
      { parameter: "Lead, max", unit: "ppm", astm: "5.0", ucr: "-" },
      { parameter: "Iron, max", unit: "ppm", astm: "10.0", ucr: "-" },
      { parameter: "Nickel, max", unit: "ppm", astm: "10.0", ucr: "-" },
      { parameter: "Sulfur, max", unit: "ppm", astm: "15.0", ucr: "-" },
      { parameter: "Silver, max", unit: "ppm", astm: "25.0", ucr: "850.0-1200.0" },
      { parameter: "Oxygen, max", unit: "ppm", astm: "5.0", ucr: "5.0" },
      { parameter: "Cadmium, max", unit: "ppm", astm: "1.0", ucr: "-" },
      { parameter: "Phosphorus, max", unit: "ppm", astm: "3.0", ucr: "-" },
      { parameter: "Zinc, max", unit: "ppm", astm: "1.0", ucr: "-" },
      { parameter: "Manganese, max", unit: "ppm", astm: "0.5", ucr: "-" },
      { parameter: "∑Other Elements, max", unit: "ppm", astm: "-", ucr: "65.0" },
      { parameter: "Tensile Strength, min", unit: "MPa", astm: "170", ucr: "200" },
      { parameter: "Elongation, min", unit: "%", astm: "30.0", ucr: "42.0" },
      { parameter: "Conductivity, min", unit: "%", astm: "101.0", ucr: "100.0" },
    ],
    packagingDimensions: {
      outerDiameter: "1750 mm",
      innerDiameter: "900 mm",
      heightOfCoils: "600 mm",
      weightRanges: "3050 - 4800 Kg (Weld free with End seals on earth end)",
      coilLaidType: "Orbital",
      packaging:
        "Compacted, strapped and polyethylene-wrapped, with a tube cover for complete copper protection and seaworthy packaging.",
    },
    sizes: ["8.0 mm – 30.0 mm"],
    productSpecification: "ASTM B49, BS EN 1977 & BS EN 13601 Standards",
  }
  /*
  {
    id: 5,
    slug: "bobbins",
    name: "Bobbins",
    description: "Precision-wound copper coils on bobbins for transformers, inductors, and electromagnetic applications.",
    sku: "05/9",
    featured: false,
    longDescription: "Our Bobbins feature precision-wound copper coils that deliver exceptional performance in transformers, inductors, and electromagnetic applications. Each bobbin is crafted with precision to ensure consistent inductance values and minimal losses.",
    specifications: ["Precision-wound coils", "Multiple bobbin sizes", "Custom configurations available", "Low impedance", "High efficiency"],
    applications: [
      "Transformer manufacturing",
      "Inductor production",
      "Electromagnetic applications",
      "Power electronics",
      "RF coil applications",
      "Energy storage devices"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Inductance tolerance", unit: "%", astm: "±10", ucr: "±5" },
      { parameter: "Impedance", unit: "mΩ", astm: "Standard", ucr: "Optimized" }
    ],
    packagingDimensions: {
      outerDiameter: "1500 mm",
      innerDiameter: "800 mm",
      heightOfBobbins: "400-500 mm",
      weightRanges: "2000 - 3500 Kgs",
      customConfigurations: "Available upon request"
    },
    sizes: ["Various"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards"
  },
  {
    id: 6,
    slug: "alloys",
    name: "Alloys",
    description: "Specialized copper alloy products combining excellent conductivity with enhanced mechanical strength.",
    sku: "06/9  ",
    featured: false,
    longDescription: "Our Copper Alloy products combine the excellent conductivity of pure copper with enhanced mechanical strength from strategic alloying. Perfect for applications requiring both electrical performance and mechanical durability.",
    specifications: ["Enhanced strength", "Excellent conductivity", "Corrosion resistant", "Temperature stable", "Custom alloy compositions"],
    applications: [
      "High-strength electrical applications",
      "Aerospace components",
      "Automotive electrical systems",
      "Marine applications",
      "Temperature-critical applications",
      "Chemical resistant environments"
    ],
    technicalParameters: [
      { parameter: "Copper base", unit: "% min", astm: "≥95", ucr: ">96" },
      { parameter: "Tensile strength", unit: "MPa", astm: "≥220", ucr: ">250" },
      { parameter: "Electrical conductivity", unit: "% IACS", astm: ">80", ucr: ">85" }
    ],
    packagingDimensions: {
      outerDiameter: "1600 mm",
      innerDiameter: "850 mm",
      heightOfCoils: "550 mm",
      weightRanges: "2800 - 4300 Kgs",
      coilLaidType: "Laid Type"
    },
    sizes: ["0.5 MM", "1.0 MM", "1.5 MM"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards"
  },
  {
    id: 7,
    slug: "ribbon-wires",
    name: "Ribbon Wires",
    description: "Flat copper ribbon conductors for high-current applications and thermal management systems.",
    sku: "07/9",
    featured: false,
    longDescription: "Ribbon Wires feature a flat cross-section design that maximizes surface area for thermal dissipation while maintaining superior electrical conductivity. Ideal for high-current applications and advanced thermal management systems.",
    specifications: ["Flat profile design", "High current capacity", "Excellent thermal properties", "Multiple widths available", "Superior heat dissipation"],
    applications: [
      "High-current applications",
      "Thermal management systems",
      "Power electronics",
      "Induction heating",
      "Large transformer windings",
      "Industrial bus bars"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Thermal conductivity", unit: "W/m·K", astm: "≥400", ucr: ">420" },
      { parameter: "Width range", unit: "mm", astm: "Various", ucr: "Custom" }
    ],
    packagingDimensions: {
      outerDiameter: "1700 mm",
      innerDiameter: "900 mm",
      heightOfRibbon: "480 mm",
      weightRanges: "3200 - 4800 Kgs",
      coilType: "Flat coil configuration"
    },
    sizes: ["2 MM", "4 MM", "6 MM"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards"
  },
  {
    id: 8,
    slug: "flatwire-products",
    name: "Flatwire Products",
    description: "Custom flat copper wire solutions for aerospace, automotive, and renewable energy sectors.",
    sku: "08/9",
    featured: false,
    longDescription: "Flatwire Products represent our cutting-edge copper wire technology tailored for demanding industries including aerospace, automotive, and renewable energy. These custom solutions deliver uncompromising performance in the most challenging environments.",
    specifications: ["Aerospace grade", "Automotive approved", "Renewable energy compatible", "Custom dimensions", "Highest quality standards"],
    applications: [
      "Aerospace wiring",
      "Automotive power systems",
      "Renewable energy applications",
      "Wind turbine generators",
      "Solar installations",
      "High-performance vehicles"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Flatness tolerance", unit: "mm", astm: "±0.5", ucr: "±0.2" },
      { parameter: "Tensile strength", unit: "MPa", astm: "200-240", ucr: "220-260" }
    ],
    packagingDimensions: {
      outerDiameter: "1650 mm",
      innerDiameter: "880 mm",
      heightOfCoils: "540 mm",
      weightRanges: "3000 - 4600 Kgs",
      qualityGrade: "Aerospace certified"
    },
    sizes: ["0.8 MM", "1.2 MM", "1.8 MM"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards"
  },
  {
    id: 9,
    slug: "plaited-wire",
    name: "Plaited Wire",
    description: "Interwoven copper strands providing superior flexibility and durability in demanding environments.",
    sku: "09/9",
    featured: false,
    longDescription: "Plaited Wire combines multiple copper strands in an interwoven pattern to provide exceptional flexibility and durability. The plaited design ensures consistent performance even in harsh conditions and challenging mechanical environments.",
    specifications: ["Interwoven strands", "Superior flexibility", "Exceptional durability", "High tensile strength", "Corrosion resistant"],
    applications: [
      "Flexible conductor systems",
      "Medical device applications",
      "Experimental equipment",
      "High-cycle flex applications",
      "Specialized industrial uses",
      "Portable equipment connections"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Plaiting pattern", unit: "count", astm: "8-16", ucr: "Customizable" },
      { parameter: "Flex cycles", unit: "cycles", astm: ">100k", ucr: ">200k" }
    ],
    packagingDimensions: {
      outerDiameter: "1550 mm",
      innerDiameter: "850 mm",
      heightOfCoils: "520 mm",
      weightRanges: "2800 - 4200 Kgs",
      coilLaidType: "Plaited arrangement"
    },
    sizes: ["3 MM", "5 MM", "7 MM"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards"
  }
  */
];
