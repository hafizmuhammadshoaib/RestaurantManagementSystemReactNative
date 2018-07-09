import Firebase from 'react-native-firebase';
const fire = Firebase.auth();

export default class Auth {
    static createUser(userObj) {
        return fire.createUserWithEmailAndPassword(email, password)
            // .then(user => {
            //     user.updateProfile({ displayName: userObj.name })
            //         .then(() => {
            //             return new Promise((res, rej) => {
            //                 res({
            //                     name: user.displayName,
            //                     email: user.email,
            //                 });
            //             })
            //         })
            //         .catch(err => {
            //             return new Promise((res, rej) => {
            //                 rej({
            //                     message: err.message
            //                 });
            //             })
            //         })
            // })
            // .catch(err => {
            //     return new Promise((res, rej) => {
            //         rej({
            //             message: err.message
            //         });
            //     })
            // })
    }

    static loginUser(userObj) {
        return fire.signInWithEmailAndPassword(userObj.email, userObj.password);
    }

    static updateUserProfile(){
        return fire.createUser.updateProfile({displayName: user.name});
    }
}