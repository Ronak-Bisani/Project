app.controller('locationViewCtrl',function($scope, $http, $route,alertify,$rootScope) {

			/*	$scope.currentPage = 1;
				$scope.pageSize = 1;*/
				
				// To get all country details
				
				$http
					.get(
						"http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getcountries")
					.then(
						function(response) {

								var len = response.data.records.length;
								var index;
								var index1;
								var country1=[];
								country1[0] = "All";
								for (index = 1; index <= len; index++) {
									index1 = index - 1;
									country1[index] = response.data.records[index1].country;											
								}
								
								// get country details
								
								$scope.CountryNames = country1;
					});
				
					$scope.countrySelected = function(selectedCountry) {
						$scope.currentPage = 1;
						$scope.pageSize = 1;
					
					if ((selectedCountry == undefined)
					|| (selectedCountry == "Please Select Country")) {
						$scope.ErrorMessage = "Please Select Country";
						$scope.countryName = null;
						$rootScope.disabledfun();
						return;
					}
					else{
						$rootScope.clrDesc();
					}
					
					var url = "http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getCityAndUpliftRateByCountry?Country="
						+ selectedCountry;
					
					$http
					     .get(url)
					     .then(
					    	function(response) {
 								$scope.countryName = response.data.records;
					    	});
				}
				
				$scope.deleteGeoLocations = function(locationID) {
										
						alertify.confirm("Are you sure?",
										 function(){
										 		$http({
										 				method : 'DELETE',
										 				url : 'http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/deletelocation',
										 				data : JSON.stringify({
										 				'aa' : 'bb'
										 				}), 
												headers : {
														'Content-Type' : 'application/x-www-form-urlencoded',
														param1 : locationID
												}
										 		})
										 		.success(function(data) {
										 				if ((data == -1) || (data == 0)) {
										 					alertify.alert("Location data cannot be deleted.");
										 				}
										 				else {
										 					alertify.alert("Location data deleted successfully.");
										 					$route.reload();
										 				}
										 		})
							          });			
				}
});	