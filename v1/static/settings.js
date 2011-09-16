// ScreenTxt admin.js

function init() {
	if (!window.XMLHttpRequest) {
 		document.getElementsByTagName("body")[0].innerHTML = "This browser does not support features needed to use ScreenTxt_Z.  Please switch to a better browser such as <a href='http://google.com/chrome' target='_blank'>Google Chrome</a>."
	}
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/get/msg", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) { // the XHR is done
			if (xhr.status == 200) { // no problems
				document.getElementById("msg").value = xhr.responseText;
				document.getElementById("msgLoadingIcon").src = "/static/check.gif";
			} else if (xhr.status == 403) { // forbidden
				document.getElementsByTagName("body")[0].innerHTML = "You have been signed out.  Please refresh to sign in again.";
			}
		}
	}
	xhr.send();
}

function set(setting, newVal) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/set/" + setting + "/" + newVal, true);
	xhr.onreadystatechange = function() {
 		if (xhr.readyState == 4) { // the XHR is done
			if (xhr.status == 200) { // success!
				document.getElementById(setting + "LoadingIcon").src = "/static/check.gif";
			} else if (xhr.status == 403) { // forbidden - user has probably signed out
				document.getElementsByTagName("body")[0].innerHTML = "You have been signed out.  Please refresh to sign in again.";
			} // if a different status, ignore it and hope the problem goes away :P
		}
	}
	document.getElementById(setting + "LoadingIcon").src = "/static/loading.gif";
	xhr.send();
}
