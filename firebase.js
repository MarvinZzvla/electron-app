import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js'


// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js'
import { getFirestore, setDoc, collection, doc,getDoc,getDocs,deleteDoc } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js'
const firebaseConfig = {
  apiKey: "AIzaSyAu4yWhRLQ6s6qdhiQUKmZ36G3LIoVY32U",
  authDomain: "mi-inventario-1240e.firebaseapp.com",
  databaseURL: "https://mi-inventario-1240e-default-rtdb.firebaseio.com",
  projectId: "mi-inventario-1240e",
  storageBucket: "mi-inventario-1240e.appspot.com",
  messagingSenderId: "557739132957",
  appId: "1:557739132957:web:e6e4271391051b77dc5ef4",
  measurementId: "G-PM4XMVVEBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


/********** AUNTHETICATION WITH FIREBASE TO GET AUTH TOKEN ********/
export const login = async (email, password) => {
  const auth = getAuth();
  let answer;
  let data;
  
    await signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      const user = userCredentials;
      data = user
      console.log(user + ' logged ' + true);
      answer = true;
    }).catch((error) => {
      const errorMessage = error.message
      const errorCode = error.code
      console.error(errorMessage + " " + errorCode)
      answer = false;
    })

  return {"isLoggedIn": answer, "dataUser":data};
  }

  /*****************SEARCH IN DATABASE  **************/
    export const search = async (uid) => {
        const usersRef = doc(db,"db1/Usuarios/Usuarios/"+uid);
        const q =  await getDoc(usersRef);

        if(q.exists()) {
          console.log(q.data())
        }
        else {
          console.log("Document not found")
        }

        return q.data()
    }

    /***********GET DOC******/

    export const getAllDocs = async (database,section) =>{
      const result = await getDocs(collection(db, "db1/"+database+"/"+section))
      return result;
    }

    /***********DELETE DOC **********/
    export const deleteProduct = async (database,route,itemName) => {
      let isGet;
      console.log("db1/"+database+route+itemName)
      const result = await deleteDoc(doc(db, "db1/"+database+route+itemName)).then(() => {
          console.log("Borrado del producto")
          isGet = true
      }).catch(err => {
        console.log(err);
        isGet=false
      })

      console.log(result)
      return isGet;
    }



