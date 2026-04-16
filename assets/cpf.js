function gerarCPF() {
  const n = () => Math.floor(Math.random() * 9);
  const digits = Array.from({ length: 9 }, n);

  // Primeiro dígito verificador
  let sum = digits.reduce((acc, val, i) => acc + val * (10 - i), 0);
  let remainder = sum % 11;
  digits.push(remainder < 2 ? 0 : 11 - remainder);

  // Segundo dígito verificador
  sum = digits.reduce((acc, val, i) => acc + val * (11 - i), 0);
  remainder = sum % 11;
  digits.push(remainder < 2 ? 0 : 11 - remainder);

  return digits.join('');
}

function formatarCPF(cpf) {
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
}

// ── Estado ──
let quantidade = 1;

const btnMenos   = document.getElementById('btnMenos');
const btnMais    = document.getElementById('btnMais');
const qtdDisplay = document.getElementById('qtdDisplay');
const btnGerar   = document.getElementById('btnGerar');
const results    = document.getElementById('results');
const toggleFmt  = document.getElementById('toggleFormatado');

function atualizarQtd(delta) {
  quantidade = Math.min(10, Math.max(1, quantidade + delta));
  qtdDisplay.textContent = quantidade;
}

btnMenos.addEventListener('click', () => atualizarQtd(-1));
btnMais.addEventListener('click',  () => atualizarQtd(+1));

btnGerar.addEventListener('click', () => {
  results.innerHTML = '';
  const formatado = toggleFmt.checked;

  for (let i = 0; i < quantidade; i++) {
    const cpf = gerarCPF();
    const display = formatado ? formatarCPF(cpf) : cpf;

    const item = document.createElement('div');
    item.className = 'cpf-item';
    item.style.animationDelay = `${i * 60}ms`;

    item.innerHTML = `
      <span class="cpf-number">${display}</span>
      <button class="btn-copy" data-cpf="${display}">Copiar</button>
    `;
    results.appendChild(item);
  }

  // Eventos de cópia
  results.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-cpf');
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '✓ Copiado';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copiar';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
});