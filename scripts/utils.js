var HttpClient = function() {
		this.get = function(aUrl, basicAuthHeader, aCallback, anErrorCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
			{
					aCallback(anHttpRequest.responseText);
			}
			else
			{
				if (anHttpRequest.readyState == 4 && anHttpRequest.status != 200)
				{
					anErrorCallback(anHttpRequest.status, anHttpRequest.statusText);
				}
			}
		}

			anHttpRequest.open( "GET", aUrl, true );
			anHttpRequest.setRequestHeader("Authorization", basicAuthHeader);
			anHttpRequest.send( null );
		};
		
		this.post = function(aUrl, basicAuthHeader, body, aCallback, anErrorCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
			{
					aCallback(anHttpRequest.responseText);
			}
			else
			{
				if (anHttpRequest.readyState == 4 && anHttpRequest.status != 200)
				{
					anErrorCallback(anHttpRequest.status, anHttpRequest.statusText);
				}
			}
		}

			anHttpRequest.open( "POST", aUrl, true );
			anHttpRequest.setRequestHeader("Authorization", basicAuthHeader);
			anHttpRequest.setRequestHeader("Content-Type", "application/json");
			anHttpRequest.send( body );
		};
	};
	
var getBasicAuthHeader = function(){

  var mail = document.getElementById('mail');
  localStorage['mail'] = mail.value;
  
  var accessKey = document.getElementById('accessKey');
  localStorage['accessKey'] = accessKey.value;

  
  var secret = btoa(mail.value.toLowerCase() + ':' + accessKey.value);

  var basicAuthorizationHeader = 'Basic ' + secret;
  return basicAuthorizationHeader;
};

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
};

var loadProjects = function() {
		  
	var vstsName = document.getElementById('vstsName');
	localStorage['vstsName'] = vstsName.value;
	  
	var url = 'https://' + vstsName.value + '.visualstudio.com/defaultCollection/_apis/projects';
	  
	var client = new HttpClient();
	client.get(url, getBasicAuthHeader(), getProjects, getProjectsError);
	
	var evObj = document.createEvent('Events');
    evObj.initEvent('click', true, false);
    document.getElementById('buildTab').dispatchEvent(evObj);
  };