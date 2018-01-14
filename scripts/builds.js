var getBuildDefinitions = function(buildResponse){
	
	var parsedBuildResponse = JSON.parse(buildResponse);

	parsedBuildResponse.value.forEach(function(oneBuild){
		
	  if (oneBuild.type === 'build')
	  {
	   	  var buildDiv = document.createElement("div");
		  var queueBuild = document.createElement("button");
		  var buildLabel = document.createElement("label");
		  
		  
		  
		  queueBuild.id = oneBuild.id;
		  buildLabel.for = oneBuild.id;
		  buildLabel.innerHTML = '  ' + oneBuild.name + ' ';
		  
		  buildDiv.id = oneBuild.id;
		  buildDiv.style = 'margin:2px';
		  buildDiv.appendChild(queueBuild);
		  buildDiv.appendChild(buildLabel);
		  
		  queueBuild.type = "button";
		  
		  queueBuild.innerHTML = 'launch';
		  
		  getBuildStatus(oneBuild);
		  
		  queueBuild.addEventListener('click', function() {
	  
			  var vstsName = document.getElementById('vstsName');
			  
			  var url = 'https://' + vstsName.value + '.visualstudio.com/defaultCollection/' + oneBuild.project.id + '/_apis/build/builds?api-version=2.0';
			  var body = {"definition": { "id": oneBuild.id }};
			  
			  var client = new HttpClient();
			  client.post(url, getBasicAuthHeader(), JSON.stringify(body), function(result) {}, function(status, statusText) {});
			  
			  setTimeout(function () {
					getBuildStatus(oneBuild);
				}, 1000);
			  
		  }, false);
		  
		  var projectLi = document.getElementById(oneBuild.project.id);
		  
		  projectLi.appendChild(buildDiv);
	  }
	  
	});
};

var getBuildInstances = function(oneBuildInstance){
				  
				  var buildInstanceDiv = document.createElement("div");
				  buildInstanceDiv.title = oneBuildInstance.buildNumber;
				  buildInstanceDiv.style = 'display: inline-block';
				  
				  var img = document.createElement("img");
				  var a = document.createElement('a');
				  
				  var href = oneBuildInstance._links.web.href;
				  a.href = href;
				  a.addEventListener('click', function() {
					  chrome.tabs.create({url: href, active: false});
				  });
				  
				  
				  if (oneBuildInstance.status === 'completed')
				  {
					  if (oneBuildInstance.result === 'succeeded')
					  {
						  img.src = 'img/icon/succeeded.png';
					  }
					  else if (oneBuildInstance.result === 'partiallySucceeded')
					  {
						  img.src = 'img/icon/partiallysucceeded.png';
					  }
					  else if (oneBuildInstance.result === 'failed')
					  {
						  img.src = 'img/icon/failed.png';
					  }
					  else if (oneBuildInstance.result === 'canceled')
					  {
						  img.src = 'img/icon/cancelled.png';
					  }
				  }
				  else if (oneBuildInstance.status === 'inProgress')
				  {
					  img.src = 'img/icon/inprogress.png';
				  }
				  else if (oneBuildInstance.status === 'notStarted')
				  {
					  img.src = 'img/icon/notstarted.png';
				  }
				  else
				  {
					  img.src = 'img/icon/unknown.png';
				  }
				  
				  a.appendChild(img);
				  buildInstanceDiv.appendChild(a);
				  
				  
				  var buildDiv = document.getElementById(oneBuildInstance.definition.id);
				  buildDiv.appendChild(buildInstanceDiv);
			  };
			  
  var getBuildStatus = function(oneBuild)
  {
	  var client = new HttpClient();
	  var url = 'https://' + vstsName.value + '.visualstudio.com/defaultCollection/' + oneBuild.project.id + '/_apis/build/builds?api-version=2.0';
	  client.get(url, getBasicAuthHeader(), function(result) {
		  var parsedBuildResponse = JSON.parse(result);
		  var buildDiv = document.getElementById(parsedBuildResponse.value[0].definition.id);
		  // Clear previous children
			while (buildDiv.lastChild.tagName !== 'LABEL') {
				buildDiv.removeChild(buildDiv.lastChild);
			}
		  parsedBuildResponse.value.slice(0,5).forEach(getBuildInstances);
	  }, function(status, statusText) {});
  };