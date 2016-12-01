app.controller('DownloadCtrl',
				
//				Function for getting LOB Names
				function($scope, $http,cfpLoadingBar) {
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
										// get LOB details
										$scope.lobNames = lob;

									});
					
//					Function for getting details on basis of LOB
					$scope.lobSelected = function(selectedLOB) {

						$http
								.get("http://localhost:8086/com.wipro.capitalone.services/rest/accrualDownloadservice/getAccrualDetailsbyLob?LOB="
												+selectedLOB)
								.then(function(response) {

											var len = response.data.records.length;

											var index;
											var lobName = [];
											for (index = 0; index < len; index++) {
												lobName[index] = response.data.records[index].LOB;
											}
											$scope.namesEdit = lobName;

										});
					}			

//					Function for getting SOW Names
					$scope.SowSelected = function(selectedSow) {
						
						$http
								.get(								
										"http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getsowname")
								.then(
										function(response) {

											var len = response.data.records.length;

											var index;
											var SowName = [];
											for (index = 0; index < len; index++) {
												SowName[index] = response.data.records[index].SOWName;
											}
											$scope.namesEdit = SowName;

										});
					}
					
//				Function for getting details on basis of SOW
					$scope.lobSelected = function(selectedSow) {

						$http
								.get("http://localhost:8086/com.wipro.capitalone.services/rest/accrualDownloadservice/getAccrualDetailsbySow?SOW="
												+selectedSow)
								.then(function(response) {

											var len = response.data.records.length;

											var index;
											var SowName = [];
											for (index = 0; index < len; index++) {
												SowName[index] = response.data.records[index].SOWName;
											}
											$scope.namesEdit = SowName;

										});
					}			
					
				});
