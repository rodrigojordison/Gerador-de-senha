const themeCheck = document.getElementById('themeCheck');
themeCheck.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeCheck.checked);
});

function gerarSenha() {
  const tamanho     = parseInt(document.getElementById('tamanhoInput').value) || 12;
  const outrosChars = document.getElementById('outrosInput').value || '!@#$%&*';

  const numerais   = '0123456789';
  const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const minusculas = 'abcdefghijklmnopqrstuvwxyz';

 
  const primeiroVal = document.querySelector('input[name="firstChar"]:checked')?.value || 'numeral';

  const mapFirst = {
    numeral:  numerais,
    maiuscula: maiusculas,
    minuscula: minusculas,
    outros:   outrosChars || numerais
  };

  const firstPool = mapFirst[primeiroVal] || numerais;
  let senha = firstPool[Math.floor(Math.random() * firstPool.length)];

  
  const activeOthers = [...document.querySelectorAll('input[name="otherChar"]:checked')]
    .map(cb => cb.value);

  let pool = '';
  if (activeOthers.includes('numeral'))   pool += numerais;
  if (activeOthers.includes('maiuscula')) pool += maiusculas;
  if (activeOthers.includes('minuscula')) pool += minusculas;
  if (activeOthers.includes('outros'))    pool += outrosChars;
  if (!pool) pool = numerais + maiusculas + minusculas;

  for (let i = 1; i < tamanho; i++) {
    senha += pool[Math.floor(Math.random() * pool.length)];
  }

  document.getElementById('senhaOutput').value = senha;
}




// ── Geração de CPF válido ──
