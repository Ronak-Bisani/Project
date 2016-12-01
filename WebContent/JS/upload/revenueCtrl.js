 app.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
      
 app.service('fileUpload', ['$http', function ($http) {
            this.uploadFileToUrl = function(file, uploadUrl){
               var fd = new FormData();
               fd.append('file', file);
            
               $http.post(uploadUrl, fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined,
                	  param1 : 'Revenue'  
                  }
               })
            
               .success(function(){
            	  

            	   alert("Files Uploaded Successfully");
            	   document.getElementById("fileupload").value = "";
               })
            
               .error(function(){
            	 
            	   alert("Please check the files");
            	   document.getElementById("fileupload").value = "";
               });
            }
         }]);
      
 app.controller('revenueCtrl', ['$scope', 'fileUpload', function($scope, fileUpload,cfpLoadingBar){
            $scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               
               var uploadUrl = "http://localhost:8086/RestfulFileUploadExample/rest/files/upload";
               fileUpload.uploadFileToUrl(file, uploadUrl);
            };
         }]);
			
   