/**
 * Check selected radio buttons and checkboxes.
 * 
 * @example $("input[@type='checkbox']").check();
 * @before <input type="checkbox" />
 * @result <input type="checkbox" checked="checked" />
 * 
 * @type jQuery
 * @name check
 */
 
 /**
 * Uncheck selected radio buttons and checkboxes.
 * 
 * @example $("input[@type='radio']").uncheck();
 * @before <input type="checkbox" checked="checked" />
 * @result <input type="checkbox" />
 * 
 * @type jQuery
 * @name uncheck
 */
 
 /**
 * Toggle check on selected radio buttons and checkboxes.
 * 
 * @example $("input[@type='checkbox']").toggleCheck();
 * @before <input type="checkbox" name="c1" />
 * <input type="checkbox" name="c2" checked="checked" />
 * @result <input type="checkbox" name="c1" checked="checked" />
 * <input type="checkbox" name="c2" />
 * 
 * @type jQuery
 * @name toggleCheck
 */
$.fn.extend({
	check: function() {
		return this.each(function(){
			this.checked = true;
			console.debug(this);
		});
	},
	uncheck: function() {
		return this.each(function(){
			this.checked = false;
		});
	},
	toggleCheck: function() {
		return this.each(function() {
			this.checked = !this.checked;
		});
	}
});

$.extend($.expr[":"], {
	text: "a.type=='text'",
	radio: "a.type=='radio'",
	checkbox: "a.type=='checkbox'",
	file: "a.type=='file'",
	password: "a.type=='password'",
	submit: "a.type=='submit'",
	image: "a.type=='image'",
	reset: "a.type=='reset'",
	button: "a.type=='button'",
	hidden: "a.type=='hidden'",
	input: "a.nodeName.toLowerCase()=='input'||a.nodeName.toLowerCase()=='select'||a.nodeName.toLowerCase()=='textarea'"
});