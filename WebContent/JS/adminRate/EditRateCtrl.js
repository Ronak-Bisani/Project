app
		.controller(
				'EditRateCtrl',
				function($scope, $http, alertify, $route, $rootScope,cfpLoadingBar) {
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

					// role by country

					$scope.countrySelected = function(getCountry) {

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/rateservice/getrolebycountry?Country="
								+ getCountry;

						$http
								.get(url)
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
						$rootScope.clrDesc();
					}

					// rate by country and role

					$scope.roleSelected = function(getRole, getCountry) {

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/rateservice/getratebyCountry?RoleName="
								+ getRole + "&Country=" + getCountry;
						$http.get(url).success(function(data) {

							$scope.rate = parseFloat(data.records[0].Rate);

						});

						$rootScope.clrDesc();
					}

					// update rate

					$scope.updateRate = function(getCountry, role1, rate) {
						

						if ((getCountry == undefined)
								|| (getCountry == "Please Select Country")) {
							
							//alert("Please Select Country11");

							$scope.$parent.ErrorMessage = "Please Select Country";

							$rootScope.disabledfun();

							return;
						}

						else if (rate == undefined || rate == " ") {
							
							//alert("Please Enter Valid Rate11");

							$scope.$parent.ErrorMessage = "Please Enter Valid Rate";

							$rootScope.disabledfun();
						}

						$http(
								{
									method : 'POST',

									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/rateservice/updateRate',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : getCountry,
										param2 : role1,
										param3 : rate
									}
								}).success(
								function(data) {
									//alert("Inside function");
									var errorObj = data.errors;
									if (angular.isObject(errorObj)) {
										//alert("Inside if");
										alert(errorObj[0].message);
										return;
									} else {
										//alert("Inside else");

										alertify.alert("Rate has been Updated",
												function() {
													$route.reload();

												})
									}

								});
					};

					// update role

					$scope.updateRole = function(getRole, role1) {

						if ((getRole == undefined)
								|| (getRole == "Please Select Role")) {

							$scope.$parent.ErrorMessage = "Please Select Role";

							$rootScope.disabledfun();

							return;
						}

						else if (!isNotEmpty(role1) || !isNaN(role1)
								|| !isValidSpl(role1)) {

							$scope.$parent.ErrorMessage = "Please Enter Valid Role Name";

							$rootScope.disabledfun();
						}

						else {

							$http(
									{
										method : 'POST',

										url : 'http://localhost:8086/com.wipro.capitalone.services/rest/rateservice/updateRole',
										data : JSON.stringify({
											'aa' : 'bb'
										}), // forms user object
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded',
											param1 : getRole,
											param2 : role1
										}
									}).success(
									function(data) {

										var errorObj = data.errors;
										if (angular.isObject(errorObj)) {
											alert(errorObj[0].message);
											return;
										} else {

											alertify.alert("Role has been Updated",function() {
														$route.reload();

													})

										}

									});
						}
						;
					}
				});
