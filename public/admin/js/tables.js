function showTables(){

    document.getElementById('tbody').innerHTML = '';

    var status = document.getElementById('itemtype').value;

    firebase.database().ref("/orders").orderByChild("status").equalTo(status).on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) { 

            var tr = document.createElement('tr');
               
            var td1 = document.createElement('td');   
            var td2 = document.createElement('td');   
            var td3 = document.createElement('td');   
            var td4 = document.createElement('td');   
            var td5 = document.createElement('td'); 
            var td6 = document.createElement('td'); 
            
            td1.innerHTML = childSnapshot.val().name;
            td2.innerHTML = childSnapshot.val().phone;
            td3.innerHTML = childSnapshot.val().email;
            td4.innerHTML = childSnapshot.val().date;
            td5.innerHTML = childSnapshot.val().status;

          
            // if(status == 'Pending'){
            //     td5.setAttribute('style' , 'color:red');
            // }
            // else if(status == 'Approved'){
            //     td5.setAttribute('style' , 'color:orange');
            // }
            // else if(status == 'Delivered'){
            //     td5.setAttribute('style' , 'color:green');
            // }
          

            var btn = document.createElement('a');
            btn.setAttribute('width' , '100px');
            btn.setAttribute('height' , '60px');
            btn.setAttribute('class' , 'btn')
            btn.innerHTML = "Details"
            btn.setAttribute('style' , 'background-color :rgb(168,175,235); color:white')

            btn.onclick = function(){

                document.getElementById('resolve').innerHTML = '';
                        document.getElementById('showmodaldata').innerHTML = ""

                        var div = document.createElement('div');

                        var p1 = document.createElement('p');
                        p1.setAttribute('style' , 'text-align : center')
                        var b1 = document.createElement('b');
                        b1.innerHTML = 'Customer Detail'
                        p1.appendChild(b1);
                      

                        var p11 = document.createElement('p');
                        p11.innerHTML = 'Name : ' + childSnapshot.val().name + '<br>' +
                                        'Email :  ' + childSnapshot.val().email + '<br>' +
                                        'Phone  :  ' + childSnapshot.val().phone + '<br>' +
                                        'Address :  ' + childSnapshot.val().address + '<br>' +
                                        'Date :  ' + childSnapshot.val().date + '<br>' +
                                        'Total :  ' + childSnapshot.val().total + '<br>' +
                                        'Voucher Code :  ' + childSnapshot.val().voucherCode + '<br>' +
                                        'Status :  ' + childSnapshot.val().status;

                         div.appendChild(p1)
                         div.appendChild(p11)

                         var p2 = document.createElement('p');
                         p2.setAttribute('style' , 'text-align : center')

                        var b2 = document.createElement('b');
                        b2.innerHTML = 'Order Detail'
                        p2.appendChild(b2);

                        div.appendChild(p2)

                    firebase.database().ref(`/orders/${childSnapshot.val().id}`).on("value", function(snapshot1) {
                    snapshot1.forEach(function(childSnapshot1) { 

                        if(childSnapshot1.val().prodName != undefined){

                        var div1 = document.createElement('div');
                       
                        var b22 = document.createElement('p');
                        b22.setAttribute('style' , 'padding:5px;  display:inline-block; margin:auto');
                        b22.innerHTML = 'Product Name : ' + childSnapshot1.val().prodName + '<br>' +
                        'Product Price :  ' + childSnapshot1.val().prodPrice + '<br>' +
                        'Product Color  :  ' + childSnapshot1.val().prodColor + '<br>' +
                        'Product Size :  ' + childSnapshot1.val().prodSize + '<br>' +
                        'Product Quantity :  ' + childSnapshot1.val().shirtQuantity;

                        var nimg=document.createElement('IMG');
                        nimg.setAttribute('height','150px');
                        nimg.setAttribute('width','120px');
                        nimg.setAttribute('style','margin-left : 50px; margin-bottom:50px; border:solid thin rgb(168,175,235);  border-radius:10px;');
                        nimg.setAttribute('src',''+ childSnapshot1.val().prodImage);
                       
                        div1.appendChild(b22);
                        div1.appendChild(nimg);
                        
                        div.appendChild(div1);

                        }
                    })
                })

                var btn1 = document.createElement('button');
                btn1.setAttribute('width' , '100px');
                btn1.setAttribute('height' , '60px');
                btn1.setAttribute('class' , 'btn')
                btn1.innerHTML = "Accept"
                btn1.setAttribute('style' , 'background-color :rgb(168,175,235); color:white; margin:5px')
    
                btn1.onclick = function(){
                    firebase.database().ref(`/orders/${childSnapshot.val().id}/status`).set("Accept");
                    document.getElementById('showmodaldata').innerHTML = ""
                    document.getElementById('resolve').innerHTML = 'Order Accepted Successfully'

                    var myasynktask = new Promise(function(sucess , failure){
                        setTimeout(function()  {
                            window.location.reload();
                         }, 2000)});

                }

                var btn2 = document.createElement('button');
                btn2.setAttribute('width' , '100px');
                btn2.setAttribute('height' , '60px');
                btn2.setAttribute('class' , 'btn')
                btn2.innerHTML = "Reject"
                btn2.setAttribute('style' , 'background-color :rgb(168,175,235); color:white; margin:5px')
    
                btn2.onclick = function(){
                    firebase.database().ref(`/orders/${childSnapshot.val().id}/status`).set("Reject");
                    document.getElementById('showmodaldata').innerHTML = ""
                    document.getElementById('resolve').innerHTML = 'Order Rejected'

                    var myasynktask = new Promise(function(sucess , failure){
                        setTimeout(function()  {
                            window.location.reload();
                         }, 2000)});

                }

                var btn3 = document.createElement('button');
                btn3.setAttribute('width' , '100px');
                btn3.setAttribute('height' , '60px');
                btn3.setAttribute('class' , 'btn')
                btn3.innerHTML = "Delivered"
                btn3.setAttribute('style' , 'background-color :rgb(168,175,235); color:white; margin:5px')
    
                btn3.onclick = function(){
                    firebase.database().ref(`/orders/${childSnapshot.val().id}/status`).set("Delivered");
                    document.getElementById('showmodaldata').innerHTML = ""
                    document.getElementById('resolve').innerHTML = 'Order Delivered Successfully'
                   
                    var myasynktask = new Promise(function(sucess , failure){
                        setTimeout(function()  {
                            window.location.reload();
                         }, 2000)});
                   
                   
                }




                div.appendChild(btn1);
                div.appendChild(btn2);
                div.appendChild(btn3);


                document.getElementById('showmodaldata').appendChild(div)

            }


            btn.setAttribute('data-toggle' , 'modal');
            btn.href= '#signupModalCenter';
           
            td6.appendChild(btn)

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);

            document.getElementById('tbody').appendChild(tr); 

        })
    })
}