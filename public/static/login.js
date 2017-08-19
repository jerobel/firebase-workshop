//event handler for facebook button
$('.facebook').on('click', function(e){
  
    //comes with firebase
    var provider = new firebase.auth.FacebookAuthProvider();
   
    //then executes function after user login.
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        alert("Welcome " + user.displayName);
    },
        function(error){
         $('.error').text(error.message);
    });
});


//event handler for facebook button
$('.google').on('click', function(e){
  
    //comes with firebase
    var provider = new firebase.auth.GoogleAuthProvider();
   
    //then executes function after user login.
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        alert("Welcome " + user.displayName);
    },
        function(error){
         $('.error').text(error.message);
    });
});


firebase.auth().onAuthStateChanged(function(user){
    if(user){
      window.location = '/';
    } else {
       console.log("Please login.");
    }
})

