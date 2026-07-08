'use strict';

function getProductSVG(imgType) {
  const svgs = {
    'kit': `<svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 72 Q23 60 18 48 Q13 36 18 24 Q23 14 18 10" stroke="#aaa" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M32 72 Q37 60 32 48 Q27 36 32 24 Q37 14 32 10" stroke="#aaa" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="76" cy="32" rx="24" ry="9" stroke="#888" stroke-width="3" fill="none"/>
      <ellipse cx="76" cy="32" rx="15" ry="5" stroke="#aaa" stroke-width="2" fill="none"/>
      <ellipse cx="76" cy="66" rx="26" ry="11" stroke="#888" stroke-width="3" fill="none"/>
      <ellipse cx="76" cy="66" rx="17" ry="7" stroke="#aaa" stroke-width="2" fill="none"/>
      <circle cx="54" cy="14" r="5" stroke="#bbb" stroke-width="2" fill="none"/>
      <circle cx="67" cy="14" r="5" stroke="#bbb" stroke-width="2" fill="none"/>
      <circle cx="80" cy="14" r="5" stroke="#bbb" stroke-width="2" fill="none"/>
    </svg>`,
    'oil-filter': `<svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="38" y="16" width="44" height="58" rx="7" fill="#EEE8D8" stroke="#999" stroke-width="2"/>
      <rect x="36" y="12" width="48" height="10" rx="4" fill="#ccc" stroke="#999" stroke-width="2"/>
      <line x1="38" y1="28" x2="82" y2="28" stroke="#ddd" stroke-width="1.5"/>
      <line x1="38" y1="37" x2="82" y2="37" stroke="#ddd" stroke-width="1.5"/>
      <line x1="38" y1="46" x2="82" y2="46" stroke="#ddd" stroke-width="1.5"/>
      <line x1="38" y1="55" x2="82" y2="55" stroke="#ddd" stroke-width="1.5"/>
      <line x1="38" y1="64" x2="82" y2="64" stroke="#ddd" stroke-width="1.5"/>
      <rect x="47" y="74" width="26" height="8" rx="2" fill="#bbb" stroke="#888" stroke-width="1.5"/>
      <rect x="44" y="30" width="32" height="18" rx="3" fill="#009D9A" opacity="0.2"/>
    </svg>`,
    'air-filter': `<svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="18" width="60" height="54" rx="6" fill="#F5F0E8" stroke="#999" stroke-width="2"/>
      <ellipse cx="60" cy="18" rx="30" ry="7" fill="#ddd" stroke="#999" stroke-width="2"/>
      <ellipse cx="60" cy="72" rx="30" ry="7" fill="#ccc" stroke="#999" stroke-width="2"/>
      <line x1="40" y1="18" x2="40" y2="72" stroke="#ddd" stroke-width="1.5"/>
      <line x1="48" y1="18" x2="48" y2="72" stroke="#ddd" stroke-width="1.5"/>
      <line x1="56" y1="18" x2="56" y2="72" stroke="#ddd" stroke-width="1.5"/>
      <line x1="64" y1="18" x2="64" y2="72" stroke="#ddd" stroke-width="1.5"/>
      <line x1="72" y1="18" x2="72" y2="72" stroke="#ddd" stroke-width="1.5"/>
      <line x1="80" y1="18" x2="80" y2="72" stroke="#ddd" stroke-width="1.5"/>
    </svg>`,
    'separator': `<svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="42" y="8" width="36" height="68" rx="6" fill="#EEE8D8" stroke="#999" stroke-width="2"/>
      <ellipse cx="60" cy="8" rx="18" ry="5" fill="#ccc" stroke="#999" stroke-width="2"/>
      <rect x="40" y="76" width="40" height="8" rx="3" fill="#bbb" stroke="#888" stroke-width="1.5"/>
      <ellipse cx="60" cy="25" rx="12" ry="3.5" stroke="#ccc" stroke-width="1.5" fill="none"/>
      <ellipse cx="60" cy="42" rx="12" ry="3.5" stroke="#ccc" stroke-width="1.5" fill="none"/>
      <ellipse cx="60" cy="59" rx="12" ry="3.5" stroke="#ccc" stroke-width="1.5" fill="none"/>
      <rect x="56" y="4" width="8" height="10" rx="2" fill="#aaa" stroke="#888" stroke-width="1.5"/>
    </svg>`,
    'valve': `<svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="32" width="64" height="28" rx="5" fill="#D8D0C8" stroke="#888" stroke-width="2"/>
      <rect x="8" y="39" width="22" height="14" rx="3" fill="#C8C0B8" stroke="#888" stroke-width="2"/>
      <rect x="90" y="39" width="22" height="14" rx="3" fill="#C8C0B8" stroke="#888" stroke-width="2"/>
      <rect x="48" y="16" width="24" height="20" rx="4" fill="#bbb" stroke="#888" stroke-width="2"/>
      <rect x="55" y="8" width="10" height="10" rx="2" fill="#aaa" stroke="#777" stroke-width="1.5"/>
      <circle cx="60" cy="8" r="9" stroke="#888" stroke-width="2" fill="none"/>
      <line x1="51" y1="8" x2="69" y2="8" stroke="#888" stroke-width="2"/>
      <line x1="60" y1="0" x2="60" y2="16" stroke="#888" stroke-width="2"/>
    </svg>`,
    'belt': `<svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="45" r="26" stroke="#888" stroke-width="3" fill="none"/>
      <circle cx="36" cy="45" r="18" stroke="#ccc" stroke-width="1.5" fill="none"/>
      <circle cx="36" cy="45" r="6" fill="#ccc" stroke="#888" stroke-width="2"/>
      <circle cx="90" cy="45" r="17" stroke="#888" stroke-width="3" fill="none"/>
      <circle cx="90" cy="45" r="10" stroke="#ccc" stroke-width="1.5" fill="none"/>
      <circle cx="90" cy="45" r="4" fill="#ccc" stroke="#888" stroke-width="2"/>
      <path d="M36 19 L90 28" stroke="#555" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M36 71 L90 62" stroke="#555" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`,
    'bearing': `<svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="45" r="36" stroke="#888" stroke-width="5" fill="none"/>
      <circle cx="60" cy="45" r="18" stroke="#888" stroke-width="4" fill="none"/>
      <circle cx="60" cy="45" r="8" stroke="#aaa" stroke-width="2" fill="#eee"/>
      <circle cx="60" cy="11" r="5.5" fill="#ccc" stroke="#888" stroke-width="1.5"/>
      <circle cx="85" cy="21" r="5.5" fill="#ccc" stroke="#888" stroke-width="1.5"/>
      <circle cx="95" cy="47" r="5.5" fill="#ccc" stroke="#888" stroke-width="1.5"/>
      <circle cx="83" cy="72" r="5.5" fill="#ccc" stroke="#888" stroke-width="1.5"/>
      <circle cx="60" cy="80" r="5.5" fill="#ccc" stroke="#888" stroke-width="1.5"/>
      <circle cx="35" cy="72" r="5.5" fill="#ccc" stroke="#888" stroke-width="1.5"/>
      <circle cx="25" cy="47" r="5.5" fill="#ccc" stroke="#888" stroke-width="1.5"/>
      <circle cx="37" cy="21" r="5.5" fill="#ccc" stroke="#888" stroke-width="1.5"/>
    </svg>`,
    'gasket': `<svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="96" height="66" rx="8" stroke="#888" stroke-width="2.5" fill="#F0EDE8"/>
      <ellipse cx="60" cy="45" rx="30" ry="22" stroke="#777" stroke-width="2" fill="white"/>
      <circle cx="22" cy="22" r="4" stroke="#999" stroke-width="1.5" fill="none"/>
      <circle cx="98" cy="22" r="4" stroke="#999" stroke-width="1.5" fill="none"/>
      <circle cx="22" cy="68" r="4" stroke="#999" stroke-width="1.5" fill="none"/>
      <circle cx="98" cy="68" r="4" stroke="#999" stroke-width="1.5" fill="none"/>
      <circle cx="60" cy="16" r="4" stroke="#999" stroke-width="1.5" fill="none"/>
      <circle cx="60" cy="74" r="4" stroke="#999" stroke-width="1.5" fill="none"/>
    </svg>`
  };
  return svgs[imgType] || svgs['kit'];
}

