// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// A function that triggers when a user is created using Google sign-in
exports.createUserDocument = functions.auth.user().onCreate((user) => {
// Check if the user signed in with Google
if (user.providerData.some((provider) => provider.providerId === 'google.com')) {
// Get the user's email, display name, and photo URL from the provider data
const email = user.providerData[0].email;
const displayName = user.providerData[0].displayName;
const photoURL = user.providerData[0].photoURL;

// Create a new document in firestore with the user's information
return admin.firestore().collection('users').doc(user.uid).set({
email: email,
displayName: displayName,
photoURL: photoURL,
});
} else {
// Return a promise that resolves with nothing if the user did not sign in with Google
return Promise.resolve();
}
});