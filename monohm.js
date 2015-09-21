/*
Copyright (c) 2015 Monohm Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

//
// generated on Wed Feb 25 13:25:47 PST 2015
//

/**
*
* @license
* Copyright 2014 Monohm Inc.  All rights reserved.
*
**/

var	monohm = monohm || new Object ();

monohm.provide = function (inProvided)
{
	// ensure that the "packages" are there
	var	packageElements = inProvided.split (".");
	
	var	pkg = null;
	
	// have to be mindful of the Node environment here
	if (typeof (window) == "undefined")
	{
		if (typeof (global) == "undefined")
		{
			console.error ("no window or global objects, can't continue");
			process.exit (1);
		}
		else
		{
			pkg = global;
		}
	}
	else
	{
		pkg = window;
	}
	
	// don't make the last element, it's the class name
	for (var i = 0; i < packageElements.length - 1; i++)
	{
		if (typeof (pkg [packageElements [i]]) == "undefined")
		{
			pkg [packageElements [i]] = new Object ();
		}
		
		pkg = pkg [packageElements [i]];
	}
};

/**
 * @param {string} inRequired
 */
monohm.require = function (inRequired)
{
	// currently monohm does not support dependency management
};

monohm.inherits = function (inSubClass, inSuperClass)
{
	function
	tempCtor()
	{
	};

	tempCtor.prototype = inSuperClass.prototype;
	inSubClass.superClass_ = inSuperClass.prototype;
	inSubClass.prototype = new tempCtor();
	inSubClass.prototype.constructor = inSubClass;
  
  // handy notation for "blind" superclass reference
  // as the superClass_ above won't work (needs to be off prototype)
  inSubClass.prototype.superClass = inSuperClass.prototype;
};


/**
*
* @license
* Copyright 2014 Monohm Inc.  All rights reserved.
*
**/

monohm.provide ("monohm.Date");

// static class
monohm.Date = new Object ();

monohm.Date.getDayOfYear = function (inDate)
{
	var start = new Date (inDate.getFullYear (), 0, 1);
	var diff = inDate - start;
	var oneDay = 1000 * 60 * 60 * 24;
	return Math.floor (diff / oneDay);
}

monohm.Date.isLeapYear = function (inYear)
{
	var result = false;
	
	if (inYear / 400)
	{
		result = true;
	}
	else
	if (years / 100)
	{
		result = false;
	}
	else
	if (years / 4)
	{
		result = true;
	}

	return result;
}
/**
*
* @license
* Copyright 2015 Monohm Inc.  All rights reserved.
*
**/

monohm.provide ("monohm.Math");

// static class
monohm.Math = new Object ();

monohm.Math.acosDegrees = function (inCosine)
{
	return Math.acos (inCosine) * (180 / Math.PI);
}

monohm.Math.asinDegrees = function (inSine)
{
	return Math.asin (inSine) * (180 / Math.PI);
}

monohm.Math.atan2Degrees = function (inOne, inTwo)
{
	return Math.atan2 (inOne, inTwo) * (180 / Math.PI);
}

monohm.Math.cosDegrees = function (inDegrees)
{
	return Math.cos (inDegrees * (Math.PI / 180));
}

monohm.Math.sinDegrees = function (inDegrees)
{
	return Math.sin (inDegrees * (Math.PI / 180));
}

monohm.Math.limitRange = function (inNumber, inMin, inMax)
{
	return Math.min (Math.max (inNumber, inMin), inMax);
}

monohm.Math.distance2d = function (inX1, inY1, inX2, inY2)
{
	return Math.sqrt (Math.pow ((inX1 - inX2), 2) + Math.pow ((inY1 - inY2), 2))
}
/**
*
* @license
* Copyright 2015 Monohm Inc.  All rights reserved.
*
**/

monohm.provide ("monohm.Location");

// static class
monohm.Location = new Object ();

