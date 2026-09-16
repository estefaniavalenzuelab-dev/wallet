// INDEX.HTML-login

const form = document.getElementById("login");

if (form) {
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const usuario = document.getElementById("Email").value.trim();
    const contrasena = document.getElementById("Password").value;

    // Login admin
    const esAdmin =
      usuario === "admin@gmail.com" && contrasena === "wm2";

    // Usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioRegistrado = usuarios.find(function (persona) {
      return persona.email === usuario && persona.password === contrasena;
    });

  if (esAdmin || usuarioRegistrado) {

    
  if (usuarioRegistrado) {
    localStorage.setItem("nombreUsuario", usuarioRegistrado.nombre);
  } else {
    localStorage.setItem("nombreUsuario", "Admin");
  }

  alert("Inicio de sesión exitoso");
  window.location.replace("menu.html");

} else {
  alert("Correo o contraseña incorrectos");
}
  });
}

// Recordar correo
const correoRecordado = localStorage.getItem("correoRecordado");

if (correoRecordado) {
  document.getElementById("Email").value = correoRecordado;
  document.getElementById("dropdownCheck").checked = true;
}

// Mostrar y ocultar contraseña
$("#btnVerPassword").on("click", function () {
  const password = $("#Password");

  if (password.attr("type") === "password") {
    password.attr("type", "text");
    $(this).text("Ocultar");
  } else {
    password.attr("type", "password");
    $(this).text("Ver");
  }
});

// Registro de usuario

const btnGuardarRegistro = document.getElementById("btnGuardarRegistro");

if (btnGuardarRegistro) {
  btnGuardarRegistro.addEventListener("click", function () {
    const nombre = document.getElementById("registroNombre").value.trim();
    const email = document.getElementById("registroEmail").value.trim();
    const password = document.getElementById("registroPassword").value;
    const confirmarPassword =
      document.getElementById("confirmarPassword").value;

    const mensajeRegistro = document.getElementById("mensajeRegistro");

    if (
      nombre === "" ||
      email === "" ||
      password === "" ||
      confirmarPassword === ""
    ) {
      mensajeRegistro.textContent = "Completa todos los campos.";
      return;
    }

    if (password !== confirmarPassword) {
      mensajeRegistro.textContent = "Las contraseñas no coinciden.";
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExiste = usuarios.some(function (usuario) {
      return usuario.email === email;
    });

    if (usuarioExiste) {
      mensajeRegistro.textContent = "Este correo ya está registrado.";
      return;
    }

    const nuevoUsuario = {
      nombre: nombre,
      email: email,
      password: password
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensajeRegistro.textContent = "Cuenta creada correctamente.";
    setTimeout(function () {
  const modalRegistro = bootstrap.Modal.getInstance(
    document.getElementById("registroModal")
  );

  if (modalRegistro) {
    modalRegistro.hide();
  }
}, 1000);
  });
}

// Limpiar modal de registro al cerrar

$("#registroModal").on("hidden.bs.modal", function () {
  $("#registroNombre").val("");
  $("#registroEmail").val("");
  $("#registroPassword").val("");
  $("#confirmarPassword").val("");
  $("#mensajeRegistro").text("");
});

//MENU.HTML

const saludoUsuario = document.getElementById("saludoUsuario");

if (saludoUsuario) {
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  if (nombreUsuario) {
    saludoUsuario.textContent = "¡Hola " + nombreUsuario + "!";
  }
}

// botones y mensaje de redirección

function redireccionar(idBoton, texto, pagina) {
  const boton = document.getElementById(idBoton);

  if (!boton) {
    return;
  }

  boton.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const mensaje = document.getElementById("mensaje");

    if (mensaje) {
      mensaje.textContent = texto;
    }

    setTimeout(function () {
      window.location.href = pagina;
    }, 1500);
  });
}

$(".boton-redondo").on("mouseenter", function () {
  $(this).stop().animate(
    {
      opacity: 0.8,
    },
    150,
  );
});

$(".boton-redondo").on("mouseleave", function () {
  $(this).stop().animate(
    {
      opacity: 1,
    },
    150,
  );
});

// DEPOSITAR

redireccionar("btnDinero", "Redireccionando a depositar...", "deposit.html");

redireccionar("btnDeposit", "Redireccionando a depositar...", "deposit.html");

// TRANSFERIR
redireccionar(
  "btnSendmoney",
  "Redireccionando a transferir...",
  "sendmoney.html",
);

// MOVIMIENTOS
redireccionar(
  "btnCircleTransactions",
  "Redireccionando a movimientos...",
  "transactions.html",
);

