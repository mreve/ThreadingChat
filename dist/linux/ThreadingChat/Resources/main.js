var username;
var rightTabsOpened = 2;

function disable_tabs() {
	$("#tab-home").toggleClass("tab-upper-active", false);
	$("#tab-contacts").toggleClass("tab-upper-active", false);
	for (var i = 0; i < rightTabsOpened; i++)
		$("#tab-conv-" + i).toggleClass("tab-right-active", false);
}

function able_tab(id) {
	
	if (id.indexOf("home") != -1) {
		$("#tab-home").toggleClass("tab-upper-active", true);
		
		$("#partial").load("partials/home.html", function() {
			
			/*	Here there would come all the jQuery selectors for tab HOME	*/
			$("#home-hello").html("<h3>Hello " + username + "!</h3>")
		});
	} else if (id.indexOf("contacts") != -1) {
		$("#tab-contacts").toggleClass("tab-upper-active", true);

		$("#partial").load("partials/contacts.html", function() {

			/*	Here there would come all the jQuery selectors for tab CONTACTS	*/
			$("#add-accounts").click(function() {
				disable_tabs();
				able_tab("tab-home");
				return false;
			});
		});
	} else {
		$("#" + id).toggleClass("tab-right-active", true);
		$("#partial").load("partials/conv.html", function() {
			/*	And here there would come all the jQuery selectors for tab CONVERSATION	*/
		});
	}

	if (id.indexOf("home") != -1 || id.indexOf("contacts") != -1)
		$("#" + id).toggleClass("tab-upper-active", true);
	else
		$("#" + id).toggleClass("tab-right-active", true);
}

$(document).ready(function() {
	username = Ti.API.get("logged_user").username;

	able_tab("tab-contacts");

	$("#main-space").css("min-height", (rightTabsOpened+1) * 55);

	$(".tab-description").click(function() {
		disable_tabs();
		able_tab($(this).attr("id"));
	});
});