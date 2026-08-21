console.log("SCRIPT CARGADO");
//login y registro
const form = document.getElementById("login");
if (form) {
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const usuario = document.getElementById("Email").value;
    const contrasena = document.getElementById("Password").value;

    //login admin
    if (usuario === "admin@gmail.com" && contrasena === "wm2") {
      alert("inicio de sesión exitoso");
      window.location.replace("menu.html");
    } else {
      alert("Correo o contraseña incorrectos");
    }
  });
}

const goRegistrer = document.getElementById("goRegistrer");
const Login = document.getElementById("login");

//botones y redireccionar (menú) (atendiendo)

const mensaje = document.getElementById("mensaje");

function redireccionar(boton, texto, pagina) {
  if (boton) {
    boton.addEventListener("click", function (e) {
      e.preventDefault();

      if(mensaje) {
        mensaje.textContent = texto;
      }
      setTimeout(() => {
        window.location.href = pagina;
      }, 1500);
    });
  }
}

const btnDinero = document.getElementById("btnDinero");
const btnDeposit = document.getElementById("btnDeposit");
const btnSendmoney = document.getElementById("btnSendmoney");
const btnCircleTransactions = document.getElementById("btnCircleTransactions");



redireccionar(
  document.getElementById("btnDeposit"),
  "Redireccionando a depositar...",
  "deposit.html" 
);

redireccionar(
  document.getElementById("btnSendmoney"),
  "Redireccionando a transferir...",
  "sendmoney.html"
);

redireccionar(
  document.getElementById("btnCircleTransactions"),
"Redireccionando a movimientos...",
"transactions.html"
);

//ingresar dinero boton y redireccionar (menú)

//mostrar y ocultar saldo en menu
if (window.location.pathname.includes("deposit.html")) {
  console.log("Entró a deposit.html");

  const cantidadInput = document.getElementById("cantidadInput");
  const bntSumar = document.getElementById("btnSumar");

  console.log(cantidadInput);
  console.log(bntSumar);

  if (bntSumar) {
    bntSumar.addEventListener("click", function (event) {
      console.log("Botón presionado");

      event.preventDefault();

      let cantidadIngresada = parseFloat(cantidadInput.value);

      console.log("Cantidad:", cantidadIngresada);
    });
  }
}

const btnMostrarSaldo = document.getElementById("btnMostrarSaldo");
const saldo = document.getElementById("saldo");

if (btnMostrarSaldo && saldo) {
  let mostrarSaldo = false;

  btnMostrarSaldo.addEventListener("click", function () {
    mostrarSaldo = !mostrarSaldo;

    const saldoReal = "$" + (localStorage.getItem("saldo") || "0.00");

    if (mostrarSaldo) {
      saldo.textContent = saldoReal;
      saldo.classList.remove("saldo-oculto");
    } else {
      saldo.textContent = "****";
      saldo.classList.add("saldo-oculto");
    }
  });
}

//notificaciones beneficios y Tarjeta credito
window.addEventListener("load", function () {
  const toasts = document.querySelectorAll(".toast");
  toasts.forEach((toastElement, index) => {
    // Mostrar cada toast con un delay
    setTimeout(() => {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }, index * 2000); // 2 segundos entre cada uno
  });
});

//deposit.html
window.addEventListener("load", function () {
  const saldoElemento = document.getElementById("saldo");

  if (saldoElemento) {
    let saldo = localStorage.getItem("saldo") || "$0";
    saldoElemento.textContent = saldo;
   /* registrarMovimiento(
    "Transferencia",
    "Envío de dinero",
    -cantidadEnviada
);*/
  }


  // Mostrar toasts en secuencia
  const toasts = document.querySelectorAll(".toast");
  toasts.forEach((toastElement, index) => {
    setTimeout(() => {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }, index * 2000);
  });
});

//deposito
if (window.location.pathname.includes("deposit.html")) {
  const cantidadInput = document.getElementById("cantidadInput");
  const bntSumar = document.getElementById("btnSumar");

  if (bntSumar) {
    bntSumar.addEventListener("click", function (event) {
      event.preventDefault();
      let saldoGuardado = localStorage.getItem("saldo") || "0";
      let saldoLimpio = saldoGuardado.replace("$", "");
      let saldoActual = parseFloat(saldoLimpio) || 0;

      let cantidadIngresada = parseFloat(cantidadInput.value);

      if (!isNaN(cantidadIngresada) && cantidadIngresada > 0) {
        let nuevoSaldo = saldoActual + cantidadIngresada;

        // Guarda solo el número 
        localStorage.setItem("saldo", nuevoSaldo.toFixed(0));
        cantidadInput.value = "";

        //Guarda ingreso en movimientos
        if (typeof registrarMovimiento === "function") {  
          registrarMovimiento("Depósito", "Ingreso de dinero", cantidadIngresada);
        } else { 
          console.error("La función registrarMovimiento no está definida.");
        }
        
        alert("¡Monto sumado con éxito!"); // Mensaje para éxito
      } else {
        alert("Por favor, ingresa un monto válido"); // Mensaje en caso de error
      }
    });
  }
}


window.addEventListener("load", function () {
  const saldo = document.getElementById("saldo");
  if (saldo) {
    const formatoCLP = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    });
    const saldoGuardado = localStorage.getItem("saldo") || "0";
    saldo.textContent = formatoCLP.format(saldoGuardado);
  }
});

