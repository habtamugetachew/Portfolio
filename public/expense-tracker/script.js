const translations = {
  en: {
    app_title: "ExpenseTracker",
    total_balance: "Total Balance",
    clear_all: "Clear All Data",
    income: "Income",
    expense: "Expense",
    spending_overview: "Spending Overview",
    add_transaction: "Add Transaction",
    description: "Description",
    amount: "Amount",
    category: "Category",
    cat_income: "Income (Salary/Other)",
    cat_food: "Food & Dining",
    cat_transport: "Transportation",
    cat_shopping: "Shopping",
    cat_entertainment: "Entertainment",
    cat_bills: "Bills & Utilities",
    cat_other: "Other Expense",
    add_transaction_btn: "Add Transaction",
    recent_transactions: "Recent Transactions",
    no_transactions: "No transactions yet. Add one to get started!",
    placeholder_desc: "e.g. Salary, Groceries...",
    placeholder_amount: "Enter amount (just the number)..."
  },
  am: {
    app_title: "የሂሳብ ማስታወሻ",
    total_balance: "አጠቃላይ ቀሪ ሂሳብ",
    clear_all: "ሁሉንም አጥፋ",
    income: "ገቢ",
    expense: "ወጪ",
    spending_overview: "የወጪ ገበታ",
    add_transaction: "አዲስ ይመዝገቡ",
    description: "ማብራሪያ",
    amount: "መጠን",
    category: "ምድብ",
    cat_income: "ገቢ (ደሞዝ/ሌላ)",
    cat_food: "ምግብ",
    cat_transport: "ትራንስፖርት",
    cat_shopping: "ግብይት",
    cat_entertainment: "መዝናኛ",
    cat_bills: "ሂሳቦች",
    cat_other: "ሌሎች ወጪዎች",
    add_transaction_btn: "አስገባ",
    recent_transactions: "የቅርብ ጊዜ ታሪኮች",
    no_transactions: "እስካሁን ምንም አልተመዘገበም።",
    placeholder_desc: "ለምሳሌ ደሞዝ፣ ምግብ...",
    placeholder_amount: "መጠኑን ያስገቡ (በቁጥር ብቻ)..."
  }
};

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');

// Retrieve from local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Currency Setup
let currentCurrency = localStorage.getItem('currency') || '$';
const currencySelector = document.getElementById('currency-selector');

if (currencySelector) {
  currencySelector.value = currentCurrency;
  currencySelector.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    localStorage.setItem('currency', currentCurrency);
    init(); // re-render the list and values
  });
}

// Language Setup
let currentLang = localStorage.getItem('lang') || 'en';
const langSelector = document.getElementById('language-selector');

function applyLanguage(lang) {
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  if (transactions.length === 0) {
    list.innerHTML = `<div class="empty-state">${dict.no_transactions}</div>`;
  }
}

if (langSelector) {
  langSelector.value = currentLang;
  langSelector.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
    init();
  });
}

// Theme Setup
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggleBtn.innerHTML = '<i class="fa-solid fa-lightbulb" style="color: #fbbf24; filter: drop-shadow(0 0 8px #fbbf24);"></i>';
} else {
  themeToggleBtn.innerHTML = '<i class="fa-regular fa-lightbulb"></i>';
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  let theme = 'dark';
  if (document.body.classList.contains('light-mode')) {
    theme = 'light';
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-lightbulb" style="color: #fbbf24; filter: drop-shadow(0 0 8px #fbbf24);"></i>';
  } else {
    themeToggleBtn.innerHTML = '<i class="fa-regular fa-lightbulb"></i>';
  }
  localStorage.setItem('theme', theme);
  if (expenseChart) updateChart(); // re-render chart to fit theme if needed
});

// Filtering State
let activeFilter = null;
const filterBadge = document.getElementById('filter-badge');

if (filterBadge) {
  filterBadge.addEventListener('click', () => {
    activeFilter = null;
    init();
  });
}

// Custom Select Logic
const customSelect = document.getElementById('custom-category-select');
const customOptions = document.querySelectorAll('.custom-option');
const categoryInput = document.getElementById('category');
const customCategoryText = document.getElementById('custom-category-text');

if (customSelect) {
  customSelect.querySelector('.custom-select-trigger').addEventListener('click', function (e) {
    e.stopPropagation();
    customSelect.classList.toggle('open');
  });

  customOptions.forEach(option => {
    option.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!this.classList.contains('selected')) {
        const val = this.getAttribute('data-value');
        categoryInput.value = val;

        customSelect.querySelector('.custom-option.selected').classList.remove('selected');
        this.classList.add('selected');

        customCategoryText.textContent = this.textContent;
        customCategoryText.setAttribute('data-i18n', this.getAttribute('data-i18n'));
      }
      customSelect.classList.remove('open');
    });
  });

  window.addEventListener('click', function (e) {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove('open');
    }
  });
}

// Chart.js Setup
let expenseChart;
const ctx = document.getElementById('expenseChart').getContext('2d');

const categoryColors = {
  Food: '#f43f5e',       // Rose
  Transport: '#f59e0b',  // Amber
  Shopping: '#8b5cf6',   // Violet
  Entertainment: '#ec4899', // Pink
  Bills: '#06b6d4',      // Cyan
  Other: '#94a3b8'       // Slate
};

function initChart() {
  expenseChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (e, activeElements) => {
        if (activeElements.length > 0) {
          const dataIndex = activeElements[0].index;
          const clickedCategory = expenseChart.data.labels[dataIndex];
          if (activeFilter === clickedCategory) {
            activeFilter = null; // Toggle off
          } else {
            activeFilter = clickedCategory; // Set filter
          }
          init();
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#94a3b8',
            font: {
              family: 'Inter',
              size: 11
            },
            padding: 20
          }
        }
      },
      cutout: '75%'
    }
  });
}

