//function for displaying all the contents depending upon role

function getCategories(role) {

	var categories = [];

	if (role == "DM" || role == "PM" || role == "LOB PMO") {
		categories = [ {
			id : 'GO',
			title : 'General Operations',
			icon : 'fa fa-gg fa-lg',
			items : [  {
				id : 'LOB Setup',
				title : 'LOB Setup',
				icon : 'fa fa-code-fork fa-lg',
				link : 'viewLob'
			} ]
		}, {
			id : 'BFM',
			title : 'BFM Activity',
			icon : 'fa fa-inr fa-lg',
			items : [ {
				id : 'Generate Margin Report',
				title : 'Generate Margin Report',
				icon : 'fa fa-line-chart fa-lg',
				link : 'bfmActivity'
			} ]
		}, {
			id : 'Setup',
			title : 'Setup',
			icon : 'fa fa-tasks fa-lg',

			items : [ {
				id : 'SOW',
				title : 'SOW',
				icon : 'fa fa-list-alt fa-lg',
				link : 'viewSow'
			}, {
				id : 'AgileTeam',
				title : 'AgileTeam',
				icon : 'fa fa-user-plus fa-lg',
				link : 'viewAgileTeam'
			} ]
		}, {
			id : 'Assignment',
			title : 'Assignment',
			icon : 'fa fa-calendar fa-lg',
			items : [ {
				id : 'Assignment Plan',
				title : 'Assignment Plan',
				icon : 'fa fa-calendar-check-o fa-lg',
				link : 'createAssignment'
			}, {
				id : 'Edit Assignment',
				title : 'Edit Assignment',
				icon : 'fa fa-calendar-plus-o fa-lg',
				link : 'editAssignment'
			}, {
				id : 'No Assignment Planned',
				title : 'Assignment Report',
				icon : 'fa fa-calendar-o fa-lg',
				link : 'NoAssignment'
			} ]
		}, {
			id : 'Accruals',
			title : 'Accruals',
			icon : 'fa fa-cubes fa-lg',
			items : [ {
				id : 'Input Accruals',
				title : 'Input Accruals',
				icon : 'fa fa-linode fa-lg',
				link : 'Accrual'
			}, {
				id : 'Review/Approve Accruals',
				title : 'Review/Approve Accruals',
				icon : 'fa fa-cube fa-lg',
				link : 'reviewAccrual'
			} ]
		}, {
			id : 'Actuals',
			title : 'Actuals',
			icon : 'fa fa-file-excel-o fa-lg',
			items : [ {
				id : 'Input Actuals', /*
										 * Here all data from Input Accruals
										 * shud come directly and then edit
										 */
				title : 'Input Actuals',
				link : 'Actual'
			}, {
				id : 'Review/Approve Actuals',
				title : 'Review/Approve Actuals',
				icon : 'fa fa-file-excel-o fa-lg',
				link : 'reviewActual'
			}, {
				id : 'Download Invoice Inputs',
				title : 'Download Invoice Inputs',
				icon : 'fa fa-file-excel-o fa-lg',
				link : 'bfmActivity'
			} ]
		}, {
			id : 'Report',
			title : 'Report',
			icon : 'fa fa-pie-chart fa-lg',
			items : [ {
				id : 'Any report',
				title : 'Any report',
				icon : 'fa fa-bar-chart fa-lg',
				link : 'report'
			}, {
				id : ' BHC_Report',
				title : 'BHC Report',
				icon : 'fa fa-bar-chart fa-lg',
				link : 'BHC_Report'
			}

			]
		}

		];

	}

	if (role == "BFM") {

		categories = [

		{
			id : 'FO',
			title : 'Finance Operations',
			icon : 'fa fa-money fa-lg',

			items : [ {
				id : 'Rate Card',
				title : 'Rate Card',
				icon : 'fa fa-usd fa-lg',
				link : 'rate'
			}, {
				id : 'Working days Setup',
				title : 'Working days Setup',
				icon : 'fa fa-cogs fa-lg',
				link : 'Workingdays'
			},

			]
		},

		{
			id : 'BFM',
			title : 'BFM Activity',
			icon : 'fa fa-inr fa-lg',
			items : [ {
				id : 'Daily ZCop Upload',
				title : 'Daily ZCop Upload',
				icon : 'fa fa-file-excel-o fa-lg',
				link : 'ZcopUpload'
			}, {
				id : 'Monthly Other Cost Upload',
				title : 'Monthly Other Cost Upload',
				icon : 'fa fa-file fa-lg',
				link : 'costUpload'
			}, {
				id : 'Monthly Revenue file Upload',
				title : 'Monthly Revenue file Upload',
				icon : 'fa fa-file-text-o fa-lg',
				link : 'revenueUpload'
			}, {
				id : 'Generate Margin Report',
				title : 'Generate Margin Report',
				icon : 'fa fa-file-text fa-lg',
				link : 'bfmActivity'
			}, ]
		}, {
			id : 'Assignment',
			title : 'Assignment',
			icon : 'fa fa-calendar fa-lg',
			items : [ {
				id : 'No Assignment Planned',
				title : 'Assignment Report',
				icon : 'fa fa-calendar-o fa-lg',
				link : 'NoAssignment'
			} ]
		}, {
			id : 'Accruals',
			title : 'Accruals',
			icon : 'fa fa-cubes fa-lg',
			items : [ {
				id : 'Download Accruals',
				title : 'Download Accruals',
				icon : 'fa fa-download fa-lg',
				link : 'downloadAccrual'
			} ]
		}, {
			id : 'Actuals',
			title : 'Actuals',
			icon : 'fa fa-file-excel-o fa-lg',
			items : [ {
				id : 'Download Actuals',
				title : 'Download Actuals',
				icon : 'fa fa-download fa-lg',
				link : 'bfmActivity'
			} ]
		}, {
			id : 'Report',
			title : 'Report',
			icon : 'fa fa-pie-chart fa-lg',
			icon : 'fa fa-file-excel-o fa-lg',
			items : [ {
				id : 'Any report', /*
									 * Here all data from Input Accruals shud
									 * come directly and then edit
									 */
				title : 'Any report',
				icon : 'fa fa-bar-chart fa-lg',
				link : 'report'
			} ]
		}

		];

	}

	if (role == "ADMIN") {
		categories = [

		{
			id : 'GO',
			title : 'General Operations',
			icon : 'fa fa-gg fa-lg',
			items : [ {
				id : 'User Setup',
				title : 'User Setup',
				icon : 'fa fa-sitemap fa-lg',
				link : 'bfmActivity'
			} ]
		} ]

	}

	if (role == "General Operations") {

		categories = [

		{
			id : 'GO',
			title : 'General Operations',
			icon : 'fa fa-gg fa-lg',
			items : [ {
				id : 'Daily ZCop Upload',
				title : 'Daily ZCop Upload',
				icon : 'fa fa-upload fa-lg',
				link : 'bfmActivity'
			}, {
				id : 'Location Of Operation',
				title : 'Location Of Operation',
				icon : 'fa fa-map-marker fa-lg',
				link : 'locationOfoperation'
			}, {
				id : 'View Location Of Operation',
				title : 'View Location Of Operation',
				icon : 'fa fa-street-view fa-lg',
				link : 'viewlocationOfoperation'
			} ]
		}, {
			id : 'BFM',
			title : 'BFM Activity',
			icon : 'fa fa-inr fa-lg',
			items : [ {
				id : 'Monthly ZCop Upload',
				title : 'Monthly ZCop Upload',
				icon : 'fa fa-upload fa-lg',
				link : 'bfmActivity'
			} ]
		}, {
			id : 'Assignment',
			title : 'Assignment',
			icon : 'fa fa-calendar fa-lg',
			items : [ {
				id : 'No Assignment Planned',
				title : 'No Assignment Planned Report',
				icon : 'fa fa-calendar-check-o fa-lg',
				link : 'NoAssignment'
			} ]
		}, {
			id : 'Accruals',
			title : 'Accruals',
			icon : 'fa fa-cubes fa-lg',
			items : [ {
				id : 'Download Accruals',
				title : 'Download Accruals',
				icon : 'fa fa-download fa-lg',
				link : 'downloadAccrual'
			} ]
		}, {
			id : 'Actuals',
			title : 'Actuals',
			icon : 'fa fa-file-excel-o fa-lg',
			items : [ {
				id : 'Download Actuals',
				title : 'Download Actuals',
				icon : 'fa fa-download fa-lg',
				link : 'bfmActivity'
			} ]
		}, {
			id : 'Report',
			title : 'Report',
			icon : 'fa fa-pie-chart fa-lg',
			items : [ {
				id : 'Any report', /*
									 * Here all data from Input Accruals shud
									 * come directly and then edit
									 */
				title : 'Any report',
				icon : 'fa fa-bar-chart fa-lg',
				link : 'bfmActivity'
			} ]
		}

		];

	}
	if (role == "Finance Operations") {

		categories = [

		{
			id : 'FO',
			title : 'Finance Operations',
			items : [ {
				id : 'Rate Card',
				title : 'Rate Card',
				icon : 'fa fa-trello fa-lg',
				link : 'rate'
			}, {
				id : 'Working days Setup',
				title : 'Working days Setup',
				icon : 'fa fa-calendar-o fa-lg',
				link : 'Workingdays'
			},

			]
		}, {
			id : 'Report',
			title : 'Report',
			icon : 'fa fa-pie-chart fa-lg',
			items : [ {
				id : 'Any report', /*
									 * Here all data from Input Accruals shud
									 * come directly and then edit
									 */
				title : 'Any report',
				icon : 'fa fa-bar-chart fa-lg',
				link : 'bfmActivity'
			} ]
		}

		];

	}

	return categories;

}

/*
 * , { id : 'Download Accruals', title : 'Download Accruals', link :
 * 'downloadAccrual' } , { id : 'Download Actuals', title : 'Download Actuals',
 * link : 'bfmActivity' }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */