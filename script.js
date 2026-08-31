// ======================
// FIREBASE IMPORT
// ======================


import {
    auth,
    db
} from "./firebase/config.js";



import {

    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



import {

    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc

}

from

"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";







// ======================
// REGISTER
// ======================


const registerBtn =
document.getElementById("register");



if(registerBtn){


registerBtn.addEventListener("click", async()=>{


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



try{


await createUserWithEmailAndPassword(

auth,

email,

password

);



alert("Register berhasil 💙");


window.location.href="index.html";


}


catch(error){


alert(error.message);


}



});


}










// ======================
// LOGIN
// ======================


const loginBtn =
document.getElementById("login");



if(loginBtn){


loginBtn.addEventListener("click", async()=>{


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;




try{


await signInWithEmailAndPassword(

auth,

email,

password

);



alert("Login berhasil 💙");


window.location.href="home.html";



}


catch(error){


alert(error.message);


}



});


}









// ======================
// AUTH CHECK
// ======================


onAuthStateChanged(auth,(user)=>{



const userEmail =
document.getElementById("user-email");



if(userEmail && user){



userEmail.innerHTML =

`Login as: ${user.email}`;



}




const friendList =

document.getElementById("friend-list");




if(friendList && user){


loadFriends(user.uid);


}



});











// ======================
// LOGOUT
// ======================



const logoutBtn =
document.getElementById("logout");



if(logoutBtn){


logoutBtn.addEventListener("click",async()=>{


await signOut(auth);



window.location.href="index.html";



});


}











// ======================
// ADD FRIEND
// ======================



const saveBtn =

document.getElementById("save-friend");




if(saveBtn){



saveBtn.addEventListener("click",async()=>{



const user =
auth.currentUser;



if(!user){


alert("Belum login");


return;


}






const name =

document.getElementById("name").value;



const birthday =

document.getElementById("birthday").value;



const food =

document.getElementById("food").value;



const hobby =

document.getElementById("hobby").value;



const memory =

document.getElementById("memory").value;



const file =

document.getElementById("photo").files[0];






if(
!name ||
!birthday ||
!food ||
!hobby ||
!memory ||
!file

){


alert("Semua data harus diisi");


return;


}






const reader =

new FileReader();






reader.onload = async()=>{



try{



await addDoc(


collection(

db,

"users",

user.uid,

"friends"

),



{


name,

birthday,

food,

hobby,

memory,

photo:reader.result,

createdAt:new Date()


}



);




alert("Friend berhasil disimpan 💙");



window.location.href="home.html";



}



catch(error){


alert(error.message);


}



};






reader.readAsDataURL(file);




});


}













// ======================
// LOAD FRIEND LIST
// ======================



async function loadFriends(uid){



const friendList =

document.getElementById("friend-list");



if(!friendList)return;





try{



const snapshot =

await getDocs(


collection(

db,

"users",

uid,

"friends"

)


);





friendList.innerHTML="";





if(snapshot.empty){



friendList.innerHTML=

`

<p>
Belum ada memory teman 💙
</p>

`;

return;


}







snapshot.forEach((item)=>{



const friend =

item.data();





friendList.innerHTML +=



`


<div class="friend-card">



<img

src="${friend.photo}"

class="friend-photo"

>



<h3>

${friend.name}

</h3>



<p>
🎂 ${friend.birthday}
</p>



<p>
🍽️ ${friend.food}
</p>



<p>
🎨 ${friend.hobby}
</p>



<p>
💭 ${friend.memory}
</p>





<button 
class="edit-btn"
data-id="${item.id}">

✏️ Edit

</button>



<button 
class="delete-btn"
data-id="${item.id}">

🗑 Delete

</button>



</div>



`;



});




}



catch(error){


alert(error.message);


}



}












// ======================
// DELETE FRIEND
// ======================



document.addEventListener("click",async(e)=>{



if(e.target.classList.contains("delete-btn")){



const id =

e.target.dataset.id;




const confirmDelete =

confirm(

"Hapus memory teman ini?"

);




if(confirmDelete){



try{



const user =

auth.currentUser;




await deleteDoc(



doc(

db,

"users",

user.uid,

"friends",

id

)


);




alert("Friend berhasil dihapus 💙");



location.reload();



}



catch(error){


alert(error.message);


}



}



}



});



// ======================
// EDIT BUTTON
// ======================


document.addEventListener(
"click",
(e)=>{


if(e.target.classList.contains("edit-btn")){


const id =
e.target.dataset.id;



window.location.href =
"edit-friend.html?id="+id;



}


}

);








// ======================
// ADD FRIEND BUTTON
// ======================



const addFriendBtn =

document.getElementById("add-friend");



if(addFriendBtn){


addFriendBtn.addEventListener("click",()=>{



window.location.href="add-friend.html";



});


}

// ======================
// LOAD EDIT DATA
// ======================


const updateBtn =
document.getElementById("update-friend");



if(updateBtn){



const params =
new URLSearchParams(
window.location.search
);



const friendId =
params.get("id");



const user =
auth.currentUser;



onAuthStateChanged(auth,async(user)=>{


const friendRef =
doc(

db,

"users",

user.uid,

"friends",

friendId

);



const friendSnap =
await getDoc(friendRef);



const data =
friendSnap.data();




document.getElementById("name").value =
data.name;



document.getElementById("birthday").value =
data.birthday;



document.getElementById("food").value =
data.food;



document.getElementById("hobby").value =
data.hobby;



document.getElementById("memory").value =
data.memory;



});







updateBtn.addEventListener(
"click",
async()=>{



const user =
auth.currentUser;



await updateDoc(

doc(

db,

"users",

user.uid,

"friends",

friendId

),


{


name:
document.getElementById("name").value,


birthday:
document.getElementById("birthday").value,


food:
document.getElementById("food").value,


hobby:
document.getElementById("hobby").value,


memory:
document.getElementById("memory").value


}


);



alert(
"Friend berhasil diupdate 💙"
);



window.location.href =
"home.html";



});



}