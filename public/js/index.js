var status = localStorage.getItem('status');
var myid = localStorage.getItem('ls_id');



function showdata(){
    document.getElementById('wish').hidden = true;

    if(status == 'undefined' || status == undefined || status == null || myid == 'undefined' || myid == undefined || myid == null || myid == '' || status == ''){
                  document.getElementById('loginbtn').removeAttribute('hidden')
                  document.getElementById('loginbtn1').removeAttribute('hidden')
                  document.getElementById('logoutbtn').hidden = 'true'
                  document.getElementById('logoutbtn1').hidden = 'true'
    }else{
        document.getElementById('logoutbtn').removeAttribute('hidden')
        document.getElementById('logoutbtn1').removeAttribute('hidden')
                  document.getElementById('loginbtn').hidden = 'true'
                 
                  document.getElementById('loginbtn1').hidden = 'true'
   
    }


    document.getElementById("showwishlist").innerHTML = '';

    var checker = 0;

    document.getElementById('loaddiv').removeAttribute('hidden');

    firebase.database().ref("/Items").on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {

            checker = 1;

            var ndiv = document.createElement('div');
            ndiv.setAttribute('class','row isotope-grid');
            ndiv.setAttribute('style','display:inline-block; min-width:300px; padding-right:5%; padding-left:5%; padding-bottom:2% ');
            

            var bdiv = document.createElement('div');
            bdiv.setAttribute('class','isotope-item');


            var maindiv = document.createElement('div');
            maindiv.setAttribute('class','block2');
           

             var div1 = document.createElement('div');
             div1.setAttribute('class','block2-pic hov-img0');
          

             var nimg=document.createElement('IMG');
             nimg.setAttribute('class','mySize' );
            //  nimg.setAttribute('width','250px')
            //  nimg.setAttribute('height','250px');
             nimg.setAttribute('src',''+ childSnapshot.val().imgUrl1);

             var ma=document.createElement('a');
             ma.setAttribute('class',' block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1');
             ma.innerHTML = ' Quick View';
             ma.href = 'product-detail.html';
             ma.onclick = function(){
               localStorage.setItem('prodID' , childSnapshot.val().id);
             }
             
            
             var div2 = document.createElement('div');
             div2.setAttribute('class','block2-txt flex-w flex-t p-t-14');

             var div3 = document.createElement('div');
             div3.setAttribute('class','block2-txt-child1 flex-col-l');

             var ma2=document.createElement('a');
             ma2.setAttribute('class','stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6');
             //ma2.setAttribute('href','product-detail.html');;
             ma2.innerHTML = ''+childSnapshot.val().prodName;
            
            
             var span = document.createElement('span');
             span.setAttribute('class','stext-105 cl3');
             span.innerHTML = 'PKR '+childSnapshot.val().prodPrice;

             var div4  = document.createElement('div');
             div4.setAttribute('class' , 'block2-txt-child2 flex-r p-t-3')

             var ma3=document.createElement('a');
             ma3.setAttribute('class','btn-addwish-b2 dis-block pos-relative js-addwish-b2');

             var nimg2=document.createElement('IMG');
             //  nimg.setAttribute('class','myimg');
              nimg2.setAttribute('height','20px');
              nimg2.setAttribute('width','20px')
              nimg2.setAttribute('class' , 'icon-heart1 dis-block trans-04');
              nimg2.setAttribute('src','images/icons/icon-heart-01.png');
              
            
              var nimg3=document.createElement('IMG');
             //  nimg.setAttribute('class','myimg');
              nimg3.setAttribute('height','20px');
              nimg3.setAttribute('width','20px')
              nimg3.setAttribute('class' , 'icon-heart2 dis-block trans-04 ab-t-l');
              nimg3.setAttribute('src','images/icons/icon-heart-02.png');
              nimg3.onclick = function(){
               

                if(status == 'undefined' || status == undefined || status == null || myid == 'undefined' || myid == undefined || myid == null ){
                  
                    showToast('You need To Login or Signup to Continue')
                    var myasynktask = new Promise(function(sucess , failure){
                        setTimeout(function()  {
                            window.location.href="./login/login.html";
                        }, 2000)});

                }
                else{

                    firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyWishlist/`).orderByChild("itemID").equalTo(childSnapshot.val().id).once("value",snapshot => {
                        if (snapshot.exists()){
                          showToast('Item Already exist in wishlist')
                        }

                        else{
                            var skey = firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyWishlist/`).push();

                            const send = {
                                id:skey.key,
                                itemID : childSnapshot.val().id,
                                prodImage : childSnapshot.val().imgUrl1, 
                                prodPrice : childSnapshot.val().prodPrice ,
                                prodName : childSnapshot.val().prodName
                            }
                            skey.set(send);
                            showToast('Add in to Wishlist successfully')

                            var myasynktask = new Promise(function(sucess , failure){
                                setTimeout(function()  {
                                    window.location.reload();
                                }, 2000)});

                          }
                    })
                }
            }
        



             div1.appendChild(nimg);
             div1.appendChild(ma);
             
             ma3.appendChild(nimg2);
             ma3.appendChild(nimg3);
             div4.appendChild(ma3);

             div3.appendChild(ma2);
             div2.appendChild(div3);
             div2.appendChild(span);
             div2.appendChild(div4)

             maindiv.appendChild(div1);
             maindiv.appendChild(div2);

             bdiv.appendChild(maindiv);
             ndiv.appendChild(bdiv);

             document.getElementById("showfetch").appendChild(ndiv);
             document.getElementById("offline").innerHTML = '';
             document.getElementById('loaddiv').hidden="true";

            
               
          

        //      <div class="block2">
        //      <div class="block2-pic hov-img0">
        //          <img src="images/product-01.jpg" alt="IMG-PRODUCT">

        //          <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
        //              Quick View
        //          </a>
        //      </div>

        //      <div class="block2-txt flex-w flex-t p-t-14">
        //          <div class="block2-txt-child1 flex-col-l ">
        //              <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
        //                  Esprit Ruffle Shirt
        //              </a>

        //              <span class="stext-105 cl3">
        //                  $16.64
        //              </span>
        //          </div>

        //          <div class="block2-txt-child2 flex-r p-t-3">
        //              <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
        //                  <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
        //                  <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
        //              </a>
        //          </div>
        //      </div>
        //  </div> 
            
        })
   })

   var myasynktask = new Promise(function(sucess , failure){
    setTimeout(function()  {
        if(checker==0){
            document.getElementById('loaddiv').hidden="true";
            document.getElementById('offline').innerHTML='<b> No Data Found OR You May Be Offline </b>';
        }
     }, 10000)});


}

