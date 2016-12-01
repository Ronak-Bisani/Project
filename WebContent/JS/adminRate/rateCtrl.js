app
		.controller(
				'rateCtrl',
				function($scope, $http,alertify,$route,$rootScope,cfpLoadingBar) {
					
					
					$scope.disable_remove = true;
					
					
					// *********************Getting all
					// countries********************

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getcountries")
							.success(function(response) {
								$scope.Countries = response.records;

							});

					// Adding Roles and Rates

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
					

					$scope.countrySelected = function(country) {
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/roleservice/getrolename?Country="
								+ country

						$http.get(url).success(function(response) {

							var index;
							var woidsWS = [];
							woidsWS = $scope.rolenames;

							// ******** Will be used for editing Role N Rate
							// ************
							var len = woidsWS.length;
							$scope.output = [];
							for (index = 0; index < len; index++) { // $scope.woidsWS[index]
								$scope.output.push({
									"role" : woidsWS[index]
								// "rate": budgetWS[index],
								// "id" :idsWS[index]

								});

							}

						});
					}

					// ************************Saving Country, Role, Rate
					// ******************************************

					var flag = 0;

					function testInputData(myData) {

						var decimalOnly = /^\s*-?[1-9]\d*(\.\d{1,5})?\s*$/;
						var fdata = myData.split(",");
						/* alert(myData); */

						// var decimalOnly = /^[0-9]+$/;
						for (i = 0; i < fdata.length; i++) {
							if (myData !== '') {
								if (decimalOnly.test(fdata[i])) {
									/* alert('It is GOOD!'); */
									flag = 0;
								} else {
									/* alert('Please Enter Valid data'); */
									flag = 1;
									return false;
								}
							} else {
								/* alert('Please enter data!'); */
								flag = 1;
								return false;
							}
						}
					}

					// Saving Role And Rate

					$scope.saveRoleRate = function() {

						var len = $scope.choices.length;
						var clen = $scope.Countries.length;
						var index, dyrole = "", dyRate = "", dycountry = "";

						for (index = 0; index < clen; index++) {

							if (dycountry == "") {
								dycountry = $scope.Countries[index].country;
							} else {
								dycountry = dycountry + ","
										+ $scope.Countries[index].country;
							}
						}

						for (index = 0; index < len; index++) {

							if (dyrole == "") {
								dyrole = $scope.choices[index].role;

							} else {
								dyrole = dyrole + ","
										+ $scope.choices[index].role;
							}

							if (dyRate == "") {
								dyRate = dyRate + $scope.choices[index].rate1
										+ "," + $scope.choices[index].rate2
										+ "," + $scope.choices[index].rate3;
								testInputData(dyRate);
							} else {
								dyRate = dyRate + ","
										+ $scope.choices[index].rate1 + ","
										+ $scope.choices[index].rate2 + ","
										+ $scope.choices[index].rate3;
								testInputData(dyRate);
							}

						}

						if (!isNotEmpty(dyrole) || !isNaN(dyrole)
								|| !isValidSpl(dyrole)) {
				
							 $scope.ErrorMessage = "Please Enter Valid Role Name";
							  
							  $rootScope.disabledfun();
						} else if (flag == 1) {
						
							 $scope.ErrorMessage = "Please Enter Valid Rate";
							  
							  $rootScope.disabledfun();
						} else {
							$http(
									{
										method : 'POST',
										url : 'http://localhost:8086/com.wipro.capitalone.services/rest/roleservice/saverolerate',
										data : JSON.stringify({
											'aa' : 'bb'
										}), // forms user object
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded',
											pdyrole : dyrole,
											pdyRate : dyRate
										}
									})
									.success(
											function(data) {

												alertify
														.alert(
																"Role and Rate has been Saved",
																function() {
																	$route.reload();

																})

												if (data.errors) {
													alert('error');
													// Showing errors.
													$scope.errorName = data.errors.name;
													$scope.errorUserName = data.errors.username;
													$scope.errorEmail = data.errors.email;
												} else {
												}
											});

						}
						;

					}
					
					

				});
