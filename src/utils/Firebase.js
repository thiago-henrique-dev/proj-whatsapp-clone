const firebase = require ('firebase');
require('firebase/firestore')

export class Firebase {


    constructor(){

        this._config = { 
            apiKey: "AIzaSyAlNzjp5uzzU-ent8l7OGVMPQBYZ2yUKT8",
            authDomain: "whatsapp--clone-e9c76.firebaseapp.com",
            projectId: "whatsapp--clone-e9c76", 
            storageBucket: "whatsapp--clone-e9c76.appspot.com",
            messagingSenderId: "114854202261",
            appId: "1:114854202261:web:b540403b3e9e733506c49c",
        }
        this.init();

    }

    init(){

       if(!window._initializedFirebase){

        firebase.initializeApp(this._config);

        firebase.firestore().settings({

            timestampsInSnapshots: true

        });

        window._initializedFirebase = true;

       }
        

    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();
    }

    initAuth(){

        return new Promise ((s,f) =>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result=>{

                let token = result.credential.accessToken;
                let user = result.user;
                

                s({
                    user,
                    token
                })
            }).catch(err=>{
                f(err);
            })

        });

    }
}