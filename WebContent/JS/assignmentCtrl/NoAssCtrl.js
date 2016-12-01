

function formatDate(date) {

	var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct", "Nov", "Dec");

	var d = new Date(date), month = '' + (d.getMonth()), day = '' + d.getDate(), year = d
			.getFullYear();
	/*
	 * if (month.length < 2) month = '0' + month;
	 */
	if (day.length < 2)
		day = '0' + day;

	monthname = m_names[month]
	return [ monthname, day, year ].join(' ');
}

app
		.controller(
				'NoAssCtrl',
				function($scope, $http, alertify, $route, $rootScope,
						cfpLoadingBar) {

					// Getting all LOB details

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

					// Getting Sow Name on basis of LOB selection

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
					}

					// Getting Agile Name on basis of Sow Name selection

					$scope.SowSelected = function(selectedSowname) {

						var url = "http://localhost:8086/com.wipro.capitalone.services/rest/NOAssignmentServ/getresource?SOWName="
								+ selectedSowname;

						$http
								.get(url)
								.success(
										function(data) {

											
											for (var i = 0; i < data.records.length; i++) {
												data.records[i].startDate = formatDate(data.records[i].startDate);
												data.records[i].endDate = formatDate(data.records[i].endDate);
											}

											$scope.resourceNotAssign = data.records;

										});

					}
				});
