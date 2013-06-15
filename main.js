/**
 * gadgets.util
 *
 * This module implements the gadgets.util API defined by OpenSocial.
 *
 * References:
 *  - [OpenSocial](http://opensocial.org/)
 *  - [OpenSocial](http://en.wikipedia.org/wiki/OpenSocial)
 *  - [util.js](https://svn.apache.org/repos/asf/shindig/tags/shindig-project-2.0.0/features/src/main/javascript/features/core.util/util.js)
 *
 *  - [Gadgets API](https://developers.google.com/gadgets/)
 *  - [Gadgets Specification](https://developers.google.com/gadgets/docs/spec)
 *  - [Static Class gadgets.util](https://developers.google.com/gadgets/docs/reference/#gadgets.util)
 *  - [util.js](http://opensocial-resources.googlecode.com/svn/spec/0.8/gadgets/util.js)
 */
define(['exports'],
function(exports) {

  function getUrlParameters(url) {
    console.log('gadgets.rpc.getUrlParameters');
    console.log('  url: ' + url);
    
    var parameters = null;
    
    var noUrl = typeof url === "undefined";
    if (parameters !== null && noUrl) {
      // "parameters" is a cache of current window params only.
      return parameters;
    }
    var parsed = {};
    var pairs = parseUrlParams(url || document.location.href);
    var unesc = window.decodeURIComponent ? decodeURIComponent : unescape;
    for (var i = 0, j = pairs.length; i < j; ++i) {
      var pos = pairs[i].indexOf('=');
      if (pos === -1) {
        continue;
      }
      var argName = pairs[i].substring(0, pos);
      var value = pairs[i].substring(pos + 1);
      // difference to IG_Prefs, is that args doesn't replace spaces in
      // argName. Unclear on if it should do:
      // argName = argName.replace(/\+/g, " ");
      value = value.replace(/\+/g, " ");
      parsed[argName] = unesc(value);
    }
    if (noUrl) {
      // Cache current-window params in parameters var.
      parameters = parsed;
    }
    return parsed;
  }
  
  function parseUrlParams(url) {
    // Get settings from url, 'hash' takes precedence over 'search' component
    // don't use document.location.hash due to browser differences.
    var query;
    var queryIdx = url.indexOf("?");
    var hashIdx = url.indexOf("#");
    if (hashIdx === -1) {
      query = url.substr(queryIdx + 1);
    } else {
      // essentially replaces "#" with "&"
      query = [url.substr(queryIdx + 1, hashIdx - queryIdx - 1), "&",
               url.substr(hashIdx + 1)].join("");
    }
    return query.split("&");
  }
  
  exports.getUrlParameters = getUrlParameters;
  
});
