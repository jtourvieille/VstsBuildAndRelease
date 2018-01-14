var getProjects = function(response) {
	  

		var parsedResponse = JSON.parse(response);
		
		var projectList = document.getElementById('Projects');
		
		// Clear previous children
		while (projectList.firstChild) {
			projectList.removeChild(projectList.firstChild);
		}
		
		parsedResponse.value.forEach(function(project) {
			
			var projectError = document.getElementById('ProjectError');
			projectError.style = 'display: none;';
			
			var projectTitle = document.getElementById('ProjectTitle');
			projectTitle.style = '';
			
			var projects = document.getElementById('Projects');
			projects.style = '';
			
			var projectLi = document.createElement("li");
			projectLi.id = project.id;
			
			var projectLiItem = document.createTextNode(project.name);
			
			  projectLi.appendChild(projectLiItem);
			  
			  var buildClient = new HttpClient();
			  var buildsUrl = 'https://' + vstsName.value + '.visualstudio.com/DefaultCollection/' + project.id + '/_apis/build/definitions?api-version=2.0';
			  buildClient.get(buildsUrl, getBasicAuthHeader(), getBuildDefinitions, function(status, statusText) {
				  // getting build definitions failed
			  });
			  projectList.appendChild(projectLi);
		});
		

		
  };
  
var getProjectsError = function(status, statusText){
	  // getting projects failed
	  var projectError = document.getElementById('ProjectError');
	  projectError.style = 'color: red;';
	  projectError.innerHTML = status + ' - ' + statusText;
	
	  var projectTitle = document.getElementById('ProjectTitle');
	  projectTitle.style = 'display: none;';
	  
	  var projects = document.getElementById('Projects');
	  projects.style = 'display: none;';
  }; 