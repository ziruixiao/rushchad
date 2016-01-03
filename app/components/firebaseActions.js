/**
 * Created by Felix on 1/3/16.
 */
/**
 * Created by Felix on 1/2/16.
 */
import Firebase from 'firebase'

export const authenticate = () => {
  console.log('called')
  var ref = new Firebase('https://rushchad.firebaseio.com')
  ref.authWithOAuthPopup('google', function (error, authData) {
    if (error) {
      console.log('Login Failed!', error)
    } else {
      console.log('Authenticated successfully with payload:', authData)
    }
  })
}

