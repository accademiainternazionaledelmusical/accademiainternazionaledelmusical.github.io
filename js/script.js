// ==========================================================================
// Countdown verso la masterclass (3 ottobre 2026, 09:00)
// ==========================================================================
(function initCountdown() {
  const target = new Date('2026-10-03T09:00:00+02:00').getTime();
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs'),
  };
  if (!els.days) return;

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      els.days.textContent = '0';
      els.hours.textContent = '0';
      els.mins.textContent = '0';
      els.secs.textContent = '0';
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    els.days.textContent = d;
    els.hours.textContent = String(h).padStart(2, '0');
    els.mins.textContent = String(m).padStart(2, '0');
    els.secs.textContent = String(s).padStart(2, '0');
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

// ==========================================================================
// Invio form lead
// NOTA: da collegare a un servizio reale (es. Web3Forms, come su Aijò)
// sostituendo l'endpoint e la access key prima del go-live.
// ==========================================================================
(function initLeadForm() {
  const form = document.getElementById('lead-form');
  const note = document.getElementById('form-note');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = form.nome.value.trim();
    const eta = Number(form.eta.value);
    const telefono = form.telefono.value.trim();

    if (eta < 18 || eta > 30) {
      note.textContent = 'La masterclass è riservata a chi ha tra i 18 e i 30 anni.';
      note.className = 'form-note error';
      return;
    }

    // TODO: sostituire con l'invio reale (Web3Forms / email / CRM cliente)
    const messaggio = `Ciao! Sono ${nome} (${eta} anni), vorrei prenotare il mio posto alla Masterclass di Musical Theatre del 3-4 ottobre. Il mio numero è ${telefono}.`;
    const whatsappUrl = `https://wa.me/393880939594?text=${encodeURIComponent(messaggio)}`;

    note.textContent = 'Richiesta pronta: ti stiamo aprendo WhatsApp per confermare la prenotazione...';
    note.className = 'form-note success';

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener');
    }, 600);
  });
})();
