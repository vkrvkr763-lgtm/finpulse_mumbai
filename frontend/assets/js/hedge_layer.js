const API_BASE = "http://127.0.0.1:8000";

// Load suggestions
async function loadHedgeSuggestions() {
  const portfolio = [
    { symbol: "SolarTech", weight: 40 },
    { symbol: "WindCorp", weight: 30 },
    { symbol: "EVIndex", weight: 20 },
    { symbol: "Cash", weight: 10 }
  ];

  try {
    const res = await fetch(`${API_BASE}/hedge/suggest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(portfolio)
    });
    const json = await res.json();

    const container = document.getElementById("hedgeSuggestions");
    container.innerHTML = "";

    json.suggestions.forEach(s => {
      const el = document.createElement("div");
      el.className = "p-3 bg-[#0f1724] rounded-lg border border-gray-700";
      el.innerHTML = `<div class="font-bold text-white">${s.instrument}</div>
                      <div class="text-sm text-gray-300">${s.purpose}</div>
                      <div class="text-xs text-gray-400">Drawdown ↓ ${s.impact_estimated_drawdown_reduction_pct}% | Cost ${s.cost_bps} bps</div>
                      <div class="mt-2 flex gap-2">
                        <button class="apply-hedge px-3 py-1 bg-green-600 text-white rounded">Apply</button>
                        <button class="ignore-hedge px-3 py-1 bg-gray-600 text-white rounded">Ignore</button>
                      </div>`;
      container.appendChild(el);

      el.querySelector(".apply-hedge").addEventListener("click", async () => {
        alert(`Applied ${s.instrument} (demo).`);
      });

      el.querySelector(".ignore-hedge").addEventListener("click", () => {
        el.remove();
      });
    });

    // render drawdown chart sample based on suggestions
    buildDrawdownChart(json.suggestions);
  } catch (err) {
    console.error("Hedge error", err);
  }
}

// Drawdown chart
function buildDrawdownChart(suggestions) {
  const ctx = document.getElementById("drawdownChart").getContext("2d");

  // before/after series demo values
  const before = [0, -8, -15, -20, -18, -12];
  const after = before.map(v => v * (1 - (Math.min(0.25, suggestions.length * 0.08))));

  if (window.drawChart) window.drawChart.destroy();
  window.drawChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["T-5","T-4","T-3","T-2","T-1","T0"],
      datasets: [
        { label: "Before", data: before, borderColor: "#ef4444", fill: false, tension: 0.3 },
        { label: "After (with hedges)", data: after, borderColor: "#10b981", fill: false, tension: 0.3 }
      ]
    },
    options: { plugins: { legend: { position: 'bottom' } } }
  });
}

document.getElementById("buildHedge").addEventListener("click", async () => {
  const eq = Number(document.getElementById("equityExposure").value || 70);
  // build minimal portfolio for the API
  const portfolio = [
    { symbol: "TotalEquity", weight: eq },
    { symbol: "Others", weight: 100 - eq }
  ];

  const res = await fetch(`${API_BASE}/hedge/suggest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(portfolio)
  });
  const json = await res.json();
  // display results
  const container = document.getElementById("hedgeSuggestions");
  container.innerHTML = "";
  json.suggestions.forEach(s => {
    const el = document.createElement("div");
    el.className = "p-3 bg-[#0f1724] rounded-lg border border-gray-700 mb-2";
    el.innerHTML = `<div class="font-bold">${s.instrument}</div>
                    <div class="text-xs text-gray-300">${s.purpose}</div>
                    <div class="text-xs text-gray-400">Drawdown ↓ ${s.impact_estimated_drawdown_reduction_pct}% | Cost ${s.cost_bps} bps</div>`;
    container.appendChild(el);
  });

  buildDrawdownChart(json.suggestions);
});

// init
loadHedgeSuggestions();
