var admin = require("firebase-admin");

const config = require('../config');


admin.initializeApp({
  credential: admin.credential.cert(config.firestoreServiceAccount)
});

module.exports = admin.firestore();
