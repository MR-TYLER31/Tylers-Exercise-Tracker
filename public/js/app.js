function getResults() {
  // Empty any results currently on the page
  $("#new-workout").empty();
  // Grab all of the current notes
  $.get("/all", function(data) {
    // For each note...
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      // ...populate #results with a p-tag that includes the note's title and object id
      $("#new-workout").prepend(`
      <div class="col-md-12 text-center">
    
        <p>${data[i].date}</p>
      <h2>Work out: ${data[i].name}</h2>
      <h3>Exercises: ${data[i].exercises[i].exerciseName}</h3>
      <p>Sets: ${data[i].exercises[i].setNum}</p>
      <p>Reps: ${data[i].exercises[i].repNum}</p>
      <p>Weight: ${data[i].exercises[i].weight}</p>
      
      </div>`);
    }
  });
}

getResults();
