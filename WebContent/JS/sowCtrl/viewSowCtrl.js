app.controller('viewSowCtrl',function($scope, $http, $route,alertify,$location) {

				// Method For getting all SOW view
	
				/*$scope.currentPage = 1;
				$scope.pageSize = 1;*/
          
				$http.get(
						"http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getviewsow")
						.then(
						function(response) {
					
							
							//alert("SOW ID :"+response.data.records[1].SOWID);

								//var len = response.data.records.length;
								//var index;
								/*var index1;*/
								//var sowview=[];
								//sowid[0] = "All";
								//for (index = 1; index <= len; index++) {
									/*index1 = index - 1;*/
									//sowview[index] = response.data.records[index].SOWVIEW;											
								//}
								$scope.currentPage = 1;
								$scope.pageSize = 4;
								$scope.ViewSOWs = response.data.records;
								
					});
					
				
$scope.Deletesowview = function(ID) {
	
	alertify.confirm("Are you sure?",
					 function(){
					 		$http({
					 				method : 'DELETE',
					 				url : 'http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/deletesowid',
					 				data : JSON.stringify({
					 				'aa' : 'bb'
					 				}), 
							headers : {
									'Content-Type' : 'application/x-www-form-urlencoded',
									param1 : ID
							}})
					 		.success(function(data) {
				 				if ((data == -1) || (data == 0)) {
				 					alertify.alert("SOW Record cannot be deleted.");
				 				}
				 				else {
				 					alertify.alert("SOW Record deleted successfully.");
				 					$route.reload();
				 				}
				 		})
					 		
					 		});
}
$scope.Deletesowdid = function(did) {
	

	
	alertify.confirm("Are you sure?",
					 function(){
					 		$http({
					 				method : 'DELETE',
					 				url : 'http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/deletesowdid',
					 				data : JSON.stringify({
					 				'aa' : 'bb'
					 				}), 
							headers : {
									'Content-Type' : 'application/x-www-form-urlencoded',
									param1 : did
							}})
					 		.success(function(data) {
				 				/*if ((data == -1) || (data == 0)) {
				 					alertify.alert("DID Record cannot be deleted.");
				 					return;
				 				}*/
				 				/*else {*/
				 					alertify.alert("DID Record deleted successfully.");
				 					$route.reload();
				 				/*}*/
				 		})
					 		
					 		});
}

$scope.CreateSow  = function() {                            
    $location.path("/createSow");
    }           


$scope.EditSow = function(){
	$location.path("/EditSow");
}

});
	


					 		
		        	      