app.controller('viewAgileTeamDetailCtrl',
				function($scope, $http, alertify, $route, $rootScope,
						cfpLoadingBar, $location) {
						// Getting all the Agile full details
						$http
								.get(
										"http://localhost:8086/com.wipro.capitalone.services/rest/agileTeamService/getfullagile_detail")
								.then(function(response) {						
									$scope.agileTDetailsView = response.data.records;							
								});																																
			

$scope.deleteAgileTeams = function(agileID) {
	
	alertify.confirm("Are you sure?",
					 function(){
					 		$http({
					 				method : 'DELETE',
					 				url : 'http://localhost:8086/com.wipro.capitalone.services/rest/agileTeamService/deleteagile',
					 				data : JSON.stringify({
					 				'aa' : 'bb'
					 				}), 
							headers : {
									'Content-Type' : 'application/x-www-form-urlencoded',
									param1 : agileID
							}
					 		})
					 		.success(function(data) {
					 				if ((data == -1) || (data == 0)) {
					 					alertify.alert("Agile team cannot be deleted.");
					 				}
					 				else {
					 					alertify.alert("Agile team deleted successfully.");
					 					$route.reload();
					 				}
					 		})
		          });			
}

$scope.Navigate = function() {
	$location.path("/agileTeam" );
	}
$scope.Navigate1 = function() {
	$location.path("/editAgileTeam" );
	}
});