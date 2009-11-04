jQuery(function($) {
	
	$("#content").tabs();
	
	$("#filtering input").each(function() {
		$(this).hide();
		$("<div/>").insertAfter(this).slider();
	});
	
	$("#productlist li").draggable({
		helper: "clone"
	});
	$("#cart ul").droppable({
		drop: function(event, ui) {
			$(this).find(".placeholder").remove();
			$("<li/>").text(ui.helper.text()).appendTo(this);
		}
	});
});