/**
 * Created by Felix on 1/3/16.
 */
/**
 * Created by Felix on 1/2/16.
 */
import Firebase from 'firebase'

var rusheesRef = new Firebase('https://rushchad.firebaseio.com/rushees');
var usersRef = new Firebase('https://rushchad.firebaseio.com/users');

export const verifyEmail = (email) => {
  console.log("email to verify is ", email);
  new Firebase("https://rushchad.firebaseio.com/users").orderByChild("email")
    .startAt(email)
    .endAt(email)
    .once('value', function(snap) {
      if (snap.val() == null) {
        console.log("null found");
        return false;
      } else {
        console.log('accounts matching email address');
        return true;
      }
    });

}

export const updateUserLastActive = (loggedInUserId) => { // sets last active time as now for the user
  var childRef = usersRef.child(loggedInUserId);
  childRef.update({
    lastActive: Math.round(Number(Date.now())/1000)
  });
}

export const addOrUpdateRushee = (editRusheeId, dictionary, loggedInUserId) => { //
  var payload = dictionary;
  if (editRusheeId == -1) { // new rushee
    console.log("A new rushee has been created.");
    payload["firstAdded"] = dictionary["lastUpdated"];
    payload["userId_AddedBy"] = loggedInUserId;
    payload["active"] = "yes";

    var newChildRef = rusheesRef.push();
    newChildRef.set(payload, function(error) {
      if (error) {
        alert("Sorry, the information could not be updated." + error);
      } else {
        console.log("A rushee has been added.");
      }
    });

  } else { // update rushee
    var childRef = rusheesRef.child(editRusheeId);
    childRef.update(payload, function(error) {
      if (error) {
        alert("Sorry, the information could not be updated." + error);
      } else {
        console.log("A rushee has been updated.");
      }
    });
  }

}

export const addNewComment = (rusheeId, dictionary) => { // what happens when a new comment is made
  var childRef = rusheesRef.child(rusheeId);
  childRef.once("value", function(snapshot) {
    if (!snapshot.child("comments").exists()) { // just push a comment
      childRef.child('comments').set([], function() {
        var commentRef = childRef.child("comments");
        var newCommentRef = commentRef.push();
        newCommentRef.set(dictionary);
      });
    } else {
      var commentRef = childRef.child("comments");
      var newCommentRef = commentRef.push();
      newCommentRef.set(dictionary);
    }
  });
}

export const addOrUpdateCommentLike = (rusheeId, commentId, userId, value) => {
  var childRef = rusheesRef.child(rusheeId).child("comments").child(commentId);
  childRef.once("value", function(snapshot) {
    if (!snapshot.child("likes").exists()) { // no likes currently exist
      childRef.child('likes').set([], function() {
        var likeRef = childRef.child("likes");
        likeRef.child(userId).set(value);
      });
    } else {
      var likeRef = childRef.child("likes");
      likeRef.child(userId).set(value);
    }
  });
}

export const addOrUpdateRating = (rusheeId, userId, dictionary) => {
  console.log(rusheeId);
  console.log(userId);
  console.log(dictionary);
}

