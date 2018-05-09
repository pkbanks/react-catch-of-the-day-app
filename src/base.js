import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  // source: firebase site
    apiKey: "AIzaSyAJmmsUEgwOqGtjibdici1GK8xq8cHwUtI",
    authDomain: "catch-of-the-day-pk-banks.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-pk-banks.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

export default base;