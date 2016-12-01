app
		.controller(
				'AccrualCtrl',
				function($scope, $http,$window,$cookieStore,$route, $rootScope,cfpLoadingBar,alertify) {
					
					var amount;
					var hours;
					
					var hoursFinal;
					var amountFinal
					var today = new Date();
					var dd = today.getDate();
					//var mm = today.getMonth()+1; //January is 0!
					//var yyyy = today.getFullYear();
					$scope.username = $cookieStore.get('username') || {};
					$scope.role = $cookieStore.get('userrole') || {};
				
					if(dd>25) {
						$window.location.href = "http://localhost:8086/OperationSystems_UI/Index.html#/accrualsFreezed";
						return;
					} 
					$http
					.get("http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/insertAccruals")
							
							
					.then(function(response) {
							}); 
					
					
					
					// To get all Lob detais
					
					

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getport")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var lob = [], togsave = [], togsub = [], togappr = [];
										for (index = 0; index < len; index++) {
											lob[index] = response.data.records[index].LOB;
										}
										// get lob details
										$scope.lobNames = lob;

										if ($rootScope.myRole == "DM") {
											togsave[0] = true;
											togsub[0] = true;
											togappr[0] = false;
										}
										if ($rootScope.myRole == "PM") {
											togsave[0] = false;
											togsub[0] = false;
											togappr[0] = true;
										}

										$scope.toglesave = togsave;
										$scope.toglesub = togsub;
										$scope.togleappr = togappr;
										

									});

					// get SowName by LOB

					$scope.lobSelected = function(selectedLOB) {

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
						
						$rootScope.clrDesc();
					}
					// ------------------------------------------------------------------------
					// get agile name by sowname
					$scope.AssignSowSelected = function(selectedSow) {

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/getAgileNameBySowname?Sowname="
								+ selectedSow;

						$http.get(url).success(function(data) {

							var len = data.records.length;

							var index;
							var agile = [];
							for (index = 0; index < len; index++) {
								agile[index] = data.records[index].agileName;
							}
							$scope.agilenNamesEdit = agile;

						});
						$rootScope.clrDesc();

					}

					// ---------------------------------------------------------------------
					// fetch the selectedLob, selectedSow and selectedAgileTeam
					// and
					$scope.fetch = function(selectedLob, selectedSow,
							selectedAgileTeam) {

						if ((selectedLob == undefined)
								|| (selectedLob == "Please Select LOB")) {
						
							
							$scope.ErrorMessage = "Please Select Lob";
							  
							  $rootScope.disabledfun();
							return;
						}
						if ((selectedSow == undefined)
								|| (selectedSow == "Please Select SOW NAME")) {
				
							
							$scope.ErrorMessage = "Please select SOW NAME";
							  
							  $rootScope.disabledfun();
							return;
						}
						if (selectedAgileTeam == undefined
								|| (selectedAgileTeam == "Please Select Agile NAME")) {
						
							$scope.ErrorMessage = "Please Select Agile Name";
							  
							  $rootScope.disabledfun();
							return;
						}

						// on the basis of the above three call all records on
						// the basis of agile name
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/getAccrual?LOB="
								+ selectedLob
								+ "&SOWName="
								+ selectedSow
								+ "&agilename=" + selectedAgileTeam + "&role=" +$scope.role;  

						
						$http
								.get(url)
								.then(
										function(response) {

											$scope.agileName = response.data.records;
											
										
											

											// **************************************************

											var url = "http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/downlaodAccrual?LOB="
													+ selectedLob
													+ "&SOWName="
													+ selectedSow
													+ "&agilename="
													+ selectedAgileTeam;
											$http
													.get(url)
													.success(
															function(response) {

																$scope.downloadAccrual = response.records;
																alert(response.records);

															});

										});
					}

					// ----------------------------------------------------------------------------------------

					// calling saveAccrual function.//saveAccrual saves the
					// accrual details to accrual table

					

					$scope.assigmentsEditValues = [];
					

					$scope.saveAccrual11 = function(location,assingmentID, WorkDays,
							leave, Comment, billingdays ,rate, AccrualId) {
						
						
						
						
						 if (WorkDays == undefined || isNaN(WorkDays)
								|| WorkDays == ' ' || WorkDays == '0') {

							$scope.ErrorMessage = "Please Enter Valid Working days";

							$rootScope.disabledfun();
							
							return;
						 }
						 if (leave == undefined || isNaN(leave)
									|| leave == ' ' || leave == '0') {

								$scope.ErrorMessage = "Please Enter Valid leave details";

								$rootScope.disabledfun();
								
								return;
							 }
						 
						 
						 if (Comment == undefined || Comment.length == 0) {

								$scope.ErrorMessage = "Comments are mandatory";

								$rootScope.disabledfun();
								
								return;
							 }
				
						
						if(location=="Offshore"){
							hours= billingdays*8.8;
							
						    hoursFinal=hours.toFixed(2);
							
							amount= billingdays*rate*8.8;
							
							amountFinal=amount.toFixed(2);
							
							
							
						}
						else{
							
							hours= billingdays*8;
							
						    hoursFinal=hours.toFixed(2);
							
							amount= billingdays*rate*8;
							
						    amountFinal=amount.toFixed(2);
							
							
						}
						
						var f = assingmentID + ',' + WorkDays + ',' + leave
								+ ',' + Comment + ',' + billingdays + ','+ hoursFinal + ','+ amountFinal + ','+ AccrualId;

						var len = $scope.assigmentsEditValues.length;
						$scope.assigmentsEditValues[len + 1] = f;
						
					}

					$scope.saveAccrual = function() {
						
						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/accrualservice/saveAccruals',
									data : JSON.stringify({}), // forms user
									
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : $scope.assigmentsEditValues
									}
								}).success(function(data) {
							$scope.assigmentsEditValues = [];

						
							
							alertify.alert("Accruals Saved successfully",function() {
								$route.reload();

							})
							
							
							
							if (data.errors) {
								alert('error');
								// Showing errors.
								$scope.errorName = data.errors.name;
								$scope.errorUserName = data.errors.username;
								$scope.errorEmail = data.errors.email;
							} else {
								// $scope.message = data.message;
							}
						});
					};
					
					
					
					
					

					/*-------------------*/
					// Download data into excel on the basis of selected SOW,LOB and Agile Team
					$scope.exportData = function(selectedLob, selectedSow,
							selectedAgileTeam) {
						
						
						
						if ((selectedLob == undefined)
								|| (selectedLob == "Please Select LOB")) {
						
							
							$scope.ErrorMessage = "Please Select Lob";
							  
							  $rootScope.disabledfun();
							return;
						}
						if ((selectedSow == undefined)
								|| (selectedSow == "Please Select SOW NAME")) {
				
							
							$scope.ErrorMessage = "Please select SOW NAME";
							  
							  $rootScope.disabledfun();
							return;
						}
						if (selectedAgileTeam == undefined
								|| (selectedAgileTeam == "Please Select Agile NAME")) {
						
							$scope.ErrorMessage = "Please Select Agile Name";
							  
							  $rootScope.disabledfun();
							return;
						}

						alertify.alert("Downloading Accruals..");
						var blob = new Blob(
								[ document.getElementById('exportable').innerHTML ],
								{
									type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
								});
						
						saveAs(blob, "Report.xls");
					};


				});
