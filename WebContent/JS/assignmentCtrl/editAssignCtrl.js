app
		.controller(
				'editAssignCtrl',
				function($scope, $http, $window,alertify,$route,cfpLoadingBar) {
					
					$scope.bootstrapAlertInModal= true;	
					
					
					$scope.disabledfun= function () {
			            $scope.disabled = true;
			            $scope.bootstrapAlertInModal=false;
			           
			     }

				  $scope.clrDesc = function () {
			            $scope.ErrorMessage = " ";
			            $scope.disabled = false;
			            $scope.bootstrapAlertInModal=true;
			          
			     }

					// Getting all resourceNames

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/getresource")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var resource = [];
										for (index = 0; index < len; index++) {
											resource[index] = response.data.records[index].ResourceName;
										}
										$scope.resourceNames = resource;

									});

					// Display all Assignments for a particular resource

					$scope.showAssignment = function(resourceName) {
						
						

						$http
								.get(
										"http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/getResourceAssignment?resourceName="
												+ resourceName)
								.then(
										function(response) {
											
											//var flagdata = response.data.records[0].flag;
											
											//alert(flagdata);

											$scope.assignResource = response.data.records;
											
											
											
											/*if(flagdata=="false"){
												
												$scope.disabledOld=true;
												
											}*/
											
											
											

										});
						             $scope.clrDesc();
					}

					// Edit assignment by assign ID

					$scope.editAssignID = function(assign_id) {
						
						

						$http
								.get(
										"http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/getAssignmentById?AssignmentId="
												+ assign_id)
								.then(
										function(response) {

											$scope.assignResourceById = response.data.records;
											$scope.assign_id = response.data.records[0].assign_Id
											$scope.resourceName = response.data.records[0].ResourceName
											$scope.capitalOneID = response.data.records[0].capitalOneID;
											$scope.percentage = parseFloat(response.data.records[0].percentage);
										});
					}

					// Get all LOB Names

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getport")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var lob = [];
										for (index = 0; index < len; index++) {
											lob[index] = response.data.records[index].LOB;
										}
										$scope.names = lob;

									});

					// ALL role names

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/roleservice/getrolesname")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var roleName = [];
										for (index = 0; index < len; index++) {
											roleName[index] = response.data.records[index].RoleName;
										}
										$scope.roles = roleName;

									});

					// all resource names

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/getresource")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var resource = [];
										for (index = 0; index < len; index++) {
											resource[index] = response.data.records[index].ResourceName;
										}
										$scope.resourceNames = resource;

									});

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/roleservice/getrolename")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var lob = [];
										for (index = 0; index < len; index++) {
											lob[index] = response.data.records[index].RoleName;
										}
										$scope.roles = lob;

									});

					// Get location details

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getlocation")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var lob = [];
										for (index = 0; index < len; index++) {
											lob[index] = response.data.records[index].LocationName;
										}
										$scope.locations = lob;

									});

					// Getting Sow Name on basis of LOB selection

					$scope.lobSelected = function(selectedLOB) {

						  $scope.clrDesc();

						$http
								.get(
										"http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getsowNamebyLob?LOB="
												+ selectedLOB)
								.then(
										function(response) {

											var len = response.data.records.length;

											var index;
											var lobSowName = [];
											for (index = 0; index < len; index++) {
												lobSowName[index] = response.data.records[index].SOWName;
											}
											$scope.namesEdit = lobSowName;

										});
					}

					// Getting Agile Name on basis of Sow Name selection

					$scope.AssignSowSelected = function(selectedSow) {
						  $scope.clrDesc();

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/getAgileNameBySowname?Sowname="
								+ selectedSow;

						$http.get(url).success(function(data) {

							var len = data.records.length;

							var index;
							var agile = [];
							for (index = 0; index < len; index++) {
								agile[index] = data.records[index].agileName;
							}
							$scope.agilenNamesEdit = agile;

						});

					}

					// Getting all the Countries

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/getCountry")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var country = [];
										for (index = 0; index < len; index++) {
											country[index] = response.data.records[index].Country;
										}
										$scope.countrynames = country;

									});

					// Cities on basis of country selection

					$scope.countrySelected = function(getCountry) {
						  $scope.clrDesc();

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getCityByCountry?Country="
								+ getCountry;

						$http.get(url).success(function(data) {

							var len = data.records.length;

							var index;
							var cityArr = [];
							for (index = 0; index < len; index++) {
								cityArr[index] = data.records[index].city;
							}

							$scope.cities = cityArr;

						});
					}

					// Rate displayed depending on the Role and City

					$scope.citySelected = function(allRoles, getCountry,
							getCity) {
						  $scope.clrDesc();

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getratebylocation?RoleName="
								+ allRoles + "&City=" + getCity;
						$http.get(url).success(function(data) {

							$scope.rate = data.records[0].Rate;

						});
					}

					// **************************************************************************************

					// Update function.
					$scope.updateAssign = function(selectedLob, selectedSow,
							agileName, startDate, endDate, role,
							getCountry, getCity, rate, assignId, capitalOneID,
							percentage) {
						
						alert(selectedLob+selectedSow+
								agileName+startDate+endDate+role+
								getCountry+getCity+rate+assignId+capitalOneID+
								percentage);

						if ((selectedLob == undefined)|| (selectedLob == "Please Select LOB")) {
							
							 $scope.ErrorMessageInModal = "Please Select Lob";
							  
							  $scope.disabledfun();
							// $scope.bootstrapAlertInModal=false;
							  
							return;
						}
						if ((selectedSow == undefined)
								|| (selectedSow == "Please Select SOW NAME")) {
						
							 $scope.ErrorMessageInModal = "Please Select SOW NAME";
							  
							 $scope.disabledfun();
							return;
						}
						if (agileName == undefined
								|| (agileName == "Please Select Agile NAME")) {
						
							 $scope.ErrorMessageInModal = "Please Select Agile NAME";
							  
							 $scope.disabledfun();
							return;
						}
						if (capitalOneID == undefined || !isValidSpl(capitalOneID)) {
							
							
							 $scope.ErrorMessageInModal = "Please Enter capital One ID";
							  
							 $scope.disabledfun();

							
							return;
						}
						
						if (startDate == undefined) {
							
							 $scope.ErrorMessageInModal = "Please Enter Start Date";
							  
							 $scope.disabledfun();
							return;
						}
						if (endDate == undefined) {
			
							 $scope.ErrorMessageInModal = "Please Enter End Date";
							  
							 $scope.disabledfun();
							return;
						}
						if ((role == undefined)
								|| (role == "Please Select Role")) {


							 $scope.ErrorMessageInModal = "Please Select Role ";
							  
							 $scope.disabledfun();
							return;
						}
						if ((getCountry == undefined)
								|| (getCountry == "Please Select Country")) {
							
							 $scope.ErrorMessageInModal = "Please Select Country";
							  
							 $scope.disabledfun();
							return;
						}
						if ((getCity == undefined)
								|| (getCity == "Please Select City")) {
						
							 $scope.ErrorMessageInModal = "Please Select City";
							  
							 $scope.disabledfun();
							return;
						}

						function formatDate(date) {
							var d = new Date(date), month = ''
									+ (d.getMonth() + 1), day = ''
									+ d.getDate(), year = d.getFullYear();
							if (month.length < 2)
								month = '0' + month;
							if (day.length < 2)
								day = '0' + day;

							return [ year, month, day ].join('-');
						}

						var fstartdate = formatDate(startDate);
						var fenddate = formatDate(endDate);

						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/updateAssignment',
									data : JSON.stringify({}), // forms user
									// object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : selectedLob,
										param2 : selectedSow,
										param4 : agileName,
										param5 : fstartdate,
										param6 : fenddate,
										param7 : role,
										param8 : getCountry,
										param9 : getCity,
										param10 : rate,
										param11 : assignId,
										param12 : capitalOneID,
										param13 : percentage
									}
								})
								.success(
										function(data) {
											var errorObj = data.errors;
											// alert(errorObj);
											if (errorObj == undefined) {

												alertify.alert("Assingment has been Updated",
																function() {
																	$route.reload();

																})

												return;
											} else {
												// alert(data.errors);
												alertify.alert(data.errors);
												return;
											}

										});
					};

				});