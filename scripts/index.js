document.addEventListener('DOMContentLoaded', function() {
	
  var loginButton = document.getElementById('login');
	loginButton.addEventListener('click', loadProjects, false);
	var refresh = document.getElementById('refresh');
	refresh.addEventListener('click', loadProjects, false);

  var buildTab = document.getElementById('buildTab');
  var releaseTab = document.getElementById('releaseTab');
  
  buildTab.addEventListener('click', function(evt) { openTab(evt, 'Build'); });
  releaseTab.addEventListener('click', function(evt) { openTab(evt, 'Release'); });
  
  if (localStorage !== null && localStorage['mail'] !== null && localStorage['accessKey'] !== null && localStorage['vstsName'] !== null)
  {
	  document.getElementById('vstsName').value = localStorage['vstsName'];
	  document.getElementById('mail').value = localStorage['mail'];
	  document.getElementById('accessKey').value = localStorage['accessKey'];
  }

}, false);

