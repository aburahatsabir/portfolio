// FMCG ERP Case Study - Interactive Demo Logic

document.addEventListener('DOMContentLoaded', () => {
    // Terminal Simulation
    const terminalOutput = document.getElementById('terminal-output');

    // Safety check if element exists
    if (!terminalOutput) return;

    const logs = [
        { text: "> Initializing legacy_inventory_system.xlsx...", color: "#94a3b8", delay: 100 },
        { text: "> Loading Dealer Master (200+ records)...", color: "#60a5fa", delay: 800 },
        { text: "> Fetching SKU Price List (50+ items)...", color: "#e2e8f0", delay: 1500 },
        { text: "[WARNING] Manual price entry detected in Order #1247.", color: "#fbbf24", delay: 2200 },
        { text: "> Comparing against Master Price List...", color: "#94a3b8", delay: 2800 },
        { text: "[ERROR] Pricing Mismatch: Expected ৳145/kg, Found ৳132/kg.", color: "#ef4444", delay: 3200 },
        { text: "   Revenue Leakage: ৳1,820 on this order alone.", color: "#f87171", delay: 3300 },
        { text: "[CRITICAL] Dealer DLR-089 exceeds credit limit by ৳45,000.", color: "#ef4444", delay: 3800 },
        { text: "> Stock reconciliation pending for 48 hours.", color: "#fb923c", delay: 4200 },
        { text: "> LEDGER LAG DETECTED. Real-time visibility: OFFLINE.", color: "#fb923c", delay: 4500 },
        { text: "_", color: "#64748b", delay: 4600 }
    ];

    function typeWriter(text, element, color, speed = 20) {
        const line = document.createElement('div');
        line.style.color = color;
        line.style.marginBottom = '4px';
        line.style.fontFamily = "'JetBrains Mono', monospace";
        element.appendChild(line);

        let i = 0;
        function type() {
            if (i < text.length) {
                line.innerHTML += text.charAt(i);
                i++;
                element.scrollTop = element.scrollHeight;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const observerOptions = { threshold: 0.3 };
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                terminalOutput.innerHTML = '';
                let currentDelay = 0;
                logs.forEach(log => {
                    setTimeout(() => {
                        typeWriter(log.text, terminalOutput, log.color, 15);
                    }, currentDelay + log.delay);
                });
                terminalObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const problemSection = document.getElementById('problem');
    if (problemSection) {
        terminalObserver.observe(problemSection);
    }

    // Excel/Sheets Simulation
    let excelState = {
        isFixed: false,
        isValidated: false
    };

    const rowsData = [
        { id: 1, name: "Red Chili Powder 1kg", qty: 50, price: 145, status: "PENDING" },
        { id: 2, name: "Turmeric Powder 500g", qty: 100, price: 89, status: "PENDING" },
        { id: 3, name: "Cumin Seeds 250g", qty: 75, price: 132, status: "PENDING" },
        { id: 4, name: "Black Pepper 100g", qty: 200, price: 45, status: "PENDING" }
    ];

    function renderRows() {
        const container = document.getElementById('excel-rows');
        if (!container) return;

        container.innerHTML = '';

        rowsData.forEach((row, index) => {
            let priceError = false;
            if (row.id === 3 && !excelState.isFixed) {
                priceError = true; // Cumin Seeds has wrong price
            }

            let statusBadge = `<span class="cs-status-badge pending">PENDING</span>`;

            if (excelState.isValidated) {
                if (priceError) {
                    statusBadge = `<span class="cs-status-badge fail">ERROR</span>`;
                } else {
                    statusBadge = `<span class="cs-status-badge pass">VALID</span>`;
                }
            }

            const div = document.createElement('div');
            // Check if styles allow this class logic, keeping existing logic
            div.className = `cs-excel-row ${priceError && excelState.isValidated ? 'error' : ''}`;

            div.innerHTML = `
      <div>${index + 1}</div>
      <div style="display:flex; justify-content:center;">${statusBadge}</div>
      <div>${row.name}</div>
      <div>${row.qty} units</div>
      <div>
        ${excelState.isValidated && priceError && !excelState.isFixed ?
                    `<div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
             <span style="text-decoration: line-through; color: #ef4444;">৳${row.price}</span>
             <button id="fix-btn-${row.id}" class="cs-fix-btn">FIX → ৳142</button>
           </div>`
                    : `৳${excelState.isFixed && row.id === 3 ? 142 : row.price}`
                }
      </div>
    `;
            container.appendChild(div);

            // Add event listener for fix button if it exists
            const fixBtn = document.getElementById(`fix-btn-${row.id}`);
            if (fixBtn) {
                fixBtn.addEventListener('click', fixPrice);
            }
        });
    }

    window.runPricingCheck = function () {
        const overlay = document.getElementById('scanning-overlay');
        const tooltip = document.getElementById('demo-tooltip');

        if (overlay) overlay.classList.remove('hidden');
        if (tooltip) tooltip.style.opacity = '0';

        setTimeout(() => {
            if (overlay) overlay.classList.add('hidden');
            excelState.isValidated = true;
            renderRows();
            updateUI();
        }, 1200);
    }

    window.fixPrice = function () {
        excelState.isFixed = true;
        window.runPricingCheck();
    }

    function updateUI() {
        const publishBtn = document.getElementById('publishBtn');
        if (!publishBtn) return;

        if (excelState.isValidated && !excelState.isFixed) {
            // Error state - handled by badge in row
        } else if (excelState.isValidated && excelState.isFixed) {
            // Success state
            publishBtn.disabled = false;
            const span = publishBtn.querySelector('span');
            if (span) span.style.color = "#10b981";

            const lock = publishBtn.querySelector('.lock');
            if (lock) lock.style.display = "none";

            setTimeout(() => {
                const successOverlay = document.getElementById('success-overlay');
                if (successOverlay) successOverlay.classList.remove('hidden');
            }, 500);
        }
    }

    function generateChalan() {
        renderChalan();
        const chalanView = document.getElementById('chalan-view');
        const excelApp = document.getElementById('excel-app');

        if (chalanView) chalanView.classList.add('active');
        if (excelApp) excelApp.classList.add('chalan-mode');

        // Hide success overlay if it was open
        const successOverlay = document.getElementById('success-overlay');
        if (successOverlay) successOverlay.classList.add('hidden');
    }

    window.closeChalan = function () {
        const chalanView = document.getElementById('chalan-view');
        const excelApp = document.getElementById('excel-app');

        if (chalanView) chalanView.classList.remove('active');
        if (excelApp) excelApp.classList.remove('chalan-mode');
    }

    function renderChalan() {
        const tbody = document.getElementById('chalan-items');
        if (!tbody) return;

        tbody.innerHTML = '';

        let subtotal = 0;
        const date = new Date();

        // Update Meta
        const dateEl = document.getElementById('chalan-date');
        const timeEl = document.getElementById('chalan-time');

        if (dateEl) dateEl.innerText = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        if (timeEl) timeEl.innerText = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        rowsData.forEach((row, index) => {
            let finalPrice = row.price;
            if (row.id === 3) {
                finalPrice = excelState.isFixed ? 142 : 132;
            }

            const lineTotal = row.qty * finalPrice;
            subtotal += lineTotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${row.name}</td>
                <td class="num">${row.qty}</td>
                <td class="num">৳${finalPrice}</td>
                <td class="num"><strong>৳${lineTotal.toLocaleString()}</strong></td>
            `;
            tbody.appendChild(tr);
        });

        const subtotalEl = document.getElementById('chalan-subtotal');
        const totalEl = document.getElementById('chalan-total');

        if (subtotalEl) subtotalEl.innerText = `৳${subtotal.toLocaleString()}`;
        if (totalEl) totalEl.innerText = `৳${subtotal.toLocaleString()}`;
    }

    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) {
        publishBtn.addEventListener('click', generateChalan);
    }

    // Validate Button Logic
    const validateBtn = document.getElementById('validateBtn');
    if (validateBtn) {
        // Ensure the onClick in HTML doesn't conflict or use this listener instead
        // The HTML has onclick="runPricingCheck()", providing window.runPricingCheck handles it.
    }

    // Reset Logic
    window.resetDemo = function () {
        excelState = { isFixed: false, isValidated: false };
        renderRows();

        // Reset Button
        const pBtn = document.getElementById('publishBtn');
        if (pBtn) {
            pBtn.disabled = true;
            const span = pBtn.querySelector('span');
            if (span) span.style.color = "#64748b";
            const lock = pBtn.querySelector('.lock');
            if (lock) lock.style.display = "inline-block";
        }

        // Reset visibility states
        const rows = document.getElementById('excel-rows');
        if (rows) {
            rows.style.display = 'grid';
            rows.style.opacity = '1';
        }

        const successOverlay = document.getElementById('success-overlay');
        if (successOverlay) successOverlay.classList.add('hidden');

        const scanningOverlay = document.getElementById('scanning-overlay');
        if (scanningOverlay) scanningOverlay.classList.add('hidden');

        closeChalan();
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeChalan();
    });

    // Initial render
    renderRows();
});
