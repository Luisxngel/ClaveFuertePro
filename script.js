// script.js optimizado para ClaveFuertePro

// ===============================
// CONFIGURACIÓN INICIAL
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    // ===============================
    // ANIMACIÓN AL HACER SCROLL
    // ===============================
    const sections = document.querySelectorAll(".hero, section");
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));
  
    // ===============================
    // EFECTO LLUVIA ESTILO MATRIX
    // ===============================
    const canvas = document.createElement("canvas");
    canvas.classList.add("matrix-background");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = canvas.width / 20;
    const yPos = Array.from({ length: cols }).fill(0);
    const chars = "01";
  
    function matrixRain() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = "16px monospace";
      for (let i = 0; i < yPos.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * 20;
        const y = yPos[i] * 20;
        ctx.fillText(text, x, y);
        yPos[i] = y > canvas.height + Math.random() * 10000 ? 0 : yPos[i] + 1;
      }
    }
  
    setInterval(matrixRain, 50);
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  
    // ===============================
    // GENERADOR DE CONTRASEÑAS
    // ===============================
    function generarContrasenaFuerte(longitud = 16) {
      const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
      let contrasena = "";
      for (let i = 0; i < longitud; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres[randomIndex];
      }
      return contrasena;
    }
  
    const passwordInput = document.getElementById("password") || document.getElementById("passwordOutput");
    const btnGenerar = document.getElementById("btnGenerar");
    const btnCopiar = document.getElementById("btnCopiar") || document.getElementById("copiar");
  
    if (btnGenerar && passwordInput) {
      btnGenerar.addEventListener("click", () => {
        const contrasena = generarContrasenaFuerte();
        passwordInput.value = contrasena;
      });
    }
  
    if (btnCopiar && passwordInput) {
      btnCopiar.addEventListener("click", () => {
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(passwordInput.value)
            .then(() => alert("¡Contraseña copiada!"))
            .catch(() => alert("Error al copiar la contraseña."));
        } else {
          passwordInput.select();
          document.execCommand("copy");
          alert("¡Contraseña copiada!");
        }
      });
    }
  
    // ===============================
    // MODALES DE COMPRA Y QR
    // ===============================
    const modal = document.getElementById("modalPago") || document.getElementById("paymentModal");
    const closeModal = document.querySelector(".close");
    const qrSection = document.getElementById("qrSection");
    const yapeBtn = document.getElementById("btnYape") || document.getElementById("yapeBtn");
  
    const botonesComprar = document.querySelectorAll(".btn-comprar");
    botonesComprar.forEach((boton) => {
      boton.addEventListener("click", function (event) {
        event.preventDefault();
        if (modal) modal.style.display = "block";
      });
    });
  
    if (closeModal && modal) {
      closeModal.addEventListener("click", () => (modal.style.display = "none"));
    }
  
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
      if (event.target === document.getElementById("modalQR")) {
        document.getElementById("modalQR").style.display = "none";
      }
    });
  
    if (yapeBtn && qrSection) {
      yapeBtn.addEventListener("click", () => {
        qrSection.style.display = "block";
      });
    }
  
    // ===============================
    // MODAL QR YAPE
    // ===============================
    const modalQR = document.getElementById("modalQR");
    const closeQR = document.querySelector(".closeQR");
  
    if (modalQR && closeQR) {
      closeQR.addEventListener("click", () => {
        modalQR.style.display = "none";
      });
    }
  
    // ===============================
    // PLANES Y PRECIOS
    // ===============================
    const planPrices = {
      basico: 10,
      profesional: 30,
      empresarial: 50,
    };
  
    const selectedPlanAmount = document.getElementById("selectedPlanAmount");
  
    function openPaymentModal(plan) {
      if (modal && selectedPlanAmount) {
        selectedPlanAmount.textContent = `Monto: S/ ${planPrices[plan]}`;
        modal.style.display = "block";
        if (qrSection) qrSection.style.display = "none";
      }
    }
  
    const btnBasico = document.getElementById("btnBasico");
    const btnProfesional = document.getElementById("btnProfesional");
    const btnEmpresarial = document.getElementById("btnEmpresarial");
    const btnComprarAhora = document.getElementById("btnComprarAhora");
  
    if (btnBasico) btnBasico.onclick = () => openPaymentModal("basico");
    if (btnProfesional) btnProfesional.onclick = () => openPaymentModal("profesional");
    if (btnEmpresarial) btnEmpresarial.onclick = () => openPaymentModal("empresarial");
    if (btnComprarAhora) {
      btnComprarAhora.onclick = () => {
        const randomPlan = Object.keys(planPrices)[Math.floor(Math.random() * 3)];
        openPaymentModal(randomPlan);
      };
    }
  });
  
































// Obtener los elementos
const btnBasico = document.getElementById("btnBasico");
const btnProfesional = document.getElementById("btnProfesional");
const btnEmpresarial = document.getElementById("btnEmpresarial");
const modal = document.getElementById("modalCompra");
const cerrarModal = document.getElementById("cerrarModal");
const btnYape = document.getElementById("btnYape");
const btnPayPal = document.getElementById("btnPayPal");
const qrContainer = document.getElementById("qrContainer");
const paypalContainer = document.getElementById("paypalContainer");

// Mostrar modal de compra cuando se hace clic en los botones de compra
btnBasico.addEventListener("click", mostrarModal);
btnProfesional.addEventListener("click", mostrarModal);
btnEmpresarial.addEventListener("click", mostrarModal);

// Función para mostrar el modal
function mostrarModal() {
    modal.style.display = "block";
}

// Cerrar modal
cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Mostrar opciones de pago
btnYape.addEventListener("click", () => {
    qrContainer.style.display = "block";
    paypalContainer.style.display = "none";
});

btnPayPal.addEventListener("click", () => {
    qrContainer.style.display = "none";
    paypalContainer.style.display = "block";
});
