// MENÚ
redireccionar("btnMenu", "Redireccionando a menú...", "menu.html");

//mostrar y ocultar saldo en menu

const btnMostrarSaldo = document.getElementById("btnMostrarSaldo");
const saldo = document.getElementById("saldo");

if (btnMostrarSaldo && saldo) {
  let mostrarSaldo = false;

  btnMostrarSaldo.addEventListener("click", function () {
    mostrarSaldo = !mostrarSaldo;

    const saldoGuardado = Number(localStorage.getItem("saldo")) || 0;

    const saldoReal = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(saldoGuardado);

    if (mostrarSaldo) {
      saldo.textContent = saldoReal;
      saldo.classList.remove("saldo-oculto");
    } else {
      saldo.textContent = "****";
      saldo.classList.add("saldo-oculto");
    }
  });
}

// Pestañas de saldo y retiro

const btnSaldo = document.getElementById("btnSaldo");
const btnRetirar = document.getElementById("btnRetirar");

const contenidoSaldo = document.getElementById("contenidoSaldo");
const contenidoRetiro = document.getElementById("contenidoRetiro");

if (btnSaldo && btnRetirar && contenidoSaldo && contenidoRetiro) {

  btnRetirar.addEventListener("click", function (e) {
    e.preventDefault();
    const mensaje = document.getElementById("mensaje");

    if (mensaje) {
      mensaje.textContent = "";
    }
    contenidoSaldo.style.display = "none";
    contenidoRetiro.style.display = "block";

    btnSaldo.classList.remove("active");
    btnRetirar.classList.add("active");
  });

  btnSaldo.addEventListener("click", function (e) {
    e.preventDefault();
    const mensajeRetiro = document.getElementById("mensajeRetiro");

    if (mensajeRetiro) {
      mensajeRetiro.textContent = "";
    }
    contenidoRetiro.style.display = "none";
    contenidoSaldo.style.display = "block";

    btnRetirar.classList.remove("active");
    btnSaldo.classList.add("active");
  });

}

// Retirar dinero

const btnConfirmarRetiro = document.getElementById("btnConfirmarRetiro");

if (btnConfirmarRetiro) {

  btnConfirmarRetiro.addEventListener("click", function () {


    const montoRetiro = document.getElementById("montoRetiro");
    const mensajeRetiro = document.getElementById("mensajeRetiro");

    const monto = Number(montoRetiro.value);
    const saldoActual = Number(localStorage.getItem("saldo")) || 0;

    if (monto <= 0) {
      mensajeRetiro.textContent = "Ingresa un monto válido.";
      return;
    }

    if (monto > saldoActual) {
      mensajeRetiro.textContent = "Saldo insuficiente.";
      return;
    }

    const nuevoSaldo = saldoActual - monto;

    localStorage.setItem("saldo", nuevoSaldo);

    const saldoElemento = document.getElementById("saldo");

    if (saldoElemento) {
      saldoElemento.textContent = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
      }).format(nuevoSaldo);
    }

    registrarMovimiento(
    "Retiro",
    "Retiro de dinero",
    -monto
  );
    mensajeRetiro.textContent = "Retiro realizado correctamente.";
    montoRetiro.value = "";
  });

}

// Mostrar toasts en secuencia
const toasts = document.querySelectorAll(".toast");
toasts.forEach((toastElement, index) => {
  setTimeout(() => {
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }, index * 2000);
});

