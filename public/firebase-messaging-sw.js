importScript('https://www.gstatic.com/firebasejs/4.3.0/firebase.js');

        // Initialize Firebase
          var config = {
            apiKey: "AIzaSyAJEoybCdfJoYHeNtce8SQQtkMO2tRsZcU",
            authDomain: "gdgfirebase-59148.firebaseapp.com",
            databaseURL: "https://gdgfirebase-59148.firebaseio.com",
            projectId: "gdgfirebase-59148",
            storageBucket: "gdgfirebase-59148.appspot.com",
            messagingSenderId: "1058237938141"
          };
          firebase.initializeApp(config);
          
          var messaging = firebase.messaging();
             messaging.setBackgroundMessageHandler(function(data) {
            console.log(data); 
          });