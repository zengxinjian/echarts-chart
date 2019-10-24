function returnColor(num,imgdata){
         var r=Math.random();
          if((num>0)&&(num<=100)){
            // console.log("You -100")
             for (var i=0;i<imgdata.data.length;i+=4)
             {
             //   imgdata.data[i+0]=0;
               imgdata.data[i+0]=0;
               imgdata.data[i+1]=0;
               imgdata.data[i+2]=255;
               imgdata.data[i+3]=255;
           }
         }else if((num>100)&&(num<=125)){
            // console.log("You -50--100")
             for (var i=0;i<imgdata.data.length;i+=4)
           {
          
             //   imgdata.data[i+0]=0;
               imgdata.data[i+0]=0;
               imgdata.data[i+1]=191;
               imgdata.data[i+2]=255;
               imgdata.data[i+3]=255;
           }
         }else if((num>125)&&(num<=150)){
            // console.log("You -50 -0")
             for (var i=0;i<imgdata.data.length;i+=4)
           {
            
             //   imgdata.data[i+0]=0;
               imgdata.data[i+0]=0;
               imgdata.data[i+1]=139;
               imgdata.data[i+2]=69;
               imgdata.data[i+3]=255;
           }
         }else if((num>150)&&(num<=175)){
           // console.log("You 0-10")
             for (var i=0;i<imgdata.data.length;i+=4)
           {
             
             //   imgdata.data[i+0]=255;
               imgdata.data[i+0]=0;
               imgdata.data[i+1]=255;
               imgdata.data[i+2]=0;
               imgdata.data[i+3]=255;
           }
         }else if((num>175)&&(num<=200)){
           // console.log("You 10-30")
             for (var i=0;i<imgdata.data.length;i+=4)
           {  
               
             //   imgdata.data[i+0]=255;
               imgdata.data[i+0]=255;
               imgdata.data[i+1]=127;
               imgdata.data[i+2]=36;
               imgdata.data[i+3]=255;
           }
         }else if((num>200)&&(num<=225)){
            // console.log("You 30-50")
         for (var i=0;i<imgdata.data.length;i+=4)
           {
            
             //   imgdata.data[i+0]=255;
               imgdata.data[i+0]=255;
               imgdata.data[i+1]=0;
               imgdata.data[i+2]=0;
               imgdata.data[i+3]=255;
           }
       }else{
         for(var i=0;i<imgdata.data.length;i+=4){
          imgdata.data[i+0]=255;
          imgdata.data[i+1]=48;
          imgdata.data[i+2]=48;
          imgdata.data[i+3]=255;
         }
       }
       return imgdata;
}



function returnColor3(num,imgdata,arr){
	console.log(arr);
    var max=Math.max.apply(null,arr);
    var min=Math.min.apply(null, arr);
    var current=max-min;
    var r=0,g=0,b=0;
    var half=current/2;
//    var half=arr.length/current;
//    var one=current/255;
    var one=(num-min)/half*255;
  var two=(1-(max-num)/half)*255;
  if(num-min<half){
    b=Math.round(one);
    g=0;
  }
  if(num-min>=half){
    r=Math.round(two);
    g=0;
  }
//    if(num<half){
//      b=num*one;
//      r=0;
//    }
//    if(num>half){
//      r=num*one;
//      b=0;
//    }
    for (var i=0;i<imgdata.data.length;i+=4)
    {
    //   imgdata.data[i+0]=0;
      imgdata.data[i+0]=r;
      imgdata.data[i+1]=g;
      imgdata.data[i+2]=b;
      imgdata.data[i+3]=145;
  }
    return imgdata;
}