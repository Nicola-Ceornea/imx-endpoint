const functions = require("firebase-functions"); // functions SDK to create Cloud functions & functions triggers
const admin = require("firebase-admin"); // Admin-SDK to accesso Firestore

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


// test
 exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });

 // addMessage method
 exports.addMetadata = functions.https.onRequest(async (req, res) => {
    const request = req.query;

    const tokenID = await admin.firestore().collection('metadata').doc(request.tokenID).get();

    // check tokenID existence
    if(!tokenID.exists) {
        const writeResult = await admin.firestore().collection('metadata').doc(request.tokenID).set(request)
        res.json({result: 'added metadata successfully'})
    } else {
        res.json({result: 'Metadata for TokenID: ${request.TokenID} already exists'})
    }
 });



 exports.getMetadata = functions.https.onRequest(async (req, res) => {
    const request = req.query.tokenID.substring(1);

    const tokenID = await admin.firestore().collection('metadata').doc(request).get()

    if(tokenID.exists) {
        res.json(tokenID.data())
    } else {
        res.status(404).send("Metadata for TokenID: ${request} not found");
    }
 });