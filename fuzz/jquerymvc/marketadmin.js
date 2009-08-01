$("#main").parent().remove();
$("script[@src]").attr("src", function() { return contextPath + this.src });
$("link[@href]").attr("href", function() { return contextPath + this.href });
document.body.innerHTML
