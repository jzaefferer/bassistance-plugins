jQuery(function($) {
	
	$("#content").tabs();
	
	$("#filtering input").each(function() {
		var input = $(this);
		$("<div/>").insertAfter(this).slider({
			max: 250,
			value: input.val(),
			slide: function(event, ui) {
				input.val(ui.value);
				$("#productlist li").show().filter(function() {
					var price = parseFloat($(".price", this).text().replace(/[^\d]/, ""));
					return price > ui.value;
				}).hide();
			}
		});
	});
	
	$("#productlist li").draggable({
		helper: "clone"
	});
	$("#cart").droppable({
		activeClass: 'ui-state-hover',
		hoverClass: 'ui-state-active',
		drop: function(event, ui) {
			$(this).find(".placeholder").remove();
			$("<li/>").text(ui.helper.text()).appendTo($(this).find("ul"));
		}
	});
});