$(function() {
	$("#content").tabs();
	
	var max = $("#maxprice");
	$("<div/>").insertAfter(max).slider({
		range: "min",
		value: max.val(),
		max: 250,
		slide: function(event, ui) {
			max.val(ui.value);
			$("#productlist li").show().filter(function() {
				var price = parseInt($(".price", this).text().replace(/[^\d]/, ""));
				return price > ui.value;
			}).hide();
		}
	});
	
	$("#productlist li").draggable({
		helper: "clone"
	});
	$("#cart").droppable({
		activeClass: 'ui-state-hover',
		hoverClass: 'ui-state-active',
		drop: function(event, ui) {
			$(this).find(".placeholder").remove();
			ui.draggable.clone().appendTo($("ul", this));
		}
	});
});