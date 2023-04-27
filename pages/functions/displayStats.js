function displayStats() {
    const request = new XMLHttpRequest();
    request.open("GET", "/workout", true);
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        const response = JSON.parse(request.responseText);
        const totalWorkouts = document.getElementById("totalWorkouts");
        const totalSets = document.getElementById("totalSets");
        const totalReps = document.getElementById("totalReps");
        const totalWeight = document.getElementById("totalWeight");
        const avgSets = document.getElementById("avgSets");
        const avgReps = document.getElementById("avgReps");
        const avgWeight = document.getElementById("avgWeight");
        let setsCount = 0;
        let repsCount = 0;
        let weightCount = 0;
        let maxWeight = 0;
        let minWeight = Infinity;
  
        // Filter the workouts that were done in the last 24 hours
        const last24Hours = response.filter(function (workout) {
          const workoutDate = new Date(workout.date);
          const now = new Date();
          const hoursAgo = (now.getTime() - workoutDate.getTime()) / (1000 * 60 * 60);
          return hoursAgo <= 24;
        });
  
        last24Hours.forEach(function (workout) {
          setsCount += workout.sets;
          repsCount += workout.reps;
          weightCount += workout.weight;
          if (workout.weight > maxWeight) {
            maxWeight = workout.weight;
          }
          if (workout.weight < minWeight) {
            minWeight = workout.weight;
          }
        });
  
        const numWorkouts = last24Hours.length;
        const avgSetsCount = setsCount / numWorkouts;
        const avgRepsCount = repsCount / numWorkouts;
        const avgWeightCount = weightCount / numWorkouts;
        totalWorkouts.innerText = numWorkouts;
        totalSets.innerText = setsCount;
        totalReps.innerText = repsCount;
        totalWeight.innerText = weightCount;
        avgSets.innerText = avgSetsCount.toFixed(2);
        avgReps.innerText = avgRepsCount.toFixed(2);
        avgWeight.innerText = avgWeightCount.toFixed(2);
        document.getElementById("maxWeight").innerText = maxWeight;
        document.getElementById("minWeight").innerText = minWeight;
      }
    };
    request.send();
  }
  
  displayStats();
  