//DEPOSIT
if (window.location.pathname.includes("deposit.html")) {
  const cantidadInput = document.getElementById("cantidadInput");
  const btnSumar = document.getElementById("btnSumar");

  if (btnSumar) {
    btnSumar.addEventListener("click", function (event) {
      event.preventDefault();
      let saldoGuardado = localStorage.getItem("saldo") || "0";
      let saldoLimpio = saldoGuardado.replace("$", "");
      let saldoActual = parseFloat(saldoLimpio) || 0;

      let cantidadIngresada = parseFloat(cantidadInput.value);

      if (!isNaN(cantidadIngresada) && cantidadIngresada > 0) {
        let nuevoSaldo = saldoActual + cantidadIngresada;

        localStorage.setItem("saldo", nuevoSaldo.toFixed(0));
        cantidadInput.value = "";

        if (typeof registrarMovimiento === "function") {
          registrarMovimiento(
            "Depósito",
            "Ingreso de dinero",
            cantidadIngresada,
          );
        } else {
          console.error("La función registrarMovimiento no está definida.");
        }

        // mensaje con jquery
        $("#mensajeDeposito")
          .stop(true, true)
          .hide()
          .fadeIn(400)
          .delay(2000)
          .fadeOut(400);

        alert("¡Monto sumado con éxito!");
      } else {
        alert("Por favor, ingresa un monto válido");
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

//TRANSACTIONS.HTML
// movimientos transactions.html
function registrarMovimiento(tipo, descripcion, monto) {
  let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

  movimientos.push({
    fecha: new Date().toLocaleString("es-CL"),
    tipo: tipo,
    descripcion: descripcion,
    monto: monto,
  });

  localStorage.setItem("movimientos", JSON.stringify(movimientos));
}
// Mostrar movimientos

function mostrarMovimientos() {
  const lista = document.getElementById("listaMovimientos");

  if (!lista) return;

  const movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

  const buscar = document.getElementById("buscarMovimiento");

  const filtro = document.getElementById("filtroMovimiento");

  function formatoDinero(valor) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(valor);
  }

  function renderizar() {
    lista.innerHTML = "";

    const textoBusqueda = buscar.value.toLowerCase();

    const tipoFiltro = filtro.value;

    const filtrados = movimientos.filter((movimiento) => {
      const coincideTexto =
        movimiento.tipo.toLowerCase().includes(textoBusqueda) ||
        movimiento.descripcion.toLowerCase().includes(textoBusqueda);

      let coincideFiltro = true;

      if (tipoFiltro === "ingresos") {
        coincideFiltro = movimiento.monto > 0;
      }

      if (tipoFiltro === "egresos") {
        coincideFiltro = movimiento.monto < 0;
      }

      return coincideTexto && coincideFiltro;
    });

    if (filtrados.length === 0) {
      lista.innerHTML = `
        <li class="list-group-item text-center text-muted py-4">
          No se encontraron movimientos.
        </li>
      `;

      return;
    }

    [...filtrados].reverse().forEach((movimiento) => {
      const item = document.createElement("li");

      item.className =
        "list-group-item d-flex justify-content-between align-items-center py-3";

      const ingreso = movimiento.monto > 0;

      const claseMonto = ingreso ? "text-success" : "text-danger";

      const signo = ingreso ? "+" : "";

      item.innerHTML = `

        <div>

          <strong>
            ${movimiento.tipo}
          </strong>

          <div class="text-muted small">
            ${movimiento.descripcion}
          </div>

          <div class="text-muted small">
            ${movimiento.fecha}
          </div>

        </div>


        <strong class="${claseMonto}">
          ${signo}${formatoDinero(movimiento.monto)}
        </strong>

      `;

      lista.appendChild(item);
    });
  }

  const ingresos = movimientos
    .filter((m) => m.monto > 0)
    .reduce((total, m) => total + m.monto, 0);

  const egresos = movimientos
    .filter((m) => m.monto < 0)
    .reduce((total, m) => total + Math.abs(m.monto), 0);

  document.getElementById("totalIngresos").textContent =
    formatoDinero(ingresos);

  document.getElementById("totalEgresos").textContent = formatoDinero(egresos);

  document.getElementById("cantidadMovimientos").textContent =
    movimientos.length;

  buscar.addEventListener("input", renderizar);

  filtro.addEventListener("change", renderizar);

  renderizar();
}

if (window.location.pathname.includes("transactions.html")) {
  mostrarMovimientos();
}

//SENDMONEY.HTML

if (window.location.pathname.includes("sendmoney.html")) {
  // localStorage key
  const STORAGE_KEY = "contacts_v1";

  // Elementos
  const addContactBtn = document.getElementById("addContactBtn");
  const contactList = document.getElementById("contactList");
  const searchContact = document.getElementById("searchContact");

  // Elementos del modal
  const newContactModalEl = document.getElementById("newContactModal");
  const modalSaveBtn = document.getElementById("modalSaveBtn");
  const modalCancelBtn = document.getElementById("modalCancelBtn");

  // Form inputs
  const contactName = document.getElementById("contactName");
  const contactCBU = document.getElementById("contactCBU");
  const contactAlias = document.getElementById("contactAlias");
  const contactBank = document.getElementById("contactBank");

  let contacts = [];
  const bootstrapModal = newContactModalEl
    ? new bootstrap.Modal(newContactModalEl, { keyboard: true })
    : null;

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function loadContacts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      contacts = raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Error leyendo localStorage", e);
      contacts = [];
    }
  }

  function saveContacts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }

  function cargarContactosTransferencia() {
    const selectContacto = document.getElementById("sendContactSelect");

    if (!selectContacto) return;

    // Limpiar selector
    selectContacto.innerHTML =
      '<option value="">Selecciona un contacto</option>';

    // Agregar contactos guardados
    contacts.forEach((contacto) => {
      const option = document.createElement("option");

      option.value = contacto.id;
      option.textContent = `${contacto.name} - ${contacto.bank || "Sin banco"}`;

      selectContacto.appendChild(option);
    });
  }

  // Busqueda de contactos con jquery

  $("#searchContact").on("input", function () {
    const texto = $(this).val().toLowerCase().trim();

    $("#contactList .list-group-item").each(function () {
      const contacto = $(this).text().toLowerCase();

      if (contacto.includes(texto)) {
        $(this).stop(true, true).fadeIn(200);
      } else {
        $(this).stop(true, true).fadeOut(200);
      }
    });
  });

  // Mostrar saldo disponible en el modal de transferencia
  function mostrarSaldoTransferencia() {
    const saldoModal = document.getElementById("sendAvailableBalance");

    if (!saldoModal) return;

    // Obtener saldo guardado
    const saldoGuardado = localStorage.getItem("saldo");

    // Convertir a número
    let saldoActual = 0;

    if (saldoGuardado) {
      saldoActual = Number(saldoGuardado.replace(/[^0-9]/g, ""));
    }

    const formatoCLP = new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });

    saldoModal.textContent = formatoCLP.format(saldoActual);
  }

  const modalTransferencia = document.getElementById("sendMoneyModal");

  if (modalTransferencia) {
    modalTransferencia.addEventListener("show.bs.modal", function () {
      mostrarSaldoTransferencia();
    });
  }

  function clearForm() {
    contactName.value = "";
    contactCBU.value = "";
    contactAlias.value = "";
    contactBank.value = "";
  }

  function escapeHtml(unsafe) {
    if (!unsafe && unsafe !== 0) return "";
    return String(unsafe)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderList() {
    const q = searchContact.value.trim().toLowerCase();
    contactList.innerHTML = "";

    const filtered = contacts.filter((c) => {
      if (!q) return true;
      return (
        (c.name || "").toLowerCase().includes(q) ||
        (c.cbu || "").toLowerCase().includes(q) ||
        (c.alias || "").toLowerCase().includes(q) ||
        (c.bank || "").toLowerCase().includes(q)
      );
    });

    if (filtered.length === 0) {
      contactList.innerHTML =
        '<li class="list-group-item text-muted">No hay contactos</li>';
      return;
    }

    filtered.forEach((c) => {
      const li = document.createElement("li");
      li.className = "list-group-item";

      li.innerHTML = `
          <div class="contact-row">
            <div class="contact-info">
              <strong class="contact-name">${escapeHtml(c.name)}</strong>
              <small class="contact-details text-muted">
                CBU: ${escapeHtml(c.cbu || "-")}, Alias: ${escapeHtml(c.alias || "-")}, Banco: ${escapeHtml(c.bank || "-")}
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
      alert("El nombre es obligatorio.");
      contactName.focus();
      return false;
    }

    // Generar id único
    const id = generateId();

    contacts.push({
      id,
      name,
      cbu,
      alias,
      bank,
      createdAt: new Date().toISOString(),
    });
    saveContacts();
    renderList();
    clearForm();
    cargarContactosTransferencia();
    mostrarSaldoTransferencia();
    return true;
  }

  function handleDeleteById(id) {
    if (!confirm("¿Eliminar este contacto?")) return;
    const idx = contacts.findIndex((c) => c.id === id);
    if (idx === -1) return;
    contacts.splice(idx, 1);
    saveContacts();
    renderList();
  }

  function openSendModal(id) {
    const contacto = contacts.find((c) => c.id === id);

    if (!contacto) {
      return;
    }

    const selectContacto = document.getElementById("sendContactSelect");

    if (selectContacto) {
      selectContacto.value = id;
    }

    mostrarSaldoTransferencia();

    const modalElemento = document.getElementById("sendMoneyModal");

    if (modalElemento) {
      const modal = new bootstrap.Modal(modalElemento);
      modal.show();
    }
  }

  function initEventListeners() {
    addContactBtn.addEventListener("click", () => {
      clearForm();
      bootstrapModal.show();
    });

    newContactModalEl.addEventListener("shown.bs.modal", () => {
      contactName.focus();
    });

    modalSaveBtn.addEventListener("click", () => {
      const saved = handleSaveContact();
      if (saved) bootstrapModal.hide();
    });

    modalCancelBtn.addEventListener("click", () => {
      clearForm();
    });

    contactList.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const id = btn.dataset.id;
      if (!id) return;
      if (btn.classList.contains("btn-delete")) {
        handleDeleteById(id);
      } else if (btn.classList.contains("btn-select")) {
        openSendModal(id);
      }
    });

    // confirmar transferencia

    const sendMoneyConfirmBtn = document.getElementById("sendMoneyConfirmBtn");

    if (sendMoneyConfirmBtn) {
      sendMoneyConfirmBtn.addEventListener("click", function () {
        const selectContacto = document.getElementById("sendContactSelect");
        const montoInput = document.getElementById("sendAmountInput");
        const notaInput = document.getElementById("sendNoteInput");
        const error = document.getElementById("sendMoneyError");

        const contactoId = selectContacto.value;
        const monto = parseFloat(montoInput.value);
        const nota = notaInput.value.trim();

        // Validar contacto
        if (!contactoId) {
          error.textContent = "Selecciona un destinatario.";
          error.style.display = "block";
          return;
        }

        // Validar monto
        if (isNaN(monto) || monto <= 0) {
          error.textContent = "Ingresa un monto válido.";
          error.style.display = "block";
          return;
        }

        // Obtener saldo actual
        const saldoGuardado = localStorage.getItem("saldo");

        let saldoActual = 0;

        if (saldoGuardado) {
          saldoActual = Number(saldoGuardado.replace(/[^0-9]/g, ""));
        }

        // Validar saldo suficiente
        if (monto > saldoActual) {
          error.textContent = "Saldo insuficiente.";
          error.style.display = "block";
          return;
        }

        // Buscar contacto seleccionado
        const contacto = contacts.find((c) => c.id === contactoId);

        if (!contacto) {
          error.textContent = "No se encontró el contacto.";
          error.style.display = "block";
          return;
        }

        // Restar saldo
        const nuevoSaldo = saldoActual - monto;

        localStorage.setItem("saldo", nuevoSaldo.toFixed(0));

        // Registrar movimiento
        if (typeof registrarMovimiento === "function") {
          registrarMovimiento(
            "Transferencia",
            `Envío a ${contacto.name}${nota ? " - " + nota : ""}`,
            -monto,
          );
        }

        // Ocultar error
        error.style.display = "none";

        // Actualizar saldo del modal
        mostrarSaldoTransferencia();

        // Limpiar campos
        montoInput.value = "";
        notaInput.value = "";
        selectContacto.value = "";

        alert("Transferencia realizada correctamente");

        // Cerrar modal
        const modalElemento = document.getElementById("sendMoneyModal");

        const modalBootstrap = bootstrap.Modal.getInstance(modalElemento);

        if (modalBootstrap) {
          modalBootstrap.hide();
        }
      });
    }

    // Tecla Enter dentro del modal guarda
    document
      .getElementById("modalContactForm")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
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
    cargarContactosTransferencia();
  })();
}

// RECIBIR DINERO-MENU.HTML

const receiveMoneyConfirmBtn = document.getElementById(
  "receiveMoneyConfirmBtn",
);

if (receiveMoneyConfirmBtn) {
  receiveMoneyConfirmBtn.addEventListener("click", function () {
    const amountInput = document.getElementById("receiveAmountInput");

    const noteInput = document.getElementById("receiveNoteInput");

    const error = document.getElementById("receiveMoneyError");

    const monto = parseFloat(amountInput.value);
    const nota = noteInput.value.trim();

    // Validar monto
    if (isNaN(monto) || monto <= 0) {
      error.textContent = "Ingresa un monto válido.";
      error.style.display = "block";

      return;
    }

    // Obtener saldo actual
    const saldoGuardado = localStorage.getItem("saldo");

    let saldoActual = 0;

    if (saldoGuardado) {
      saldoActual = Number(saldoGuardado.replace(/[^0-9]/g, ""));
    }

    // Sumar dinero recibido
    const nuevoSaldo = saldoActual + monto;

    // Guardar nuevo saldo
    localStorage.setItem("saldo", nuevoSaldo.toFixed(0));

    // Registrar movimiento
    if (typeof registrarMovimiento === "function") {
      registrarMovimiento(
        "Transferencia recibida",
        nota || "Dinero recibido",
        monto,
      );
    }

    // Ocultar errores
    error.style.display = "none";

    // Limpiar campos
    amountInput.value = "";
    noteInput.value = "";

    alert("Dinero recibido correctamente");

    // Cerrar modal
    const modalElemento = document.getElementById("cobrarModal");

    const modalBootstrap = bootstrap.Modal.getInstance(modalElemento);

    if (modalBootstrap) {
      modalBootstrap.hide();
    }

    // Actualizar saldo visible en menu
    const saldoMenu = document.getElementById("saldo");

    if (saldoMenu) {
      const formatoCLP = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
      });

      saldoMenu.textContent = formatoCLP.format(nuevoSaldo);
    }
  });
}
