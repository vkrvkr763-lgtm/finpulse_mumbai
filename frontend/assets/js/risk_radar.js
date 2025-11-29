const API_BASE = "http://127.0.0.1:8000";

// Render heatmap tiles
async function loadRiskHeatmap() {
  // sample portfolio payload (in future use real holdings)
  const portfolio = [
    { symbol: "SolarTech", weight: 40 },
    { symbol: "WindCorp", weight: 30 },
    { symbol: "EVIndex", weight: 20 },
    { symbol: "Cash", weight: 10 }
  ];

  try {
    const res = await fetch(`${API_BASE}/risk-radar/heatmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(portfolio)
    });
    const json = await res.json();
    const box = document.getElementById("heatmapContainer");
    box.innerHTML = "";

    json.clusters.forEach(c => {
      const tile = document.createElement("div");
      tile.className = "p-3 rounded-lg text-black text-sm";
      tile.style.width = "160px";
      tile.style.height = "80px";

      let color = c.status === "low" ? "#10b981" : (c.status === "medium" ? "#f59e0b" : "#ef4444");
      tile.style.background = color;

      tile.innerHTML = `<div class="font-bold">${c.symbol}</div>
                        <div class="text-xs">Vol ${c.volatility}</div>
                        <div class="text-xs">W ${c.weight}%</div>`;

      box.appendChild(tile);
    });

    // Build top volatility list
    const volList = document.getElementById("volList");
    volList.innerHTML = "";
    const sorted = [...json.clusters].sort((a,b) => b.volatility - a.volatility).slice(0,5);
    sorted.forEach(s => {
      const el = document.createElement("div");
      el.className = "mb-3 p-3 bg-[#0f1724] rounded-lg border border-gray-700";
      el.innerHTML = `<div class="font-semibold text-white">${s.symbol}</div>
                      <div class="text-xs text-gray-300">Volatility: ${s.volatility}</div>
                      <div class="text-xs text-gray-400">Weight: ${s.weight}%</div>`;
      volList.appendChild(el);
    });

    // Simple correlation matrix demo (randomized for visualization)
    buildCorrelationMatrix(json.clusters.map(c=>c.symbol));
  } catch (err) {
    console.error("Risk radar error", err);
  }
}

// Simple correlated matrix chart (visual demo)
function buildCorrelationMatrix(symbols) {
  const ctx = document.getElementById("corrMatrix").getContext("2d");

  // generate symmetric correlation matrix values for demo
  const n = symbols.length;
  const values = [];
  for (let i=0;i<n;i++){
    const row = [];
    for (let j=0;j<n;j++){
      if (i===j) row.push(1);
      else row.push((Math.random()*0.8).toFixed(2));
    }
    values.push(row);
  }

  // create a heat-like bar chart per row (visual only)
  const labels = symbols;
  const datasets = values.map((row, idx) => ({
    label: labels[idx],
    data: row,
    borderWidth: 0,
    backgroundColor: row.map(v => {
      const num = parseFloat(v);
      if (num > 0.7) return "#ef4444";
      if (num > 0.4) return "#f59e0b";
      return "#10b981";
    })
  }));

  // destroy previous chart if exists
  if (window.corrChart) window.corrChart.destroy();

  window.corrChart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { ticks: { color: "#ccc" } } }
    }
  });
}

// Scenario runner (very basic)
document.getElementById("runScenario").addEventListener("click", async () => {
  const s = document.getElementById("scenarioSelect").value;
  const el = document.getElementById("scenarioResult");
  el.innerText = "Running scenario...";

  // fake compute: return randomized VaR impact
  setTimeout(() => {
    const impact = (Math.random()*5 + 1).toFixed(2);
    el.innerText = `Projected portfolio VaR increase: ${impact}% under "${s}" scenario.`;
  }, 800);
});

loadRiskHeatmap();
