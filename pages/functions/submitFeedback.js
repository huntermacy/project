function insertFeedback(event) {
    event.preventDefault();
    const feedback = document.getElementById("submitFeedback").value;
    document.getElementById("submitFeedback").value = "";
    if (feedback != "") {
        const request = new XMLHttpRequest();
        request.open("POST", "/api/feedback", true);
        request.setRequestHeader("Content-Type", "application/json");
        const feedbackData = { feedback: feedback, date: new Date() };
        const jsonData = JSON.stringify(feedbackData);
        const feedbackConfirm = document.getElementById("feedbackConfirm");
        const listItem = document.createElement("li");
        listItem.innerText = "Feedback Submitted";
        feedbackConfirm.appendChild(listItem);
        setTimeout(() => {
          feedbackConfirm.removeChild(listItem);
        }, 3000);
    
        request.addEventListener("error", (error) => {
          console.log("An error occurred:", error);
        });
    
        request.send(jsonData);
      } else {
        const feedbackConfirm = document.getElementById("feedbackConfirm");
        const listItem = document.createElement("li");
        listItem.innerText = "Please Submit Valid Feedback";
        feedbackConfirm.appendChild(listItem);
        setTimeout(() => {
          feedbackConfirm.removeChild(listItem);
        }, 3000);
      }

  }