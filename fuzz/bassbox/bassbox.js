/*
 * jQuery Plugin: Bassbox
 *
 * Copyright (c) 2006 Jörn Zaefferer, Cody Lindley
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($) {

	$.fn.Bassbox = function() {
		build();
		return this.click(function(event) {
			// stop default behaviour
			event.preventDefault();
			// remove click border
			this.blur();
			
			// get caption: either title or name attribute
			var caption = this.title || this.name || "";
			
			// get rel attribute for image groups
			var group = this.rel || false;
			
			// display the box for the elements href
			show(this.href, caption, group, this.data);
		});
	};
	
	var stuff, box, iframe, load;
	
	function build() {
		if(!stuff) {
			var markup = [
				"<div id='TB_window'></div>",
				"<div id='TB_load'><img src='loadingAnimation.gif' alt='Loading' /></div>"
			].join("");
			stuff = $(markup).hide().appendTo("body");
			box = $("#TB_window");
			load = $("#TB_load");
		}
	}
	
	//function called when the user clicks on a box link
	function show(url, caption, imageGroup, options) {
	
		// try blockUI for overlay
		$().trigger("overlay");
		
		load.show();
		box.empty();
	
		var baseUrl = url;
		if(baseUrl.indexOf("?")!==-1){ //If there is a query string involved
			baseUrl = baseUrl.substr(0, url.indexOf("?"));
		}
		var urlType = baseUrl.toLowerCase().match(/\.jpg|\.jpeg|\.png|\.gif|\.bmp/);
		
		//code to show images
		if(urlType){

			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;
			if(imageGroup){
				TB_TempArray = $("a[@rel="+imageGroup+"]").get();
				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML == "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
						if (!(TB_TempArray[TB_Counter].href == url)) {
							if (TB_FoundURL) {
								TB_NextCaption = TB_TempArray[TB_Counter].title;
								TB_NextURL = TB_TempArray[TB_Counter].href;
								TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
							} else {
								TB_PrevCaption = TB_TempArray[TB_Counter].title;
								TB_PrevURL = TB_TempArray[TB_Counter].href;
								TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
							}
						} else {
							TB_FoundURL = true;
							TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);
						}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){
				imgPreloader.onload = null;
	
				var pagesize = TB_getPageSize();
				var x = pagesize[0] - 150;
				var y = pagesize[1] - 150;
				var imageWidth = imgPreloader.width;
				var imageHeight = imgPreloader.height;
				if (imageWidth > x) {
					imageHeight = imageHeight * (x / imageWidth);
					imageWidth = x;
					if (imageHeight > y) {
						imageWidth = imageWidth * (y / imageHeight);
						imageHeight = y;
					}
				} else if (imageHeight > y) {
					imageWidth = imageWidth * (y / imageHeight);
					imageHeight = y;
					if (imageWidth > x) {
						imageHeight = imageHeight * (x / imageWidth);
						imageWidth = x;
					}
				}
				// End Resizing
	
				TB_WIDTH = imageWidth + 30;
				TB_HEIGHT = imageHeight + 60;
				if(!$('TB_ImageOff').length) {
					$("#TB_window").append("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a></div>");
					$("#TB_closeWindowButton").click(remove);
				}
	
				if (!(TB_PrevHTML == "")) {
					function goPrev(){
						if($(document).unclick(goPrev)){$(document).unclick(goPrev)};
						$("#TB_window").remove();
						$("body").append("<div id='TB_window'></div>");
						TB_show(TB_PrevCaption, TB_PrevURL, imageGroup);
						return false;
					}
					$("#TB_prev").click(goPrev);
				}
	
				if (!(TB_NextHTML == "")) {
					function goNext(){
						$("#TB_window").remove();
						$("body").append("<div id='TB_window'></div>");
						TB_show(TB_NextCaption, TB_NextURL, imageGroup);
						return false;
					}
					$("#TB_next").click(goNext);
	
				}
	
				document.onkeydown = function(e){
					if (e == null) { // ie
						keycode = event.keyCode;
					} else { // mozilla
						keycode = e.which;
					}
					if(keycode == 27){ // close
						remove();
					} else if(keycode == 190){ // display previous image
						if(!(TB_NextHTML == "")){
						document.onkeydown = "";
						goNext();
						}
					} else if(keycode == 188){ // display next image
						if(!(TB_PrevHTML == "")){
						document.onkeydown = "";
						goPrev();
						}
					}
				}
	
				TB_position();
				load.hide();
				$("#TB_ImageOff").click(remove);
				showbox();
			};

			imgPreloader.src = url;
		}else{//code to show html pages

			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = TB_parseQuery( queryString );

			TB_WIDTH = (params['width']*1) + 30;
			TB_HEIGHT = (params['height']*1) + 40;
			ajaxContentW = TB_WIDTH - 30;
			ajaxContentH = TB_HEIGHT - 45;

			
			var content = {
				iframe: function() {
					urlNoQuery = url.split('TB_');
					box.append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
					$("#TB_iframeContent").load(showbox);
					$("#TB_ajaxContent").html($('#' + params['inlineId']).html());
					TB_position();
					$("#TB_load").remove();
					$("#TB_window").css({display:"block"});
				},
				inline: function() {
					$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");
					TB_position();
					if(frames['TB_iframeContent'] == undefined){//be nice to safari
						$("#TB_load").remove();
						$("#TB_window").css({display:"block"});
						$(document).keyup( function(e){ var key = e.keyCode; if(key == 27){remove()} });
					}
				},
				ajax: function() {
					$("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");
					$("#TB_ajaxContent").load(url, function(){
						TB_position();
						$("#TB_load").remove();
						$("#TB_window").css({display:"block"});
					});
				}
			}
			content[options.display]();
			$("#TB_closeWindowButton").click(remove);
		}

		$(document).keyup(function(event){
			if(event.keyCode == 27){ // close
				remove(event);
			}
		});
	}
	
	//helper functions below
	
	function showbox() {
		box.bgiframe().show();
	}
	
	function TB_showIframe(){
		$("#TB_load").remove();
		$("#TB_window").css({display:"block"});
	}
	
	function remove(event) {
		if(event)
			event.preventDefault();
		stuff.hide();
		
		/*
	 	$("#TB_imageOff").unclick();
		$("#TB_overlay").unclick();
		$("#TB_closeWindowButton").unclick();
		$("#TB_window").fadeOut("fast",function(){$('#TB_window,#TB_overlay,#TB_HideSelect').remove();});
		$("#TB_load").remove();
		return false;
		*/
	}
	
	function TB_position() {
	     $("#TB_window").css({marginLeft: '-' + parseInt(TB_WIDTH / 2) + 'px', width: TB_WIDTH + 'px'});
	     if ( !(jQuery.browser.msie && typeof XMLHttpRequest == 'function') ) { // take away IE6
	         $("#TB_window").css({marginTop: '-' + parseInt(TB_HEIGHT / 2) + 'px'});
	     }
	}
	
	function TB_parseQuery ( query ) {
		var Params = {};
		if ( query ) {
		   var Pairs = query.split(/[;&]/);
		   for ( var i = 0; i < Pairs.length; i++ ) {
		      var KeyVal = Pairs[i].split('=');
		      if ( ! KeyVal || KeyVal.length != 2 ) continue;
		      var key = unescape( KeyVal[0] );
		      var val = unescape( KeyVal[1] );
		      val = val.replace(/\+/g, ' ');
		      Params[key] = val;
		   }
		}
		return Params;
	}
	
	// replace via dimensions?
	function TB_getPageSize(){
		function help(dim) {
			var de = document.documentElement;
			return window["inner" + dim] || self["inner" + dim]  || (de && de["client" + dim]) || document.body["client" + dim];
		}
		//var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
		//var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight
		return [help("Width"), help("Height")];
	}

})(jQuery);