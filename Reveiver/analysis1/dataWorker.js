var data=[];
this.onmessage=function(event){
	if(event.data="12"){
		var socket = new WebSocket("ws://169.254.10.11:8080/SituEarth/ws/websocketshort/"+"user");
		socket.onmessage=function(ev){
			var arr=[];
			array = ev.data.split(',');
//			console.log(array);
			solutionData(array);
			
		}
	}
	
}


var chunkData1=[];
arr0=[],arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],arr7=[],
arr8=[],arr9=[],arr10=[],arr11=[],arr12=[],arr13=[],arr14=[],arr15=[],arr16=[],
arr17=[],arr18=[],arr19=[],arr20=[],arr21=[],arr22=[],arr23=[],arr24=[],
arr25=[],arr26=[],arr27=[],arr28=[],arr29=[],arr30=[],arr31=[];


function solutionData(array){
	   if(parseInt(array[0])===0) {
			for (var i = 1; i < array.length; i++) {
				arr0.push(array[i])
				if (arr0.length === 18750) {
					this.postMessage(["0",arr0]);
					arr0 = [];
				}
			}

	  }else if(parseInt(array[0])===1){
	       for(var i=1;i<array.length;i++){
	          arr1.push(array[i]);
	          if (arr1.length === 18750) {
					this.postMessage(["1",arr1]);
					arr1 = [];
				}
	       }
	        
	   }else if(parseInt(array[0])===2){
	       for(var i=1;i<array.length;i++){
	          arr2.push(array[i]);
	          if (arr2.length === 18750) {
	        	  this.postMessage(["2",arr2]);
					arr2 = [];
				}
	       }
	         
	   }else if(parseInt(array[0])===3){
	       for(var i=1;i<array.length;i++){
	         arr3.push(array[i])
	          if (arr3.length === 18750) {
	        	  this.postMessage(["3",arr3]);
					arr3 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===4){
	       for(var i=1;i<array.length;i++){
	         arr4.push(array[i]);
	         if (arr4.length === 18750) {
	        	  this.postMessage(["4",arr4]);
					arr4 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===5){
	       for(var i=1;i<array.length;i++){
	         arr5.push(array[i]);
	         if (arr5.length === 18750) {
	        	  this.postMessage(["5",arr5]);
					arr5 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===6){
	       for(var i=1;i<array.length;i++){
	          arr6.push(array[i]);
	          if (arr6.length === 18750) {
	        	  this.postMessage(["6",arr6]);
					arr6 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===7){
	       for(var i=1;i<array.length;i++){
	          arr7.push(array[i]);
	          if (arr7.length === 18750) {
	        	  this.postMessage(["7",arr7]);
					arr7 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===8){
	       for(var i=1;i<array.length;i++){
	          arr8.push(array[i]);
	          if (arr8.length === 18750) {
	        	  this.postMessage(["8",arr8]);
					arr8 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===9){
	       for(var i=1;i<array.length;i++){
	          arr9.push(array[i]);
	          if (arr9.length === 18750) {
	        	  this.postMessage(["9",arr9]);
					arr9 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===10){
	       for(var i=1;i<array.length;i++){
	          arr10.push(array[i]);
	          if (arr10.length === 18750) {
	        	  this.postMessage(["10",arr10]);
					arr10 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===11){
	       for(var i=1;i<array.length;i++){
	          arr11.push(array[i]);
	          if (arr11.length === 18750) {
	        	  this.postMessage(["11",arr11]);
					arr11 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===12){
	       for(var i=1;i<array.length;i++){
	          arr12.push(array[i]);
	          if (arr12.length === 18750) {
	        	  this.postMessage(["12",arr12]);
					arr12 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===13){
	       for(var i=1;i<array.length;i++){
	          arr13.push(array[i]);
	          if (arr13.length === 18750) {
	        	  this.postMessage(["13",arr13]);
					arr13 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===14){
	       for(var i=1;i<array.length;i++){
	          arr14.push(array[i]);
	          if (arr14.length === 18750) {
	        	  this.postMessage(["14",arr14]);
					arr14 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===15){
	       for(var i=1;i<array.length;i++){
	          arr15.push(array[i]);
	          if (arr15.length === 18750) {
	        	  this.postMessage(["15",arr15]);
					arr15 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===16){
	       for(var i=1;i<array.length;i++){
	          arr16.push(array[i]);
	          if (arr16.length === 18750) {
	        	  this.postMessage(["16",arr16]);
					arr16 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===17){
	       for(var i=1;i<array.length;i++){
	          arr17.push(array[i]);
	          if (arr17.length === 18750) {
	        	  this.postMessage(["17",arr17]);
					arr17 = [];
				}
	       }
	          
	   }else if(parseInt(array[0])===18){
	       for(var i=1;i<array.length;i++){
	          arr18.push(array[i]);
	          
	       }
	          
	   }else if(parseInt(array[0])===19){
	       for(var i=1;i<array.length;i++){
	          arr19.push(array[i])
	       }
	          
	   }else if(parseInt(array[0])===20){
	       for(var i=1;i<array.length;i++){
	          arr20.push(array[i])
	       }
	          
	   }else if(parseInt(array[0])===21){
	       for(var i=1;i<array.length;i++){
	          arr21.push(array[i])
	       }
	          
	   }else if(parseInt(array[0])===22){
	       for(var i=1;i<array.length;i++){
	          arr22.push(array[i])
	       }
	          
	   }else if(parseInt(array[0])===23){
	       for(var i=1;i<array.length;i++){
	          arr23.push(array[i])
	       }
	          
	   }else if(parseInt(array[0])===24){
	       for(var i=1;i<array.length;i++){
	          arr24.push(array[i])
	       }
	          
	   }else if(parseInt(array[0])===25){
	       for(var i=1;i<array.length;i++){
	          arr25.push(array[i]);
	          if (arr25.length === 1024) {
					chunkData1[25] = arr25;
					arr25 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===26){
	       for(var i=1;i<array.length;i++){
	          arr26.push(array[i]);
	          if (arr26.length === 1024) {
					chunkData1[26] = arr26;
					arr26 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===27){
	       for(var i=1;i<array.length;i++){
	          arr27.push(array[i]);
	          if (arr27.length === 18750) {
					chunkData1[27] = arr27;
					arr27 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===28){
	       for(var i=1;i<array.length;i++){
	          arr28.push(array[i]);
	          if (arr28.length === 1024) {
					chunkData1[28] = arr28;
					arr28 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===29){
	       for(var i=1;i<array.length;i++){
	          arr29.push(array[i]);
	          if (arr29.length === 1024) {
					chunkData1[29] = arr29;
					arr29 = [];
					
				}
	       }
	          
	   }else if(parseInt(array[0])===30){
	       for(var i=1;i<array.length;i++){
	          arr30.push(array[i]);
	          if (arr30.length === 1024) {
					chunkData1[30] = arr30;
					arr30 = [];
				}
	       }
	        
	          
	   }else if(parseInt(array[0])===31){
		  
	       for(var i=1;i<array.length;i++){
	          arr31.push(array[i])
	          if (arr31.length === 1024) {
					chunkData1[31] = arr31;
					arr31 = [];
					
				}
	       }
	         
	   }

//	   if(chunkData1.length===32){
//		   console.log(chunkData1);
//	   }
	  
	}