// tabla de movimientos transactions.html
function registrarMovimiento(tipo, descripcion, monto) {

    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    movimientos.push({
        fecha: new Date().toLocaleString("es-CL"),
        tipo: tipo,
        descripcion: descripcion,
        monto: monto
    });

    localStorage.setItem("movimientos", JSON.stringify(movimientos));
}

//SENDMONEY.HTML

// localStorage key
    const STORAGE_KEY = 'contacts_v1';

    // Elementos
    const addContactBtn = document.getElementById('addContactBtn');
    const contactList = document.getElementById('contactList');
    const searchContact = document.getElementById('searchContact');

    // Elementos del modal
    const newContactModalEl = document.getElementById('newContactModal');
    const modalSaveBtn = document.getElementById('modalSaveBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');

    // Form inputs 
    const contactName = document.getElementById('contactName');
    const contactCBU = document.getElementById('contactCBU');
    const contactAlias = document.getElementById('contactAlias');
    const contactBank = document.getElementById('contactBank');

    let contacts = [];
    const bootstrapModal = newContactModalEl ? new bootstrap.Modal(newContactModalEl, { keyboard: true }) : null;

    function generateId() {
      return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    }

    function loadContacts() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        contacts = raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.error('Error leyendo localStorage', e);
        contacts = [];
      }
    }

    function saveContacts() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }

    function clearForm() {
      contactName.value = '';
      contactCBU.value = '';
      contactAlias.value = '';
      contactBank.value = '';
    }

    function escapeHtml(unsafe) {
      if (!unsafe && unsafe !== 0) return '';
      return String(unsafe)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

    function renderList() {
      const q = searchContact.value.trim().toLowerCase();
      contactList.innerHTML = '';

      const filtered = contacts.filter(c => {
        if (!q) return true;
        return (
          (c.name || '').toLowerCase().includes(q) ||
          (c.cbu || '').toLowerCase().includes(q) ||
          (c.alias || '').toLowerCase().includes(q) ||
          (c.bank || '').toLowerCase().includes(q)
        );
      });

      if (filtered.length === 0) {
        contactList.innerHTML = '<li class="list-group-item text-muted">No hay contactos</li>';
        return;
      }

      filtered.forEach((c) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        li.innerHTML = `
          <div class="contact-row">
            <div class="contact-info">
              <strong class="contact-name">${escapeHtml(c.name)}</strong>
              <small class="contact-details text-muted">
                CBU: ${escapeHtml(c.cbu || '-')}, Alias: ${escapeHtml(c.alias || '-')}, Banco: ${escapeHtml(c.bank || '-')}
              </small>
            </div>
            <div class="contact-actions">
              <button class="btn btn-sm btn-outline-primary btn-select" data-id="${c.id}">Seleccionar</button>
              <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${c.id}">Eliminar</button>
            </div>
          </div>
        `;

        contactList.appendChild(li);
      });
    }

    // Guarda el contacto si es válido. Retorna true si se guardó.
    function handleSaveContact() {
      const name = contactName.value.trim();
      const cbu = contactCBU.value.trim();
      const alias = contactAlias.value.trim();
      const bank = contactBank.value.trim();

      if (!name) {
        alert('El nombre es obligatorio.');
        contactName.focus();
        return false;
      }

      // Generar id único
      const id = generateId();

      contacts.push({ id, name, cbu, alias, bank, createdAt: new Date().toISOString() });
      saveContacts();
      renderList();
      clearForm();
      return true;
    }

    function handleDeleteById(id) {
      if (!confirm('¿Eliminar este contacto?')) return;
      const idx = contacts.findIndex(c => c.id === id);
      if (idx === -1) return;
      contacts.splice(idx, 1);
      saveContacts();
      renderList();
    }

    function handleSelectById(id) {
      const c = contacts.find(c => c.id === id);
      if (!c) return;
      alert('Contacto seleccionado:\\n' + c.name + '\\nAlias: ' + (c.alias || '-') + '\\nCBU: ' + (c.cbu || '-'));
    }

    function initEventListeners() {
      addContactBtn.addEventListener('click', () => {
        clearForm();
        bootstrapModal.show();
        // focus será manejado en shown.bs.modal
      });

      newContactModalEl.addEventListener('shown.bs.modal', () => {
        contactName.focus();
      });

      modalSaveBtn.addEventListener('click', () => {
        const saved = handleSaveContact();
        if (saved) bootstrapModal.hide();
      });

      modalCancelBtn.addEventListener('click', () => {
        clearForm();
      });

      contactList.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const id = btn.dataset.id;
        if (!id) return;
        if (btn.classList.contains('btn-delete')) {
          handleDeleteById(id);
        } else if (btn.classList.contains('btn-select')) { openSendModal(id); }
      });

      searchContact.addEventListener('input', renderList);

      // Tecla Enter dentro del modal guarda
      document.getElementById('modalContactForm').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const saved = handleSaveContact();
          if (saved) bootstrapModal.hide();
        }
      });
    }

    // Inicialización
    (function main() {
      loadContacts();
      initEventListeners();
      renderList();
    })();

    console.log('Script de contactos cargado correctamente.');




