angular.module('starter.controllers', ['firebase'])
  .controller('HomeCtrl', ['$scope', '$firebaseAuth', '$state', 'SessionData', function($scope, $firebaseAuth, $state, SessionData) {
    $scope.login = {};
    var firebaseObj = new Firebase("https://burning-fire-1723.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);

    $scope.signin = function() {
      var username = $scope.login.username;
      var password = $scope.login.password;

      loginObj.$authWithPassword({
        email: username,
        password: password
      })
      .then(function(user) {
        //Success callback
        // set the username in the SessionData service
        // username get from the form user keyed in.
        SessionData.setUser(username);
        console.log('Authentication successful');
        $state.go('userHome')
   
      }, function(error) {
          //Failure callback
          console.log('Authentication failure');
      });
    }
    // Secondary button on home/login page, point to signUp page
    $scope.showSignUp = function() {
      $state.go('signup');
    }
  }])
  .controller('UserHomeCtrl', ['$scope', '$state', '$firebase', function($scope, $state, $firebase) {
    // Show add wish button on user page
    $scope.showAddWish = function() {
      $state.go('addWish');
    }

    // created a Firebase object using our unique firebase URL.
    // Then we passed the firebaseObj to $firebase
    // which would return the data as an array.
    var firebaseObj = new Firebase("https://blistering-heat-2473.firebaseio.com/MyWish");
    var sync = $firebase(firebaseObj);
    $scope.wishes = sync.$asArray();

  }])
  .controller('SignUpCtrl', ['$scope', '$state', '$firebaseAuth', function($scope, $state, $firebaseAuth) {
    // Primary button on SignUp page, point back to home page for sign in.
    $scope.showSignIn = function() {
      $state.go('home');
    }

    // Create login object
    $scope.login = {};
    // Initialize firebaes object instance
    var firebaseObj = new Firebase("https://burning-fire-1723.firebaseio.com");
    // Use firebaseAuth service to create loginObj, use to authenticate
    var loginObj = $firebaseAuth(firebaseObj);
    // create user function once submit button press(sign up)
    $scope.signup = function(){
      var email = $scope.login.email;
      var password = $scope.login.password;
      // firebase service to create user by passing email & password
      loginObj.$createUser(email, password)
        // promise
        .then(function() {
          // do thing if Success
          console.log('User creation success!');
          $state.go('home');
        }, function(error) {
          // do thing if Failure
          console.log(error);
        });
    }

  }])
  .controller('AddWishCtrl', ['$scope', '$state', '$firebase', 'SessionData', function($scope, $state, $firebase, SessionData) {
    // show user page button
    $scope.showUserHome = function() {
      $state.go('userHome');
    }

    $scope.user = {};
    // add wish function, send wish and save to firebase via $push service
    $scope.add = function() {
      var firebaseObj = new Firebase("https://blistering-heat-2473.firebaseio.com/MyWish");
      var fb = $firebase(firebaseObj);
      var user = SessionData.getUser();

      fb.$push({
        wish: $scope.user.wish,
        email: user
      }).then(function(ref) {
        console.log(ref);
        // clean the add wish's input
        $scope.user.wish = "";
        $state.go('userHome')
      }, function(error) {
        console.log("Error: ", error);
      });
    }
  }])
  .service('SessionData', function() {
    var user = '';

    return {
      getUser: function() {
        return user;
      },
      setUser: function(value) {
        user = value;
      }
    };
  });
