var getBuildDefinitions = function(buildResponse){
	
	var parsedBuildResponse = JSON.parse(buildResponse);

	parsedBuildResponse.value.sort(function(a, b){
		return a.name > b.name;
	}).forEach(function(oneBuildDefinition){
		
	  if (oneBuildDefinition.type === 'build')
	  {
	   	  var buildDiv = document.createElement("div");
		  var queueBuild = document.createElement("button");
		  var buildLabel = document.createElement("label");
		  var loadingImg = document.createElement("img");
		  
		  queueBuild.id = oneBuildDefinition.project.id + '_' + oneBuildDefinition.id;
		  
		  buildLabel.innerHTML = '  ' + oneBuildDefinition.name + ' ';
		  
		  loadingImg.src = 'img/ajax-loader.gif';
		  
		  buildDiv.id = oneBuildDefinition.project.id + '_' + oneBuildDefinition.id;
		  buildDiv.style = 'margin:2px';
		  buildDiv.appendChild(queueBuild);
		  buildDiv.appendChild(buildLabel);
		  buildDiv.appendChild(loadingImg);
		  
		  queueBuild.type = "button";
		  
		  queueBuild.innerHTML = 'launch';
		  
		  getBuildStatus(oneBuildDefinition);
		  
		  queueBuild.addEventListener('click', function(e) {
			  
			  var buttonId = e.currentTarget.id;
			  var buttonIdSplitted = buttonId.split('_');
			  var projectId = buttonIdSplitted[0];
			  var buildId = buttonIdSplitted[1];
			  
			  var vstsName = document.getElementById('vstsName');
			  
			  var url = 'https://' + vstsName.value + '.visualstudio.com/defaultCollection/' + projectId + '/_apis/build/builds?api-version=2.0';
			  var body = {"definition": { "id": buildId }};
			  
			  var client = new HttpClient();
			  client.post(url, getBasicAuthHeader(), JSON.stringify(body), function(result) {}, function(status, statusText) {});
			  
			  setTimeout(function () {
					getBuildStatus(oneBuildDefinition);
				}, 1000);
			  
		  }, false);
		  
		  var projectLi = document.getElementById(oneBuildDefinition.project.id);
		  
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
				  
				  
				  var buildDiv = document.getElementById(oneBuildInstance.project.id + '_' + oneBuildInstance.definition.id);
				  buildDiv.appendChild(buildInstanceDiv);
			  };
			  
  var getBuildStatus = function(oneBuildDefinition)
  {
	  var client = new HttpClient();
	  var url = 'https://' + vstsName.value + '.visualstudio.com/defaultCollection/' + oneBuildDefinition.project.id + '/_apis/build/builds?api-version=2.0';
	  client.get(url, getBasicAuthHeader(), function(result) {
		  var parsedBuildResponse = JSON.parse(result);
		  
		  parsedBuildResponse = parsedBuildResponse.value.filter(function(b){
			return b.definition.id === oneBuildDefinition.id;
		  });
		  
		  if (parsedBuildResponse.length > 0)
		  {
			  var buildDiv = document.getElementById(parsedBuildResponse[0].definition.project.id + '_' + parsedBuildResponse[0].definition.id);
			  // Clear previous children
			  while (buildDiv.lastChild.tagName !== 'LABEL') {
				buildDiv.removeChild(buildDiv.lastChild);
			  }
			  parsedBuildResponse.slice(0,5).forEach(getBuildInstances);
		  }
		  else
		  {
			  var buildDiv = document.getElementById(oneBuildDefinition.project.id + '_' + oneBuildDefinition.id);
			  
			  // last child should be the loading image
			  buildDiv.removeChild(buildDiv.lastChild);
		  }
	  }, function(status, statusText) {});
  };