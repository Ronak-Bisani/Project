app
		.controller(
				'editAgileCtrl',
				function($scope, $http, alertify, $route, $rootScope,cfpLoadingBar) {

					// Getting all the Agile names
					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/agileTeamService/getagilename")
							.then(
									function(response) {
										var len1 = response.data.records.length;

										var index1;
										var lob1 = [];
										for (index1 = 0; index1 < len1; index1++) {
											lob1[index1] = response.data.records[index1].AgileName;
										}
										$scope.agilenNamesEdit = lob1;

									});

					$scope.AgileSelected = function(agileName) {

						if (agileName == undefined) {
							$scope.ErrorMessage = "Please select agileName";
							$rootScope.disabledfun();
							return;
						}
						$rootScope.clrDesc();

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/agileTeamService/getagile_detail?AgileName="
								+ agileName;

						$http
								.get(url)
								.success(
										function(data) {

											$scope.agileDetails = data.records;
											$scope.agileName = data.records[0].AgileName;
											$scope.pmName = data.records[0].pmName;
											$scope.art = data.records[0].art;
											$scope.runChange = data.records[0].runChange;
											$scope.id = data.records[0].ID;
											$scope.clientMgnrName = data.records[0].clientMgnrName;
											$scope.agileType = data.records[0].agileType;

											$scope.lob1 = {
												selectedLob : "Please Select LOB"
											};
											$scope.sow1 = {
												selectedLob : "Please Select SOW NAME"
											};
											$scope.data2 = {
												selectedLob : "Please Select WOID"
											};

											$scope.dm = "";
											$scope.pgm = "";
											$scope.Did = "";

											// $scope.sow1 = {selectedSow :
											// agileSowName[0].SowName};

										});
					}

					// Method For getting all LOB
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
					// Method for getting Details of SOW Table Depending Upon
					// SOW Name

					$scope.SowSelected = function(selectedSow) {

						$rootScope.clrDesc();

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getsow_detail?SOWName="
								+ selectedSow;

						$http.get(url).success(function(data) {

							$scope.pgm = data.records[0].PGM;

							$scope.dm = data.records[0].DMName;

							var did_ss = data.records[0].did;

							var didWS = [];
							didWS = did_ss;
							$scope.didsEdit = didWS;

						});

					}

					$scope.didSelected = function(selectedDid) {

						$rootScope.clrDesc();

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/agileTeamService/getWoidFrom_did?didName="
								+ selectedDid;

						$http.get(url).success(function(data) {

							var ss = data.records;

							var woidsWS = [];
							woidsWS = ss;
							$scope.woidsEdit = woidsWS;

						});

					}

					$scope.items = [ "Run", "Change" ];
					$scope.AllAgileTypes=["Scrum","Kanban","Scrumban"];
					
					// Updating all the agile details in DB

					$scope.updateAgile = function(agileName, selectedLob,
							selectedSow, Did, dm, pgm, woid, id, pmName, art,
							runChange, clientMgnrName,agileType) {

						if (agileName == undefined || !isValidSpl(agileName)
								|| agileName == ' ') {

							$scope.ErrorMessage = "Please Select Agile Name";

							$rootScope.disabledfun();

							return;
						}
						if ((selectedLob == undefined)
								|| (selectedLob == "Please Select LOB")) {

							$scope.ErrorMessage = "Please Select Lob";

							$rootScope.disabledfun();
							return;
						}
						if (selectedSow == undefined
								|| (selectedSow == "Please Select SOW NAME")) {

							$scope.ErrorMessage = "Please selected SOW NAME";

							$rootScope.disabledfun();

							return;
						}

						if (Did == undefined || (Did == "Please Select DID")) {

							$scope.ErrorMessage = "Please Select DID";

							$rootScope.disabledfun();

							return;
						}

						if (woid == undefined || (woid == "Please Select WOID")) {

							$scope.ErrorMessage = "Please Select WOID";

							$rootScope.disabledfun();
							return;
						}
						if (pmName == undefined || !isValidSpl(pmName)
								|| pmName == ' ') {

							$scope.ErrorMessage = "Please Enter Valid PM Name";

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

							$scope.ErrorMessage = "Please Enter Valid client Manager Name";

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
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/agileTeamService/updateagile',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										pAgileName : agileName,
										pSOWName : selectedSow,
										pLOB : selectedLob,
										pWOID : woid,
										pDID : Did,
										pPGM : pgm,
										pDMName : dm,
										pID : id,
										ppmName : pmName,
										part : art,
										prunChange : runChange,
										pclientMgnrName : clientMgnrName,
										pagileType : agileType
									}
								}).success(
								function(data) {
									var errorObj = data.errors;
									if (angular.isObject(errorObj)) {

										alertify.alert(
												"Agile Team has been Updated",
												function() {
													$route.reload();

												})

									} else {

										alert(errorObj[0].message);
										return;
									}

								});
					};

				});