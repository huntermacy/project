function submitWorkout(event) {
    event.preventDefault();
    const workoutEntry = document.getElementById("workoutEntryId").value;
    document.getElementById("workoutEntryId").value = "";
    const request = new XMLHttpRequest();
    request.open("POST", "/api/openai", true);
    request.setRequestHeader("Content-Type", "application/json");
    const workoutData = { workout: workoutEntry };
    const jsonData = JSON.stringify(workoutData);
    const workoutList = document.getElementById("workoutList");
    const listItem = document.createElement("li");
    listItem.innerText = "Successfully Logged Workout";
    workoutList.appendChild(listItem);
    setTimeout(() => {
        workoutList.removeChild(listItem);
    }, 3000);
    request.send(jsonData);
}