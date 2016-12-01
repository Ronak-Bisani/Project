app
		.controller(
				'createAgileCtrl',
				function($scope, $http,alertify,$route,$rootScope,cfpLoadingBar) {
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

					// Method for getting SOW names Depending Upon LOB
					$scope.lobSelected = function(selectedLOB) {

						$http
								.get("http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getsowNamebyLob?LOB="
												+ selectedLOB)
								.then(function(response) {

											var len = response.data.records.length;
											var index;
											var lobSowName = [];
											for (index = 0; index < len; index++) {
												lobSowName[index] = response.data.records[index].SOWName;
											}
											$scope.namesEdit = lobSowName;
											
											$rootScope.clrDesc();

										});
					}
					// Method for getting Details of SOW Table Depending Upon
					// SOW Name

					$scope.SowSelected = function(selectedSow) {

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getsow_detail?SOWName="
								+ selectedSow;

						$http.get(url).success(function(data) {

							$scope.pgm = data.records[0].PGM;
							// $scope.Did = data.records[0].did;
							$scope.dm = data.records[0].DMName;


							var did_ss = data.records[0].did;

							var didWS = [];
							didWS = did_ss;
							$scope.didsEdit = didWS;

							$rootScope.clrDesc();

						});

					}
					
					$scope.didSelected=function(selectedDid) {
						
						
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/agileTeamService/getWoidFrom_did?didName="
							+ selectedDid;
						
						$http.get(url).success(function(data) {
							
						
							
							var ss = data.records;

							var woidsWS = [];
							woidsWS = ss;
							$scope.woidsEdit = woidsWS;
							
							$rootScope.clrDesc();
							
						});
						
					}
					

					$scope.items = [ "Run", "Change" ];
					
					$scope.AllAgileTypes=["Scrum","Kanban","Scrumban"];

					// Saving all the agile details in DB

					$scope.saveAgile = function(agileName, selectedLob,
							selectedSow, woid, dm, pgm, pmName, Did, art,
							runChange, clientMgnrName, agileType) {
						
						alert(agileType);

						if (agileName == undefined || !isValidSpl(agileName)
								|| agileName == ' ') {
							
							 $scope.ErrorMessage = "Please Enter Valid Agile Name";
							  
							  $rootScope.disabledfun();
							return;
						}
						if ((selectedLob == undefined)
								|| (selectedLob == "Please Select LOB")) {
							
							 $scope.ErrorMessage = "Please Select Lob";
							  
							  $rootScope.disabledfun();
							return;
						}
						if ((selectedSow == undefined)
								|| (selectedSow == "Please Select SOW NAME")) {
						
							 $scope.ErrorMessage = "Please selected Sow";
							  
							  $rootScope.disabledfun();
							return;
						}
						
						
						if ((Did == undefined)
								|| (Did == "Please Select DID")) {
							
							 $scope.ErrorMessage = "Please Select DID";
							  
							  $rootScope.disabledfun();
							return;
						}
						
						if (pmName == undefined || !isValidSpl(pmName)
								|| pmName == ' ') {
						
							 $scope.ErrorMessage = "Please Enter Valid PM Name";
							  
							  $rootScope.disabledfun();
							return;
						}
						
						if ((woid == undefined)
								|| (woid == "Please Select WOID")) {
						
							 $scope.ErrorMessage = "Please Select WOID";
							  
							  $rootScope.disabledfun();
							return;
						}
						
						if (art == undefined || !isValidSpl(art) || art == ' ') {
							

							 $scope.ErrorMessage = "Please Enter Valid ART";
							  
							  $rootScope.disabledfun();
							return;
						}
						if ((runChange == undefined)
								|| (runChange == "Please Select")) {
						
							 $scope.ErrorMessage = "Please Select Run/Change";
							  
							  $rootScope.disabledfun();
							return;
						}
						
						if (clientMgnrName == undefined
								|| !isValidSpl(clientMgnrName)
								|| clientMgnrName == ' ') {
					
							 $scope.ErrorMessage = "Please Enter Valid Client Manager Name";
							  
							  $rootScope.disabledfun();
							return;
						}
						if ((agileType == undefined)
								|| (agileType == "Please Select Agile Type")) {
						
							 $scope.ErrorMessage = "Please Select Agile Type";
							  
							  $rootScope.disabledfun();
							return;
						}
						$http(
								{
									method : 'POST',
									/*
									 * url :
									 * 'http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/savesowsetup',
									 */
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/agileTeamService/saveAgile',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										pAgName : agileName,
										pSowName : selectedSow,
										plob : selectedLob,
										pwoid : woid,
										pdid : Did,
										ppgm : pgm,
										pdm : dm,
										ppmName : pmName,
										part : art,
										prunChange : runChange,
										pclientMgnrName : clientMgnrName,
										pagileType : agileType
									}
								})
								.success(
										function(data) {
											var errorObj = data.errors;
											if (angular.isObject(errorObj)) {
												
												alertify.alert("Agile Team has been Saved",function() {
													$route.reload();

												})
												
												
											} else {
												

												alert(errorObj[0].message);
											       return;
											}

										});
					};

				});