const PRODUCTS = [
  // ---- INDUSTRIAL COMPRESSORS — INGERSOLL RAND ----
  { id:"IR-001", name:"IR Kit", partNo:"UP.5.30 1972", brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"Rebuild kit for Ingersoll Rand reciprocating compressors. Includes gasket set, piston rings, oil seal, valve discs and springs." },
  { id:"IR-002", name:"IR Kit", partNo:"70662424",     brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"OEM-quality rebuild kit for Ingersoll Rand Type 30 series compressors." },
  { id:"IR-003", name:"IR Kit", partNo:"22067177",     brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"Rebuild kit compatible with Ingersoll Rand SS & UP series piston compressors." },
  { id:"IR-004", name:"IR Kit", partNo:"22064695",     brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"Valve and gasket rebuild kit for Ingersoll Rand compressors." },
  { id:"IR-005", name:"IR Kit", partNo:"22064622",     brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"Complete maintenance kit — LP/HP cylinder rebuild for Ingersoll Rand." },
  { id:"IR-006", name:"IR Kit", partNo:"37007265",     brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"Bearing & seal kit for Ingersoll Rand rotary screw compressors." },
  { id:"IR-007", name:"Oil Filter",    partNo:"54509227",    brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Oil Filters",   imgType:"oil-filter", desc:"Genuine-spec oil filter for Ingersoll Rand rotary screw compressors." },
  { id:"IR-008", name:"Air Filter",    partNo:"32305030",    brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Air Filters",   imgType:"air-filter", desc:"Intake air filter element for Ingersoll Rand UP/SS series." },
  { id:"IR-009", name:"Oil Separator", partNo:"39433200",    brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Oil Separators", imgType:"separator", desc:"Oil separator element for Ingersoll Rand screw compressors." },
  { id:"IR-010", name:"Min. Pressure Valve", partNo:"39776573", brand:"Ingersoll Rand", sector:"Industrial Compressors", category:"Valves", imgType:"valve", desc:"Minimum pressure check valve for Ingersoll Rand rotary screw series." },

  // ---- INDUSTRIAL COMPRESSORS — ATLAS COPCO ----
  { id:"AC-001", name:"Oil Filter",    partNo:"1613610500",  brand:"Atlas Copco", sector:"Industrial Compressors", category:"Oil Filters",   imgType:"oil-filter", desc:"OEM-quality oil filter element for Atlas Copco GA series screw compressors." },
  { id:"AC-002", name:"Air Filter",    partNo:"1613872000",  brand:"Atlas Copco", sector:"Industrial Compressors", category:"Air Filters",   imgType:"air-filter", desc:"Inlet air filter for Atlas Copco GA 7-22 series." },
  { id:"AC-003", name:"Oil Separator", partNo:"1613740400",  brand:"Atlas Copco", sector:"Industrial Compressors", category:"Oil Separators", imgType:"separator", desc:"Oil separator element for Atlas Copco GA rotary screw compressors." },
  { id:"AC-004", name:"Valve Kit",     partNo:"1622855180",  brand:"Atlas Copco", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"Thermostatic bypass valve kit for Atlas Copco GA series." },
  { id:"AC-005", name:"Gasket Kit",    partNo:"1621878400",  brand:"Atlas Copco", sector:"Industrial Compressors", category:"Gasket Kits",   imgType:"gasket", desc:"Full gasket set for Atlas Copco GA 15-37 overhaul." },
  { id:"AC-006", name:"Bearing Kit",   partNo:"1202777300",  brand:"Atlas Copco", sector:"Industrial Compressors", category:"Bearing Kits",  imgType:"bearing", desc:"Main bearing set for Atlas Copco GA rotary element." },
  { id:"AC-007", name:"Belt Set",      partNo:"1613854200",  brand:"Atlas Copco", sector:"Industrial Compressors", category:"Belts",         imgType:"belt", desc:"Drive belt set for Atlas Copco GA 7-15 belt-driven compressors." },
  { id:"AC-008", name:"Safety Valve",  partNo:"1089063200",  brand:"Atlas Copco", sector:"Industrial Compressors", category:"Valves",        imgType:"valve", desc:"Safety/pressure relief valve for Atlas Copco screw compressors." },

  // ---- INDUSTRIAL COMPRESSORS — ELGI ----
  { id:"EL-001", name:"Oil Filter Kit",     partNo:"EN11/15-OFK", brand:"ELGi", sector:"Industrial Compressors", category:"Oil Filters",   imgType:"oil-filter", desc:"Oil filter element kit for ELGi EN11 and EN15 screw compressors." },
  { id:"EL-002", name:"Air Filter Kit",     partNo:"EB15-AFK",    brand:"ELGi", sector:"Industrial Compressors", category:"Air Filters",   imgType:"air-filter", desc:"Intake air filter element for ELGi EB series portable compressors." },
  { id:"EL-003", name:"Oil Separator",      partNo:"EG22-OSE",    brand:"ELGi", sector:"Industrial Compressors", category:"Oil Separators", imgType:"separator", desc:"Oil separator element for ELGi EG series rotary screw compressors." },
  { id:"EL-004", name:"Valve Kit",          partNo:"E90-VK",      brand:"ELGi", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"Minimum pressure valve kit for ELGi E90 series screw compressors." },
  { id:"EL-005", name:"Service Kit 4000h",  partNo:"ELGi-SK4000", brand:"ELGi", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"4000-hour service kit for ELGi EN series — includes oil filter, air filter, separator." },
  { id:"EL-006", name:"Thermostatic Valve", partNo:"EN22-TV",     brand:"ELGi", sector:"Industrial Compressors", category:"Valves",        imgType:"valve", desc:"Thermostatic bypass valve for ELGi EN22 oil-injected screw compressors." },

  // ---- INDUSTRIAL COMPRESSORS — KAESER ----
  { id:"KA-001", name:"Oil Filter",    partNo:"6.3534.0",  brand:"Kaeser", sector:"Industrial Compressors", category:"Oil Filters",   imgType:"oil-filter", desc:"Genuine-spec oil filter for Kaeser BAUER and SK series compressors." },
  { id:"KA-002", name:"Air Filter",    partNo:"6.3430.0",  brand:"Kaeser", sector:"Industrial Compressors", category:"Air Filters",   imgType:"air-filter", desc:"Intake air filter element for Kaeser SM and SK series." },
  { id:"KA-003", name:"Oil Separator", partNo:"6.3521.0",  brand:"Kaeser", sector:"Industrial Compressors", category:"Oil Separators", imgType:"separator", desc:"Oil separator element for Kaeser rotary screw compressors." },
  { id:"KA-004", name:"Valve Kit",     partNo:"6.2082.0",  brand:"Kaeser", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"Minimum pressure valve complete kit for Kaeser SK series." },
  { id:"KA-005", name:"Belt Set",      partNo:"6.2030.1",  brand:"Kaeser", sector:"Industrial Compressors", category:"Belts",         imgType:"belt", desc:"V-belt set for Kaeser SM 11-15 belt-driven screw compressors." },
  { id:"KA-006", name:"Bearing Kit",   partNo:"6.2211.0",  brand:"Kaeser", sector:"Industrial Compressors", category:"Bearing Kits",  imgType:"bearing", desc:"Airend bearing kit for Kaeser SK series overhaul." },

  // ---- INDUSTRIAL COMPRESSORS — CHICAGO PNEUMATIC ----
  { id:"CP-001", name:"Oil Filter Kit",    partNo:"2901-0273-00", brand:"Chicago Pneumatic", sector:"Industrial Compressors", category:"Oil Filters",   imgType:"oil-filter", desc:"Oil filter element for Chicago Pneumatic CPS/CPB screw compressors." },
  { id:"CP-002", name:"Air Filter",        partNo:"2901-0302-00", brand:"Chicago Pneumatic", sector:"Industrial Compressors", category:"Air Filters",   imgType:"air-filter", desc:"Intake air filter for Chicago Pneumatic CP series compressors." },
  { id:"CP-003", name:"Oil Separator",     partNo:"2901-0743-00", brand:"Chicago Pneumatic", sector:"Industrial Compressors", category:"Oil Separators", imgType:"separator", desc:"Oil separator element for Chicago Pneumatic CPS screw series." },
  { id:"CP-004", name:"Valve Kit",         partNo:"2901-0843-00", brand:"Chicago Pneumatic", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"Minimum pressure valve rebuild kit for Chicago Pneumatic CPS series." },
  { id:"CP-005", name:"Service Kit 2000h", partNo:"CP-SK2000",    brand:"Chicago Pneumatic", sector:"Industrial Compressors", category:"Valve & Rebuild Kits", imgType:"kit", desc:"2000-hour service kit for Chicago Pneumatic rotary screw compressors." },

  // ---- TUNNELING ----
  { id:"TN-001", img:"image/6.png", name:"Rock Drill Seal Kit",   partNo:"TN-RD-SK01",  brand:"Atlas Copco",       sector:"Tunneling", category:"Valve & Rebuild Kits", imgType:"kit",      desc:"Seal kit for Atlas Copco rock drills used in tunneling operations." },
  { id:"TN-002", img:"image/4.png", name:"DTH Hammer Piston",     partNo:"TN-DTH-P02",  brand:"Ingersoll Rand",    sector:"Tunneling", category:"Valve & Rebuild Kits", imgType:"bearing",  desc:"Down-the-hole hammer piston for hard rock tunneling applications." },
  { id:"TN-003", img:"image/2.png", name:"Air Leg Cylinder Kit",  partNo:"TN-AL-CK03",  brand:"Chicago Pneumatic", sector:"Tunneling", category:"Valve & Rebuild Kits", imgType:"separator",desc:"Cylinder and piston kit for air leg rock drills in tunnel boring." },
  { id:"TN-004", name:"Drill Rod Coupling",    partNo:"TN-DR-CP04",  brand:"Atlas Copco",       sector:"Tunneling", category:"Valves",               imgType:"valve",    desc:"Coupling sleeve for drill rod connections in tunneling rigs." },
  { id:"TN-005", name:"Compressor Oil Filter", partNo:"TN-CF-OF05",  brand:"Ingersoll Rand",    sector:"Tunneling", category:"Oil Filters",          imgType:"oil-filter",desc:"Heavy-duty oil filter for portable diesel compressors used in tunneling." },

  // ---- MINING ----
  { id:"MN-001", name:"Mine Compressor Air Filter", partNo:"MN-AC-F01",  brand:"Atlas Copco",       sector:"Mining", category:"Air Filters",          imgType:"air-filter",desc:"Heavy-duty air filter for mining-grade screw compressors in dusty conditions." },
  { id:"MN-002", name:"Compressor Bearing Kit",     partNo:"MN-BK-02",   brand:"Ingersoll Rand",    sector:"Mining", category:"Bearing Kits",         imgType:"bearing",  desc:"Reinforced bearing kit for compressors in high-load mining environments." },
  { id:"MN-003", name:"Mine Pump Seal Kit",          partNo:"MN-PS-SK03", brand:"ELGi",              sector:"Mining", category:"Gasket Kits",          imgType:"gasket",   desc:"Complete seal kit for mine dewatering pumps and air systems." },
  { id:"MN-004", name:"High Pressure Valve Kit",     partNo:"MN-HPV-04",  brand:"Kaeser",            sector:"Mining", category:"Valves",               imgType:"valve",    desc:"High-pressure valve rebuild kit for mining air systems." },
  { id:"MN-005", name:"Heavy Duty Belt Set",          partNo:"MN-DB-HD05", brand:"Chicago Pneumatic", sector:"Mining", category:"Belts",               imgType:"belt",     desc:"Heavy-duty drive belt set for mining compressors running 24/7." },

  // ---- CONSTRUCTION EQUIPMENT ----
  { id:"CE-001", name:"Breaker Compressor Kit",         partNo:"CE-BK-01",   brand:"Atlas Copco",       sector:"Construction Equipment", category:"Valve & Rebuild Kits", imgType:"kit",       desc:"Rebuild kit for pneumatic breakers and portable compressors on construction sites." },
  { id:"CE-002", name:"Portable Compressor Oil Filter", partNo:"CE-OF-02",   brand:"Ingersoll Rand",    sector:"Construction Equipment", category:"Oil Filters",          imgType:"oil-filter",desc:"Oil filter for portable diesel-driven compressors on construction sites." },
  { id:"CE-003", name:"Air Hose Fitting Kit",           partNo:"CE-AH-FK03", brand:"Chicago Pneumatic", sector:"Construction Equipment", category:"Valves",               imgType:"valve",     desc:"Quick-release air hose fitting kit for compressor distribution on job sites." },
  { id:"CE-004", name:"Jack Hammer Seal Kit",           partNo:"CE-JH-SK04", brand:"ELGi",              sector:"Construction Equipment", category:"Gasket Kits",          imgType:"gasket",    desc:"Seal and o-ring kit for pneumatic jackhammers and breakers." },
  { id:"CE-005", name:"Construction Compressor Belt",   partNo:"CE-CB-05",   brand:"Kaeser",            sector:"Construction Equipment", category:"Belts",               imgType:"belt",      desc:"V-belt set for construction-grade belt-driven compressors." },


  // ---- TUNNELING — expanded from Gripmine structure ----
  { id:"TN-001", name:"Rock Drill Seal Kit",      partNo:"TN-RD-SK01",  brand:"Atlas Copco",       sector:"Tunneling", category:"Seal Kits",            imgType:"gasket",    desc:"Seal kit for Atlas Copco rock drills used in tunneling operations." },
  { id:"TN-002", name:"DTH Hammer Piston",        partNo:"TN-DTH-P02",  brand:"Ingersoll Rand",    sector:"Tunneling", category:"Rebuild Kits",          imgType:"bearing",   desc:"Down-the-hole hammer piston for hard rock tunneling applications." },
  { id:"TN-003", name:"Air Leg Cylinder Kit",     partNo:"TN-AL-CK03",  brand:"Chicago Pneumatic", sector:"Tunneling", category:"Rebuild Kits",          imgType:"separator", desc:"Cylinder and piston kit for air leg rock drills in tunnel boring." },
  { id:"TN-004", name:"Drill Rod Coupling",       partNo:"TN-DR-CP04",  brand:"Atlas Copco",       sector:"Tunneling", category:"Drill Parts",           imgType:"valve",     desc:"Coupling sleeve for drill rod connections in tunneling rigs." },
  { id:"TN-005", name:"Drifter Part HLX5",        partNo:"TN-HLX5-01",  brand:"Atlas Copco",       sector:"Tunneling", category:"Drifter Parts",         imgType:"kit",       desc:"High quality drifter part for HLX5 series rock drilling equipment." },
  { id:"TN-006", img:"image/6.png", name:"Drifter Part HL560",       partNo:"TN-HL560-02", brand:"Atlas Copco",       sector:"Tunneling", category:"Drifter Parts",         imgType:"kit",       desc:"Genuine drifter components for HL560 series hydraulic rock drills." },
  { id:"TN-007", img:"image/4.png", name:"Drifter Part HL510",       partNo:"TN-HL510-03", brand:"Atlas Copco",       sector:"Tunneling", category:"Drifter Parts",         imgType:"kit",       desc:"Drifter rebuild kit for HL510 series tunnel drilling equipment." },
  { id:"TN-008", name:"Drifter Part HL710",       partNo:"TN-HL710-04", brand:"Atlas Copco",       sector:"Tunneling", category:"Drifter Parts",         imgType:"kit",       desc:"Drifter parts for HL710 series — seals, pistons, valves included." },
  { id:"TN-009", name:"Boom & Feed Part Kit",     partNo:"TN-BF-K05",   brand:"Atlas Copco",       sector:"Tunneling", category:"Frame & Boom Parts",    imgType:"valve",     desc:"Front & rear frame parts, feed mechanism and boom structural components for tunnel rigs." },
  { id:"TN-010", name:"Compressor Oil Filter",    partNo:"TN-CF-OF05",  brand:"Ingersoll Rand",    sector:"Tunneling", category:"Oil Filters",           imgType:"oil-filter",desc:"Heavy-duty oil filter for portable diesel compressors used in tunneling." },

  // ---- MINING — expanded from Gripmine structure ----
  { id:"MN-001", name:"Engine Parts Kit — Deutz",        partNo:"MN-EP-DZ01",  brand:"Deutz",         sector:"Mining", category:"Engine Parts",         imgType:"kit",       desc:"Engine spare parts for Deutz engines used in LHD and LPDT mining equipment." },
  { id:"MN-002", name:"Engine Parts Kit — Cummins",      partNo:"MN-EP-CM02",  brand:"Cummins",       sector:"Mining", category:"Engine Parts",         imgType:"kit",       desc:"Genuine Cummins engine parts — filters, gaskets, injectors for underground equipment." },
  { id:"MN-003", name:"Engine Parts Kit — Mercedes",     partNo:"MN-EP-MB03",  brand:"Mercedes Benz", sector:"Mining", category:"Engine Parts",         imgType:"kit",       desc:"Mercedes Benz engine parts supply for mining loaders and dump trucks." },
  { id:"MN-004", name:"Hydraulic Pump Parts — Rexroth",  partNo:"MN-HP-RX04",  brand:"Rexroth",       sector:"Mining", category:"Hydraulic Parts",      imgType:"separator", desc:"Rexroth hydraulic pump parts — seals, pistons, valve plates for LHD equipment." },
  { id:"MN-005", name:"Hydraulic Pump Parts — Danfoss",  partNo:"MN-HP-SD05",  brand:"Sauer Danfoss", sector:"Mining", category:"Hydraulic Parts",      imgType:"separator", desc:"Sauer Danfoss hydraulic pump and motor parts for underground mining machinery." },
  { id:"MN-006", img:"image/3.png", name:"Axle Parts — Dana Spicer",        partNo:"MN-AX-DS06",  brand:"Dana Spicer",   sector:"Mining", category:"Axle & Transmission",  imgType:"bearing",   desc:"Dana Spicer front & rear axle parts for LHD and LPDT mining vehicles." },
  { id:"MN-007", name:"Transmission Parts — Kessler",    partNo:"MN-TR-KS07",  brand:"Kessler",       sector:"Mining", category:"Axle & Transmission",  imgType:"bearing",   desc:"Kessler axle and transmission parts for underground mining equipment." },
  { id:"MN-008", name:"Torque Converter Kit",            partNo:"MN-TC-K08",   brand:"Dana Spicer",   sector:"Mining", category:"Axle & Transmission",  imgType:"kit",       desc:"Torque converter rebuild kit for mine loaders and dump trucks." },
  { id:"MN-009", name:"LHD Bucket Blade — 4 Ton",       partNo:"MN-BB-4T09",  brand:"Generic OEM",   sector:"Mining", category:"Mining Accessories",   imgType:"gasket",    desc:"High performance LHD bucket blade for 4 ton Load Haul Dumpers — up to 3000 working hrs." },
  { id:"MN-010", name:"LHD Bucket Blade — 7 Ton",       partNo:"MN-BB-7T10",  brand:"Generic OEM",   sector:"Mining", category:"Mining Accessories",   imgType:"gasket",    desc:"Heavy duty bucket blade for 7 ton LHD equipment in underground mining." },
  { id:"MN-011", name:"LHD Bucket Blade — 10 Ton",      partNo:"MN-BB-10T11", brand:"Generic OEM",   sector:"Mining", category:"Mining Accessories",   imgType:"gasket",    desc:"High capacity bucket blade for 10 ton LHD loaders." },
  { id:"MN-012", name:"Auto Lubrication System (ALS)",   partNo:"MN-ALS-12",   brand:"Generic OEM",   sector:"Mining", category:"Mining Accessories",   imgType:"valve",     desc:"Automatic lubrication system for underground mining equipment — reduces maintenance downtime." },
  { id:"MN-013", name:"Fire Suppression System (AFSS)",  partNo:"MN-AFSS-13",  brand:"Generic OEM",   sector:"Mining", category:"Mining Accessories",   imgType:"valve",     desc:"Auto fire suppression system for LHD, LPDT and drill rigs in underground mines." },
  { id:"MN-014", name:"Mine Hydraulic Hose & Fittings",  partNo:"MN-HH-F14",   brand:"Generic OEM",   sector:"Mining", category:"Hydraulic Parts",      imgType:"separator", desc:"Hydraulic hoses, fittings and protective sleeves for underground mining equipment." },
  { id:"MN-015", img:"image/5.png", name:"LPDT Dump Box Assembly",          partNo:"MN-DB-LP15",  brand:"Generic OEM",   sector:"Mining", category:"Frame & Boom Parts",   imgType:"gasket",    desc:"Replacement dump box assembly for Low Profile Dump Trucks (LPDT) in underground mines." },

  // ---- CONSTRUCTION EQUIPMENT — expanded ----
  { id:"CE-001", name:"Breaker Compressor Kit",          partNo:"CE-BK-01",   brand:"Atlas Copco",       sector:"Construction Equipment", category:"Rebuild Kits",  imgType:"kit",       desc:"Rebuild kit for pneumatic breakers and portable compressors on construction sites." },
  { id:"CE-002", name:"Portable Compressor Oil Filter",  partNo:"CE-OF-02",   brand:"Ingersoll Rand",    sector:"Construction Equipment", category:"Oil Filters",   imgType:"oil-filter",desc:"Oil filter for portable diesel-driven compressors on construction sites." },
  { id:"CE-003", name:"Air Hose Fitting Kit",            partNo:"CE-AH-FK03", brand:"Chicago Pneumatic", sector:"Construction Equipment", category:"Hydraulic Parts",imgType:"valve",    desc:"Quick-release air hose fitting kit for compressor distribution on job sites." },
  { id:"CE-004", name:"Jack Hammer Seal Kit",            partNo:"CE-JH-SK04", brand:"Chicago Pneumatic", sector:"Construction Equipment", category:"Seal Kits",    imgType:"gasket",    desc:"Seal and o-ring kit for pneumatic jackhammers and breakers." },
  { id:"CE-005", name:"Construction Compressor Belt",    partNo:"CE-CB-05",   brand:"Kaeser",            sector:"Construction Equipment", category:"Belts",         imgType:"belt",      desc:"V-belt set for construction-grade belt-driven compressors." },
  { id:"CE-006", name:"Exhaust Purifier & Silencer",     partNo:"CE-EX-PS06", brand:"Generic OEM",       sector:"Construction Equipment", category:"Mining Accessories",imgType:"separator",desc:"Exhaust purifier and silencer for diesel engines on construction equipment." },

  // ---- EOT CRANES ----
  { id:"EC-001", name:"Crane Motor Bearing Kit", partNo:"EC-MB-01",  brand:"Generic OEM", sector:"EOT Cranes", category:"Bearing Kits",         imgType:"bearing", desc:"Precision bearing set for EOT crane hoist motor assemblies." },
  { id:"EC-002", name:"Crane Brake Pad Set",     partNo:"EC-BP-02",  brand:"Generic OEM", sector:"EOT Cranes", category:"Gasket Kits",          imgType:"gasket",  desc:"Brake pad and lining set for overhead travelling crane drum brakes." },
  { id:"EC-003", name:"Hoist Gear Seal Kit",     partNo:"EC-GS-SK03",brand:"Generic OEM", sector:"EOT Cranes", category:"Valve & Rebuild Kits", imgType:"kit",     desc:"Gearbox seal kit for EOT crane hoist mechanisms." },
  { id:"EC-004", name:"Wire Rope Guide",         partNo:"EC-WR-G04", brand:"Generic OEM", sector:"EOT Cranes", category:"Valves",               imgType:"valve",   desc:"Wire rope guide and sheave block assembly for overhead cranes." },
  { id:"EC-005", name:"Festoon Cable Clamp Set", partNo:"EC-FC-C05", brand:"Generic OEM", sector:"EOT Cranes", category:"Belts",               imgType:"belt",    desc:"Festoon system cable clamp set for EOT crane power supply rails." },
];

const SECTORS    = [...new Set(PRODUCTS.map(p => p.sector))];
const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];
const BRANDS     = [...new Set(PRODUCTS.map(p => p.brand))];
