// Product Catalog Data (Realistic models with pricing, specs, and generated/mock images)
const PRODUCTS = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: 29490000,
    originalPrice: 34990000,
    image: "../images/iphone_mockup.png",
    rating: 5,
    specs: { ram: "8GB", storage: "256GB", battery: "4441 mAh", screen: "6.7 inch Super Retina" },
    discount: "15%",
    installment: "0% Trả Góp",
    description: "iPhone 15 Pro Max là đỉnh cao công nghệ của Apple với khung viền Titanium siêu bền nhẹ, nút Tác vụ (Action Button) tiện lợi, chip A17 Pro mạnh mẽ nhất thế giới và camera zoom quang học 5x đột phá."
  },
  {
    id: "galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra 256GB",
    brand: "Samsung",
    price: 26990000,
    originalPrice: 33990000,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    specs: { ram: "12GB", storage: "256GB", battery: "5000 mAh", screen: "6.8 inch Dynamic AMOLED" },
    discount: "20%",
    installment: "0% Trả Góp",
    description: "Samsung Galaxy S24 Ultra mở ra kỷ nguyên quyền năng AI mới với bút S-Pen thông minh, camera 200MP zoom không gian 100x và khung viền Titan sang trọng bậc nhất."
  },
  {
    id: "oppo-reno11-pro",
    name: "OPPO Reno11 Pro 5G 512GB",
    brand: "Oppo",
    price: 13990000,
    originalPrice: 16990000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    rating: 4,
    specs: { ram: "12GB", storage: "512GB", battery: "4600 mAh", screen: "6.7 inch AMOLED 120Hz" },
    discount: "17%",
    installment: "0% Trả Góp",
    description: "OPPO Reno11 Pro 5G - Chuyên gia chân dung AI. Sở hữu thiết kế vân đá 3D lấp lánh, hệ thống camera chân dung tele 32MP và sạc siêu nhanh SuperVOOC 80W."
  },
  {
    id: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra 5G 512GB",
    brand: "Xiaomi",
    price: 29990000,
    originalPrice: 32990000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    specs: { ram: "16GB", storage: "512GB", battery: "5000 mAh", screen: "6.73 inch AMOLED C8" },
    discount: "9%",
    installment: "0% Trả Góp",
    description: "Xiaomi 14 Ultra hợp tác cùng Leica mang đến cụm ống kính Summilux quang học đỉnh cao, cảm biến 1 inch thế hệ mới và vi xử lý Snapdragon 8 Gen 3 cực đại."
  },
  {
    id: "galaxy-a07-new",
    name: "Samsung Galaxy A07",
    brand: "Samsung",
    price: 2890000,
    originalPrice: 3490000,
    image: "../images/hero_banner.png", // Can also use mockup or stylized images
    rating: 4,
    specs: { ram: "4GB", storage: "64GB", battery: "5000 mAh", screen: "6.5 inch LCD" },
    discount: "17%",
    installment: "Trả Góp 0%",
    description: "Samsung Galaxy A07 sở hữu pin khủng 5000mAh bền bỉ cùng camera sắc nét, màn hình mượt mà mang lại trải nghiệm sử dụng trọn vẹn cả ngày dài với mức giá cực kỳ phải chăng."
  },
  {
    id: "iphone-13",
    name: "iPhone 13 128GB",
    brand: "Apple",
    price: 13690000,
    originalPrice: 16990000,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    specs: { ram: "4GB", storage: "128GB", battery: "3240 mAh", screen: "6.1 inch Super Retina" },
    discount: "19%",
    installment: "0% Trả Góp",
    description: "iPhone 13 sở hữu chip A15 Bionic mạnh mẽ, hệ thống camera kép tiên tiến xếp chéo độc đáo, và thời lượng pin được nâng cấp vượt bậc so với phiên bản tiền nhiệm."
  }
];

// Initialize Cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('quang_hung_cart')) || [];

// Format pricing helper
function formatVND(amount) {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
}

// Update Cart Badge globally
function updateCartBadge() {
  const badge = document.getElementById('cart-count-badge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItems;
    if (totalItems === 0) {
      badge.classList.add('hidden');
    } else {
      badge.classList.remove('hidden');
    }
  }
}

// Add Item to Cart
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItemIndex = cart.findIndex(item => item.id === productId);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      quantity: quantity
    });
  }

  localStorage.setItem('quang_hung_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`Đã thêm ${product.name} vào giỏ hàng thành công!`);
}

