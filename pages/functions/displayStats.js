function displayStats() {
    const request = new XMLHttpRequest();
    request.open("GET", "/workout", true);
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        const response = JSON.parse(request.responseText);
        const logsToday = document.getElementById("logsToday");
        const totalWeight = document.getElementById("totalWeight");
        const maxPushUps = document.getElementById("maxPushUps");
        const focusArea = document.getElementById("focusArea");
        const futureArea = document.getElementById("futureArea");
        let logsTodayCount = 0;
        let totalWeightCount = 0;
        let maxPushUpsCount = 0;
        let focusAreaCount = {};
        let futureAreaCount = {};
    

        
        const lastWeek = response.filter(function (workout) {
            const workoutDate = new Date(workout.date);
            const now = new Date();
            const hoursAgo = (now.getTime() - workoutDate.getTime()) / (1000 * 60 * 60);
            return hoursAgo <= 24*7;
        });
        
        // Calculate statistics for each workout
        lastWeek.forEach(function (workout) {
            logsTodayCount++;

            // Calculate total weight
            if (workout.weight && workout.reps && workout.sets) {
                totalWeightCount += workout.weight * workout.reps * workout.sets;
            }
        
            // Calculate max pushups
            if (workout.type === 'push-ups' && workout.reps > maxPushUpsCount) {
                maxPushUpsCount = workout.reps;
            }
        
            // Calculate focus area
            if (focusAreaCount[workout.type]) {
                focusAreaCount[workout.type]++;
            } else {
                focusAreaCount[workout.type] = 1;
            }

            // Calculate focus area
            if (futureAreaCount[workout.type]) {
                futureAreaCount[workout.type]++;
            } else {
                futureAreaCount[workout.type] = 1;
            }
        });
        // create an array of key-value pairs from the object
        const sortedFocusAreaCount = Object.entries(focusAreaCount);
        const sortedFutureAreaCount = Object.entries(focusAreaCount);

        // sort the array by value in descending order
        sortedFocusAreaCount.sort((a, b) => b[1] - a[1]);
        sortedFutureAreaCount.sort((a, b) => a[1] - b[1]);

        // create a new object from the sorted array
        const focusAreaCountSorted = Object.fromEntries(sortedFocusAreaCount);
        const [topFocusArea, topCount] = Object.entries(focusAreaCountSorted)[0];
        const futureAreaCountSorted = Object.fromEntries(sortedFutureAreaCount);
        const [topFutureArea, topCount2] = Object.entries(futureAreaCountSorted)[0];

        console.log(topFocusArea)
        console.log(topFutureArea)


        // Display the statistics on the page
        logsToday.innerHTML = logsTodayCount;
        totalWeight.innerHTML = totalWeightCount;
        maxPushUps.innerHTML = maxPushUpsCount;
        focusArea.innerHTML = topFocusArea;
        futureArea.innerHTML = topFutureArea;
      }
    };
    request.send();
  }
  
  displayStats();
  