app
		.controller(
				'createAssignmentCtrl',
				function($scope, $http, alertify, $route, $rootScope,cfpLoadingBar) {

					// Getting all LOB details

					var resource = [];
					var capitalOneID = [];

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

					// Getting ALL role names

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

					// Getting all resource names

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/getresource")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;

										for (index = 0; index < len; index++) {
											resource[index] = response.data.records[index].ResourceName;
											capitalOneID[index] = response.data.records[index].capitalOneID;
										}
										$scope.resourceNames = resource;

										// $scope.getCaponeEid = capitalOneID;

									});

					// getting ID by resource

					$scope.getCaponeEid = function(resourceName) {
						
						$rootScope.clrDesc();

						
						$scope.capitalOneID = capitalOneID[resource
								.indexOf(resourceName)];

					}

					// Getting role name

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

					// Getting Location Details

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
						
						$rootScope.clrDesc();

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
						
						$rootScope.clrDesc();

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
						
						$rootScope.clrDesc();

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

						$rootScope.clrDesc();
						
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getratebylocation?RoleName="
								+ allRoles + "&City=" + getCity;
						$http.get(url).success(function(data) {

							$scope.rate = data.records[0].Rate;
							// $scope.rate = data.errors[0].Rate;

						});
					}

					// Save Assignment function.

					$scope.saveAssignment = function(selectedLob, selectedSow,
							resourceName, agileName, startDate, endDate,
							capitalOneID, percentage, role, getCountry,
							getCity, rate) {

						if ((selectedLob == undefined)
								|| (selectedLob == "Please Select LOB")) {

							$scope.ErrorMessage = "Please Select Lob";

							$rootScope.disabledfun();

							return;
						}
						if ((selectedSow == undefined)
								|| (selectedSow == "Please Select SOW NAME")) {

							$scope.ErrorMessage = "Please Select SOW NAME";

							$rootScope.disabledfun();
							return;
						}
						if (agileName == undefined
								|| (agileName == "Please Select Agile NAME")) {

							$scope.ErrorMessage = "Please Select Agile Name";

							$rootScope.disabledfun();
							return;
						}
						if (resourceName == undefined
								|| (resourceName == "Please Select Resource NAME")) {

							$scope.ErrorMessage = "Please Select Resource Name";

							$rootScope.disabledfun();
							return;
						}
						if (startDate == undefined) {

							$scope.ErrorMessage = "Please Enter Start Date";

							$rootScope.disabledfun();
							return;
						}
						if (endDate == undefined) {

							$scope.ErrorMessage = "Please Enter End Date";

							$rootScope.disabledfun();
							return;
						}
						if (capitalOneID == undefined || !isValidSpl(capitalOneID)) {

							$scope.ErrorMessage = "Please Enter capital One ID";

							$rootScope.disabledfun();
							return;
						}
						if (percentage == undefined) {

							$scope.ErrorMessage = "Please Enter Percentage";

							$rootScope.disabledfun();
							return;
						}
						if ((role == undefined)
								|| (role == "Please Select Role")) {

							$scope.ErrorMessage = "Please Select Role";

							$rootScope.disabledfun();
							return;
						}
						if ((getCountry == undefined)
								|| (getCountry == "Please Select Country")) {

							$scope.ErrorMessage = "Please Select Country";

							$rootScope.disabledfun();
							return;
						}
						if ((getCity == undefined)
								|| (getCity == "Please Select City")) {

							$scope.ErrorMessage = "Please Select City ";

							$rootScope.disabledfun();
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
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/saveAssignment',
									data : JSON.stringify({}), // forms user
									// object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : selectedLob,
										param2 : selectedSow,
										param3 : resourceName,
										param4 : agileName,
										param5 : fstartdate,
										param6 : fenddate,
										param7 : role,
										param8 : getCountry,
										param9 : getCity,
										param10 : rate,
										param11 : capitalOneID,
										param12 : percentage
									}
								}).success(
								function(data) {
									var errorObj = data.errors;
									// alert(errorObj);
									if (errorObj == undefined) {

										alertify.alert(
												"Assignment has been Saved",
												function() {
													$route.reload();

												})

										return;
									} else {
										
										$scope.ErrorMessage = data.errors ;
										  
										  $rootScope.disabledfun();
										
										//alertify.alert(data.errors);
										return;
									}

								});
					};

				});