// Display Toast notification
function showToast(message) {
  // Remove existing toast if any
  const existing = document.getElementById('store-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'store-toast';
  toast.className = 'fixed top-6 right-6 z-[100] bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border-l-4 border-red-600 transition-all duration-300 transform translate-x-12 opacity-0';
  toast.innerHTML = `
    <svg class="w-6 h-6 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span class="font-medium text-sm text-slate-100">${message}</span>
  `;
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.remove('translate-x-12', 'opacity-0');
  }, 50);

  // Hide toast
  setTimeout(() => {
    toast.classList.add('translate-x-12', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- Home Slider Controller ---
function initHomeSlider() {
  const track = document.getElementById('slide-track');
  const slides = document.querySelectorAll('.slide-item');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  const dotContainer = document.getElementById('slide-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  let slideInterval;

  // Create dot indicators
  dotContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i === 0 ? 'bg-red-600 w-6' : 'bg-slate-300 hover:bg-slate-400'}`;
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoSlide();
    });
    dotContainer.appendChild(dot);
  });

  const dots = dotContainer.querySelectorAll('button');

  function updateDots() {
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.className = 'w-3 h-3 rounded-full bg-red-600 w-6 transition-all duration-300';
      } else {
        dot.className = 'w-3 h-3 rounded-full bg-slate-300 hover:bg-slate-400 transition-all duration-300';
      }
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${(currentIndex * 100) / slideCount}%)`;
    updateDots();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  startAutoSlide();
}

// --- Home Product Brand Filters ---
function initProductFilters() {
  const container = document.getElementById('product-grid-container');
  const filterButtons = document.querySelectorAll('.brand-filter-btn');

  if (!container) return;

  function renderProducts(filterBrand = 'all') {
    container.innerHTML = '';
    const filtered = filterBrand === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.brand.toLowerCase() === filterBrand.toLowerCase());

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-500">
          Không tìm thấy sản phẩm nào thuộc thương hiệu này.
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const isExternalImage = p.image.startsWith('http');
      const imgSrc = isExternalImage ? p.image : p.image;
      
      const card = document.createElement('div');
      card.className = 'bg-white rounded-2xl border border-slate-100 p-4 card-hover-effect flex flex-col relative';
      card.innerHTML = `
        <!-- Floating Labels -->
        <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          ${p.discount ? `<span class="text-white text-xs font-bold px-2.5 py-1 rounded-lg badge-discount shadow-sm">-${p.discount}</span>` : ''}
          ${p.installment ? `<span class="text-white text-xs font-bold px-2.5 py-1 rounded-lg badge-installment shadow-sm">${p.installment}</span>` : ''}
        </div>
        
        <!-- Product Thumbnail -->
        <a href="product-detail.html?id=${p.id}" class="block h-48 mb-4 overflow-hidden rounded-xl flex items-center justify-center bg-slate-50 relative group">
          <img src="${imgSrc}" alt="${p.name}" class="h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-110">
        </a>
        
        <!-- Brand -->
        <span class="text-slate-400 text-xs uppercase tracking-wider font-semibold">${p.brand}</span>
        
        <!-- Name -->
        <h3 class="text-slate-800 font-bold text-sm mt-1 mb-2 hover:text-red-600 transition-colors line-clamp-2 h-10">
          <a href="product-detail.html?id=${p.id}">${p.name}</a>
        </h3>
        
        <!-- Rating -->
        <div class="flex items-center gap-0.5 mb-3">
          ${Array(5).fill(0).map((_, i) => `
            <svg class="w-4 h-4 ${i < p.rating ? 'text-amber-400' : 'text-slate-200'}" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          `).join('')}
        </div>

        <!-- Specs Brief -->
        <div class="grid grid-cols-2 gap-1.5 bg-slate-50 p-2 rounded-lg text-[11px] text-slate-500 mb-4 font-medium">
          <div class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
            <span>${p.specs.ram}/${p.specs.storage}</span>
          </div>
          <div class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span>${p.specs.battery}</span>
          </div>
        </div>

        <!-- Pricing -->
        <div class="mt-auto pt-2 border-t border-slate-50 flex flex-col justify-end">
          <div class="flex items-baseline gap-1.5 flex-wrap">
            <span class="text-red-600 font-extrabold text-base">${formatVND(p.price)}</span>
            <span class="text-slate-400 line-through text-xs">${formatVND(p.originalPrice)}</span>
          </div>
          
          <!-- Buy Action -->
          <button onclick="addToCart('${p.id}')" class="mt-3 w-full bg-slate-900 hover:bg-red-600 text-white font-semibold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 select-none">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Thêm vào giỏ
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Hook filter buttons click event
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active design
      filterButtons.forEach(b => {
        b.classList.remove('bg-red-600', 'text-white', 'border-red-600');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });
      // Add active state to clicked button
      btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
      btn.classList.add('bg-red-600', 'text-white', 'border-red-600');

      const brand = btn.getAttribute('data-brand');
      renderProducts(brand);
    });
  });

  // Initial render based on URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const initialBrand = urlParams.get('brand') || 'all';

  // Highlight the correct filter button on load
  const targetBtn = Array.from(filterButtons).find(btn => btn.getAttribute('data-brand').toLowerCase() === initialBrand.toLowerCase());
  if (targetBtn) {
    filterButtons.forEach(b => {
      b.classList.remove('bg-red-600', 'text-white', 'border-red-600');
      b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
    });
    targetBtn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
    targetBtn.classList.add('bg-red-600', 'text-white', 'border-red-600');
  }

  renderProducts(initialBrand);
}

// --- Autocomplete Search ---
function initSearchBar() {
  const searchInput = document.getElementById('search-input');
  const suggestionContainer = document.getElementById('search-suggestions');

  if (!searchInput || !suggestionContainer) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      suggestionContainer.innerHTML = '';
      suggestionContainer.classList.add('hidden');
      return;
    }

    const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));

    if (matches.length === 0) {
      suggestionContainer.innerHTML = `
        <div class="p-4 text-center text-xs text-slate-500">
          Không tìm thấy điện thoại nào khớp với từ khóa
        </div>
      `;
    } else {
      suggestionContainer.innerHTML = matches.slice(0, 5).map(p => `
        <a href="product-detail.html?id=${p.id}" class="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
          <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain shrink-0 bg-slate-50 rounded-lg p-1">
          <div class="flex-1 min-w-0">
            <h4 class="text-slate-800 font-bold text-xs truncate">${p.name}</h4>
            <div class="flex items-baseline gap-1.5 mt-0.5">
              <span class="text-red-600 font-extrabold text-[11px]">${formatVND(p.price)}</span>
              <span class="text-slate-400 line-through text-[9px]">${formatVND(p.originalPrice)}</span>
            </div>
          </div>
        </a>
      `).join('');
    }

    suggestionContainer.classList.remove('hidden');
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionContainer.contains(e.target)) {
      suggestionContainer.classList.add('hidden');
    }
  });

  // Re-show suggestions on focus if populated
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length >= 2) {
      suggestionContainer.classList.remove('hidden');
    }
  });
}

// --- Product Detail Controller ---
function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'iphone-15-pro'; // Default to iphone 15 pro

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Set titles and categories
  const nameEl = document.getElementById('detail-name');
  if (nameEl) nameEl.innerText = product.name;
  
  const breadcrumbEl = document.getElementById('detail-breadcrumb-name');
  if (breadcrumbEl) breadcrumbEl.innerText = product.name;

  const descEl = document.getElementById('detail-desc');
  if (descEl) descEl.innerText = product.description;

  const currentPriceEl = document.getElementById('detail-current-price');
  if (currentPriceEl) currentPriceEl.innerText = formatVND(product.price);

  const originalPriceEl = document.getElementById('detail-original-price');
  if (originalPriceEl) originalPriceEl.innerText = formatVND(product.originalPrice);

  const discountEl = document.getElementById('detail-discount');
  if (discountEl) discountEl.innerText = `Giảm ${product.discount}`;

  // Image updates
  const mainImg = document.getElementById('detail-main-img');
  if (mainImg) {
    mainImg.src = product.image;
    mainImg.alt = product.name;
  }

  const primaryThumbImg = document.querySelector('.gallery-thumb[data-img="primary"] img');
  if (primaryThumbImg) {
    primaryThumbImg.src = product.image;
    primaryThumbImg.alt = product.name;
  }

  // Detailed specs table rendering
  const specsBody = document.getElementById('detail-specs-tbody');
  if (specsBody) {
    specsBody.innerHTML = `
      <tr class="border-b border-slate-100"><td class="py-2.5 font-semibold text-slate-500">Màn hình</td><td class="py-2.5 text-slate-800">${product.specs.screen}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2.5 font-semibold text-slate-500">RAM</td><td class="py-2.5 text-slate-800">${product.specs.ram}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2.5 font-semibold text-slate-500">Bộ nhớ trong</td><td class="py-2.5 text-slate-800">${product.specs.storage}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2.5 font-semibold text-slate-500">Dung lượng pin</td><td class="py-2.5 text-slate-800">${product.specs.battery}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2.5 font-semibold text-slate-500">Thương hiệu</td><td class="py-2.5 text-slate-800">${product.brand}</td></tr>
      <tr><td class="py-2.5 font-semibold text-slate-500">Trạng thái</td><td class="py-2.5 text-green-600 font-bold">Còn hàng (Tại siêu thị)</td></tr>
    `;
  }

  // Hook button actions
  const addBtn = document.getElementById('detail-add-cart-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart(product.id, 1);
    });
  }

  const buyNowBtn = document.getElementById('detail-buy-now-btn');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      // Add to cart and redirect immediately
      const existing = cart.find(item => item.id === product.id);
      if (!existing) {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          quantity: 1
        });
        localStorage.setItem('quang_hung_cart', JSON.stringify(cart));
      }
      window.location.href = 'cart.html';
    });
  }

  // Setup sub-gallery interactions if elements exist
  const thumbs = document.querySelectorAll('.gallery-thumb');
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      thumbs.forEach(tb => tb.classList.remove('border-red-600', 'ring-2', 'ring-red-100'));
      t.classList.add('border-red-600', 'ring-2', 'ring-red-100');
      if (mainImg) {
        // Switch between phone mockup image and other preset mocks
        if (t.dataset.img === 'primary') {
          mainImg.src = product.image;
        } else if (t.dataset.img === 'side') {
          mainImg.src = "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=600&q=80";
        } else {
          mainImg.src = "https://images.unsplash.com/photo-1565849906661-ca9608fbae74?auto=format&fit=crop&w=600&q=80";
        }
      }
    });
  });

  // Storage selection UI toggle
  const storageCapsules = document.querySelectorAll('.storage-capsule');
  storageCapsules.forEach(cap => {
    cap.addEventListener('click', () => {
      storageCapsules.forEach(c => c.classList.remove('border-red-600', 'text-red-600', 'bg-rose-50'));
      cap.classList.add('border-red-600', 'text-red-600', 'bg-rose-50');
    });
  });

  // Color selection UI toggle
  const colorCapsules = document.querySelectorAll('.color-capsule');
  colorCapsules.forEach(cap => {
    cap.addEventListener('click', () => {
      colorCapsules.forEach(c => c.classList.remove('ring-2', 'ring-offset-2', 'ring-red-500'));
      cap.classList.add('ring-2', 'ring-offset-2', 'ring-red-500');
    });
  });
}

// --- Cart Page Controller ---
function initCartPage() {
  const container = document.getElementById('cart-items-container');
  const totalQuantityEl = document.getElementById('cart-total-qty');
  const tempTotalEl = document.getElementById('cart-temp-total');
  const finalTotalEl = document.getElementById('cart-final-total');
  const cartSummaryBox = document.getElementById('cart-summary-box');
  const emptyCartState = document.getElementById('empty-cart-state');
  const checkoutForm = document.getElementById('checkout-form');

  if (!container) return;

  function renderCartList() {
    container.innerHTML = '';
    
    if (cart.length === 0) {
      if (cartSummaryBox) cartSummaryBox.classList.add('hidden');
      if (emptyCartState) emptyCartState.classList.remove('hidden');
      return;
    }

    if (cartSummaryBox) cartSummaryBox.classList.remove('hidden');
    if (emptyCartState) emptyCartState.classList.add('hidden');

    let totalVal = 0;
    let totalQty = 0;

    cart.forEach((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      totalVal += itemSubtotal;
      totalQty += item.quantity;

      const itemRow = document.createElement('div');
      itemRow.className = 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-100 rounded-2xl bg-white';
      itemRow.innerHTML = `
        <div class="flex items-center gap-4">
          <!-- Thumbnail -->
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain bg-slate-50 rounded-xl p-1 shrink-0">
          
          <!-- Detail -->
          <div>
            <h4 class="text-slate-800 font-bold text-sm hover:text-red-600 transition-colors">
              <a href="product-detail.html?id=${item.id}">${item.name}</a>
            </h4>
            <span class="text-xs text-slate-400 capitalize">${item.brand}</span>
            <div class="mt-1 flex items-baseline gap-1.5">
              <span class="text-red-600 font-extrabold text-sm">${formatVND(item.price)}</span>
            </div>
          </div>
        </div>

        <!-- Quantity Editor and Delete Action -->
        <div class="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
          <div class="flex items-center border border-slate-200 rounded-xl bg-slate-50">
            <button onclick="changeQty(${index}, -1)" class="px-3.5 py-1.5 text-slate-500 hover:text-red-600 font-bold text-sm transition-colors select-none">-</button>
            <span class="px-3 text-slate-800 font-bold text-xs">${item.quantity}</span>
            <button onclick="changeQty(${index}, 1)" class="px-3.5 py-1.5 text-slate-500 hover:text-red-600 font-bold text-sm transition-colors select-none">+</button>
          </div>
          
          <div class="text-right">
            <div class="text-slate-800 font-extrabold text-sm hidden sm:block">${formatVND(itemSubtotal)}</div>
            <button onclick="removeCartItem(${index})" class="text-xs text-slate-400 hover:text-red-600 transition-colors font-medium flex items-center gap-1 mt-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              Xóa
            </button>
          </div>
        </div>
      `;
      container.appendChild(itemRow);
    });

    // Update totals
    if (totalQuantityEl) totalQuantityEl.innerText = `${totalQty} sản phẩm`;
    if (tempTotalEl) tempTotalEl.innerText = formatVND(totalVal);
    if (finalTotalEl) finalTotalEl.innerText = formatVND(totalVal);
  }

  // Quantity Change Handler (Global-scope accessible)
  window.changeQty = function(index, delta) {
    if (cart[index]) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem('quang_hung_cart', JSON.stringify(cart));
      renderCartList();
      updateCartBadge();
    }
  };

  // Remove Item Handler (Global-scope accessible)
  window.removeCartItem = function(index) {
    if (cart[index]) {
      const removedName = cart[index].name;
      cart.splice(index, 1);
      localStorage.setItem('quang_hung_cart', JSON.stringify(cart));
      renderCartList();
      updateCartBadge();
      showToast(`Đã xóa ${removedName} khỏi giỏ hàng.`);
    }
  };

  // Pre-fill fields from user profile if logged in
  const currentUser = getUser();
  if (currentUser) {
    const fnInput = document.getElementById('checkout-fullname');
    const phInput = document.getElementById('checkout-phone');
    const adInput = document.getElementById('checkout-address');
    if (fnInput) fnInput.value = currentUser.fullname || '';
    if (phInput) phInput.value = currentUser.phone || '';
    if (adInput) adInput.value = currentUser.address || '';
  }

  // Form submission / simulation
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fullname = document.getElementById('checkout-fullname').value.trim();
      const phone = document.getElementById('checkout-phone').value.trim();
      const address = document.getElementById('checkout-address').value.trim();

      if (!fullname || !phone || !address) {
        alert("Vui lòng điền đầy đủ thông tin giao hàng!");
        return;
      }

      // Success order simulation — save order to history
      const order = {
        id: 'DH' + Date.now().toString().slice(-8),
        date: new Date().toLocaleString('vi-VN'),
        customer: { fullname, phone, address },
        items: cart.map(item => ({ ...item })),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: 'Đang xử lý'
      };

      // Save to order history in localStorage
      const orderHistory = JSON.parse(localStorage.getItem('quang_hung_orders')) || [];
      orderHistory.unshift(order);
      localStorage.setItem('quang_hung_orders', JSON.stringify(orderHistory));

      alert(`Cảm ơn anh/chị ${fullname}! Đơn hàng ${order.id} đã được tiếp nhận thành công. Nhân viên Quang Hưng Mobile sẽ liên hệ qua số điện thoại ${phone} để xác nhận trong vòng 15 phút.`);
      
      // Clear Cart
      cart = [];
      localStorage.removeItem('quang_hung_cart');
      renderCartList();
      updateCartBadge();
    });
  }

  // Initial render
  renderCartList();
}

// --- Warranty Page Controller ---
function initWarrantyPage() {
  const form = document.getElementById('warranty-search-form');
  const resultDiv = document.getElementById('warranty-result');
  if (!form || !resultDiv) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const imei = document.getElementById('warranty-imei').value.trim();
    if (!imei) return;

    // Simulate looking up warranty status
    resultDiv.classList.remove('hidden');
    
    // Simple deterministic hashing based on IMEI to return consistent mock data
    const statuses = [
      { status: 'Còn bảo hành', date: '18/11/2026', type: 'Bảo hành Vàng nguồn + màn hình + phần cứng (1 đổi 1)' },
      { status: 'Còn bảo hành', date: '05/02/2027', type: 'Bảo hành tiêu chuẩn chính hãng Apple/Samsung' },
      { status: 'Hết bảo hành', date: '10/04/2025', type: 'Bảo hành tiêu chuẩn chính hãng' }
    ];
    
    const hash = imei.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const res = statuses[hash % statuses.length];
    
    resultDiv.innerHTML = `
      <div class="border rounded-2xl p-5 ${res.status === 'Còn bảo hành' ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200'}">
        <h4 class="font-extrabold text-sm ${res.status === 'Còn bảo hành' ? 'text-emerald-700' : 'text-slate-700'} mb-3">Kết quả tra cứu IMEI: ${imei}</h4>
        <div class="space-y-2 text-xs font-semibold">
          <div class="flex justify-between items-center border-b border-slate-100/50 pb-2">
            <span class="text-slate-400">Trạng thái:</span>
            <span class="${res.status === 'Còn bảo hành' ? 'text-emerald-600' : 'text-rose-600'} font-bold">${res.status}</span>
          </div>
          <div class="flex justify-between items-center border-b border-slate-100/50 pb-2">
            <span class="text-slate-400">Ngày hết hạn:</span>
            <span class="text-slate-800">${res.date}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-400 shrink-0">Gói bảo hành:</span>
            <span class="text-slate-800 text-right max-w-[200px] sm:max-w-xs md:max-w-md truncate">${res.type}</span>
          </div>
        </div>
      </div>
    `;
  });
}

// --- Promotions Page Controller ---
function initPromotionsPage() {
  const buttons = document.querySelectorAll('.copy-coupon-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.code;
      if (!code) return;

      navigator.clipboard.writeText(code).then(() => {
        showToast(`Đã sao chép mã giảm giá: ${code}`);
        const oldText = btn.innerText;
        btn.innerText = 'Đã sao chép!';
        btn.classList.remove('bg-red-600', 'hover:bg-red-700');
        btn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
        
        setTimeout(() => {
          btn.innerText = oldText;
          btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
          btn.classList.add('bg-red-600', 'hover:bg-red-700');
        }, 2000);
      }).catch(err => {
        console.error('Lỗi khi sao chép mã: ', err);
      });
    });
  });
}

// --- Order History Page Controller ---
function initOrderHistoryPage() {
  const container = document.getElementById('order-history-container');
  const emptyState = document.getElementById('empty-order-state');
  const countBadge = document.getElementById('order-count-badge');

  if (!container) return;

  const orders = JSON.parse(localStorage.getItem('quang_hung_orders')) || [];

  if (orders.length === 0) {
    container.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  container.classList.remove('hidden');

  // Show order count
  if (countBadge) {
    countBadge.classList.remove('hidden');
    countBadge.innerHTML = `
      <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
      Tổng cộng ${orders.length} đơn hàng
    `;
  }

  // Status config
  function getStatusConfig(status) {
    switch (status) {
      case 'Đã giao':
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', icon: '✓' };
      case 'Đang giao':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500', icon: '🚚' };
      case 'Đã hủy':
        return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500', icon: '✕' };
      default:
        return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', icon: '⏳' };
    }
  }

  container.innerHTML = `
    <div class="space-y-5">
      ${orders.map((order, idx) => {
        const sc = getStatusConfig(order.status);
        const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
        return `
          <!-- Order Card -->
          <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden card-hover-effect">
            <!-- Order Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-slate-100 bg-slate-50/50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl ${sc.bg} ${sc.text} flex items-center justify-center font-bold text-lg shrink-0">
                  ${sc.icon}
                </div>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-slate-800 font-extrabold text-sm">Đơn hàng #${order.id}</h3>
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${sc.bg} ${sc.text} ${sc.border} border">${order.status}</span>
                  </div>
                  <p class="text-slate-400 text-[11px] mt-0.5 flex items-center gap-1.5">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    ${order.date}
                    <span class="text-slate-300">•</span>
                    ${totalItems} sản phẩm
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <p class="text-[10px] text-slate-400 font-medium">Tổng tiền</p>
                  <p class="text-red-600 font-extrabold text-base">${formatVND(order.total)}</p>
                </div>
                <button onclick="toggleOrderDetail(${idx})" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0">
                  <svg id="order-chevron-${idx}" class="w-4 h-4 text-slate-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              </div>
            </div>

            <!-- Order Detail (hidden by default) -->
            <div id="order-detail-${idx}" class="hidden">
              <!-- Customer Info -->
              <div class="px-5 py-4 border-b border-slate-50 bg-slate-50/30">
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Thông tin giao hàng</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span class="text-slate-700 font-semibold">${order.customer.fullname}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <span class="text-slate-700 font-semibold">${order.customer.phone}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span class="text-slate-700 font-semibold">${order.customer.address}</span>
                  </div>
                </div>
              </div>

              <!-- Items list -->
              <div class="px-5 py-4 space-y-3">
                <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">Chi tiết sản phẩm</h4>
                ${order.items.map(item => `
                  <div class="flex items-center gap-4 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                    <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-contain bg-white rounded-lg p-1 shrink-0 border border-slate-100">
                    <div class="flex-1 min-w-0">
                      <h5 class="text-slate-800 font-bold text-xs truncate">${item.name}</h5>
                      <span class="text-slate-400 text-[10px] capitalize">${item.brand || ''}</span>
                      <div class="flex items-baseline gap-2 mt-0.5">
                        <span class="text-red-600 font-extrabold text-xs">${formatVND(item.price)}</span>
                        <span class="text-slate-400 text-[10px]">× ${item.quantity}</span>
                      </div>
                    </div>
                    <div class="text-right shrink-0">
                      <span class="text-slate-800 font-bold text-xs">${formatVND(item.price * item.quantity)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Order total summary -->
              <div class="px-5 py-4 border-t border-slate-100 bg-slate-50/30">
                <div class="flex justify-between items-center text-xs">
                  <span class="text-slate-500 font-medium">Tạm tính</span>
                  <span class="text-slate-700 font-semibold">${formatVND(order.total)}</span>
                </div>
                <div class="flex justify-between items-center text-xs mt-1.5">
                  <span class="text-slate-500 font-medium">Phí vận chuyển</span>
                  <span class="text-emerald-600 font-semibold">Miễn phí</span>
                </div>
                <div class="flex justify-between items-center mt-3 pt-3 border-t border-slate-200">
                  <span class="text-slate-800 font-bold text-sm">Tổng cộng</span>
                  <span class="text-red-600 font-extrabold text-lg">${formatVND(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Clear History Button -->
    <div class="mt-8 text-center">
      <button onclick="clearOrderHistory()" class="text-xs text-slate-400 hover:text-red-500 transition-colors font-medium inline-flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        Xóa toàn bộ lịch sử mua hàng
      </button>
    </div>
  `;
}

// Toggle order detail expand/collapse
window.toggleOrderDetail = function(idx) {
  const detail = document.getElementById(`order-detail-${idx}`);
  const chevron = document.getElementById(`order-chevron-${idx}`);
  if (detail) {
    detail.classList.toggle('hidden');
    if (chevron) {
      chevron.classList.toggle('rotate-180');
    }
  }
};

// --- User Account State & Login Modal ---
function getUser() {
  const isLoggedOut = localStorage.getItem('quang_hung_logged_out') === 'true';
  if (isLoggedOut) return null;
  
  const savedUser = localStorage.getItem('quang_hung_user');
  if (savedUser) {
    return JSON.parse(savedUser);
  }
  
  // Default coursework user profile
  return {
    fullname: "Ong Sao",
    email: "ongsao@gmail.com",
    phone: "0901234567",
    address: "123 Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội"
  };
}

function saveUser(user) {
  localStorage.setItem('quang_hung_user', JSON.stringify(user));
  localStorage.removeItem('quang_hung_logged_out');
  updateUserHeader();
}

window.logout = function() {
  localStorage.setItem('quang_hung_logged_out', 'true');
  localStorage.removeItem('quang_hung_user');
  updateUserHeader();
  showToast('Đã đăng xuất tài khoản thành công.');
  // If we are on profile.html or order-history.html, redirect to index.html
  if (window.location.pathname.includes('profile.html') || window.location.pathname.includes('order-history.html')) {
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
};

function updateUserHeader() {
  const container = document.getElementById('user-header-section');
  if (!container) return;

  const user = getUser();
  
  if (!user) {
    container.innerHTML = `
      <button onclick="openLoginModal()" class="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-extrabold text-[10px] sm:text-xs px-3.5 py-2 rounded-xl shadow transition-colors flex items-center gap-1 select-none">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3 3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
        Đăng nhập
      </button>
    `;
    return;
  }

  // Check if custom avatar exists, otherwise get initials
  let avatarMarkup = '';
  if (user.avatar) {
    avatarMarkup = `
      <div class="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white">
        <img src="${user.avatar}" alt="Avatar" class="w-full h-full object-cover">
      </div>
    `;
  } else {
    const initials = user.fullname ? user.fullname.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'US';
    avatarMarkup = `
      <div class="w-6 h-6 rounded-full bg-yellow-400 text-slate-900 font-bold text-xs flex items-center justify-center shadow-inner shrink-0 border border-white">
        ${initials}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="relative group select-none">
      <button class="flex items-center gap-1 hover:bg-brand-redHover px-3 py-2 rounded-xl transition-all font-bold text-xs">
        ${avatarMarkup}
        <span class="hidden sm:inline">${user.fullname}</span>
        <svg class="w-3.5 h-3.5 text-rose-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div class="absolute right-0 mt-1 hidden group-hover:block w-44 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
        <a href="profile.html" class="block px-4 py-2 hover:bg-slate-50 font-semibold text-xs text-slate-700">Tài khoản</a>
        <a href="order-history.html" class="block px-4 py-2 hover:bg-slate-50 font-semibold text-xs text-slate-700">Lịch sử mua hàng</a>
        <button onclick="logout()" class="w-full text-left block px-4 py-2 hover:bg-slate-50 font-semibold text-xs text-red-600">Đăng xuất</button>
      </div>
    </div>
  `;
}

// Open/Close modal functions
window.openLoginModal = function() {
  // Remove existing modal if any
  const existing = document.getElementById('login-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'login-modal';
  modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 opacity-0';
  modal.innerHTML = `
    <!-- Modal content box -->
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden transform scale-95 transition-all duration-300 relative">
      
      <!-- Close button -->
      <button onclick="closeLoginModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <!-- Tabs header -->
      <div class="flex border-b border-slate-100">
        <button onclick="switchLoginTab('login')" id="tab-login" class="flex-1 py-4 text-center font-extrabold text-sm border-b-2 border-brand-red text-brand-red transition-all focus:outline-none">
          Đăng nhập
        </button>
        <button onclick="switchLoginTab('register')" id="tab-register" class="flex-1 py-4 text-center font-extrabold text-sm border-b-2 border-transparent text-slate-400 hover:text-slate-600 transition-all focus:outline-none">
          Đăng ký
        </button>
      </div>

      <!-- Tab Contents -->
      <div class="p-6 sm:p-8">
        
        <!-- Login Form -->
        <form id="form-login" onsubmit="submitLogin(event)" class="space-y-4">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5" for="login-email">Địa chỉ Email</label>
            <input type="email" id="login-email" required placeholder="nhapemail@gmail.com" class="w-full bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 font-semibold">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5" for="login-password">Mật khẩu</label>
            <input type="password" id="login-password" required placeholder="••••••••" class="w-full bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 font-semibold">
          </div>
          <button type="submit" class="w-full mt-2 bg-brand-red hover:bg-brand-redHover text-white font-extrabold text-xs py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 btn-red-glow">
            Đăng nhập ngay
          </button>
        </form>

        <!-- Register Form -->
        <form id="form-register" onsubmit="submitRegister(event)" class="space-y-4 hidden">
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5" for="reg-fullname">Họ tên của bạn</label>
            <input type="text" id="reg-fullname" required placeholder="Nguyễn Văn A" class="w-full bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 font-semibold">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5" for="reg-phone">Số điện thoại</label>
            <input type="text" id="reg-phone" required placeholder="0901234567" class="w-full bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 font-semibold">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5" for="reg-email">Địa chỉ Email</label>
            <input type="email" id="reg-email" required placeholder="email@gmail.com" class="w-full bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 font-semibold">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5" for="reg-password">Mật khẩu</label>
            <input type="password" id="reg-password" required placeholder="••••••••" class="w-full bg-slate-50 text-slate-800 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 font-semibold">
          </div>
          <button type="submit" class="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5">
            Đăng ký tài khoản
          </button>
        </form>

      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Trigger entrance animation
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.querySelector('.transform').classList.remove('scale-95');
  }, 50);
};

window.closeLoginModal = function() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  modal.classList.add('opacity-0');
  modal.querySelector('.transform').classList.add('scale-95');
  setTimeout(() => modal.remove(), 300);
};

window.switchLoginTab = function(tab) {
  const tabLoginBtn = document.getElementById('tab-login');
  const tabRegisterBtn = document.getElementById('tab-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  if (tab === 'login') {
    tabLoginBtn.className = 'flex-1 py-4 text-center font-extrabold text-sm border-b-2 border-brand-red text-brand-red transition-all focus:outline-none';
    tabRegisterBtn.className = 'flex-1 py-4 text-center font-extrabold text-sm border-b-2 border-transparent text-slate-400 hover:text-slate-600 transition-all focus:outline-none';
    formLogin.classList.remove('hidden');
    formRegister.classList.add('hidden');
  } else {
    tabRegisterBtn.className = 'flex-1 py-4 text-center font-extrabold text-sm border-b-2 border-brand-red text-brand-red transition-all focus:outline-none';
    tabLoginBtn.className = 'flex-1 py-4 text-center font-extrabold text-sm border-b-2 border-transparent text-slate-400 hover:text-slate-600 transition-all focus:outline-none';
    formRegister.classList.remove('hidden');
    formLogin.classList.add('hidden');
  }
};

window.submitLogin = function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  // Look for registered users or default to Ong Sao
  const mockUser = {
    fullname: email.split('@')[0].toUpperCase(),
    email: email,
    phone: "0901234567",
    address: "123 Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội"
  };
  saveUser(mockUser);
  closeLoginModal();
  showToast(`Chào mừng ${mockUser.fullname} đã đăng nhập!`);
};

window.submitRegister = function(e) {
  e.preventDefault();
  const fullname = document.getElementById('reg-fullname').value;
  const phone = document.getElementById('reg-phone').value;
  const email = document.getElementById('reg-email').value;
  
  const mockUser = { fullname, phone, email, address: '' };
  saveUser(mockUser);
  closeLoginModal();
  showToast('Đăng ký tài khoản thành công!');
};

// Profile Page Controller
function initProfilePage() {
  const form = document.getElementById('profile-form');
  if (!form) return;

  const user = getUser();
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // Pre-fill inputs
  const nameInput = document.getElementById('profile-fullname');
  const phoneInput = document.getElementById('profile-phone');
  const emailInput = document.getElementById('profile-email');
  const addrInput = document.getElementById('profile-address');
  const avatarLarge = document.getElementById('profile-avatar-large');
  const avatarInput = document.getElementById('avatar-upload-input');

  if (nameInput) nameInput.value = user.fullname || '';
  if (phoneInput) phoneInput.value = user.phone || '';
  if (emailInput) emailInput.value = user.email || '';
  if (addrInput) addrInput.value = user.address || '';

  // Current avatar state
  let currentAvatarBase64 = user.avatar || null;

  // Render current avatar
  function renderProfileAvatar() {
    if (avatarLarge) {
      if (currentAvatarBase64) {
        avatarLarge.innerHTML = `<img src="${currentAvatarBase64}" class="w-full h-full object-cover">`;
      } else if (user.fullname) {
        avatarLarge.innerHTML = user.fullname.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      }
    }
  }

  renderProfileAvatar();

  // Listen to file selection
  if (avatarInput) {
    avatarInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // Size validation: cap it (e.g. 1.5MB) because localStorage has a limit of 5MB
        if (file.size > 1.5 * 1024 * 1024) {
          alert('Dung lượng ảnh quá lớn! Vui lòng chọn ảnh dưới 1.5MB để lưu trữ.');
          avatarInput.value = '';
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          currentAvatarBase64 = event.target.result;
          renderProfileAvatar();
          showToast('Đã chọn ảnh đại diện mới. Hãy nhấn "Lưu thay đổi" để áp dụng!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedUser = {
      fullname: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      address: addrInput.value.trim(),
      avatar: currentAvatarBase64 // Save the Base64 avatar
    };
    saveUser(updatedUser);
    
    // Rerender profile avatar in case names changed and there was no uploaded avatar
    renderProfileAvatar();
    showToast('Đã lưu thông tin tài khoản thành công!');
  });
}

// Clear all order history
window.clearOrderHistory = function() {
  if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử mua hàng không?')) {
    localStorage.removeItem('quang_hung_orders');
    initOrderHistoryPage();
    showToast('Đã xóa toàn bộ lịch sử mua hàng.');
  }
};

// DOM content load orchestration
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initSearchBar();
  updateUserHeader();
  
  // Conditionally trigger loaders depending on container availability
  if (document.getElementById('slide-track')) {
    initHomeSlider();
  }
  if (document.getElementById('product-grid-container')) {
    initProductFilters();
  }
  if (document.getElementById('detail-main-img')) {
    initProductDetailPage();
  }
  if (document.getElementById('cart-items-container')) {
    initCartPage();
  }
  if (document.getElementById('warranty-search-form')) {
    initWarrantyPage();
  }
  if (document.querySelector('.copy-coupon-btn')) {
    initPromotionsPage();
  }
  if (document.getElementById('order-history-container')) {
    initOrderHistoryPage();
  }
  if (document.getElementById('profile-form')) {
    initProfilePage();
  }
});
