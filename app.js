function login() {
  const key = document.getElementById("keyInput").value.trim();

  if (key === "") {
    alert("Zəhmət olmasa key daxil et");
    return;
  }

  // Sadə yoxlama (istəsən sonra gücləndirərik)
  if (key === "1234") {
    // Giriş uğurlu → oyuna keç
    window.location.href = "game.html";
  } else {
    alert("Key yanlışdır");
  }
}