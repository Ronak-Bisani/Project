app.controller('ActualCtrl',function($scope, $http,$window,$cookieStore,$route, $rootScope,cfpLoadingBar, alertify) {
				
	
	
				var amount;
				var hours;
				var hoursFinal;
				var amountFinal
				var today = new Date();
				var dd = today.getDate();
				$scope.username = $cookieStore.get('username') || {};
				$scope.role = $cookieStore.get('userrole') || {};
				if(dd>25) {
					$window.location.href = "http://localhost:8086/OperationSystems_UI/Index.html#/actualsFreezed";
					return;
				} 
				$http
					.get("http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getport")
					.then(
							function(response) {
								
									var len = response.data.records.length;
									var index;
									var lob = [];
									for (index = 0; index < len; index++) {
										lob[index] = response.data.records[index].LOB;
									}
									// get lob details
									$scope.lobNames = lob;
							}
						);

				// get sowname by lob
				$scope.lobSelected = function(selectedLOB) {
						
						$rootScope.clrDesc();	
						$http
							.get("http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getsowNamebyLob?LOB="	+ selectedLOB)
							.then(
									function(response) {

											var len = response.data.records.length;
											var index;
											var lobSowName = [];
											for (index = 0; index < len; index++) {
												lobSowName[index] = response.data.records[index].SOWName;
											}
											$scope.namesEdit = lobSowName;
										}
								);
				}
				
				// get agile name by sowname
				$scope.AssignSowSelected = function(selectedSow) {

						$rootScope.clrDesc();
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/assignmentservice/getAgileNameBySowname?Sowname=" + selectedSow;
						$http
							.get(url)
							.success(
									function(data) {
										
											var len = data.records.length;
											var index;
											var agile = [];
											for (index = 0; index < len; index++) {
												agile[index] = data.records[index].agileName;
											}
											$scope.agilenNamesEdit = agile;
									}
							);
				}

				// fetch the selectedLob, selectedSow and selectedAgileTeam
				$scope.fetch = function(selectedLob, selectedSow,selectedAgileTeam) {

						if ((selectedLob == undefined) || (selectedLob == "Please Select LOB")) {
							$scope.ErrorMessage = "Please Select LOB";
							$rootScope.disabledfun();
							return;
						}
						else{
							$rootScope.clrDesc();
						}
						
						if ((selectedSow == undefined) || (selectedSow == "Please Select SOW NAME")) {
							$scope.ErrorMessage = "Please select Sow Name";
							$rootScope.disabledfun();
							return;
						}
						else{
							$rootScope.clrDesc();
						}
						if (selectedAgileTeam == undefined || (selectedAgileTeam == "Please Select Agile NAME")) {
							$scope.ErrorMessage = "Please Select Agile Name";
							$rootScope.disabledfun();
							return;
						}
						else{
							$rootScope.clrDesc();
						}

						// on the basis of the above three call all records on
						// the basis of agile name1
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/Actualservice/getActual?LOB=" 
								+ selectedLob
								+ "&SOWName="
								+ selectedSow
								+ "&agilename=" + selectedAgileTeam + "&role=" + $scope.role;

						$http
							.get(url)
							.then(
									function(response) {

											$scope.agileName = response.data.records;
											var url = "http://localhost:8086/com.wipro.capitalone.services/rest/Actualservice/downlaodActual?LOB="
													+ selectedLob
													+ "&SOWName="
													+ selectedSow
													+ "&agilename="
													+ selectedAgileTeam;
											
											$http
												.get(url)
												.success(
															function(response) {

																	$scope.downloadActual = response.records;
															}
												);
										}
							);
				}

				// calling saveActual function.//saveActual saves the
				// Actual details to Actual table
				
				$scope.assigmentsEditValues = [];
				
				$scope.saveActual11 = 
				function(location,assingmentID, WorkDays,
						leave, Comment, billingdays ,rate, ActualId) {
					if (WorkDays == undefined || isNaN(WorkDays)
							|| WorkDays == ' ' || WorkDays == '0') {

						$scope.ErrorMessage = "Please Enter Valid Working days";
						$rootScope.disabledfun();
						return;
					}
					
					 if (leave == undefined || isNaN(leave)
						|| leave == '0') {

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
								+ ',' + Comment + ',' + billingdays + ','+ hoursFinal + ','+ amountFinal + ','+ ActualId;
						var len = $scope.assigmentsEditValues.length;
						$scope.assigmentsEditValues[len + 1] = f;
				}

				$scope.saveActual = 
				function() {
				
						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/Actualservice/saveActuals',
									data : JSON.stringify({}), 
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : $scope.assigmentsEditValues
									}
								}
							)
							.success(
									function(data) {
										
											$scope.assigmentsEditValues = [];
											alertify.alert("Actuals Saved successfully",function() {
												$route.reload();
											})
											
											if (data.errors) {
												alert('error');
												$scope.errorName = data.errors.name;
												$scope.errorUserName = data.errors.username;
												$scope.errorEmail = data.errors.email;
											}
											else {
													// $scope.message = data.message;
											}
									}
							);
				};

				// Download data into excel on the basis of selected SOW,
				// LOB and Agile Team
				$scope.exportData = function(selectedLob, selectedSow, selectedAgileTeam) {
						
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

						alert("Downloading Actuals...");
						var blob = new Blob([ document.getElementById('exportable').innerHTML ],
								{
									type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
								});
								// alert(blob);
								saveAs(blob, "Actual_Report.xls");
				};
});