function displayWorkout() {
    const request = new XMLHttpRequest();
    request.open("GET", "/workout", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.responseText);
            const workoutList = document.getElementById("workoutList");
            response.forEach(function (workout) {
                const listItem = document.createElement("li");
                const workoutType = document.createElement("span");
                const workoutSets = document.createElement("span");
                const workoutReps = document.createElement("span");
                const workoutWeight = document.createElement("span");
                const workoutTime = document.createElement("span");
                const originalEntry = document.createElement("span");

                workoutType.innerText = workout.type;
                workoutSets.innerText = `Sets: ${workout.sets}`;
                workoutReps.innerText = `Reps: ${workout.reps}`;
                workoutWeight.innerText = `Weight: ${workout.weight}`;
                workoutTime.innerText = `Time: ${workout.date}`;
                originalEntry.innerText = `User Entry: ${workout.userEntry}`;

                listItem.appendChild(workoutType);
                listItem.appendChild(workoutSets);
                listItem.appendChild(workoutReps);
                listItem.appendChild(workoutWeight);
                listItem.appendChild(workoutTime);
                listItem.appendChild(originalEntry);
                workoutList.appendChild(listItem);
            });
        }
    };
    request.send();
}
displayWorkout();