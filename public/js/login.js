const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

//
function clickme(){
	$("#signup-btn").attr('disabled', !$("#signup-btn").attr('disabled'));
}
//Signup modal hide

$('#signup-login').on("click",function(){
	$('#signupModalCenter').css('display','none');
	 window.location.reload();
})

//FOR LOGIN
$(".loginBtn").click(function(e){
e.preventDefault();

document.getElementById('loginbtn').hidden = 'true'
document.getElementById('loaddiv').removeAttribute('hidden')
	
   var email=document.getElementById("email").value;
	var password=document.getElementById("password").value;
	
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(success){
		if(email == "personage2020@gmail.com"){
			showToast('Login Successfully');	
			location.assign("../admin/index.html");
			localStorage.setItem('admLog' , 'true');
		}
		else{
		
	  firebase.database().ref('Users/').orderByChild("email").equalTo(""+email).on("value", function(snapshot) {
	
		snapshot.forEach(function(childSnapshot) {
	
			localStorage.setItem('ls_name' , childSnapshot.val().uname);
			localStorage.setItem('ls_email' , childSnapshot.val().email);
			localStorage.setItem('ls_id' , childSnapshot.val().id);
			localStorage.setItem('status','loggedIn');
			console.log("B")
			console.log(childSnapshot.val().uname);
			document.getElementById('loaddiv').hidden = 'true'
			document.getElementById('loginbtn').removeAttribute('hidden')
			location.assign("../index.html");
			
		});
	
	});
}
	})
	.catch(function(error) {
		document.getElementById('loaddiv').hidden = 'true'
		document.getElementById('loginbtn').removeAttribute('hidden')
		showToast('Error '+error);

	  });
});


// FOR SIGNUP
function Signup(){
	
	var d=new Date;
	var date = d.getDate();
	var day = d.getMonth()+1;
	var year = d.getFullYear();
	var fullDate = date+"/"+day+"/"+year;
	
	var fullName = document.getElementById("FullName").value;
	// var phone = document.getElementById("Number").value;
	// var phoneno = /^\03[0-9]{2}-(?!1234567)(?!1111111)(?!7654321)[0-9]{7}$/;
	var email = document.getElementById("Email").value.trim();
	// var address = document.getElementById("Address").value;
	var pass = document.getElementById("Password").value.trim();
	
	console.log(fullName);

	if(fullName == ''  || email == ''  || pass == ''){
	
		showToast('Please fill all textfeild(s)');
	}
	// else if(phone.length <11 || phone.length >11){
		
	// 	showToast("Enter corerct number");
	// }
	
	else{
	firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(success){
		console.log(success.user.uid)
  
    var userObj={
        id:success.user.uid,
        uname:fullName,
		email:email,
		// address:address,
		// phone:phone,
		date:fullDate,
		password:pass
		
    }
    firebase.database().ref('Users/').child(`${success.user.uid}`).set(userObj).then(function(success1) {
	
		    localStorage.setItem('ls_name' , fullName);
			localStorage.setItem('ls_email' , email);
			localStorage.setItem('ls_id' , success.user.uid);
			localStorage.setItem('status','loggedIn');

			document.getElementById('error1').value = ' Your Account has been created';
		location.assign("../index.html");
         
      });
   }).catch(function(error) {
   
	document.getElementById('error1').innerHTML =  error; 
	// showToast("Error Occured" , error);
  });
 }
}
//Login with google

function loginWithGoogle(){
	var d=new Date;
	var date = d.getDate();
	var day = d.getMonth()+1;
	var year = d.getFullYear();
	var fullDate = date+"/"+day+"/"+year;
	
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		// var token = result.credential.accessToken;
		// console.log(result);
		var user = result.user;
		// console.log(user);
		var skey =firebase.database().ref('Users/').child(`${result.user.uid}`);
		
		if(result.additionalUserInfo.isNewUser){

			var userObj = {

				uname: user.displayName,
				email: user.email,
				id : user.uid,
				date: fullDate

			  };
			  skey.set(userObj).then(function(success) {

				localStorage.setItem('ls_name' , user.displayName);
				localStorage.setItem('ls_email' , user.email);
				localStorage.setItem('ls_id' , user.uid);
				localStorage.setItem('status','loggedIn');

	
				showToast("Login Successfully.");
				location.assign("../index.html");
				 
			}).catch(function(error) {
				showToast(error);
			  });
		}
		else { 
			
			localStorage.setItem('ls_name' , user.displayName);
			localStorage.setItem('ls_email' , user.email);
			localStorage.setItem('ls_id' , user.uid);
			localStorage.setItem('status','loggedIn');
			
			location.assign("../index.html");
		  }
		  
	  }).catch(function(error) {
		showToast(error);
	  });
	

	}
