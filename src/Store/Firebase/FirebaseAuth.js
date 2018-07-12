import Firebase from 'react-native-firebase';

const fire = Firebase.auth();

export default class Auth {
    static createUser(userObj) {
        return fire.createUserWithEmailAndPassword(userObj.email,userObj.password);
    }

    static loginUser(userObj) {
        return fire.signInWithEmailAndPassword(userObj.email, userObj.password);
    }

    static updateUserProfile(){
        return fire.createUser.updateProfile({displayName: user.name});
    }

    static chekUser(){
        return new Promise((res, rej)=>{
            fire.onAuthStateChanged(user=>{
                if(user){
                    res(user);
                }else{
                    rej(null);
                }
            })
        })
    }
}