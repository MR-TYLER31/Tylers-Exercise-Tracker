count = 0;

// var currentDate = moment().format("L");

function getToday() {
  // Empty any results currently on the page
  $("#new-workout").empty();
  // Grab all of the current notes
  $.get("/all", function(data) {
    // console.log(data);
    // Loop through the workouts

    for (var i = 0; i < 1; i++) {
      //   let last = data.slice(-1);

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
      // Loop through the exercises
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
                    <button class="btn btn-outline-success btn-block my-5" data-toggle="collapse" href="#collapseExample"
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
                                    <button type="submit" class="btn btn-outline-primary btn-block" id="add-workout">Add
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
    // console.log(data);
    for (let i = data.length - 1; i >= 0; i--) {
      count++;
      console.log(count);
      let colDiv = $("<div>");
      colDiv.addClass("col-md-3 text-center");
      $("#prev-workout").append(colDiv);

      let cardDiv = $(
        '<div class="card shadow mb-3" style="background-color: #490691">'
      );
      $(colDiv).append(cardDiv);

      let cardBody = $('<div class="card-body">');
      $(cardDiv).append(cardBody);

      let h2 = $('<h2 class="text-white">');
      h2.addClass("workout-name");
      h2.html(`${data[i].name}`);
      $(cardBody).append(h2);

      let time = $('<h6 class="text-white">');
      time.addClass("workout-name");
      time.html(`${data[i].name.created}`);
      $(cardBody).append(time);

      let viewBtn = $(
        `<button class="btn btn-light btn-block my-5" data-toggle="collapse" href="#exerciseCollapse${count}" role="button" aria-expanded="false" aria-controls="collapseExample">`
      );
      viewBtn.html("View Exercises");
      $(cardBody).append(viewBtn);

      let addBtn = $(
        `<button class="btn btn-outline-light btn-block my-5"  data-toggle="modal" data-target="#add-exercise">`
      );

      addBtn.html("Add Exercise");
      $(cardBody).append(addBtn);

      let item = data[i].exercises;
      for (var j = 0; j < item.length; j++) {
        console.log(item[j]);
        // count++;
        // console.log(count);
        // collapseId = "exerciseCollapse";
        // collapseId = collapseId + 1;
        // console.log(collapseId);
        let cardCollapse = $(
          `<div class="collapse" id="exerciseCollapse${count}">`
        );
        $(viewBtn).append(cardCollapse);

        let h3 = $("<h3>");
        h3.html(`Exercise: ${item[j].exerciseName}`);
        $(cardCollapse).append(h3);

        let set = $("<p>");
        set.html(`Sets: ${item[j].setNum}`);
        $(cardCollapse).append(set);

        let rep = $("<p>");
        rep.html(`Reps: ${item[j].repNum}`);
        $(cardCollapse).append(rep);

        let weight = $("<p>");
        weight.html(`Weight: ${item[j].weight}`);
        $(cardCollapse).append(weight);
      }
    }
  });
}

// $(".add").on("click", function(event) {
//   event.preventDefault();
//   //   let id = $(this).attr("data-id");

//   //   console.log(id);
//   $.ajax("/submit", {
//     type: "POST"
//   }).then(function(resp) {
//     console.log(resp);
//     location.reload();
//   });
// });

getToday();
getPrevious();

//SCROLL SPY

$("body").scrollspy({ target: "#main-nav" });

// Add smooth scrolling
$("#main-nav a").on("click", function(e) {
  // Check for a hash value
  if (this.hash !== "") {
    // Prevent default behavior
    e.preventDefault();

    // Store hash
    const hash = this.hash;

    // Animate smooth scroll
    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top
      },
      900,
      function() {
        // Add hash to URL after scroll
        window.location.hash = hash;
      }
    );
  }
});
