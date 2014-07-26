// ==UserScript==
// @name           Imagehost Redirect
// @namespace      http://greasyfork.org/users/2240-doodles
// @author         Doodles, such-doge
// @version        4.1
// @description    Redirects Imagehost Pages to the hosted Image
// @icon           http://i.imgur.com/eLGmXwE.png
// @icon64         http://i.imgur.com/EkKNXD8.png
// @include        *://rule34.paheal.net/post/view/*
// @include        *://g.e-hentai.org/s/*/*
// @include        *://www.quickmeme.com/meme/*
// @include        *://www.quickmeme.com/p/*
// @include        *://*deviantart.com/art/*
// @include        *://adf.ly/*/banner/*
// @include        *://imgchili.net/show/*/*
// @include        *://imagetwist.com/*
// @include        *://imgdino.com/viewer.php?file=*
// @include        *://imgtiger.com/viewer.php?file=*
// @include        *://bayimg.com/*
// @include        *://www.imgspice.com/*/*
// @include        *://www.imgboc.com/share.php?id=*
// @include        *://imagecurl.org/viewer.php?file=*
// @include        *://www.imageophilia.com/?v=*
// @include        *://imageshack.com/i/*
// @include        *://postimg.org/image/*
// @include        *://xxxhost.me/viewer.php?file=*
// @include        *://www.euro-pic.eu/share-*.html
// @include        *://www.pixsor.com/share-*.html
// @include        *://imghoney.com/viewerr.php?file=*
// @include        *://imgboxxx.com/viewer.php?file=*
// @include        *://picturescream.com/x/clean/*
// @include        *://www.fastpics.net/?v=*
// @include        *://www.imgnip.com/viewerr.php?file=*
// @include        *://tinypic.com/view.php*pic=*
// @include        *://www.imagefap.com/photo/*/*
// @include        *://imageshimage.com/*
// @include        *://*imagevenue.com/img.php?image=*
// @include        *://imgfun.biz/x/*
// @include        *://www.imagesnake.org/show/*/*
// @include        *://imagenimage.com/*/*
// @include        *://img.i7m.de/show/*
// @include        *://imgbox.com/*
// @include        *://j.felna.net/img*
// @include        *://uplmages.com/?v=*
// @include        *://picturevip.com/x/clean/*
// @include        *://nceleb.com/images/share.php?id=*
// @include        *://imgdone.com/viewer.php?file=*
// @include        *://jeviasex.blogsxporn.com/view.php?filename=*
// @include        *://www.imglooks.com/viewer.php?file=*
// @include        *://www.imgflare.com/*/*
// @include        *://picexposed.com/*/*
// @include        *://imgseeds.com/image/*
// @include        *://imgserve.net/*
// @include        *://pic.re/*
// @include        *://imgcandy.net/*
// @include        *://imgmega.com/*/*
// @include        *://1be.biz/s.php?*
// @include        *://08lkk.com/*/*
// @include        *://imgpaying.com/*/*
// @include        *://imgtab.net/v/i/*
// @include        *://www.imgbabes.com/*/*
// @include        *://img.yt/*
// @include        *://www.linkbucks.com/*/url/*
// @include        *://www.imglemon.com/*
// @include        *://imgtube.net/*
// @include 
// @grant          none
// @updateVersion  4
// @run-at         document-end
// ==/UserScript==

if(false && UrlContains("rule34.paheal.net"))
{
	imageHasId("main_image");
}

if(false && UrlContains("g.e-hentai.org"))
{
	imageHasId("img");
}

if(false && UrlContains("www.quickmeme.com"))
{
	if(UrlContains("/meme/"))
	{
		imageHasId("post-image-" + document.URL.split("/meme/")[1].split("?")[0]);
	}
	else if(UrlContains("/p/"))
	{
		imageHasId("post-image-" + document.URL.split("/p/")[1].split("?")[0]);
	}
}

if(false && UrlContains("deviantart.com"))
{
	imageHasClass("dev-content-full");
}

// =========================================================================

if(true && UrlContains("adf.ly"))
{
	window.location.assign(document.URL.split("/banner/")[1]);
}

