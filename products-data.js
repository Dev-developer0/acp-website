'use strict';

// ============================================
// GOOGLE SHEETS CONFIG
// Sheet: Air Compressor Products (ACP)
// ============================================
var SHEET_ID  = '1J4tI-pDzK3F0IQuNlHhJsB9wItt1BFUFGGQeKSEAPsc';
var SHEET_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/export?format=csv&gid=0';

// ============================================
// GLOBAL DATA — populated after fetch
// ============================================
var PRODUCTS   = [];
var BRANDS     = [];
var CATEGORIES = [];
var SECTORS    = [];

// ============================================
// READY SYSTEM — pages call onProductsReady()
// ============================================
var _ready     = false;
var _callbacks = [];

function onProductsReady(fn) {
  if (_ready) { fn(); return; }
  _callbacks.push(fn);
}

function _fireReady() {
  _ready = true;
  _callbacks.forEach(function(fn) { try { fn(); } catch(e) { console.error(e); } });
  _callbacks = [];
  try { document.dispatchEvent(new Event('productsLoaded')); } catch(e) {}
}

// ============================================
// CSV PARSER — handles quoted commas
// ============================================
function parseCSVLine(line) {
  var values = [];
  var current = '';
  var inQuotes = false;
  for (var i = 0; i < line.length; i++) {
    var ch = line[i];
    if (ch === '"') { inQuotes = !inQuotes; continue; }
    if (ch === ',' && !inQuotes) { values.push(current.trim()); current = ''; continue; }
    current += ch;
  }
  values.push(current.trim());
  return values;
}

