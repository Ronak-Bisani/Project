app.controller('viewLobCtrl', function($scope, $http, alertify, $rootScope, $route,cfpLoadingBar,$location) {
					
					var url = "http://localhost:8086/com.wipro.capitalone.services/rest/lobservice/getLobData"
					$http
						.get(url)
						.then(
								function(response) {

										$scope.LobData = response.data.records;
						});
					
					$scope.deleteLobData = function(portfolioId) {
						
						alertify.confirm("Are you sure?",
										 function(){
										 		$http({
										 				method : 'DELETE',
										 				url : 'http://localhost:8086/com.wipro.capitalone.services/rest/lobservice/deleteLobData',
										 				data : JSON.stringify({
										 				'aa' : 'bb'
										 				}), 
												headers : {
														'Content-Type' : 'application/x-www-form-urlencoded',
														param1 : portfolioId
												}
										 		})
										 		.success(function(data) {
										 				if ((data == -1) || (data == 0)) {
										 					alertify.alert("LOB data cannot be deleted.");
										 				}
										 				else {
										 					alertify.alert("LOB data deleted successfully.");
										 					$route.reload();
										 				}
										 		})
							          });			
					}
					
					
					$scope.createLOB = function(){
						$location.path("/lobSetup");
					}
			});