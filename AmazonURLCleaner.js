// ==UserScript==
// @id             Amazon URL Cleaner
// @name           Amazon URL Cleaner
// @author         azu (https://greasyfork.org/users/124-azu), forked by doge
// @namespace      https://github.com/such-doge/user-scripts/
// @description    Shortens Amazon links in the Location bar. This version adds amazon.co.jp
// @include        http://www.amazon.*/dp/*
// @include        http://www.amazon.*/*gp/product/*
// @include        http://www.amazon.*/exec/obidos/ASIN/*
// @include        http://www.amazon.*/o/ASIN/*
// @run-at         document-end
// @version        0.0.2.2014-07-26
// ==/UserScript==
(function(doc) {
    // ASIN.0 in kindle store
    var asin = doc.getElementById("ASIN") || doc.getElementsByName("ASIN.0")[0];
    if (asin) {
        asin = asin.value
        history.replaceState(null, "Amazon URL Cleaner", "/dp/" + asin + "/");
    }
})(document);
