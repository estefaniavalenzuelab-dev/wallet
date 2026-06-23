//login y registro
const form = document.getElementById('login');
    if(form) {
        form.addEventListener('submit', function(evento) {
            evento.preventDefault();
            const usuario = document.getElementById('Email').value;
            const contrasena = document.getElementById('Password').value;

            //login admin
            if (usuario === "admin@gmail.com" && contrasena === "wm3") {
                alert("inicio de sesión exitoso");
                window.location.replace("menu.html");
            } else {
                alert("Correo o contraseña incorrectos");
            }
        });
    }

    const goRegistrer = document.getElementById("goRegistrer");
    const Login = document.getElementById("login");

    //botones y redireccionar (menú)

    //mostrar y ocultar saldo en menu
    const btnMostrarSaldo = document.getElementById('btnMostrarSaldo');
    const saldo = document.getElementById('saldo');
    let mostrarSaldo = false;
    const saldoReal = "$0";

btnMostrarSaldo.addEventListener('click', function() {
    mostrarSaldo = !mostrarSaldo;
    
    if(mostrarSaldo) {
        saldo.textContent = saldoReal;
        saldo.classList.remove('saldo-oculto');
    } else {
        saldo.textContent = '****';
        saldo.classList.add('saldo-oculto');
    }
});

//notificaciones beneficios y Tarjeta credito
window.addEventListener('load', function() {
    const toasts = document.querySelectorAll('.toast');
     toasts.forEach((toastElement, index) => {
        // Mostrar cada toast con un delay
        setTimeout(() => {
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }, index * 2000); // 2 segundos entre cada uno
    });
});




//deposit.html
window.addEventListener('load', function() {
    const saldoElemento = document.getElementById('saldo');

    if(saldoElemento) {
        let saldo = localStorage.getItem('saldo') || '$0.00';
        saldoElemento.textContent = saldo;
    }
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach((toastElement, index) => {
        setTimeout(() => {
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        }, index * 2000);
    });
});

//mostrar y ocultar saldo
const btnMostrarSaldo = document.getElementById('btnMostrarSaldo');
if(btnMostrarSaldo) {
    let mostrarSaldo = false;

    btnMostrarSaldo.addEventListener('click', function() {
        const saldoElemento = document.getElementById('saldo');
        let saldoReal = localStorage.getItem('saldo') || '$0.00';

        mostrarSaldo = !mostrarSaldo;

        if(mostrarSaldo) {
            saldoElemento.textContent = saldoReal;
            saldoElemento.classList.remove('saldo-oculto');
        } else {
            saldoElemento.textContent = '****';
            saldoElemento.classList.add('saldo-oculto');
        }
    });
}

//deposito
const cantidadInput = document.getElementById('cantidadInput');
const bntSumar = document.getElementById('btnSumar');

if(bntSumar) {
    bntSumar.addEventListener('click', function(event) {
        event.preventDefault();
        let saldoActual = parseFloat(localStorage.getItem('saldo')) || 0;
        let cantidadIngresada = parseFloat(cantidadInput.value);


        if(!isNaN(cantidadIngresada) && cantidadIngresada > 0) {
            let nuevoSaldo = saldoActual + cantidadIngresada;

            localStorage.setItem('saldo', '$' + nuevoSaldo.toFixed(2));
            cantidadInput.value = '';

            alert
        }
    })
}

/*
//elemento del dom
const saldoElemento = document.getElementById('saldoElemento');
const cantidadInput = document.getElementById('cantidadInput');
const btnSumar = document.getElementById('btnSumar');

//evento click en el botón
btnSumar.addEventListener('click', function(event) {
    event.preventDefault();
    let saldoActual = parseFloat(localStorage.getItem(saldo)) || 0;
    let cantidadIngresada = parseFloat(cantidadInput.value);

    
    //verificacion de si el numero es valido
    if(!isNaN(cantidadIngresada) && cantidadIngresada > 0) {
        let nuevoSaldo = saldoActual + cantidadIngresada;
        saldoElemento.textContent = nuevoSaldo.toFixed(2);
        cantidadInput.value = '';

        alert('Depósito realizado con éxito!');
        setTimeout(function() {
            window.location.href = "menu.htmlss";
        },1500);
    } else {
        alert('Por favor, ingresa un monto válido.');
    }

});
*/