// Added by doge {
if(true && UrlContains("1be.biz"))
{
	window.location.assign(document.URL.split("s.php?")[1]);
}
if(true && UrlContains("www.linkbucks.com"))
{
	window.location.assign(document.URL.split("/url/")[1]);
}
// } End

// =========================================================================

if(true && UrlContains("imgchili.net"))
{
	imageHasId('show_image');
}

if(true && UrlContains("imagetwist.com"))
{
	imageHasClass("pic");
}

if(true && UrlContains("imgdino.com"))
{
	imageHasId('cursor_lupa');
}

if(true && UrlContains("imgtiger.com"))
{
	imageHasId('cursor_lupa');
}

if(true && UrlContains("bayimg.com"))
{
	imageHasId('mainImage');
}

if(true && UrlContains("imgspice.com"))
{
	imageHasId('knjdycbs87nbd');
}

if(true && UrlContains("imgboc.com") && !UrlContains("&"))
{
	window.location.assign(document.URL.replace("share.php", "image.php") + "&jpg");
}

if(true && UrlContains("imagecurl.org"))
{
	window.location.assign(document.URL.replace("viewer.php?file=", "images/"));
}

if(true && UrlContains("imageophilia.com"))
{
	imageHasId('full_image');
}

if(true && UrlContains("imageshack.com"))
{
	var imgDivs = document.getElementsByTagName("img");
	for (var i = 0; i < imgDivs.length; i++) 
	{
		if(imgDivs[i].hasAttribute("onerror")) 
		{
			window.location.assign(imgDivs[i].src);
			break;
    	}
	}
}

if(true && UrlContains("postimg.org"))
{
	var anc = document.getElementsByTagName("a");
	for (var i = 0; i < anc.length; i++) 
	{
		if(anc[i].href.indexOf("/full/")) 
		{
			window.location.assign(anc[i].getElementsByTagName("img")[0].src);
			break;
    	}
	}
}

if(true && UrlContains("xxxhost.me"))
{
	window.location.assign(document.URL.replace("viewer.php?file=", "files/"));
}

if(true && UrlContains("www.euro-pic.eu"))
{
	window.location.assign(document.URL.replace("share-", "image.php?id=").replace(".html", ""));
}

if(true && UrlContains("www.pixsor.com"))
{
	window.location.assign(document.URL.replace("share-", "image.php?id=").replace(".html", ""));
}

if(true && UrlContains("imghoney.com"))
{
	window.location.assign(document.URL.replace("viewerr.php?file=", "images/"));
	//imageHasId('main_image'); // also works
}

if(true && UrlContains("imgboxxx.com"))
{
	window.location.assign(document.URL.replace("viewer.php?file=", "images/"));
}

if(true && UrlContains("picturescream.com"))
{
	var div = document.getElementById("shortURL-content");
	var url = div.getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
	window.location.assign(url);
}

if(true && UrlContains("www.fastpics.net"))
{
	window.location.assign(document.URL.replace("?v=", "images/"));
}

if(true && UrlContains("www.imgnip.com"))
{
	window.location.assign(document.URL.replace("viewerr.php?file=", "images/"));
}

if(true && UrlContains("tinypic.com"))
{
	imageHasId('imgElement');
}

if(true && UrlContains("www.imagefap.com"))
{
	imageHasId('mainPhoto');
}

if(true && UrlContains("imageshimage.com"))
{
	imageHasClass("pic");
}

if(true && UrlContains("imagevenue.com"))
{
	imageHasId("thepic");
}

if(true && UrlContains("imgfun.biz"))
{
	imageHasClass("centred");
}

if(true && UrlContains("imagenimage.com"))
{
	imageHasClass("pic");
}

if(true && UrlContains("img.i7m.de"))
{
	imageHasId('mainImage');
}

if(true && UrlContains("imgbox.com"))
{
	imageHasId('img');
}

if(true && UrlContains("j.felna.net"))
{
	imageHasClass('centred_resized');
}

if(true && UrlContains("uplmages.com"))
{
	imageHasId('full_image');
}

