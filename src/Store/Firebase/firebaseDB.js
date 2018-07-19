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
    static getMenuData() {
        return new Promise((res, rej) => {
            fire.child(`Restaurants/${uid}/Menu`).once("value", (snapshot) => {
                res(snapshotToArray(snapshot));
            })
        })
    }

    static pushDoneOrder(orderObj,tableId){
        console.log("////////******///////",tableId);
        return new Promise((res, rej)=>{
            let updates={}
           const keyValue= fire.child(`Restaurants/${uid}/Tables/${tableId}/Orders`).push().key;
           updates[`Restaurants/${uid}/Tables/${tableId}/status`]="occupied"
           updates[`Restaurants/${uid}/Tables/${tableId}/Orders/${keyValue}`]=orderObj;
           fire.update(updates,()=>{

               res(true);
           })
        })
    }

    static updateOrder(obj, tableId, orderId){
        console.log('obj, tableId, orderId *****@@@@@@*****', obj, tableId, orderId)
        return new Promise((res, rej)=>{
            let update = {};
            update[`Restaurants/${uid}/Tables/${tableId}/Orders/${orderId}`] = obj;
            fire.update(update, ()=>{
                res(true);
            })
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