function showWishlist(){

    document.getElementById("showwishlist").innerHTML = '';


    if(status == 'undefined' || status == undefined || status == null || myid == 'undefined' || myid == undefined || myid == null ){
                  
        showToast('You need To Login or Signup to Continue')
        var myasynktask = new Promise(function(sucess , failure){
            setTimeout(function()  {
                window.location.href="./login/login.html";
            }, 2000)});

    }
    else{

    firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyWishlist`).on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {


            checker = 1;

            var ndiv = document.createElement('div');
            ndiv.setAttribute('class','row isotope-grid');
            ndiv.setAttribute('style','display:inline-block; min-width:300px; padding-right:5%; padding-left:5%; padding-bottom:2% ');
            

            var bdiv = document.createElement('div');
            bdiv.setAttribute('class','isotope-item');


            var maindiv = document.createElement('div');
            maindiv.setAttribute('class','block2');
           

             var div1 = document.createElement('div');
             div1.setAttribute('class','block2-pic hov-img0');

             var nimg=document.createElement('IMG');
            //  nimg.setAttribute('class','myimg');
            nimg.setAttribute('class','mySize' );
            //  nimg.setAttribute('height','250px');
            //  nimg.setAttribute('width','250px')
             nimg.setAttribute('src',''+ childSnapshot.val().prodImage);

             var ma=document.createElement('a');
             ma.setAttribute('class','block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1');
             ma.innerHTML = ' Quick View';
             ma.href = 'product-detail.html';
             ma.onclick = function(){
               localStorage.setItem('prodID' , childSnapshot.val().itemID);
             }

             var ma212=document.createElement('a');
             ma212.setAttribute('style','border : solid 1px black;  padding:5px; color:white; background-color:black; border-radius:10px  ');
             ma212.innerHTML = 'Remove';
             ma212.onclick = function(){

                firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyWishlist/${childSnapshot.val().id}`).set({})
                showToast('Remove from wishlist successfully')

                document.getElementById("showwishlist").innerHTML = '';
                showWishlist()

                // var myasynktask = new Promise(function(sucess , failure){
                //     setTimeout(function()  {
                //         window.location.reload();
                //     }, 2000)});

             }
             
            
             var div2 = document.createElement('div');
             div2.setAttribute('class','block2-txt flex-w flex-t p-t-14');

             var div3 = document.createElement('div');
             div3.setAttribute('class','block2-txt-child1 flex-col-l');

             var ma2=document.createElement('a');
             ma2.setAttribute('class','stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6');
             //ma2.setAttribute('href','product-detail.html');;
             ma2.innerHTML = ''+childSnapshot.val().prodName;
            
            
             var span = document.createElement('span');
             span.setAttribute('class','stext-105 cl3');
             span.innerHTML = 'PKR '+childSnapshot.val().prodPrice;

             var div4  = document.createElement('div');
             div4.setAttribute('class' , 'block2-txt-child2 flex-r p-t-3')

             var ma3=document.createElement('a');
             ma3.setAttribute('class','btn-addwish-b2 dis-block pos-relative js-addwish-b2');


             div1.appendChild(nimg);
             div1.appendChild(ma);
             //div1.appendChild(ma212);
             
           
             div4.appendChild(ma3);

             div3.appendChild(ma2);
             div3.appendChild(ma212)
             div2.appendChild(span);
             div2.appendChild(div3);
             div2.appendChild(div4)

             maindiv.appendChild(div1);
             maindiv.appendChild(div2);

             bdiv.appendChild(maindiv);
             ndiv.appendChild(bdiv);

             document.getElementById("showwishlist").appendChild(ndiv);
             document.getElementById("wish").removeAttribute('hidden');
             document.getElementById('loaddiv').hidden="true";

        })
    })
}}

