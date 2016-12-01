function isValidSpl(str) {
				var iChars = "~`!#$%^&*+=-[]\\\';/{}|\":<>?@";

				for (var i = 0; i < str.length; i++) {
					if (iChars.indexOf(str.charAt(i)) != -1) {
						//alert("Special Characters and Numbers are not allowed \n");
						return false;
					}
				}
				return true;
			}

			function isNotEmpty(str) {
				for (var i = 0; i < str.length; i++) {
				var substring = "undefined,";
				if (substring.indexOf(str)> -1)
					//alert("Please insert data");
					return false;
				}
				return true;
			}	
			
			function isValidNumComma(str) {
			    var iChars = "[0-9],.";

			    for (var i = 0; i < str.length; i++) {
			       if (iChars.indexOf(str.charAt(i)) != -1) {
			           
			           return false;
			       }
			       
			    }
			
			    return true;
			}
			
		
