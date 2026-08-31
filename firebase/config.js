import { initializeApp } 
from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";


import {
getAuth
}
from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


import {
getFirestore
}
from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";






const firebaseConfig = {
  apiKey: "AIzaSyAcsEDqJLw697ik0Gc2efSKTUwSrAlgmyU",
  authDomain: "friendship-memory-85f70.firebaseapp.com",
  projectId: "friendship-memory-85f70",
  storageBucket: "friendship-memory-85f70.firebasestorage.app",
  messagingSenderId: "188151286340",
  appId: "1:188151286340:web:d08eb882a607719b2b0a11"
};




const app =
initializeApp(firebaseConfig);



const auth =
getAuth(app);



const db =
getFirestore(app);








export {

auth,

db,

};