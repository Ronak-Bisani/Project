app
		.controller(
				'locationCtrl',
				function($scope, $http,alertify,$route,$rootScope,cfpLoadingBar) {
					
					$scope.disable_remove = true;

					// Adding Countries and Cities

					$scope.choices = [ {
						id : 'choice1'
					} ];
					$scope.addNewChoice = function() {
						var newItemNo = $scope.choices.length + 1;
						 $scope.disable_remove = false;
						$scope.choices.push({
							'id' : 'choice' + newItemNo
						});
					};

					$scope.showAddChoice = function(choice) {
						return choice.id === $scope.choices[$scope.choices.length - 1].id;
					};
					
					 $scope.removeChoice = function() {

	                        if ($scope.choices.length == 2) {
	                               $scope.disable_remove = true;

	                        }

	                        var newItemNo = $scope.choices.length - 1;

	                        $scope.choices.pop();

	                 };
					

					// Saving GEO locations

					$scope.addGeoLocations = function() {

						var len = $scope.choices.length;
						var index, dycountry = $scope.choices[0].country, dycity = $scope.choices[0].city, dyrate = $scope.choices[0].rateUplift;

						if (dyrate == "") {
							dyrate = "undefined";
						}

						if (isNaN($scope.choices[0].rateUplift)) {
							
							$scope.ErrorMessage = "Please enter valid rate uplift";
							$rootScope.disabledfun();
							return;
							
						}

						for (index = 1; index < len; index++) {

							if (isNaN($scope.choices[index].rateUplift)) {
								
								$scope.ErrorMessage = "Please enter valid rate uplift";
								$rootScope.disabledfun();
								
								return;
							}

							dycountry = dycountry + "," + $scope.choices[index].country;
							
							dycity = dycity + "," + $scope.choices[index].city;
							
							if ($scope.choices[index].rateUplift == "") {
								dyrate = dyrate + "," + "undefined";
							      } else {

								dyrate = dyrate + ","
										+ $scope.choices[index].rateUplift;
							}
						}

						if (!isNotEmpty(dycountry) || !isValidSpl(dycountry)) {
							
							
							
							$scope.ErrorMessage = "Please Enter Valid Country Name";
							$rootScope.disabledfun();
							return;
							
						} 
						
						else if (!isNotEmpty(dycity) || !isValidSpl(dycity)) {
							
							$scope.ErrorMessage = "Please Enter Valid City Name";
							$rootScope.disabledfun();
							
							return;
							
						} 
						
						else {
							$http(
									{
										method : 'POST',
										url : 'http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/savegeolocation',
										data : JSON.stringify({
											'aa' : 'bb'
										}), // forms user object
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded',
											param1 : dycountry,
											param2 : dycity,
											param3 : dyrate
										}
									})
									.success(
											function(data) {
												var errorObj = data.errors;
												if (angular.isObject(errorObj)) {
													alertify.alert(errorObj[0].message);
													return;
												} else {

													alertify
															.alert(
																	"Country and City Data has been Saved",
																	function() {
																		$route.reload();
																	})

												}

											});
						}
					};

				});