// document.getElementById('search').onkeydown = function(event) {
//     if (event.keyCode == 13) {
//        search()
//     }
// }

function search(){


    

    var checker=0;
    var txtChecker = 0;
   
       // to remonve all previous search data from div 
       document.getElementById("showfetch").innerHTML="";
       document.getElementById('offline').innerHTML='';
       
       // taking input from user in search bar
       var txt = document.getElementById('search').value;
   
           var myasynktask = new Promise(function(sucess , failure){
               setTimeout(function()  {
                   if(checker==0){
                       document.getElementById('loaddiv').hidden="true";
                       document.getElementById('offline').innerHTML='<b> No Data Found OR You May Be Offline </b>';
                   }
                }, 8000)});
   
   
                
                document.getElementById('loaddiv').removeAttribute('hidden');
                
                // saerch data in firebase database in category node
                firebase.database().ref("/Items").on("value", function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        
                        var nam=childSnapshot.val().prodName+"s";
                        var desc=childSnapshot.val().prodColor+"s";

                        if(txt.length == 0  || txt == ''){
                            txt = childSnapshot.val().prodName; 
                            txtChecker = 1;
                        }
                        
                        
                        /* geting data from firebase and concatinate (name , description , model) of each and every item in
                        data variable seperatily */
                        var data = nam + desc ;   
                        
                        // check the presence of data in firbase with the refrence of user input in search bar
                        if(data.toUpperCase().includes(txt.toUpperCase())){
                       
                            if(txtChecker == 1){
                                txt = '';
                                console.log('txt' , txt)
                            }

                       checker=1;    


                    //    document.getElementById("showfetch").innerHTML="<h1>SEARCH RESULT</h1> <hr>";
                            

                       var ndiv = document.createElement('div');
                       ndiv.setAttribute('class','row isotope-grid');
                       ndiv.setAttribute('style','display:inline-block; min-width:300px; padding-right:5%; padding-left:5%; padding-bottom:2% ');
                       
           
                       var bdiv = document.createElement('div');
                       bdiv.setAttribute('class','isotope-item');
           
           
                       var maindiv = document.createElement('div');
                       maindiv.setAttribute('class','block2');
                      
           
                        var div1 = document.createElement('div');
                        div1.setAttribute('class','block2-pic hov-img0');
                     
           
                        var nimg=document.createElement('IMG');
                        nimg.setAttribute('class','mySize' );
                       //  nimg.setAttribute('width','250px')
                       //  nimg.setAttribute('height','250px');
                        nimg.setAttribute('src',''+ childSnapshot.val().imgUrl1);
           
                        var ma=document.createElement('a');
                        ma.setAttribute('class',' block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1');
                        ma.innerHTML = ' Quick View';
                        ma.href = 'product-detail.html';
                        ma.onclick = function(){
                          localStorage.setItem('prodID' , childSnapshot.val().id);
                        }
                        
                       
                        var div2 = document.createElement('div');
                        div2.setAttribute('class','block2-txt flex-w flex-t p-t-14');
           
                        var div3 = document.createElement('div');
                        div3.setAttribute('class','block2-txt-child1 flex-col-l');
           
                        var ma2=document.createElement('a');
                        ma2.setAttribute('class','stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6');
                        //ma2.setAttribute('href','product-detail.html');;
                        ma2.innerHTML = ''+childSnapshot.val().prodName;
                       
                       
                        var span = document.createElement('span');
                        span.setAttribute('class','stext-105 cl3');
                        span.innerHTML = 'PKR '+childSnapshot.val().prodPrice;
           
                        var div4  = document.createElement('div');
                        div4.setAttribute('class' , 'block2-txt-child2 flex-r p-t-3')
           
                        var ma3=document.createElement('a');
                        ma3.setAttribute('class','btn-addwish-b2 dis-block pos-relative js-addwish-b2');
           
                        var nimg2=document.createElement('IMG');
                        //  nimg.setAttribute('class','myimg');
                         nimg2.setAttribute('height','20px');
                         nimg2.setAttribute('width','20px')
                         nimg2.setAttribute('class' , 'icon-heart1 dis-block trans-04');
                         nimg2.setAttribute('src','images/icons/icon-heart-01.png');
                         
                       
                         var nimg3=document.createElement('IMG');
                        //  nimg.setAttribute('class','myimg');
                         nimg3.setAttribute('height','20px');
                         nimg3.setAttribute('width','20px')
                         nimg3.setAttribute('class' , 'icon-heart2 dis-block trans-04 ab-t-l');
                         nimg3.setAttribute('src','images/icons/icon-heart-02.png');
                         nimg3.onclick = function(){
                          
           
                           if(status == 'undefined' || status == undefined || status == null || myid == 'undefined' || myid == undefined || myid == null ){
                             
                               showToast('You need To Login or Signup to Continue')
                               var myasynktask = new Promise(function(sucess , failure){
                                   setTimeout(function()  {
                                       window.location.href="./login/login.html";
                                   }, 2000)});
           
                           }
                           else{
           
                               firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyWishlist/`).orderByChild("itemID").equalTo(childSnapshot.val().id).once("value",snapshot => {
                                   if (snapshot.exists()){
                                     showToast('Item Already exist in wishlist')
                                   }
           
                                   else{
                                       var skey = firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyWishlist/`).push();
           
                                       const send = {
                                           id:skey.key,
                                           itemID : childSnapshot.val().id,
                                           prodImage : childSnapshot.val().imgUrl1, 
                                           prodPrice : childSnapshot.val().prodPrice ,
                                           prodName : childSnapshot.val().prodName
                                       }
                                       skey.set(send);
                                       showToast('Add in to Wishlist successfully')
                                     }
                               })
                           }
                       }
                   
           
           
           
                        div1.appendChild(nimg);
                        div1.appendChild(ma);
                        
                        ma3.appendChild(nimg2);
                        ma3.appendChild(nimg3);
                        div4.appendChild(ma3);
           
                        div3.appendChild(ma2);
                        div2.appendChild(div3);
                        div2.appendChild(span);
                        div2.appendChild(div4)
           
                        maindiv.appendChild(div1);
                        maindiv.appendChild(div2);
           
                        bdiv.appendChild(maindiv);
                        ndiv.appendChild(bdiv);
           
                        document.getElementById("showfetch").appendChild(ndiv);
                        document.getElementById("offline").innerHTML = '';
                        document.getElementById('loaddiv').hidden="true";
   
                    //    highlightWord();
   
                    //    function highlightWord(){
                    //        var val=document.getElementById('pid').innerHTML;
                    //        if(val!=null || val!=''){
                    //            var myHilitor = new Hilitor("showfetch");
                    //            myHilitor.apply(txt);
                    //        }
                    //        else{
                    //            var myasynktask = new Promise(function(sucess , failure){
                    //                setTimeout(function()  {
                    //                        highlightWord();                  
                    //                    }, 3000)});  
                    //        }                               
                    //      }
                       }
                   });
               });
           
   
       }
   
       function signout(){

        firebase.auth().signOut()
        .then(function() {
            localStorage.setItem('ls_id','');
            localStorage.setItem('ls_name','');
            localStorage.setItem('status' , '')
        })
        .catch(function(error) {
          showToast(error);
        });
        
        localStorage.setItem('ls_id','');
        localStorage.setItem('ls_name','');
        localStorage.setItem('status' , '')
        showToast('Logout Successfully')

        window.location.reload()


    }