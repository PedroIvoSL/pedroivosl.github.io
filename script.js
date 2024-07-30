document.addEventListener("DOMContentLoaded", function () {
    const blogBtn = document.querySelector(".blogBtn");
    const modal = document.getElementById("passwordModal");
    const closeBtn = document.querySelector(".close");
    const enterBtn = document.getElementById("enterBtn");
  
    blogBtn.addEventListener("click", function (event) {
      event.preventDefault();
      modal.style.display = "block";
    });
  
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    enterBtn.addEventListener("click", function () {
      const password = document.getElementById("passwordInput").value;
      if (password === "senhaSegura") {
        window.location.href = "blog.html";
      } else {
        alert("Senha incorreta. Tente novamente.");
      }
    });
  });
  