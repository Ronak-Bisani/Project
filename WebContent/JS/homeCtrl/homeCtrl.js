app
		.controller(
				'homeCtrl',
				function($scope, $location, $window, $rootScope, $http,
						$cookieStore, $interval,cfpLoadingBar) {
					
					 $scope.deviceWidth = '1500px';
				      $scope.deviceHeight = '1050px';
					

					// Disabling/Enabling Error popup

					$rootScope.bootstrapAlert = true;

					// Timer code :

					$scope.theTime = new Date().toLocaleTimeString();
					$interval(function() {
						$scope.theTime = new Date().toLocaleTimeString();

					}, 1000);

					// Timer code Ends

					var searchObject = $location.search();

					if (searchObject.login != undefined) {

						$cookieStore.put('globals', searchObject.login);
					}

					$rootScope.globals = $cookieStore.get('globals') || {};
					// alert('globals' + $rootScope.globals);
					var loginId = $rootScope.globals;

					// Creating menu bar options on basis of User Roles

					var url = "http://localhost:8086/com.wipro.capitalone.services/rest/authenticationservice/authenticateuserbyID?User_Id="
							+ loginId;

					$http
							.get(url)
							.success(
									function(data) {

										$scope.name = data.records[0].UserName;

										$rootScope.gUserName = data.records[0].UserName;
										
										$cookieStore.put('username', $rootScope.gUserName);
										
										

										$scope.role = data.records[0].UserRole;
										
										$rootScope.gROle = data.records[0].UserRole;
										$cookieStore.put('userrole', $rootScope.gROle);
                                       // alert("Home " +
										// $rootScope.gUserName);
										// alert(data.records[0].UserName);

										if ($scope.role == "DM"
												|| $scope.role == "PM"
												|| $scope.role == "LOB PMO"
												|| $scope.role == "BFM"
												|| $scope.role == "ADMIN"
												|| $scope.role == "General Operations"
												|| $scope.role == "Finance Operations") {

											$scope.categories = getCategories($scope.role);
										}

										else {
											alert("Inside else");
											$window.location.href = "/OperationSystems_UI/login.html";
										}
									});

					// Validation Code

					$rootScope.disabledfun = function() {
						$scope.disabled = true;
						$scope.bootstrapAlert = false;

					}

					$rootScope.clrDesc = function() {
						$scope.ErrorMessage = " ";
						$scope.disabled = false;
						$scope.bootstrapAlert = true;

					}

					// Validation Code Ends

					// Log Out Function

					$scope.logMeOut = function() {

						$location.search() === {};
						$window.location.href = "/OperationSystems_UI/login.html";
					}
				});