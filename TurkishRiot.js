// ==UserScript==
// @id             Turkish-Riot@such-doge
// @name           Turkish Riot
// @namespace      https://github.com/such-doge/user-scripts
// @author         such-doge
// @version        1.0
// @description    Fuck the Turkish government
// @homepageURL    https://github.com/such-doge/user-scripts
// @icon           http://s22.postimg.org/a930q3gtp/48x48.png
// @icon64         http://s8.postimg.org/p2etx5a35/64x64.png
// @include        *://*
// @grant          none
// @updateVersion  4
// @run-at         document-end
// ==/UserScript==

var tags = document.getElementsByTagName('img');

for (var i = 0; i < tags.length; i++) {
	if (tags[i].src.indexOf("imgur.com") < 0) {
		continue;
	} else {
		tags[i].src = tags[i].src.replace('imgur.com', 'filmot.org');
	}
}