monohm.Location.bearing = function (inFromLatitude, inFromLongitude, inToLatitude, inToLongitude)
{
	/*
	var	deltaY = inToLatitude - inFromLatitude;
	var	deltaX = inToLongitude - inFromLongitude;

	var	bearing = monohm.Math.atan2Degrees (deltaY, deltaX);

	console.log ("atan is " + bearing);
	*/
	
	var	fromLatitudeRadians = inFromLatitude * (Math.PI / 180);
	var	fromLongitudeRadians = inFromLongitude * (Math.PI / 180);
	var	toLatitudeRadians = inToLatitude * (Math.PI / 180);
	var	toLongitudeRadians = inToLongitude * (Math.PI / 180);
	
	var	y = Math.sin (toLongitudeRadians - fromLongitudeRadians) * Math.cos (toLatitudeRadians);
	var	x = Math.cos (fromLatitudeRadians) * Math.sin (toLatitudeRadians)
		- Math.sin (fromLatitudeRadians) * Math.cos (toLatitudeRadians) * Math.cos (toLongitudeRadians - fromLongitudeRadians);
	
	var	bearing = monohm.Math.atan2Degrees (y, x);
	
	return (bearing + 360) % 360;
}

// the radius string is 1000ft, 100m, 1mi, 300yd, etc
// see monohm.String.parseDistance()
// assumptions: 1 degree of latitude = 111km, 1 degree of longitude = 85km
// largely for use with constraining OSM searches
monohm.Location.boundingBox = function (inLatitude, inLongitude, inRadiusString)
{
	var	radiusMetres = monohm.String.parseDistance (inRadiusString);
	var	radiusDegreesLatitude = (radiusMetres / 1000) / 111;
	var	radiusDegreesLongitude = (radiusMetres / 1000) / 85;
	
	var	box =
	{
		topleft :
		{
			latitude: inLatitude + radiusDegreesLatitude,
			longitude: inLongitude - radiusDegreesLongitude
		},
		bottomright :
		{
			latitude: inLatitude - radiusDegreesLatitude,
			longitude: inLongitude + radiusDegreesLongitude
		}
	};
	
	return box;
}

monohm.Location.distanceM = function (inLatitude1, inLongitude1, inLatitude2, inLongitude2)
{
	// convert to radians
	var	lat1 = inLatitude1 * (Math.PI / 180);
	var	lat2 = inLatitude2 * (Math.PI / 180);
	var	long1 = inLongitude1 * (Math.PI / 180);
	var	long2 = inLongitude2 * (Math.PI / 180);
	
	var	sinLat1 = Math.sin (lat1);
	var	sinLat2 = Math.sin (lat2);
	var	sinLong1 = Math.sin (long1);
	var	sinLong2 = Math.sin (long2);

	var	cosA1 = Math.cos (lat1);
	var	cosA2 = Math.cos (lat2);
	var	cosB1 = Math.cos (long1);
	var	cosB2 = Math.cos (long2);
	
	var	term1 = cosA1 * cosB1 * cosA2 * cosB2;
	var	term2 = cosA1 * sinLong1 * cosA2 * sinLong2;
	var	term3 = sinLat1 * sinLat2;
	var	term4 = term1 + term2 + term3;
	
	var	acos = Math.acos (term4);
	
	return acos * 6371000;
}

monohm.Location.distanceKM = function (inLatitude1, inLongitude1, inLatitude2, inLongitude2)
{
	return monohm.Location.distanceM (inLatitude1, inLongitude1, inLatitude2, inLongitude2) / 1000;
}

monohm.Location.distanceMi = function (inLatitude1, inLongitude1, inLatitude2, inLongitude2)
{
	return monohm.Location.distanceM (inLatitude1, inLongitude1, inLatitude2, inLongitude2) * 0.000621371;
}

monohm.Location.distanceYd = function (inLatitude1, inLongitude1, inLatitude2, inLongitude2)
{
	return monohm.Location.distanceM (inLatitude1, inLongitude1, inLatitude2, inLongitude2) * 1.09361;
}

monohm.Location.distanceFt = function (inLatitude1, inLongitude1, inLatitude2, inLongitude2)
{
	return monohm.Location.distanceM (inLatitude1, inLongitude1, inLatitude2, inLongitude2) * 3.28084;
}

