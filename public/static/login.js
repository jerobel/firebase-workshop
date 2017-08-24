//event handler for facebook button
$('.facebook').on('click', function(e){
  
    //comes with firebase
    var provider = new firebase.auth.FacebookAuthProvider();
   
    //then executes function after user login.
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        console.log("Welcome " + user.displayName);
    },
        function(error){
         $('.error').text(error.message);
    });
});


// //event handler for facebook button
// $('.google').on('click', function(e){
//         //comes with firebase
//         var provider = new firebase.auth.GoogleAuthProvider();
       
//         //then executes function after user login.
//         firebase.auth().signInWithPopup(provider).then(function(result) {
//             var user = result.user;
//             console.log("Welcome " + user.displayName);
//             $('.error').text('');
//         }
//             function(error){
//              $('.error').text(error.message);
//     });
// });


$('.google').on('click', function(e){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result){
        var user = result.user;
        console.log("Welcome" + user.displayName);
        $('.error').text('');
    }, function(error){
        $('.error').text(error.message);
    });
});


firebase.auth().onAuthStateChanged(function(user){
    if(user){
      window.location = '/index.html';
    } else {
      console.log("Please login.");
    }
});

// //=====================Arnelle============================================


// var db = firebase.database();
// var userref = db.ref('/users');

// var login = {
//     init: function() {
//         firebase.auth().onAuthStateChanged(function(user) {
//             if (user) {
//                 var userRef = db.ref('/users/' + user.uid);
//                 // Take a static snapshot of the value
//                 // to check if its present or not
//                 userRef.once('value').then(function(data) {
//                     if (data.val() == null) {
//                         userRef.set({
//                             'name': user.displayName || 'no name',
//                             'photoURL': user.photoURL || 'https://randomuser.me/api/portraits/men/79.jpg',
//                             'email': user.email
//                         });
//                     }
//                     window.location = '/';
//                 });
//             } else {
//                 $('.login-section').removeClass('hidden');
//             }
//         });
//         this.enableSocialSignIn();
//         this.enableEmailSignUp();
//         this.enableEmailSignIn();
//     },

//     enableEmailSignUp: function() {
//         var form = $('.signup-form');
//         form.on('submit', function(e) {
//             e.preventDefault();
//             var email  = form.find('input[name="email"]').val();
//             var password = form.find('input[name="password"]').val();
//             firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
//                 $('.error').text('');
//             }).catch(function(error) {
//                 var message = error.message;
//                 $('.error').text(message);
//             });
//         });
//     },

//     enableEmailSignIn: function() {
//         var form = $('.signin-form');
//         form.on('submit', function(e) {
//             e.preventDefault();
//             var email  = form.find('input[name="email"]').val();
//             var password = form.find('input[name="password"]').val();
//             firebase.auth().signInWithEmailAndPassword(email, password).catch(
//                 function(error) {
//                 var message = error.message;
//                 $('.error').text(message);
//             }).then(function(user) {
//                 if (user) {
//                     $('.error').text('');
//                 }
//             });
//         });
//     },

//     enableSocialSignIn: function() {
//         $('.social-signins li').on('click', function(e) {
//             if ($(this).hasClass('facebook')) {
//                 var provider = new firebase.auth.FacebookAuthProvider();
//             } else {
//                 provider = new firebase.auth.GoogleAuthProvider();
//             }
//             firebase.auth().signInWithPopup(provider).then(function(result) {
//                 var user = result.user;
//                 if (user) {
//                     console.log('wecome', user.email);
//                     $('.error').text('');
//                 }
//             }, function(error) {
//                 var message = error.message;
//                 $('.error').text(message);
//             });

//         });
//     },
// }

// login.init()