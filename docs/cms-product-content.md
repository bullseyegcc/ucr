# CMS product content (from Figma)

Copy-paste ready fields for WordPress ACF Product. WYSIWYG HTML is shaped for the frontend parser (`htmlToLines` / HTML table).

Figma file: [UCR sites (Copy)](https://www.figma.com/design/PYXFAmDvOQG42JHsS9sfRf/UCR-sites--Copy-)

- [Drawn Wire](#drawn-wire)
- [Tin Coated Copper Wire](#tin-coated-copper-wire)
- [Drawn Copper Wire for Can Welding](#drawn-copper-wire-for-can-welding)
- [Oxygen-Free Copper Rods](#oxygen-free-copper-rods)

Notes:

- SKU, featured, and icon are not in Figma. Suggested SKU/featured values come from the local catalog (`src/assets/products.js`) where marked.
- Most technical tables in Figma have 3 columns (Parameters, Unit, UCR Typical). The site table expects 4, so the ASTM column is left blank unless Figma already has a fourth column (Oxygen-Free Copper Rods).
- Icon must be uploaded in WordPress media; GraphQL cannot write products without auth.

---

## Drawn Wire

- Figma: [Product details](https://www.figma.com/design/PYXFAmDvOQG42JHsS9sfRf/UCR-sites--Copy-?node-id=981-6808&m=dev)
- Suggested slug: `drawn-wire`

| Field | Name | Type | Value |
| --- | --- | --- | --- |
| Title | — | — | Drawn Wire |
| SKU | `sku` | Text | `02/05` *(not in Figma)* |
| Featured | `featured` | True / False | `false` *(not in Figma)* |
| Product specification | `product_specification` | Text | `BSEN/IEC 60228, ASTM B3-13 (2018)` |
| Icon | `icon` | Image | Upload Figma product photo (two copper-wire spools) |

### Short description (`short_description`)

Not in Figma. Suggested:

```
Copper wire for power cables manufacturers, communication cables, round/sector conductors, and high-conductivity electrical applications.
```

### Long description (`long_description`)

```html
<p>Drawn copper wire used across power, communication, and transformer/motor winding applications.</p>
```

### Specifications (`specifications`)

```html
<p>BSEN/IEC 60228</p>
<p>ASTM B3-13 (2018)</p>
```

### Applications (`applications`)

```html
<p>For power cables manufacturers</p>
<p>Communication cables</p>
<p>Super fine wire applications</p>
<p>Round and sector conductors</p>
<p>Telephone and network cables</p>
<p>Automotive wire harness</p>
<p>Enameled copper wire</p>
<p>Transformer and motor windings</p>
<p>Electrical and mechanical applications requiring high conductive copper</p>
```

### Technical parameters (`technical_parameters`)

Figma Diameter row value is `Min 210` with unit `Tolerance in %` (kept as designed).

```html
<table>
  <thead>
    <tr>
      <th>Parameters</th>
      <th>Unit</th>
      <th>ASTM B49/BS-EN 1977</th>
      <th>UCR Typical</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Copper, min</td><td>% min</td><td></td><td>&gt;99.95</td></tr>
    <tr><td>Oxygen</td><td>ppm</td><td></td><td>100-650</td></tr>
    <tr><td>Temper</td><td></td><td></td><td>Hard/Soft (Annealed)</td></tr>
    <tr><td>Elongation</td><td>%</td><td></td><td>Min 25% for .5mm-2.55, Min 30% for 2.5mm &amp; above</td></tr>
    <tr><td>Diameter</td><td>Tolerance in %</td><td></td><td>Min 210</td></tr>
    <tr><td>Rod Conductivity</td><td>% IACS</td><td></td><td>Min 100%</td></tr>
    <tr><td>Surface Condition</td><td></td><td></td><td>Clean &amp; Scratch-free</td></tr>
  </tbody>
</table>
```

### Sizes (`sizes`)

```html
<p>Copper Wire</p>
<p>1.02 mm to 4 mm</p>
```

### Packaging dimensions (`packaging_dimensions`)

Figma label is “New Weight Ranges”. Mapped to Weight Ranges for the site parser.

```html
<p>Weight Ranges: 300 - 1200 Kgs</p>
<p>Packaging: Hexagon Box / Steel Baskets</p>
```

---

## Tin Coated Copper Wire

- Figma: [2.0](https://www.figma.com/design/PYXFAmDvOQG42JHsS9sfRf/UCR-sites--Copy-?node-id=981-3099&m=dev)
- Suggested slug: `tin-coated-copper-wire`

| Field | Name | Type | Value |
| --- | --- | --- | --- |
| Title | — | — | Tin Coated Copper Wire |
| SKU | `sku` | Text | `03/05` *(not in Figma)* |
| Featured | `featured` | True / False | `false` *(not in Figma)* |
| Product specification | `product_specification` | Text | `BSEN/IEC 60228, ASTM B33` |
| Icon | `icon` | Image | Upload Figma product photo (tin-coated wire spool) |

### Short description (`short_description`)

Not in Figma. Suggested:

```
Tin-coated copper wire for solar cables manufacturers, earthing applications, and high-conductivity anti-corrosion wiring.
```

### Long description (`long_description`)

```html
<p>Tin coated copper wire with protective tin coating designed for superior corrosion resistance and demanding applications.</p>
```

### Specifications (`specifications`)

```html
<p>BSEN/IEC 60228</p>
<p>ASTM B33</p>
```

### Applications (`applications`)

Intro in Figma: “Most used for”

```html
<p>For solar cables manufacturers</p>
<p>Earthing</p>
<p>Electrical &amp; mechanical applications requiring high conductive and anti-corrosion copper</p>
```

### Technical parameters (`technical_parameters`)

Last Figma row still uses leftover labels `Diameter` / `Tolerance in %` with value `Clean & Scratch-free`. CMS row below uses Surface Condition.

```html
<table>
  <thead>
    <tr>
      <th>Parameters</th>
      <th>Unit</th>
      <th>ASTM B49/BS-EN 1977</th>
      <th>UCR Typical</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Copper, min</td><td>% min</td><td></td><td>&gt;99.95</td></tr>
    <tr><td>Tin Thickness</td><td>Micron</td><td></td><td>1 to 20</td></tr>
    <tr><td>Temper</td><td></td><td></td><td>Hard/Soft (Annealed)</td></tr>
    <tr><td>Elongation</td><td>%</td><td></td><td>Min EAB 27%</td></tr>
    <tr><td>Tensile Strength</td><td>Mpa</td><td></td><td>Min 210</td></tr>
    <tr><td>Diameter</td><td>Tolerance in %</td><td></td><td>+1%</td></tr>
    <tr><td>Rod Conductivity</td><td>% IACS</td><td></td><td>Min 100%</td></tr>
    <tr><td>Surface Condition</td><td></td><td></td><td>Clean &amp; Scratch-free</td></tr>
  </tbody>
</table>
```

### Sizes (`sizes`)

```html
<p>1.25 mm to 3.75 mm with Tin Coating</p>
<p>Thickness from 1 micron to 20 microns</p>
```

### Packaging dimensions (`packaging_dimensions`)

```html
<p>Weight Ranges: 300 - 1200 Kgs</p>
<p>Packaging: Hexagon box / Steel Baskets</p>
```

---

## Drawn Copper Wire for Can Welding

- Figma: [Product details](https://www.figma.com/design/PYXFAmDvOQG42JHsS9sfRf/UCR-sites--Copy-?node-id=1476-4528&m=dev)
- Suggested slug: `drawn-wire-for-can-welding`

| Field | Name | Type | Value |
| --- | --- | --- | --- |
| Title | — | — | Drawn Copper Wire for Can Welding |
| SKU | `sku` | Text | `04/05` *(not in Figma)* |
| Featured | `featured` | True / False | `false` *(not in Figma)* |
| Product specification | `product_specification` | Text | `ASTM B1, ASTM B3 & ASTM B49` |
| Icon | `icon` | Image | Upload Figma product photo (octabin box on wooden pallet) |

### Short description (`short_description`)

```
Drawn copper wire for can welding
```

### Long description (`long_description`)

```html
<p>Drawn copper wire for can welding</p>
```

### Specifications (`specifications`)

```html
<p>ASTM B1, ASTM B3 &amp; ASTM B49</p>
```

### Applications (`applications`)

```html
<p>Food and beverage can weld</p>
<p>Aerosol can weld</p>
<p>Industrial can and metal container body welding</p>
```

### Technical parameters (`technical_parameters`)

Figma labels the first row **Material** (catalog uses Temper). Unit `g/cmS` is kept as `g/cm³`. Figma typo **Nominal Diamete** is corrected to Nominal Diameter.

```html
<table>
  <thead>
    <tr>
      <th>Parameters</th>
      <th>Unit</th>
      <th>ASTM B49/BS-EN 1977</th>
      <th>UCR Typical</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Material</td><td></td><td></td><td>Hard, soft, annealed &amp; unannealed</td></tr>
    <tr><td>Shape of Wire</td><td></td><td></td><td>Round</td></tr>
    <tr><td>Specific Gravity</td><td>g/cm³</td><td></td><td>8.89</td></tr>
    <tr><td>Color</td><td></td><td></td><td>Reddish</td></tr>
    <tr><td>Surface Condition</td><td></td><td></td><td>Clean, smooth &amp; scratch-free</td></tr>
    <tr><td>Number of Wires</td><td></td><td></td><td>1</td></tr>
    <tr><td>Nominal Diameter</td><td>mm</td><td></td><td>1.24, 1.38 &amp; 1.50</td></tr>
    <tr><td>Tensile Strength</td><td>MPa</td><td></td><td>245 - 285</td></tr>
    <tr><td>Yield Strength, Rp0.2 (min.)</td><td>MPa</td><td></td><td>180</td></tr>
    <tr><td>Elongation</td><td>%</td><td></td><td>22 - 28</td></tr>
    <tr><td>Conductivity at 20 °C, min.</td><td>% IACS</td><td></td><td>99.14</td></tr>
    <tr><td>Resistivity at 20 °C, max.</td><td>Ω mm²/m</td><td></td><td>0.01739</td></tr>
    <tr><td>Copper Purity</td><td>%</td><td></td><td>≥99.90</td></tr>
    <tr><td>Oxygen, max.</td><td>ppm</td><td></td><td>400</td></tr>
    <tr><td>Total Impurities, max.</td><td>ppm</td><td></td><td>65</td></tr>
  </tbody>
</table>
```

### Sizes (`sizes`)

```html
<p>1.24 mm</p>
<p>1.38 mm</p>
<p>1.50 mm</p>
```

### Packaging dimensions (`packaging_dimensions`)

```html
<p>Carton Box Outer Diameter: 1100 mm</p>
<p>Carton Box Inner Diameter: 1080 mm</p>
<p>Height of Carton Box: 1390 mm</p>
<p>Net Weight Range: 500 - 1400 kg</p>
<p>Wire Laying Type: Orbital</p>
<p>Packaging: Octabin box + wooden pallet with green straps (IPPC seal)</p>
```

---

## Oxygen-Free Copper Rods

- Figma: [Product details](https://www.figma.com/design/PYXFAmDvOQG42JHsS9sfRf/UCR-sites--Copy-?node-id=1476-5096&m=dev)
- Suggested slug: `oxygen-free-copper-rods`

| Field | Name | Type | Value |
| --- | --- | --- | --- |
| Title | — | — | Oxygen-Free Copper Rods |
| SKU | `sku` | Text | `05/05` *(not in Figma)* |
| Featured | `featured` | True / False | `false` *(not in Figma)* |
| Product specification | `product_specification` | Text | `ASTM B49, BS EN 1977 & BS EN 13601 Standards` |
| Icon | `icon` | Image | Upload Figma product photo (oxygen-free copper coil) |

### Short description (`short_description`)

```
High-quality Oxygen-Free Copper Rods with an oxygen content of 3-5 ppm
```

### Long description (`long_description`)

```html
<p>High-quality Oxygen-Free Copper Rods with an oxygen content of 3-5 ppm</p>
```

### Specifications (`specifications`)

```html
<p>ASTM B49, BS EN 1977 &amp; BS EN 13601 Standards</p>
```

### Applications (`applications`)

```html
<p>UNS C10100:</p>
<p>Fine and super-fine electrical wires</p>
<p>Communication and coaxial cable conductors</p>
<p>Busbars and high-conductivity electrical conductors</p>
<p>Transformer and motor winding wires and strips</p>
<p>UNS C10700:</p>
<p>Overhead traction contact wires</p>
<p>Electrical windings</p>
<p>Printed-circuit foil</p>
<p>Transistor bases</p>
```

### Technical parameters (`technical_parameters`)

Figma has 4 columns: Parameters, Unit, ASTM B49/BS-EN 1977 C10100 OFE, ASTM B49/BS-EN 13601 C10700 OFS. Mapped to the site’s 4-column table.

Figma spelling **Telurium** is kept as designed.

```html
<table>
  <thead>
    <tr>
      <th>Parameters</th>
      <th>Unit</th>
      <th>ASTM B49/BS-EN 1977 C10100 OFE</th>
      <th>ASTM B49/BS-EN 13601 C10700 OFS</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Copper, min</td><td>% min</td><td>99.99</td><td>99.95 (inc. Ag)</td></tr>
    <tr><td>Telurium, max</td><td>ppm</td><td>2.0</td><td>-</td></tr>
    <tr><td>Selenium, max</td><td>ppm</td><td>3.0</td><td>-</td></tr>
    <tr><td>Bismuth, max</td><td>ppm</td><td>1.0</td><td>5.0</td></tr>
    <tr><td>Antimony, max</td><td>ppm</td><td>4.0</td><td>-</td></tr>
    <tr><td>Arsenic, max</td><td>ppm</td><td>5.0</td><td>-</td></tr>
    <tr><td>Tin, max</td><td>ppm</td><td>2.0</td><td>-</td></tr>
    <tr><td>Lead, max</td><td>ppm</td><td>5.0</td><td>-</td></tr>
    <tr><td>Iron, max</td><td>ppm</td><td>10.0</td><td>-</td></tr>
    <tr><td>Nickel, max</td><td>ppm</td><td>10.0</td><td>-</td></tr>
    <tr><td>Sulfur, max</td><td>ppm</td><td>15.0</td><td>-</td></tr>
    <tr><td>Silver, max</td><td>ppm</td><td>25.0</td><td>850.0-1200.0</td></tr>
    <tr><td>Oxygen, max</td><td>ppm</td><td>5.0</td><td>5.0</td></tr>
    <tr><td>Cadmium, max</td><td>ppm</td><td>1.0</td><td>-</td></tr>
    <tr><td>Phosphorus, max</td><td>ppm</td><td>3.0</td><td>-</td></tr>
    <tr><td>Zinc, max</td><td>ppm</td><td>1.0</td><td>-</td></tr>
    <tr><td>Manganese, max</td><td>ppm</td><td>0.5</td><td>-</td></tr>
    <tr><td>∑Other Elements, max</td><td>ppm</td><td>-</td><td>65.0</td></tr>
    <tr><td>Tensile Strength, min</td><td>MPa</td><td>170</td><td>200</td></tr>
    <tr><td>Elongation, min</td><td>%</td><td>30.0</td><td>42.0</td></tr>
    <tr><td>Conductivity, min</td><td>%</td><td>101.0</td><td>100.0</td></tr>
  </tbody>
</table>
```

### Sizes (`sizes`)

```html
<p>Range: 8.0 mm – 30.0 mm</p>
```

### Packaging dimensions (`packaging_dimensions`)

```html
<p>Outer Diameter: 1750 mm</p>
<p>Inner Diameter: 900 mm</p>
<p>Height of Coils: 600 mm</p>
<p>Net Weight Ranges: 3050 - 4800 Kg (Weld free with End seals on earth end)</p>
<p>Coil Laid Type: Orbital</p>
<p>Packaging: Compacted, strapped and polyethylene-wrapped, with a tube cover for complete copper protection and seaworthy packaging.</p>
```