monohm.Location.testDistanceAndBearing = function ()
{
	var	sfLatitude = 37.78;
	var	sfLongitude = -122.41;
	var	seattleLatitude = 47.60;
	var	seattleLongitude = -122.31;
	
	var	distance = monohm.Location.distanceMi (seattleLatitude, seattleLongitude, sfLatitude, sfLongitude);
	console.log ("distance from Seattle to SF is " + distance + "mi");
	
	var	bearing = monohm.Location.bearing (seattleLatitude, seattleLongitude, sfLatitude, sfLongitude);
	console.log ("bearing from Seattle to SF " + bearing + " degrees");
}

/**
*
* @license
* Copyright 2015 Monohm Inc.  All rights reserved.
*
**/

monohm.provide ("monohm.Mime");

// static class
monohm.Mime = new Object ();

monohm.Mime.kExtensionToContentType = 
{
	"css" : "text/css",
	"gif" : "image/gif",
	"htm" : "text/html",
	"html" : "text/html",
	"jpg" : "image/jpeg",
	"jpeg" : "image/jpeg",
	"json" : "application/json",
	"js" : "application/javascript",
	"mp3" : "audio/mpeg3",
	"mpg" : "video/mpeg",
	"png" : "image/png",
	"rtf" : "application/rtf",
	"xml" : "application/xml"
};

// pass any string in here
monohm.Mime.mapExtensionToContentType = function (inString)
{
	var	extension = inString;
	var	periodIndex = inString.lastIndexOf (".");
	
	if (periodIndex >= 0)
	{
		extension = inString.substring (periodIndex + 1);
	}
	
	extension = extension.toLowerCase ();

	var	contentType = monohm.Mime.kExtensionToContentType [extension];
	
	if (!contentType)
	{
		console.error ("no content type for extension (" + extension + ")");
		contentType = "application/octet-stream";
	}
	
	return contentType;
}
/**
*
* @license
* Copyright 2014 Monohm Inc.  All rights reserved.
*
**/

monohm.provide ("monohm.Network");

// static class
monohm.Network = new Object ();

// pretends to be jquery $.ajax
// pretends to be jquery $.ajax
monohm.Network.ajax = function (inRequest)
{
  var fullURL = inRequest.url;
  
  var	data = "";
  
  // if data is an object, then serialise it, to be nice
  if (typeof (inRequest.data) == "object")
  {
  	data = monohm.Network.objectToURIData (inRequest.data);
  }
  else
  {
  	data = inRequest.data;
  }
  
  if (data && data.length)
  {
    fullURL += "?" + data;
  }

	// ensure we upper case for later
	// seems like something above the submit event lowercases the method :-S
	if (inRequest.type && inRequest.type.length)
	{
		inRequest.type = inRequest.type.toUpperCase ();
	}
	else
	{
		inRequest.type = "GET";
	}

	var	async = inRequest.async ? true : false;
	var	setResponseType = true;
	
	inRequest.dataType = inRequest.dataType.toLowerCase ();

	var	jsonp = monohm.Network.isJSONPRequest (inRequest);

	if (jsonp)
	{
		// console.log ("using jsonp for url: " + inRequest.url);
		monohm.Network.jsonp (inRequest);
	}
	else
	{
		// HACK on Firefox this allows cross-domain without JSONP
		// in conjunction with systemXHR permission
		// but why wasn't the permission enough?
		// why cause pollution this low?
		var	xhr = new XMLHttpRequest ({mozAnon: true, mozSystem: true});
		
		xhr.onreadystatechange = function ()
		{
			if (this.readyState == 4)
			{
				var	textStatus = "OK";
				
				// otherwise we check EVERYWHERE
				if (!inRequest.success)
				{
					inRequest.success = function ()
					{
					}
				}

				if (!inRequest.error)
				{
					inRequest.error = function ()
					{
					}
				}
				
				if (setResponseType)
				{
					if (this.response)
					{
						// some browsers do parsing, some don't
						if (inRequest.dataType == "json" && typeof (this.response) == "string")
						{
							var	parsed = null;
							
							try
							{
								parsed = JSON.parse (this.response);
							}
							catch (inError)
							{
								console.log ("JSON parse failed on " + inRequest.url);
								inRequest.error (this, inError.message, "Not Found");
							}
							
							try
							{
								inRequest.success (parsed, textStatus, this);
							}
							catch (inError)
							{
								console.error (inError);
								inRequest.error (this, inError.message, "Not Found");
							}
						}
						else
						{
							inRequest.success (this.response, textStatus, this);
						}
					}
					else
					{
						inRequest.error (this, "error", "Not Found");
					}
				}
				else
				{
					// we couldn't set the response type
					// so we only have responseText to work with
					// aka Firefox Broken Mode
					if (this.responseText && this.responseText.length)
					{
						try
						{
							if (inRequest.dataType == "json")
							{
								inRequest.success (JSON.parse (this.responseText), textStatus, this);
							}
							else
							{
								inRequest.success (this.responseText, textStatus, this);
							}
						}
						catch (inError)
						{
							inRequest.error (this, inError.message, "Not Found");
						}
					}
					else
					{
						inRequest.error (this, "error", "Not Found");
					}
				}
				
				if (typeof (inRequest.complete) == "function")
				{
					inRequest.complete (this, textStatus);
				}
			}
		}

		// the order of open(), setRequestHeader(), and send() is important
		
		var	url = inRequest.url;
		
		if (inRequest.type == "GET" || inRequest.type == "HEAD")
		{
			if (data && data.length)
			{
				url += "?" + data;
			}
		}
	
		xhr.open (inRequest.type, url, async);
	
		// Firefox won't let me set responseType for sync requests #random #troll
		try
		{
			xhr.responseType = inRequest.dataType;
		}
		catch (inError)
		{
			setResponseType = false;
		}

		if (typeof (inRequest.headers) == "object")
		{
			for (var key in inRequest.headers)
			{
				var	value = inRequest.headers [key];
				
				if (typeof (value) != "function")
				{
					xhr.setRequestHeader (key, value);
				}
			}
		}
		
		// some browsers throw on send() instead of doing a state change, sigh
		try
		{
			if (inRequest.type == "POST")
			{
				xhr.send (data);
			}
			else
			{
				xhr.send (null);
			}
		}
		catch (inError)
		{
			if (typeof (inRequest.error) == "function")
			{
				inRequest.error (inRequest, "error", inError.name);
			}
		}
	}
};

