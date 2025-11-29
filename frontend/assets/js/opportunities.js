const API_BASE = "http://127.0.0.1:8000";

async function loadOpportunities() {
  const container = document.getElementById("oppContainer");
  container.innerHTML = `<div class='text-gray-400'>Loading opportunities...</div>`;

  try {
    const res = await fetch(`${API_BASE}/opportunities/`);
    const json = await res.json();

    container.innerHTML = "";

    json.opportunities.forEach((op, i) => {
      const card = document.createElement("div");
      card.className = `
        bg-[#111522] p-6 rounded-xl border border-gray-800 shadow
        hover:border-green-500 transition cursor-pointer
      `;

      card.innerHTML = `
        <div class="flex justify-between">
          <h3 class="text-xl font-bold text-white">${op.symbol}</h3>
          <span class="text-green-400 font-semibold">${op.action}</span>
        </div>

        <p class="text-gray-400 mt-1">PulseScore: ${op.pulse_score_label}</p>

        <div class="mt-3 text-sm text-gray-300">
          <div>Confidence: <span class="text-teal-400">${op.confidence}</span></div>
          <div>Momentum: <span class="text-blue-400">${op.momentum}</span></div>
          <div>Detected: <span class="text-gray-500">${op.timestamp}</span></div>
        </div>

        <div class="mt-4 border-t border-gray-700 pt-4 flex gap-3">
          <button class="approve-btn px-4 py-1 bg-green-600 rounded text-white">Approve</button>
          <button class="ignore-btn px-4 py-1 bg-gray-600 rounded text-white">Ignore</button>
        </div>
      `;

      // OPEN DETAILS PAGE
      card.addEventListener("click", (e) => {
        // Prevent button clicks from opening details
        if (e.target.classList.contains("approve-btn") ||
            e.target.classList.contains("ignore-btn")) return;

        window.location.href = `opportunity_detail.html?symbol=${op.symbol}`;
      });

      // APPROVE ACTION → Move to Action Center
      card.querySelector(".approve-btn").addEventListener("click", async (e) => {
        e.stopPropagation();
        await fetch(`${API_BASE}/action-center/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            symbol: op.symbol,
            action: op.action,
            allocation: op.suggested_allocation_percent || 10
          })
        });
        alert(`Pending approval created for ${op.symbol}`);
      });

      // IGNORE OPPORTUNITY
      card.querySelector(".ignore-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        card.remove();
      });

      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = `<div class="text-red-400">Error loading opportunities.</div>`;
  }
}

loadOpportunities();
