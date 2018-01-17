document.addEventListener('DOMContentLoaded', function() {
	
  var loginButton = document.getElementById('login');
	loginButton.addEventListener('click', loadProjects, false);
	var refresh = document.getElementById('refresh');
	refresh.addEventListener('click', loadProjects, false);

  var buildTab = document.getElementById('buildTab');
  var releaseTab = document.getElementById('releaseTab');
  
  buildTab.addEventListener('click', function(evt) { openTab(evt, 'Build'); });
  releaseTab.addEventListener('click', function(evt) { openTab(evt, 'Release'); });
  
  if (localStorage !== null && localStorage['mail'] !== undefined && localStorage['accessKey'] !== undefined && localStorage['vstsName'] !== undefined)
  {
	  document.getElementById('vstsName').value = localStorage['vstsName'];
	  document.getElementById('mail').value = localStorage['mail'];
	  document.getElementById('accessKey').value = localStorage['accessKey'];
  }
  else
  {
	  document.getElementById('vstsName').value = '';
	  document.getElementById('mail').value = '';
	  document.getElementById('accessKey').value = '';
  }

}, false);