monohm.Network.get = function (inURL, inDataType, inCallback)
{
	var	payload = null;
	
	var	urlElements = inURL.split ("?");
	
	monohm.Network.ajax
	({
		url: urlElements [0],
		data: urlElements [1],
		type: "GET",
		dataType: inDataType,
		async: inCallback ? true : false,
		success: function (inData, inTextStatus, inXHR)
		{
			if (inCallback)
			{
				inCallback (null, inData);
			}
			else
			{
				payload = inData;
			}
		},
		error: function (inXHR, inTextStatus, inError)
		{
			if (inCallback)
			{
				inCallback (inError);
			}
			else
			{
				console.error (inError);
			}
		}
	});
	
	return payload;
}

monohm.Network.getJSONAsync = function (inURL, inCallback)
{
	monohm.Network.get (inURL, "json", inCallback);
}

monohm.Network.getJSONSync = function (inURL)
{
	return monohm.Network.get (inURL, "json");
}

monohm.Network.getTextAsync = function (inURL, inCallback)
{
	monohm.Network.get (inURL, "text", inCallback);
}

monohm.Network.getTextSync = function (inURL)
{
	return monohm.Network.get (inURL, "text");
}

// ok so a little clarification --
// if the URL includes a port number, but the port is the default one
// then it is excluded from "port" and "host"
// i think i'd rather have it default when it *isn't* there
// but either way comparing is easier without it
// colour me baphled (again)
monohm.Network.isCrossDomainRequest = function (inRequest)
{
	var	crossDomain = false;
	
	if (inRequest.type.toUpperCase () == "GET")
	{
		if (inRequest.headers)
		{
			// the user specified headers
			// eg for OAuth
			// so we can't JSONP
		}
		else
		{
			var	here = document.createElement ("a");
			here.href = document.location.href.toLowerCase ();
	
			var	there = document.createElement ("a");
			there.href = inRequest.url.toLowerCase ();
	
			// host includes the port, if any
			crossDomain = here.protocol != there.protocol || here.host != there.host;
		}
	}

	return crossDomain;	
}


