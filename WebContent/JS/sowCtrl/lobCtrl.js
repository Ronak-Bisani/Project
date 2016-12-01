app
		.controller(
				'lobCtrl',
				function($scope, $http, alertify, $rootScope, $route,cfpLoadingBar) {
					
					$scope.disable_remove = true;

					var url = "http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/getport"
					$http.get(url).then(function(response) {

						var len = response.data.records.length;

						var index;
						var lob = [];
						for (index = 0; index < len; index++) {
							lob[index] = response.data.records[index].LOB;
						}
						// alert(response.data.records[0].LOB);

						$scope.names = lob;

					});

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

					/** ************************************************************************ */

					/*$scope.showAddChoice = function(choice) {
						return choice.id === $scope.choices[$scope.choices.length - 1].id;
					};*/

					// Saving LOB details

					$scope.saveLob = function() {
						var len = $scope.choices.length;

						var index, dylob = $scope.choices[0].lob, dybs = $scope.choices[0].bs, dybundle = $scope.choices[0].bundle, dymsa = $scope.choices[0].msa, dycurrencytype = $scope.choices[0].type;

						var flglob = 0, flgbs = 0, flgbun = 0, flgmsa = 0, flgcurr = 0;

						if (dylob == undefined || !isValidSpl(dylob)
								|| dylob == ' ') {
							flglob = 1;
						}
						if (dybs == undefined || !isValidSpl(dybs)
								|| dybs == ' '
								|| dybs == "Please Select Business Segment") {
							flgbs = 1;
						}
						if (dycurrencytype == undefined
								|| !isValidSpl(dycurrencytype)
								|| dycurrencytype == ' '
								|| dycurrencytype == "Please Select Currency") {
							flgcurr = 1;
						}

						for (index = 1; index < len; index++) {

							if ($scope.choices[index].lob == undefined
									|| !isValidSpl($scope.choices[index].lob)
									|| $scope.choices[index].lob == ' ') {
								flglob = 1;
							}
							if ($scope.choices[index].bs == undefined
									|| !isValidSpl($scope.choices[index].bs)
									|| $scope.choices[index].bs == ' ') {
								flgbs = 1;
							}
							if ($scope.choices[index].bundle == undefined
									|| !isValidSpl($scope.choices[index].bundle)
									|| $scope.choices[index].bundle == ' ') {
								flgbun = 1;
							}
							if ($scope.choices[index].msa == undefined
									|| !isValidSpl($scope.choices[index].msa)
									|| $scope.choices[index].msa == ' ') {
								flgmsa = 1;
							}
							if ($scope.choices[index].type == undefined
									|| !isValidSpl($scope.choices[index].type)
									|| $scope.choices[index].type == ' ') {
								flgcurr = 1;
							}

							dylob = dylob + "," + $scope.choices[index].lob,
									dybs = dybs + ","
											+ $scope.choices[index].bs,
									dybundle = dybundle + ","
											+ $scope.choices[index].bundle;
							dymsa = dymsa + "," + $scope.choices[index].msa;
							dycurrencytype = dycurrencytype + ","
									+ $scope.choices[index].type;
						}

						if (flglob == 1 || flgbs == 1 || flgcurr == 1) {		

							$scope.ErrorMessage = "Please enter valid data";
							$rootScope.disabledfun();
							return;

						}

						else {
							$rootScope.clrDesc();
						}
						
						for (index = 0; index < len; index++) {

							flgbun = flgmsa = 1;
							
							for (var i = 0;i < bundleNames.options.length;i++){
								if  (bundleNames.options[i].value == $scope.choices[index].bundle){
									
									flgbun = 0;
								}
							}
							
							for (var i = 0;i < msaDomainMapping.options.length;i++){
								if  (msaDomainMapping.options[i].value == $scope.choices[index].msa){
									
									flgmsa = 0;
								}
							}
						}
						
						if (flgbun == 1 || flgmsa == 1) {		

							$scope.ErrorMessage = "Please choose option from the list only";
							$rootScope.disabledfun();
							return;
						}

						else {
							$rootScope.clrDesc();
						}


						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/lobservice/savelob',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : dylob,
										param2 : dybs,
										param3 : dybundle,
										param4 : dymsa,
										param5 : dycurrencytype
									}
								}).success(function(data) {
							alertify.alert(data.records, function() {
								$route.reload();
							})
						});

					};
					/** ************************************************************************ */

					// calling our save function.
					$scope.saveSow = function(sowId, selectedLob, sowName,
							sowadmnt, startDate, endDate, appContSpnd, pgm, dm,
							pname) {

						function formatDate(date) {
							var d = new Date(date), month = ''
									+ (d.getMonth() + 1), day = ''
									+ d.getDate(), year = d.getFullYear();

							if (month.length < 2)
								month = '0' + month;
							if (day.length < 2)
								day = '0' + day;

							return [ month, day, year ].join('/');
						}

						var fstartdate = formatDate(startDate);
						var fenddate = formatDate(endDate);

						if (sowId == undefined || !isValidSpl(sowId)
								|| sowId == ' ') {

							$scope.ErrorMessage = "Please Enter Valid SOWID";

							$rootScope.disabledfun();

							return;
						}

						else if (selectedLob == undefined
								|| (selectedLob == "Please Select LOB")) {

							$scope.ErrorMessage = "Please Select Lob";

							$rootScope.disabledfun();

							return;
						} else if (sowName == undefined || sowName == ' '
								|| !isValidSpl(sowName)) {

							$scope.ErrorMessage = "Please Enter Valid SowName";

							$rootScope.disabledfun();

							return;
						} else if (sowadmnt == undefined
								|| !isValidSpl(sowadmnt) || sowadmnt == ' '
								|| !isValidSpl(sowadmnt)) {

							$scope.ErrorMessage = "Please Enter Valid Amendment";

							$rootScope.disabledfun();
							return;
						} else if (startDate == undefined || startDate == ' ') {

							$scope.ErrorMessage = "Please Enter Start Date";

							$rootScope.disabledfun();
							return;
						} else if (endDate == undefined || endDate == ' ') {

							$scope.ErrorMessage = "Please Enter End Date";

							$rootScope.disabledfun();
							return;
						}

						else if (appContSpnd == undefined || isNaN(appContSpnd)
								|| appContSpnd == ' ' || appContSpnd == '0') {

							$scope.ErrorMessage = "Please Enter Valid Approved Contractual Spend";

							$rootScope.disabledfun();
							return;
						} else if (pname == undefined || pname == ' '
								|| !isValidSpl(pname)) {

							$scope.ErrorMessage = "Please Enter Valid Project Name";

							$rootScope.disabledfun();
							return;
						} else if (pgm == undefined || !isValidSpl(pgm)
								|| pgm == ' ') {

							$scope.ErrorMessage = "Please Enter Valid PGM";

							$rootScope.disabledfun();
							return;
						} else if (dm == undefined || !isValidSpl(dm)
								|| dm == ' ') {

							$scope.ErrorMessage = "Please Enter Valid DM Name";

							$rootScope.disabledfun();
							return;
						}

						else {
							$rootScope.clrDesc();
						}

						/**
						 * ******************************* to display woid and
						 * budget fields ******************************
						 */

						var len = $scope.choices.length;
						var index, dywoid = $scope.choices[0].woid, dybudget = $scope.choices[0].budget, dypo = $scope.choices[0].po, dydid = $scope.choices[0].did;
						dycapOneMngr = $scope.choices[0].caponeManager;

						var budgetsum = $scope.choices[0].budget, flagwoid = 0, flagbudget = 0, flagpo = 0, flagdid = 0;
						flagcaponeManager = 0;
						for (index = 1; index < len; index++) {
							if ($scope.choices[index].woid == ' '
									|| $scope.choices[index].woid == '0') {
								flagwoid = 1;
							}

							if ($scope.choices[index].budget == ' '
									|| $scope.choices[index].budget == '0') {
								flagbudget = 1;
							}

							if ($scope.choices[index].po == ' '
									|| $scope.choices[index].po == '0') {
								flagpo = 1;
							}
							if ($scope.choices[index].did == ' '
									|| $scope.choices[index].did == '0') {
								flagdid = 1;
							}

							if ($scope.choices[index].caponeManager == ' '
									|| $scope.choices[index].caponeManager == '0') {
								flagcaponeManager = 1;
							}

							dywoid = dywoid + "," + $scope.choices[index].woid;
							dybudget = dybudget + ","
									+ $scope.choices[index].budget;
							dypo = dypo + "," + $scope.choices[index].po;
							
							budgetsum = budgetsum
									+ parseInt($scope.choices[index].budget);
							
							dydid = dydid + "," + $scope.choices[index].did;
							
							
							dycapOneMngr = dycapOneMngr + ","
									+ $scope.choices[index].caponeManager;

						}

						if (!isNotEmpty(dydid) || !isValidSpl(dydid)
								|| flagdid == 1) {

							$scope.ErrorMessage = "Please Enter Valid DID";

							$rootScope.disabledfun();
							return;
						}

						if (!isNotEmpty(dywoid) || !isValidSpl(dywoid)
								|| flagwoid == 1) {

							$scope.ErrorMessage = "Please Enter Valid WOID";

							$rootScope.disabledfun();
							return;
						}
						
						if (!isNotEmpty(dybudget) || !isValidSpl(dybudget)
								|| flagbudget == 1) {

							$scope.ErrorMessage = "Please Enter Valid Budget";

							$rootScope.disabledfun();

							return;
						}
						if (!isNotEmpty(dypo) || !isValidSpl(dypo)
								|| flagpo == 1) {

							$scope.ErrorMessage = "Please Enter Valid Purchase Order";

							$rootScope.disabledfun();

							return;
						}
						
						
						if (!isNotEmpty(dycapOneMngr)
								|| !isValidSpl(dycapOneMngr)
								|| flagcaponeManager == 1) {

							$scope.ErrorMessage = "Please Enter Valid cap one Manager Order";

							$rootScope.disabledfun();
							return;
						}
						
						if (appContSpnd < budgetsum) {

							$scope.ErrorMessage = "Approved contractual spend should be greater or equal to sum of budgets";

							$rootScope.disabledfun();
							return;
						}

						

						        $rootScope.clrDesc();

						$http(
								{
									method : 'POST',
									url : 'http://localhost:8086/com.wipro.capitalone.services/rest/sowservice/savesowsetup',
									data : JSON.stringify({
										'aa' : 'bb'
									}), // forms user object
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded',
										param1 : sowId,
										param2 : sowadmnt,
										param3 : fstartdate,
										param4 : fenddate,
										param5 : sowName,
										param6 : appContSpnd,
										param7 : selectedLob,
										param8 : dywoid,
										param9 : dydid,
										param10 : pgm,
										param11 : dm,
										param12 : pname,
										param13 : dybudget,
										param14 : dypo,
										param15 : dycapOneMngr
									}
								}).success(
								function(data) {
									var errorObj = data.errors;
									if (angular.isObject(errorObj)) {
										//alert(errorObj[0].message);
										return;
									} else {

										alertify.alert("SOW has been Saved",
												function() {

													$route.reload();

												})

									}

								});
					};

				});