if(true && UrlContains("picturevip.com"))
{
	var div = document.getElementById("shortURL-content");
	var url = div.getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
	window.location.assign(url);
}

if(true && UrlContains("nceleb.com"))
{
	window.location.assign(document.URL.replace("share", "image"));
}

if(true && UrlContains("imgdone.com"))
{
	window.location.assign(document.URL.replace("viewer.php?file=", "images/"));
}

if(true && UrlContains("jeviasex.blogsxporn.com"))
{
	window.location.assign(document.URL.replace("view.php?filename=", "images/"));
}

if(true && UrlContains("www.imglooks.com"))
{
	window.location.assign(document.URL.replace("viewer.php?file=", "images/"));
}

// =========================================================================
// Added by doge {

if(true && UrlContains("www.imgflare.com"))
{
	imageHasId('this_image');
}

if(true && UrlContains("picexposed.com"))
{
	imageHasClass('pic');
}

if(true && UrlContains("imgseeds.com"))
{
	imageHasId('img1');
}

if(true && UrlContains("imgserve.net"))
{
	imageHasClass('centred');
}

if(true && UrlContains("pic.re"))
{
	FormRedirect();
	imageHasClass('pic');
}

if(true && UrlContains("imgcandy.net"))
{
	InputRedirect();
	imageHasClass('centred');
	imageHasClass('centred_resized');
}
if(true && UrlContains("imgmega.com"))
{
	FormRedirect();
	imageHasClass('pic');
}
if(true && UrlContains("08lkk.com"))
{
	InputRedirect();
	imageHasClass('centred');
	imageHasClass('centred_resized');
}
if(true && UrlContains("imgpaying.com"))
{
	imageHasClass('pic');
}
if(true && UrlContains("imgtab.net"))
{
	imageHasId('main_image')
}
if(true && UrlContains("www.imgbabes.com"))
{
	imageHasClass('pic');
}
if(true && UrlContains("img.yt"))
{
	InputRedirect();
	imageHasClass('centred');
	imageHasClass('centred_resized');
}
if(true && UrlContains("www.imglemon.com"))
{
	InputRedirect();
	imageHasClass('centred');
	imageHasClass('centred_resized');
}
if(true && UrlContains("imgtube.net"))
{
	continueForm = document.getElementsByTagName('form')[0];
	if(continueForm != null && continueForm.target != '_blank') { // Checks to make sure it isn't the download link on the second page.
		continueForm.submit();
	}
	imageHasId('image');
}
// } End
// =========================================================================

if(true && UrlContains("www.imagesnake.org"))
{
	var html = document.createElement('html');
	var body = document.createElement('body');
	var div = document.createElement('div');
	div.setAttribute('align', 'center');
	var link = document.createElement('a');
	link.setAttribute('href', document.getElementById("img_obj").src);
	link.appendChild(document.createTextNode("click here for the image"));
	link.style.fontSize = "2em";
	div.appendChild(link);
	div.appendChild(document.createElement('br'));
	div.appendChild(document.createElement('br'));
	div.appendChild(document.createTextNode("imagesnake.org prevents \"hotlinking\", so you need to click the link"));
	body.appendChild(div);
	html.appendChild(body);
	document.replaceChild(html, document.documentElement);
}

// =========================================================================

function imageHasId(imageid)
{
	var image = document.getElementById(imageid);
	if(image != null)
	{
		window.location.assign(image.src);
	}
}
function imageHasClass(imageclass)
{
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; i++) 
	{
		if(imgs[i].className == imageclass) 
		{
			window.location.assign(imgs[i].src);
			break;
    	}
	}
}
function UrlContains(urlfragment) 
{
	return document.URL.indexOf(urlfragment) != -1;
}

// Added by doge {
function FormRedirect()
{
	continueForm = document.getElementsByTagName('form')[0];
	if(continueForm != null) {
		continueForm.submit();
	}
}
function InputRedirect()
{
	continueButton = document.getElementsByTagName('input')[0];
	if(continueButton != null) {
		continueButton.click();
	}
}
// } End