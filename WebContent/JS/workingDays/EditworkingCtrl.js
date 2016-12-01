app
		.controller(
				'EditworkingCtrl',
				function($scope, $http, alertify, $route,$rootScope,cfpLoadingBar) {

					// Getting all Country Names
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

					// Getting all cities based on country selection

					$scope.countrySelected = function(getCountry) {

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/locationservice/getCityByCountry?Country="
								+ getCountry;

						$http.get(url).success(function(response) {

							var len = response.records.length;
							
							var index;
							var cityArr = [];
							
							for (index = 0; index < len; index++) {
								cityArr[index] = response.records[index].city;
							}

							$scope.cities = cityArr;
							

						});
						$rootScope.clrDesc();
					}

					// Fetching all the years From DB

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/getYears")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var Year = [];
										for (index = 0; index < len; index++) {
											Year[index] = response.data.records[index].Year;
										}
										$scope.years = Year;

									});

					// Fetching all the Months From DB

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/getMonths")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var Month = [];
										for (index = 0; index < len; index++) {
											Month[index] = response.data.records[index].Month;
										}
										$scope.months = Month;

									});

					// Fetching NO of working days for editing

					$scope.monthSelected = function(year, getCountry, getCity,
							month) {
						
						
						
						

						if ((year == undefined)|| (year == "Please Select a Year")) {

							$scope.$parent.ErrorMessage = "Please Select a Year";

							$rootScope.disabledfun();
							return;
						}
						if ((getCountry == undefined) || (getCountry == "Please Select Country")) {

							$scope.$parent.ErrorMessage = "Please Select Country";

							$rootScope.disabledfun();
							return;
						}
						if ((getCity == undefined)
								|| (getCity == "Please Select City")) {

							$scope.$parent.ErrorMessage = "Please Select City";

							$rootScope.disabledfun();
							return;
						}
						if ((month == undefined)
								|| (month == "Please Select a Month")) {

							$scope.$parent.ErrorMessage = "Please Select a Month";

							$rootScope.disabledfun();
							return;
						}

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/editDays?Year="
								+ year
								+ "&Country="
								+ getCountry
								+ "&City="
								+ getCity + "&Month=" + month;
						$http.get(url).success(function(data) {

							$scope.days = parseFloat(data.records[0].no_of_days);

						});
						$rootScope.clrDesc();
					}

					// Updating NO. of days

					$scope.updateDays = function(selectedYear1, getCountry,
							getCity, selectedMonth, days) {

						if ((selectedYear1 == undefined) || (selectedYear1 == "Please Select a Year")) {

							$scope.$parent.ErrorMessage = "Please Select a Year";

							$rootScope.disabledfun();
							return;
						}
						if ((getCountry == undefined)
								|| (getCountry == "Please Select Country")) {

							$scope.$parent.ErrorMessage = "Please Select Country";

							$rootScope.disabledfun();
							return;
						}
						if ((getCity == undefined)
								|| (getCity == "Please Select City")) {

							$scope.$parent.ErrorMessage = "Please Select City";

							$rootScope.disabledfun();
							return;
						}
						if ((selectedMonth == undefined)
								|| (selectedMonth == "Please Select a Month")) {

							$scope.$parent.ErrorMessage = "Please Select a Month";

							$rootScope.disabledfun();
							return;
						}

						$http(
								{
									method : 'POST',

									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/workingservice/updateDays',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms
									// user
									// object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : selectedYear1,
										param2 : getCountry,
										param3 : getCity,
										param4 : selectedMonth,
										param5 : days
									}
								}).success(
								function(data) {
									var errorObj = data.errors;
									if (angular.isObject(errorObj)) {
										alert(errorObj[0].message);
										return;
									} else {

										alertify.alert(
												"WorkingDays has been Updated",
												function() {
													$route.reload();

												})
									}

								});
					};

				});