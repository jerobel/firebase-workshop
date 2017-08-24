var database = firebase.database();
var currentUser = null;

// =================================================
// Check if user is login
//=================================================
    firebase.auth().onAuthStateChanged(function(user){
       if (!user) {
           window.location = '/login.html';
       } else {
           //Execute code if the user if login
           $('form img').attr('src', user.photoURL);
           currentUser = user;
       }
    });
    
    //=================================================
// LOGOUT
//=================================================
    

//set global
var messageRef = database.ref('messages');

//Every data is need reference
$('.send-btn').on('click', function(e){
    //prevent default behavior of submit button.
    e.preventDefault();
    
    //get the message value from the index.html form
    var message = $('.input-message').val();
    
    messageRef.push({
        messageBody: message,
        user: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
        }
    });
    
});


messageRef.on('child_added', function(snapshot){
    
    //append the message from firebase databse. 
    var data = snapshot.val();
    var container = $('.messages');
    var isSelf = (data.user.uid == currentUser.uid) ? 'self' : '';
    
    //this code access the file upload function below==============================================================
    var content = (data.messageBody) ? '<p>' + data.messageBody + '</p>' : '<img src="' + data.messageImage + '" />';
    //==============================================================================================================
    
    var template = '' +
     '<li class="message ' + isSelf + '">' +
         '<header>' +
            '<img src="' + data.user.photoURL +'" alt="Dummy User">' +
            '<h2>' + data.user.displayName +'</h2>' + 
            '<button class="delete-btn"></button>' +
         '</header>' +
         content +
        '</li>';
    
    container.prepend(template);
});

//Upload script to firebase storage
$('.file-input').on('change', function(e){
    var file = e.target.files[0];
    var storage = firebase.storage();
    
    var metadata = {
        contentType: 'image/jpeg'
    }
    
    var storageRef = storage.ref();
    var uploadTask = storageRef.child('image/' + file.name).put(file, metadata);
    
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
    function(snapshot){
         //TODO do something here
    }, function(error){
         //TODO do something here   
    }, function(){
        var imageURL = uploadTask.snapshot.downloadURL;
            messageRef.push({
            messageImage: imageURL,
            user: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            }
        });
    });
});


$('.logout-btn').on('click', function(e){
    firebase.auth().signOut();
});

//===== CLOUD MESSING ========by Arnelle Balane============

var messaging = firebase.messaging();

$('.notification-btn').on('click', function(){
    
        messaging.requestPermission()
            .then(function() {
                alert("Permission granted");
                   
                messaging.getToken().then(function(token) {
                    console.log(token);
                        
                        //save data to database
                        database.ref('subscriptions/' + currentUser.uid).set(token);
                 }); 
              })
               .catch(function() {
                   console.log("Permission dennied");
            });
   
        });
        
        messaging.onMessage(function(data) {
            console.log('[onMessage] receive a message')
            console.log(data);
        });
        
        $.ajax({
            url: "https://fcm.googleapis.com/fcm/send",
            method : 'POST',
            header: {
                'Athorization' : 'key=AAAA9mPled0:APA91bHjrLdxVGZMQe_HSzaBGQYF0OfC4W0QbaEJNJ6BEWN9FhHvZxVrcgFAUpmHklSkoN2zOxSXKwSCs2toK2thhUmN0wVNPO1qYQJSG-t4dPnCeDaBPBkODMS52cA4ny0k0W1ZXmtZ',
                'Content-Type' : 'application/json'
            },
            data : JSON.stringify({
                          "notification" : { 
                         "title" : "firebase workshop",
                        "body" : "sdsadsad",
                        "icon" : "asdsad",
                        "click_action" : "http://playground-gjerobs.c9users.io:8080/"
                    },
                    "to" : "" //TODO current token from service worker provided.
                })   
        });