monohm.Network.isJSONPRequest = function (inRequest)
{
	var	jsonp = true;
	
	if (monohm.Network.isCrossDomainRequest (inRequest))
	{
		// HACK allow Positron config to override based on strategy
		// there should be a better way
		if ((typeof (gApplication) != "undefined") && gApplication.config.crossDomainStrategy)
		{
			var	browserName = gApplication.browser.name;
			
			if (browserName && browserName.length)
			{
				var	strategy = gApplication.config.crossDomainStrategy [browserName];
				// console.log ("browser cross-domain strategy is " + strategy);
				
				if (strategy && strategy.length)
				{
					jsonp = strategy == "jsonp";
				}
			}
		}
	}
	else
	{
		// safe request, leave alone
		jsonp = false;
	}

	return jsonp;	
}

monohm.Network.jsonpSequence = 0;

monohm.Network.jsonp = function (inRequest)
{
	var	jsonpCallbackName = "monohm_json_callback_" + monohm.Network.jsonpSequence;
	monohm.Network.jsonpSequence++;
	
	var	url = inRequest.url;
	url += "?";
	
  var	data = "";
  
  // if data is an object, then serialise it, to be nice
  if (typeof (inRequest.data) == "object")
  {
  	data = monohm.Network.objectToURIData (inRequest.data);
  }
  else
  {
  	data = inRequest.data;
  }

	if (data && data.length)
	{
		url += data;
	}
	
	// HACK this is not sustainable
	// some packages require the actual callback name
	// and not just the name of the parameter
	// which causes pollution all the way down here and is revolting
	url += "&callback=" + jsonpCallbackName;
	url += "&json_callback=" + jsonpCallbackName;
	
	var	jsonTag = document.createElement ("script");
	jsonTag.setAttribute ("type", "text/javascript");
	jsonTag.setAttribute ("src", url);
	
	jsonTag.onload = function ()
	{
		// i hear that setTimeout()ing this is safer...
		setTimeout
		(
			function ()
			{
				window [jsonpCallbackName] = null;
				document.querySelector ("head").removeChild (jsonTag);
			},
			1
		);
	}
	
	// i am so grateful this exists
	jsonTag.onerror = function ()
	{
		if (inRequest.error)
		{
			inRequest.error (null, "ERROR", null);
		}
	}
	
	document.querySelector ("head").appendChild (jsonTag);
	
	window [jsonpCallbackName] = function (inJSONObject)
	{
		if (inJSONObject)
		{
			if (typeof (inRequest.success) == "function")
			{
				inRequest.success (inJSONObject, "OK", null);
			}
		}
		else
		{
			if (typeof (inRequest.error) == "function")
			{
				inRequest.error (null, "ERROR", null);
			}
		}
	}
}

monohm.Network.objectToURIData = function (inObject)
{
	var	data = "";
	
	for (var key in inObject)
	{
		if (typeof (key) == "string")
		{
			var	value = inObject [key];
			
			if (typeof (value) == "string" || typeof (value) == "number" || typeof (value) == "boolean")
			{
				if (data.length > 0)
				{
					data += "&";
				}
				
				data += key;
				data += "=";
				data += encodeURIComponent ("" + value);
			}
		}
	}
	
	return data;
}
/**
*
* @license
* Copyright 2014 Monohm Inc.  All rights reserved.
*
**/

monohm.provide ("monohm.Object");

// static class
monohm.Object = new Object ();

monohm.Object.clone = function (inObject)
{
	var	copy = inObject;
	
	if (inObject)
	{
		if (typeof inObject == "object")
		{
			if (Array.isArray (inObject))
			{
				copy = new Array ();
				
				for (var i = 0; i < inObject.length; i++)
				{
					copy [i] = monohm.Object.clone (inObject [i]);
				}
			}
			else
			{
				copy = new Object ();
				
				for (var key in inObject)
				{
					copy [key] = monohm.Object.clone (inObject [key]);
				}
			}
		}
	}
	
	return copy;
}

