function displayType() {
    const request = new XMLHttpRequest();
    request.open("GET", "/type", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          const response = JSON.parse(request.responseText);
          console.log(response);
          var select = document.getElementById("workoutType");
          for (var i = 0; i < response.length; i++) {
            var option = document.createElement("option");
            option.text = response[i].type;
            select.appendChild(option);
          }
        }
      };
      
    request.send();
  }
  
  // Call the function to populate the dropdown list when the page loads
  window.addEventListener("load", displayType);
  