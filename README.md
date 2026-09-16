# Alke Wallet

Alke Wallet es una billetera digital desarrollada como proyecto del **Módulo 2: Fundamentos del Desarrollo Front-end**.

El objetivo del proyecto es crear una aplicación web funcional y fácil de usar que permita simular la administración de fondos, realizar diferentes operaciones y consultar los movimientos realizados.

## Funcionalidades

La aplicación permite:

- Registrar nuevos usuarios.
- Iniciar sesión con usuarios registrados.
- Recordar el correo del usuario.
- Mostrar y ocultar la contraseña.
- Visualizar y ocultar el saldo disponible.
- Ingresar dinero a la cuenta.
- Retirar dinero.
- Transferir dinero a contactos.
- Recibir dinero.
- Buscar y agregar contactos.
- Consultar el historial de movimientos.
- Registrar depósitos, transferencias, retiros y dinero recibido.
- Actualizar el saldo después de realizar operaciones.
- Mantener información utilizando localStorage.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- jQuery
- localStorage

Bootstrap fue utilizado para crear componentes de la interfaz y apoyar el diseño responsive.

JavaScript permite gestionar las principales funcionalidades de la billetera, mientras que jQuery se utiliza para agregar interacciones, efectos visuales y mejorar la experiencia del usuario.

## Estructura del proyecto

```text
wallet/
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   └── js/
│       └── script.js
│
├── login.html
├── menu.html
├── deposit.html
├── sendmoney.html
├── transactions.html
└── README.md
```

## Pantallas principales

### Login

Permite iniciar sesión, registrar nuevos usuarios y utilizar la opción "Recuérdame".

### Menú principal

Muestra el saldo disponible y permite acceder a las principales operaciones de Alke Wallet.

### Depósito

Permite ingresar dinero y actualizar el saldo disponible.

### Enviar dinero

Permite buscar contactos, agregar nuevos contactos y simular transferencias.

### Movimientos

Permite consultar las operaciones realizadas y visualizar ingresos y egresos.

## Persistencia de datos

El proyecto utiliza `localStorage` para simular la persistencia de información en el navegador, incluyendo usuarios, saldo, contactos y movimientos.

Por tratarse de un proyecto Front-end educativo, no utiliza una base de datos ni un servidor para almacenar la información.

## Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir `login.html` utilizando Live Server.
4. Crear una cuenta o iniciar sesión.
5. Navegar por las diferentes funcionalidades de Alke Wallet.

## Control de versiones

El proyecto utiliza Git y GitHub para el control de versiones.

Durante el desarrollo se utilizaron ramas para trabajar las mejoras del proyecto y Pull Requests para integrar los cambios a la rama principal.

## Autor

**Estefania Valenzuela**

Proyecto desarrollado como parte de la formación en Desarrollo de Software.
