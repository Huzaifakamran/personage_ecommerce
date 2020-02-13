var prodName , prodDescription , prodWeight , prodDimension , prodMaterial , prodColor , prodSize='' , prodSizeSmall='' , prodSizeMedium='' , prodSizeLarge='' ,
    prodSizeXL='' , prodSizeXXL='' , prodSizeOther='' , prodImage1 , prodImage2 , prodImage3 , prodImage4 , prodQuantity , prodCategory = 'All product' , prodPrice, prodVoucher='' , 
    prodDiscount='' , voucherDescription='' , imgUrl1='' , imgUrl2='' , imgUrl3='' , imgUrl4='' , error1;



document.getElementById('img1').onchange = function() {
        if(this.files[0].size > 1500000){
           showToast("File Size must less than 1.5 MB");
           this.value = "";
        };
    };

document.getElementById('img2').onchange = function() {
        if(this.files[0].size > 1500000){
           showToast("File Size must less than 1.5 MB");
           this.value = "";
        };
    };   
    
document.getElementById('img3').onchange = function() {
        if(this.files[0].size > 1500000){
           showToast("File Size must less than 1.5 MB");
           this.value = "";
        };
    };

document.getElementById('img4').onchange = function() {
        if(this.files[0].size > 1500000){
           showToast("File Size must less than 1.5 MB");
           this.value = "";
        };
    };    
    

function Validation(){

 prodName = document.getElementById("productName").value;
 prodDescription = document.getElementById("description").value;
 prodWeight = document.getElementById("weight").value;
 prodDimension = document.getElementById("dimension").value;
 prodMaterial = document.getElementById("material").value;
 prodColor = document.getElementById("color").value;
 prodPrice = document.getElementById("price").value;
 prodCategory  = document.getElementById("category").value;
 prodQuantity  = document.getElementById("quantity").value;
//  prodVoucher = document.getElementById("voucherCode").value;
//  prodDiscount = document.getElementById("voucherDiscount").value;
//  voucherDescription = document.getElementById("voucherDescription").value;

 prodSizeSmall = document.getElementById("small");
 prodSizeMedium = document.getElementById("medium");
 prodSizeLarge = document.getElementById("large");
 prodSizeXL = document.getElementById("XL");
 prodSizeXXL = document.getElementById("XXL");
 prodSizeOther = document.getElementById("other");

 prodImage1 = document.getElementById("img1").files[0];
 prodImage2 = document.getElementById("img2").files[0];
 prodImage3 = document.getElementById("img3").files[0];
 prodImage4 = document.getElementById("img4").files[0];

 if(prodImage1 == undefined && prodImage2 == undefined && prodImage3 == undefined && prodImage4 == undefined) {
    showToast('please select atleast one image');
 } 
 else if(prodName.length<3) {
      showToast('please write product name correctly');
}
else if(prodDescription.length<10) {
    showToast('please write product description correctly');
}
else if(prodWeight.length<1) {
    showToast('please write product weight correctly');
}
else if(prodDimension.length<1) {
    showToast('please write product dimension correctly');
}
else if(prodMaterial.length<3) {
    showToast('please write product material correctly');
}
else if(prodColor.length<3) {
    showToast('please add product colour correctly');
}
else if(prodPrice.length < 1){
    showToast('please write product price correctly');
}
else if(prodQuantity.length < 1){
    showToast('please write product Quantity correctly');
}
else if(
    prodSizeSmall.checked == false && prodSizeLarge.checked == false && prodSizeMedium.checked == false && 
    prodSizeXL.checked == false && prodSizeXXL.checked == false && prodSizeOther.checked == false
    ){
     showToast('please add atleast one product Size');
    }
else{
    prodSize = '';
    
    if(prodSizeSmall.checked == true ){
        prodSize = prodSize + prodSizeSmall.value + ',';
    }
    if(prodSizeMedium.checked == true ){
        prodSize = prodSize + prodSizeMedium.value + ',';
    }
    if(prodSizeLarge.checked == true ){
        prodSize = prodSize  + prodSizeLarge.value + ',';
    }
    if(prodSizeXL.checked == true ){
        prodSize = prodSize + prodSizeXL.value + ',';
    }
    if(prodSizeXXL.checked == true ){
        prodSize = prodSize + prodSizeXXL.value + ',';
    }
    if(prodSizeOther.checked == true ){
        prodSize = prodSize + prodSizeOther.value + ',';
    }

     ImageSender();
}    
}


