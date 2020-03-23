function getToday() {
  // Empty any results currently on the page
  $("#new-workout").empty();
  // Grab all of the current notes
  $.get("/all", function(data) {
    // For each note...
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
      let colDiv = $("<div>");
      colDiv.addClass("col-md-12 text-center");
      $("#new-workout").append(colDiv);

      let h1 = $("<h1>");
      h1.html("Todays Workout");
      $(colDiv).append(h1);

      let h2 = $("<h2>");
      h2.addClass("workout-name");
      h2.html(`${data[i].name}`);
      h1.append(h2);

      let item = data[i].exercises;
      for (var j = 0; j < item.length; j++) {
        console.log(item[j]);

        let h3 = $("<h3>");
        h3.html(`Exercise: ${item[j].exerciseName}`);
        $(colDiv).append(h3);

        let set = $("<p>");
        set.html(`Sets: ${item[j].setNum}`);
        $(colDiv).append(set);

        let rep = $("<p>");
        rep.html(`Reps: ${item[j].repNum}`);
        $(colDiv).append(rep);

        let weight = $("<p>");
        weight.html(`Weight: ${item[j].weight}`);
        $(colDiv).append(weight);
      }
    }

    $("#add-new").append(`
     <div class="col-md-12">
                    <button class="btn btn-success btn-block my-5" data-toggle="collapse" href="#collapseExample"
                        role="button" aria-expanded="false" aria-controls="collapseExample">add new exercise</button>
                    <div class="collapse" id="collapseExample">
                        <div class="card">
                            <div class="card-body">
                                <form action="/submit" method="POST" id="workout-form">
                                    <div class="form-group">
                                        <input type="text" name="exerciseName" class="form-control" id="exercise-name"
                                            placeholder="Enter Exercise">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="setNum" class="form-control" id="set-number"
                                            placeholder="Enter Sets">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="repNum" class="form-control" id="rep-number"
                                            placeholder="Enter Reps">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="weight" class="form-control" id="weight"
                                            placeholder="Enter Weight in Pounds">
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-block" id="add-workout">Add
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
    `);
  });
}

function getPrevious() {
  // Empty any results currently on the page
  $("#prev-workout").empty();
  // Grab all of the current notes
  $.get("/all", function(data) {
    // For each note...
    console.log(data);
    for (var i = 1; i < data.length; i++) {
      let colDiv = $("<div>");
      colDiv.addClass("col-md-12 text-center");
      $("#prev-workout").append(colDiv);

      let h1 = $("<h1>");
      h1.html("Yesterdays Workout");
      $(colDiv).append(h1);

      let h2 = $("<h2>");
      h2.addClass("workout-name");
      h2.html(`${data[i].name}`);
      h1.append(h2);

      let item = data[i].exercises;
      for (var j = 0; j < item.length; j++) {
        console.log(item[j]);

        let h3 = $("<h3>");
        h3.html(`Exercise: ${item[j].exerciseName}`);
        $(colDiv).append(h3);

        let set = $("<p>");
        set.html(`Sets: ${item[j].setNum}`);
        $(colDiv).append(set);

        let rep = $("<p>");
        rep.html(`Reps: ${item[j].repNum}`);
        $(colDiv).append(rep);

        let weight = $("<p>");
        weight.html(`Weight: ${item[j].weight}`);
        $(colDiv).append(weight);
      }
    }
  });
}

getToday();
getPrevious();
