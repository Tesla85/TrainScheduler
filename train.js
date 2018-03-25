var config = {
    apiKey: "AIzaSyBHeZnl_pL15dq-AP_aRjXl5m6hI4RYmQo",
    authDomain: "trainscheduler-367f9.firebaseapp.com",
    databaseURL: "https://trainscheduler-367f9.firebaseio.com",
    projectId: "trainscheduler-367f9",
    storageBucket: "trainscheduler-367f9.appspot.com",
    messagingSenderId: "755678538722"
      };
    firebase.initializeApp(config);

var database = firebase.database();

$(".add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trName = $(".train-name-input").val().trim();
  var trDestination = $(".destination-input").val().trim();
  var trStart = moment($(".start-input").val().trim(), "HH:mm military-time").format("X");
  var trFreq = $(".freq-input").val().trim();

  //

  var newTr = {
    name: trName,
    destination: trDestination,
    start: trStart,
    freq: trFreq,
    // nextArrive: trNextArrive,
    // minAway: trMinAway
  };
 
  database.ref().push(newTr);

  console.log(newTr.name);
  console.log(newTr.destination);
  console.log(newTr.start);
  console.log(newTr.freq);

  alert("Train Scheduled");

  $(".train-name-input").val("");
  $(".destination-input").val("");
  $(".start-input").val("");
  $(".freq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trName = childSnapshot.val().name;
  var trDestination = childSnapshot.val().destination;
  var trStart = childSnapshot.val().start;
  var trFreq = childSnapshot.val().freq;
  var trNextArrive = childSnapshot.val().nextArrive;
  var trMinAway = childSnapshot.val().minAway;

  // train Info
  console.log(trName);
  console.log(trDestination);
  console.log(trStart);
  console.log(trFreq);

  // Prettify the train start
  var trStartPretty = moment.unix(trStart).format("HH:mm military time");

  var currentTime = moment();


  trStart = $(".start-input").val("");

  var diffTime = moment().diff(moment(trStart), "minutes");

  // Time apart (remainder)
  var trRemainder = diffTime % trFreq;
  console.log(trRemainder);


  trNextArrive = moment().add(trMinAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(trNextArrive).format("hh:mm"));

  trMinAway = trFreq - trRemainder;
  console.log("MINUTES TILL TRAIN: " + trMinAway);


  // Add each train's data into the table
  $(".train-table > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" +
  trFreq + "</td><td>" + trNextArrive + "</td><td>" + trMinAway + "</td>");
});
