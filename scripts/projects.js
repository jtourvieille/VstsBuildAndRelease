var getProjects = function(response) {
	  

		var parsedResponse = JSON.parse(response);
		
		var projectList = document.getElementById('Projects');
		
		// Clear previous children
		while (projectList.firstChild) {
			projectList.removeChild(projectList.firstChild);
		}
		
		var projectReleaseList = document.getElementById('ProjectsRelease');
		
		// Clear previous children
		while (projectReleaseList.firstChild) {
			projectReleaseList.removeChild(projectReleaseList.firstChild);
		}
		
		parsedResponse.value.sort(
		function(a,b){
			return a.name > b.name;
			}).forEach(function(project) {
			
			var projectError = document.getElementById('ProjectError');
			projectError.style = 'display: none;';
			
			var projectTitle = document.getElementById('ProjectTitle');
			projectTitle.style = '';
			
			var projectReleaseTitle = document.getElementById('ProjectReleaseTitle');
			projectReleaseTitle.style = '';
			
			var projects = document.getElementById('Projects');
			projects.style = '';
			
			var projectsRelease = document.getElementById('ProjectsRelease');
			projectsRelease.style = '';
			
			var projectLi = document.createElement("li");
			projectLi.id = project.id;
			
			var projectReleaseLi = document.createElement("li");
			projectReleaseLi.id = project.id + '_release';
			
			var projectLiItem = document.createTextNode(project.name);
			var projectReleaseLiItem = document.createTextNode(project.name);
			
			  projectLi.appendChild(projectLiItem);
			  projectReleaseLi.appendChild(projectReleaseLiItem);
			  
			  var buildClient = new HttpClient();
			  var buildsUrl = 'https://' + vstsName.value + '.visualstudio.com/DefaultCollection/' + project.id + '/_apis/build/definitions?api-version=2.0';
			  buildClient.get(buildsUrl, getBasicAuthHeader(), getBuildDefinitions, function(status, statusText) {
				  // getting build definitions failed
			  });
			  projectList.appendChild(projectLi);
			  
			  var releaseClient = new HttpClient();
			  var releasesUrl = 'https://' + vstsName.value + '.vsrm.visualstudio.com/DefaultCollection/' + project.id + '/_apis/release/definitions?%24expand=Environments&api-version=4.0-preview.3';
			  releaseClient.get(releasesUrl, getBasicAuthHeader(), getReleaseDefinitions, function(status, statusText) {
				  // getting release definitions failed
			  });
			  
			  projectReleaseList.appendChild(projectReleaseLi);
		});
		

		
  };
  
var getProjectsError = function(status, statusText){
	  // getting projects failed
	  var projectError = document.getElementById('ProjectError');
	  projectError.style = 'color: red;';
	  projectError.innerHTML = status + ' - ' + statusText;
	
	  var projectTitle = document.getElementById('ProjectTitle');
	  projectTitle.style = 'display: none;';
	  
	  var projectReleaseTitle = document.getElementById('ProjectReleaseTitle');
	  projectReleaseTitle.style = 'display: none;';
	  
	  var projects = document.getElementById('Projects');
	  projects.style = 'display: none;';
	  
	  var projectsRelease = document.getElementById('ProjectsRelease');
	  projectsRelease.style = 'display: none;';
  }; 