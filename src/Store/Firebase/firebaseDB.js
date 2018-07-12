import Firebase from 'react-native-firebase';
const fire = Firebase.database().ref('/');
let uid = "OcPCTJHEU3MZKu619Ry8OdhhaVg2"
export default class FirebaseDB {
    static getTables() {
        console.log("in firebase db function:**************")
        return new Promise((res, rej) => {
            fire.child(`Restaurants/${uid}/Tables`).once('value', snapshot => {
                console.log("snapshot from firebase db function", snapshot);
                res(snapshotToArray(snapshot));
            });
        })
    }
}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        console.log(childSnapshot.val())
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};