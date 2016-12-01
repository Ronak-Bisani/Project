app.controller('workingCtrl',
				function($scope, $http, alertify,$rootScope,cfpLoadingBar, $route) {
					// Getting all Country Names
					$http.get("http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/getCountry")
							.then(function(response) {
										var errorObj = response.data.errors;
										if (angular.isObject(errorObj)) {
											alert(errorObj[0].message);
											return;
																				}
										var len = response.data.records.length;

										var index;
										var country = [];
										for (index = 0; index < len; index++) {
											country[index] = response.data.records[index].Country;
										}
										$scope.countrynames = country;
										//alert("reached here in countrynames" + $scope.countrynames);
									});
					
					// Fetching all the years From DB
					$http.get("http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/getYears")
							.then(function(response) {
										var len = response.data.records.length;
										var index;
										var Year = [];
										for (index = 0; index < len; index++) {
											Year[index] = response.data.records[index].Year;
										}
										$scope.years = Year;
										/*alert("Years " + $scope.years);*/
									});

					// Getting all cities based on country selection
					
					/*$scope.countrySelected = function(getCountry) {

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getCityByCountry?Country="
								+ getCountry;

						$http.get(url).success(function(data) {

							var errorObj = data.errors;
							if (angular.isObject(errorObj)) {
								alert(errorObj[0].message);
								return;
							}

							$scope.cities = data.records;

						});
						$rootScope.clrDesc();
					}*/
					// Fetching all the Days From DB

					$scope.getDays = function(getYears, getCountry) {
						/*alert(getYears + getCountry);*/
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/getAllDays?Year="
								+ getYears + "&Country=" + getCountry;
						$http.get(url).success(function(data) {
							/*alert(data.records[0].no_of_days);*/
							$scope.city = data.records[0].no_of_days;
						});
					}

					// Saving the No. of days

					//saveDays(selectedYear,selectedCountry,cityName.month,days)
					
					
					$scope.saveDays = function(selectedYear, selectedCountry,
							cityName, cityday, month) {
						var cityName1 = $scope.cities[cityName].city;
						var days = cityday.day;
						/*alert("Days" + cityday);*/
						if(cityday==undefined || cityday==" " || cityday == 0 || cityday > 23){
							alert("Please enter valid value");
							$scope.ErrorMessage = "Please Enter Days ";
							$rootScope.disabledfun();
							return;
						}
				/*		if(cityday == 0 || cityday > 23){
							$scope.ErrorMessage = "Please Enter valid Days ";
							$rootScope.disabledfun();
							return;*/
						//} 
						$http({
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/saveDays',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										pYear : selectedYear,
										pCountry : selectedCountry,
										pLocation : cityName1,
										pDays : cityday,
										pMonth : month
									}
								}).success(function(data) {
									$rootScope.clrDesc();
									$route.reload();
							var errorObj = data.errors;
							if (angular.isObject(errorObj)) {
								alertify.alert(errorObj[0].message);
								return;
							}
						});
					};
					
					// Getting all cities based on country selection

					$scope.countrySelected = function(getCountry,selectedYear) {
						
						$rootScope.clrDesc();
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getCityByCountry?Country="
								+ getCountry;

						$http.get(url)
							 .then(function(response) {
								$scope.cities = response.data.records;
								
								
								var len2 = response.data.records.length;
								
									var url1 = "http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/getAllDays1?Year="
									+ selectedYear + "&Country=" + getCountry;
									$http.get(url1)
									 .then(function(response) {
										 var len1 = response.data.records.length;
										 var str;
										 var res;
										 var index1;
										 var index2;
										 var Record = [];var Record1 = [];var Record2 = [];var Record3 = [];var Record4 = [];
										 var Record5 = [];var Record6 = [];var Record7 = [];var Record8 = [];var Record9 = [];
										 var Record10 = [];var Record11 = [];
										 
										 for (index2 = 0; index2 < len2; index2++) { 
											Record[index2] = 0;Record1[index2] = 0;Record2[index2] = 0;Record3[index2] = 0;
											Record4[index2] = 0;Record5[index2] = 0;Record6[index2] = 0;Record7[index2] = 0;
											Record8[index2] = 0;Record9[index2] = 0;Record10[index2] = 0;Record11[index2] = 0;
												}
										 for (index1 = 0; index1 < len1; index1++) {    
											 for (index2 = 0; index2 < len2; index2++) {
												 
												if ((response.data.records[index1].month == "January" ) && 
												   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
													Record[index2] = response.data.records[index1].no_of_days;
													/*alert("January " + response.data.records[index1].location_City + " " + response.data.records[index1].no_of_days);*/
												    
												}
												if ((response.data.records[index1].month == "February" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record1[index2] = response.data.records[index1].no_of_days;
														}
												if ((response.data.records[index1].month == "march" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record2[index2] = response.data.records[index1].no_of_days;
														}
												if ((response.data.records[index1].month == "april" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record3[index2] = response.data.records[index1].no_of_days;
														}
												if ((response.data.records[index1].month == "may" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record4[index2] = response.data.records[index1].no_of_days;
														}
												str = response.data.records[index1].month
												res = str.toLowerCase();
												if ((res == "june" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record5[index2] = response.data.records[index1].no_of_days;
														}
												if ((response.data.records[index1].month == "july" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record6[index2] = response.data.records[index1].no_of_days;
														}
												if ((response.data.records[index1].month == "august" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record7[index2] = response.data.records[index1].no_of_days;
														}
												if ((response.data.records[index1].month == "september" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record8[index2] = response.data.records[index1].no_of_days;
														}
												if ((response.data.records[index1].month == "october" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record9[index2] = response.data.records[index1].no_of_days;
														}
												if ((response.data.records[index1].month == "november" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record10[index2] = response.data.records[index1].no_of_days;
														}
												if ((response.data.records[index1].month == "december" ) && 
														   (response.data.records[index1].location_City == $scope.cities[index2].city )) {
															Record11[index2] = response.data.records[index1].no_of_days;
														}
											 }		
											}
										 
										 /*alert("Reocrd " + Record);*/
										 $scope.Records = Record;
										 /*alert("SCope" + $scope.Records);*/
										 $scope.Records1 = Record1;
										 $scope.Records2 = Record2;
										 $scope.Records3 = Record3;
										 $scope.Records4 = Record4;
										 $scope.Records5 = Record5;
										 $scope.Records6 = Record6;
										 $scope.Records7 = Record7;
										 $scope.Records8 = Record8;
										 $scope.Records9 = Record9;
										 $scope.Records10 = Record10;
										 $scope.Records11 = Record11;
									 });
								
									});
					};
					});					

				