var total = 0 , delivery = 200 , final , detail = [] , voucherCode = 'N/A'  , maxDiscount , miniVal  , voucherApplied = 0;


function placeOrder(){
    document.getElementById("error1").style.color = "red";
    var name =  document.getElementById('name').value;
    var email =  document.getElementById('email').value;
    var address =  document.getElementById('address').value;
    var phone =  document.getElementById('phone').value;

    if(detail.length <= 0){
        document.getElementById('error1').innerHTML = 'you dont have any item selected in your cart'
    }
    else if(phone == '' || address == ''){
        document.getElementById('error1').innerHTML = 'Please fill all textfeild(s)'
	}
	else if(phone.length <11 || phone.length > 11){
        document.getElementById('error1').innerHTML = 'Enter correct number'
	}
    else{
       var checker = 0;
        document.getElementById('error1').innerHTML = '';

        var database = firebase.database().ref();
        var skey =  database.child("orders").push();

       var date = getDateTime();

        const send = {
            id:skey.key,
            name,
            email ,
            address ,
            phone ,
            userID : localStorage.getItem('ls_id') ,
            date,
            status : 'Pending' ,
            total ,
            voucherCode

           }

           skey.set(send)

        var mainID =  skey.key;

         for(var i=0; i<detail.length; i++){
            var skey1 =  database.child(`orders/${mainID}`).push(); 
               
            const send1 = {
                id:skey1.key,
                prodName : detail[i].prodName ,
                prodPrice : detail[i].prodPrice ,
                shirtQuantity : ''+detail[i].shirtQuantity ,
                prodImage :detail[i].prodImage ,
                itemID : detail[i].itemID ,
                prodColor : detail[i].prodColor ,
                prodSize : detail[i].prodSize
               
               }

            skey1.set(send1);

            } 

            firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyCart`).set({})
            document.getElementById("error1").style.color = "green";
            document.getElementById('error1').innerHTML = 'Order placed Successfully'

            while (detail.length > 0){
                detail.splice(0 , 1)
            }



    //     for(var i=0; i<detail.length; i++){
    //         firebase.database().ref(`Items/${detail[i].itemID}`).on("value", function(snapshot) {
    //             var prevQuantity = snapshot.val().prodQuantity;
                
    //              if( parseInt(prevQuantity) >= parseInt(detail[i].shirtQuantity)){
    //             var newQuantity = parseInt(prevQuantity) - parseInt(detail[i].shirtQuantity);
    //             firebase.database().ref(`Items/${detail[i].itemID}/`).set({prodQuantity : newQuantity})
    //             }
    //         })  

    // }

  }
}




function showCart(){

    firebase.database().ref('ShipFee/').on("value", function(snapshot) { 
        delivery = snapshot.val().fee;
     })

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
       document.getElementById('email').value = localStorage.getItem('ls_email');
       document.getElementById('name').value = localStorage.getItem('ls_name');


    document.getElementById('cartData').innerHTML = '';

    var tr11 = document.createElement('tr');
    tr11.setAttribute('class' , 'table_head');

    var td11 = document.createElement('td')
    td11.setAttribute('class' , 'column-1')
    td11.innerHTML = 'Product'

    var td22 = document.createElement('td')
    td22.setAttribute('class' , 'column-2')
    td22.innerHTML = ''

    var td33 = document.createElement('td')
    td33.setAttribute('class' , 'column-3')
    td33.innerHTML = 'Price'

    var td44 = document.createElement('td')
    td44.setAttribute('class' , 'column-4')
    td44.innerHTML = 'Quantity'

    var td55 = document.createElement('td')
    td55.setAttribute('class' , 'column-5')
    td55.innerHTML = 'Total'

    var td66 = document.createElement('td')
    td66.setAttribute('class' , 'column-6')
    

    tr11.appendChild(td11);
    tr11.appendChild(td22);
    tr11.appendChild(td33);
    tr11.appendChild(td44);
    tr11.appendChild(td55);
    tr11.appendChild(td66);

    document.getElementById('cartData').appendChild(tr11)

    var status = localStorage.getItem('status');
    var myid = localStorage.getItem('ls_id');
    
    if(status == 'undefined' || status == undefined || status == null || myid == 'undefined' || myid == undefined || myid == null ){
        showToast('You need To Login or Signup to View Your Cart')
    }
    else{

       firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyCart/`).on("value", function(snapshot) {
        
        snapshot.forEach(function(childSnapshot) {


            var tr1 = document.createElement('tr');
            tr1.setAttribute('class' , 'table_row');

            var td1 = document.createElement('td')
            td1.setAttribute('class' , 'column-1')
            
            var div1 = document.createElement('div');
            div1.setAttribute('class' , 'how-itemcart1')

            var img1 = document.createElement('img')
            img1.setAttribute('src' , childSnapshot.val().prodImage )

            var td2 = document.createElement('td')
            td2.setAttribute('class' , 'column-2')
            td2.innerHTML = childSnapshot.val().prodName

            var td3 = document.createElement('td')
            td3.setAttribute('class' , 'column-3')
            td3.innerHTML =  childSnapshot.val().prodPrice;

            var td4 = document.createElement('td')
            td4.setAttribute('class' , 'column-4')
            td4.innerHTML =  childSnapshot.val().shirtQuantity;

            var subtotal = parseInt(childSnapshot.val().shirtQuantity) * parseInt(childSnapshot.val().prodPrice);

            total = total + subtotal;

            var td5 = document.createElement('td')
            td5.setAttribute('class' , 'column-5')
            td5.innerHTML = subtotal;

            var td6 = document.createElement('td')
            td6.setAttribute('class' , 'column-6') 
            
            var btn = document.createElement('button');
            btn.setAttribute('class' , 'form-control btn btn-success');
            btn.setAttribute('style',' border:solid thin; padding:5px; background-color:rgb(182,207,222);');
            btn.innerHTML="Remove";
            btn.onclick = function(){
                firebase.database().ref(`Users/${localStorage.getItem('ls_id')}/MyCart/${childSnapshot.val().id}`).set({})
                showToast('Item Removed Successfully')
                var myasynktask = new Promise(function(sucess , failure){
                    setTimeout(function()  {
                        window.location.reload();
                    }, 2000)});

           }

           td6.appendChild(btn);

            div1.appendChild(img1);
            td1.appendChild(div1);

            tr1.appendChild(td1)
            tr1.appendChild(td2)
            tr1.appendChild(td3)
            tr1.appendChild(td4)
            tr1.appendChild(td5)
            tr1.appendChild(td6)

            document.getElementById('cartData').appendChild(tr1)  
            
            final = parseInt(total) + parseInt(delivery);
            
            document.getElementById('total').innerHTML = 'PKR ' + total;
            document.getElementById('delivery').innerHTML = 'PKR ' + delivery;
            document.getElementById('final').innerHTML = 'PKR ' + final;

           var prodObj = {
              prodName : childSnapshot.val().prodName ,
              prodPrice : childSnapshot.val().prodPrice ,
              shirtQuantity : childSnapshot.val().shirtQuantity ,
              prodImage : childSnapshot.val().prodImage ,
              itemID : childSnapshot.val().itemID ,
              prodColor : childSnapshot.val().prodColor ,
              prodSize : childSnapshot.val().prodSize
           }

           detail.push(prodObj);
      })
    }) 
  }
}
}

function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}


function ApplyCoupen(){''


var coupen = document.getElementById('coupen').value;


    firebase.database().ref('Voucher').on("value", function(snapshot) {
        voucherCode = snapshot.val().voucher;
        maxDiscount = snapshot.val().maxDiscount;
        miniVal = snapshot.val().minimum;

        console.log('chala' + maxDiscount )

        if(voucherApplied == 1){
            showToast('voucher Already Applied')   
        }

       else if(voucherCode == coupen  &&  miniVal < total ){
            final = final - maxDiscount;
            document.getElementById('final').innerHTML = 'PKR ' + final + '   (Total Discount from Voucher is PKR '+ maxDiscount +')';
            showToast('Voucher Applied')
            voucherApplied = 1;
        }

        else if(voucherCode == coupen &&  miniVal > total ){
            showToast('Require  Minimum order of PKR ' + miniVal + ' to apply Voucher')
        }
        else{
          showToast('voucher Does not exist')
        }


    })


    

}


