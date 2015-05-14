angular.module('starter.controllers', ['firebase'])
  .controller('HomeCtrl', ['$scope', '$firebaseAuth', '$state', function($scope, $firebaseAuth, $state) {
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
  .controller('UserHomeCtrl', ['$scope', function($scope) {

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
