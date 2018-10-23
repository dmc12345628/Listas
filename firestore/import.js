const fs = require('fs');
const firesotreService = require('firestore-export-import');
const serviceAccount = require('./sistemacelula-1c262-firebase-adminsdk-g5cy8-a708a139e3.json');
const databaseURL = 'https://sistemacelula-1c262.firebaseio.com';

// Initiate Firebase App
firesotreService.initializeApp(serviceAccount, databaseURL);

// Start importing your data
firesotreService.restore('./imports/sistemacelula-backup-2018-10-23.json');
