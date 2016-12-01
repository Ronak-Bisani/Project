// Easy way to wait for all videos to load before start playing

var promises = [];
function makePromise(i, video) {
  promises[i] = new $.Deferred();
  // This event tells us video can be played all the way through, without stopping or buffering
  video.oncanplaythrough = function() {
    // Resolve the promise
    promises[i].resolve();
  }
}
// Pause all videos and create the promise array
$('video').each(function(index){
  this.pause();
  makePromise(index, this);
})

// Wait for all promises to resolve then start playing
$.when.apply(null, promises).done(function () {
  $('video').each(function(){
    this.play();
  });
});

function loginFunction() {
    var UserId = document.getElementById("userkey").value;
    var password = btoa(document.getElementById("pswd").value);
    var flag = 0;
        $.ajax(
        {
            dataType: 'json',
            headers: {
                Accept:"application/json",
                "Access-Control-Allow-Origin": "*"
            },
            type:'GET',
            url:"http://localhost:8086/com.wipro.capitalone.services/rest/authenticationservice/authenticateuser?User_Id=" + UserId + "&pswd=" + password,
            		success: function(data)
            {
            		if(data.records[0] == undefined)
            		{
            			alert("UserID or Password is incorrect");
            			return;
            		}else{

            		if(data.records[0].UserRole == "DM")
            		{
            			location.href = "/OperationSystems_UI/Index.html#/createSow?login="+UserId;
            		}
            		else if(data.records[0].UserRole == "PM")
            		{
            			location.href = "/OperationSystems_UI/Index.html#/createSow?login="+UserId;
            		}
            		else if(data.records[0].UserRole == "LOB PMO")
            		{
            			location.href = "/OperationSystems_UI/Index.html#/lobSetup?login="+UserId;
            		}
            		else if(data.records[0].UserRole == "BFM")
            		{
            			location.href = "/OperationSystems_UI/Index.html#/rate?login="+UserId;
            		}
            		else if(data.records[0].UserRole == "ADMIN")
            		{
            			location.href = "/OperationSystems_UI/Index.html#/bfmActivity?login="+UserId;
            		}
            		else if(data.records[0].UserRole == "General Operations")
            		{
            			location.href = "/OperationSystems_UI/Index.html#/locationOfoperation?login="+UserId;
            		}
            		else if(data.records[0].UserRole == "Finance Operations")
            		{
            			location.href = "/OperationSystems_UI/Index.html#/Workingdays?login="+UserId;
            		}
            		else{
            			alert("Invalid User Role");
            			}
            		}
            		
            },
            error: function(data)
            {
                alert("UserID or Password is incorrect");
            }
        });
   
}