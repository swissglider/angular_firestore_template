const admin = require('firebase-admin');
let serviceAccount = require('../serviceAccountKey.json');
// admin.initializeApp();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

db.collection('test').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

let docRef = db.collection('users').doc('alovelace');
let setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
});

let authGroupRef = db.collection('authGroup').doc('theAuthGroup');
authGroupRef.set({
    groups: []
})

let authRoleRef = db.collection('authRole').doc('theAuthRole');
authRoleRef.set({
    roles: ['admin', 'authWriter', 'authRead', 'documentsAdmin', 'moderator', 'editor']
})

let docRef1 = db.collection('users1').doc('alovelace1');