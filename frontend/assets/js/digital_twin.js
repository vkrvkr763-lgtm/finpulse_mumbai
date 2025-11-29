const API_BASE = "http://127.0.0.1:8000";

async function loadTwinInsights() {
  try {
    const res = await fetch(`${API_BASE}/pulsescore/`);
    const json = await res.json();

    document.getElementById("twinInsights").innerHTML = `
      <div class="font-semibold text-lg">${json.sentiment_label} (${json.sentiment_score}%)</div>
      <div class="text-xs text-gray-400 mt-1">Momentum: ${json.momentum.toFixed(2)}</div>
      <div class="text-xs text-gray-500 mt-3 italic">AI-driven insight replicated from real-time portfolio twin</div>
    `;
  } 
  catch (error) {
    document.getElementById("twinInsights").innerHTML =
      `<p class="text-red-400">Failed to load insights.</p>`;
  }
}

window.onload = loadTwinInsights;
