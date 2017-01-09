angular
  .module('FriendsController', ['ngRoute', 'solo.ItinFactory', 'UserFactory', 'HttpFactory', 'ParamsFactory'])
  .controller('FriendsController', controller);

function controller($scope, ItinFactory, UserFactory, HttpFactory, $window, ParamsFactory) {
  $scope.username = UserFactory.username;
  $scope.friend = '';
  $scope.friendMessage = '';
  $scope.friendSuccess =  {visibility: 'hidden'};

  HttpFactory.getFriends(UserFactory.username).then((friends) =>{
    $scope.friends = friends;
  });

  if(!Array.isArray($scope.friends)) $scope.friends = [];

  $scope.findFriend = findFriend;
  $scope.addFriendHandler = addFriendHandler;


  function addFriendHandler(){
    if($scope.friend){
      HttpFactory.addFriend($scope.friend);
      addFriend();
    }
  }

  function addFriend(){
    $scope.friendSuccess = {visibility: 'hidden'};
    //Need a dynamic effect
    $scope.friends.push({username: $scope.friend.username, zip: $scope.friend.zip});
    $scope.friend = '';
  }

  function findFriend(friend){
    $scope.inputFriend = '';
    HttpFactory.findFriend(friend)
    .then((result) =>{
      if(result === 'exists'){
        //should tell the user that they are already friends with this person
      }else if(result){
        $scope.friendSuccess = {visibility: 'visible', border: '1px solid white',
          backgroundColor: 'green', cursor: 'pointer'};
        $scope.friend = result;
        $scope.friendMessage = ` Add ${friend}`;
      }else{
        $scope.friendSuccess = {visibility: 'visible', border: '1px solid white',
          backgroundColor: 'red', cursor: 'pointer'};
        $scope.friendMessage = `${friend} not found`;
      }
    });
  }
}