function ImageSender(){

    prodImage1 = document.getElementById("img1").files[0];
    prodImage2 = document.getElementById("img2").files[0];
    prodImage3 = document.getElementById("img3").files[0];
    prodImage4 = document.getElementById("img4").files[0];

    document.getElementById('loaddiv').removeAttribute('hidden');
    document.getElementById('btnInsert').hidden="true";


    if(prodImage1 != undefined  &&  prodImage2 == undefined &&  prodImage3 == undefined &&  prodImage4 == undefined ){

        firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage1.name).put(prodImage1).then((snapshot)=>{
            return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                   imgUrl1 = downloadURL;
                   dataSender()
            }) .catch((error)=>{
                showToast("Some thing Went Wrong "+ error)    
                document.getElementById('btnInsert').removeAttribute('hidden');
                document.getElementById('loaddiv').hidden="true";
                
          })
    }

    if(prodImage1 != undefined  &&  prodImage2 != undefined &&  prodImage3 == undefined &&  prodImage4 == undefined){

        firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage1.name).put(prodImage1).then((snapshot)=>{
            return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                   imgUrl1 = downloadURL;
                   firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage2.name).put(prodImage2).then((snapshot)=>{
                    return snapshot.ref.getDownloadURL();
                    }).then(downloadURL => {
                      imgUrl2 = downloadURL
                      dataSender()

                    }) .catch((error)=>{
                        showToast("Some thing Went Wrong "+ error)    
                document.getElementById('btnInsert').removeAttribute('hidden');
                document.getElementById('loaddiv').hidden="true";
                  })
            }) .catch((error)=>{
               showToast("Some thing Went Wrong "+ error)    
                document.getElementById('btnInsert').removeAttribute('hidden');
                document.getElementById('loaddiv').hidden="true";
                
          })

      
    }
    

    if(prodImage1 != undefined  &&  prodImage2 != undefined &&  prodImage3 != undefined &&  prodImage4 == undefined){

        firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage1.name).put(prodImage1).then((snapshot)=>{
            return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                   imgUrl1 = downloadURL;
                   firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage2.name).put(prodImage2).then((snapshot)=>{
                    return snapshot.ref.getDownloadURL();
                    }).then(downloadURL => {
                      imgUrl2 = downloadURL
                      firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage3.name).put(prodImage3).then((snapshot)=>{
                        return snapshot.ref.getDownloadURL();
                        }).then(downloadURL => {
                            imgUrl3 = downloadURL
                            dataSender()

                        }) .catch((error)=>{
                            showToast("Some thing Went Wrong "+ error)    
                            document.getElementById('btnInsert').removeAttribute('hidden');
                            document.getElementById('loaddiv').hidden="true";
                      })

                    }) .catch((error)=>{
                        showToast("Some thing Went Wrong "+ error)    
                        document.getElementById('btnInsert').removeAttribute('hidden');
                        document.getElementById('loaddiv').hidden="true";
                  })
            }) .catch((error)=>{
                showToast("Some thing Went Wrong "+ error)    
                document.getElementById('btnInsert').removeAttribute('hidden');
                document.getElementById('loaddiv').hidden="true";
                
          })

    
    }
    

    if(prodImage1 != undefined  &&  prodImage2 != undefined &&  prodImage3 != undefined &&  prodImage4 != undefined){

        firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage1.name).put(prodImage1).then((snapshot)=>{
            return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
                   imgUrl1 = downloadURL;
                   firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage2.name).put(prodImage2).then((snapshot)=>{
                    return snapshot.ref.getDownloadURL();
                    }).then(downloadURL => {
                      imgUrl2 = downloadURL
                      firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage3.name).put(prodImage3).then((snapshot)=>{
                        return snapshot.ref.getDownloadURL();
                        }).then(downloadURL => {
                            imgUrl3 = downloadURL
                            firebase.storage().ref("storage").child(''+(new Date()).getTime()+prodImage4.name).put(prodImage4).then((snapshot)=>{
                                return snapshot.ref.getDownloadURL();
                                }).then(downloadURL => {
                                 imgUrl4 = downloadURL
                                    dataSender();
                                }) .catch((error)=>{
                                    showToast("Some thing Went Wrong "+ error)    
                document.getElementById('btnInsert').removeAttribute('hidden');
                document.getElementById('loaddiv').hidden="true";
                              })
                            
                        }) .catch((error)=>{
                            showToast("Some thing Went Wrong "+ error)    
                document.getElementById('btnInsert').removeAttribute('hidden');
                document.getElementById('loaddiv').hidden="true";
                      })

                    }) .catch((error)=>{
                        showToast("Some thing Went Wrong "+ error)    
                        document.getElementById('btnInsert').removeAttribute('hidden');
                        document.getElementById('loaddiv').hidden="true";
                  })
            }) .catch((error)=>{
                showToast("Some thing Went Wrong "+ error)    
                document.getElementById('btnInsert').removeAttribute('hidden');
                document.getElementById('loaddiv').hidden="true";
                
          })
     }
    
   }


  


   function dataSender(){

    prodColor = prodColor + ',';

    var image = 'https://firebasestorage.googleapis.com/v0/b/personage-2020.appspot.com/o/storage%2F1581070195680nomoreimage.png?alt=media&token=bc8d61d0-71cc-4e2e-a1ce-0f012444099d'

    if (imgUrl2 == ''){
        imgUrl2 = image;
    }

    if (imgUrl3 == ''){
        imgUrl3 = image;
    }

    if (imgUrl4 == ''){
        imgUrl4 = image;
    }

    var database = firebase.database().ref();
    var skey =  database.child("Items").push();
        const send = {
            id:skey.key,
            prodName,
            prodDescription,
            prodWeight,
            prodDimension,
            prodMaterial,
            prodColor,
            prodSize ,
            prodCategory ,
            prodPrice ,
            prodQuantity ,
            // prodVoucher ,
            // prodDiscount ,
            // voucherDescription ,
            imgUrl1 ,
            imgUrl2 ,
            imgUrl3 ,
            imgUrl4
        }
        skey.set(send);
        document.getElementById('btnInsert').removeAttribute('hidden');
        document.getElementById('loaddiv').hidden="true";
        showToast("Data Adeed Successfully ")   
   }


