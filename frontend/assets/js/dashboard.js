const API_BASE = "http://127.0.0.1:8000";

// ================= ALLOCATION PIE CHART =================
function loadAllocationChart() {
  const ctx = document.getElementById("allocChart");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Solar", "Wind", "EV", "Cash"],
      datasets: [
        {
          data: [42, 28, 20, 10],
          backgroundColor: ["#34d399", "#60a5fa", "#f472b6", "#fbbf24"],
          borderWidth: 0
        }
      ]
    },
    options: { plugins: { legend: { labels: { color: "#ccc" } } } }
  });
}

// ================= PERFORMANCE LINE CHART =================
function loadPerformanceChart() {
  const ctx = document.getElementById("perfChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Portfolio",
          data: [100, 105, 103, 110, 115],
          borderColor: "#4ade80",
          tension: 0.4
        }
      ]
    },
    options: { plugins: { legend: { display: false } } }
  });
}

// ================= QUANTUM ENGINE RESULT =================
async function loadQuantumOptimizer() {
  const res = await fetch(`${API_BASE}/quantum/optimize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      assets: ["Hydrogen", "Solar", "Wind"],
      covariance: [[0.1,0.02,0.03],[0.02,0.12,0.04],[0.03,0.04,0.14]]
    })
  });

  const json = await res.json();

  document.getElementById("quantumResult").innerHTML = `
    <div class="font-semibold text-lg">${json.optimized.allocation_label}</div>
    <div>Hydrogen: ${json.optimized.hydrogen}</div>
    <div>Solar: ${json.optimized.solar}</div>
    <div>Wind: ${json.optimized.wind}</div>
    <div class="text-xs mt-2 text-gray-400">${json.timestamp}</div>
  `;
}

// ================= OPPORTUNITIES =================
async function loadOpportunities() {
  const res = await fetch(`${API_BASE}/opportunities/`);
  const json = await res.json();

  const box = document.getElementById("oppList");
  box.innerHTML = "";

  json.opportunities.forEach(op => {
    box.innerHTML += `
      <div class="p-3 bg-[#0f1724] rounded border border-gray-700">
        <div class="font-semibold text-green-400">${op.symbol} — ${op.action}</div>
        <div class="text-xs text-gray-400">Confidence: ${op.confidence}</div>
      </div>
    `;
  });
}

// ================= AI INSIGHTS =================
async function loadInsights() {
  const res = await fetch(`${API_BASE}/pulsescore/`);
  const json = await res.json();

  const box = document.getElementById("insightsList");
  box.innerHTML = `
    <div class="p-3 bg-[#0f1724] rounded border border-gray-700">
      <div class="font-semibold text-lg">${json.sentiment_label} (${json.sentiment_score}%)</div>
      <div class="text-xs text-gray-400">Momentum: ${json.momentum.toFixed(2)}</div>
    </div>
  `;
}


// ================= REFRESH LOOP =================
function refreshDashboard() {
  loadOpportunities();
  loadInsights();
  loadQuantumOptimizer();
}

window.onload = () => {
  loadAllocationChart();
  loadPerformanceChart();
  refreshDashboard();
  setInterval(refreshDashboard, 8000); // auto-refresh
};
