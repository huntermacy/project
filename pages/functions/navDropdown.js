const dropdown = document.getElementById("nav-dropdown");
dropdown.addEventListener("change", (event) => {
  event.preventDefault();
  const selectedPage = dropdown.value;
  console.log(selectedPage);
  window.location.href = selectedPage;
});
