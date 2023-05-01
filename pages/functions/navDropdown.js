const dropdown = document.getElementById("nav-dropdown");

dropdown.addEventListener("change", (event) => {
  const selectedPage = dropdown.value;
  event.preventDefault();
  console.log(selectedPage);
  window.location.href = selectedPage;
});