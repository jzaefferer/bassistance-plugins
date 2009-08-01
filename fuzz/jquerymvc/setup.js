var path = "file:" + realPath + "\\index.html"
window.document = new DOMDocument(path);
var console = {
	log: function(msg) {
		java.lang.System.out.println(msg);
	}
}