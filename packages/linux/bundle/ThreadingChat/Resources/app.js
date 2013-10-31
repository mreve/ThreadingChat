/*
* Copyright (c) 2012 Software in the Public Interest (SPI) Inc.
* Copyright (c) 2012 David Pratt
* 
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*	http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

var logged_in_as = '';


function toggle_visibility(id) {
	var e = document.getElementById(id);
	if(e.style.display == 'block')
		e.style.display = 'none';
	else
		e.style.display = 'block';
}

var users = [{ un:'mreve', pwd:''}, { un:'kotek', pwd:'kotek'}, { un:'dawid', pwd:'kochany'}];
var amount_of_opened_conversations = 2;

function user_in_base(usrn, pswd) {
	for (var i = 0; i<users.length; i++)
		if (users[i].un == usrn && users[i].pwd == pswd)
			return true;
	return false;
}

function username_taken(usrn) {
	for (var i = 0; i<users.length; i++)
		if (users[i].un == usrn)
			return true;
	return false;
}

function fill_alert(msg, fieldGroupName, omitUn) {
	$("#form-alert").html(msg);
	if (!omitUn)
		$("#" + fieldGroupName + "-username").val("");
	$("#" + fieldGroupName + "-password").val("");
	if (fieldGroupName == "register")
		$("#" + fieldGroupName + "-repeat").val("");
}

$(document).ready(function() {
		$("#sign-in-submit").click(function() {
			if (!user_in_base($("#sign-in-username").val(), $("#sign-in-password").val())) {
				fill_alert("Wrong username or password", "sign-in", false);
			} else {
				var welcomeWindow = Ti.UI.currentWindow;
				var newWindow = welcomeWindow.createWindow({
					id: "main",
					title: "ThreadingChat",
					url: "app://main.html",
					width: 500,
					maxWidth: 3000,
					minWidth: 0,
					height: 700,
					maxHeight: 3000,
					minHeight: 0,
					fullscreen: false,
					x: window.screen.width-500,
					y: 20,
					resizable: true,
					maximizable: true,
					minimizable: true,
					closeable: true
				});
				welcomeWindow.hide();
				newWindow.open();
			}
			return false;
		});

		$("#register-submit").click(function() {
			if (username_taken($("#register-username").val())) {
				fill_alert("Username already taken", "register", false);
			} else if ($("#register-password").val() != $("#register-repeat").val()) {
				fill_alert("Incorrect password", "register", true);
			} else {
				users.push({
					un: $("#register-username").val(),
					pwd: $("#register-password").val()
				});
				fill_alert("Registration completed", "register", false);
				toggle_visibility("register-form");
			}
			return false;
		});

		$("#toggler-header").click(function() {
			toggle_visibility("register-form");
		});
	});
//});
