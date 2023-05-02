import { google } from 'googleapis';
import { getSecret } from 'web-secrets-backend';
import crypto from 'crypto'
export async function getAuthUrl() {
//retrieve the client secret from the Secret Manager  
const googleClientSecret = await getSecret('clientSecret');
const googleConfig = {
clientId: '123456789123-12abc3def4g5hijk67lmnopqrest8u9v0.apps.googleusercontent.com',
clientSecret: googleClientSecret,
redirect: 'https://bgans.in/sso-example/_functions/getAuth'
};
// create a connection to google's authentication services
const authConnection = new google.auth.OAuth2(
googleConfig.clientId,
googleConfig.clientSecret,
googleConfig.redirect
);
const scope = [
'https://www.googleapis.com/auth/userinfo.email',
'https://www.googleapis.com/auth/userinfo.profile',
];  
// generate a random state variable 
const state= crypto.randomBytes(16).toString('hex')
// request an authorization code URL 
const authUrl = authConnection.generateAuthUrl({
access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
prompt: 'consent',
scope: scope,
state: state
});
return {state,authUrl};
}

