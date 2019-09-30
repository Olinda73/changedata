$(document).ready(function () {
	// Your web app's Firebase configuration
	var firebaseConfig = {
		apiKey: "AIzaSyCFx6EEPuadPlNmiWDpXJZmo5jifmakrhk",
		authDomain: "nbc-changemanagement.firebaseapp.com",
		databaseURL: "https://nbc-changemanagement.firebaseio.com",
		projectId: "nbc-changemanagement",
		storageBucket: "nbc-changemanagement.appspot.com",
		messagingSenderId: "230090365679",
		appId: "1:230090365679:web:36c2f650f6b3ab561ed91a",
		measurementId: "G-7P5XXLMPFF"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	database = firebase.database();

	$('#submit-employee').on('click', function () {
		event.preventDefault();
		name = $('#inputname').val().trim();
		changerequested = $('#change-requested').val().trim();
		changetype = $('#change-type').val().trim();
		status = $('#status').val().trim();
		priority = $('#priority').val().trim();
		impact = $('#impact').val().trim();
		risk = $('#risk').val().trim();
		group = $('#group').val().trim();
		agent = $('#agent').val().trim();
		description = $('#description').val().trim();
		startdate = $('#employee-startdate').val().trim();
		enddate = $('#employee-enddate').val().trim();


		database.ref().push({
			name: name,
			changerequested: changerequested,
			changetype: changetype,
			status: status,
			priority: priority,
			impact: impact,
			group: group,
			agent: agent,
			description: description,
			startdate: startdate,
			enddate: enddate,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});

		$('#inputname').val('');
		$('#change-requested').val('');
		$('#change-type').val('');
		$('#status').val('');
		$('#priority').val('');
		$('#impact').val('');
		$('#group').val('');
		$('#agent').val('');
		$('#description').val('');
		$('#employee-startdate').val('');
		$('#employee-enddate').val('');


	});

	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var today = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day
	console.log(today)

	database.ref().on("child_added", function (snapshot) {
		snapVal = snapshot.val();
		newRow = $('<div>').addClass('employee row');
		nameCol = $('<div class="col-xs-2">' + snapVal.name + '</div>');
		changerequestedCol = $('<div class="col-xs-2">' + snapVal.changerequested + '</div>');
		changetypeCol = $('<div class="col-xs-2">' + snapVal.changetype + '</div>');
		statusCol = $('<div class="col-xs-2">' + snapVal.status + '</div>');
		priorityCol = $('<div class="col-xs-2">' + snapVal.priority + '</div>');
		impactCol = $('<div class="col-xs-2">' + snapVal.impact + '</div>');
		groupCol = $('<div class="col-xs-2">' + snapVal.group + '</div>');
		agentCol = $('<div class="col-xs-2">' + snapVal.agent + '</div>');
		descriptionCol = $('<div class="col-xs-2">' + snapVal.description + '</div>');
		dateCol = $('<div class="col-xs-2">' + snapVal.startdate + '</div>');
		enddateCol = $('<div class="col-xs-2">' + snapVal.enddate + '</div>');

		convertedDate = moment(snapVal.startdate, "MM/DD/YYY");
		convertedendDate = moment(snapVal.enddate, "MM/DD/YYYY");
	
		newRow.append(nameCol);
		newRow.append(changerequestedCol);
		newRow.append(changetype);
		newRow.append(status);
		newRow.append(priority);
		newRow.append(impact);
		newRow.append(group);
		newRow.append(agent);
		newRow.append(description);
		newRow.append(dateCol);
		newRow.append(enddateCol);



		$('#employee-container').append(newRow);
	});
});



