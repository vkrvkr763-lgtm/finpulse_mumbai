const API_BASE = "http://127.0.0.1:8000";

// fetch pending
async function loadPending() {
  const res = await fetch(`${API_BASE}/action-center/pending`);
  const json = await res.json();
  const container = document.getElementById("pendingList");
  container.innerHTML = "";

  if (!json.pending || json.pending.length === 0) {
    container.innerHTML = `<div class="p-3 bg-[#151b2d] rounded border border-gray-700 text-gray-400">No pending actions.</div>`;
    return;
  }

  json.pending.forEach(item => {
    const card = document.createElement("div");
    card.className = "mb-3 p-3 bg-[#0f1724] rounded border border-gray-700 flex justify-between items-center";
    card.innerHTML = `<div>
                        <div class="font-bold text-white">${item.symbol} — ${item.action}</div>
                        <div class="text-xs text-gray-400">Alloc: ${item.allocation}% • ${new Date(item.created_at).toLocaleTimeString()}</div>
                      </div>
                      <div class="flex gap-2">
                        <button class="approve-btn px-3 py-1 bg-green-600 rounded text-white">Approve</button>
                        <button class="ignore-btn px-3 py-1 bg-gray-600 rounded text-white">Ignore</button>
                      </div>`;
    container.appendChild(card);

    card.querySelector(".approve-btn").addEventListener("click", async () => {
      await fetch(`${API_BASE}/action-center/approve`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ item_id: item.id })
      });
      await refreshActionCenter();
    });

    card.querySelector(".ignore-btn").addEventListener("click", async () => {
      await fetch(`${API_BASE}/action-center/ignore`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ item_id: item.id })
      });
      await refreshActionCenter();
    });
  });
}

// fetch approved
async function loadApproved() {
  const res = await fetch(`${API_BASE}/action-center/approved`);
  const json = await res.json();
  const container = document.getElementById("approvedList");
  container.innerHTML = "";
  (json.approved || []).forEach(item => {
    const el = document.createElement("div");
    el.className = "mb-2 p-3 bg-[#0f1724] rounded border border-gray-700";
    el.innerHTML = `<div class="font-semibold text-white">${item.symbol} — ${item.action}</div>
                    <div class="text-xs text-gray-400">Alloc ${item.allocation}% • Approved</div>`;
    container.appendChild(el);
  });
}

// load timeline
async function loadTimeline() {
  const res = await fetch(`${API_BASE}/timeline/`);
  const json = await res.json();
  const container = document.getElementById("auditTimeline");
  container.innerHTML = "";
  (json.timeline || []).slice(0,20).forEach(ev => {
    const el = document.createElement("div");
    el.className = "mb-2 p-2 bg-[#0f1724] rounded border border-gray-700";
    el.innerHTML = `<div class="text-xs text-gray-400">${new Date(ev.time).toLocaleTimeString()}</div>
                    <div class="font-semibold text-white">${ev.agent}</div>
                    <div class="text-sm text-gray-300">${ev.message}</div>`;
    container.appendChild(el);
  });
}

// quick create
document.getElementById("quickCreate").addEventListener("click", async () => {
  const symbol = document.getElementById("quickSymbol").value || "DemoSym";
  const action = document.getElementById("quickAction").value || "BUY";
  const allocation = Number(document.getElementById("quickAlloc").value || 5);

  await fetch(`${API_BASE}/action-center/create`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ symbol, action, allocation })
  });

  document.getElementById("quickSymbol").value = "";
  document.getElementById("quickAlloc").value = "";
  await refreshActionCenter();
});

// refresh all
async function refreshActionCenter() {
  await loadPending();
  await loadApproved();
  await loadTimeline();
}

refreshActionCenter();
setInterval(refreshActionCenter, 6000);
