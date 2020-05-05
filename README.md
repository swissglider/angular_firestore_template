# Angular App Template with Firestore
©Swissglider

This is Angular Template App with Firestore.  

There is a standard rule set for the firestore included. [Moor Info](https://github.com/swissglider/init-firestore-rules)

#### User Use Cases
![..](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/swissglider/angular_firestore_template/master/schema/user_use_cases.wsd)

#### Admin Use Cases
![..](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/swissglider/angular_firestore_template/master/schema/adm_use_cases.wsd)

## Documentation
Project Documentation: [Link](https://swissglider.github.io/angular_firestore_template/)  
Angular Documentation: [Link](https://swissglider.github.io/angular_firestore_template/compodoc/)

## How to use it
1) Clone the repository
2) Change the following entries in the package.json:
    - name
    - description
    - version
    - author
    - homepage
3) if not yet done, install npm and nodeJS
4) Install the package localy: ``npm install``
5) If not yet done: create a Firebase account: [Link](https://firebase.google.com/)
6) If not yet done: create a new Firebase Project: [Link](https://console.firebase.google.com/u/1/)
7) If not yet done: create a Database under Database ``Test Mode``
8) If not yet done: create an app: ProjectOverview Site --> add Web-App (</>)
    - Select ``Firebase Hosting``
9) ``firestore login``
10) ``firestore init``
    - Which Firebase CLI features do you want to set up for this folder?:``Firestore; Hosting; Emulators;``
    - use an existing porject and select the one you created in step 6
    - What file should be used for Database Rules? --> ``firestore_rules/config/firestore.rules`` (not overwrite!!)
    - What file should be used for Firestore indexes? --> default
    - What do you want to use as your public directory? --> ``www``
    - Configure as a single-page app (rewrite all urls to /index.html)? ``yes``
    - Which Firebase emulators do you want to set up? ``Firestore; Hosting;``
    - Which port do you want to use for the firestore emulator? --> default
    - Which port do you want to use for the hosting emulator? --> default
    - Which port do you want to use for the hosting emulator? --> ``yes``
11) To generate a private key file for your service account
    - In the Firebase console, open Settings > Service Accounts.
    - Click Generate New Private Key, then confirm by clicking Generate Key.
    - store the file under ``serviceAccountKey.json`` (it is in the .gitignore)
12) Init Firestore DB ``npm run firestore_init_db``
13) Change the rules specific for your new app in firestore.rules
14) Create the app
15) Generate and deploy the app and rules etc. ``npm run deploy``
16) Activate Authenication:
    - Authentication --> Users --> configure Authentication Method
    - Activate Google


## Included
- Angular App (src)
- Firebase Emulator
- Firebase Tests for the specific Rules (firestore_rules)
- Compodoc to document the Anular app (docs/compodoc)
- PlantUML (schema)
- Scripts (scripts)

## Scripts
- Test the Firestore Rules:  
   ``npm run firestore_test``
- Generate the Compodoc Documentation:  
  ``npm run compodoc``
- Build and deploy:  
  ``npm run deploy``

## Test firestone rules
1) Open Terminal 1 enter ``firebase emulators:start --only firestore``
2) Open Terminal 2 enter `` npm run firestore-test``