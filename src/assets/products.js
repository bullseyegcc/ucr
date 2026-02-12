export const products = [
  {
    id: 1,
    slug: "drawn-wire",
    name: "Drawn Wire",
    description: "Wireroad is where ideas take shape and connections come alive.A place built for creators, thinkers, and forward-doers.Here, every path leads to something meaningful.",
    sku: "01/09",
    icon: "/wire-icon.svg",
    featured: true,
    longDescription: "Wireroad is where ideas take shape and connections come alive.A place built for creators, thinkers, and forward-doers.Here, every path leads to something meaningful.",
    specifications: ["99.95% Pure Copper", "Precision tolerances ±0.01mm", "High electrical conductivity", "Flexible and durable", "Available in multiple gauges"],
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
      { parameter: "Zinc, min", unit: "% min", astm: "98.00", ucr: ">98.50" },
      { parameter: "Copper, max", unit: "% max", astm: "0.05", ucr: "<0.02" },
      { parameter: "Lead, min", unit: "% min", astm: "0.10", ucr: ">0.15" },
      { parameter: "Nickel, min", unit: "% min", astm: "0.50", ucr: ">0.70" },
      { parameter: "Iron, min", unit: "% min", astm: "0.20", ucr: ">0.30" }
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
    id: 2,
    slug: "wire-rod",
    name: "Wire Rod",
    description: "High-purity copper rod ideal for wire drawing, electrical conductors, and industrial components.",
    sku: "02/9",
    featured: false,
    longDescription: "Wire Rod products provide the foundation for premium wire drawing operations. Our high-purity copper rods ensure consistent quality and performance throughout the drawing process, making them ideal for creating precision electrical conductors and industrial components.",
    specifications: ["99.95% Copper content", "Consistent composition", "Suitable for drawing", "Industrial grade quality", "Meets ASTM-B49 standards"],
    applications: [
      "Wire drawing operations",
      "Electrical conductors",
      "Industrial component manufacturing",
      "Power transmission applications",
      "Telecommunications cables",
      "Bus bar production",
      "Electrical equipment manufacturing"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Zinc, min", unit: "% min", astm: "98.00", ucr: ">98.50" },
      { parameter: "Impurities, max", unit: "% max", astm: "0.05", ucr: "<0.02" },
      { parameter: "Electrical conductivity", unit: "% IACS", astm: "≥100", ucr: ">101" }
    ],
    packagingDimensions: {
      outerDiameter: "1600 mm",
      innerDiameter: "850 mm",
      heightOfCoils: "550 mm",
      weightRanges: "2800 - 4500 Kgs",
      coilLaidType: "Laid Type",
      coilPackaging: "Compacted, Strapped & Wrapped with protection wraps"
    },
    sizes: ["10 MM", "14 MM", "18 MM"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards"
  },
  {
    id: 3,
    slug: "multi-wires",
    name: "Multi Wires",
    description: "Stranded copper wire bundles for flexible applications in power transmission and control systems.",
    sku: "03/9",
    featured: false,
    longDescription: "Multi Wires combine multiple strands of copper wire for enhanced flexibility and reliability. Perfect for applications requiring flexibility without compromising conductivity, these products are ideal for power transmission, control systems, and industrial machinery.",
    specifications: ["Multiple strand configuration", "High flexibility", "Excellent conductivity", "Corrosion resistant", "Suitable for harsh environments"],
    applications: [
      "Power transmission applications",
      "Control systems",
      "Cable assemblies",
      "Flexible conductor solutions",
      "Industrial machinery connections",
      "Equipment wiring",
      "Multi-strand conductor requirements"
    ],
    technicalParameters: [
      { parameter: "Copper, min", unit: "% min", astm: "99.90", ucr: ">99.95" },
      { parameter: "Strand configuration", unit: "count", astm: "Various", ucr: "Customizable" },
      { parameter: "Flexibility rating", unit: "count", astm: "Standard", ucr: "High" }
    ],
    packagingDimensions: {
      outerDiameter: "1700 mm",
      innerDiameter: "900 mm",
      heightOfCoils: "575 mm",
      weightRanges: "3000 - 4600 Kgs",
      coilLaidType: "Laid Type"
    },
    sizes: ["6 MM", "10 MM", "14 MM"],
    productSpecification: "Meets ASTM B49 & BS EN 1977 standards"
  },
  {
    id: 4,
    slug: "bunched-wires",
    name: "Bunched Wires",
    description: "Carefully grouped copper wires for optimized conductivity in complex electrical assemblies.",
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
  },
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
];
