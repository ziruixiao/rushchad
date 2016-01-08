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

export const addNewComment = () => { // what happens when a new comment is made

}

export const addOrUpdateRating = () => {

}

export const addOrUpdateCommentLike = () => {

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

