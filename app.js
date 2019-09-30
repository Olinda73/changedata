$(document).ready(function(){   
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
    
    $('#submit-employee').on('click',function(){
        event.preventDefault();
        name = $('#inputname').val().trim();
        changerequested = $('#change-requested').val().trim();
      startdate = $('#employee-startdate').val().trim();
      enddate = $('#employee-enddate').val().trim();  
        monthlyrate = $('#employee-monthlyrate').val().trim();
  
        database.ref().push({
            name : name,
            changerequested : changerequested,
          startdate : startdate,
          enddate : enddate,
            monthlyrate : monthlyrate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
  
        $('#inputname').val('');
        $('#change-requested').val('');
      $('#employee-startdate').val('');
      $('#employee-enddate').val('');
        $('#employee-monthlyrate').val('');
  
    });
  
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var today = d.getFullYear() + '-' +  (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day 
  console.log(today)
  
    database.ref().on("child_added",function(snapshot){
        snapVal = snapshot.val();
        newRow = $('<div>').addClass('employee row');
        nameCol = $('<div class="col-xs-2">'+snapVal.name+'</div>');
         changerequestedCol = $('<div class="col-xs-2">'+snapVal.changerequested+'</div>');
        dateCol = $('<div class="col-xs-2">'+snapVal.startdate+'</div>');
        enddateCol = $('<div class="col-xs-2">'+snapVal.enddate+'</div>');
      
      convertedDate = moment(snapVal.startdate, "MM/DD/YYYY");
      convertedendDate = moment(snapVal.enddate, "MM/DD/YYYY");
      monthsDuration = moment(convertedDate).diff(moment(), "months");
  
      monthsDuration *= -1
  
      monthsWorkedCol = $('<div class="col-xs-2">'+monthsDuration+'</div>');
        
        rateCol = $('<div class="col-xs-2">'+snapVal.monthlyrate+'</div>');
        
        var billed = parseInt(snapVal.monthlyrate * monthsDuration);
      
      billedCol = $('<div class="col-xs-2">'+billed+'</div>')
  
      newRow.append(nameCol);
      newRow.append(changerequestedCol);
      newRow.append(dateCol);
      newRow.append(enddateCol);
      newRow.append(monthsWorkedCol);
      newRow.append(rateCol);
      newRow.append(billedCol);
  
  
        $('#employee-container').append(newRow);
    });
   });
  
  
  
  