// returns whatever the last nonzero compare was
// or -1 for type mismatches, etc
monohm.Object.compare = function (inOne, inTwo)
{
	var	result = 0;
	
	if (typeof inOne == typeof inTwo)
	{
		if (typeof inOne == "object")
		{
			// could be null, watch out
			if (inOne == null && inTwo == null)
			{
				result = 0;
			}
			else
			{
				if (Array.isArray (inOne))
				{
					if (inOne.length == inTwo.length)
					{
						for (var i = 0; i < inOne.length && result == 0; i++)
						{
							result = monohm.Object.compare (inOne [i], inTwo [i]);
						}
					}
					else
					{
						result = -1;
					}
				}
				else
				{
					copy = new Object ();
					
					var	keys = new Object ();
					
					for (var key in inOne)
					{
						result = monohm.Object.compare (inOne [key], inTwo [key]);
						
						if (result == 0)
						{
							keys [key] = true;
						}
						else
						{
							break;
						}
					}
					
					if (result == 0)
					{
						// ensure we don't have extra keys in inTwo
						for (var key in inTwo)
						{
							if (! keys [key])
							{
								result = -1;
								break;
							}
						}
					}
				}
			}
		}
		else
		{
			result = inOne === inTwo ? 0 : -1;
		}
	}
	else
	{
		result = -1;
	}
	
	return result;
}

// check whether the class exists
monohm.Object.exists = function (inFullClassName)
{
	// console.log ("monohm.Object.instantiate(" + inFullClassName + ")");
	
	var	object = window;
	var	instance = null;
	
	var	packageElements = inFullClassName.split ('.');
	
	for (var i = 0; i < packageElements.length; i++)
	{
		object = object [packageElements [i]];
		
		if (!object)
		{
			break;
		}
	}
	
	return object != null && object != window;
}

monohm.Object.instantiate = function (inFullClassName)
{
	// console.log ("monohm.Object.instantiate(" + inFullClassName + ")");
	
	var	object = window;
	var	instance = null;
	
	var	packageElements = inFullClassName.split ('.');
	
	for (var i = 0; i < packageElements.length; i++)
	{
		object = object [packageElements [i]];
		
		if (!object)
		{
			break;
		}
	}
	
	if (object != null && object != window)
	{
		try
		{
			instance = new object;
		}
		catch (inError)
		{
			console.error ("error trying to construct " + inFullClassName);
			console.error (inError);
		}
	}
	
	return instance;
}

monohm.Object.isEmpty = function (inObject)
{
	var	empty = true;
	
	for (var key in inObject)
	{
		if (inObject.hasOwnProperty (key))
		{
			empty = false;
			break;
		}
	}
	
	return empty;
}

monohm.Object.merge = function (inObject, outObject)
{
	for (var key in inObject)
	{
		var	value = inObject [key];
		var	valueType = typeof (value);
		
		if (valueType == "string" || valueType == "number" || valueType == "boolean")
		{
			var	outValue = outObject [key];
			
			if (typeof (outValue) == "undefined" || typeof (outValue) == valueType)
			{
				outObject [key] = value;
			}
			else
			{
				console.error ("type mismatch on key: " + key);
				console.error ("type of existing is " + typeof (outValue));
				console.error ("type of incoming is " + typeof (valueType));
			}
		}
		else
		if (Array.isArray (value))
		{
			var	outValue = outObject [key];
			
			if (typeof (outValue) == "undefined")
			{
				outObject [key] = value;
			}
			else
			if (Array.isArray (outValue))
			{
				for (var i = 0; i < value.length; i++)
				{
					// don't push duplicates? is this reliable for object members?
					if (outValue.indexOf (value [i]) < 0)
					{
						outValue.push (value [i]);
					}
				}
			}
			else
			{
				console.error ("type mismatch on key: " + key);
				console.error ("type of existing is " + typeof (outValue));
				console.error ("type of incoming is " + typeof (valueType));
			}
		}
		else
		if (valueType == "object")
		{
			var	outValue = outObject [key];
			
			if (outValue)
			{
				if (typeof (outValue) == "object")
				{
					if (Array.isArray (outValue))
					{
						console.error ("type mismatch on key: " + key);
					}
					else
					{
						monohm.Object.merge (value, outValue);
					}
				}
				else
				{
					console.error ("type mismatch on key: " + key);
				}
			}
			else
			{
				outObject [key] = value;
			}
		}
		else
		{
			console.error ("fell off the typeof chain for key: " + key);
		}
		
	}
}
/**
*
* @license
* Copyright 2014 Monohm Inc.  All rights reserved.
*
**/

monohm.provide ("monohm.String");

