function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (!username || !password) return alert("Completa los campos");
  localStorage.setItem(username, password);
  alert("Usuario registrado con éxito");
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (localStorage.getItem(username) === password) {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("main-app").classList.remove("hidden");
    updateChart();
    loadHistory();
    loadWallet();
  } else {
    alert("Credenciales incorrectas");
  }
}

function logout() {
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("main-app").classList.add("hidden");
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      localStorage.setItem("userWallet", walletAddress);
      const walletEl = document.querySelector("#wallet-address span");
      if (walletEl) walletEl.textContent = walletAddress;
      saveHistory(`Conectaste tu wallet real: ${walletAddress}`);
    } catch (error) {
      alert("Conexión rechazada: " + error.message);
    }
  } else {
    alert("Trust Wallet no está instalada o no está conectada. Instálala o conéctala para continuar.");
  }
}

function loadWallet() {
  const wallet = localStorage.getItem("userWallet") || "No conectada";
  const walletEl = document.querySelector("#wallet-address span");
  if (walletEl) walletEl.textContent = wallet;
}

function convertToUSD() {
  const amount = parseFloat(document.getElementById("crypto-amount").value);
  const crypto = document.getElementById("crypto-select").value;
  let price = getSimulatedPrice(crypto);
  const result = amount * price;
  document.getElementById("conversion-result").textContent = `Equivale a $${result.toFixed(2)} USD`;
  saveHistory(`Convertiste ${amount} ${crypto} a $${result.toFixed(2)} USD`);
}

function calculateCrypto() {
  const usd = parseFloat(document.getElementById("usd-invest").value);
  const crypto = document.getElementById("crypto-select").value;
  let price = getSimulatedPrice(crypto);
  const result = usd / price;
  document.getElementById("investment-result").textContent = `Obtendrás ${result.toFixed(6)} ${crypto}`;
  saveHistory(`Invertiste $${usd.toFixed(2)} y obtendrás ${result.toFixed(6)} ${crypto}`);
}

function getSimulatedPrice(crypto) {
  const basePrices = { BTC: 65000, ETH: 3200 };
  return basePrices[crypto] + Math.random() * 500 - 250;
}

let chart;
function updateChart() {
  const crypto = document.getElementById("crypto-select").value;
  const labels = Array.from({ length: 7 }, (_, i) => `Día ${i + 1}`);
  const data = labels.map(() => getSimulatedPrice(crypto));

  if (chart) chart.destroy();

  const ctx = document.getElementById("cryptoChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `Historial de precio de ${crypto}`,
          data: data,
          fill: false,
          borderColor: "#00cec9",
          tension: 0.3
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

function saveHistory(entry) {
  let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
  const now = new Date().toLocaleString();
  history.unshift(`[${now}] ${entry}`);
  if (history.length > 10) history.pop();
  localStorage.setItem("conversionHistory", JSON.stringify(history));
  loadHistory();
}

function loadHistory() {
  let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
  const container = document.getElementById("history-log");
  if (!container) return;
  container.innerHTML = history.map(item => `<li>${item}</li>`).join("");
}
