// create the module and name it scotchApp
var app = angular.module('Angular_RestPoc', [ 'ngRoute', 'ngCookies',
		'ngResource', 'ngAlertify', '720kb.datepicker',
		'chieffancypants.loadingBar', 'AngularChart',
		'angularUtils.directives.dirPagination' ]);

app.config(function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = true;
});

app.config(function($routeProvider) {
	$routeProvider.when('/', {

		templateUrl : 'views/shared/setup.html',
		controller : 'homeCtrl'
	}).when('/createSow', {

		templateUrl : 'views/sow/createSow.html',
		controller : 'lobCtrl'
	}).when('/EditSow', {

		templateUrl : 'views/sow/EditSow.html',
		controller : 'editSowCtrl'
	}).when('/viewSow', {

		templateUrl : 'views/sow/viewsow.html',
		controller : 'viewSowCtrl'
	}).when('/agileTeam', {

		templateUrl : 'views/agile/agileTeam.html',
		controller : 'createAgileCtrl'
	}).when('/editAgileTeam', {

		templateUrl : 'views/agile/editAgileTeam.html',
		controller : 'editAgileCtrl'
	}).when('/createAssignment', {

		templateUrl : 'views/assignment/createAssignment.html',
		controller : 'createAssignmentCtrl'
	}).when('/viewAgileTeam', {
		templateUrl : 'views/agile/viewAgileTeamDetail.html',
		controller : 'viewAgileTeamDetailCtrl'
	}).when('/NoAssignment', {
		templateUrl : 'views/assignment/NoAssignment.html',
		controller : 'NoAssCtrl'
	}).when('/rate', {

		templateUrl : 'views/rate/rate.html',
		controller : 'rateCtrl'
	}).when('/locationOfoperation', {

		templateUrl : 'views/locationOfOperation/locationOfoperation.html',
		controller : 'locationCtrl'
	}).when('/viewlocationOfoperation', {

		templateUrl : 'views/locationOfOperation/ViewLocationOfOperation.html',
		controller : 'locationViewCtrl'
	}).when('/Workingdays', {

		templateUrl : 'views/workingDays/Workingdays.html',
		controller : 'workingCtrl'
	}).when('/Accrual', {

		templateUrl : 'views/accrual/Accrual.html',
		controller : 'AccrualCtrl'
	}).when('/downloadAccrual', {

		templateUrl : 'views/accrual/downloadAccrual.html',
		controller : 'DownloadCtrl'
	}).when('/editAssignment', {

		templateUrl : 'views/assignment/editAssignment.html',
		controller : 'editAssignCtrl'
	}).when('/Actual', {

		templateUrl : 'views/actual/Actual.html',
		controller : 'ActualCtrl'
	})

	.when('/lobSetup', {

		templateUrl : 'views/lobSetup/lobSetup.html',
		controller : 'lobCtrl'
	}).when('/viewLob', {

		templateUrl : 'views/lobSetup/ViewLob.html',
		controller : 'viewLobCtrl'
	}).when('/bfmActivity', {

		templateUrl : 'views/bfmActivity/bfmActivity.html',
		controller : ''
	}).when('/costUpload', {

		templateUrl : 'views/upload/costUpload.html',
		controller : 'costUpload'
	}).when('/revenueUpload', {

		templateUrl : 'views/upload/revenueUpload.html',
		controller : 'revenueCtrl'
	}).when('/ZcopUpload', {

		templateUrl : 'views/upload/DailyzcopUpload.html',
		controller : 'monthlyZcopUploadCtrl'
	})

	.when('/reviewAccrual', {

		templateUrl : 'views/accrual/reviewAccrual.html',
		controller : 'reviewAccrual'
	}).when('/reviewActual', {

		templateUrl : 'views/actual/reviewActual.html',
		controller : 'reviewActual'
	}).when('/accrualsFreezed', {

		templateUrl : 'views/bfmActivity/accrualsFreezed.html',
		controller : ''
	}).when('/report', {

		templateUrl : 'views/report/report.html',
		controller : 'chartCtrl'
	}).when('/Viewrate', {
		templateUrl : 'views/rate/rateview.html',
		controller : 'Viewratectrl'
	}).when('/BHC_Report', {
		templateUrl : 'views/report/BHC_Report.html',
		controller : 'BHCReportCtrl'
	}).otherwise({
		redirectTo : '/'
	});

});
