'use strict';

/* ---- SECURITY: sanitize all user-supplied strings before DOM insertion ---- */
function sanitize(str) {
  if (typeof str !== 'string') return '';
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

/* ---- SVG ILLUSTRATIONS per part type ---- */
var PART_SVGS = {
  'kit': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><path d="M15 70 Q20 58 15 46 Q10 34 15 22 Q20 12 15 8" stroke="#999" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M28 70 Q33 58 28 46 Q23 34 28 22 Q33 12 28 8" stroke="#999" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="72" cy="32" rx="24" ry="9" stroke="#777" stroke-width="3" fill="none"/><ellipse cx="72" cy="32" rx="15" ry="5" stroke="#aaa" stroke-width="1.5" fill="none"/><ellipse cx="72" cy="65" rx="26" ry="11" stroke="#777" stroke-width="3" fill="none"/><ellipse cx="72" cy="65" rx="17" ry="7" stroke="#aaa" stroke-width="1.5" fill="none"/><circle cx="48" cy="14" r="5" stroke="#bbb" stroke-width="2" fill="none"/><circle cx="62" cy="14" r="5" stroke="#bbb" stroke-width="2" fill="none"/><circle cx="76" cy="14" r="5" stroke="#bbb" stroke-width="2" fill="none"/></svg>',

  'oil-filter': '<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="16" width="40" height="58" rx="6" fill="#EDE8DC" stroke="#999" stroke-width="2"/><rect x="38" y="12" width="44" height="10" rx="4" fill="#C8C8C8" stroke="#999" stroke-width="2"/><line x1="40" y1="28" x2="80" y2="28" stroke="#CCC" stroke-width="1.5"/><line x1="40" y1="37" x2="80" y2="37" stroke="#CCC" stroke-width="1.5"/><line x1="40" y1="46" x2="80" y2="46" stroke="#CCC" stroke-width="1.5"/><line x1="40" y1="55" x2="80" y2="55" stroke="#CCC" stroke-width="1.5"/><line x1="40" y1="64" x2="80" y2="64" stroke="#CCC" stroke-width="1.5"/><rect x="50" y="74" width="20" height="7" rx="2" fill="#ABABAB" stroke="#888" stroke-width="1.5"/><rect x="46" y="30" width="28" height="16" rx="3" fill="#009D9A" fill-opacity="0.25"/></svg>',

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

/* ---- CART ---- */
var Cart = (function() {
  var KEY = 'acp_cart_v1';
  function getAll() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch(e) { return []; } }
  function save(items) { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch(e) {} }
  function add(product) {
    var items = getAll();
    var found = false;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === product.id) { items[i].qty = Math.min(items[i].qty + 1, 99); found = true; break; }
    }
    if (!found) items.push({ id: product.id, name: product.name, partNo: product.partNo, brand: product.brand, category: product.category, qty: 1 });
    save(items); updateCartCount();
    showToast('Added: ' + product.name + ' (' + product.partNo + ')');
  }
  function remove(id) { save(getAll().filter(function(i){ return i.id !== id; })); updateCartCount(); }
  function updateQty(id, qty) {
    var items = getAll();
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) { items[i].qty = Math.max(1, Math.min(parseInt(qty)||1, 99)); break; }
    }
    save(items); updateCartCount();
  }
  function count() { return getAll().reduce(function(s,i){ return s + i.qty; }, 0); }
  return { getAll: getAll, add: add, remove: remove, updateQty: updateQty, count: count };
})();

function updateCartCount() {
  var n = Cart.count();
  var els = document.querySelectorAll('.cart-count');
  for (var i = 0; i < els.length; i++) { els[i].textContent = n; els[i].style.display = n > 0 ? 'flex' : 'none'; }
}

var _toastTimer;
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 3000);
}

/* ---- PRODUCT CARD ---- */
function productCardHTML(p) {
  var svg = getProductSVG(p.imgType || 'kit');
  var catColor = {
    'Industrial Compressors': '#009D9A',
    'Tunneling Equipment': '#8B4513',
    'Mining Equipment': '#B8860B',
    'Construction Equipment': '#D2691E',
    'EOT Cranes': '#4169E1'
  };
  var badgeColor = catColor[p.category] || '#333';

  return '<div class="product-card">' +
    '<div class="product-img">' +
      '<span class="product-brand-badge" style="background:' + badgeColor + '">' + sanitize(p.category) + '</span>' +
      '<div class="product-illustration">' + svg + '</div>' +
      '<div class="part-no-display">' + sanitize(p.partNo) + '</div>' +
    '</div>' +
    '<div class="product-info">' +
      '<div class="part-no">' + sanitize(p.partNo) + '</div>' +
      '<h3>' + sanitize(p.name) + '</h3>' +
      '<div style="font-size:12px;color:#999;margin-bottom:8px;">' + sanitize(p.brand) + '</div>' +
      '<div class="product-footer">' +
        '<span class="price-tag">Price on request</span>' +
        '<button class="add-cart-btn" title="Add to cart" onclick="handleAddCart(\'' + p.id + '\', this)">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function handleAddCart(productId, btn) {
  var product = null;
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === productId) { product = PRODUCTS[i]; break; }
  }
  if (!product) return;
  Cart.add(product);
  btn.classList.add('added');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
  setTimeout(function(){
    btn.classList.remove('added');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6"/></svg>';
  }, 1800);
}

/* ---- MOBILE NAV ---- */
function initMobileNav() {
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  var anchors = links.querySelectorAll('a');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(){
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
}

/* ---- SEARCH ---- */
function initSearch() {
  var input = document.getElementById('searchInput');
  var btn = document.getElementById('searchBtn');
  if (!input || !btn) return;
  function doSearch() {
    var q = input.value.trim().slice(0, 120);
    if (q) window.location.href = 'products.html?q=' + encodeURIComponent(q);
  }
  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', function(e){ if (e.key === 'Enter') doSearch(); });
}

document.addEventListener('DOMContentLoaded', function(){
  updateCartCount();
  initMobileNav();
  initSearch();
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
