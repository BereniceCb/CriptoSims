async function interactuarContrato() {
  const statusDiv = document.getElementById("contractStatus");

  if (typeof window.ethereum === "undefined") {
    statusDiv.textContent = "Metamask no está disponible";
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    const tx = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: account,
        to: "0xYourContractAddressHere", // reemplaza con dirección real
        value: "0x0", // sin enviar ETH real
        data: "0x",   // demo
      }],
    });

    statusDiv.textContent = `Transacción enviada: ${tx}`;
  } catch (err) {
    statusDiv.textContent = `Error: ${err.message}`;
  }
}
