export const products = [
  {
    id: 1,
    slug: "drawn-wire",
    name: "Drawn Wire",
    description: "Wireroad is where ideas take shape and connections come alive.A place built for creators, thinkers, and forward-doers.Here, every path leads to something meaningful.",
    sku: "01/09",
    icon: "/drawnwire.png",
    featured: true,
    longDescription: "Wireroad is where ideas take shape and connections come alive.A place built for creators, thinkers, and forward-doers.Here, every path leads to something meaningful.",
    specifications: ["ETP Electrolytic copper", "Tough Pitch grade", "99.95% Pure Copper", "High electrical conductivity", "Clean & Scratch-free surface"],
    applications: [
      "Power cables manufacturers",
      "Communication cables",
      "Super fine wire applications",
      "Round and sector conductors",
      "Telephone and network cables",
      "Automotive wire harnesses",
      "Enameled copper wire production",
      "Transformer and motor windings",
      "Electrical and mechanical applications requiring high conductivity"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Oxygen", unit: "ppm", astm: "100-650", ucr: "100-650" },
      { parameter: "Temper", unit: "-", astm: "Hard/Soft", ucr: "Hard/Soft (Annealed)" },
      { parameter: "Elongation", unit: "% min", astm: "25% (0.5-2.55mm), 30% (2.5mm+)", ucr: "Min 25% for .5mm-2.55, Min 30% for 2.5mm & above" },
      { parameter: "Diameter", unit: "Tolerance in %", astm: "Min 210", ucr: "Min 210" },
      { parameter: "Rod Conductivity", unit: "% IACS", astm: "Min 100%", ucr: "Min 100%" },
      { parameter: "Surface Condition", unit: "-", astm: "Clean & Scratch-free", ucr: "Clean & Scratch-free" }
    ],
    packagingDimensions: {
      weightRanges: "300 - 1200 Kgs",
      packaging: "Hexagon Box / Steel Baskets"
    },
    sizes: ["0.2 MM", "1 MM", "2 MM", "3 MM", "4 MM"],
    productSpecification: "BSEN/IEC 60228, ASTM B33"
  },
  {
    id: 2,
    slug: "tin-coated-copper-wire",
    name: "Tin Coated Copper Wire",
    description: "Wireroad is where ideas take shape and connections come alive.A place built for creators, thinkers, and forward-doers.Here, every path leads to something meaningful.",
    sku: "02/9",
    featured: false,
    longDescription: "Tin Coated Copper Wire combines high-quality ETP Electrolytic Tough Pitch copper with protective tin coating (1-20 microns), providing superior corrosion resistance and enhanced performance for demanding applications.",
    specifications: ["ETP Electrolytic copper", "Tin coating 1-20 microns", "99.95% Pure Copper", "High electrical conductivity", "Anti-corrosion protection"],
    applications: [
      "Solar cables manufacturers",
      "Earthing applications",
      "Electrical & mechanical applications requiring high conductive and anti-corrosion copper"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Tin Thickness", unit: "Micron", astm: "1-20", ucr: "1 to 20" },
      { parameter: "Temper", unit: "-", astm: "Hard/Soft", ucr: "Hard/Soft (Annealed)" },
      { parameter: "Elongation", unit: "% min", astm: "27%", ucr: "Min EAB 27%" },
      { parameter: "Tensile Strength", unit: "Mpa", astm: "Min 210", ucr: "Min 210" },
      { parameter: "Diameter", unit: "Tolerance in %", astm: "+1%", ucr: "+1%" },
      { parameter: "Rod Conductivity", unit: "% IACS", astm: "Min 100%", ucr: "Min 100%" },
      { parameter: "Surface Condition", unit: "-", astm: "Clean & Scratch-free", ucr: "Clean & Scratch-free" }
    ],
    packagingDimensions: {
      weightRanges: "300 - 1200 Kgs",
      packaging: "Hexagon box / Steel Baskets"
    },
    sizes: ["1.25 MM", "1.5 MM", "2 MM", "2.5 MM", "3 MM"],
    productSpecification: "BSEN/IEC 60228, ASTM B33"
  },
  {
    id: 3,
    slug: "copper-rod",
    name: "Copper Rod",
    description: "Wireroad is where ideas take shape and connections come alive.A place built for creators, thinkers, and forward-doers.Here, every path leads to something meaningful.",
    sku: "03/9",
    featured: false,
    longDescription: "High-quality ETP Electrolytic Tough Pitch copper rods designed for wire drawing, cable manufacturing, and various industrial applications. Engineered for exceptional purity and electrical conductivity with consistent quality.",
    specifications: ["ETP Electrolytic copper", "Tough Pitch grade", "99.95% Pure Copper", "High electrical conductivity", "Multiple size options"],
    applications: [
      "Cable manufacturing (power, communication)",
      "Super fine wire applications",
      "Round and sector conductor use",
      "Telephone and network cabling",
      "Automotive wire harnesses",
      "Enameled copper wire production",
      "Transformer and motor windings",
      "Electrical and mechanical uses requiring high conductivity"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Tellurium, min", unit: "ppm", astm: "25.0", ucr: "+2.0" },
      { parameter: "Tensile Strength", unit: "Mpa", astm: "200-250", ucr: "+5.0" },
      { parameter: "Shear strength", unit: "ppm", astm: "150", ucr: "+15.0" },
      { parameter: "Elongation", unit: "ppm", astm: "30", ucr: "+3.0" },
      { parameter: "Tin, min", unit: "ppm", astm: "40", ucr: "+4.0" },
      { parameter: "Lead, min", unit: "ppm", astm: "50", ucr: "+5.0" },
      { parameter: "Boron, min", unit: "ppm", astm: "60", ucr: "+6.0" },
      { parameter: "Nickel, min", unit: "ppm", astm: "50", ucr: "+5.0" },
      { parameter: "Cobalt, min", unit: "ppm", astm: "30", ucr: "+3.0" },
      { parameter: "Silver, min", unit: "ppm", astm: "150", ucr: "+15.0" },
      { parameter: "Strontium, min", unit: "ppm", astm: "150", ucr: "+25.0" },
      { parameter: "Oxygen", unit: "ppm", astm: "250-350", ucr: "250-350" },
      { parameter: "Surface oxide", unit: "ppm", astm: "100-800", ucr: ">500" },
      { parameter: "Elongation", unit: "%", astm: "Max 350", ucr: "+40%" },
      { parameter: "Diameter", unit: "Tolerance in %", astm: "+0.35", ucr: "+0.35" },
      { parameter: "Rod conductivity", unit: "% IACS", astm: "Min 100%", ucr: ">100%" }
    ],
    packagingDimensions: {
      outerDiameter: "1750 mm",
      innerDiameter: "900 mm",
      heightOfCoils: "600 mm",
      weightRanges: "3050 - 4800 Kgs (Weld free with End seals on earth end)",
      coilLaidType: "Laid Type",
      coilPackaging: "Compacted, Strapped & Wrapped with polyethylene wraps and complete protection of copper with tube cover seaworthy packaging"
    },
    sizes: ["8 MM", "12.5 MM", "16 MM"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards"
  },
  {
    id: 4,
    slug: "bunched-wires",
    name: "Bunched Wires",
    description: "Wireroad is where ideas take shape and connections come alive.A place built for creators, thinkers, and forward-doers.Here, every path leads to something meaningful.",
    sku: "04/9",
    featured: false,
    longDescription: "Bunched Wires are precisely grouped copper strands designed to maximize conductivity in complex electrical assemblies. The careful arrangement ensures optimal current distribution and minimal impedance in high-performance applications.",
    specifications: ["Precise grouping", "Optimized conductivity", "Multiple configurations", "High current capacity", "Group-specific specifications"],
    applications: [
      "Transformer windings",
      "Motor windings",
      "High-current applications",
      "Electrical assemblies",
      "Power distribution equipment",
      "Precision electrical components"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Current capacity", unit: "A", astm: "Standard", ucr: "High" },
      { parameter: "Grouping precision", unit: "mm", astm: "±0.5", ucr: "±0.2" }
    ],
    packagingDimensions: {
      outerDiameter: "1650 mm",
      innerDiameter: "880 mm",
      heightOfCoils: "560 mm",
      weightRanges: "2900 - 4400 Kgs",
      coilLaidType: "Laid Type"
    },
    sizes: ["8 MM", "12 MM", "16 MM"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards"
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
