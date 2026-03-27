document.addEventListener("DOMContentLoaded", () => {
    const obtenerUsuarios = () => JSON.parse(localStorage.getItem("usuarios")) || [];
    const guardarUsuarios = (usuarios) => localStorage.setItem("usuarios", JSON.stringify(usuarios));
    const setSesion = (email) => localStorage.setItem("usuario-email", email);
    const getSesion = () => localStorage.getItem("usuario-email");
    const cerrarSesion = () => {
        localStorage.removeItem("usuario-email");
        window.location.href = "index.html";
    };

    const path = window.location.pathname;

    // LOGIN
    if (path.includes("index.html") || path === "/") {
        document.getElementById("loginform")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const error = document.getElementById("Error-message");

            const usuario = obtenerUsuarios().find(u => u.email === email && u.password === password);

            if (usuario) {
                setSesion(email);
                window.location.href = "bienvenida.html";
            } else {
                error.textContent = "Credenciales incorrectas";
            }
        });
    }

    // REGISTRO
    if (path.includes("registro.html")) {
        document.getElementById("registroForm")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("pasword").value.trim();

            if (!nombre || !email || !password) {
                return alert("Todos los campos son requeridos");
            }

            let usuarios = obtenerUsuarios();
            if (usuarios.some(u => u.email === email)) {
                return alert("El usuario ya existe");
            }

            usuarios.push({ nombre, email, password });
            guardarUsuarios(usuarios);
            setSesion(email);

            alert("Registro exitoso");
            e.target.reset();
            window.location.href = "index.html";
        });

        document.getElementById("logout")?.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    // BIENVENIDA
    if (path.includes("bienvenida.html")) {
        const email = getSesion();
        if (!email) {
            return window.location.href = "index.html";
        }
        const usuario = obtenerUsuarios().find(u => u.email === email);
        if (usuario) {
            document.getElementById("Nombre-usuario").textContent = usuario.nombre;
        }

        document.getElementById("logout")?.addEventListener("click", cerrarSesion);
    }
});