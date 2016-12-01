app
		.controller(
				'reviewAccrual',
				function($scope, $http, $rootScope, $cookieStore, alertify,
						$route,cfpLoadingBar) {

					

					// To get all Lob detais

					$scope.disablebutton = true;

					$scope.username = $cookieStore.get('username') || {};
					$scope.role = $cookieStore.get('userrole') || {};

					if ($scope.role == "PM")

						$scope.show = true;

					else

						$scope.show = false;

					

					url = "http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/getAgileNameByPMname?PMName="
							+ $scope.username;

					$http
							.get(url)
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var agile = [];

										for (index = 0; index <= len; index++) {

											if (index == 0)
												agile[index] = "All Agile Team";
											else
												agile[index] = response.data.records[index - 1].agileTeam;
										}
										$scope.agilenNamesEdit = agile;

									});

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/getSowNameByDMName?DMName="
											+ $scope.username)
							// +

							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var sow = [];

										for (index = 0; index <= len; index++) {

											if (index == 0)
												sow[index] = "All SOW";
											else
												sow[index] = response.data.records[index - 1].sowName;
										}
										$scope.sowNamesEdit = sow;

									});

					$scope.agileSelected = function(agileTeam) {

						if (agileTeam == undefined
								|| (agileTeam == "Please Select Agile NAME")) {

							$scope.ErrorMessage = "Please Select Agile Name";

							$rootScope.disabledfun();
							return;
						}

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/getAccrualForReview?AGILETEAM="
								+ agileTeam + "&PMName=" + $scope.username;

						$http
								.get(url)
								.success(
										function(data) {

											$scope.agileName = data.records;
											if (data.records == undefined
													|| data.records == '') {
												$scope.disablebutton = true;
												alertify
														.alert("All Accruals Apporved/No Accruals for Approval");
											} else
												$scope.disablebutton = false;

										});

					}

					$scope.sowSelected = function(sowName) {

						if ((sowName == undefined)
								|| (sowName == "Please Select SOW NAME")) {

							$scope.ErrorMessage = "Please select SOW NAME";

							$rootScope.disabledfun();
							return;
						}

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/getAccrualForReviewDM?SOWNAME="
								+ sowName + "&DMName=" + $scope.username;

						$http
								.get(url)
								.success(
										function(data) {

											$scope.agileName = data.records;
											if (data.records == undefined
													|| data.records == '') {
												$scope.disablebutton = true;
												alertify
														.alert("All Accruals Apporved/No Accruals for Approval")
											} else
												$scope.disablebutton = false;

										});

					}

					$scope.approve = function(selectedAgileTeam) {
						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/approveAccrualPM',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : selectedAgileTeam,
										param2 : $scope.username,
										param3 : $scope.role

									}
								}).success(function(data) {
							var errorObj = data.errors;
							if (angular.isObject(errorObj)) {
								alert(errorObj[0].message);
								return;
							} else {
								alertify.alert("Approved Successfully");

							}

						});
					};

					$scope.approveDM = function(selectedSowName, flag) {
						alert("flag" + flag)
						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/approveAccrualDM',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : selectedSowName,
										param2 : $scope.username,
										param3 : $scope.role,
										param4 : flag
									}
								}).success(function(data) {
							var errorObj = data.errors;
							if (angular.isObject(errorObj)) {
								alert(errorObj[0].message);
								return;
							} else {
								alertify.alert("Approved Successfully");

							}

						});
					};

				});
