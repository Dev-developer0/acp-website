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
  var imgPath = 'image/products/' + (p.imgType || 'kit') + '.svg';
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
      '<img src="' + imgPath + '" alt="' + sanitize(p.name) + '" class="product-image" onerror="this.style.display=\'none\'">' +
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

/* =============================================
   HERO GALLERY — auto-rotating slideshow
   ============================================= */
function initHeroGallery() {
  var main = document.querySelector('.hero-gallery-main');
  var thumbs = document.querySelectorAll('.hero-gallery-thumbs img');
  if (!main || !thumbs.length) return;

  var imageSequence = [];
  var currentIndex = 0;
  var autoplayInterval = null;

  // Store original images
  thumbs.forEach(function(thumb, idx) {
    imageSequence.push({ src: thumb.src, alt: thumb.alt });
  });
  
  // Include main image as starting point
  imageSequence.unshift({ src: main.src, alt: main.alt });

  // Update main image display
  function updateMainImage(index) {
    currentIndex = index % imageSequence.length;
    var image = imageSequence[currentIndex];
    main.src = image.src;
    main.alt = image.alt;
    
    // Update active thumbnail
    thumbs.forEach(function(thumb, idx) {
      thumb.classList.remove('active');
      if (idx === currentIndex - 1) {
        thumb.classList.add('active');
      }
    });
  }

  // Auto advance slideshow
  function nextSlide() {
    updateMainImage(currentIndex + 1);
  }

  // Start autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 3000);
  }

  // Pause on user interaction
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Set first thumb as active
  thumbs[0].classList.add('active');

  // Thumbnail click handler
  thumbs.forEach(function(thumb, idx) {
    thumb.addEventListener('click', function() {
      updateMainImage(idx + 1);
      resetAutoplay();
    });
  });

  // Start the slideshow
  startAutoplay();
}

/* =============================================
   PRODUCT CARD WITH REAL PHOTO SUPPORT
   ============================================= */
function productCardHTML(p) {
  // If product has a real image path, show it. Otherwise show SVG illustration.
  var imgContent = '';
  if (p.img) {
    imgContent = '<img src="' + p.img + '" alt="' + sanitize(p.name) + '" class="real-photo" onerror="this.style.display=\'none\'">';
  } else {
    var svg = (typeof getProductSVG === 'function') ? getProductSVG(p.imgType || 'kit') : '';
    imgContent = '<div class="svg-wrap">' + svg + '</div>';
  }

  // WhatsApp & Email pre-filled messages
  var waMsg = encodeURIComponent(
    'Hello A.C.P,\n\nI am interested in the following product:\n\n' +
    'Product: ' + p.name + '\n' +
    'Part No: ' + p.partNo + '\n' +
    'Brand: ' + p.brand + '\n\n' +
    'Please share availability and pricing.\n\nThank you.'
  );
  var emailSubject = encodeURIComponent('Product Inquiry: ' + p.name + ' (' + p.partNo + ')');
  var emailBody = encodeURIComponent(
    'Hello,\n\nI am interested in the following product:\n\n' +
    'Product: ' + p.name + '\n' +
    'Part No: ' + p.partNo + '\n' +
    'Brand: ' + p.brand + '\n\n' +
    'Please share availability, pricing and delivery details.\n\nThank you.'
  );

  return '<div class="product-card">' +
    '<div class="product-img">' +
      '<span class="product-brand-badge">' + sanitize(p.brand) + '</span>' +
      imgContent +
      (p.img ? '' : '<div class="part-no-display">' + sanitize(p.partNo) + '</div>') +
    '</div>' +
    '<div class="product-info">' +
      '<div class="part-no">' + sanitize(p.partNo) + '</div>' +
      '<h3>' + sanitize(p.name) + '</h3>' +
      '<p class="product-desc">' + sanitize((p.desc || '').slice(0, 80)) + (p.desc && p.desc.length > 80 ? '…' : '') + '</p>' +
      '<div class="product-actions">' +
        '<a href="https://wa.me/918881780590?text=' + waMsg + '" target="_blank" rel="noopener noreferrer" class="pact-btn pact-wa">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
          'WhatsApp' +
        '</a>' +
        '<a href="mailto:air_compressorproducts@yahoo.com?subject=' + emailSubject + '&body=' + emailBody + '" class="pact-btn pact-email">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>' +
          'Email' +
        '</a>' +
        '<button class="pact-cart" title="Add to cart" onclick="handleAddCart(\'' + p.id + '\', this)">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.97-1.67L23 6H6"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

// Init gallery on page load
document.addEventListener('DOMContentLoaded', function() {
  initHeroGallery();
});
