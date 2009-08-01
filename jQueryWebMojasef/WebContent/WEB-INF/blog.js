load(realPath + "/env.js");
window.document = new DOMDocument(realPath + "/blog.html");
load(realPath + "/jquery.js");

$.fn.contextPath = function(attr, prefix) {
	return this.attr(attr, function() { return request.contextPath + this[attr].replace(prefix, "") });
}

$("script[@src],img[@src]").contextPath("src", /^../);
$("link[@href]").contextPath("href", /^../);

var dateformat = new java.text.SimpleDateFormat("dd. MMMM yyyy");
var entry = $("div.entry").remove();
importPackage(Packages.de.bassistance.blog.domain);
var posts = new BlogService().getRecentPosts();
$.each(posts, function(index, post) {
	var current = entry.clone().appendTo("div.col");
	current.find(".entrymeta").html("" + dateformat.format(post.getDate()));
	current.find(".entrytitle a").html("" + post.getTitle());
	current.find(".entrybody").html("" + post.getBody());
});
$("div.bottommeta").appendTo("div.col");

document.innerHTML
