function toggleIcon(a) {

if ( document.getElementById(a).className.match("more-less glyphicon glyphicon-hand-up"))
       document.getElementById(a).className = "more-less glyphicon glyphicon-hand-down";
else
  document.getElementById(a).className = "more-less glyphicon glyphicon-hand-up";
    }


app
		.controller(
				'editSowCtrl',
				function($scope, $http, alertify,$route,$rootScope,cfpLoadingBar) {
					
					$scope.disable_remove = true;
					
					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getsowname")
							.then(
									function(response) {

										var len = response.data.records.length;

										var index;
										var sowedit = [];
										for (index = 0; index < len; index++) {
											sowedit[index] = response.data.records[index].SOWName;
										}
										$scope.namesEdit = sowedit;

									});
					// Getting all LOB Names

					$http
							.get(
									"http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getport")
							.then(
									function(response) {
										var len = response.data.records.length;

										var index;
										var lobedit = [];
										var ss = response.data.records;
										for (index = 0; index < len; index++) {
											lobedit[index] = response.data.records[index].LOB;
										}
										$scope.lobnamesedit = lobedit;

									});

					// Fetching all records based upon SOW_Name

					$scope.fetchSow = function(selectedSow) {

						if (selectedSow == undefined || selectedSow=="Please Select SOW NAME") {
							$scope.ErrorMessage = "Please Select SOW NAME";
							  $rootScope.disabledfun();
							return;
						}
						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getsow_detail?SOWName="
								+ selectedSow;

						$http
								.get(url)
								.success(
										function(data) {

											function formatDate(date) {
												var d = new Date(date), month = ''
														+ (d.getMonth() + 1), day = ''
														+ d.getDate(), year = d
														.getFullYear();
												if (month.length < 2)
													month = '0' + month;
												if (day.length < 2)
													day = '0' + day;

												return [month,day,year]
														.join('-');
											}

										
											
											
											
											$scope.SowIdEdit = data.records[0].SOWID;
											$scope.SowAmendment = data.records[0].SOWAmendment;
											$scope.startDate = formatDate(data.records[0].StartDate);
											$scope.endDate = formatDate(data.records[0].EndDate);
											$scope.sowName = data.records[0].SOWName;
											
											
											
											$scope.apprvdCtrlSpnd = parseFloat(data.records[0].ApproveContractualSpend);
											$scope.pgm = data.records[0].PGM;
											/* $scope.Did = data.records[0].DID; */
											$scope.dm = data.records[0].DMName;
											$scope.pname = data.records[0].ProjectName;
											$scope.id = data.records[0].SOWID;

											var ss = data.records;
											$scope.data1 = {
												selectedOption : ss[0].LOB
											};

											var WS = data.records[0].WOIDs;
											var woidsWS = [];
											woidsWS = WS;
											$scope.woidsEdit = woidsWS;

											var budWS = data.records[0].Budgets;
											var budgetWS = [];
											budgetWS = budWS;
											$scope.budgetEdit = budgetWS;

											var poWS = data.records[0].po;
											var pOrderWS = [];
											pOrderWS = poWS;
											$scope.poEdit = pOrderWS;

											var didWS = data.records[0].did;
											var didOrderWS = [];
											didOrderWS = didWS;
											$scope.didEdit = didOrderWS;

											var caponemgrWs = data.records[0].caponemgr;
											var caponemanagerWs = [];
											caponemanagerWs = caponemgrWs;
											$scope.didEdit = caponemanagerWs;

											var idWS = data.records[0].id_Tbl_wo;
											var idsWS = [];
											idsWS = idWS;
											$scope.idEdit = idsWS;

											var len = woidsWS.length;
											var index;
											$scope.output = [];
											for (index = 0; index < len; index++) {
												$scope.output
														.push({
															"woid" : woidsWS[index],
															"budget" : budgetWS[index],
															"po" : pOrderWS[index],
															"did" : didOrderWS[index],
															"caponemgr" : caponemanagerWs[index],
															"id" : idsWS[index]

														});

											}

										});

					}

					// Adding more WOIDS

					$scope.choices = [ {
						id : 'choice1'
					} ];

					$scope.addNewChoice = function() {
						var newItemNo = $scope.choices.length + 1;
						 $scope.disable_remove = false;
						$scope.choices.push({
							'id' : 'choice' + newItemNo
						});
					};

					$scope.showAddChoice = function(choice) {
						return choice.id === $scope.choices[$scope.choices.length - 1].id;
					};
					$scope.removeChoice = function() {

                        if ($scope.choices.length == 2) {
                               $scope.disable_remove = true;

                        }

                        var newItemNo = $scope.choices.length - 1;

                        $scope.choices.pop();

                 };

					                 /** **************Update SOW***************** */
					
					
					$scope.upadteSow = function(SowIdEdit, SowAmendment,
							startDate, endDate, sowName, apprvdCtrlSpnd,
							LobselectedOption, pgm, dm, pname, id) {
						
						

						if (SowIdEdit == undefined || !isValidSpl(SowIdEdit)
								|| SowIdEdit == ' ') {
						
							  $scope.ErrorMessage = "Please Enter Valid SOWID";
							  $rootScope.disabledfun();
							return;
						}
						if (LobselectedOption == undefined
								|| (LobselectedOption == "Please Select LOB")) {
							
							 $scope.ErrorMessage = "Please Enter Lob";
							  $rootScope.disabledfun();
							
							return;
						}
						if (sowName == undefined || sowName == ' ' || !isValidSpl(sowName)) {
					
							 $scope.ErrorMessage = "Please Enter Valid SowName";
							  $rootScope.disabledfun();
							
							return;
						}
						if (SowAmendment == undefined || !isValidSpl(SowAmendment)|| SowAmendment == '') {
					
							 $scope.ErrorMessage = "Please Enter Valid Amendment";
							  $rootScope.disabledfun();
							
							return;
						}
						if (startDate == undefined || startDate == ' ') {
						

							 $scope.ErrorMessage = "Please Enter Start Date";
							  $rootScope.disabledfun();
							return;
						}
						if (endDate == undefined || endDate == ' ') {
						
							 $scope.ErrorMessage = "Please Enter End Date";
							  $rootScope.disabledfun();
							return;
						}
						if (apprvdCtrlSpnd == undefined
								|| apprvdCtrlSpnd == ' '
								|| apprvdCtrlSpnd == '0') {
							 $scope.ErrorMessage = "Please Enter Valid Approved Contractual Spend";
							  $rootScope.disabledfun();
							return;
						}
						if (pname == undefined || pname == '' || !isValidSpl(pname)) {
							
							 $scope.ErrorMessage = "Please Enter Valid Project Name";
							  $rootScope.disabledfun();
							return;
						}

						if (pgm == undefined || !isValidSpl(pgm) || pgm == ' ') {
					
							 $scope.ErrorMessage = "Please Enter Valid PGM";
							  $rootScope.disabledfun();
							return;
						}
						if (dm == undefined || !isValidSpl(dm) || dm == ' ') {
					
							 $scope.ErrorMessage = "Please Enter Valid DM Name";
							  $rootScope.disabledfun();
							return;
						}
						

						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/updatesowsetup',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : SowIdEdit,
										param2 : SowAmendment,
										param3 : startDate,
										param4 : endDate,
										param5 : sowName,
										param6 : apprvdCtrlSpnd,
										param7 : LobselectedOption,
										param9 : pgm,
										param10 : dm,
										param11 : pname,
										param12 : id
									}
								})
								.success(
										function(data) {
											var errorObj = data.errors;
											if (angular.isObject(errorObj)) {
												alertify.alert("SOW has been Updated",
														function() {
													$route.reload();

														})
												return;
											} else {

												alert(errorObj[0].message);
											}

										});
					};

					// Updating WOID
					$scope.saveWoidsForSow = function(woid, caponemgnr, budget,
							po, did, id, SowIdEdit, apprvdCtrlSpnd) {
						
						
						


						if (!isNotEmpty(woid) || !isValidSpl(woid)
								|| woid == ' ' || woid == '0') {
				
							 $scope.ErrorMessage = "Please Enter Valid WOID";
							  $rootScope.disabledfun();
							return;
						}

						if (!isNotEmpty(budget) || !isValidSpl(budget)
							    || budget == ' '
								|| budget == '0') {
							
							 $scope.ErrorMessage = "Please Enter Valid Budget";
							  $rootScope.disabledfun();
							return;
						}
						if (!isNotEmpty(po) || !isValidSpl(po) || po == ' '
								|| po == '0') {
						
							$scope.ErrorMessage = "Please Enter Valid Purchase Order";
							  $rootScope.disabledfun();
							return;
						}

						if (!isNotEmpty(po) || !isValidSpl(po) || po == ' '
								|| po == '0') {
						
							$scope.ErrorMessage = "Please Enter Valid Purchase Order";
							  $rootScope.disabledfun();
							return;
						}

						if (!isNotEmpty(caponemgnr) || !isValidSpl(caponemgnr)
								|| caponemgnr == ' ' || caponemgnr == '0') {
				
							$scope.ErrorMessage = "Please Enter Valid capital one manager Name";
							  $rootScope.disabledfun();
							return;
						}

						if (!isNotEmpty(did) || !isValidSpl(did) || did == ' '
								|| did == '0') {
						
							$scope.ErrorMessage = "Please Enter Valid DID";
							  $rootScope.disabledfun();
							
							return;
						}

						if (apprvdCtrlSpnd < budget) {


							$scope.ErrorMessage = "Approved  contractual spend should be greater or equal to sum of Budgets";
							  $rootScope.disabledfun();
							return;
						}

						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/woidservice/updateWO',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										pWOID : woid,
										pBudget : budget,
										pPO : po,
										pdid : did,
										pcaponemgnr : caponemgnr,
										pID : id,
										pSOWID : SowIdEdit
									}
								})
								.success(
										function(data) {

										})
										.error(function (data){
											alertify.alert("SOW has been Updated",function() {
												//$route.reload();
											   })
											}
										);
					}

					// Dynamic WOID and Budget
					$scope.saveWOID = function(SowIdEdit, apprvdCtrlSpnd) {

						
						var len = $scope.choices.length;

						var index, dywoid = "", dybudget = "", dypo = "";
						dycaponeMgnr = "";
						dydid = "";

						var budgetsum = 0;
						for (index = 0; index < len; index++) {
							dywoid = dywoid + $scope.choices[index].woid + ",";
							dybudget = dybudget + $scope.choices[index].budget
									+ ",";
							dypo = dypo + $scope.choices[index].po + ",";
							dydid = dydid + $scope.choices[index].did + ",";
							dycaponeMgnr = dycaponeMgnr
									+ $scope.choices[index].caponeManager + ",";
							budgetsum = budgetsum
									+ parseInt($scope.choices[index].budget);

						}

						if (!isNotEmpty(dywoid) || !isValidSpl(dywoid)) {
					
							$scope.ErrorMessage = "Please Enter Valid WOID";
							  $rootScope.disabledfun();
							return;
						}
						/*
						 * if (dybudget==undefined ) {alert("Please Enter
						 * Budget"); return ;}
						 */
						if (!isNotEmpty(dybudget) || !isValidSpl(dybudget)
								|| isValidNumComma(dybudget)) {
						
							$scope.ErrorMessage = "Please Enter Valid Budget";
							  $rootScope.disabledfun();
							return;
						}
						if (!isNotEmpty(dypo) || !isValidSpl(dypo)) {
						
							$scope.ErrorMessage = "Please Enter Valid Purchase Order";
							  $rootScope.disabledfun();
							return;
						}
                        if (!isNotEmpty(dydid) || !isValidSpl(dydid)) {
							
							$scope.ErrorMessage = "Please Enter Valid DID";
							  $rootScope.disabledfun();
							return;
						}

						if (!isNotEmpty(dycaponeMgnr)
								|| !isValidSpl(dycaponeMgnr)) {
					
							$scope.ErrorMessage = "Please Enter Valid capital one Manager name";
							  $rootScope.disabledfun();
							return;
						}
						
						if (apprvdCtrlSpnd < budgetsum) {
						
							$scope.ErrorMessage = "Approved contractual spend should be greater or equal to sum of budgets";
							  $rootScope.disabledfun();

							return;
						}

						

						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/woidservice/saveWo',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : SowIdEdit,
										param2 : dywoid,
										param3 : dybudget,
										param4 : dypo,
										param5 : dycaponeMgnr,
										param6 : dydid
									}
								})
								.success(
										function(data) {
											var errorObj = data.errors;
											if (angular.isObject(errorObj)) {
												alert(errorObj[0].message);
												return;
											} else {

												alertify
														.alert(
																"WOID's has been Added",
																function() {
																	$route.reload();

																})

											}

										});
					};

				});