function parseCSV(text) {
  var lines = text.replace(/\r/g, '').split('\n');
  if (lines.length < 2) return [];

  var headers = parseCSVLine(lines[0]).map(function(h) { return h.replace(/"/g,'').trim(); });
  var products = [];

  for (var i = 1; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line) continue;

    var vals = parseCSVLine(line);
    var obj  = {};
    headers.forEach(function(h, idx) { obj[h] = (vals[idx] || '').replace(/"/g,'').trim(); });

    if (!obj.id || !obj.name) continue; // skip empty rows

    products.push({
      id:       obj.id,
      name:     obj.name,
      partNo:   obj.partNo   || '',
      brand:    obj.brand    || '',
      sector:   obj.sector   || 'Industrial Compressors',
      category: obj.category || '',
      imgType:  obj.imgType  || 'kit',
      img:      obj.img      || '',
      desc:     obj.desc     || ''
    });
  }
  return products;
}

function updateDerived() {
  BRANDS     = [...new Set(PRODUCTS.map(function(p){ return p.brand;    }).filter(Boolean))];
  CATEGORIES = [...new Set(PRODUCTS.map(function(p){ return p.category; }).filter(Boolean))];
  SECTORS    = [...new Set(PRODUCTS.map(function(p){ return p.sector;   }).filter(Boolean))];
}

// ============================================
// LOADING SPINNER
// ============================================
function showSpinner() {
  var el = document.getElementById('acpSpinner');
  if (el) el.style.display = 'flex';
}
function hideSpinner() {
  var el = document.getElementById('acpSpinner');
  if (el) el.style.display = 'none';
}

// ============================================
// FETCH FROM GOOGLE SHEETS
// ============================================
function loadProducts() {
  showSpinner();

  fetch(SHEET_URL)
    .then(function(res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    })
    .then(function(csv) {
      PRODUCTS = parseCSV(csv);
      updateDerived();
      hideSpinner();
      _fireReady();
      console.log('[ACP] Loaded ' + PRODUCTS.length + ' products from Google Sheets');
    })
    .catch(function(err) {
      console.error('[ACP] Sheet fetch failed:', err);
      PRODUCTS = [];
      updateDerived();
      hideSpinner();
      _fireReady();
    });
}

// ============================================
// SVG ILLUSTRATIONS per part type
// ============================================
var PART_SVGS = {
  'kit': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><path d="M15 70 Q20 58 15 46 Q10 34 15 22 Q20 12 15 8" stroke="#999" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 70 Q33 58 28 46 Q23 34 28 22 Q33 12 28 8" stroke="#999" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="72" cy="32" rx="24" ry="9" stroke="#777" stroke-width="3" fill="none"/><ellipse cx="72" cy="32" rx="15" ry="5" stroke="#aaa" stroke-width="1.5" fill="none"/><ellipse cx="72" cy="65" rx="26" ry="11" stroke="#777" stroke-width="3" fill="none"/><ellipse cx="72" cy="65" rx="17" ry="7" stroke="#aaa" stroke-width="1.5" fill="none"/><circle cx="48" cy="14" r="5" stroke="#bbb" stroke-width="2" fill="none"/><circle cx="62" cy="14" r="5" stroke="#bbb" stroke-width="2" fill="none"/><circle cx="76" cy="14" r="5" stroke="#bbb" stroke-width="2" fill="none"/></svg>',

  'oil-filter': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="16" width="40" height="58" rx="6" fill="#EDE8DC" stroke="#999" stroke-width="2"/><rect x="38" y="12" width="44" height="10" rx="4" fill="#C8C8C8" stroke="#999" stroke-width="2"/><line x1="40" y1="28" x2="80" y2="28" stroke="#CCC" stroke-width="1.5"/><line x1="40" y1="37" x2="80" y2="37" stroke="#CCC" stroke-width="1.5"/><line x1="40" y1="46" x2="80" y2="46" stroke="#CCC" stroke-width="1.5"/><line x1="40" y1="55" x2="80" y2="55" stroke="#CCC" stroke-width="1.5"/><line x1="40" y1="64" x2="80" y2="64" stroke="#CCC" stroke-width="1.5"/><rect x="50" y="74" width="20" height="7" rx="2" fill="#ABABAB" stroke="#888" stroke-width="1.5"/><rect x="46" y="30" width="28" height="16" rx="3" fill="#009D9A" fill-opacity="0.2"/></svg>',

  'air-filter': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><rect x="32" y="20" width="56" height="52" rx="5" fill="#F2EEE4" stroke="#999" stroke-width="2"/><ellipse cx="60" cy="20" rx="28" ry="6" fill="#C8C8C8" stroke="#999" stroke-width="2"/><ellipse cx="60" cy="72" rx="28" ry="6" fill="#BBBBBB" stroke="#999" stroke-width="2"/><line x1="40" y1="20" x2="40" y2="72" stroke="#DDD" stroke-width="1.5"/><line x1="48" y1="20" x2="48" y2="72" stroke="#DDD" stroke-width="1.5"/><line x1="56" y1="20" x2="56" y2="72" stroke="#DDD" stroke-width="1.5"/><line x1="64" y1="20" x2="64" y2="72" stroke="#DDD" stroke-width="1.5"/><line x1="72" y1="20" x2="72" y2="72" stroke="#DDD" stroke-width="1.5"/><line x1="80" y1="20" x2="80" y2="72" stroke="#DDD" stroke-width="1.5"/></svg>',

  'separator': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><rect x="42" y="8" width="36" height="66" rx="6" fill="#EAE4D4" stroke="#999" stroke-width="2"/><ellipse cx="60" cy="8" rx="18" ry="5" fill="#CACACA" stroke="#999" stroke-width="2"/><rect x="40" y="74" width="40" height="9" rx="3" fill="#BBBBBB" stroke="#888" stroke-width="1.5"/><ellipse cx="60" cy="26" rx="12" ry="3.5" stroke="#BBB" stroke-width="1.5" fill="none"/><ellipse cx="60" cy="42" rx="12" ry="3.5" stroke="#BBB" stroke-width="1.5" fill="none"/><ellipse cx="60" cy="58" rx="12" ry="3.5" stroke="#BBB" stroke-width="1.5" fill="none"/><rect x="57" y="4" width="6" height="12" rx="2" fill="#AAAAAA" stroke="#888" stroke-width="1.5"/></svg>',

  'valve': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><rect x="28" y="32" width="64" height="26" rx="5" fill="#D6D0C4" stroke="#888" stroke-width="2"/><rect x="8" y="38" width="22" height="14" rx="3" fill="#C4BEB2" stroke="#888" stroke-width="2"/><rect x="90" y="38" width="22" height="14" rx="3" fill="#C4BEB2" stroke="#888" stroke-width="2"/><rect x="48" y="14" width="24" height="22" rx="4" fill="#BCBCBC" stroke="#888" stroke-width="2"/><rect x="55" y="6" width="10" height="12" rx="2" fill="#AAAAAA" stroke="#777" stroke-width="1.5"/><circle cx="60" cy="6" r="9" stroke="#888" stroke-width="2" fill="none"/><line x1="51" y1="6" x2="69" y2="6" stroke="#888" stroke-width="2"/><line x1="60" y1="-3" x2="60" y2="15" stroke="#888" stroke-width="2"/></svg>',

  'belt': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><circle cx="36" cy="45" r="26" stroke="#888" stroke-width="3" fill="none"/><circle cx="36" cy="45" r="17" stroke="#CCC" stroke-width="2" fill="none"/><circle cx="36" cy="45" r="6" fill="#CCC" stroke="#888" stroke-width="2"/><circle cx="88" cy="45" r="16" stroke="#888" stroke-width="3" fill="none"/><circle cx="88" cy="45" r="10" stroke="#CCC" stroke-width="2" fill="none"/><circle cx="88" cy="45" r="4" fill="#CCC" stroke="#888" stroke-width="2"/><path d="M36 19 L88 29" stroke="#555" stroke-width="4" stroke-linecap="round"/><path d="M36 71 L88 61" stroke="#555" stroke-width="4" stroke-linecap="round"/></svg>',

  'bearing': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="45" r="35" stroke="#888" stroke-width="5" fill="none"/><circle cx="60" cy="45" r="20" stroke="#888" stroke-width="4" fill="none"/><circle cx="60" cy="45" r="9" stroke="#AAA" stroke-width="2" fill="#EEE"/><circle cx="60" cy="12" r="5" fill="#CCC" stroke="#888" stroke-width="1.5"/><circle cx="84" cy="21" r="5" fill="#CCC" stroke="#888" stroke-width="1.5"/><circle cx="93" cy="45" r="5" fill="#CCC" stroke="#888" stroke-width="1.5"/><circle cx="84" cy="69" r="5" fill="#CCC" stroke="#888" stroke-width="1.5"/><circle cx="60" cy="78" r="5" fill="#CCC" stroke="#888" stroke-width="1.5"/><circle cx="36" cy="69" r="5" fill="#CCC" stroke="#888" stroke-width="1.5"/><circle cx="27" cy="45" r="5" fill="#CCC" stroke="#888" stroke-width="1.5"/><circle cx="36" cy="21" r="5" fill="#CCC" stroke="#888" stroke-width="1.5"/></svg>',

  'gasket': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="14" width="92" height="62" rx="8" stroke="#888" stroke-width="2.5" fill="#EEEAE4"/><ellipse cx="60" cy="45" rx="30" ry="20" stroke="#777" stroke-width="2" fill="white"/><circle cx="24" cy="24" r="4" stroke="#999" stroke-width="1.5" fill="none"/><circle cx="96" cy="24" r="4" stroke="#999" stroke-width="1.5" fill="none"/><circle cx="24" cy="66" r="4" stroke="#999" stroke-width="1.5" fill="none"/><circle cx="96" cy="66" r="4" stroke="#999" stroke-width="1.5" fill="none"/><circle cx="60" cy="18" r="4" stroke="#999" stroke-width="1.5" fill="none"/><circle cx="60" cy="72" r="4" stroke="#999" stroke-width="1.5" fill="none"/></svg>',

  'drill': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="38" width="70" height="14" rx="4" fill="#C8C8C8" stroke="#888" stroke-width="2"/><polygon points="90,38 110,45 90,52" fill="#888" stroke="#666" stroke-width="1.5"/><rect x="14" y="34" width="12" height="22" rx="3" fill="#BBBBBB" stroke="#888" stroke-width="2"/><line x1="30" y1="38" x2="30" y2="52" stroke="#AAA" stroke-width="1.5"/><line x1="45" y1="38" x2="45" y2="52" stroke="#AAA" stroke-width="1.5"/><line x1="60" y1="38" x2="60" y2="52" stroke="#AAA" stroke-width="1.5"/><line x1="75" y1="38" x2="75" y2="52" stroke="#AAA" stroke-width="1.5"/></svg>',

  'seal': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="45" r="32" stroke="#888" stroke-width="4" fill="none"/><circle cx="60" cy="45" r="22" stroke="#AAA" stroke-width="3" fill="none"/><circle cx="60" cy="45" r="12" stroke="#888" stroke-width="2.5" fill="#EEE"/><circle cx="60" cy="45" r="5" fill="#CCC" stroke="#888" stroke-width="1.5"/></svg>'
};

function getProductSVG(imgType) {
  return PART_SVGS[imgType] || PART_SVGS['kit'];
}

// ============================================
// START — load on script execution
// ============================================
loadProducts();
