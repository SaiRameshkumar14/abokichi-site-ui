function placeOrder() {
  document.getElementById("orderPopup").style.display = "flex";
  launchConfetti();
}

function closePopup() {
  document.getElementById("orderPopup").style.display = "none";
}

function launchConfetti() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1002 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      particleCount,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      ...defaults,
    });
  }, 100);
}

let cartCount = 0;

function addToCart() {
  cartCount++;
  document.getElementById("cart-count").textContent = cartCount;
}
