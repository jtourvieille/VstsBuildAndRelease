var getReleaseDefinitions = function(releaseResponse){
	
	var parsedReleaseResponse = JSON.parse(releaseResponse);
	
	parsedReleaseResponse.value.sort(function(a, b){
		return a.name > b.name;
	}).forEach(function(oneReleaseDefinition){
		
		var projectId = oneReleaseDefinition.url.split('/')[3];
		
		var releaseDiv = document.createElement("div");
		  var queueRelease = document.createElement("button");
		  var releaseLabel = document.createElement("label");
		  //var releaseEnvDropDown = document.createElement("select");
		  
		  queueRelease.id = projectId + '_' + oneReleaseDefinition.id;
		  releaseLabel.innerHTML = '  ' + oneReleaseDefinition.name + ' ';
		  //releaseEnvDropDown.id = projectId + '_' + oneReleaseDefinition.id + '_select';
		  
		  // var optAll = document.createElement("option");
			  
		  // optAll.value = projectId + '_' + oneReleaseDefinition.id;
		  // optAll.innerHTML = 'All';
		  
		  //releaseEnvDropDown.appendChild(optAll);
		  
		  // oneReleaseDefinition.environments.sort(function(a, b){
			  // return a.rank > b.rank;
		  // }).forEach(function(oneReleaseEnvironment){
			  // var opt = document.createElement("option");
			  
			  // opt.value = projectId + '_' + oneReleaseDefinition.id + '_' + oneReleaseEnvironment.id;
			  // opt.innerHTML = oneReleaseEnvironment.name;
			  
			  // optAll.value = optAll.value + '_' + oneReleaseEnvironment.id;
			  
			  // //releaseEnvDropDown.appendChild(opt);
		  // });
		  
		  releaseDiv.id = projectId + '_' + oneReleaseDefinition.id;
		  releaseDiv.style = 'margin:2px';
		  releaseDiv.appendChild(queueRelease);
		  releaseDiv.appendChild(releaseLabel);
		  //releaseDiv.appendChild(releaseEnvDropDown);
		  
		  queueRelease.type = "button";
		  queueRelease.innerHTML = 'queue';
		  
			queueRelease.addEventListener('click', function(e) {
			  
			  var buttonId = e.currentTarget.id;
			  var buttonIdSplitted = buttonId.split('_');
			  var projectId = buttonIdSplitted[0];
			  var releaseId = buttonIdSplitted[1];
			  
			  //var dropDown = document.getElementById(projectId + '_' + releaseId + '_select');
			  
			  
			  // var selectedValue = dropDown.options[dropDown.selectedIndex].value;
			  
			  // var environmentIds = [];
			  // var cpt = 0;
			  // selectedValue.split('_').forEach(function(oneEnvId) {
				  // cpt = cpt + 1;
				  // if (cpt > 2) {
					// environmentIds.push(oneEnvId);
				  // }
			  // });
			  
			  var vstsName = document.getElementById('vstsName');
			  
			  var url = 'https://' + vstsName.value + '.vsrm.visualstudio.com/DefaultCollection/' + projectId + '/_apis/release/releases?api-version=3.0-preview.1';
			  
			  // var environmentStr = '[';
			  
			  // environmentIds.forEach(function(oneEnv){
				  // environmentStr = environmentStr + '"' + oneEnv + '",';
			  // });
			  
			  // if (environmentStr.length > 0)
			  // {
				  // environmentStr  = environmentStr.slice(0, environmentStr.length - 1);
			  // }
			  
			  // environmentStr  = environmentStr + ']';
			  
			  var body = 
			  {
				  "definitionId": releaseId
		      };
			  
			  var client = new HttpClient();
			  client.post(url, getBasicAuthHeader(), JSON.stringify(body), function(result) {}, function(status, statusText) {});
			  
			  // TODO
			  // setTimeout(function () {
					// getReleaseStatus(oneBuildDefinition);
				// }, 1000);
			  
		  }, false);
		  
		  var projectLi = document.getElementById(projectId + '_release');
		  
		  projectLi.appendChild(releaseDiv);
	});
	// TODO JT
};

