/**
 * Created by Felix on 1/3/16.
 */
/**
 * Created by Felix on 1/2/16.
 */
import Firebase from 'firebase'

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