// static class
monohm.String = new Object ();

// note this does *not* lowercase the remainder of the string
monohm.String.capitalise = function (inString)
{
	return inString.charAt (0).toUpperCase () + inString.substring (1);
}

monohm.String.kDistanceUnits =
[
	"m",
	"ft",
	"yd",
	"km",
	"mi"
];

monohm.String.kDistanceMultipliers =
[
	1,
	0.3048,
	0.9144,
	1000,
	1609.34
];

// parses 1000ft, 50mi, 35km etc into metres
monohm.String.parseDistance = function (inDistanceString, inDefault)
{
	var	distanceAndUnits = monohm.String.parseValueAndUnits (inDistanceString, inDefault, "m");
	
	var	unitIndex = monohm.String.kDistanceUnits.indexOf (distanceAndUnits.units);
	
	if (unitIndex >= 0)
	{
		distanceAndUnits.value *= monohm.String.kDistanceMultipliers [unitIndex];
	}
	else
	{
		console.error ("parseDistance() found unknown unit: " + distanceAndUnits.units);
	}
	
	// we guarantee an integer value
	return Math.round (distanceAndUnits.value);
}

monohm.String.parseFloat = function (inString, inDefault)
{
	var	value = inDefault;
	
	if (inString && inString.length)
	{
		value = parseFloat (inString);
	
		if (isNaN (value))
		{
			value = inDefault;
		}
	}
	
	return value;
}

monohm.String.parseInt = function (inString, inDefault)
{
	var	value = inDefault;
	
	if (inString && inString.length)
	{
		value = parseInt (inString);
	
		if (isNaN (value))
		{
			value = inDefault;
		}
	}
	
	return value;
}

monohm.String.kTimeUnits =
[
	"ms",
	"s",
	"m",
	"h",
	"d"
];

monohm.String.kTimeMultipliers =
[
	1,
	1000,
	60 * 1000,
	60 * 60 * 1000,
	60 * 60 * 1000 * 24
];

// parses 1000ms, 50s, 35m etc into milliseconds
monohm.String.parseTime = function (inTimeString, inDefault)
{
	var	timeAndUnits = monohm.String.parseValueAndUnits (inTimeString, inDefault, "ms");
	
	var	unitIndex = monohm.String.kTimeUnits.indexOf (timeAndUnits.units);
	
	if (unitIndex >= 0)
	{
		timeAndUnits.value *= monohm.String.kTimeMultipliers [unitIndex];
	}
	else
	{
		console.error ("parseTime() found unknown unit: " + timeAndUnits.units);
	}
	
	// we guarantee an integer value
	return Math.round (timeAndUnits.value);
}

monohm.String.parseValueAndUnits = function (inString, inDefaultValue, inDefaultUnits)
{
	var	valueAndUnits = new Object ();
	valueAndUnits.value = 0;
	valueAndUnits.units = inDefaultUnits ? inDefaultUnits : "";
	
	if (inString && inString.length)
	{
		var	multiplier = 1;
		var	decimalDigits = 0;

		inString = monohm.String.stripSpaces (inString);
		
		for (var i = 0; i < inString.length; i++)
		{
			var	ch = inString.charAt (i);
			
			if (ch == '.')
			{
				if (decimalDigits > 0)
				{
					console.error ("Util.parseValueAndUnits() found multiple decimals in : " + inString);
				}
				else
				{
					decimalDigits++;
				}
			}
			else
			if (ch == '-')
			{
				multiplier = -1;
			}
			else
			{
				var	timeDigit = parseInt (ch);
				
				if (isNaN (timeDigit))
				{
					if (i == 0)
					{
						// we never got a numeric digit, use the default
						valueAndUnits.value = inDefaultValue;
					}
					else
					{
						// negate if necessary
						valueAndUnits.value *= multiplier;
					}
					
					valueAndUnits.units = inString.substring (i);
					break;
				}
				else
				{
					if (decimalDigits == 0)
					{
						valueAndUnits.value *= 10;
						valueAndUnits.value += timeDigit;
					}
					else
					{
						valueAndUnits.value += (ch - '0') * (1 / (Math.pow (10, decimalDigits)));
						decimalDigits++;
					}
				}
			}
		}
	}
	else
	{
		valueAndUnits.value = inDefaultValue;
	}
		
	return valueAndUnits;
}

