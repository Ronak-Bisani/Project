app.controller('reviewActual', function($scope, $http,cfpLoadingBar, $rootScope, alertify) {

					// To get all Lob detais
					$scope.disablebutton = true;
					if ($rootScope.gROle == "PM")
						$scope.show = true;
					else
						$scope.show = false;
					
					$http
						.get("http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/getAgileNameByPMname?PMName="+$rootScope.gUserName)	
						.then(
								function(response) {

										var len = response.data.records.length;
										var index;
										var agile = [];
										
										for (index = 0; index <= len; index++) {
									
											if (index == 0)
												agile[index] = "All Agile Team";
											else
												agile[index] = response.data.records[index-1].agileTeam;
										}
										
										$scope.agilenNamesEdit = agile;
								}
							);
					
					$http
						.get("http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/getSowNameByDMName?DMName="+$rootScope.gUserName)	
						.then(
								function(response) {

										var len = response.data.records.length;
										var index;
										var sow = [];
								
										for (index = 0; index <= len; index++) {
									
											if (index == 0)
												sow[index] = "All SOW";
											else
												sow[index] = response.data.records[index-1].sowName;
										}
										
										$scope.sowNamesEdit = sow;
								}
							);
					
					
					$scope.agileSelected = 
					function(agileTeam) {
					
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/Actualservice/getActualForReview?AGILETEAM="
								+ agileTeam+ "&PMName=" + $rootScope.gUserName;
						
						$http
							.get(url)
							.success(
										function(data) {

												$scope.agileName = data.records;
												if (data.records == undefined || data.records == ''){
													$scope.disablebutton = true;
													alertify.alert("All Actuals Apporved/No Actuals for Approval")
												}
												else
													$scope.disablebutton = false;
										}
									);
					}
					
					
					$scope.sowSelected = 
					function(sowName) {
					
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/Actualservice/getActualForReviewDM?SOWNAME="
								+ sowName+ "&DMName=" + $rootScope.gUserName;
						
						$http
							.get(url)
							.success(
										function(data) {

												$scope.agileName = data.records;
												if (data.records == undefined || data.records == ''){
													$scope.disablebutton = true;
													alertify.alert("All Actuals Approved/No Actuals for Approval")
												}
												else
													$scope.disablebutton = false;
										}
									);
					}
					
					$scope.approve = 
					function(selectedAgileTeam) {
						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/Actualservice/approveActualPM',
									data : JSON.stringify({
										'aa' : 'bb'
									}), 
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : selectedAgileTeam,
										param2 : $rootScope.gUserName,
										param3 : $rootScope.gROle
										
									}
								}
							)
							.success(
										function(data) {
											var errorObj = data.errors;
											if (angular.isObject(errorObj)) {
												alert(errorObj[0].message);
												return;
											} 
											else {
												alertify.alert("Approved..!");
											}
										}
									);
					};
					
					$scope.approveDM = 
					function(selectedSowName,flag) {
					
						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/Actualservice/approveActualDM',
									data : JSON.stringify({
										'aa' : 'bb'
									}),
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : selectedSowName,
										param2 : $rootScope.gUserName,
										param3 : $rootScope.gROle,
										param4 :flag
									}
								}
							)
							.success(
										function(data) {
											var errorObj = data.errors;
											if (angular.isObject(errorObj)) {
												alert(errorObj[0].message);
												return;
											} 
											else {
												alertify.alert("Records "+flag +"ed." );

											}
										}
									);
					};
});