function updateChart() {
  const expenses = transactions.filter(t => t.amount < 0);

  if (expenses.length === 0) {
    expenseChart.data.labels = ['No Expenses Yet'];
    expenseChart.data.datasets[0].data = [1];
    expenseChart.data.datasets[0].backgroundColor = ['rgba(255, 255, 255, 0.05)'];
  } else {
    const categoryTotals = {};
    const dict = translations[currentLang];

    expenses.forEach(expense => {
      let catText = dict.cat_other;
      switch (expense.category) {
        case 'Food': catText = dict.cat_food; break;
        case 'Transport': catText = dict.cat_transport; break;
        case 'Shopping': catText = dict.cat_shopping; break;
        case 'Entertainment': catText = dict.cat_entertainment; break;
        case 'Bills': catText = dict.cat_bills; break;
        case 'Other': catText = dict.cat_other; break;
        default: catText = expense.category;
      }
      categoryTotals[catText] = (categoryTotals[catText] || 0) + Math.abs(expense.amount);
    });

    expenseChart.data.labels = Object.keys(categoryTotals);
    expenseChart.data.datasets[0].data = Object.values(categoryTotals);
    expenseChart.data.datasets[0].backgroundColor = Object.keys(categoryTotals).map(cat => categoryColors[expenseChart.data.labels.indexOf(cat)] || '#6366f1');

    // We map colors statically to give consistent coloring
    const allColors = Object.values(categoryColors);
    expenseChart.data.datasets[0].backgroundColor = Object.keys(categoryTotals).map((_, i) => allColors[i % allColors.length]);
  }

  expenseChart.update();
}

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a description and amount');
  } else {
    // Make amount absolute first
    let finalAmount = Math.abs(+amount.value);

    // Make it negative if it's an expense category
    if (category.value !== 'Income') {
      finalAmount = -finalAmount;
    }

    const transaction = {
      id: generateID(),
      text: text.value,
      amount: finalAmount,
      category: category.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    updateChart();

    text.value = '';
    amount.value = '';
    category.value = 'Income';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}



function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  const dict = translations[currentLang];
  let catText = dict.cat_other;
  switch (transaction.category) {
    case 'Income': catText = dict.cat_income; break;
    case 'Food': catText = dict.cat_food; break;
    case 'Transport': catText = dict.cat_transport; break;
    case 'Shopping': catText = dict.cat_shopping; break;
    case 'Entertainment': catText = dict.cat_entertainment; break;
    case 'Bills': catText = dict.cat_bills; break;
    case 'Other': catText = dict.cat_other; break;
    default: catText = transaction.category;
  }

  item.innerHTML = `
    <div class="list-item-info">
      <span class="item-desc">${transaction.text}</span>
      ${transaction.amount < 0 ? `<span class="item-cat">${catText}</span>` : `<span class="item-cat">${dict.income}</span>`}
    </div>
    <div class="item-amount">
      <span>${sign}${currentCurrency}${Math.abs(transaction.amount).toFixed(2)}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})"><i class="fa-solid fa-trash"></i></button>
    </div>
  `;

  list.appendChild(item);
}

function animateValue(obj, start, end, duration, prefix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentVal = (progress * (end - start) + start).toFixed(2);

    obj.innerText = `${prefix}${currentCurrency}${currentVal}`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerText = `${prefix}${currentCurrency}${end.toFixed(2)}`;
    }
  };
  window.requestAnimationFrame(step);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
  const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;

  animateValue(balance, 0, total, 1000, '');
  animateValue(money_plus, 0, income, 1000, '+');
  animateValue(money_minus, 0, expense, 1000, '-');
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();
  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  let displayTransactions = transactions;
  const dict = translations[currentLang];

  if (activeFilter) {
    displayTransactions = transactions.filter(t => {
      if (t.amount > 0) return false;
      let catText = dict.cat_other;
      switch (t.category) {
        case 'Food': catText = dict.cat_food; break;
        case 'Transport': catText = dict.cat_transport; break;
        case 'Shopping': catText = dict.cat_shopping; break;
        case 'Entertainment': catText = dict.cat_entertainment; break;
        case 'Bills': catText = dict.cat_bills; break;
        case 'Other': catText = dict.cat_other; break;
        default: catText = t.category;
      }
      return catText === activeFilter;
    });
    if (filterBadge) {
      filterBadge.style.display = 'inline-flex';
      filterBadge.innerHTML = `${activeFilter} <i class="fa-solid fa-xmark"></i>`;
    }
  } else {
    if (filterBadge) filterBadge.style.display = 'none';
  }

  if (displayTransactions.length === 0) {
    list.innerHTML = `<div class="empty-state">${dict.no_transactions}</div>`;
  } else {
    displayTransactions.forEach(addTransactionDOM);
  }

  updateValues();

  if (!expenseChart) {
    initChart();
  }
  updateChart();
  applyLanguage(currentLang);
}

init();
form.addEventListener('submit', addTransaction);

// Dropdown Logic
const menuBtn = document.getElementById('balance-menu-btn');
const clearAllBtn = document.getElementById('clear-all-btn');

if (menuBtn) {
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuBtn.parentElement.classList.toggle('show');
  });

  window.addEventListener('click', () => {
    menuBtn.parentElement.classList.remove('show');
  });
}

if (clearAllBtn) {
  clearAllBtn.addEventListener('click', () => {
    if (confirm(currentLang === 'am' ? "ሁሉንም ታሪኮች ማጥፋት ይፈልጋሉ?" : "Are you sure you want to clear all transactions?")) {
      transactions = [];
      updateLocalStorage();
      init();
    }
  });
}
