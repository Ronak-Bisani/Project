app
		.controller(
				'BHCReportCtrl',
				function($scope, $http, alertify, $route, $rootScope,
						cfpLoadingBar) {
					var lob = [];
					var lobID = [];
					
					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/bhcReport/insertIntoBHC")
							.then(function(response) {

							});
					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/lobservice/getLobData")
							.then(
									function(response) {
										var len = response.data.records.length;
										var index;

										for (index = 0; index < len; index++) {
											lob[index] = response.data.records[index].lob;
											lobID[index] = response.data.records[index].portfolioId;
										}
										$rootScope.lobNames = lob;
										$rootScope.lobID = lobID;
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
											var lobSowID = [];

											for (index = 0; index < len; index++) {
												lobSowName[index] = response.data.records[index].SOWName;
												lobSowID[index] = response.data.records[index].SOWID;

											}
											$rootScope.namesEdit = lobSowName;
											$rootScope.SowIDs = lobSowID;

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
							var agileid=[];
							
							
							for (index = 0; index < len; index++) {
								agile[index] = data.records[index].agileName;
								agileid[index] = data.records[index].agileID;
							}
							$rootScope.agileNamesEdit = agile;
							$rootScope.agileIDs = agileid;

						});

					}

					$scope.fetch = function(selectedLob, selectedSow,
							selectedAgileTeam) {
						if ((selectedLob == undefined)
								|| (selectedLob == "Please Select LOB")) {

							$scope.ErrorMessage = "Please Select Lob";

							$rootScope.disabledfun();
							return;
						}

						

						var lob_id = null;
						var sow_id = null;
						var agile_id = null;
						
						
						
						for (var i = 0; i < $rootScope.lobNames.length; i++) {
							if ($rootScope.lobNames[i] == selectedLob) {
								lob_id = $rootScope.lobID[i];
							}
						}
						for (var j = 0; j < $rootScope.namesEdit.length; j++) {
							if ($rootScope.namesEdit[j] == selectedSow) {
								sow_id = $rootScope.SowIDs[j];
							}
						}
						if(sow_id != null){
							for (var k = 0; k < $rootScope.agileNamesEdit.length; k++) {
								if ($rootScope.agileNamesEdit[k] == selectedAgileTeam) {
									agile_id = $rootScope.agileIDs[k];
								}
							}
						}
						
						
					
						// on the basis of the above three call all records on
						// the basis of agile name
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/bhcReport/bhcReport1?LOB="
								+ lob_id
								+ "&SOWName="
								+ sow_id
								+ "&agilename=" + agile_id;
						
						//var d = new Date();
					   // alert(d);
					  
					    //document.getElementById("demo").innerHTML = n;
					    
					 

						$http.get(url).then(function(response) {
							 // var n = d.getMonth(response.data.records[0]);
							// alert("SSS  ::"+n);
							var data = {
								"xData" : response.data.records[0],
								"yData" : [ {
									"name" : "Total",
									"data" : response.data.records[3]
								}, {
									"name" : "Onsite",
									"data" : response.data.records[1]
								}, {
									"name" : "Offshore",
									"data" : response.data.records[2]
								} ]
							}

							$scope.lineChartYData = data.yData;
							$scope.lineChartXData = data.xData;

						});

					};

				});
