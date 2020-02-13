var prodSize = '' , prodColor = '' , shirtQuantity = 1 , prodImage = '' , prodPrice , prodStock = 0 , prodName;


function showData(){
    var color , size; 
    document.getElementById('numshirt').value = shirtQuantity;

    firebase.database().ref("/Items").orderByChild("id").equalTo(""+localStorage.getItem('prodID')).on("value", function(snapshot) {
      
        snapshot.forEach(function(childSnapshot) {

            document.getElementById('name').innerHTML = childSnapshot.val().prodName;
            document.getElementById('price').innerHTML = 'PKR ' + childSnapshot.val().prodPrice;
            document.getElementById('des').innerHTML =  childSnapshot.val().prodDescription;
            document.getElementById('description1').innerHTML =  childSnapshot.val().prodDescription;
            document.getElementById('weight').innerHTML =  childSnapshot.val().prodWeight;
            document.getElementById('dimension').innerHTML = childSnapshot.val().prodDimension;
            document.getElementById('material').innerHTML =  childSnapshot.val().prodMaterial;
            document.getElementById('colour').innerHTML =  childSnapshot.val().prodColor;
            document.getElementById('size').innerHTML = childSnapshot.val().prodSize;
            document.getElementById('img1').src = childSnapshot.val().imgUrl1; 
            document.getElementById('img2').src = childSnapshot.val().imgUrl2;
            document.getElementById('img3').src = childSnapshot.val().imgUrl3; 
            document.getElementById('img4').src = childSnapshot.val().imgUrl4;

            
            color = childSnapshot.val().prodColor;
            size = childSnapshot.val().prodSize;
            prodImage = childSnapshot.val().imgUrl1;
            prodPrice = childSnapshot.val().prodPrice; 
            prodStock = childSnapshot.val().prodQuantity;
            prodName = childSnapshot.val().prodName;

            
            var x1 = document.getElementById("myColor");
            var x2 = document.getElementById("mySize");

            var res = size.split(',');
            res.pop();

            var res1 = color.split(',')
            res1.pop()

            for(var i=0; i<res.length; i++){
                var option = document.createElement("option");
                option.text = ''+res[i];
                 x2.add(option);
            }

            for(var i=0; i<res1.length; i++){
                var option = document.createElement("option");
                 option.text = ''+res1[i];
                 x1.add(option);
            }

                 
        })
    })
} 

function AddtoCart(){

var status = localStorage.getItem('status');
var myid = localStorage.getItem('ls_id');

if(status == 'undefined' || status == undefined || status == null || myid == 'undefined' || myid == undefined || myid == null ){
   
    showToast('You need To Login or Signup to Continue')
    var myasynktask = new Promise(function(sucess , failure){
        setTimeout(function()  {
            window.location.href="./login/login.html";
         }, 2000)});

}
else{
   prodSize =  document.getElementById("mySize").value;
   prodColor =  document.getElementById("myColor").value;

   var database = firebase.database().ref();


// if( database.child(`Users/${localStorage.getItem('ls_id')}/MyCart/${localStorage.getItem('prodID')}`).exist()){
//     showToast('You Already Add this item into your Cart')
// }

   var skey =  database.child(`Users/${localStorage.getItem('ls_id')}/MyCart/`).push();
       
     const send = {
           id:skey.key,
           itemID : localStorage.getItem('prodID'),
           prodColor ,
           prodSize ,
           shirtQuantity,
           prodImage , 
           prodPrice ,
           prodName
       }
       skey.set(send);
       showToast('Add in to cart successfully')
}

}

function AddtoWishlist(){

var status = localStorage.getItem('status');
var myid = localStorage.getItem('ls_id');

if(status == 'undefined' || status == undefined || status == null || myid == 'undefined' || myid == undefined || myid == null ){
   
    showToast('You need To Login or Signup to Continue')
    var myasynktask = new Promise(function(sucess , failure){
        setTimeout(function()  {
            window.location.href="./login/login.html";
         }, 2000)});

}
else{

    var skey = firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyWishlist/`).push();

    const send = {
          id:skey.key,
          itemID : localStorage.getItem('prodID'),
          prodImage , 
          prodPrice
      }
      skey.set(send);
      showToast('Add in to Wishlist successfully')

}

}

function showCart(){

    console.log('ww')

    var checker = 0;

    document.getElementById('cartItem').innerHTML = '';
    // document.getElementById('cartItem1').innerHTML = '';

    var status = localStorage.getItem('status');
    var myid = localStorage.getItem('ls_id');
    
    if(status == 'undefined' || status == undefined || status == null || myid == 'undefined' || myid == undefined || myid == null ){
        showToast('You need To Login or Signup to View Your Cart')
    }
    else{

       document.getElementById('loaddivcart').removeAttribute = 'hidden';

       firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyCart/`).on("value", function(snapshot) {
        
        snapshot.forEach(function(childSnapshot) {

            checker = 1;

            var li1 = document.createElement('li');
            li1.setAttribute('class' , 'header-cart-item flex-w flex-t m-b-12')
          
            var div1 = document.createElement('div')
            div1.setAttribute('class' , 'header-cart-item-img')
          
            var img1 = document.createElement('img')
            img1.setAttribute('src' , childSnapshot.val().prodImage)
          
            var div2 = document.createElement('div')
            div2.setAttribute( 'class' , 'header-cart-item-txt p-t-8')
          
            var span2 = document.createElement('span')
            span2.setAttribute('class' , 'header-cart-item-info')
            span2.innerHTML = 'Quantity ' + childSnapshot.val().shirtQuantity;

            var span3 = document.createElement('span')
            span3.setAttribute('class' , 'header-cart-item-info')
            span3.innerHTML = 'PKR  ' + childSnapshot.val().prodPrice;
          
            div1.appendChild(img1);
            div2.appendChild(span2);
            div2.appendChild(span3);
            li1.appendChild(div1);
            li1.appendChild(div2);
          
            document.getElementById('cartItem').appendChild(li1)   
            // document.getElementById('cartItem1').appendChild(li1) 
            document.getElementById('offlinecart').innerHTML='';  
            document.getElementById('loaddivcart').hidden="true";
         
      })
    }) 

    var myasynktask = new Promise(function(sucess , failure){
        setTimeout(function()  {
            if(checker==0){
                document.getElementById('loaddivcart').hidden="true";
                document.getElementById('offlinecart').innerHTML='<b> No Data Found OR You May Be Offline </b>';
            }
         }, 10000)});


  }
}

function changeQuantity(val){

    if(shirtQuantity > 0){

        if(val == 0 && shirtQuantity > 1){
            --shirtQuantity;
            document.getElementById('numshirt').value = shirtQuantity;
        }
        else if(val == 1 && shirtQuantity < prodStock){
            ++shirtQuantity;
            document.getElementById('numshirt').value = shirtQuantity;
            console.log('plus' , shirtQuantity);
        }
        else if (shirtQuantity == prodStock){
            showToast('limit stock reached')
        }
    }

}