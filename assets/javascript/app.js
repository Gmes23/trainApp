 var config = {
    apiKey: "AIzaSyDIAudfV_iJsHl8BOjLuuRMB28Cd7o0Is8",
    authDomain: "myfirstproject-35c0a.firebaseapp.com",
    databaseURL: "https://myfirstproject-35c0a.firebaseio.com",
    storageBucket: "myfirstproject-35c0a.appspot.com",
    messagingSenderId: "304155538073"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function(){


    var trainName = $("#nameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainArrival = moment($("#firstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyValue").val().trim();

    var newTrain = {
        name:  trainName,
        destination: destination,
        firstTrain: firstTrainArrival,
        frequency: frequency
    }

  
    trainData.ref().push(newTrain);

    alert("Train successfully added");

    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrain").val("");
    $("#frequencyValue").val("");

    
    return false;
});



trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

  
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var frequencyTrain = childSnapshot.val().frequency;
    var firstTrainArrival = childSnapshot.val().firstTrain;



    var differenceTimes = moment().diff(moment(firstTrainArrival), "minutes");
    var remainder = moment().diff(moment(firstTrainArrival), "minutes") % frequencyTrain ;
    var timeActual = frequencyTrain - remainder;

    var trainArrival = moment().add(timeActual, "m").format("hh:mm A"); 
    
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + frequencyTrain + "</td><td>" + trainArrival + "</td><td>" + timeActual + "</td></tr>");

});