monohm.String.parseTokens = function (inString)
{
	var	elements = new Array ();
	var	element = "";
	var	quoteCharacter = null;
	var	quotedElement = false;
	
	for (var i = 0; i < inString.length; i++)
	{
		var	ch = inString.charAt (i);

		if (ch == quoteCharacter)
		{
			quoteCharacter = null;
			
			// have to ensure we don't refuse a zero length quoted element here
			// but we can't take it yet
			if (element.length == 0)
			{
				quotedElement = true;
			}
		}
		else
		if (ch == '\\')
		{
			if (i < (inCondition.length - 1))
			{
				i++;
				element += inCondition.charAt (i);
			}
			else
			{
				element += ch;
			}
		}
		else
		if (ch == '\'' || ch == '"')
		{
			quoteCharacter = ch;
		}
		else
		if (ch == ' ')
		{
			if (quoteCharacter)
			{
				element += ch;
			}
			else
			{
				if (quotedElement || element.length)
				{
					elements.push (element);
					element = "";
					quotedElement = false;
				}
			}
		}
		else
		{
			element += ch;
		}
	}
	
	if (quotedElement || element.length)
	{
		elements.push (element);
	}

	return elements;
}

monohm.String.replaceAll = function (inString, inReplace, inWith)
{
	return inString.split (inReplace).join (inWith);
}

monohm.String.smartJoin = function (inArray, inDelimiter)
{
	var	joined = "";
	
	for (var i = 0; i < inArray.length; i++)
	{
		var	element = inArray [i];
		
		if (element && element.length)
		{
			if (joined.length > 0)
			{
				joined += inDelimiter;
			}
			
			joined += element;
		}
	}
	
	return joined;
}

monohm.String.stripSpaces = function (inString)
{
	return inString.replace (/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}

monohm.String.validateEmailAddress = function (inAddress)
{
	var	valid = inAddress.length > 0;
	
	var	hadAt = false;
	var	local = "";
	var	domainElements = [];

	var	buffer = "";
	
	for (var i = 0; i < inAddress.length; i++)
	{
		var	ch = inAddress.charAt (i);
		
		if (ch == "@")
		{
			if (hadAt)
			{
				// console.error ("rejecting email address " + inAddress + " due to extra @ symbols");
				valid = false;
				break;
			}

			if (buffer.length === 0)
			{
				// console.error ("rejecting email address " + inAddress + " due to zero length local element");
				valid = false;
				break;
			}
			
			local = buffer;
			buffer = "";
			
			hadAt = true;
		}
		else
		if (ch == ".")
		{
			if (hadAt)
			{
				if (buffer.length === 0)
				{
					// console.error ("rejecting email address " + inAddress + " due to empty domain element");
					valid = false;
					break;
				}
				
				domainElements [domainElements.length] = buffer;
				buffer = "";
			}
			else
			{
				buffer += ch;
			}
		}
		else
		if ((ch >= "a" && ch <= "z") ||
			(ch >= "A" && ch <= "Z") ||
			(ch >= "0" && ch <= "9") ||
			("!#$%&'*+-/=?^_`{|}~".indexOf (ch) >= 0))
		{
			buffer += ch;
		}
		else
		{
			// console.error ("rejecting email address " + inAddress + " due to bad character " + ch);
			valid = false;
			break;
		}
	}

	if (valid && (buffer.length > 0))
	{
		if (hadAt)
		{
			domainElements [domainElements.length] = buffer;
		}
		else
		{
			local = buffer;
		}
	}
	
	// ASSUME already checked:
	// local length
	// individual domain element length
	// 
	
	if (valid && (! hadAt))
	{
		// console.error ("rejecting email address " + inAddress + " due to no @ character");
		valid = false;
	}
	
	if (valid && (domainElements.length < 2))
	{
		// console.error ("rejecting email address " + inAddress + " due to insufficient domain elements");
		valid = false;
	}
	
	if (valid && (domainElements [domainElements.length - 1].length < 2))
	{
		// console.error ("rejecting email address " + inAddress + " due to short final domain element");
		valid = false;
	}
	
	return valid;
};
