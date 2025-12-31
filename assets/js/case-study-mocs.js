// Medical Ops Control System Case Study - Interactive Demo Logic

document.addEventListener('DOMContentLoaded', () => {
    // Terminal Simulation (OPTIONAL - only runs if element exists)
    const terminalOutput = document.getElementById('terminal-output');

    // Only run terminal animation if the element exists
    if (terminalOutput) {
        const logs = [
            { text: "> Loading Active Patient Pipeline (3,100+ cases)...", color: "#60a5fa", delay: 100 },
            { text: "> Validating required fields: Handler, VisaStatus, NextFollowUp...", color: "#94a3b8", delay: 800 },
            { text: "[WARNING] PT-4092: NextFollowUp missing for ACTIVE case.", color: "#fbbf24", delay: 1600 },
            { text: "[ERROR] PT-4092: VisaStatus = EXPIRED. Travel authorization blocked.", color: "#ef4444", delay: 2400 },
            { text: "[CRITICAL] RateCard: Commission rule missing for HospitalID=APOLLO_CHN.", color: "#f87171", delay: 3200 },
            { text: "> Routing 2 issues to Manual Review Queue...", color: "#fb923c", delay: 4000 },
            { text: "> SYSTEM READY: 98% cases validated, 2% flagged.", color: "#4ade80", delay: 4800 },
            { text: "_", color: "#64748b", delay: 5000 }
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

    // Excel/Sheets Simulation
    let excelState = {
        isFixed: false,
        isValidated: false
    };

    // Data: Patient ID, Name, Visa Status, Hospital, Bill/Comm
    const rowsData = [
        { id: 1, name: "Ahmed, S. (PT-4090)", visa: "APPROVED", hospital: "Apollo Main", bill: 12500, status: "PENDING" },
        { id: 2, name: "Rahman, K. (PT-4091)", visa: "APPROVED", hospital: "Fortis BLR", bill: 8500, status: "PENDING" },
        { id: 3, name: "Khan, M. (PT-4092)", visa: "EXPIRED", hospital: "Max Saket", bill: 22000, status: "PENDING" },
        { id: 4, name: "Uddin, J. (PT-4093)", visa: "APPROVED", hospital: "Artemis GGN", bill: 15000, status: "PENDING" },
        { id: 5, name: "Mehta, A. (PT-4094)", visa: "APPROVED", hospital: "Manipal DEL", bill: 18200, status: "PENDING" },
        { id: 6, name: "Silva, L. (PT-4095)", visa: "APPROVED", hospital: "Apollo HYD", bill: 9800, status: "PENDING" }
    ];

    function renderRows() {
        const container = document.getElementById('excel-rows');
        console.log('renderRows called');
        console.log('container:', container);
        console.log('rowsData:', rowsData);

        if (!container) {
            console.error('ERROR: excel-rows container not found!');
            return;
        }

        container.innerHTML = '';

        rowsData.forEach((row, index) => {
            let visaError = false;
            // Row 3 (Index 2) has the error
            if (row.id === 3 && !excelState.isFixed) {
                visaError = true;
            }

            let statusBadge = `<span class="cs-status-badge pending">PENDING</span>`;

            if (excelState.isValidated) {
                if (visaError) {
                    statusBadge = `<span class="cs-status-badge fail">BLOCKED</span>`;
                } else {
                    statusBadge = `<span class="cs-status-badge pass">READY</span>`;
                }
            }

            const div = document.createElement('div');
            // Check if styles allow this class logic
            div.className = `cs-excel-row ${visaError && excelState.isValidated ? 'error' : ''}`;

            // Columns: #, Status, Patient, Visa, Estimated Bill
            div.innerHTML = `
      <div>${index + 1}</div>
      <div style="display:flex; justify-content:center;">${statusBadge}</div>
      <div class="truncate" title="${row.name}">${row.name}</div>
      <div>
         ${excelState.isValidated && visaError && !excelState.isFixed ?
                    `<div style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">
             <span style="color: #ef4444; font-size: 11px; font-weight:700;">EXPIRED</span>
             <button id="fix-btn-${row.id}" class="cs-fix-btn">RENEW</button>
           </div>`
                    : `<span class="${excelState.isFixed && row.id === 3 ? 'cs-text-success font-bold' : ''}">${excelState.isFixed && row.id === 3 ? 'APPROVED' : row.visa}</span>`
                }
      </div>
      <div>
        ৳${row.bill.toLocaleString()}
      </div>
    `;
            container.appendChild(div);
            console.log('Row added:', row.name);

            // Add event listener for fix button if it exists
            const fixBtn = document.getElementById(`fix-btn-${row.id}`);
            if (fixBtn) {
                fixBtn.addEventListener('click', fixVisa);
            }
        });

        console.log('renderRows completed. Total rows added:', rowsData.length);
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

    window.fixVisa = function () {
        excelState.isFixed = true;
        window.runPricingCheck();
    }

    function updateUI() {
        const publishBtn = document.getElementById('publishBtn');
        if (!publishBtn) return;

        if (excelState.isValidated && !excelState.isFixed) {
            // Error state
        } else if (excelState.isValidated && excelState.isFixed) {
            // Success state
            publishBtn.disabled = false;
            const span = publishBtn.querySelector('span');
            // Change button text to "Approve Travel"
            if (span) {
                span.innerHTML = "Approve Travel";
                span.style.color = "#10b981";
            }

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
        // Renaming "Chalan" to "Travel Permit" logic visually
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

        // NOTE: We only show the active patient (PT-4092) or all? 
        // Let's show all approved for the batch trigger

        rowsData.forEach((row, index) => {
            // Update the one we fixed
            let visaText = row.visa;
            // Removed unused statusClass

            if (row.id === 3) {
                visaText = excelState.isFixed ? "APPROVED" : "EXPIRED";
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${row.name}</td>
                <td style="text-align: right;">${row.hospital}</td>
                <td style="text-align: right;">${visaText}</td>
                <td style="text-align: right; font-weight: bold;" class="cs-text-success">READY</td>
            `;
            tbody.appendChild(tr);
        });

        // Hide money totals for Travel Permit, or show Commission?
        // Let's hide subtotal for this view or repurpose elements
        const subtotalEl = document.getElementById('chalan-subtotal');
        const totalEl = document.getElementById('chalan-total');

        if (subtotalEl) subtotalEl.parentElement.style.display = 'none'; // Hide subtotal

        // Use Total for "Total Patients"
        if (totalEl) {
            totalEl.parentElement.querySelector('span:first-child').innerText = "Total Approved:";
            totalEl.innerText = `${rowsData.length} Patients`;
        }
    }

    const publishBtn = document.getElementById('publishBtn');
    if (publishBtn) {
        publishBtn.addEventListener('click', generateChalan);
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
            if (span) {
                span.innerHTML = "Approve Travel";
                span.style.color = "#64748b";
            }
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

    // ----------------------------------------------------
    // DASHBOARD ANIMATIONS
    // ----------------------------------------------------
    const dashboardSection = document.getElementById('impact-dashboard');
    if (dashboardSection) {
        const observerOptions = { threshold: 0.25 }; // Trigger when 25% visible
        const dashboardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    // 1. Animate Timeline Progress
                    const timelineProg = entry.target.querySelector('.timeline-progress');
                    if (timelineProg) timelineProg.style.width = '100%';

                    // 2. Animate Bar Chart (Height)
                    const bar = entry.target.querySelector('.chart-bar-animate');
                    if (bar) bar.style.height = '60px'; // Target height

                    const label = entry.target.querySelector('.chart-label-animate');
                    if (label) label.style.opacity = '1';

                    // 3. Animate Count Ups (0 -> N)
                    const countUps = entry.target.querySelectorAll('.count-up-animate');
                    countUps.forEach(counter => {
                        const target = +counter.getAttribute('data-end');
                        const duration = 2000; // ms
                        const frameDuration = 1000 / 60;
                        const totalFrames = Math.round(duration / frameDuration);
                        const easeOutQuad = t => t * (2 - t);
                        let frame = 0;

                        const count = () => {
                            frame++;
                            const progress = easeOutQuad(frame / totalFrames);
                            const currentCount = Math.round(target * progress);

                            if (target > 1000) {
                                counter.textContent = currentCount.toLocaleString(); // Format 3,100
                            } else {
                                counter.textContent = currentCount;
                            }

                            if (frame < totalFrames) {
                                requestAnimationFrame(count);
                            } else {
                                counter.textContent = target > 1000 ? target.toLocaleString() : target;
                            }
                        };
                        count();
                    });

                    // 4. Animate Count Down (15 -> 0)
                    const countDowns = entry.target.querySelectorAll('.count-down-animate');
                    countDowns.forEach(counter => {
                        const start = +counter.getAttribute('data-start');
                        const end = +counter.getAttribute('data-end'); // Should be 0
                        const duration = 2000;
                        const frameDuration = 1000 / 60;
                        const totalFrames = Math.round(duration / frameDuration);
                        const easeOutQuad = t => t * (2 - t);
                        let frame = 0;

                        const count = () => {
                            frame++;
                            const progress = easeOutQuad(frame / totalFrames);
                            const currentDiff = Math.round((start - end) * progress);
                            counter.textContent = start - currentDiff;

                            if (frame < totalFrames) {
                                requestAnimationFrame(count);
                            } else {
                                counter.textContent = end;
                            }
                        };
                        count();
                    });

                    dashboardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        dashboardObserver.observe(dashboardSection);
    }

    // Initial render
    renderRows();
});
