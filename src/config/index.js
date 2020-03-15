const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  apiPrefix: process.env.API_PREFIX,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,

  firestoreServiceAccount: {
    type: process.env.FIRESTORE_TYPE,
    project_id: process.env.FIRESTORE_PROJECT_ID,
    private_key_id: process.env.FIRESTORE_PRIVATE_KEY_ID,
    private_key: process.env.FIRESTORE_PRIVATE_KEY,
    client_email: process.env.FIRESTORE_CLIENT_EMAIL,
    client_id: process.env.FIRESTORE_CLIENT_ID,
    auth_uri: process.env.FIRESTORE_AUTH_URI,
    token_uri: process.env.FIRESTORE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIRESTORE_CLIENT_X509_CERT_URL
  }
}