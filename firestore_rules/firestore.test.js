/**
 * Testfile for the specific entries in the rules
 * 
 * To test you need to start the emulator:
 *      `firebase emulators:start --only firestore`
 * then in a new terminal:
 *      `npm run firestore-test`
 * 
 */

const firebase = require("@firebase/testing");
const fs = require("fs");
const { teardown, loadTestData } = require('./helper/helper');
const projectId = `rules-spec-${Date.now()}`;

beforeEach(async () => { });
before(async () => { });
after(async () => { await teardown(); });

const data1 = {
    "authRole/theAuthRole": { roles: ["admin", "authRead", "authWrite", "moderator", "documentsAdmin", "editor"] },
    "authGroup/theAuthGroup": { groups: [
        "Group1",
        "Group2",
        "GroupX1",
        "GroupX2",
        "Test", "Test1", "Test2", "Test77"] },
    "users/userX": { roles: [], groups: [] },
    "post/postX01": { groups: [], owner: 'userX' },
    "post/postX02": { groups: ["Group1"], owner: 'userX' },
    "post/postX03": { groups: ["Group2"], owner: 'userX' },
    "post/postX04": { groups: ["Group1", "GroupX1"], owner: 'userX' },
    "post/postX05": { groups: ["GroupX1", "GroupX2"], owner: 'userX' },

    "users/user": { roles: [], groups: [] },
    "post/post101": { groups: ["Group1"], owner: 'user' },
    "post/post102": { groups: [], owner: 'user' },

    "users/user1": { roles: [], groups: ["Group1"] },
    "post/post201": { groups: ["Group1"], owner: 'user1' },
    "post/post202": { groups: [], owner: 'user1' },
    "post/post203": { groups: ["Group2"], owner: 'user1' },
};
let db;

describe("Simple-Auth Project - Not Authenticated user - Post Read", async () => {
    beforeEach(async () => {
        db = await loadTestData(projectId, [data1], null);
    });
    it("1) update  Document correct", async () => {
        await firebase.assertFails(db.doc('post/postX01').get());
    });
});

describe("Simple-Auth Project - Authenticated user wihtout any group - Post Read", async () => {
    beforeEach(async () => {
        db = await loadTestData(projectId, [data1], { uid: 'user' });
    });
    it("1) Read Document post", async () => {
        await firebase.assertSucceeds(db.doc('post/post101').get());
    });
    it("2) Read Document post", async () => {
        await firebase.assertSucceeds(db.doc('post/post102').get());
    });
});

describe("Simple-Auth Project - Not Authenticated user - Document Create", async () => {
    beforeEach(async () => {
        db = await loadTestData(projectId, [data1], null);
    });
    it("1) create  Document correct", async () => {
        await firebase.assertFails(db.doc('post/post1').set({ owner: 'userX', groups: [] }));
    });
    it("2) create  Document correct", async () => {
        await firebase.assertFails(db.doc('post/post1').set({ owner: null, groups: [] }));
    });
});

describe("Simple-Auth Project - Authenticated user - Document Create", async () => {
    beforeEach(async () => {
        db = await loadTestData(projectId, [data1], { uid: 'userX' });
    });
    it("1) create  Document correct", async () => {
        await firebase.assertSucceeds(db.doc('post/post1').set({ owner: 'userX', groups: [], title: "Hallo", content: "Velo" }));
    });
    it("2) create  Document wrong", async () => {
        await firebase.assertFails(db.doc('post/post2').set({ owner: 'userX', groups: [], title: "Hallo"}));
    });
});