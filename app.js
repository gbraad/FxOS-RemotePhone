sensible.fxos.Application.prototype.dial_number = function (request, callback) {
	var	response = new Object();

	var telephony = navigator.mozTelephony;
	if (telephony) {
		telephony.dial(request.parameters.number);
	}
	response.type = "json";
	response.object = { status: 'ok' };
	
	callback(response);
};

document.addEventListener ('DOMContentLoaded', function() {
	sensibleStartup();
}, false);

function sensibleStartup () {
	if(typeof sensible == "object") {
		sensible.ApplicationFactory.createApplication(function (error) {
			if(inError) {
				console.error("error during sensible application startup");
				console.error(error);
			} else {
				console.log("sensible application startup");
			}
		});
	}

}