import webLocation from 'web-location';
import {session} from 'web-storage';
import { getAuthUrl } from 'backend/OAuth.jsw';

$w.onReady(function () {
// handle the click event on the Sign in with Google button
$w('#btnSignInToGoogle').onClick((event) => {
googleSignin()
});
})
export function googleSignin() {
getAuthUrl()
  .then((result) => {
const authorizationUrl=result.authUrl
const state=result.state
// store the state variable for later use
session.setItem("requestState", state);
// direct the bowser to the authorization Url
wixLocation.to(authorizationUrl); 
})
}
