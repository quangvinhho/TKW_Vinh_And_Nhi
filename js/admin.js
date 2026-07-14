// --- Admin Dashboard Script ---

// Initialise Products in localStorage (with default stocks if not present)
let adminProducts = JSON.parse(localStorage.getItem('quang_hung_products')) || [];
if (adminProducts.length === 0) {
  // Use the global PRODUCTS array from main.js if available, or a fallback copy
  const fallbackProducts = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [
    { id: "iphone-15-pro", name: "iPhone 15 Pro Max 256GB", brand: "Apple", price: 29490000, originalPrice: 34990000, image: "../images/iphone-15-pro-max-256-99.png", rating: 5, specs: { ram: "8GB", storage: "256GB", battery: "4441 mAh", screen: "6.7 inch Super Retina" }, discount: "15%", installment: "0% Trả Góp", description: "" },
    { id: "galaxy-s24-ultra", name: "Samsung Galaxy S24 Ultra 256GB", brand: "Samsung", price: 26990000, originalPrice: 33990000, image: "../images/s24.webp", rating: 5, specs: { ram: "12GB", storage: "256GB", battery: "5000 mAh", screen: "6.8 inch Dynamic AMOLED" }, discount: "20%", installment: "0% Trả Góp", description: "" },
    { id: "oppo-reno11-pro", name: "OPPO Reno11 Pro 5G 512GB", brand: "Oppo", price: 13990000, originalPrice: 16990000, image: "../images/oppo-reno.avif", rating: 4, specs: { ram: "12GB", storage: "512GB", battery: "4600 mAh", screen: "6.7 inch AMOLED 120Hz" }, discount: "17%", installment: "0% Trả Góp", description: "" },
    { id: "xiaomi-14-ultra", name: "Xiaomi 14 Ultra 5G 512GB", brand: "Xiaomi", price: 29990000, originalPrice: 32990000, image: "../images/xiaomi-17-ultra-leica-edition-1.jpg", rating: 5, specs: { ram: "16GB", storage: "512GB", battery: "5000 mAh", screen: "6.73 inch AMOLED C8" }, discount: "9%", installment: "0% Trả Góp", description: "" },
    { id: "galaxy-a07-new", name: "Samsung Galaxy A07", brand: "Samsung", price: 2890000, originalPrice: 3490000, image: "../images/samsung_galaxy_a07.webp", rating: 4, specs: { ram: "4GB", storage: "64GB", battery: "5000 mAh", screen: "6.5 inch LCD" }, discount: "17%", installment: "Trả Góp 0%", description: "" },
    { id: "iphone-13", name: "iPhone 13 128GB", brand: "Apple", price: 13690000, originalPrice: 16990000, image: "../images/iphone-14-pro-max-128-99.webp", rating: 5, specs: { ram: "4GB", storage: "128GB", battery: "3240 mAh", screen: "6.1 inch Super Retina" }, discount: "19%", installment: "0% Trả Góp", description: "" }
  ];

  adminProducts = fallbackProducts.map((p, idx) => ({
    ...p,
    stock: idx === 4 ? 3 : (idx === 2 ? 0 : Math.floor(Math.random() * 15) + 6), // Mix some warning stocks (0, 3) and normal stocks
    salesCount: Math.floor(Math.random() * 45) + 5
  }));
  localStorage.setItem('quang_hung_products', JSON.stringify(adminProducts));
}

// Initialise Orders in localStorage
let adminOrders = JSON.parse(localStorage.getItem('quang_hung_orders')) || [
  {
    id: "DH98547213",
    date: "11/07/2026 14:30:15",
    customer: { fullname: "Nguyễn Văn Hùng", phone: "0912345678", address: "456 Đường 3/2, Quận 10, TP. HCM" },
    items: [
      { id: "iphone-15-pro", name: "iPhone 15 Pro Max 256GB", price: 29490000, quantity: 1, image: "../images/iphone-15-pro-max-256-99.png" }
    ],
    total: 29490000,
    status: "Đang xử lý"
  },
  {
    id: "DH73512948",
    date: "10/07/2026 09:15:22",
    customer: { fullname: "Trần Thị Nhi", phone: "0987654321", address: "123 Cầu Giấy, Hà Nội" },
    items: [
      { id: "galaxy-a07-new", name: "Samsung Galaxy A07", price: 2890000, quantity: 2, image: "../images/samsung_galaxy_a07.webp" }
    ],
    total: 5780000,
    status: "Đã giao"
  }
];
if (!localStorage.getItem('quang_hung_orders')) {
  localStorage.setItem('quang_hung_orders', JSON.stringify(adminOrders));
}

