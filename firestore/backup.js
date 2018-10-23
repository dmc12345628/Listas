const fs = require('fs');
const firesotreService = require('firestore-export-import');
const serviceAccount = require('./sistemacelula-1c262-firebase-adminsdk-g5cy8-a708a139e3.json');
const databaseURL = 'https://sistemacelula-1c262.firebaseio.com';

// Initiate Firebase App
firesotreService.initializeApp(serviceAccount, databaseURL);

// Start exporting your data
firesotreService.backups(['Amigos', 'Bautizados', 'Celulas', 'Iglesias'])
.then(collections => {
  let backupName = './backups/sistemacelula-backup-' + getCompleteDateTime(new Date()) + '.json';

  fs.writeFile(backupName, JSON.stringify(collections),
    err => {
      if (err) {
        console.log(err);
      } else console.log('File saved');
  });
})

function getCompleteDate(date) {
  return date.getFullYear() + '-' + padNumber(date.getMonth() + 1) + '-' + date.getDate();
}

function getCompleteTime(date) {
  return padNumber(date.getHours()) + '-' + padNumber(date.getMinutes()) + '-' + padNumber(date.getSeconds());
}

function getCompleteDateTime(date) {
  return getCompleteDate(date) + 'T' + getCompleteTime(date);
}

function padNumber(number) {
  return ('00' + number).slice(-2);
}
