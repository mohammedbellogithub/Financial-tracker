$(document).ready(function(){

	     
           order_array = [];

	       $('.order').click(function(){
	             var mname  = $(this).data("product_name");
	             var price  = $(this).data("price");
	             var cat    = $(this).data("cat");
	             var time   = $(this).data("time");
	             var id     = $(this).data("id");
	             var disp   = $(this).data("disp");
	             var image  = $(this).data("image");
	             var date   = $(this).data("date");
	             var seller = $(this).data("seller");
                 var qyt = 1;


                    
                  Order = {market_id:id,
                           market_date:date,
                           market_disp:disp, 
                           market_image:image,
                           market_name:mname,
                           market_price:price,
                           market_time:time,
                           market_cat:cat,
                           market_seller:seller,
                           market_qyt: qyt }
                                  

                     var count = inArray(mname,id,order_array);
						if (count > 0 ) {
                            var counts = order_array;
                            alert('Market +1');
                            for (var i = 0; i < counts.length; i++) {
                            	if (counts[i].market_name == mname && counts[i].market_id == id ) {
                            		 counts[i].market_qyt += 1;
                            	}
                            }

 							display();
							localStorage.orderRecord = JSON.stringify(order_array);
							 
						}else{
							//alert('Added To Chart');
							 
							 if (localStorage.orderRecord) {
							 	order_list = JSON.parse(localStorage.orderRecord);
							 	order_list.push(Order);
							 	localStorage.orderRecord = JSON.stringify(order_list);
	                             console.log(localStorage.orderRecord);

							 }else{
							 	order_array.push(Order);
	                             localStorage.orderRecord = JSON.stringify(order_array);
	                             console.log('ok');
							 }
							
						}				     
                 var count = order_array.length;
                  $('#count').html(count);

	             display();
	                                    
	       }); 


		 function display(){
		  var  total = 0; item=0; p=0; q=1; item2=0;
		     for(var i=0 ; i < order_array.length ; i++) {
		          total += order_array[i].market_price *order_array[i].market_qyt;    p++;
		           item  +=  "<tr><td>"+p+"</td><td>"+order_array[i].market_name+"</td><td>"+order_array[i].market_price+"</td><td>"+order_array[i].market_time+"</td></tr>"
		           
		       }
		            item2 =   "<td></td><td><td>"+ 'Total Price' +"<td>"+ total +"</td>" 
        

		       $('#demo').html(item);
		       $('.demo2').html(item2);
		 }



  
    function inArray(item,id,order){
    	var count = order.length;
    	for (var i =0; i < count ; i++) {
    		if ( (order[i]['market_name'] == item) && (order[i]['market_id'] == id) ) {
    			var num = 1;
    			return num;
    		}
    	}
    }

  

		
});



