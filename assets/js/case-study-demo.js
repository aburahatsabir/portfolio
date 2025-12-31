/**
 * Case Study Demo - Finance Close Control System
 * Interactive terminal and Excel simulation
 */

(function () {
    'use strict';

    // Terminal Simulation
    const terminalOutput = document.getElementById('terminal-output');

    if (terminalOutput) {
        const logs = [
            { text: "> Initializing monthly_close_v2_final_REAL.xlsx...", color: "#94a3b8", delay: 100 },
            { text: "> Connecting to SQL_Data_Warehouse...", color: "#60a5fa", delay: 800 },
            { text: "> Fetching Trial Balance (Entities: US, UK, CAN)...", color: "#e2e8f0", delay: 1500 },
            { text: "[WARNING] Cell F42: String detected in numeric field.", color: "#fbbf24", delay: 2200 },
            { text: "> Attempting auto-correction...", color: "#94a3b8", delay: 2800 },
            { text: "[ERROR] Correction Failed. Data Type Mismatch.", color: "#ef4444", delay: 3200 },
            { text: "> Recalculating variance analysis...", color: "#e2e8f0", delay: 3800 },
            { text: "[CRITICAL] AP Subledger does not tie to GL.", color: "#ef4444", delay: 4200 },
            { text: "   Diff: $1,402.50", color: "#f87171", delay: 4300 },
            { text: "> SYSTEM LOCK ENGAGED. Export disabled.", color: "#fb923c", delay: 4500 },
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
    }

    // Excel Simulation
    let excelState = {
        isFixed: false,
        isValidated: false
    };

    const rowsData = [
        { id: 1, name: "Bank Rec: Operating", valA: 45000, valB: 45000, status: "PASS" },
        { id: 2, name: "AP Subledger Tie-out", valA: 12500, valB: 11097.50, status: "FAIL" },
        { id: 3, name: "Payroll Accrual", valA: 8200, valB: 8200, status: "PASS" },
        { id: 4, name: "Fixed Asset Roll", valA: 34000, valB: 34000, status: "PASS" }
    ];

    function renderRows() {
        const container = document.getElementById('excel-rows');
        if (!container) return;

        container.innerHTML = '';

        rowsData.forEach((row, index) => {
            let variance = row.valA - row.valB;
            if (excelState.isFixed && row.id === 2) variance = 0;

            const isError = variance !== 0;
            let statusBadge = `<span class="cs-status-badge pending">PENDING</span>`;

            if (excelState.isValidated) {
                if (isError) {
                    statusBadge = `<span class="cs-status-badge fail">LOCKED</span>`;
                } else {
                    statusBadge = `<span class="cs-status-badge pass">PASS</span>`;
                }
            }

            const div = document.createElement('div');
            div.className = `cs-excel-row ${isError && excelState.isValidated ? 'error' : ''}`;

            div.innerHTML = `
        <div>${index + 1}</div>
        <div>${row.name}</div>
        <div>
          ${excelState.isValidated && row.id === 2 && !excelState.isFixed ?
                    `<div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
               <span>${variance.toFixed(2)}</span>
               <button onclick="window.fixVariance()" class="cs-fix-btn">FIX</button>
             </div>`
                    : variance.toFixed(2)
                }
        </div>
        <div>${statusBadge}</div>
      `;
            container.appendChild(div);
        });
    }

    function runValidation() {
        const overlay = document.getElementById('scanning-overlay');
        const tooltip = document.getElementById('demo-tooltip');

        if (overlay) {
            overlay.classList.remove('hidden');
        }
        if (tooltip) {
            tooltip.style.opacity = '0';
        }

        setTimeout(() => {
            if (overlay) {
                overlay.classList.add('hidden');
            }
            excelState.isValidated = true;
            renderRows();
            updateUI();
        }, 1000);
    }

    function fixVariance() {
        excelState.isFixed = true;
        runValidation();
    }

    function updateUI() {
        const statusText = document.getElementById('status-text');
        const gateStatus = document.getElementById('gate-status');
        const publishBtn = document.getElementById('publishBtn');

        if (!statusText || !gateStatus || !publishBtn) return;

        if (excelState.isValidated && !excelState.isFixed) {
            statusText.innerText = "CRITICAL: Variance Detected. Logic Gate Locked.";
            statusText.style.color = "#fecaca";
            statusText.style.fontWeight = "700";
            gateStatus.innerText = "GATE: LOCKED";
            gateStatus.style.color = "#fca5a5";
        } else if (excelState.isValidated && excelState.isFixed) {
            statusText.innerText = "Validation Complete. All checks passed.";
            statusText.style.color = "rgba(255,255,255,0.8)";
            statusText.style.fontWeight = "400";
            gateStatus.innerText = "GATE: OPEN";
            gateStatus.style.color = "#86efac";

            publishBtn.disabled = false;
            publishBtn.style.background = "white";
            publishBtn.style.borderColor = "#86efac";
            publishBtn.innerHTML = `
        <div style="position: relative;">
          <i class="fa-solid fa-file-pdf" style="color: #16a34a;" aria-hidden="true"></i>
          <i class="fa-solid fa-check" style="position: absolute; bottom: -4px; right: -4px; background: #16a34a; color: white; font-size: 8px; border-radius: 50%; padding: 2px;" aria-hidden="true"></i>
        </div>
        <span style="color: #16a34a; font-weight: 700;">Publish</span>
      `;
            publishBtn.onclick = showSuccess;
        }
    }

    function showSuccess() {
        const successOverlay = document.getElementById('success-overlay');
        if (successOverlay) {
            successOverlay.classList.remove('hidden');
        }
    }

    function resetDemo() {
        excelState = { isFixed: false, isValidated: false };

        const successOverlay = document.getElementById('success-overlay');
        if (successOverlay) {
            successOverlay.classList.add('hidden');
        }

        const publishBtn = document.getElementById('publishBtn');
        if (publishBtn) {
            publishBtn.disabled = true;
            publishBtn.onclick = null;
            publishBtn.style.background = "#f1f5f9";
            publishBtn.style.borderColor = "#e2e8f0";
            publishBtn.innerHTML = `
        <i class="fa-solid fa-file-pdf" style="color: #dc2626;" aria-hidden="true"></i>
        <span style="color: #64748b;">Publish PDF</span>
        <i class="fa-solid fa-lock lock" aria-hidden="true"></i>
      `;
        }

        const statusText = document.getElementById('status-text');
        if (statusText) {
            statusText.innerText = "Ready";
            statusText.style.color = "rgba(255,255,255,0.8)";
            statusText.style.fontWeight = "400";
        }

        const gateStatus = document.getElementById('gate-status');
        if (gateStatus) {
            gateStatus.innerText = "GATE: PENDING";
            gateStatus.style.color = "white";
        }

        const tooltip = document.getElementById('demo-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
        }

        renderRows();
    }

    // Expose functions globally for onclick handlers
    window.runValidation = runValidation;
    window.fixVariance = fixVariance;
    window.resetDemo = resetDemo;

    // Initialize
    if (document.getElementById('excel-rows')) {
        renderRows();
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => scrollObserver.observe(el));
})();
