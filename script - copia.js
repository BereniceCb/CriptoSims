function login() {
  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('password').value;
  if (usuario === 'demo' && password === 'demo') {
    document.getElementById('login').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  } else {
    document.getElementById('error').textContent = 'Usuario o contraseña incorrectos';
  }
}

function simularAhorro() {
  const cantidad = parseFloat(document.getElementById('cantidad').value);
  const meses = parseInt(document.getElementById('meses').value);
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(cantidad) || cantidad <= 0 || isNaN(meses) || meses <= 0) {
    resultadoDiv.textContent = 'Por favor ingresa valores válidos para cantidad y meses.';
    return;
  }

  let total = cantidad * meses;
  resultadoDiv.innerHTML = `
    <p>Después de <strong>${meses}</strong> meses ahorrando <strong>$${cantidad.toFixed(2)}</strong> al mes,</p>
    <p>tendrás un total de <strong>$${total.toFixed(2)}</strong>.</p>
  `;
}

function simularInversion() {
  const monto = parseFloat(document.getElementById('inversion').value);
  const ethPrice = 3500; // precio fijo de ETH
  const resultado = document.getElementById('inversionResultado');

  if (isNaN(monto) || monto <= 0) {
    resultado.textContent = 'Ingresa un monto válido.';
    return;
  }

  const ethComprado = monto / ethPrice;
  resultado.innerHTML = `
    <p>Con <strong>$${monto.toFixed(2)}</strong> puedes comprar aproximadamente <strong>${ethComprado.toFixed(6)} ETH</strong>.</p>
  `;
}

 
  