// Format VND currency helper
function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
}

// Global scope alerts handler
function showAdminToast(message) {
  const existing = document.getElementById('admin-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'admin-toast';
  toast.className = 'fixed bottom-6 right-6 z-[200] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-l-4 border-red-600 transition-all duration-300 transform translate-y-12 opacity-0';
  toast.innerHTML = `
    <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span class="font-bold text-xs text-slate-100">${message}</span>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove('translate-y-12', 'opacity-0');
  }, 50);

  setTimeout(() => {
    toast.classList.add('translate-y-12', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Initialize Statistics
function initFinancials() {
  const filterSelect = document.getElementById('time-filter');
  if (!filterSelect) return;

  function updateOverviewStats() {
    const period = filterSelect.value;
    
    // Base statistics for calculation (mocked baseline + real order calculations)
    const realOrders = JSON.parse(localStorage.getItem('quang_hung_orders')) || [];
    const completedOrdersValue = realOrders
      .filter(o => o.status === 'Đã giao')
      .reduce((sum, o) => sum + o.total, 0);
    const pendingOrdersValue = realOrders
      .filter(o => o.status === 'Đang xử lý')
      .reduce((sum, o) => sum + o.total, 0);

    let baseRevenue = 0;
    let baseExpense = 0;

    switch(period) {
      case 'day':
        baseRevenue = 15490000 + pendingOrdersValue * 0.1; // Add portion of real orders for daily mock representation
        baseExpense = 9850000;
        break;
      case 'week':
        baseRevenue = 112890000 + pendingOrdersValue * 0.4;
        baseExpense = 73500000;
        break;
      case 'month':
        baseRevenue = 489500000 + completedOrdersValue + pendingOrdersValue;
        baseExpense = 312000000;
        break;
      case 'year':
        baseRevenue = 5890000000 + completedOrdersValue + pendingOrdersValue;
        baseExpense = 3820000000;
        break;
    }

    const netProfit = baseRevenue - baseExpense;

    // Update Dom
    document.getElementById('stat-revenue').innerText = formatCurrency(baseRevenue);
    document.getElementById('stat-spending').innerText = formatCurrency(baseExpense);
    document.getElementById('stat-profit').innerText = formatCurrency(netProfit);
  }

  filterSelect.addEventListener('change', updateOverviewStats);
  updateOverviewStats();
}

// Initialize Product Catalog & Inventory List
function renderProductManager() {
  const tableBody = document.getElementById('admin-products-table-body');
  if (!tableBody) return;

  tableBody.innerHTML = '';
  adminProducts.forEach((p, idx) => {
    // Determine Stock level status
    let stockStatusHTML = '';
    if (p.stock >= 10) {
      stockStatusHTML = `<span class="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">Còn hàng (${p.stock})</span>`;
    } else if (p.stock > 0) {
      stockStatusHTML = `<span class="bg-amber-100 text-amber-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase stock-warning-pulse">Sắp hết (${p.stock})</span>`;
    } else {
      stockStatusHTML = `<span class="bg-red-100 text-red-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">Hết hàng</span>`;
    }

    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-100 hover:bg-slate-50/50 transition-colors text-xs font-semibold text-slate-700';
    tr.innerHTML = `
      <td class="py-4.5 px-4 font-mono text-[11px] text-slate-400">#${p.id.slice(0, 10)}</td>
      <td class="py-4.5 px-4">
        <div class="flex items-center gap-3">
          <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain bg-slate-50 rounded-xl p-1 shrink-0">
          <div class="truncate max-w-[180px]">
            <span class="block text-slate-800 font-bold truncate">${p.name}</span>
            <span class="text-[10px] text-slate-400 uppercase tracking-wide font-bold">${p.brand}</span>
          </div>
        </div>
      </td>
      <td class="py-4.5 px-4 text-slate-800 font-black">${formatCurrency(p.price)}</td>
      <td class="py-4.5 px-4">${stockStatusHTML}</td>
      <td class="py-4.5 px-4 font-mono text-center">${p.salesCount || 0}</td>
      <td class="py-4.5 px-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick="openEditStockModal(${idx})" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa kho hàng">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </button>
          <button onclick="deleteProduct(${idx})" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa sản phẩm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  updateInventoryMetrics();
}

// Update Top level Inventory summaries
function updateInventoryMetrics() {
  const totalQty = adminProducts.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = adminProducts.filter(p => p.stock > 0 && p.stock < 5).length;
  const outOfStockCount = adminProducts.filter(p => p.stock === 0).length;

  const totalQtyEl = document.getElementById('metric-total-stock');
  const warningEl = document.getElementById('metric-warning-stock');

  if (totalQtyEl) totalQtyEl.innerText = `${totalQty} máy`;
  if (warningEl) {
    if (lowStockCount > 0 || outOfStockCount > 0) {
      warningEl.innerHTML = `
        <span class="text-red-600 font-extrabold flex items-center gap-1">
          ⚠️ ${lowStockCount} sắp hết / ${outOfStockCount} hết hàng
        </span>
      `;
    } else {
      warningEl.innerText = "Tất cả ổn định";
    }
  }
}

// Delete product handler
window.deleteProduct = function(index) {
  if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${adminProducts[index].name} khỏi cửa hàng không?`)) {
    const deletedName = adminProducts[index].name;
    adminProducts.splice(index, 1);
    localStorage.setItem('quang_hung_products', JSON.stringify(adminProducts));
    renderProductManager();
    renderPerformanceProducts();
    showAdminToast(`Đã xóa sản phẩm ${deletedName} thành công!`);
  }
};

// Render Orders List
function renderOrderManager() {
  const tableBody = document.getElementById('admin-orders-table-body');
  if (!tableBody) return;

  const orders = JSON.parse(localStorage.getItem('quang_hung_orders')) || [];
  tableBody.innerHTML = '';

  if (orders.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="py-12 text-center text-slate-400 font-bold">Chưa có đơn hàng nào được ghi nhận</td>
      </tr>
    `;
    return;
  }

  orders.forEach((o, index) => {
    // Generate order items layout string
    const itemsDescription = o.items.map(item => `${item.name} <span class="text-slate-400">x${item.quantity}</span>`).join('<br>');

    // Dropdown status generator
    const tr = document.createElement('tr');
    tr.className = 'border-b border-slate-100 hover:bg-slate-50/50 transition-colors text-xs font-semibold text-slate-700';
    
    // Status selection select options
    tr.innerHTML = `
      <td class="py-4 px-4 font-mono font-bold text-slate-800">${o.id}</td>
      <td class="py-4 px-4 text-slate-400 font-bold text-[10px]">${o.date}</td>
      <td class="py-4 px-4 text-left">
        <span class="block text-slate-800 font-bold">${o.customer.fullname}</span>
        <span class="text-[10px] text-slate-400 block">${o.customer.phone}</span>
        <span class="text-[9px] text-slate-400 truncate max-w-[200px] block" title="${o.customer.address}">${o.customer.address}</span>
      </td>
      <td class="py-4 px-4 leading-relaxed">${itemsDescription}</td>
      <td class="py-4 px-4 font-black text-slate-800">${formatCurrency(o.total)}</td>
      <td class="py-4 px-4">
        <select onchange="updateOrderStatus(${index}, this.value)" class="text-[11px] font-bold rounded-full py-1.5 px-3 border-none focus:outline-none cursor-pointer ${
          o.status === 'Đang xử lý' ? 'status-pending' : (o.status === 'Đã giao' ? 'status-completed' : 'status-cancelled')
        }">
          <option value="Đang xử lý" ${o.status === 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
          <option value="Đã giao" ${o.status === 'Đã giao' ? 'selected' : ''}>Đã giao</option>
          <option value="Đã hủy" ${o.status === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
        </select>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Update order status dropdown
window.updateOrderStatus = function(index, newStatus) {
  const orders = JSON.parse(localStorage.getItem('quang_hung_orders')) || [];
  if (orders[index]) {
    orders[index].status = newStatus;
    localStorage.setItem('quang_hung_orders', JSON.stringify(orders));
    renderOrderManager();
    initFinancials(); // recalculate overview stats if status changes
    showAdminToast(`Cập nhật trạng thái Đơn hàng ${orders[index].id} thành công!`);
  }
};

// Render performance tables: Top selling and Slow moving products
function renderPerformanceProducts() {
  const bestSellersContainer = document.getElementById('best-sellers-list');
  const slowMovingContainer = document.getElementById('slow-moving-list');

  if (!bestSellersContainer || !slowMovingContainer) return;

  // Clone products list and sort by salesCount desc for best sellers
  const sortedBest = [...adminProducts].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0)).slice(0, 3);
  bestSellersContainer.innerHTML = sortedBest.map(p => `
    <div class="flex items-center justify-between gap-3 p-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all">
      <div class="flex items-center gap-3 min-w-0">
        <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain bg-white rounded-xl p-1 shrink-0 border border-slate-100">
        <div class="min-w-0">
          <span class="block text-xs font-bold text-slate-800 truncate">${p.name}</span>
          <span class="text-[10px] text-slate-400 capitalize font-semibold">${p.brand}</span>
        </div>
      </div>
      <div class="text-right shrink-0">
        <span class="block text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Đã bán ${p.salesCount || 0}</span>
      </div>
    </div>
  `).join('');

  // Sort by stock desc and salesCount asc for slow moving products
  const sortedSlow = [...adminProducts]
    .filter(p => p.stock > 0)
    .sort((a, b) => (a.salesCount || 0) - (b.salesCount || 0))
    .slice(0, 3);
  
  slowMovingContainer.innerHTML = sortedSlow.map(p => `
    <div class="flex items-center justify-between gap-3 p-3.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition-all">
      <div class="flex items-center gap-3 min-w-0">
        <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain bg-white rounded-xl p-1 shrink-0 border border-slate-100">
        <div class="min-w-0">
          <span class="block text-xs font-bold text-slate-800 truncate">${p.name}</span>
          <span class="text-[10px] text-slate-400 capitalize font-semibold">${p.brand}</span>
        </div>
      </div>
      <div class="text-right shrink-0">
        <span class="block text-[10px] text-slate-500 font-bold">Tồn kho: ${p.stock} máy</span>
        <span class="text-[9px] text-red-500 font-semibold uppercase">Đã bán: ${p.salesCount || 0}</span>
      </div>
    </div>
  `).join('');
}

// Modal Product Add/Edit Controller
let currentEditingIndex = -1;

window.openAddProductModal = function() {
  currentEditingIndex = -1;
  document.getElementById('modal-title').innerText = "Thêm sản phẩm mới";
  document.getElementById('prod-form').reset();
  document.getElementById('admin-modal').classList.remove('hidden');
};

window.openEditStockModal = function(index) {
  currentEditingIndex = index;
  const p = adminProducts[index];
  document.getElementById('modal-title').innerText = "Sửa sản phẩm / Kho hàng";
  
  document.getElementById('prod-name').value = p.name;
  document.getElementById('prod-brand').value = p.brand;
  document.getElementById('prod-price').value = p.price;
  document.getElementById('prod-original-price').value = p.originalPrice || p.price;
  document.getElementById('prod-stock').value = p.stock;
  document.getElementById('prod-image').value = p.image;
  
  document.getElementById('admin-modal').classList.remove('hidden');
};

window.closeAdminModal = function() {
  document.getElementById('admin-modal').classList.add('hidden');
};

// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('prod-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('prod-name').value.trim();
      const brand = document.getElementById('prod-brand').value.trim();
      const price = parseInt(document.getElementById('prod-price').value) || 0;
      const originalPrice = parseInt(document.getElementById('prod-original-price').value) || price;
      const stock = parseInt(document.getElementById('prod-stock').value) || 0;
      let image = document.getElementById('prod-image').value.trim();

      if (!image) {
        image = "../images/placeholder.png"; // Fallback placeholder
      }

      if (currentEditingIndex > -1) {
        // Edit mode
        adminProducts[currentEditingIndex] = {
          ...adminProducts[currentEditingIndex],
          name,
          brand,
          price,
          originalPrice,
          stock,
          image
        };
        showAdminToast("Đã lưu chỉnh sửa sản phẩm thành công!");
      } else {
        // Add mode
        const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
        adminProducts.push({
          id: newId,
          name,
          brand,
          price,
          originalPrice,
          stock,
          image,
          rating: 5,
          specs: { ram: "8GB", storage: "256GB", battery: "5000 mAh", screen: "6.7 inch" },
          salesCount: 0,
          description: "Điện thoại thông minh cấu hình cao phân phối chính hãng bởi Quang Hưng Mobile."
        });
        showAdminToast("Đã tạo sản phẩm mới thành công!");
      }

      localStorage.setItem('quang_hung_products', JSON.stringify(adminProducts));
      closeAdminModal();
      renderProductManager();
      renderPerformanceProducts();
    });
  }

  // Bind key actions and load tables
  initFinancials();
  renderProductManager();
  renderOrderManager();
  renderPerformanceProducts();
});
