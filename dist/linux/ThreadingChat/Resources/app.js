/**
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
	$("#included-view").load("welcome-view.html", function() {
		$("#sign-in-submit").click(function() {
			if (!user_in_base($("#sign-in-username").val(), $("#sign-in-password").val())) {
				fill_alert("Wrong username or password", "sign-in", false);
			} else {
				$("#included-view").load("main-view.html", function() {
					/* all the main functions */
					Ti.UI.currentWindow.setBounds({
						x: 1000,
						y: 0,
						width: 500,
						height: 700
					});

					$(".tab-description").click(function() {
						var tabClass = $(this).attr("class");
						if (tabClass.indexOf("active") == -1) {
							/* ogarnij przelaczanie tabow */
						}
					});
				});
			}
			return false;
		});

		$("#register-submit").click(function() {
			if (username_taken($("#register-username").val())) {
				fill_alert("Username already taken", "register", false);
			} else if ($("#register-password").val() != $("#register-repeat").val()) {
				fill_alert("Incorrect password", "register", true);
			} else {
				// dziwna rzecz - jesli dwa nastepne polecenia zamieni sie miejscami, to to przestaje dzialac.
				users.push({
					un: $("#register-username").val(),
					pwd: $("#register-password").val()
				});
				fill_alert("Registration completed", "register", false);
			}
			return false;
		});

		$("#toggler-header").click(function() {
			toggle_visibility("register-form");
		});
	});
});




// create and set menu
/*var menu = Ti.UI.createMenu(),
fileItem = Ti.UI.createMenuItem('File'),
exitItem = fileItem.addItem('Exit', function() {
  if (confirm('Are you sure you want to quit?')) {
    Ti.App.exit();
  }
});

menu.appendItem(fileItem);
Ti.UI.setMenu(menu);
*/