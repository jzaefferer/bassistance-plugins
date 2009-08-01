/* prevent execution of jQuery if included more than once */
if(typeof window.jQuery == "undefined") {
/*
 * jQuery @VERSION - New Wave Javascript
 *
 * Copyright (c) 2007 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2007-01-23 18:02:32 +0100 (Di, 23 Jan 2007) $
 * $Rev: 1173 $
 */

// Global undefined variable
window.undefined = window.undefined;

/**
 * Create a new jQuery Object
 *
 * @constructor
 * @private
 * @name jQuery
 * @param String|Function|Element|Array<Element>|jQuery a selector
 * @param jQuery|Element|Array<Element> c context
 * @cat Core
 */
var jQuery = function(a,c) {
	// If the context is global, return a new object
	if ( window == this )
		return new jQuery(a,c);

	// Make sure that a selection was provided
	a = a || document;
	
	// HANDLE: $(function)
	// Shortcut for document ready
	if ( jQuery.isFunction(a) )
		return new jQuery(document)[ jQuery.fn.ready ? "ready" : "load" ]( a );
	
	// Handle HTML strings
	if ( typeof a  == "string" ) {
		// HANDLE: $(html) -> $(array)
		var m = /^[^<]*(<(.|\n)+>)[^>]*$/.exec(a);
		if ( m )
			a = jQuery.clean( [ m[1] ] );
		
		// HANDLE: $(expr)
		else
			return new jQuery( c ).find( a );
	}
	
	return this.setArray(
		// HANDLE: $(array)
		a.constructor == Array && a ||

		// HANDLE: $(arraylike)
		// Watch for when an array-like object is passed as the selector
		(a.jquery || a.length && a != window && !a.nodeType && a[0] != undefined && a[0].nodeType) && jQuery.makeArray( a ) ||

		// HANDLE: $(*)
		[ a ] );
};

// Map over the $ in case of overwrite
if ( typeof $ != "undefined" )
	jQuery._$ = $;
	
// Map the jQuery namespace to the '$' one
var $ = jQuery;

/**
 * This function accepts a string containing a CSS or
 * basic XPath selector which is then used to match a set of elements.
 *
 * The core functionality of jQuery centers around this function.
 * Everything in jQuery is based upon this, or uses this in some way.
 * The most basic use of this function is to pass in an expression
 * (usually consisting of CSS or XPath), which then finds all matching
 * elements.
 *
 * By default, $() looks for DOM elements within the context of the
 * current HTML document.
 *
 * @example $("div > p")
 * @desc Finds all p elements that are children of a div element.
 * @before <p>one</p> <div><p>two</p></div> <p>three</p>
 * @result [ <p>two</p> ]
 *
 * @example $("input:radio", document.forms[0])
 * @desc Searches for all inputs of type radio within the first form in the document
 *
 * @example $("div", xml.responseXML)
 * @desc This finds all div elements within the specified XML document.
 *
 * @name $
 * @param String expr An expression to search with
 * @param Element|jQuery context (optional) A DOM Element, Document or jQuery to use as context
 * @cat Core
 * @type jQuery
 * @see $(Element)
 * @see $(Element<Array>)
 */
 
/**
 * Create DOM elements on-the-fly from the provided String of raw HTML.
 *
 * @example $("<div><p>Hello</p></div>").appendTo("#body")
 * @desc Creates a div element (and all of its contents) dynamically, 
 * and appends it to the element with the ID of body. Internally, an
 * element is created and it's innerHTML property set to the given markup.
 * It is therefore both quite flexible and limited. 
 *
 * @name $
 * @param String html A string of HTML to create on the fly.
 * @cat Core
 * @type jQuery
 * @see appendTo(String)
 */

/**
 * Wrap jQuery functionality around a single or multiple DOM Element(s).
 *
 * This function also accepts XML Documents and Window objects
 * as valid arguments (even though they are not DOM Elements).
 *
 * @example $(document.body).background( "black" );
 * @desc Sets the background color of the page to black.
 *
 * @example $( myForm.elements ).hide()
 * @desc Hides all the input elements within a form
 *
 * @name $
 * @param Element|Array<Element> elems DOM element(s) to be encapsulated by a jQuery object.
 * @cat Core
 * @type jQuery
 */

/**
 * A shorthand for $(document).ready(), allowing you to bind a function
 * to be executed when the DOM document has finished loading. This function
 * behaves just like $(document).ready(), in that it should be used to wrap
 * all of the other $() operations on your page. While this function is,
 * technically, chainable - there really isn't much use for chaining against it.
 * You can have as many $(document).ready events on your page as you like.
 *
 * See ready(Function) for details about the ready event. 
 * 
 * @example $(function(){
 *   // Document is ready
 * });
 * @desc Executes the function when the DOM is ready to be used.
 *
 * @example jQuery(function($) {
 *   // Your code using failsafe $ alias here...
 * });
 * @desc Uses both the shortcut for $(document).ready() and the argument
 * to write failsafe jQuery code using the $ alias, without relying on the
 * global alias.
 *
 * @name $
 * @param Function fn The function to execute when the DOM is ready.
 * @cat Core
 * @type jQuery
 * @see ready(Function)
 */

jQuery.fn = jQuery.prototype = {
	/**
	 * The current version of jQuery.
	 *
	 * @private
	 * @property
	 * @name jquery
	 * @type String
	 * @cat Core
	 */
	jquery: "@VERSION",

	/**
	 * The number of elements currently matched.
	 *
	 * @example $("img").length;
	 * @before <img src="test1.jpg"/> <img src="test2.jpg"/>
	 * @result 2
	 *
	 * @property
	 * @name length
	 * @type Number
	 * @cat Core
	 */

	/**
	 * The number of elements currently matched.
	 *
	 * @example $("img").size();
	 * @before <img src="test1.jpg"/> <img src="test2.jpg"/>
	 * @result 2
	 *
	 * @name size
	 * @type Number
	 * @cat Core
	 */
	size: function() {
		return this.length;
	},
	
	length: 0,

	/**
	 * Access all matched elements. This serves as a backwards-compatible
	 * way of accessing all matched elements (other than the jQuery object
	 * itself, which is, in fact, an array of elements).
	 *
	 * @example $("img").get();
	 * @before <img src="test1.jpg"/> <img src="test2.jpg"/>
	 * @result [ <img src="test1.jpg"/> <img src="test2.jpg"/> ]
	 * @desc Selects all images in the document and returns the DOM Elements as an Array
	 *
	 * @name get
	 * @type Array<Element>
	 * @cat Core
	 */

	/**
	 * Access a single matched element. num is used to access the
	 * Nth element matched.
	 *
	 * @example $("img").get(0);
	 * @before <img src="test1.jpg"/> <img src="test2.jpg"/>
	 * @result [ <img src="test1.jpg"/> ]
	 * @desc Selects all images in the document and returns the first one
	 *
	 * @name get
	 * @type Element
	 * @param Number num Access the element in the Nth position.
	 * @cat Core
	 */
	get: function( num ) {
		return num == undefined ?

			// Return a 'clean' array
			jQuery.makeArray( this ) :

			// Return just the object
			this[num];
	},
	
	/**
	 * Set the jQuery object to an array of elements, while maintaining
	 * the stack.
	 *
	 * @example $("img").pushStack([ document.body ]);
	 * @result $("img").pushStack() == [ document.body ]
	 *
	 * @private
	 * @name pushStack
	 * @type jQuery
	 * @param Elements elems An array of elements
	 * @cat Core
	 */
	pushStack: function( a ) {
		var ret = jQuery(a);
		ret.prevObject = this;
		return ret;
	},
	
	/**
	 * Set the jQuery object to an array of elements. This operation is
	 * completely destructive - be sure to use .pushStack() if you wish to maintain
	 * the jQuery stack.
	 *
	 * @example $("img").setArray([ document.body ]);
	 * @result $("img").setArray() == [ document.body ]
	 *
	 * @private
	 * @name setArray
	 * @type jQuery
	 * @param Elements elems An array of elements
	 * @cat Core
	 */
	setArray: function( a ) {
		this.length = 0;
		[].push.apply( this, a );
		return this;
	},

	/**
	 * Execute a function within the context of every matched element.
	 * This means that every time the passed-in function is executed
	 * (which is once for every element matched) the 'this' keyword
	 * points to the specific element.
	 *
	 * Additionally, the function, when executed, is passed a single
	 * argument representing the position of the element in the matched
	 * set.
	 *
	 * @example $("img").each(function(i){
	 *   this.src = "test" + i + ".jpg";
	 * });
	 * @before <img/><img/>
	 * @result <img src="test0.jpg"/><img src="test1.jpg"/>
	 * @desc Iterates over two images and sets their src property
	 *
	 * @name each
	 * @type jQuery
	 * @param Function fn A function to execute
	 * @cat Core
	 */
	each: function( fn, args ) {
		return jQuery.each( this, fn, args );
	},

	/**
	 * Searches every matched element for the object and returns
	 * the index of the element, if found, starting with zero. 
	 * Returns -1 if the object wasn't found.
	 *
	 * @example $("*").index( $('#foobar')[0] ) 
	 * @before <div id="foobar"><b></b><span id="foo"></span></div>
	 * @result 0
	 * @desc Returns the index for the element with ID foobar
	 *
	 * @example $("*").index( $('#foo')[0] ) 
	 * @before <div id="foobar"><b></b><span id="foo"></span></div>
	 * @result 2
	 * @desc Returns the index for the element with ID foo within another element
	 *
	 * @example $("*").index( $('#bar')[0] ) 
	 * @before <div id="foobar"><b></b><span id="foo"></span></div>
	 * @result -1
	 * @desc Returns -1, as there is no element with ID bar
	 *
	 * @name index
	 * @type Number
	 * @param Element subject Object to search for
	 * @cat Core
	 */
	index: function( obj ) {
		var pos = -1;
		this.each(function(i){
			if ( this == obj ) pos = i;
		});
		return pos;
	},

	/**
	 * Access a property on the first matched element.
	 * This method makes it easy to retrieve a property value
	 * from the first matched element.
	 *
	 * @example $("img").attr("src");
	 * @before <img src="test.jpg"/>
	 * @result test.jpg
	 * @desc Returns the src attribute from the first image in the document.
	 *
	 * @name attr
	 * @type Object
	 * @param String name The name of the property to access.
	 * @cat DOM/Attributes
	 */

	/**
	 * Set a key/value object as properties to all matched elements.
	 *
	 * This serves as the best way to set a large number of properties
	 * on all matched elements.
	 *
	 * @example $("img").attr({ src: "test.jpg", alt: "Test Image" });
	 * @before <img/>
	 * @result <img src="test.jpg" alt="Test Image"/>
	 * @desc Sets src and alt attributes to all images.
	 *
	 * @name attr
	 * @type jQuery
	 * @param Map properties Key/value pairs to set as object properties.
	 * @cat DOM/Attributes
	 */

	/**
	 * Set a single property to a value, on all matched elements.
	 *
	 * Can compute values provided as ${formula}, see second example.
	 *
	 * Note that you can't set the name property of input elements in IE.
	 * Use $(html) or .append(html) or .html(html) to create elements
	 * on the fly including the name property.
	 *
	 * @example $("img").attr("src","test.jpg");
	 * @before <img/>
	 * @result <img src="test.jpg"/>
	 * @desc Sets src attribute to all images.
	 *
	 * @example $("img").attr("title", "${this.src}");
	 * @before <img src="test.jpg" />
	 * @result <img src="test.jpg" title="test.jpg" />
	 * @desc Sets title attribute from src attribute, a shortcut for attr(String,Function)
	 *
	 * @name attr
	 * @type jQuery
	 * @param String key The name of the property to set.
	 * @param Object value The value to set the property to.
	 * @cat DOM/Attributes
	 */
	 
	/**
	 * Set a single property to a computed value, on all matched elements.
	 *
	 * Instead of a value, a function is provided, that computes the value.
	 *
	 * @example $("img").attr("title", function() { return this.src });
	 * @before <img src="test.jpg" />
	 * @result <img src="test.jpg" title="test.jpg" />
	 * @desc Sets title attribute from src attribute.
	 *
	 * @example $("img").attr("title", function(index) { return this.title + (i + 1); });
	 * @before <img title="pic" /><img title="pic" /><img title="pic" />
	 * @result <img title="pic1" /><img title="pic2" /><img title="pic3" />
	 * @desc Enumerate title attribute.
	 *
	 * @name attr
	 * @type jQuery
	 * @param String key The name of the property to set.
	 * @param Function value A function returning the value to set.
	 * 	 	  Scope: Current element, argument: Index of current element
	 * @cat DOM/Attributes
	 */
	attr: function( key, value, type ) {
		var obj = key;
		
		// Look for the case where we're accessing a style value
		if ( key.constructor == String )
			if ( value == undefined )
				return this.length && jQuery[ type || "attr" ]( this[0], key ) || undefined;
			else {
				obj = {};
				obj[ key ] = value;
			}
		
		// Check to see if we're setting style values
		return this.each(function(index){
			// Set all the styles
			for ( var prop in obj )
				jQuery.attr(
					type ? this.style : this,
					prop, jQuery.prop(this, obj[prop], type, index, prop)
				);
		});
	},

	/**
	 * Access a style property on the first matched element.
	 * This method makes it easy to retrieve a style property value
	 * from the first matched element.
	 *
	 * @example $("p").css("color");
	 * @before <p style="color:red;">Test Paragraph.</p>
	 * @result "red"
	 * @desc Retrieves the color style of the first paragraph
	 *
	 * @example $("p").css("font-weight");
	 * @before <p style="font-weight: bold;">Test Paragraph.</p>
	 * @result "bold"
	 * @desc Retrieves the font-weight style of the first paragraph.
	 *
	 * @name css
	 * @type String
	 * @param String name The name of the property to access.
	 * @cat CSS
	 */

	/**
	 * Set a key/value object as style properties to all matched elements.
	 *
	 * This serves as the best way to set a large number of style properties
	 * on all matched elements.
	 *
	 * @example $("p").css({ color: "red", background: "blue" });
	 * @before <p>Test Paragraph.</p>
	 * @result <p style="color:red; background:blue;">Test Paragraph.</p>
	 * @desc Sets color and background styles to all p elements.
	 *
	 * @name css
	 * @type jQuery
	 * @param Map properties Key/value pairs to set as style properties.
	 * @cat CSS
	 */

	/**
	 * Set a single style property to a value, on all matched elements.
	 * If a number is provided, it is automatically converted into a pixel value.
	 *
	 * @example $("p").css("color","red");
	 * @before <p>Test Paragraph.</p>
	 * @result <p style="color:red;">Test Paragraph.</p>
	 * @desc Changes the color of all paragraphs to red
	 *
	 * @example $("p").css("left",30);
	 * @before <p>Test Paragraph.</p>
	 * @result <p style="left:30px;">Test Paragraph.</p>
	 * @desc Changes the left of all paragraphs to "30px"
	 *
	 * @name css
	 * @type jQuery
	 * @param String key The name of the property to set.
	 * @param String|Number value The value to set the property to.
	 * @cat CSS
	 */
	css: function( key, value ) {
		return this.attr( key, value, "curCSS" );
	},

	/**
	 * Get the text contents of all matched elements. The result is
	 * a string that contains the combined text contents of all matched
	 * elements. This method works on both HTML and XML documents.
	 *
	 * @example $("p").text();
	 * @before <p><b>Test</b> Paragraph.</p><p>Paraparagraph</p>
	 * @result Test Paragraph.Paraparagraph
	 * @desc Gets the concatenated text of all paragraphs
	 *
	 * @name text
	 * @type String
	 * @cat DOM/Attributes
	 */

	/**
	 * Set the text contents of all matched elements.
	 *
	 * Similar to html(), but escapes HTML (replace "<" and ">" with their
	 * HTML entities).
	 *
	 * @example $("p").text("<b>Some</b> new text.");
	 * @before <p>Test Paragraph.</p>
	 * @result <p>&lt;b&gt;Some&lt;/b&gt; new text.</p>
	 * @desc Sets the text of all paragraphs.
	 *
	 * @example $("p").text("<b>Some</b> new text.", true);
	 * @before <p>Test Paragraph.</p>
	 * @result <p>Some new text.</p>
	 * @desc Sets the text of all paragraphs.
	 *
	 * @name text
	 * @type String
	 * @param String val The text value to set the contents of the element to.
	 * @cat DOM/Attributes
	 */
	text: function(e) {
		if ( typeof e == "string" )
			return this.empty().append( document.createTextNode( e ) );

		var t = "";
		jQuery.each( e || this, function(){
			jQuery.each( this.childNodes, function(){
				if ( this.nodeType != 8 )
					t += this.nodeType != 1 ?
						this.nodeValue : jQuery.fn.text([ this ]);
			});
		});
		return t;
	},

	/**
	 * Wrap all matched elements with a structure of other elements.
	 * This wrapping process is most useful for injecting additional
	 * stucture into a document, without ruining the original semantic
	 * qualities of a document.
	 *
	 * This works by going through the first element
	 * provided (which is generated, on the fly, from the provided HTML)
	 * and finds the deepest ancestor element within its
	 * structure - it is that element that will en-wrap everything else.
	 *
	 * This does not work with elements that contain text. Any necessary text
	 * must be added after the wrapping is done.
	 *
	 * @example $("p").wrap("<div class='wrap'></div>");
	 * @before <p>Test Paragraph.</p>
	 * @result <div class='wrap'><p>Test Paragraph.</p></div>
	 * 
	 * @name wrap
	 * @type jQuery
	 * @param String html A string of HTML, that will be created on the fly and wrapped around the target.
	 * @cat DOM/Manipulation
	 */

	/**
	 * Wrap all matched elements with a structure of other elements.
	 * This wrapping process is most useful for injecting additional
	 * stucture into a document, without ruining the original semantic
	 * qualities of a document.
	 *
	 * This works by going through the first element
	 * provided and finding the deepest ancestor element within its
	 * structure - it is that element that will en-wrap everything else.
	 *
 	 * This does not work with elements that contain text. Any necessary text
	 * must be added after the wrapping is done.
	 *
	 * @example $("p").wrap( document.getElementById('content') );
	 * @before <p>Test Paragraph.</p><div id="content"></div>
	 * @result <div id="content"><p>Test Paragraph.</p></div>
	 *
	 * @name wrap
	 * @type jQuery
	 * @param Element elem A DOM element that will be wrapped around the target.
	 * @cat DOM/Manipulation
	 */
	wrap: function() {
		// The elements to wrap the target around
		var a = jQuery.clean(arguments);

		// Wrap each of the matched elements individually
		return this.each(function(){
			// Clone the structure that we're using to wrap
			var b = a[0].cloneNode(true);

			// Insert it before the element to be wrapped
			this.parentNode.insertBefore( b, this );

			// Find the deepest point in the wrap structure
			while ( b.firstChild )
				b = b.firstChild;

			// Move the matched element to within the wrap structure
			b.appendChild( this );
		});
	},

	/**
	 * Append content to the inside of every matched element.
	 *
	 * This operation is similar to doing an appendChild to all the
	 * specified elements, adding them into the document.
	 *
	 * @example $("p").append("<b>Hello</b>");
	 * @before <p>I would like to say: </p>
	 * @result <p>I would like to say: <b>Hello</b></p>
	 * @desc Appends some HTML to all paragraphs.
	 *
	 * @example $("p").append( $("#foo")[0] );
	 * @before <p>I would like to say: </p><b id="foo">Hello</b>
	 * @result <p>I would like to say: <b id="foo">Hello</b></p>
	 * @desc Appends an Element to all paragraphs.
	 *
	 * @example $("p").append( $("b") );
	 * @before <p>I would like to say: </p><b>Hello</b>
	 * @result <p>I would like to say: <b>Hello</b></p>
	 * @desc Appends a jQuery object (similar to an Array of DOM Elements) to all paragraphs.
	 *
	 * @name append
	 * @type jQuery
	 * @param <Content> content Content to append to the target
	 * @cat DOM/Manipulation
	 * @see prepend(<Content>)
	 * @see before(<Content>)
	 * @see after(<Content>)
	 */
	append: function() {
		return this.domManip(arguments, true, 1, function(a){
			this.appendChild( a );
		});
	},

	/**
	 * Prepend content to the inside of every matched element.
	 *
	 * This operation is the best way to insert elements
	 * inside, at the beginning, of all matched elements.
	 *
	 * @example $("p").prepend("<b>Hello</b>");
	 * @before <p>I would like to say: </p>
	 * @result <p><b>Hello</b>I would like to say: </p>
	 * @desc Prepends some HTML to all paragraphs.
	 *
	 * @example $("p").prepend( $("#foo")[0] );
	 * @before <p>I would like to say: </p><b id="foo">Hello</b>
	 * @result <p><b id="foo">Hello</b>I would like to say: </p>
	 * @desc Prepends an Element to all paragraphs.
	 *	
	 * @example $("p").prepend( $("b") );
	 * @before <p>I would like to say: </p><b>Hello</b>
	 * @result <p><b>Hello</b>I would like to say: </p>
	 * @desc Prepends a jQuery object (similar to an Array of DOM Elements) to all paragraphs.
	 *
	 * @name prepend
	 * @type jQuery
	 * @param <Content> content Content to prepend to the target.
	 * @cat DOM/Manipulation
	 * @see append(<Content>)
	 * @see before(<Content>)
	 * @see after(<Content>)
	 */
	prepend: function() {
		return this.domManip(arguments, true, -1, function(a){
			this.insertBefore( a, this.firstChild );
		});
	},
	
	/**
	 * Insert content before each of the matched elements.
	 *
	 * @example $("p").before("<b>Hello</b>");
	 * @before <p>I would like to say: </p>
	 * @result <b>Hello</b><p>I would like to say: </p>
	 * @desc Inserts some HTML before all paragraphs.
	 *
	 * @example $("p").before( $("#foo")[0] );
	 * @before <p>I would like to say: </p><b id="foo">Hello</b>
	 * @result <b id="foo">Hello</b><p>I would like to say: </p>
	 * @desc Inserts an Element before all paragraphs.
	 *
	 * @example $("p").before( $("b") );
	 * @before <p>I would like to say: </p><b>Hello</b>
	 * @result <b>Hello</b><p>I would like to say: </p>
	 * @desc Inserts a jQuery object (similar to an Array of DOM Elements) before all paragraphs.
	 *
	 * @name before
	 * @type jQuery
	 * @param <Content> content Content to insert before each target.
	 * @cat DOM/Manipulation
	 * @see append(<Content>)
	 * @see prepend(<Content>)
	 * @see after(<Content>)
	 */
	before: function() {
		return this.domManip(arguments, false, 1, function(a){
			this.parentNode.insertBefore( a, this );
		});
	},

	/**
	 * Insert content after each of the matched elements.
	 *
	 * @example $("p").after("<b>Hello</b>");
	 * @before <p>I would like to say: </p>
	 * @result <p>I would like to say: </p><b>Hello</b>
	 * @desc Inserts some HTML after all paragraphs.
	 *
	 * @example $("p").after( $("#foo")[0] );
	 * @before <b id="foo">Hello</b><p>I would like to say: </p>
	 * @result <p>I would like to say: </p><b id="foo">Hello</b>
	 * @desc Inserts an Element after all paragraphs.
	 *
	 * @example $("p").after( $("b") );
	 * @before <b>Hello</b><p>I would like to say: </p>
	 * @result <p>I would like to say: </p><b>Hello</b>
	 * @desc Inserts a jQuery object (similar to an Array of DOM Elements) after all paragraphs.
	 *
	 * @name after
	 * @type jQuery
	 * @param <Content> content Content to insert after each target.
	 * @cat DOM/Manipulation
	 * @see append(<Content>)
	 * @see prepend(<Content>)
	 * @see before(<Content>)
	 */
	after: function() {
		return this.domManip(arguments, false, -1, function(a){
			this.parentNode.insertBefore( a, this.nextSibling );
		});
	},

	/**
	 * End the most recent 'destructive' operation, reverting the list of matched elements
	 * back to its previous state. After an end operation, the list of matched elements will
	 * revert to the last state of matched elements.
	 *
	 * If there was no destructive operation before, an empty set is returned.
	 *
	 * @example $("p").find("span").end();
	 * @before <p><span>Hello</span>, how are you?</p>
	 * @result [ <p>...</p> ]
	 * @desc Selects all paragraphs, finds span elements inside these, and reverts the
	 * selection back to the paragraphs.
	 *
	 * @name end
	 * @type jQuery
	 * @cat DOM/Traversing
	 */
	end: function() {
		return this.prevObject || jQuery([]);
	},

	/**
	 * Searches for all elements that match the specified expression.
	 
	 * This method is a good way to find additional descendant
	 * elements with which to process.
	 *
	 * All searching is done using a jQuery expression. The expression can be
	 * written using CSS 1-3 Selector syntax, or basic XPath.
	 *
	 * @example $("p").find("span");
	 * @before <p><span>Hello</span>, how are you?</p>
	 * @result [ <span>Hello</span> ]
	 * @desc Starts with all paragraphs and searches for descendant span
	 * elements, same as $("p span")
	 *
	 * @name find
	 * @type jQuery
	 * @param String expr An expression to search with.
	 * @cat DOM/Traversing
	 */
	find: function(t) {
		return this.pushStack( jQuery.map( this, function(a){
			return jQuery.find(t,a);
		}), t );
	},

	/**
	 * Clone matched DOM Elements and select the clones. 
	 *
	 * This is useful for moving copies of the elements to another
	 * location in the DOM.
	 *
	 * @example $("b").clone().prependTo("p");
	 * @before <b>Hello</b><p>, how are you?</p>
	 * @result <b>Hello</b><p><b>Hello</b>, how are you?</p>
	 * @desc Clones all b elements (and selects the clones) and prepends them to all paragraphs.
	 *
	 * @name clone
	 * @type jQuery
	 * @param Boolean deep (Optional) Set to false if you don't want to clone all descendant nodes, in addition to the element itself.
	 * @cat DOM/Manipulation
	 */
	clone: function(deep) {
		return this.pushStack( jQuery.map( this, function(a){
			return a.cloneNode( deep != undefined ? deep : true );
		}) );
	},

	/**
	 * Removes all elements from the set of matched elements that do not
	 * match the specified expression(s). This method is used to narrow down
	 * the results of a search.
	 *
	 * Provide a comma-separated list of expressions to apply multiple filters at once.
	 *
	 * @example $("p").filter(".selected")
	 * @before <p class="selected">Hello</p><p>How are you?</p>
	 * @result [ <p class="selected">Hello</p> ]
	 * @desc Selects all paragraphs and removes those without a class "selected".
	 *
	 * @example $("p").filter(".selected, :first")
	 * @before <p>Hello</p><p>Hello Again</p><p class="selected">And Again</p>
	 * @result [ <p>Hello</p>, <p class="selected">And Again</p> ]
	 * @desc Selects all paragraphs and removes those without class "selected" and being the first one.
	 *
	 * @name filter
	 * @type jQuery
	 * @param String expression Expression(s) to search with.
	 * @cat DOM/Traversing
	 */
	 
	/**
	 * Removes all elements from the set of matched elements that do not
	 * pass the specified filter. This method is used to narrow down
	 * the results of a search.
	 *
	 * @example $("p").filter(function(index) {
	 *   return $("ol", this).length == 0;
	 * })
	 * @before <p><ol><li>Hello</li></ol></p><p>How are you?</p>
	 * @result [ <p>How are you?</p> ]
	 * @desc Remove all elements that have a child ol element
	 *
	 * @name filter
	 * @type jQuery
	 * @param Function filter A function to use for filtering
	 * @cat DOM/Traversing
	 */
	filter: function(t) {
		return this.pushStack(
			jQuery.isFunction( t ) &&
			jQuery.grep(this, function(el, index){
				return t.apply(el, [index])
			}) ||

			jQuery.multiFilter(t,this) );
	},

	/**
	 * Removes the specified Element from the set of matched elements. This
	 * method is used to remove a single Element from a jQuery object.
	 *
	 * @example $("p").not( $("#selected")[0] )
	 * @before <p>Hello</p><p id="selected">Hello Again</p>
	 * @result [ <p>Hello</p> ]
	 * @desc Removes the element with the ID "selected" from the set of all paragraphs.
	 *
	 * @name not
	 * @type jQuery
	 * @param Element el An element to remove from the set
	 * @cat DOM/Traversing
	 */

	/**
	 * Removes elements matching the specified expression from the set
	 * of matched elements. This method is used to remove one or more
	 * elements from a jQuery object.
	 *
	 * @example $("p").not("#selected")
	 * @before <p>Hello</p><p id="selected">Hello Again</p>
	 * @result [ <p>Hello</p> ]
	 * @desc Removes the element with the ID "selected" from the set of all paragraphs.
	 *
	 * @name not
	 * @type jQuery
	 * @param String expr An expression with which to remove matching elements
	 * @cat DOM/Traversing
	 */

	/**
	 * Removes any elements inside the array of elements from the set
	 * of matched elements. This method is used to remove one or more
	 * elements from a jQuery object.
	 *
	 * @example $("p").not( $("div p.selected") )
	 * @before <div><p>Hello</p><p class="selected">Hello Again</p></div>
	 * @result [ <p>Hello</p> ]
	 * @desc Removes all elements that match "div p.selected" from the total set of all paragraphs.
	 *
	 * @name not
	 * @type jQuery
	 * @param jQuery elems A set of elements to remove from the jQuery set of matched elements.
	 * @cat DOM/Traversing
	 */
	not: function(t) {
		return this.pushStack(
			t.constructor == String &&
			jQuery.multiFilter(t, this, true) ||

			jQuery.grep(this, function(a) {
				return ( t.constructor == Array || t.jquery )
					? jQuery.inArray( a, t ) < 0
					: a != t;
			})
		);
	},

	/**
	 * Adds more elements, matched by the given expression,
	 * to the set of matched elements.
	 *
	 * @example $("p").add("span")
	 * @before <p>Hello</p><span>Hello Again</span>
	 * @result [ <p>Hello</p>, <span>Hello Again</span> ]
	 *
	 * @name add
	 * @type jQuery
	 * @param String expr An expression whose matched elements are added
	 * @cat DOM/Traversing
	 */
	 
	/**
	 * Adds more elements, created on the fly, to the set of
	 * matched elements.
	 *
	 * @example $("p").add("<span>Again</span>")
	 * @before <p>Hello</p>
	 * @result [ <p>Hello</p>, <span>Again</span> ]
	 *
	 * @name add
	 * @type jQuery
	 * @param String html A string of HTML to create on the fly.
	 * @cat DOM/Traversing
	 */

	/**
	 * Adds one or more Elements to the set of matched elements.
	 *
	 * @example $("p").add( document.getElementById("a") )
	 * @before <p>Hello</p><p><span id="a">Hello Again</span></p>
	 * @result [ <p>Hello</p>, <span id="a">Hello Again</span> ]
	 *
	 * @example $("p").add( document.forms[0].elements )
	 * @before <p>Hello</p><p><form><input/><button/></form>
	 * @result [ <p>Hello</p>, <input/>, <button/> ]
	 *
	 * @name add
	 * @type jQuery
	 * @param Element|Array<Element> elements One or more Elements to add
	 * @cat DOM/Traversing
	 */
	add: function(t) {
		return this.pushStack( jQuery.merge(
			this.get(),
			t.constructor == String ?
				jQuery(t).get() :
				t.length != undefined && (!t.nodeName || t.nodeName == "FORM") ?
					t : [t] )
		);
	},

	/**
	 * Checks the current selection against an expression and returns true,
	 * if at least one element of the selection fits the given expression.
	 *
	 * Does return false, if no element fits or the expression is not valid.
	 *
	 * filter(String) is used internally, therefore all rules that apply there
	 * apply here, too.
	 *
	 * @example $("input[@type='checkbox']").parent().is("form")
	 * @before <form><input type="checkbox" /></form>
	 * @result true
	 * @desc Returns true, because the parent of the input is a form element
	 * 
	 * @example $("input[@type='checkbox']").parent().is("form")
	 * @before <form><p><input type="checkbox" /></p></form>
	 * @result false
	 * @desc Returns false, because the parent of the input is a p element
	 *
	 * @name is
	 * @type Boolean
	 * @param String expr The expression with which to filter
	 * @cat DOM/Traversing
	 */
	is: function(expr) {
		return expr ? jQuery.filter(expr,this).r.length > 0 : false;
	},
	
	/**
	 * Get the current value of the first matched element.
	 *
	 * @example $("input").val();
	 * @before <input type="text" value="some text"/>
	 * @result "some text"
	 *
	 * @name val
	 * @type String
	 * @cat DOM/Attributes
	 */
	
	/**
	 * Set the value of every matched element.
	 *
	 * @example $("input").val("test");
	 * @before <input type="text" value="some text"/>
	 * @result <input type="text" value="test"/>
	 *
	 * @name val
	 * @type jQuery
	 * @param String val Set the property to the specified value.
	 * @cat DOM/Attributes
	 */
	val: function( val ) {
		return val == undefined ?
			( this.length ? this[0].value : null ) :
			this.attr( "value", val );
	},
	
	/**
	 * Get the html contents of the first matched element.
	 * This property is not available on XML documents.
	 *
	 * @example $("div").html();
	 * @before <div><input/></div>
	 * @result <input/>
	 *
	 * @name html
	 * @type String
	 * @cat DOM/Attributes
	 */
	
	/**
	 * Set the html contents of every matched element.
	 * This property is not available on XML documents.
	 *
	 * @example $("div").html("<b>new stuff</b>");
	 * @before <div><input/></div>
	 * @result <div><b>new stuff</b></div>
	 *
	 * @name html
	 * @type jQuery
	 * @param String val Set the html contents to the specified value.
	 * @cat DOM/Attributes
	 */
	html: function( val ) {
		return val == undefined ?
			( this.length ? this[0].innerHTML : null ) :
			this.empty().append( val );
	},
	
	/**
	 * @private
	 * @name domManip
	 * @param Array args
	 * @param Boolean table Insert TBODY in TABLEs if one is not found.
	 * @param Number dir If dir<0, process args in reverse order.
	 * @param Function fn The function doing the DOM manipulation.
	 * @type jQuery
	 * @cat Core
	 */
	domManip: function(args, table, dir, fn){
		var clone = this.length > 1; 
		var a = jQuery.clean(args);
		if ( dir < 0 )
			a.reverse();

		return this.each(function(){
			var obj = this;

			if ( table && jQuery.nodeName(this, "table") && jQuery.nodeName(a[0], "tr") )
				obj = this.getElementsByTagName("tbody")[0] || this.appendChild(document.createElement("tbody"));

			jQuery.each( a, function(){
				fn.apply( obj, [ clone ? this.cloneNode(true) : this ] );
			});

		});
	}
};

/**
 * Extends the jQuery object itself. Can be used to add functions into
 * the jQuery namespace and to add plugin methods (plugins).
 * 
 * @example jQuery.fn.extend({
 *   check: function() {
 *     return this.each(function() { this.checked = true; });
 *   },
 *   uncheck: function() {
 *     return this.each(function() { this.checked = false; });
 *   }
 * });
 * $("input[@type=checkbox]").check();
 * $("input[@type=radio]").uncheck();
 * @desc Adds two plugin methods.
 *
 * @example jQuery.extend({
 *   min: function(a, b) { return a < b ? a : b; },
 *   max: function(a, b) { return a > b ? a : b; }
 * });
 * @desc Adds two functions into the jQuery namespace
 *
 * @name $.extend
 * @param Object prop The object that will be merged into the jQuery object
 * @type Object
 * @cat Core
 */

/**
 * Extend one object with one or more others, returning the original,
 * modified, object. This is a great utility for simple inheritance.
 * 
 * @example var settings = { validate: false, limit: 5, name: "foo" };
 * var options = { validate: true, name: "bar" };
 * jQuery.extend(settings, options);
 * @result settings == { validate: true, limit: 5, name: "bar" }
 * @desc Merge settings and options, modifying settings
 *
 * @example var defaults = { validate: false, limit: 5, name: "foo" };
 * var options = { validate: true, name: "bar" };
 * var settings = jQuery.extend({}, defaults, options);
 * @result settings == { validate: true, limit: 5, name: "bar" }
 * @desc Merge defaults and options, without modifying the defaults
 *
 * @name $.extend
 * @param Object target The object to extend
 * @param Object prop1 The object that will be merged into the first.
 * @param Object propN (optional) More objects to merge into the first
 * @type Object
 * @cat JavaScript
 */
jQuery.extend = jQuery.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0],
		a = 1;

	// extend jQuery itself if only one argument is passed
	if ( arguments.length == 1 ) {
		target = this;
		a = 0;
	}
	var prop;
	while (prop = arguments[a++])
		// Extend the base object
		for ( var i in prop ) target[i] = prop[i];

	// Return the modified object
	return target;
};

jQuery.extend({
	/**
	 * Run this function to give control of the $ variable back
	 * to whichever library first implemented it. This helps to make 
	 * sure that jQuery doesn't conflict with the $ object
	 * of other libraries.
	 *
	 * By using this function, you will only be able to access jQuery
	 * using the 'jQuery' variable. For example, where you used to do
	 * $("div p"), you now must do jQuery("div p").
	 *
	 * @example jQuery.noConflict();
	 * // Do something with jQuery
	 * jQuery("div p").hide();
	 * // Do something with another library's $()
	 * $("content").style.display = 'none';
	 * @desc Maps the original object that was referenced by $ back to $
	 *
	 * @example jQuery.noConflict();
	 * (function($) { 
	 *   $(function() {
	 *     // more code using $ as alias to jQuery
	 *   });
	 * })(jQuery);
	 * // other code using $ as an alias to the other library
	 * @desc Reverts the $ alias and then creates and executes a
	 * function to provide the $ as a jQuery alias inside the functions
	 * scope. Inside the function the original $ object is not available.
	 * This works well for most plugins that don't rely on any other library.
	 * 
	 *
	 * @name $.noConflict
	 * @type undefined
	 * @cat Core 
	 */
	noConflict: function() {
		if ( jQuery._$ )
			$ = jQuery._$;
		return jQuery;
	},

	// This may seem like some crazy code, but trust me when I say that this
	// is the only cross-browser way to do this. --John
	isFunction: function( fn ) {
		return !!fn && typeof fn != "string" &&
			typeof fn[0] == "undefined" && /function/i.test( fn + "" );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
	},

	/**
	 * A generic iterator function, which can be used to seemlessly
	 * iterate over both objects and arrays. This function is not the same
	 * as $().each() - which is used to iterate, exclusively, over a jQuery
	 * object. This function can be used to iterate over anything.
	 *
	 * The callback has two arguments:the key (objects) or index (arrays) as first
	 * the first, and the value as the second.
	 *
	 * @example $.each( [0,1,2], function(i, n){
	 *   alert( "Item #" + i + ": " + n );
	 * });
	 * @desc This is an example of iterating over the items in an array,
	 * accessing both the current item and its index.
	 *
	 * @example $.each( { name: "John", lang: "JS" }, function(i, n){
	 *   alert( "Name: " + i + ", Value: " + n );
	 * });
	 *
	 * @desc This is an example of iterating over the properties in an
	 * Object, accessing both the current item and its key.
	 *
	 * @name $.each
	 * @param Object obj The object, or array, to iterate over.
	 * @param Function fn The function that will be executed on every object.
	 * @type Object
	 * @cat JavaScript
	 */
	// args is for internal usage only
	each: function( obj, fn, args ) {
		if ( obj.length == undefined )
			for ( var i in obj )
				fn.apply( obj[i], args || [i, obj[i]] );
		else
			for ( var i = 0, ol = obj.length; i < ol; i++ )
				if ( fn.apply( obj[i], args || [i, obj[i]] ) === false ) break;
		return obj;
	},
	
	prop: function(elem, value, type, index, prop){
			// Handle executable functions
			if ( jQuery.isFunction( value ) )
				return value.call( elem, [index] );
				
			// exclude the following css properties to add px
			var exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i;

			// Handle passing in a number to a CSS property
			if ( value.constructor == Number && type == "curCSS" && !exclude.test(prop) )
				return value + "px";

			return value;
	},

	className: {
		// internal only, use addClass("class")
		add: function( elem, c ){
			jQuery.each( c.split(/\s+/), function(i, cur){
				if ( !jQuery.className.has( elem.className, cur ) )
					elem.className += ( elem.className ? " " : "" ) + cur;
			});
		},

		// internal only, use removeClass("class")
		remove: function( elem, c ){
			elem.className = c ?
				jQuery.grep( elem.className.split(/\s+/), function(cur){
					return !jQuery.className.has( c, cur );	
				}).join(" ") : "";
		},

		// internal only, use is(".class")
		has: function( t, c ) {
			t = t.className || t;
			return t && new RegExp("(^|\\s)" + c + "(\\s|$)").test( t );
		}
	},

	/**
	 * Swap in/out style options.
	 * @private
	 */
	swap: function(e,o,f) {
		for ( var i in o ) {
			e.style["old"+i] = e.style[i];
			e.style[i] = o[i];
		}
		f.apply( e, [] );
		for ( var i in o )
			e.style[i] = e.style["old"+i];
	},

	css: function(e,p) {
		if ( p == "height" || p == "width" ) {
			var old = {}, oHeight, oWidth, d = ["Top","Bottom","Right","Left"];

			jQuery.each( d, function(){
				old["padding" + this] = 0;
				old["border" + this + "Width"] = 0;
			});

			jQuery.swap( e, old, function() {
				if (jQuery.css(e,"display") != "none") {
					oHeight = e.offsetHeight;
					oWidth = e.offsetWidth;
				} else {
					e = jQuery(e.cloneNode(true))
						.find(":radio").removeAttr("checked").end()
						.css({
							visibility: "hidden", position: "absolute", display: "block", right: "0", left: "0"
						}).appendTo(e.parentNode)[0];

					var parPos = jQuery.css(e.parentNode,"position");
					if ( parPos == "" || parPos == "static" )
						e.parentNode.style.position = "relative";

					oHeight = e.clientHeight;
					oWidth = e.clientWidth;

					if ( parPos == "" || parPos == "static" )
						e.parentNode.style.position = "static";

					e.parentNode.removeChild(e);
				}
			});

			return p == "height" ? oHeight : oWidth;
		}

		return jQuery.curCSS( e, p );
	},

	curCSS: function(elem, prop, force) {
		var ret;
		
		if (prop == "opacity" && jQuery.browser.msie)
			return jQuery.attr(elem.style, "opacity");
			
		if (prop == "float" || prop == "cssFloat")
		    prop = jQuery.browser.msie ? "styleFloat" : "cssFloat";

		if (!force && elem.style[prop])
			ret = elem.style[prop];

		else if (document.defaultView && document.defaultView.getComputedStyle) {

			if (prop == "cssFloat" || prop == "styleFloat")
				prop = "float";

			prop = prop.replace(/([A-Z])/g,"-$1").toLowerCase();
			var cur = document.defaultView.getComputedStyle(elem, null);

			if ( cur )
				ret = cur.getPropertyValue(prop);
			else if ( prop == "display" )
				ret = "none";
			else
				jQuery.swap(elem, { display: "block" }, function() {
				    var c = document.defaultView.getComputedStyle(this, "");
				    ret = c && c.getPropertyValue(prop) || "";
				});

		} else if (elem.currentStyle) {

			var newProp = prop.replace(/\-(\w)/g,function(m,c){return c.toUpperCase();});
			ret = elem.currentStyle[prop] || elem.currentStyle[newProp];
			
		}

		return ret;
	},
	
	clean: function(a) {
		var r = [];

		jQuery.each( a, function(i,arg){
			if ( !arg ) return;

			if ( arg.constructor == Number )
				arg = arg.toString();
			
			 // Convert html string into DOM nodes
			if ( typeof arg == "string" ) {
				// Trim whitespace, otherwise indexOf won't work as expected
				var s = jQuery.trim(arg), div = document.createElement("div"), tb = [];

				var wrap =
					 // option or optgroup
					!s.indexOf("<opt") &&
					[1, "<select>", "</select>"] ||
					
					(!s.indexOf("<thead") || !s.indexOf("<tbody") || !s.indexOf("<tfoot")) &&
					[1, "<table>", "</table>"] ||
					
					!s.indexOf("<tr") &&
					[2, "<table><tbody>", "</tbody></table>"] ||
					
				 	// <thead> matched above
					(!s.indexOf("<td") || !s.indexOf("<th")) &&
					[3, "<table><tbody><tr>", "</tr></tbody></table>"] ||
					
					[0,"",""];

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + s + wrap[2];
				
				// Move to the right depth
				while ( wrap[0]-- )
					div = div.firstChild;
				
				// Remove IE's autoinserted <tbody> from table fragments
				if ( jQuery.browser.msie ) {
					
					// String was a <table>, *may* have spurious <tbody>
					if ( !s.indexOf("<table") && s.indexOf("<tbody") < 0 ) 
						tb = div.firstChild && div.firstChild.childNodes;
						
					// String was a bare <thead> or <tfoot>
					else if ( wrap[1] == "<table>" && s.indexOf("<tbody") < 0 )
						tb = div.childNodes;

					for ( var n = tb.length-1; n >= 0 ; --n )
						if ( jQuery.nodeName(tb[n], "tbody") && !tb[n].childNodes.length )
							tb[n].parentNode.removeChild(tb[n]);
					
				}
				
				arg = div.childNodes;
			}

			if ( arg.length === 0 )
				return;
			
			if ( arg[0] == undefined )
				r.push( arg );
			else
				r = jQuery.merge( r, arg );

		});

		return r;
	},
	
	attr: function(elem, name, value){
		var fix = {
			"for": "htmlFor",
			"class": "className",
			"float": jQuery.browser.msie ? "styleFloat" : "cssFloat",
			cssFloat: jQuery.browser.msie ? "styleFloat" : "cssFloat",
			innerHTML: "innerHTML",
			className: "className",
			value: "value",
			disabled: "disabled",
			checked: "checked",
			readonly: "readOnly",
			selected: "selected"
		};
		
		// IE actually uses filters for opacity ... elem is actually elem.style
		if ( name == "opacity" && jQuery.browser.msie && value != undefined ) {
			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			elem.zoom = 1; 

			// Set the alpha filter to set the opacity
			return elem.filter = elem.filter.replace(/alpha\([^\)]*\)/gi,"") +
				( value == 1 ? "" : "alpha(opacity=" + value * 100 + ")" );

		} else if ( name == "opacity" && jQuery.browser.msie )
			return elem.filter ? 
				parseFloat( elem.filter.match(/alpha\(opacity=(.*)\)/)[1] ) / 100 : 1;
		
		// Mozilla doesn't play well with opacity 1
		if ( name == "opacity" && jQuery.browser.mozilla && value == 1 )
			value = 0.9999;

		// Certain attributes only work when accessed via the old DOM 0 way
		if ( fix[name] ) {
			if ( value != undefined ) elem[fix[name]] = value;
			return elem[fix[name]];

		} else if ( value == undefined && jQuery.browser.msie && jQuery.nodeName(elem, "form") && (name == "action" || name == "method") )
			return elem.getAttributeNode(name).nodeValue;

		// IE elem.getAttribute passes even for style
		else if ( elem.tagName ) {
			if ( value != undefined ) elem.setAttribute( name, value );
			return elem.getAttribute( name );

		} else {
			name = name.replace(/-([a-z])/ig,function(z,b){return b.toUpperCase();});
			if ( value != undefined ) elem[name] = value;
			return elem[name];
		}
	},
	
	/**
	 * Remove the whitespace from the beginning and end of a string.
	 *
	 * @example $.trim("  hello, how are you?  ");
	 * @result "hello, how are you?"
	 *
	 * @name $.trim
	 * @type String
	 * @param String str The string to trim.
	 * @cat JavaScript
	 */
	trim: function(t){
		return t.replace(/^\s+|\s+$/g, "");
	},

	makeArray: function( a ) {
		var r = [];

		if ( a.constructor != Array )
			for ( var i = 0, al = a.length; i < al; i++ )
				r.push( a[i] );
		else
			r = a.slice( 0 );

		return r;
	},

	inArray: function( b, a ) {
		for ( var i = 0, al = a.length; i < al; i++ )
			if ( a[i] == b )
				return i;
		return -1;
	},

	/**
	 * Merge two arrays together, removing all duplicates.
	 *
	 * The result is the altered first argument with
	 * the unique elements from the second array added.
	 *
	 * @example $.merge( [0,1,2], [2,3,4] )
	 * @result [0,1,2,3,4]
	 * @desc Merges two arrays, removing the duplicate 2
	 *
	 * @example var array = [3,2,1];
	 * $.merge( array, [4,3,2] )
	 * @result array == [3,2,1,4]
	 * @desc Merges two arrays, removing the duplicates 3 and 2
	 *
	 * @name $.merge
	 * @type Array
	 * @param Array first The first array to merge, the unique elements of second added.
	 * @param Array second The second array to merge into the first, unaltered.
	 * @cat JavaScript
	 */
	merge: function(first, second) {
		var r = [].slice.call( first, 0 );

		// Now check for duplicates between the two arrays
		// and only add the unique items
		for ( var i = 0, sl = second.length; i < sl; i++ )
			// Check for duplicates
			if ( jQuery.inArray( second[i], r ) == -1 )
				// The item is unique, add it
				first.push( second[i] );

		return first;
	},

	/**
	 * Filter items out of an array, by using a filter function.
	 *
	 * The specified function will be passed two arguments: The
	 * current array item and the index of the item in the array. The
	 * function must return 'true' to keep the item in the array, 
	 * false to remove it.
	 *
	 * @example $.grep( [0,1,2], function(i){
	 *   return i > 0;
	 * });
	 * @result [1, 2]
	 *
	 * @name $.grep
	 * @type Array
	 * @param Array array The Array to find items in.
	 * @param Function fn The function to process each item against.
	 * @param Boolean inv Invert the selection - select the opposite of the function.
	 * @cat JavaScript
	 */
	grep: function(elems, fn, inv) {
		// If a string is passed in for the function, make a function
		// for it (a handy shortcut)
		if ( typeof fn == "string" )
			fn = new Function("a","i","return " + fn);

		var result = [];

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, el = elems.length; i < el; i++ )
			if ( !inv && fn(elems[i],i) || inv && !fn(elems[i],i) )
				result.push( elems[i] );

		return result;
	},

	/**
	 * Translate all items in an array to another array of items.
	 *
	 * The translation function that is provided to this method is 
	 * called for each item in the array and is passed one argument: 
	 * The item to be translated.
	 *
	 * The function can then return the translated value, 'null'
	 * (to remove the item), or  an array of values - which will
	 * be flattened into the full array.
	 *
	 * @example $.map( [0,1,2], function(i){
	 *   return i + 4;
	 * });
	 * @result [4, 5, 6]
	 * @desc Maps the original array to a new one and adds 4 to each value.
	 *
	 * @example $.map( [0,1,2], function(i){
	 *   return i > 0 ? i + 1 : null;
	 * });
	 * @result [2, 3]
	 * @desc Maps the original array to a new one and adds 1 to each
	 * value if it is bigger then zero, otherwise it's removed-
	 * 
	 * @example $.map( [0,1,2], function(i){
	 *   return [ i, i + 1 ];
	 * });
	 * @result [0, 1, 1, 2, 2, 3]
	 * @desc Maps the original array to a new one, each element is added
	 * with it's original value and the value plus one.
	 *
	 * @name $.map
	 * @type Array
	 * @param Array array The Array to translate.
	 * @param Function fn The function to process each item against.
	 * @cat JavaScript
	 */
	map: function(elems, fn) {
		// If a string is passed in for the function, make a function
		// for it (a handy shortcut)
		if ( typeof fn == "string" )
			fn = new Function("a","return " + fn);

		var result = [], r = [];

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, el = elems.length; i < el; i++ ) {
			var val = fn(elems[i],i);

			if ( val !== null && val != undefined ) {
				if ( val.constructor != Array ) val = [val];
				result = result.concat( val );
			}
		}

		var r = result.length ? [ result[0] ] : [];

		check: for ( var i = 1, rl = result.length; i < rl; i++ ) {
			for ( var j = 0; j < i; j++ )
				if ( result[i] == r[j] )
					continue check;

			r.push( result[i] );
		}

		return r;
	}
});

/**
 * Contains flags for the useragent, read from navigator.userAgent.
 * Available flags are: safari, opera, msie, mozilla
 *
 * This property is available before the DOM is ready, therefore you can
 * use it to add ready events only for certain browsers.
 *
 * There are situations where object detections is not reliable enough, in that
 * cases it makes sense to use browser detection. Simply try to avoid both!
 *
 * A combination of browser and object detection yields quite reliable results.
 *
 * @example $.browser.msie
 * @desc Returns true if the current useragent is some version of microsoft's internet explorer
 *
 * @example if($.browser.safari) { $( function() { alert("this is safari!"); } ); }
 * @desc Alerts "this is safari!" only for safari browsers
 *
 * @property
 * @name $.browser
 * @type Boolean
 * @cat JavaScript
 */
 
/*
 * Whether the W3C compliant box model is being used.
 *
 * @property
 * @name $.boxModel
 * @type Boolean
 * @cat JavaScript
 */
new function() {
	var b = navigator.userAgent.toLowerCase();

	// Figure out what browser is being used
	jQuery.browser = {
		safari: /webkit/.test(b),
		opera: /opera/.test(b),
		msie: /msie/.test(b) && !/opera/.test(b),
		mozilla: /mozilla/.test(b) && !/(compatible|webkit)/.test(b)
	};

	// Check to see if the W3C box model is being used
	jQuery.boxModel = !jQuery.browser.msie || document.compatMode == "CSS1Compat";
};

/**
 * Get a set of elements containing the unique parents of the matched
 * set of elements.
 *
 * Can be filtered with an optional expressions.
 *
 * @example $("p").parent()
 * @before <div><p>Hello</p><p>Hello</p></div>
 * @result [ <div><p>Hello</p><p>Hello</p></div> ]
 * @desc Find the parent element of each paragraph.
 *
 * @example $("p").parent(".selected")
 * @before <div><p>Hello</p></div><div class="selected"><p>Hello Again</p></div>
 * @result [ <div class="selected"><p>Hello Again</p></div> ]
 * @desc Find the parent element of each paragraph with a class "selected".
 *
 * @name parent
 * @type jQuery
 * @param String expr (optional) An expression to filter the parents with
 * @cat DOM/Traversing
 */

/**
 * Get a set of elements containing the unique ancestors of the matched
 * set of elements (except for the root element).
 *
 * Can be filtered with an optional expressions.
 *
 * @example $("span").parents()
 * @before <html><body><div><p><span>Hello</span></p><span>Hello Again</span></div></body></html>
 * @result [ <body>...</body>, <div>...</div>, <p><span>Hello</span></p> ]
 * @desc Find all parent elements of each span.
 *
 * @example $("span").parents("p")
 * @before <html><body><div><p><span>Hello</span></p><span>Hello Again</span></div></body></html>
 * @result [ <p><span>Hello</span></p> ]
 * @desc Find all parent elements of each span that is a paragraph.
 *
 * @name parents
 * @type jQuery
 * @param String expr (optional) An expression to filter the ancestors with
 * @cat DOM/Traversing
 */

/**
 * Get a set of elements containing the unique next siblings of each of the
 * matched set of elements.
 *
 * It only returns the very next sibling, not all next siblings.
 *
 * Can be filtered with an optional expressions.
 *
 * @example $("p").next()
 * @before <p>Hello</p><p>Hello Again</p><div><span>And Again</span></div>
 * @result [ <p>Hello Again</p>, <div><span>And Again</span></div> ]
 * @desc Find the very next sibling of each paragraph.
 *
 * @example $("p").next(".selected")
 * @before <p>Hello</p><p class="selected">Hello Again</p><div><span>And Again</span></div>
 * @result [ <p class="selected">Hello Again</p> ]
 * @desc Find the very next sibling of each paragraph that has a class "selected".
 *
 * @name next
 * @type jQuery
 * @param String expr (optional) An expression to filter the next Elements with
 * @cat DOM/Traversing
 */

/**
 * Get a set of elements containing the unique previous siblings of each of the
 * matched set of elements.
 *
 * Can be filtered with an optional expressions.
 *
 * It only returns the immediately previous sibling, not all previous siblings.
 *
 * @example $("p").prev()
 * @before <p>Hello</p><div><span>Hello Again</span></div><p>And Again</p>
 * @result [ <div><span>Hello Again</span></div> ]
 * @desc Find the very previous sibling of each paragraph.
 *
 * @example $("p").prev(".selected")
 * @before <div><span>Hello</span></div><p class="selected">Hello Again</p><p>And Again</p>
 * @result [ <div><span>Hello</span></div> ]
 * @desc Find the very previous sibling of each paragraph that has a class "selected".
 *
 * @name prev
 * @type jQuery
 * @param String expr (optional) An expression to filter the previous Elements with
 * @cat DOM/Traversing
 */

/**
 * Get a set of elements containing all of the unique siblings of each of the
 * matched set of elements.
 *
 * Can be filtered with an optional expressions.
 *
 * @example $("div").siblings()
 * @before <p>Hello</p><div><span>Hello Again</span></div><p>And Again</p>
 * @result [ <p>Hello</p>, <p>And Again</p> ]
 * @desc Find all siblings of each div.
 *
 * @example $("div").siblings(".selected")
 * @before <div><span>Hello</span></div><p class="selected">Hello Again</p><p>And Again</p>
 * @result [ <p class="selected">Hello Again</p> ]
 * @desc Find all siblings with a class "selected" of each div.
 *
 * @name siblings
 * @type jQuery
 * @param String expr (optional) An expression to filter the sibling Elements with
 * @cat DOM/Traversing
 */

/**
 * Get a set of elements containing all of the unique children of each of the
 * matched set of elements.
 *
 * Can be filtered with an optional expressions.
 *
 * @example $("div").children()
 * @before <p>Hello</p><div><span>Hello Again</span></div><p>And Again</p>
 * @result [ <span>Hello Again</span> ]
 * @desc Find all children of each div.
 *
 * @example $("div").children(".selected")
 * @before <div><span>Hello</span><p class="selected">Hello Again</p><p>And Again</p></div>
 * @result [ <p class="selected">Hello Again</p> ]
 * @desc Find all children with a class "selected" of each div.
 *
 * @name children
 * @type jQuery
 * @param String expr (optional) An expression to filter the child Elements with
 * @cat DOM/Traversing
 */
jQuery.each({
	parent: "a.parentNode",
	parents: "jQuery.parents(a)",
	next: "jQuery.nth(a,2,'nextSibling')",
	prev: "jQuery.nth(a,2,'previousSibling')",
	siblings: "jQuery.sibling(a.parentNode.firstChild,a)",
	children: "jQuery.sibling(a.firstChild)"
}, function(i,n){
	jQuery.fn[ i ] = function(a) {
		var ret = jQuery.map(this,n);
		if ( a && typeof a == "string" )
			ret = jQuery.multiFilter(a,ret);
		return this.pushStack( ret );
	};
});

/**
 * Append all of the matched elements to another, specified, set of elements.
 * This operation is, essentially, the reverse of doing a regular
 * $(A).append(B), in that instead of appending B to A, you're appending
 * A to B.
 *
 * @example $("p").appendTo("#foo");
 * @before <p>I would like to say: </p><div id="foo"></div>
 * @result <div id="foo"><p>I would like to say: </p></div>
 * @desc Appends all paragraphs to the element with the ID "foo"
 *
 * @name appendTo
 * @type jQuery
 * @param <Content> content Content to append to the selected element to.
 * @cat DOM/Manipulation
 * @see append(<Content>)
 */

/**
 * Prepend all of the matched elements to another, specified, set of elements.
 * This operation is, essentially, the reverse of doing a regular
 * $(A).prepend(B), in that instead of prepending B to A, you're prepending
 * A to B.
 *
 * @example $("p").prependTo("#foo");
 * @before <p>I would like to say: </p><div id="foo"><b>Hello</b></div>
 * @result <div id="foo"><p>I would like to say: </p><b>Hello</b></div>
 * @desc Prepends all paragraphs to the element with the ID "foo"
 *
 * @name prependTo
 * @type jQuery
 * @param <Content> content Content to prepend to the selected element to.
 * @cat DOM/Manipulation
 * @see prepend(<Content>)
 */

/**
 * Insert all of the matched elements before another, specified, set of elements.
 * This operation is, essentially, the reverse of doing a regular
 * $(A).before(B), in that instead of inserting B before A, you're inserting
 * A before B.
 *
 * @example $("p").insertBefore("#foo");
 * @before <div id="foo">Hello</div><p>I would like to say: </p>
 * @result <p>I would like to say: </p><div id="foo">Hello</div>
 * @desc Same as $("#foo").before("p")
 *
 * @name insertBefore
 * @type jQuery
 * @param <Content> content Content to insert the selected element before.
 * @cat DOM/Manipulation
 * @see before(<Content>)
 */

/**
 * Insert all of the matched elements after another, specified, set of elements.
 * This operation is, essentially, the reverse of doing a regular
 * $(A).after(B), in that instead of inserting B after A, you're inserting
 * A after B.
 *
 * @example $("p").insertAfter("#foo");
 * @before <p>I would like to say: </p><div id="foo">Hello</div>
 * @result <div id="foo">Hello</div><p>I would like to say: </p>
 * @desc Same as $("#foo").after("p")
 *
 * @name insertAfter
 * @type jQuery
 * @param <Content> content Content to insert the selected element after.
 * @cat DOM/Manipulation
 * @see after(<Content>)
 */

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after"
}, function(i,n){
	jQuery.fn[ i ] = function(){
		var a = arguments;
		return this.each(function(){
			for ( var j = 0, al = a.length; j < al; j++ )
				jQuery(a[j])[n]( this );
		});
	};
});

/**
 * Remove an attribute from each of the matched elements.
 *
 * @example $("input").removeAttr("disabled")
 * @before <input disabled="disabled"/>
 * @result <input/>
 *
 * @name removeAttr
 * @type jQuery
 * @param String name The name of the attribute to remove.
 * @cat DOM/Attributes
 */

/**
 * Adds the specified class(es) to each of the set of matched elements.
 *
 * @example $("p").addClass("selected")
 * @before <p>Hello</p>
 * @result [ <p class="selected">Hello</p> ]
 *
 * @example $("p").addClass("selected highlight")
 * @before <p>Hello</p>
 * @result [ <p class="selected highlight">Hello</p> ]
 *
 * @name addClass
 * @type jQuery
 * @param String class One or more CSS classes to add to the elements
 * @cat DOM/Attributes
 * @see removeClass(String)
 */

/**
 * Removes all or the specified class(es) from the set of matched elements.
 *
 * @example $("p").removeClass()
 * @before <p class="selected">Hello</p>
 * @result [ <p>Hello</p> ]
 *
 * @example $("p").removeClass("selected")
 * @before <p class="selected first">Hello</p>
 * @result [ <p class="first">Hello</p> ]
 *
 * @example $("p").removeClass("selected highlight")
 * @before <p class="highlight selected first">Hello</p>
 * @result [ <p class="first">Hello</p> ]
 *
 * @name removeClass
 * @type jQuery
 * @param String class (optional) One or more CSS classes to remove from the elements
 * @cat DOM/Attributes
 * @see addClass(String)
 */

/**
 * Adds the specified class if it is not present, removes it if it is
 * present.
 *
 * @example $("p").toggleClass("selected")
 * @before <p>Hello</p><p class="selected">Hello Again</p>
 * @result [ <p class="selected">Hello</p>, <p>Hello Again</p> ]
 *
 * @name toggleClass
 * @type jQuery
 * @param String class A CSS class with which to toggle the elements
 * @cat DOM/Attributes
 */

/**
 * Removes all matched elements from the DOM. This does NOT remove them from the
 * jQuery object, allowing you to use the matched elements further.
 *
 * Can be filtered with an optional expressions.
 *
 * @example $("p").remove();
 * @before <p>Hello</p> how are <p>you?</p>
 * @result how are
 *
 * @example $("p").remove(".hello");
 * @before <p class="hello">Hello</p> how are <p>you?</p>
 * @result how are <p>you?</p>
 *
 * @name remove
 * @type jQuery
 * @param String expr (optional) A jQuery expression to filter elements by.
 * @cat DOM/Manipulation
 */

/**
 * Removes all child nodes from the set of matched elements.
 *
 * @example $("p").empty()
 * @before <p>Hello, <span>Person</span> <a href="#">and person</a></p>
 * @result [ <p></p> ]
 *
 * @name empty
 * @type jQuery
 * @cat DOM/Manipulation
 */

jQuery.each( {
	removeAttr: function( key ) {
		jQuery.attr( this, key, "" );
		this.removeAttribute( key );
	},
	addClass: function(c){
		jQuery.className.add(this,c);
	},
	removeClass: function(c){
		jQuery.className.remove(this,c);
	},
	toggleClass: function( c ){
		jQuery.className[ jQuery.className.has(this,c) ? "remove" : "add" ](this, c);
	},
	remove: function(a){
		if ( !a || jQuery.filter( a, [this] ).r.length )
			this.parentNode.removeChild( this );
	},
	empty: function() {
		while ( this.firstChild )
			this.removeChild( this.firstChild );
	}
}, function(i,n){
	jQuery.fn[ i ] = function() {
		return this.each( n, arguments );
	};
});

/**
 * Reduce the set of matched elements to a single element.
 * The position of the element in the set of matched elements
 * starts at 0 and goes to length - 1.
 *
 * @example $("p").eq(1)
 * @before <p>This is just a test.</p><p>So is this</p>
 * @result [ <p>So is this</p> ]
 *
 * @name eq
 * @type jQuery
 * @param Number pos The index of the element that you wish to limit to.
 * @cat Core
 */

/**
 * Reduce the set of matched elements to all elements before a given position.
 * The position of the element in the set of matched elements
 * starts at 0 and goes to length - 1.
 *
 * @example $("p").lt(1)
 * @before <p>This is just a test.</p><p>So is this</p>
 * @result [ <p>This is just a test.</p> ]
 *
 * @name lt
 * @type jQuery
 * @param Number pos Reduce the set to all elements below this position.
 * @cat Core
 */

/**
 * Reduce the set of matched elements to all elements after a given position.
 * The position of the element in the set of matched elements
 * starts at 0 and goes to length - 1.
 *
 * @example $("p").gt(0)
 * @before <p>This is just a test.</p><p>So is this</p>
 * @result [ <p>So is this</p> ]
 *
 * @name gt
 * @type jQuery
 * @param Number pos Reduce the set to all elements after this position.
 * @cat Core
 */

/**
 * Filter the set of elements to those that contain the specified text.
 *
 * @example $("p").contains("test")
 * @before <p>This is just a test.</p><p>So is this</p>
 * @result [ <p>This is just a test.</p> ]
 *
 * @name contains
 * @type jQuery
 * @param String str The string that will be contained within the text of an element.
 * @cat DOM/Traversing
 */
jQuery.each( [ "eq", "lt", "gt", "contains" ], function(i,n){
	jQuery.fn[ n ] = function(num,fn) {
		return this.filter( ":" + n + "(" + num + ")", fn );
	};
});

/**
 * Get the current computed, pixel, width of the first matched element.
 *
 * @example $("p").width();
 * @before <p>This is just a test.</p>
 * @result 300
 *
 * @name width
 * @type String
 * @cat CSS
 */

/**
 * Set the CSS width of every matched element. If no explicit unit
 * was specified (like 'em' or '%') then "px" is added to the width.
 *
 * @example $("p").width(20);
 * @before <p>This is just a test.</p>
 * @result <p style="width:20px;">This is just a test.</p>
 *
 * @example $("p").width("20em");
 * @before <p>This is just a test.</p>
 * @result <p style="width:20em;">This is just a test.</p>
 *
 * @name width
 * @type jQuery
 * @param String|Number val Set the CSS property to the specified value.
 * @cat CSS
 */
 
/**
 * Get the current computed, pixel, height of the first matched element.
 *
 * @example $("p").height();
 * @before <p>This is just a test.</p>
 * @result 300
 *
 * @name height
 * @type String
 * @cat CSS
 */

/**
 * Set the CSS width of every matched element. If no explicit unit
 * was specified (like 'em' or '%') then "px" is added to the width.
 *
 * @example $("p").height(20);
 * @before <p>This is just a test.</p>
 * @result <p style="height:20px;">This is just a test.</p>
 *
 * @example $("p").height("20em");
 * @before <p>This is just a test.</p>
 * @result <p style="height:20em;">This is just a test.</p>
 *
 * @name height
 * @type jQuery
 * @param String|Number val Set the CSS property to the specified value.
 * @cat CSS
 */

jQuery.each( [ "height", "width" ], function(i,n){
	jQuery.fn[ n ] = function(h) {
		return h == undefined ?
			( this.length ? jQuery.css( this[0], n ) : null ) :
			this.css( n, h.constructor == String ? h : h + "px" );
	};
});
jQuery.extend({
	expr: {
		"": "m[2]=='*'||jQuery.nodeName(a,m[2])",
		"#": "a.getAttribute('id')==m[2]",
		":": {
			// Position Checks
			lt: "i<m[3]-0",
			gt: "i>m[3]-0",
			nth: "m[3]-0==i",
			eq: "m[3]-0==i",
			first: "i==0",
			last: "i==r.length-1",
			even: "i%2==0",
			odd: "i%2",

			// Child Checks
			"nth-child": "jQuery.nth(a.parentNode.firstChild,m[3],'nextSibling',a)==a",
			"first-child": "jQuery.nth(a.parentNode.firstChild,1,'nextSibling')==a",
			"last-child": "jQuery.nth(a.parentNode.lastChild,1,'previousSibling')==a",
			"only-child": "jQuery.sibling(a.parentNode.firstChild).length==1",

			// Parent Checks
			parent: "a.firstChild",
			empty: "!a.firstChild",

			// Text Check
			contains: "jQuery.fn.text.apply([a]).indexOf(m[3])>=0",

			// Visibility
			visible: 'a.type!="hidden"&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"',
			hidden: 'a.type=="hidden"||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"',

			// Form attributes
			enabled: "!a.disabled",
			disabled: "a.disabled",
			checked: "a.checked",
			selected: "a.selected||jQuery.attr(a,'selected')",

			// Form elements
			text: "a.type=='text'",
			radio: "a.type=='radio'",
			checkbox: "a.type=='checkbox'",
			file: "a.type=='file'",
			password: "a.type=='password'",
			submit: "a.type=='submit'",
			image: "a.type=='image'",
			reset: "a.type=='reset'",
			button: 'a.type=="button"||jQuery.nodeName(a,"button")',
			input: "/input|select|textarea|button/i.test(a.nodeName)"
		},
		".": "jQuery.className.has(a,m[2])",
		"@": {
			"=": "z==m[4]",
			"!=": "z!=m[4]",
			"^=": "z&&!z.indexOf(m[4])",
			"$=": "z&&z.substr(z.length - m[4].length,m[4].length)==m[4]",
			"*=": "z&&z.indexOf(m[4])>=0",
			"": "z",
			_resort: function(m){
				return ["", m[1], m[3], m[2], m[5]];
			},
			_prefix: "z=a[m[3]]||jQuery.attr(a,m[3]);"
		},
		"[": "jQuery.find(m[2],a).length"
	},
	
	// The regular expressions that power the parsing engine
	parse: [
		// Match: [@value='test'], [@foo]
		/^\[ *(@)([a-z0-9_-]*) *([!*$^=]*) *('?"?)(.*?)\4 *\]/i,

		// Match: [div], [div p]
		/^(\[)\s*(.*?(\[.*?\])?[^[]*?)\s*\]/,

		// Match: :contains('foo')
		/^(:)([a-z0-9_-]*)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/i,

		// Match: :even, :last-chlid
		/^([:.#]*)([a-z0-9_*-]*)/i
	],

	token: [
		/^(\/?\.\.)/, "a.parentNode",
		/^(>|\/)/, "jQuery.sibling(a.firstChild)",
		/^(\+)/, "jQuery.nth(a,2,'nextSibling')",
		/^(~)/, function(a){
			var s = jQuery.sibling(a.parentNode.firstChild);
			return s.slice(0, jQuery.inArray(a,s));
		}
	],

	multiFilter: function( expr, elems, not ) {
		var old, cur = [];

		while ( expr && expr != old ) {
			old = expr;
			var f = jQuery.filter( expr, elems, not );
			expr = f.t.replace(/^\s*,\s*/, "" );
			cur = not ? elems = f.r : jQuery.merge( cur, f.r );
		}

		return cur;
	},

	/**
	 * @name $.find
	 * @type Array<Element>
	 * @private
	 * @cat Core
	 */
	find: function( t, context ) {
		// Quickly handle non-string expressions
		if ( typeof t != "string" )
			return [ t ];

		// Make sure that the context is a DOM Element
		if ( context && !context.nodeType )
			context = null;

		// Set the correct context (if none is provided)
		context = context || document;

		// Handle the common XPath // expression
		if ( !t.indexOf("//") ) {
			context = context.documentElement;
			t = t.substr(2,t.length);

		// And the / root expression
		} else if ( !t.indexOf("/") ) {
			context = context.documentElement;
			t = t.substr(1,t.length);
			if ( t.indexOf("/") >= 1 )
				t = t.substr(t.indexOf("/"),t.length);
		}

		// Initialize the search
		var ret = [context], done = [], last = null;

		// Continue while a selector expression exists, and while
		// we're no longer looping upon ourselves
		while ( t && last != t ) {
			var r = [];
			last = t;

			t = jQuery.trim(t).replace( /^\/\//i, "" );

			var foundToken = false;

			// An attempt at speeding up child selectors that
			// point to a specific element tag
			var re = /^[\/>]\s*([a-z0-9*-]+)/i;
			var m = re.exec(t);

			if ( m ) {
				// Perform our own iteration and filter
				jQuery.each( ret, function(){
					for ( var c = this.firstChild; c; c = c.nextSibling )
						if ( c.nodeType == 1 && ( jQuery.nodeName(c, m[1]) || m[1] == "*" ) )
							r.push( c );
				});

				ret = r;
				t = t.replace( re, "" );
				if ( t.indexOf(" ") == 0 ) continue;
				foundToken = true;
			} else {
				// Look for pre-defined expression tokens
				for ( var i = 0; i < jQuery.token.length; i += 2 ) {
					// Attempt to match each, individual, token in
					// the specified order
					var re = jQuery.token[i];
					var m = re.exec(t);

					// If the token match was found
					if ( m ) {
						// Map it against the token's handler
						r = ret = jQuery.map( ret, jQuery.isFunction( jQuery.token[i+1] ) ?
							jQuery.token[i+1] :
							function(a){ return eval(jQuery.token[i+1]); });

						// And remove the token
						t = jQuery.trim( t.replace( re, "" ) );
						foundToken = true;
						break;
					}
				}
			}

			// See if there's still an expression, and that we haven't already
			// matched a token
			if ( t && !foundToken ) {
				// Handle multiple expressions
				if ( !t.indexOf(",") ) {
					// Clean the result set
					if ( ret[0] == context ) ret.shift();

					// Merge the result sets
					jQuery.merge( done, ret );

					// Reset the context
					r = ret = [context];

					// Touch up the selector string
					t = " " + t.substr(1,t.length);

				} else {
					// Optomize for the case nodeName#idName
					var re2 = /^([a-z0-9_-]+)(#)([a-z0-9\\*_-]*)/i;
					var m = re2.exec(t);
					
					// Re-organize the results, so that they're consistent
					if ( m ) {
					   m = [ 0, m[2], m[3], m[1] ];

					} else {
						// Otherwise, do a traditional filter check for
						// ID, class, and element selectors
						re2 = /^([#.]?)([a-z0-9\\*_-]*)/i;
						m = re2.exec(t);
					}

					// Try to do a global search by ID, where we can
					if ( m[1] == "#" && ret[ret.length-1].getElementById ) {
						// Optimization for HTML document case
						var oid = ret[ret.length-1].getElementById(m[2]);

						// Do a quick check for node name (where applicable) so
						// that div#foo searches will be really fast
						ret = r = oid && 
						  (!m[3] || jQuery.nodeName(oid, m[3])) ? [oid] : [];

					} else {
						// Pre-compile a regular expression to handle class searches
						if ( m[1] == "." )
							var rec = new RegExp("(^|\\s)" + m[2] + "(\\s|$)");

						// We need to find all descendant elements, it is more
						// efficient to use getAll() when we are already further down
						// the tree - we try to recognize that here
						jQuery.each( ret, function(){
							// Grab the tag name being searched for
							var tag = m[1] != "" || m[0] == "" ? "*" : m[2];

							// Handle IE7 being really dumb about <object>s
							if ( jQuery.nodeName(this, "object") && tag == "*" )
								tag = "param";

							jQuery.merge( r,
								m[1] != "" && ret.length != 1 ?
									jQuery.getAll( this, [], m[1], m[2], rec ) :
									this.getElementsByTagName( tag )
							);
						});

						// It's faster to filter by class and be done with it
						if ( m[1] == "." && ret.length == 1 )
							r = jQuery.grep( r, function(e) {
								return rec.test(e.className);
							});

						// Same with ID filtering
						if ( m[1] == "#" && ret.length == 1 ) {
							// Remember, then wipe out, the result set
							var tmp = r;
							r = [];

							// Then try to find the element with the ID
							jQuery.each( tmp, function(){
								if ( this.getAttribute("id") == m[2] ) {
									r = [ this ];
									return false;
								}
							});
						}

						ret = r;
					}

					t = t.replace( re2, "" );
				}

			}

			// If a selector string still exists
			if ( t ) {
				// Attempt to filter it
				var val = jQuery.filter(t,r);
				ret = r = val.r;
				t = jQuery.trim(val.t);
			}
		}

		// Remove the root context
		if ( ret && ret[0] == context ) ret.shift();

		// And combine the results
		jQuery.merge( done, ret );

		return done;
	},

	filter: function(t,r,not) {
		// Look for common filter expressions
		while ( t && /^[a-z[({<*:.#]/i.test(t) ) {

			var p = jQuery.parse, m;

			jQuery.each( p, function(i,re){
		
				// Look for, and replace, string-like sequences
				// and finally build a regexp out of it
				m = re.exec( t );

				if ( m ) {
					// Remove what we just matched
					t = t.substring( m[0].length );

					// Re-organize the first match
					if ( jQuery.expr[ m[1] ]._resort )
						m = jQuery.expr[ m[1] ]._resort( m );

					return false;
				}
			});

			// :not() is a special case that can be optimized by
			// keeping it out of the expression list
			if ( m[1] == ":" && m[2] == "not" )
				r = jQuery.filter(m[3], r, true).r;

			// Handle classes as a special case (this will help to
			// improve the speed, as the regexp will only be compiled once)
			else if ( m[1] == "." ) {

				var re = new RegExp("(^|\\s)" + m[2] + "(\\s|$)");
				r = jQuery.grep( r, function(e){
					return re.test(e.className || "");
				}, not);

			// Otherwise, find the expression to execute
			} else {
				var f = jQuery.expr[m[1]];
				if ( typeof f != "string" )
					f = jQuery.expr[m[1]][m[2]];

				// Build a custom macro to enclose it
				eval("f = function(a,i){" +
					( jQuery.expr[ m[1] ]._prefix || "" ) +
					"return " + f + "}");

				// Execute it against the current filter
				r = jQuery.grep( r, f, not );
			}
		}

		// Return an array of filtered elements (r)
		// and the modified expression string (t)
		return { r: r, t: t };
	},
	
	getAll: function( o, r, token, name, re ) {
		for ( var s = o.firstChild; s; s = s.nextSibling )
			if ( s.nodeType == 1 ) {
				var add = true;

				if ( token == "." )
					add = s.className && re.test(s.className);
				else if ( token == "#" )
					add = s.getAttribute("id") == name;
	
				if ( add )
					r.push( s );

				if ( token == "#" && r.length ) break;

				if ( s.firstChild )
					jQuery.getAll( s, r, token, name, re );
			}

		return r;
	},

	/**
	 * All ancestors of a given element.
	 *
	 * @private
	 * @name $.parents
	 * @type Array<Element>
	 * @param Element elem The element to find the ancestors of.
	 * @cat DOM/Traversing
	 */
	parents: function( elem ){
		var matched = [];
		var cur = elem.parentNode;
		while ( cur && cur != document ) {
			matched.push( cur );
			cur = cur.parentNode;
		}
		return matched;
	},
	
	/**
	 * A handy, and fast, way to traverse in a particular direction and find
	 * a specific element.
	 *
	 * @private
	 * @name $.nth
	 * @type DOMElement
	 * @param DOMElement cur The element to search from.
	 * @param String|Number num The Nth result to match. Can be a number or a string (like 'even' or 'odd').
	 * @param String dir The direction to move in (pass in something like 'previousSibling' or 'nextSibling').
	 * @cat DOM/Traversing
	 */
	nth: function(cur,result,dir,elem){
		result = result || 1;
		var num = 0;
		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType == 1 ) num++;
			if ( num == result || result == "even" && num % 2 == 0 && num > 1 && cur == elem ||
				result == "odd" && num % 2 == 1 && cur == elem ) return cur;
		}
	},
	
	/**
	 * All elements on a specified axis.
	 *
	 * @private
	 * @name $.sibling
	 * @type Array
	 * @param Element elem The element to find all the siblings of (including itself).
	 * @cat DOM/Traversing
	 */
	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType == 1 && (!elem || n != elem) )
				r.push( n );
		}

		return r;
	}
});
/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code orignated from 
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function(element, type, handler, data) {
		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( jQuery.browser.msie && element.setInterval != undefined )
			element = window;

		// if data is passed, bind to handler
		if( data ) 
			handler.data = data;

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid )
			handler.guid = this.guid++;

		// Init the element's event structure
		if (!element.events)
			element.events = {};

		// Get the current list of functions bound to this event
		var handlers = element.events[type];

		// If it hasn't been initialized yet
		if (!handlers) {
			// Init the event handler queue
			handlers = element.events[type] = {};

			// Remember an existing handler, if it's already there
			if (element["on" + type])
				handlers[0] = element["on" + type];
		}

		// Add the function to the element's handler list
		handlers[handler.guid] = handler;

		// And bind the global event handler to the element
		element["on" + type] = this.handle;

		// Remember the function in a global list (for triggering)
		if (!this.global[type])
			this.global[type] = [];
		this.global[type].push( element );
	},

	guid: 1,
	global: {},

	// Detach an event or set of events from an element
	remove: function(element, type, handler) {
		if (element.events)
			if ( type && type.type )
				delete element.events[ type.type ][ type.handler.guid ];
			else if (type && element.events[type])
				if ( handler )
					delete element.events[type][handler.guid];
				else
					for ( var i in element.events[type] )
						delete element.events[type][i];
			else
				for ( var j in element.events )
					this.remove( element, j );
	},

	trigger: function(type,data,element) {
		// Clone the incoming data, if any
		data = jQuery.makeArray(data || []);

		// Handle a global trigger
		if ( !element )
			jQuery.each( this.global[type] || [], function(){
				jQuery.event.trigger( type, data, this );
			});

		// Handle triggering a single element
		else {
			var handler = element["on" + type ], val,
				fn = jQuery.isFunction( element[ type ] );

			if ( handler ) {
				// Pass along a fake event
				data.unshift( this.fix({ type: type, target: element }) );
	
				// Trigger the event
				if ( (val = handler.apply( element, data )) !== false )
					this.triggered = true;
			}

			if ( fn && val !== false )
				element[ type ]();

			this.triggered = false;
		}
	},

	handle: function(event) {
		// Handle the second event of a trigger and when
		// an event is called after a page has unloaded
		if ( typeof jQuery == "undefined" || jQuery.event.triggered ) return;

		// Empty object is for triggered events with no data
		event = jQuery.event.fix( event || window.event || {} ); 

		// returned undefined or false
		var returnValue;

		var c = this.events[event.type];

		var args = [].slice.call( arguments, 1 );
		args.unshift( event );

		for ( var j in c ) {
			// Pass in a reference to the handler function itself
			// So that we can later remove it
			args[0].handler = c[j];
			args[0].data = c[j].data;

			if ( c[j].apply( this, args ) === false ) {
				event.preventDefault();
				event.stopPropagation();
				returnValue = false;
			}
		}

		// Clean up added properties in IE to prevent memory leak
		if (jQuery.browser.msie) event.target = event.preventDefault = event.stopPropagation = event.handler = event.data = null;

		return returnValue;
	},

	fix: function(event) {
		// Fix target property, if necessary
		if ( !event.target && event.srcElement )
			event.target = event.srcElement;

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == undefined && event.clientX != undefined ) {
			var e = document.documentElement, b = document.body;
			event.pageX = event.clientX + (e.scrollLeft || b.scrollLeft);
			event.pageY = event.clientY + (e.scrollTop || b.scrollTop);
		}
				
		// check if target is a textnode (safari)
		if (jQuery.browser.safari && event.target.nodeType == 3) {
			// store a copy of the original event object 
			// and clone because target is read only
			var originalEvent = event;
			event = jQuery.extend({}, originalEvent);
			
			// get parentnode from textnode
			event.target = originalEvent.target.parentNode;
			
			// add preventDefault and stopPropagation since 
			// they will not work on the clone
			event.preventDefault = function() {
				return originalEvent.preventDefault();
			};
			event.stopPropagation = function() {
				return originalEvent.stopPropagation();
			};
		}
		
		// fix preventDefault and stopPropagation
		if (!event.preventDefault)
			event.preventDefault = function() {
				this.returnValue = false;
			};
			
		if (!event.stopPropagation)
			event.stopPropagation = function() {
				this.cancelBubble = true;
			};
			
		return event;
	}
};

jQuery.fn.extend({

	/**
	 * Binds a handler to a particular event (like click) for each matched element.
	 * The event handler is passed an event object that you can use to prevent
	 * default behaviour. To stop both default action and event bubbling, your handler
	 * has to return false.
	 *
	 * In most cases, you can define your event handlers as anonymous functions
	 * (see first example). In cases where that is not possible, you can pass additional
	 * data as the second paramter (and the handler function as the third), see 
	 * second example.
	 *
	 * @example $("p").bind("click", function(){
	 *   alert( $(this).text() );
	 * });
	 * @before <p>Hello</p>
	 * @result alert("Hello")
	 *
	 * @example function handler(event) {
	 *   alert(event.data.foo);
	 * }
	 * $("p").bind("click", {foo: "bar"}, handler)
	 * @result alert("bar")
	 * @desc Pass some additional data to the event handler.
	 *
	 * @example $("form").bind("submit", function() { return false; })
	 * @desc Cancel a default action and prevent it from bubbling by returning false
	 * from your function.
	 *
	 * @example $("form").bind("submit", function(event){
	 *   event.preventDefault();
	 * });
	 * @desc Cancel only the default action by using the preventDefault method.
	 *
	 *
	 * @example $("form").bind("submit", function(event){
	 *   event.stopPropagation();
	 * });
	 * @desc Stop only an event from bubbling by using the stopPropagation method.
	 *
	 * @name bind
	 * @type jQuery
	 * @param String type An event type
	 * @param Object data (optional) Additional data passed to the event handler as event.data
	 * @param Function fn A function to bind to the event on each of the set of matched elements
	 * @cat Events
	 */
	bind: function( type, data, fn ) {
		return this.each(function(){
			jQuery.event.add( this, type, fn || data, data );
		});
	},
	
	/**
	 * Binds a handler to a particular event (like click) for each matched element.
	 * The handler is executed only once for each element. Otherwise, the same rules
	 * as described in bind() apply.
	 The event handler is passed an event object that you can use to prevent
	 * default behaviour. To stop both default action and event bubbling, your handler
	 * has to return false.
	 *
	 * In most cases, you can define your event handlers as anonymous functions
	 * (see first example). In cases where that is not possible, you can pass additional
	 * data as the second paramter (and the handler function as the third), see 
	 * second example.
	 *
	 * @example $("p").one("click", function(){
	 *   alert( $(this).text() );
	 * });
	 * @before <p>Hello</p>
	 * @result alert("Hello")
	 *
	 * @name one
	 * @type jQuery
	 * @param String type An event type
	 * @param Object data (optional) Additional data passed to the event handler as event.data
	 * @param Function fn A function to bind to the event on each of the set of matched elements
	 * @cat Events
	 */
	one: function( type, data, fn ) {
		return this.each(function(){
			jQuery.event.add( this, type, function(event) {
				jQuery(this).unbind(event);
				return (fn || data).apply( this, arguments);
			}, data);
		});
	},

	/**
	 * The opposite of bind, removes a bound event from each of the matched
	 * elements.
	 *
	 * Without any arguments, all bound events are removed.
	 *
	 * If the type is provided, all bound events of that type are removed.
	 *
	 * If the function that was passed to bind is provided as the second argument,
	 * only that specific event handler is removed.
	 *
	 * @example $("p").unbind()
	 * @before <p onclick="alert('Hello');">Hello</p>
	 * @result [ <p>Hello</p> ]
	 *
	 * @example $("p").unbind( "click" )
	 * @before <p onclick="alert('Hello');">Hello</p>
	 * @result [ <p>Hello</p> ]
	 *
	 * @example $("p").unbind( "click", function() { alert("Hello"); } )
	 * @before <p onclick="alert('Hello');">Hello</p>
	 * @result [ <p>Hello</p> ]
	 *
	 * @name unbind
	 * @type jQuery
	 * @param String type (optional) An event type
	 * @param Function fn (optional) A function to unbind from the event on each of the set of matched elements
	 * @cat Events
	 */
	unbind: function( type, fn ) {
		return this.each(function(){
			jQuery.event.remove( this, type, fn );
		});
	},

	/**
	 * Trigger a type of event on every matched element.
	 *
	 * @example $("p").trigger("click")
	 * @before <p click="alert('hello')">Hello</p>
	 * @result alert('hello')
	 *
	 * @name trigger
	 * @type jQuery
	 * @param String type An event type to trigger.
	 * @cat Events
	 */
	trigger: function( type, data ) {
		return this.each(function(){
			jQuery.event.trigger( type, data, this );
		});
	},

	/**
	 * Toggle between two function calls every other click.
	 * Whenever a matched element is clicked, the first specified function 
	 * is fired, when clicked again, the second is fired. All subsequent 
	 * clicks continue to rotate through the two functions.
	 *
	 * Use unbind("click") to remove.
	 *
	 * @example $("p").toggle(function(){
	 *   $(this).addClass("selected");
	 * },function(){
	 *   $(this).removeClass("selected");
	 * });
	 * 
	 * @name toggle
	 * @type jQuery
	 * @param Function even The function to execute on every even click.
	 * @param Function odd The function to execute on every odd click.
	 * @cat Events
	 */
	toggle: function() {
		// Save reference to arguments for access in closure
		var a = arguments;

		return this.click(function(e) {
			// Figure out which function to execute
			this.lastToggle = this.lastToggle == 0 ? 1 : 0;
			
			// Make sure that clicks stop
			e.preventDefault();
			
			// and execute the function
			return a[this.lastToggle].apply( this, [e] ) || false;
		});
	},
	
	/**
	 * A method for simulating hovering (moving the mouse on, and off,
	 * an object). This is a custom method which provides an 'in' to a 
	 * frequent task.
	 *
	 * Whenever the mouse cursor is moved over a matched 
	 * element, the first specified function is fired. Whenever the mouse 
	 * moves off of the element, the second specified function fires. 
	 * Additionally, checks are in place to see if the mouse is still within 
	 * the specified element itself (for example, an image inside of a div), 
	 * and if it is, it will continue to 'hover', and not move out 
	 * (a common error in using a mouseout event handler).
	 *
	 * @example $("p").hover(function(){
	 *   $(this).addClass("over");
	 * },function(){
	 *   $(this).addClass("out");
	 * });
	 *
	 * @name hover
	 * @type jQuery
	 * @param Function over The function to fire whenever the mouse is moved over a matched element.
	 * @param Function out The function to fire whenever the mouse is moved off of a matched element.
	 * @cat Events
	 */
	hover: function(f,g) {
		
		// A private function for handling mouse 'hovering'
		function handleHover(e) {
			// Check if mouse(over|out) are still within the same parent element
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
	
			// Traverse up the tree
			while ( p && p != this ) try { p = p.parentNode } catch(e) { p = this; };
			
			// If we actually just moused on to a sub-element, ignore it
			if ( p == this ) return false;
			
			// Execute the right function
			return (e.type == "mouseover" ? f : g).apply(this, [e]);
		}
		
		// Bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	},
	
	/**
	 * Bind a function to be executed whenever the DOM is ready to be
	 * traversed and manipulated. This is probably the most important 
	 * function included in the event module, as it can greatly improve
	 * the response times of your web applications.
	 *
	 * In a nutshell, this is a solid replacement for using window.onload, 
	 * and attaching a function to that. By using this method, your bound Function 
	 * will be called the instant the DOM is ready to be read and manipulated, 
	 * which is exactly what 99.99% of all Javascript code needs to run.
	 *
	 * There is one argument passed to the ready event handler: A reference to
	 * the jQuery function. You can name that argument whatever you like, and
	 * can therefore stick with the $ alias without risc of naming collisions.
	 * 
	 * Please ensure you have no code in your &lt;body&gt; onload event handler, 
	 * otherwise $(document).ready() may not fire.
	 *
	 * You can have as many $(document).ready events on your page as you like.
	 * The functions are then executed in the order they were added.
	 *
	 * @example $(document).ready(function(){ Your code here... });
	 *
	 * @example jQuery(function($) {
	 *   // Your code using failsafe $ alias here...
	 * });
	 * @desc Uses both the shortcut for $(document).ready() and the argument
	 * to write failsafe jQuery code using the $ alias, without relying on the
	 * global alias.
	 *
	 * @name ready
	 * @type jQuery
	 * @param Function fn The function to be executed when the DOM is ready.
	 * @cat Events
	 * @see $.noConflict()
	 * @see $(Function)
	 */
	ready: function(f) {
		// If the DOM is already ready
		if ( jQuery.isReady )
			// Execute the function immediately
			f.apply( document, [jQuery] );
			
		// Otherwise, remember the function for later
		else {
			// Add the function to the wait list
			jQuery.readyList.push( function() { return f.apply(this, [jQuery]) } );
		}
	
		return this;
	}
});

jQuery.extend({
	/*
	 * All the code that makes DOM Ready work nicely.
	 */
	isReady: false,
	readyList: [],
	
	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Remember that the DOM is ready
			jQuery.isReady = true;
			
			// If there are functions bound, to execute
			if ( jQuery.readyList ) {
				// Execute all of them
				jQuery.each( jQuery.readyList, function(){
					this.apply( document );
				});
				
				// Reset the list of functions
				jQuery.readyList = null;
			}
			// Remove event lisenter to avoid memory leak
			if ( jQuery.browser.mozilla || jQuery.browser.opera )
				document.removeEventListener( "DOMContentLoaded", jQuery.ready, false );
		}
	}
});

new function(){

	/**
	 * Bind a function to the scroll event of each matched element.
	 *
	 * @example $("p").scroll( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onscroll="alert('Hello');">Hello</p>
	 *
	 * @name scroll
	 * @type jQuery
	 * @param Function fn A function to bind to the scroll event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the submit event of each matched element.
	 *
	 * @example $("#myform").submit( function() {
	 *   return $("input", this).val().length > 0;
	 * } );
	 * @before <form id="myform"><input /></form>
	 * @desc Prevents the form submission when the input has no value entered.
	 *
	 * @name submit
	 * @type jQuery
	 * @param Function fn A function to bind to the submit event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Trigger the submit event of each matched element. This causes all of the functions
	 * that have been bound to thet submit event to be executed.
	 *
	 * Note: This does not execute the submit method of the form element! If you need to
	 * submit the form via code, you have to use the DOM method, eg. $("form")[0].submit();
	 *
	 * @example $("form").submit();
	 * @desc Triggers all submit events registered for forms, but does not submit the form
	 *
	 * @name submit
	 * @type jQuery
	 * @cat Events
	 */

	/**
	 * Bind a function to the focus event of each matched element.
	 *
	 * @example $("p").focus( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onfocus="alert('Hello');">Hello</p>
	 *
	 * @name focus
	 * @type jQuery
	 * @param Function fn A function to bind to the focus event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Trigger the focus event of each matched element. This causes all of the functions
	 * that have been bound to thet focus event to be executed.
	 *
	 * Note: This does not execute the focus method of the underlying elements! If you need to
	 * focus an element via code, you have to use the DOM method, eg. $("#myinput")[0].focus();
	 *
	 * @example $("p").focus();
	 * @before <p onfocus="alert('Hello');">Hello</p>
	 * @result alert('Hello');
	 *
	 * @name focus
	 * @type jQuery
	 * @cat Events
	 */

	/**
	 * Bind a function to the keydown event of each matched element.
	 *
	 * @example $("p").keydown( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onkeydown="alert('Hello');">Hello</p>
	 *
	 * @name keydown
	 * @type jQuery
	 * @param Function fn A function to bind to the keydown event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the dblclick event of each matched element.
	 *
	 * @example $("p").dblclick( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p ondblclick="alert('Hello');">Hello</p>
	 *
	 * @name dblclick
	 * @type jQuery
	 * @param Function fn A function to bind to the dblclick event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the keypress event of each matched element.
	 *
	 * @example $("p").keypress( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onkeypress="alert('Hello');">Hello</p>
	 *
	 * @name keypress
	 * @type jQuery
	 * @param Function fn A function to bind to the keypress event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the error event of each matched element.
	 *
	 * @example $("p").error( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onerror="alert('Hello');">Hello</p>
	 *
	 * @name error
	 * @type jQuery
	 * @param Function fn A function to bind to the error event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the blur event of each matched element.
	 *
	 * @example $("p").blur( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onblur="alert('Hello');">Hello</p>
	 *
	 * @name blur
	 * @type jQuery
	 * @param Function fn A function to bind to the blur event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Trigger the blur event of each matched element. This causes all of the functions
	 * that have been bound to thet blur event to be executed.
	 *
	 * Note: This does not execute the blur method of the underlying elements! If you need to
	 * blur an element via code, you have to use the DOM method, eg. $("#myinput")[0].blur();
	 *
	 * @example $("p").blur();
	 * @before <p onblur="alert('Hello');">Hello</p>
	 * @result alert('Hello');
	 *
	 * @name blur
	 * @type jQuery
	 * @cat Events
	 */

	/**
	 * Bind a function to the load event of each matched element.
	 *
	 * @example $("p").load( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onload="alert('Hello');">Hello</p>
	 *
	 * @name load
	 * @type jQuery
	 * @param Function fn A function to bind to the load event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the select event of each matched element.
	 *
	 * @example $("p").select( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onselect="alert('Hello');">Hello</p>
	 *
	 * @name select
	 * @type jQuery
	 * @param Function fn A function to bind to the select event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Trigger the select event of each matched element. This causes all of the functions
	 * that have been bound to thet select event to be executed.
	 *
	 * @example $("p").select();
	 * @before <p onselect="alert('Hello');">Hello</p>
	 * @result alert('Hello');
	 *
	 * @name select
	 * @type jQuery
	 * @cat Events
	 */

	/**
	 * Bind a function to the mouseup event of each matched element.
	 *
	 * @example $("p").mouseup( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onmouseup="alert('Hello');">Hello</p>
	 *
	 * @name mouseup
	 * @type jQuery
	 * @param Function fn A function to bind to the mouseup event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the unload event of each matched element.
	 *
	 * @example $("p").unload( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onunload="alert('Hello');">Hello</p>
	 *
	 * @name unload
	 * @type jQuery
	 * @param Function fn A function to bind to the unload event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the change event of each matched element.
	 *
	 * @example $("p").change( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onchange="alert('Hello');">Hello</p>
	 *
	 * @name change
	 * @type jQuery
	 * @param Function fn A function to bind to the change event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the mouseout event of each matched element.
	 *
	 * @example $("p").mouseout( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onmouseout="alert('Hello');">Hello</p>
	 *
	 * @name mouseout
	 * @type jQuery
	 * @param Function fn A function to bind to the mouseout event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the keyup event of each matched element.
	 *
	 * @example $("p").keyup( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onkeyup="alert('Hello');">Hello</p>
	 *
	 * @name keyup
	 * @type jQuery
	 * @param Function fn A function to bind to the keyup event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the click event of each matched element.
	 *
	 * @example $("p").click( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onclick="alert('Hello');">Hello</p>
	 *
	 * @name click
	 * @type jQuery
	 * @param Function fn A function to bind to the click event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Trigger the click event of each matched element. This causes all of the functions
	 * that have been bound to thet click event to be executed.
	 *
	 * @example $("p").click();
	 * @before <p onclick="alert('Hello');">Hello</p>
	 * @result alert('Hello');
	 *
	 * @name click
	 * @type jQuery
	 * @cat Events
	 */

	/**
	 * Bind a function to the resize event of each matched element.
	 *
	 * @example $("p").resize( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onresize="alert('Hello');">Hello</p>
	 *
	 * @name resize
	 * @type jQuery
	 * @param Function fn A function to bind to the resize event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the mousemove event of each matched element.
	 *
	 * @example $("p").mousemove( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onmousemove="alert('Hello');">Hello</p>
	 *
	 * @name mousemove
	 * @type jQuery
	 * @param Function fn A function to bind to the mousemove event on each of the matched elements.
	 * @cat Events
	 */

	/**
	 * Bind a function to the mousedown event of each matched element.
	 *
	 * @example $("p").mousedown( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onmousedown="alert('Hello');">Hello</p>
	 *
	 * @name mousedown
	 * @type jQuery
	 * @param Function fn A function to bind to the mousedown event on each of the matched elements.
	 * @cat Events
	 */
	 
	/**
	 * Bind a function to the mouseover event of each matched element.
	 *
	 * @example $("p").mouseover( function() { alert("Hello"); } );
	 * @before <p>Hello</p>
	 * @result <p onmouseover="alert('Hello');">Hello</p>
	 *
	 * @name mouseover
	 * @type jQuery
	 * @param Function fn A function to bind to the mousedown event on each of the matched elements.
	 * @cat Events
	 */
	jQuery.each( ("blur,focus,load,resize,scroll,unload,click,dblclick," +
		"mousedown,mouseup,mousemove,mouseover,mouseout,change,select," + 
		"submit,keydown,keypress,keyup,error").split(","), function(i,o){
		
		// Handle event binding
		jQuery.fn[o] = function(f){
			return f ? this.bind(o, f) : this.trigger(o);
		};
			
	});
	
	// If Mozilla is used
	if ( jQuery.browser.mozilla || jQuery.browser.opera )
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", jQuery.ready, false );
	
	// If IE is used, use the excellent hack by Matthias Miller
	// http://www.outofhanwell.com/blog/index.php?title=the_window_onload_problem_revisited
	else if ( jQuery.browser.msie ) {
	
		// Only works if you document.write() it
		document.write("<scr" + "ipt id=__ie_init defer=true " + 
			"src=//:><\/script>");
	
		// Use the defer script hack
		var script = document.getElementById("__ie_init");
		
		// script does not exist if jQuery is loaded dynamically
		if ( script ) 
			script.onreadystatechange = function() {
				if ( this.readyState != "complete" ) return;
				this.parentNode.removeChild( this );
				jQuery.ready();
			};
	
		// Clear from memory
		script = null;
	
	// If Safari  is used
	} else if ( jQuery.browser.safari )
		// Continually check to see if the document.readyState is valid
		jQuery.safariTimer = setInterval(function(){
			// loaded and complete are both valid states
			if ( document.readyState == "loaded" || 
				document.readyState == "complete" ) {
	
				// If either one are found, remove the timer
				clearInterval( jQuery.safariTimer );
				jQuery.safariTimer = null;
	
				// and execute any waiting functions
				jQuery.ready();
			}
		}, 10); 

	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
	
};

// Clean up after IE to avoid memory leaks
if (jQuery.browser.msie)
	jQuery(window).one("unload", function() {
		var global = jQuery.event.global;
		for ( var type in global ) {
			var els = global[type], i = els.length;
			if ( i && type != 'unload' )
				do
					jQuery.event.remove(els[i-1], type);
				while (--i);
		}
	});
jQuery.fn.extend({

	/**
	 * Displays each of the set of matched elements if they are hidden.
	 *
	 * @example $("p").show()
	 * @before <p style="display: none">Hello</p>
	 * @result [ <p style="display: block">Hello</p> ]
	 *
	 * @name show
	 * @type jQuery
	 * @cat Effects
	 */
	
	/**
	 * Show all matched elements using a graceful animation and firing an
	 * optional callback after completion.
	 *
	 * The height, width, and opacity of each of the matched elements 
	 * are changed dynamically according to the specified speed.
	 *
	 * @example $("p").show("slow");
	 *
	 * @example $("p").show("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name show
	 * @type jQuery
	 * @param String|Number speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback (optional) A function to be executed whenever the animation completes.
	 * @cat Effects
	 * @see hide(String|Number,Function)
	 */
	show: function(speed,callback){
		var hidden = this.filter(":hidden");
		speed ?
			hidden.animate({
				height: "show", width: "show", opacity: "show"
			}, speed, callback) :
			
			hidden.each(function(){
				this.style.display = this.oldblock ? this.oldblock : "";
				if ( jQuery.css(this,"display") == "none" )
					this.style.display = "block";
			});
		return this;
	},
	
	/**
	 * Hides each of the set of matched elements if they are shown.
	 *
	 * @example $("p").hide()
	 * @before <p>Hello</p>
	 * @result [ <p style="display: none">Hello</p> ]
	 *
	 * @name hide
	 * @type jQuery
	 * @cat Effects
	 */
	
	/**
	 * Hide all matched elements using a graceful animation and firing an
	 * optional callback after completion.
	 *
	 * The height, width, and opacity of each of the matched elements 
	 * are changed dynamically according to the specified speed.
	 *
	 * @example $("p").hide("slow");
	 *
	 * @example $("p").hide("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name hide
	 * @type jQuery
	 * @param String|Number speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback (optional) A function to be executed whenever the animation completes.
	 * @cat Effects
	 * @see show(String|Number,Function)
	 */
	hide: function(speed,callback){
		var visible = this.filter(":visible");
		speed ?
			visible.animate({
				height: "hide", width: "hide", opacity: "hide"
			}, speed, callback) :
			
			visible.each(function(){
				this.oldblock = this.oldblock || jQuery.css(this,"display");
				if ( this.oldblock == "none" )
					this.oldblock = "block";
				this.style.display = "none";
			});
		return this;
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,
	
	/**
	 * Toggles each of the set of matched elements. If they are shown,
	 * toggle makes them hidden. If they are hidden, toggle
	 * makes them shown.
	 *
	 * @example $("p").toggle()
	 * @before <p>Hello</p><p style="display: none">Hello Again</p>
	 * @result [ <p style="display: none">Hello</p>, <p style="display: block">Hello Again</p> ]
	 *
	 * @name toggle
	 * @type jQuery
	 * @cat Effects
	 */
	toggle: function( fn, fn2 ){
		var args = arguments;
		return jQuery.isFunction(fn) && jQuery.isFunction(fn2) ?
			this._toggle( fn, fn2 ) :
			this.each(function(){
				jQuery(this)[ jQuery(this).is(":hidden") ? "show" : "hide" ]
					.apply( jQuery(this), args );
			});
	},
	
	/**
	 * Reveal all matched elements by adjusting their height and firing an
	 * optional callback after completion.
	 *
	 * Only the height is adjusted for this animation, causing all matched
	 * elements to be revealed in a "sliding" manner.
	 *
	 * @example $("p").slideDown("slow");
	 *
	 * @example $("p").slideDown("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name slideDown
	 * @type jQuery
	 * @param String|Number speed (optional) A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback (optional) A function to be executed whenever the animation completes.
	 * @cat Effects
	 * @see slideUp(String|Number,Function)
	 * @see slideToggle(String|Number,Function)
	 */
	slideDown: function(speed,callback){
		return this.animate({height: "show"}, speed, callback);
	},
	
	/**
	 * Hide all matched elements by adjusting their height and firing an
	 * optional callback after completion.
	 *
	 * Only the height is adjusted for this animation, causing all matched
	 * elements to be hidden in a "sliding" manner.
	 *
	 * @example $("p").slideUp("slow");
	 *
	 * @example $("p").slideUp("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name slideUp
	 * @type jQuery
	 * @param String|Number speed (optional) A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback (optional) A function to be executed whenever the animation completes.
	 * @cat Effects
	 * @see slideDown(String|Number,Function)
	 * @see slideToggle(String|Number,Function)
	 */
	slideUp: function(speed,callback){
		return this.animate({height: "hide"}, speed, callback);
	},

	/**
	 * Toggle the visibility of all matched elements by adjusting their height and firing an
	 * optional callback after completion.
	 *
	 * Only the height is adjusted for this animation, causing all matched
	 * elements to be hidden in a "sliding" manner.
	 *
	 * @example $("p").slideToggle("slow");
	 *
	 * @example $("p").slideToggle("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name slideToggle
	 * @type jQuery
	 * @param String|Number speed (optional) A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback (optional) A function to be executed whenever the animation completes.
	 * @cat Effects
	 * @see slideDown(String|Number,Function)
	 * @see slideUp(String|Number,Function)
	 */
	slideToggle: function(speed, callback){
		return this.each(function(){
			var state = jQuery(this).is(":hidden") ? "show" : "hide";
			jQuery(this).animate({height: state}, speed, callback);
		});
	},
	
	/**
	 * Fade in all matched elements by adjusting their opacity and firing an
	 * optional callback after completion.
	 *
	 * Only the opacity is adjusted for this animation, meaning that
	 * all of the matched elements should already have some form of height
	 * and width associated with them.
	 *
	 * @example $("p").fadeIn("slow");
	 *
	 * @example $("p").fadeIn("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name fadeIn
	 * @type jQuery
	 * @param String|Number speed (optional) A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback (optional) A function to be executed whenever the animation completes.
	 * @cat Effects
	 * @see fadeOut(String|Number,Function)
	 * @see fadeTo(String|Number,Number,Function)
	 */
	fadeIn: function(speed, callback){
		return this.animate({opacity: "show"}, speed, callback);
	},
	
	/**
	 * Fade out all matched elements by adjusting their opacity and firing an
	 * optional callback after completion.
	 *
	 * Only the opacity is adjusted for this animation, meaning that
	 * all of the matched elements should already have some form of height
	 * and width associated with them.
	 *
	 * @example $("p").fadeOut("slow");
	 *
	 * @example $("p").fadeOut("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name fadeOut
	 * @type jQuery
	 * @param String|Number speed (optional) A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback (optional) A function to be executed whenever the animation completes.
	 * @cat Effects
	 * @see fadeIn(String|Number,Function)
	 * @see fadeTo(String|Number,Number,Function)
	 */
	fadeOut: function(speed, callback){
		return this.animate({opacity: "hide"}, speed, callback);
	},
	
	/**
	 * Fade the opacity of all matched elements to a specified opacity and firing an
	 * optional callback after completion.
	 *
	 * Only the opacity is adjusted for this animation, meaning that
	 * all of the matched elements should already have some form of height
	 * and width associated with them.
	 *
	 * @example $("p").fadeTo("slow", 0.5);
	 *
	 * @example $("p").fadeTo("slow", 0.5, function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name fadeTo
	 * @type jQuery
	 * @param String|Number speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Number opacity The opacity to fade to (a number from 0 to 1).
	 * @param Function callback (optional) A function to be executed whenever the animation completes.
	 * @cat Effects
	 * @see fadeIn(String|Number,Function)
	 * @see fadeOut(String|Number,Function)
	 */
	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},
	
	/**
	 * A function for making your own, custom, animations. The key aspect of
	 * this function is the object of style properties that will be animated,
	 * and to what end. Each key within the object represents a style property
	 * that will also be animated (for example: "height", "top", or "opacity").
	 *
	 * The value associated with the key represents to what end the property
	 * will be animated. If a number is provided as the value, then the style
	 * property will be transitioned from its current state to that new number.
	 * Oterwise if the string "hide", "show", or "toggle" is provided, a default
	 * animation will be constructed for that property.
	 *
	 * @example $("p").animate({
	 *   height: 'toggle', opacity: 'toggle'
	 * }, "slow");
	 *
	 * @example $("p").animate({
	 *   left: 50, opacity: 'show'
	 * }, 500);
	 *
	 * @example $("p").animate({
	 *   opacity: 'show'
	 * }, "slow", "easein");
	 * @desc An example of using an 'easing' function to provide a different style of animation. This will only work if you have a plugin that provides this easing function (Only 'linear' is provided by default, with jQuery).
	 *
	 * @name animate
	 * @type jQuery
	 * @param Hash params A set of style attributes that you wish to animate, and to what end.
	 * @param String|Number speed (optional) A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param String easing (optional) The name of the easing effect that you want to use (Plugin Required).
	 * @param Function callback (optional) A function to be executed whenever the animation completes.
	 * @cat Effects
	 */
	animate: function( prop, speed, easing, callback ) {
		return this.queue(function(){
		
			this.curAnim = jQuery.extend({}, prop);
			var opt = jQuery.speed(speed, easing, callback);
			
			for ( var p in prop ) {
				var e = new jQuery.fx( this, opt, p );
				if ( prop[p].constructor == Number )
					e.custom( e.cur(), prop[p] );
				else
					e[ prop[p] ]( prop );
			}
			
		});
	},
	
	/**
	 *
	 * @private
	 */
	queue: function(type,fn){
		if ( !fn ) {
			fn = type;
			type = "fx";
		}
	
		return this.each(function(){
			if ( !this.queue )
				this.queue = {};
	
			if ( !this.queue[type] )
				this.queue[type] = [];
	
			this.queue[type].push( fn );
		
			if ( this.queue[type].length == 1 )
				fn.apply(this);
		});
	}

});

jQuery.extend({
	
	speed: function(speed, easing, fn) {
		var opt = speed && speed.constructor == Object ? speed : {
			complete: fn || !fn && easing || 
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && easing.constructor != Function && easing
		};

		opt.duration = (opt.duration && opt.duration.constructor == Number ? 
			opt.duration : 
			{ slow: 600, fast: 200 }[opt.duration]) || 400;
	
		// Queueing
		opt.old = opt.complete;
		opt.complete = function(){
			jQuery.dequeue(this, "fx");
			if ( jQuery.isFunction( opt.old ) )
				opt.old.apply( this );
		};
	
		return opt;
	},
	
	easing: {},
	
	queue: {},
	
	dequeue: function(elem,type){
		type = type || "fx";
	
		if ( elem.queue && elem.queue[type] ) {
			// Remove self
			elem.queue[type].shift();
	
			// Get next function
			var f = elem.queue[type][0];
		
			if ( f ) f.apply( elem );
		}
	},

	/*
	 * I originally wrote fx() as a clone of moo.fx and in the process
	 * of making it small in size the code became illegible to sane
	 * people. You've been warned.
	 */
	
	fx: function( elem, options, prop ){

		var z = this;

		// The styles
		var y = elem.style;
		
		// Store display property
		var oldDisplay = jQuery.css(elem, "display");

		// Set display property to block for animation
		y.display = "block";

		// Make sure that nothing sneaks out
		y.overflow = "hidden";

		// Simple function for setting a style value
		z.a = function(){
			if ( options.step )
				options.step.apply( elem, [ z.now ] );

			if ( prop == "opacity" )
				jQuery.attr(y, "opacity", z.now); // Let attr handle opacity
			else if ( parseInt(z.now) ) // My hate for IE will never die
				y[prop] = parseInt(z.now) + "px";
		};

		// Figure out the maximum number to run to
		z.max = function(){
			return parseFloat( jQuery.css(elem,prop) );
		};

		// Get the current size
		z.cur = function(){
			var r = parseFloat( jQuery.curCSS(elem, prop) );
			return r && r > -10000 ? r : z.max();
		};

		// Start an animation from one number to another
		z.custom = function(from,to){
			z.startTime = (new Date()).getTime();
			z.now = from;
			z.a();

			z.timer = setInterval(function(){
				z.step(from, to);
			}, 13);
		};

		// Simple 'show' function
		z.show = function(){
			if ( !elem.orig ) elem.orig = {};

			// Remember where we started, so that we can go back to it later
			elem.orig[prop] = this.cur();

			options.show = true;

			// Begin the animation
			z.custom(0, elem.orig[prop]);

			// Stupid IE, look what you made me do
			if ( prop != "opacity" )
				y[prop] = "1px";
		};

		// Simple 'hide' function
		z.hide = function(){
			if ( !elem.orig ) elem.orig = {};

			// Remember where we started, so that we can go back to it later
			elem.orig[prop] = this.cur();

			options.hide = true;

			// Begin the animation
			z.custom(elem.orig[prop], 0);
		};
		
		//Simple 'toggle' function
		z.toggle = function() {
			if ( !elem.orig ) elem.orig = {};

			// Remember where we started, so that we can go back to it later
			elem.orig[prop] = this.cur();

			if(oldDisplay == "none")  {
				options.show = true;
				
				// Stupid IE, look what you made me do
				if ( prop != "opacity" )
					y[prop] = "1px";

				// Begin the animation
				z.custom(0, elem.orig[prop]);	
			} else {
				options.hide = true;

				// Begin the animation
				z.custom(elem.orig[prop], 0);
			}		
		};

		// Each step of an animation
		z.step = function(firstNum, lastNum){
			var t = (new Date()).getTime();

			if (t > options.duration + z.startTime) {
				// Stop the timer
				clearInterval(z.timer);
				z.timer = null;

				z.now = lastNum;
				z.a();

				if (elem.curAnim) elem.curAnim[ prop ] = true;

				var done = true;
				for ( var i in elem.curAnim )
					if ( elem.curAnim[i] !== true )
						done = false;

				if ( done ) {
					// Reset the overflow
					y.overflow = "";
					
					// Reset the display
					y.display = oldDisplay;
					if (jQuery.css(elem, "display") == "none")
						y.display = "block";

					// Hide the element if the "hide" operation was done
					if ( options.hide ) 
						y.display = "none";

					// Reset the properties, if the item has been hidden or shown
					if ( options.hide || options.show )
						for ( var p in elem.curAnim )
							if (p == "opacity")
								jQuery.attr(y, p, elem.orig[p]);
							else
								y[p] = "";
				}

				// If a callback was provided, execute it
				if ( done && jQuery.isFunction( options.complete ) )
					// Execute the complete function
					options.complete.apply( elem );
			} else {
				var n = t - this.startTime;
				// Figure out where in the animation we are and set the number
				var p = n / options.duration;
				
				// If the easing function exists, then use it 
				z.now = options.easing && jQuery.easing[options.easing] ?
					jQuery.easing[options.easing](p, n,  firstNum, (lastNum-firstNum), options.duration) :
					// else use default linear easing
					((-Math.cos(p*Math.PI)/2) + 0.5) * (lastNum-firstNum) + firstNum;

				// Perform the next step of the animation
				z.a();
			}
		};
	
	}
});
jQuery.fn.extend({

	/**
	 * Load HTML from a remote file and inject it into the DOM, only if it's
	 * been modified by the server.
	 *
	 * @example $("#feeds").loadIfModified("feeds.html");
	 * @before <div id="feeds"></div>
	 * @result <div id="feeds"><b>45</b> feeds found.</div>
	 *
	 * @name loadIfModified
	 * @type jQuery
	 * @param String url The URL of the HTML file to load.
	 * @param Map params (optional) Key/value pairs that will be sent to the server.
	 * @param Function callback (optional) A function to be executed whenever the data is loaded (parameters: responseText, status and response itself).
	 * @cat Ajax
	 */
	loadIfModified: function( url, params, callback ) {
		this.load( url, params, callback, 1 );
	},

	/**
	 * Load HTML from a remote file and inject it into the DOM.
	 *
	 * Note: Avoid to use this to load scripts, instead use $.getScript.
	 * IE strips script tags when there aren't any other characters in front of it.
	 *
	 * @example $("#feeds").load("feeds.html");
	 * @before <div id="feeds"></div>
	 * @result <div id="feeds"><b>45</b> feeds found.</div>
	 *
 	 * @example $("#feeds").load("feeds.html",
 	 *   {limit: 25},
 	 *   function() { alert("The last 25 entries in the feed have been loaded"); }
 	 * );
	 * @desc Same as above, but with an additional parameter
	 * and a callback that is executed when the data was loaded.
	 *
	 * @name load
	 * @type jQuery
	 * @param String url The URL of the HTML file to load.
	 * @param Object params (optional) A set of key/value pairs that will be sent as data to the server.
	 * @param Function callback (optional) A function to be executed whenever the data is loaded (parameters: responseText, status and response itself).
	 * @cat Ajax
	 */
	load: function( url, params, callback, ifModified ) {
		if ( jQuery.isFunction( url ) )
			return this.bind("load", url);

		callback = callback || function(){};

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params )
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else {
				params = jQuery.param( params );
				type = "POST";
			}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			data: params,
			ifModified: ifModified,
			complete: function(res, status){
				if ( status == "success" || !ifModified && status == "notmodified" )
					// Inject the HTML into all the matched elements
					self.attr("innerHTML", res.responseText)
					  // Execute all the scripts inside of the newly-injected HTML
					  .evalScripts()
					  // Execute callback
					  .each( callback, [res.responseText, status, res] );
				else
					callback.apply( self, [res.responseText, status, res] );
			}
		});
		return this;
	},

	/**
	 * Serializes a set of input elements into a string of data.
	 * This will serialize all given elements.
	 *
	 * A serialization similar to the form submit of a browser is
	 * provided by the form plugin. It also takes multiple-selects 
	 * into account, while this method recognizes only a single option.
	 *
	 * @example $("input[@type=text]").serialize();
	 * @before <input type='text' name='name' value='John'/>
	 * <input type='text' name='location' value='Boston'/>
	 * @after name=John&location=Boston
	 * @desc Serialize a selection of input elements to a string
	 *
	 * @name serialize
	 * @type String
	 * @cat Ajax
	 */
	serialize: function() {
		return jQuery.param( this );
	},

	/**
	 * Evaluate all script tags inside this jQuery. If they have a src attribute,
	 * the script is loaded, otherwise it's content is evaluated.
	 *
	 * @name evalScripts
	 * @type jQuery
	 * @private
	 * @cat Ajax
	 */
	evalScripts: function() {
		return this.find("script").each(function(){
			if ( this.src )
				jQuery.getScript( this.src );
			else
				jQuery.globalEval( this.text || this.textContent || this.innerHTML || "" );
		}).end();
	}

});

// If IE is used, create a wrapper for the XMLHttpRequest object
if ( !window.XMLHttpRequest )
	XMLHttpRequest = function(){
		return new ActiveXObject("Microsoft.XMLHTTP");
	};

// Attach a bunch of functions for handling common AJAX events

/**
 * Attach a function to be executed whenever an AJAX request begins
 * and there is none already active.
 *
 * @example $("#loading").ajaxStart(function(){
 *   $(this).show();
 * });
 * @desc Show a loading message whenever an AJAX request starts
 * (and none is already active).
 *
 * @name ajaxStart
 * @type jQuery
 * @param Function callback The function to execute.
 * @cat Ajax
 */

/**
 * Attach a function to be executed whenever all AJAX requests have ended.
 *
 * @example $("#loading").ajaxStop(function(){
 *   $(this).hide();
 * });
 * @desc Hide a loading message after all the AJAX requests have stopped.
 *
 * @name ajaxStop
 * @type jQuery
 * @param Function callback The function to execute.
 * @cat Ajax
 */

/**
 * Attach a function to be executed whenever an AJAX request completes.
 *
 * The XMLHttpRequest and settings used for that request are passed
 * as arguments to the callback.
 *
 * @example $("#msg").ajaxComplete(function(request, settings){
 *   $(this).append("<li>Request Complete.</li>");
 * });
 * @desc Show a message when an AJAX request completes.
 *
 * @name ajaxComplete
 * @type jQuery
 * @param Function callback The function to execute.
 * @cat Ajax
 */

/**
 * Attach a function to be executed whenever an AJAX request completes
 * successfully.
 *
 * The XMLHttpRequest and settings used for that request are passed
 * as arguments to the callback.
 *
 * @example $("#msg").ajaxSuccess(function(request, settings){
 *   $(this).append("<li>Successful Request!</li>");
 * });
 * @desc Show a message when an AJAX request completes successfully.
 *
 * @name ajaxSuccess
 * @type jQuery
 * @param Function callback The function to execute.
 * @cat Ajax
 */

/**
 * Attach a function to be executed whenever an AJAX request fails.
 *
 * The XMLHttpRequest and settings used for that request are passed
 * as arguments to the callback. A third argument, an exception object,
 * is passed if an exception occured while processing the request.
 *
 * @example $("#msg").ajaxError(function(request, settings){
 *   $(this).append("<li>Error requesting page " + settings.url + "</li>");
 * });
 * @desc Show a message when an AJAX request fails.
 *
 * @name ajaxError
 * @type jQuery
 * @param Function callback The function to execute.
 * @cat Ajax
 */
 
/**
 * Attach a function to be executed before an AJAX request is sent.
 *
 * The XMLHttpRequest and settings used for that request are passed
 * as arguments to the callback.
 *
 * @example $("#msg").ajaxSend(function(request, settings){
 *   $(this).append("<li>Starting request at " + settings.url + "</li>");
 * });
 * @desc Show a message before an AJAX request is sent.
 *
 * @name ajaxSend
 * @type jQuery
 * @param Function callback The function to execute.
 * @cat Ajax
 */
jQuery.each( "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","), function(i,o){
	jQuery.fn[o] = function(f){
		return this.bind(o, f);
	};
});

jQuery.extend({

	/**
	 * Load a remote page using an HTTP GET request.
	 *
	 * @example $.get("test.cgi");
	 *
	 * @example $.get("test.cgi", { name: "John", time: "2pm" } );
	 *
	 * @example $.get("test.cgi", function(data){
	 *   alert("Data Loaded: " + data);
	 * });
	 *
	 * @example $.get("test.cgi",
	 *   { name: "John", time: "2pm" },
	 *   function(data){
	 *     alert("Data Loaded: " + data);
	 *   }
	 * );
	 *
	 * @name $.get
	 * @type XMLHttpRequest
	 * @param String url The URL of the page to load.
	 * @param Map params (optional) Key/value pairs that will be sent to the server.
	 * @param Function callback (optional) A function to be executed whenever the data is loaded.
	 * @cat Ajax
	 */
	get: function( url, data, callback, type, ifModified ) {
		// shift arguments if data argument was ommited
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = null;
		}
		
		return jQuery.ajax({
			url: url,
			data: data,
			success: callback,
			dataType: type,
			ifModified: ifModified
		});
	},

	/**
	 * Load a remote page using an HTTP GET request, only if it hasn't
	 * been modified since it was last retrieved.
	 *
	 * @example $.getIfModified("test.html");
	 *
	 * @example $.getIfModified("test.html", { name: "John", time: "2pm" } );
	 *
	 * @example $.getIfModified("test.cgi", function(data){
	 *   alert("Data Loaded: " + data);
	 * });
	 *
	 * @example $.getifModified("test.cgi",
	 *   { name: "John", time: "2pm" },
	 *   function(data){
	 *     alert("Data Loaded: " + data);
	 *   }
	 * );
	 *
	 * @name $.getIfModified
	 * @type XMLHttpRequest
	 * @param String url The URL of the page to load.
	 * @param Map params (optional) Key/value pairs that will be sent to the server.
	 * @param Function callback (optional) A function to be executed whenever the data is loaded.
	 * @cat Ajax
	 */
	getIfModified: function( url, data, callback, type ) {
		return jQuery.get(url, data, callback, type, 1);
	},

	/**
	 * Loads, and executes, a remote JavaScript file using an HTTP GET request.
	 *
	 * Warning: Safari <= 2.0.x is unable to evalulate scripts in a global
	 * context synchronously. If you load functions via getScript, make sure
	 * to call them after a delay.
	 *
	 * @example $.getScript("test.js");
	 *
	 * @example $.getScript("test.js", function(){
	 *   alert("Script loaded and executed.");
	 * });
	 *
	 * @name $.getScript
	 * @type XMLHttpRequest
	 * @param String url The URL of the page to load.
	 * @param Function callback (optional) A function to be executed whenever the data is loaded.
	 * @cat Ajax
	 */
	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	/**
	 * Load JSON data using an HTTP GET request.
	 *
	 * @example $.getJSON("test.js", function(json){
	 *   alert("JSON Data: " + json.users[3].name);
	 * });
	 *
	 * @example $.getJSON("test.js",
	 *   { name: "John", time: "2pm" },
	 *   function(json){
	 *     alert("JSON Data: " + json.users[3].name);
	 *   }
	 * );
	 *
	 * @name $.getJSON
	 * @type XMLHttpRequest
	 * @param String url The URL of the page to load.
	 * @param Map params (optional) Key/value pairs that will be sent to the server.
	 * @param Function callback A function to be executed whenever the data is loaded.
	 * @cat Ajax
	 */
	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	/**
	 * Load a remote page using an HTTP POST request.
	 *
	 * @example $.post("test.cgi");
	 *
	 * @example $.post("test.cgi", { name: "John", time: "2pm" } );
	 *
	 * @example $.post("test.cgi", function(data){
	 *   alert("Data Loaded: " + data);
	 * });
	 *
	 * @example $.post("test.cgi",
	 *   { name: "John", time: "2pm" },
	 *   function(data){
	 *     alert("Data Loaded: " + data);
	 *   }
	 * );
	 *
	 * @name $.post
	 * @type XMLHttpRequest
	 * @param String url The URL of the page to load.
	 * @param Map params (optional) Key/value pairs that will be sent to the server.
	 * @param Function callback (optional) A function to be executed whenever the data is loaded.
	 * @cat Ajax
	 */
	post: function( url, data, callback, type ) {
		if ( jQuery.isFunction( data ) ) {
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	// timeout (ms)
	//timeout: 0,

	/**
	 * Set the timeout of all AJAX requests to a specific amount of time.
	 * This will make all future AJAX requests timeout after a specified amount
	 * of time.
	 *
	 * Set to null or 0 to disable timeouts (default).
	 *
	 * You can manually abort requests with the XMLHttpRequest's (returned by
	 * all ajax functions) abort() method.
	 *
	 * Deprecated. Use $.ajaxSetup instead.
	 *
	 * @example $.ajaxTimeout( 5000 );
	 * @desc Make all AJAX requests timeout after 5 seconds.
	 *
	 * @name $.ajaxTimeout
	 * @type undefined
	 * @param Number time How long before an AJAX request times out.
	 * @cat Ajax
	 */
	ajaxTimeout: function( timeout ) {
		jQuery.ajaxSettings.timeout = timeout;
	},
	
	/**
	 * Setup global settings for AJAX requests.
	 *
	 * See $.ajax for a description of all available options.
	 *
	 * @example $.ajaxSetup( {
	 *   url: "/xmlhttp/",
	 *   global: false,
	 *   type: "POST"
	 * } );
	 * $.ajax({ data: myData });
	 * @desc Sets the defaults for AJAX requests to the url "/xmlhttp/",
	 * disables global handlers and uses POST instead of GET. The following
	 * AJAX requests then sends some data without having to set anything else.
	 *
	 * @name $.ajaxSetup
	 * @type undefined
	 * @param Map settings Key/value pairs to use for all AJAX requests
	 * @cat Ajax
	 */
	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		global: true,
		type: "GET",
		timeout: 0,
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		data: null
	},
	
	// Last-Modified header cache for next request
	lastModified: {},

	/**
	 * Load a remote page using an HTTP request.
	 *
	 * This is jQuery's low-level AJAX implementation. See $.get, $.post etc. for
	 * higher-level abstractions.
	 *
	 * $.ajax() returns the XMLHttpRequest that it creates. In most cases you won't
	 * need that object to manipulate directly, but it is available if you need to
	 * abort the request manually.
	 *
	 * Note: Make sure the server sends the right mimetype (eg. xml as
	 * "text/xml"). Sending the wrong mimetype will get you into serious
	 * trouble that jQuery can't solve.
	 *
	 * Supported datatypes are (see dataType option):
	 *
	 * "xml": Returns a XML document that can be processed via jQuery.
	 *
	 * "html": Returns HTML as plain text, included script tags are evaluated.
	 *
	 * "script": Evaluates the response as Javascript and returns it as plain text.
	 *
	 * "json": Evaluates the response as JSON and returns a Javascript Object
	 *
	 * $.ajax() takes one argument, an object of key/value pairs, that are
	 * used to initalize and handle the request. These are all the key/values that can
	 * be used:
	 *
	 * (String) url - The URL to request.
	 *
	 * (String) type - The type of request to make ("POST" or "GET"), default is "GET".
	 *
	 * (String) dataType - The type of data that you're expecting back from
	 * the server. No default: If the server sends xml, the responseXML, otherwise
	 * the responseText is passed to the success callback.
	 *
	 * (Boolean) ifModified - Allow the request to be successful only if the
	 * response has changed since the last request. This is done by checking the
	 * Last-Modified header. Default value is false, ignoring the header.
	 *
	 * (Number) timeout - Local timeout to override global timeout, eg. to give a
	 * single request a longer timeout while all others timeout after 1 second.
	 * See $.ajaxTimeout() for global timeouts.
	 *
	 * (Boolean) global - Whether to trigger global AJAX event handlers for
	 * this request, default is true. Set to false to prevent that global handlers
	 * like ajaxStart or ajaxStop are triggered.
	 *
	 * (Function) error - A function to be called if the request fails. The
	 * function gets passed tree arguments: The XMLHttpRequest object, a
	 * string describing the type of error that occurred and an optional
	 * exception object, if one occured.
	 *
	 * (Function) success - A function to be called if the request succeeds. The
	 * function gets passed one argument: The data returned from the server,
	 * formatted according to the 'dataType' parameter.
	 *
	 * (Function) complete - A function to be called when the request finishes. The
	 * function gets passed two arguments: The XMLHttpRequest object and a
	 * string describing the type of success of the request.
	 *
 	 * (Object|String) data - Data to be sent to the server. Converted to a query
	 * string, if not already a string. Is appended to the url for GET-requests.
	 * See processData option to prevent this automatic processing.
	 *
	 * (String) contentType - When sending data to the server, use this content-type.
	 * Default is "application/x-www-form-urlencoded", which is fine for most cases.
	 *
	 * (Boolean) processData - By default, data passed in to the data option as an object
	 * other as string will be processed and transformed into a query string, fitting to
	 * the default content-type "application/x-www-form-urlencoded". If you want to send
	 * DOMDocuments, set this option to false.
	 *
	 * (Boolean) async - By default, all requests are sent asynchronous (set to true).
	 * If you need synchronous requests, set this option to false.
	 *
	 * (Function) beforeSend - A pre-callback to set custom headers etc., the
	 * XMLHttpRequest is passed as the only argument.
	 *
	 * @example $.ajax({
	 *   type: "GET",
	 *   url: "test.js",
	 *   dataType: "script"
	 * })
	 * @desc Load and execute a JavaScript file.
	 *
	 * @example $.ajax({
	 *   type: "POST",
	 *   url: "some.php",
	 *   data: "name=John&location=Boston",
	 *   success: function(msg){
	 *     alert( "Data Saved: " + msg );
	 *   }
	 * });
	 * @desc Save some data to the server and notify the user once its complete.
	 *
	 * @example var html = $.ajax({
	 *  url: "some.php",
	 *  async: false
	 * }).responseText;
	 * @desc Loads data synchronously. Blocks the browser while the requests is active.
	 * It is better to block user interaction with others means when synchronization is
	 * necessary, instead to block the complete browser.
	 *
	 * @example var xmlDocument = [create xml document];
	 * $.ajax({
	 *   url: "page.php",
	 *   processData: false,
	 *   data: xmlDocument,
	 *   success: handleResponse
	 * });
	 * @desc Sends an xml document as data to the server. By setting the processData
	 * option to false, the automatic conversion of data to strings is prevented.
	 * 
	 * @name $.ajax
	 * @type XMLHttpRequest
	 * @param Map properties Key/value pairs to initialize the request with.
	 * @cat Ajax
	 * @see ajaxSetup(Map)
	 */
	ajax: function( s ) {
		// TODO introduce global settings, allowing the client to modify them for all requests, not only timeout
		s = jQuery.extend({}, jQuery.ajaxSettings, s);

		// if data available
		if ( s.data ) {
			// convert data if not already a string
			if (s.processData && typeof s.data != "string")
    			s.data = jQuery.param(s.data);
			// append data to url for get requests
			if( s.type.toLowerCase() == "get" )
				// "?" + data or "&" + data (in case there are already params)
				s.url += ((s.url.indexOf("?") > -1) ? "&" : "?") + s.data;
		}

		// Watch for a new set of requests
		if ( s.global && ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );

		var requestDone = false;

		// Create the request object
		var xml = new XMLHttpRequest();

		// Open the socket
		xml.open(s.type, s.url, s.async);

		// Set the correct header, if data is being sent
		if ( s.data )
			xml.setRequestHeader("Content-Type", s.contentType);

		// Set the If-Modified-Since header, if ifModified mode.
		if ( s.ifModified )
			xml.setRequestHeader("If-Modified-Since",
				jQuery.lastModified[s.url] || "Thu, 01 Jan 1970 00:00:00 GMT" );

		// Set header so the called script knows that it's an XMLHttpRequest
		xml.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		// Make sure the browser sends the right content length
		if ( xml.overrideMimeType )
			xml.setRequestHeader("Connection", "close");
			
		// Allow custom headers/mimetypes
		if( s.beforeSend )
			s.beforeSend(xml);
			
		if ( s.global )
		    jQuery.event.trigger("ajaxSend", [xml, s]);

		// Wait for a response to come back
		var onreadystatechange = function(isTimeout){
			// The transfer is complete and the data is available, or the request timed out
			if ( xml && (xml.readyState == 4 || isTimeout == "timeout") ) {
				requestDone = true;
				var status;
				try {
					status = jQuery.httpSuccess( xml ) && isTimeout != "timeout" ?
						s.ifModified && jQuery.httpNotModified( xml, s.url ) ? "notmodified" : "success" : "error";
					// Make sure that the request was successful or notmodified
					if ( status != "error" ) {
						// Cache Last-Modified header, if ifModified mode.
						var modRes;
						try {
							modRes = xml.getResponseHeader("Last-Modified");
						} catch(e) {} // swallow exception thrown by FF if header is not available
	
						if ( s.ifModified && modRes )
							jQuery.lastModified[s.url] = modRes;
	
						// process the data (runs the xml through httpData regardless of callback)
						var data = jQuery.httpData( xml, s.dataType );
	
						// If a local callback was specified, fire it and pass it the data
						if ( s.success )
							s.success( data, status );
	
						// Fire the global callback
						if( s.global )
							jQuery.event.trigger( "ajaxSuccess", [xml, s] );
					} else
						jQuery.handleError(s, xml, status);
				} catch(e) {
					status = "error";
					jQuery.handleError(s, xml, status, e);
				}

				// The request was completed
				if( s.global )
					jQuery.event.trigger( "ajaxComplete", [xml, s] );

				// Handle the global AJAX counter
				if ( s.global && ! --jQuery.active )
					jQuery.event.trigger( "ajaxStop" );

				// Process result
				if ( s.complete )
					s.complete(xml, status);

				// Stop memory leaks
				xml.onreadystatechange = function(){};
				xml = null;
			}
		};
		xml.onreadystatechange = onreadystatechange;

		// Timeout checker
		if ( s.timeout > 0 )
			setTimeout(function(){
				// Check to see if the request is still happening
				if ( xml ) {
					// Cancel the request
					xml.abort();

					if( !requestDone )
						onreadystatechange( "timeout" );
				}
			}, s.timeout);
			
		// save non-leaking reference 
		var xml2 = xml;

		// Send the data
		try {
			xml2.send(s.data);
		} catch(e) {
			jQuery.handleError(s, xml, null, e);
		}
		
		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async )
			onreadystatechange();
		
		// return XMLHttpRequest to allow aborting the request etc.
		return xml2;
	},

	handleError: function( s, xml, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) s.error( xml, status, e );

		// Fire the global callback
		if ( s.global )
			jQuery.event.trigger( "ajaxError", [xml, s, e] );
	},

	// Counter for holding the number of active queries
	active: 0,

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( r ) {
		try {
			return !r.status && location.protocol == "file:" ||
				( r.status >= 200 && r.status < 300 ) || r.status == 304 ||
				jQuery.browser.safari && r.status == undefined;
		} catch(e){}
		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xml, url ) {
		try {
			var xmlRes = xml.getResponseHeader("Last-Modified");

			// Firefox always returns 200. check Last-Modified date
			return xml.status == 304 || xmlRes == jQuery.lastModified[url] ||
				jQuery.browser.safari && xml.status == undefined;
		} catch(e){}
		return false;
	},

	/* Get the data out of an XMLHttpRequest.
	 * Return parsed XML if content-type header is "xml" and type is "xml" or omitted,
	 * otherwise return plain text.
	 * (String) data - The type of data that you're expecting back,
	 * (e.g. "xml", "html", "script")
	 */
	httpData: function( r, type ) {
		var ct = r.getResponseHeader("content-type");
		var data = !type && ct && ct.indexOf("xml") >= 0;
		data = type == "xml" || data ? r.responseXML : r.responseText;

		// If the type is "script", eval it in global context
		if ( type == "script" )
			jQuery.globalEval( data );

		// Get the JavaScript object, if JSON is used.
		if ( type == "json" )
			eval( "data = " + data );

		// evaluate scripts within html
		if ( type == "html" )
			jQuery("<div>").html(data).evalScripts();

		return data;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [];

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( a.constructor == Array || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				s.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( this.value ) );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( a[j] && a[j].constructor == Array )
					jQuery.each( a[j], function(){
						s.push( encodeURIComponent(j) + "=" + encodeURIComponent( this ) );
					});
				else
					s.push( encodeURIComponent(j) + "=" + encodeURIComponent( a[j] ) );

		// Return the resulting serialization
		return s.join("&");
	},
	
	// evalulates a script in global context
	// not reliable for safari
	globalEval: function( data ) {
		if ( window.execScript )
			window.execScript( data );
		else if ( jQuery.browser.safari )
			// safari doesn't provide a synchronous global eval
			window.setTimeout( data, 0 );
		else
			eval.call( window, data );
	}

});
}
/**
 *  jQuery Plugin highlightFade (jquery.offput.ca/highlightFade)
 *  (c) 2006 Blair Mitchelmore (offput.ca) blair@offput.ca
 */
/**
 * This is version 0.7 of my highlightFade plugin. It follows the yellow fade technique of Web 2.0 fame
 * but expands it to allow any starting colour and allows you to specify the end colour as well.
 *
 * For the moment, I'm done with this plug-in. Unless I come upon a really cool feature it should have
 * this plug-in will only receive updates to ensure future compatibility with jQuery.
 *
 * As of now (Aug. 16, 2006) the plugin has been written with the 1.0.1 release of jQuery (rev 249) which
 * is available from http://jquery.com/src/jquery-1.0.1.js
 *
 * A note regarding rgb() syntax: I noticed that most browsers implement rgb syntax as either an integer 
 * (0-255) or percentage (0-100%) value for each field, that is, rgb(i/p,i/p,i/p); however, the W3C 
 * standard clearly defines it as "either three integer values or three percentage values" [http://www.w3.org/TR/CSS21/syndata.html] 
 * which I choose to follow despite the error redundancy of the typical behaviour browsers employ.
 *
 * Changelog:
 *
 *    0.7:
 *        - Added the awesome custom attribute support written by George Adamson (slightly modified)
 *        - Removed bgColor plugin dependency seeing as attr is customizable now...
 *    0.6:
 *        - Abstracted getBGColor into its own plugin with optional test and data retrieval functions
 *        - Converted all $ references to jQuery references as John's code seems to be shifting away
 *          from that and I don't want to have to update this for a long time.
 *    0.5:
 *        - Added simple argument syntax for only specifying start colour of event
 *        - Removed old style argument syntax
 *        - Added 'interval', 'final, and 'end' properties
 *        - Renamed 'color' property to 'start'
 *        - Added second argument to $.highlightFade.getBGColor to bypass the e.highlighting check
 *    0.4:
 *        - Added rgb(%,%,%) color syntax
 *    0.3:
 *        - Fixed bug when event was called while parent was also running event corrupting the
 *          the background colour of the child
 *    0.2:
 *        - Fixed bug where an unspecified onComplete function made the page throw continuous errors
 *        - Fixed bug where multiple events on the same element would speed each subsequent event
 *    0.1:
 *        - Initial Release
 * 
 * @author          Blair Mitchelmore (blair@offput.ca)
 * @version         0.5
 */
jQuery.fn.highlightFade = function(settings) {
	var o = (settings && settings.constructor == String) ? {start: settings} : settings || {};
	var d = jQuery.highlightFade.defaults;
	var i = o['interval'] || d['interval'];
	var a = o['attr'] || d['attr'];
	var ts = {
		'linear': function(s,e,t,c) { return parseInt(s+(c/t)*(e-s)); },
		'sinusoidal': function(s,e,t,c) { return parseInt(s+Math.sin(((c/t)*90)*(Math.PI/180))*(e-s)); },
		'exponential': function(s,e,t,c) { return parseInt(s+(Math.pow(c/t,2))*(e-s)); }
	};
	var t = (o['iterator'] && o['iterator'].constructor == Function) ? o['iterator'] : ts[o['iterator']] || ts[d['iterator']] || ts['linear'];
	if (d['iterator'] && d['iterator'].constructor == Function) t = d['iterator'];
	return this.each(function() {
		if (!this.highlighting) this.highlighting = {};
		var e = (this.highlighting[a]) ? this.highlighting[a].end : jQuery.highlightFade.getBaseValue(this,a) || [255,255,255];
		var c = jQuery.highlightFade.getRGB(o['start'] || o['colour'] || o['color'] || d['start'] || [255,255,128]);
		var s = jQuery.speed(o['speed'] || d['speed']);
		var r = o['final'] || (this.highlighting[a] && this.highlighting[a].orig) ? this.highlighting[a].orig : jQuery.curCSS(this,a);
		if (o['end'] || d['end']) r = jQuery.highlightFade.asRGBString(e = jQuery.highlightFade.getRGB(o['end'] || d['end']));
		if (typeof o['final'] != 'undefined') r = o['final'];
		if (this.highlighting[a] && this.highlighting[a].timer) window.clearInterval(this.highlighting[a].timer);
		this.highlighting[a] = { steps: ((s.duration) / i), interval: i, currentStep: 0, start: c, end: e, orig: r, attr: a };
		jQuery.highlightFade(this,a,o['complete'],t);
	});
};

jQuery.highlightFade = function(e,a,o,t) {
	e.highlighting[a].timer = window.setInterval(function() { 
		var newR = t(e.highlighting[a].start[0],e.highlighting[a].end[0],e.highlighting[a].steps,e.highlighting[a].currentStep);
		var newG = t(e.highlighting[a].start[1],e.highlighting[a].end[1],e.highlighting[a].steps,e.highlighting[a].currentStep);
		var newB = t(e.highlighting[a].start[2],e.highlighting[a].end[2],e.highlighting[a].steps,e.highlighting[a].currentStep);
		jQuery(e).css(a,jQuery.highlightFade.asRGBString([newR,newG,newB]));
		if (e.highlighting[a].currentStep++ >= e.highlighting[a].steps) {
			jQuery(e).css(a,e.highlighting[a].orig || '');
			window.clearInterval(e.highlighting[a].timer);
			e.highlighting[a] = null;
			if (o && o.constructor == Function) o.call(e);
		}
	},e.highlighting[a].interval);
};

jQuery.highlightFade.defaults = {
	start: [255,255,128],
	interval: 50,
	speed: 400,
	attr: 'backgroundColor'
};

jQuery.highlightFade.getRGB = function(c,d) {
	var result;
	if (c && c.constructor == Array && c.length == 3) return c;
	if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))
		return [parseInt(result[1]),parseInt(result[2]),parseInt(result[3])];
	else if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))
		return [parseFloat(result[1])*2.55,parseFloat(result[2])*2.55,parseFloat(result[3])*2.55];
	else if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))
		return [parseInt("0x" + result[1]),parseInt("0x" + result[2]),parseInt("0x" + result[3])];
	else if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))
		return [parseInt("0x"+ result[1] + result[1]),parseInt("0x" + result[2] + result[2]),parseInt("0x" + result[3] + result[3])];
	else
		return jQuery.highlightFade.checkColorName(c) || d || null;
};

jQuery.highlightFade.asRGBString = function(a) {
	return "rgb(" + a.join(",") + ")";
};

jQuery.highlightFade.getBaseValue = function(e,a,b) {
	var s, t;
	b = b || false;
	t = a = a || jQuery.highlightFade.defaults['attr'];
	do {
		s = jQuery(e).css(t || 'backgroundColor');
		if ((s  != '' && s != 'transparent') || (e.tagName.toLowerCase() == "body") || (!b && e.highlighting && e.highlighting[a] && e.highlighting[a].end)) break; 
		t = false;
	} while (e = e.parentNode);
	if (!b && e.highlighting && e.highlighting[a] && e.highlighting[a].end) s = e.highlighting[a].end;
	if (s == undefined || s == '' || s == 'transparent') s = [255,255,255];
	return jQuery.highlightFade.getRGB(s);
};

jQuery.highlightFade.checkColorName = function(c) {
	if (!c) return null;
	switch(c.replace(/^\s*|\s*$/g,'').toLowerCase()) {
		case 'aqua': return [0,255,255];
		case 'black': return [0,0,0];
		case 'blue': return [0,0,255];
		case 'fuchsia': return [255,0,255];
		case 'gray': return [128,128,128];
		case 'green': return [0,128,0];
		case 'lime': return [0,255,0];
		case 'maroon': return [128,0,0];
		case 'navy': return [0,0,128];
		case 'olive': return [128,128,0];
		case 'purple': return [128,0,128];
		case 'red': return [255,0,0];
		case 'silver': return [192,192,192];
		case 'teal': return [0,128,128];
		case 'white': return [255,255,255];
		case 'yellow': return [255,255,0];
	}
};
/*
 * Tooltip - jQuery plugin  for styled tooltips
 *
 * Copyright (c) 2006 Jörn Zaefferer, Stefan Petre
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.tooltip.js 757 2006-12-22 10:10:40Z joern $
 *
 */

/**
 * Display a customized tooltip instead of the default one
 * for every selected element. The tooltip behaviour mimics
 * the default one, but lets you style the tooltip and
 * specify the delay before displaying it.
 *
 * In addition, it displays the href value, if it is available.
 * 
 * To style the tooltip, use these selectors in your stylesheet:
 *
 * #tooltip - The tooltip container
 *
 * #tooltip h3 - The tooltip title
 *
 * #tooltip p.body - The tooltip body, shown when using showBody
 *
 * #tooltip p.url - The tooltip url, shown when using showURL
 *
 * @example $('a, input, img').Tooltip();
 * @desc Shows tooltips for anchors, inputs and images, if they have a title
 *
 * @example $('label').Tooltip({
 *   delay: 0,
 *   track: true,
 *   event: "click"
 * });
 * @desc Shows tooltips for labels with no delay, tracking mousemovement, displaying the tooltip when the label is clicked.
 *
 * @example // modify global settings
 * $.extend($.fn.Tooltip.defaults, {
 * 	track: true,
 * 	delay: 0,
 * 	showURL: false,
 * 	showBody: " - ",
 *  fixPNG: true
 * });
 * // setup fancy tooltips
 * $('a.pretty').Tooltip({
 * 	 extraClass: "fancy"
 * });
 $('img.pretty').Tooltip({
 * 	 extraClass: "fancy-img",
 * });
 * @desc This example starts with modifying the global settings, applying them to all following Tooltips; Afterwards, Tooltips for anchors with class pretty are created with an extra class for the Tooltip: "fancy" for anchors, "fancy-img" for images
 *
 * @param Object settings (optional) Customize your Tooltips
 * @option Number delay The number of milliseconds before a tooltip is display, default is 250
 * @option String event The event on which the tooltip is displayed, default is "mouseover", "click" works fine, too
 * @option Boolean track If true, let the tooltip track the mousemovement, default is false
 * @option Boolean showURL If true, shows the href or src attribute within p.url, default is true
 * @option String showBody If specified, uses the String to split the title, displaying the first part in the h3 tag, all following in the p.body tag, separated with <br/>s, default is null
 * @option String extraClass If specified, adds the class to the tooltip helper, default is null
 * @option Boolean fixPNG If true, fixes transparent PNGs in IE, default is false
 *
 * @name Tooltip
 * @type jQuery
 * @cat Plugins/Tooltip
 * @author Jörn Zaefferer (http://bassistance.de)
 */
(function($) {
	
	// the tooltip element
	var helper,
		// it's title part
		tTitle,
		// it's body part
		tBody,
		// it's url part
		tUrl,
		// the current tooltipped element
		current,
		// the title of the current element, used for restoring
		oldTitle,
		// timeout id for delayed tooltips
		tID;
	
	// the public plugin method
	$.fn.Tooltip = function(settings) {
		// setup configuration
		// TODO: allow multiple arguments to extend, see bug #344
		settings = $.extend({}, arguments.callee.defaults, settings);
	
		// there can be only one tooltip helper
		if( !helper ) {
			// create the helper, h3 for title, div for url
			helper = $('<div id="tooltip"><h3></h3><p class="body"></p><p class="url"></p></div>')
				// hide it at first
				.hide()
				// move to top and position absolute, to let it follow the mouse
				.css({ position: 'absolute', zIndex: "3000" })
				// add to document
				.appendTo('body');
				
			// save references to title and url elements
			tTitle = $('h3', helper);
			tBody = $('p:eq(0)', helper);
			tUrl = $('p:eq(1)', helper);
		}
		
		// bind events for every selected element with a title attribute
		$(this).filter('[@title]')
			// save settings into each element
			// TODO: pass settings via event system, not yet possible
			.each(function() {
				this.tSettings = settings;
			})
			// bind events
			.bind("mouseover", save)
			.bind(settings.event, handle);
		return this;
	};
	
	// main event handler to start showing tooltips
	function handle(event) {
		// show helper, either with timeout or on instant
		if( this.tSettings.delay )
			tID = setTimeout(show, this.tSettings.delay);
		else
			show();
		
		// if selected, update the helper position when the mouse moves
		if(this.tSettings.track)
			$('body').bind('mousemove', update);
			
		// update at least once
		update(event);
		
		// hide the helper when the mouse moves out of the element
		$(this).bind('mouseout', hide);
	}
	
	// save elements title before the tooltip is displayed
	function save() {
		// if this is the current source, or it has no title (occurs with click event), stop
		if(this == current || !this.title)
			return;
		// save current
		current = this;
		
		var source = $(this),
			settings = this.tSettings;
			
		// save title, remove from element and set to helper
		var title = oldTitle = source.attr('title');
		source.attr('title','');
		if(settings.showBody) {
			var parts = title.split(settings.showBody);
			tTitle.html(parts.shift());
			tBody.empty();
			for(var i = 0, part; part = parts[i]; i++) {
				if(i > 0)
					tBody.append("<br/>");
				tBody.append(part);
			}
			if(tBody.html())
				tBody.show();
			else
				tBody.hide();
		} else {
			tTitle.html(title);
			tBody.hide();
		}
		
		// if element has href or src, add and show it, otherwise hide it
		var href = (source.attr('href') || source.attr('src'));
		if( settings.showURL && href )
			tUrl.html(href.replace('http://', '')).show();
		else 
			tUrl.hide();
		
		// add an optional class for this tip
		if( settings.extraClass ) {
			helper.addClass(settings.extraClass);
		}
		// fix PNG background for IE
		if (settings.fixPNG && $.browser.msie ) {
			helper.each(function () {
				if (this.currentStyle.backgroundImage != 'none') {
					var image = this.currentStyle.backgroundImage;
					image = image.substring(5, image.length - 2);
					$(this).css({
						'backgroundImage': 'none',
						'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
					});
				}
			});
		}
	}
	
	// delete timeout and show helper
	function show() {
		tID = null;
		helper.show();
		update();
	}
	
	/**
	 * callback for mousemove
	 * updates the helper position
	 * removes itself when no current element
	 */
	function update(event)	{
		// if no current element is available, remove this listener
		if( current == null ) {
			$('body').unbind('mousemove', update);
			return;	
		}
		
		var left = helper[0].offsetLeft;
		var top = helper[0].offsetTop;
		if(event) {
			// position the helper 15 pixel to bottom right, starting from mouse position
			left = event.pageX + 15;
			top = event.pageY + 15;
			helper.css({
				left: left,
				top: top
			});
		}
		
		var v = viewport(),
			h = helper[0];
		// check horizontal position
		if(v.x + v.cx < h.offsetLeft + h.offsetWidth) {
			left -= h.offsetWidth + 20;
			helper.css({left: left});
		}
		// check vertical position
		if(v.y + v.cy < h.offsetTop + h.offsetHeight) {
			top -= h.offsetHeight + 20;
			helper.css({top: top});
		}
	}
	
	function viewport() {
		var e = document.documentElement || {},
			b = document.body || {},
			w = window;
		function min() {
			var v = Infinity;
			for( var i = 0;  i < arguments.length;  i++ ) {
				var n = arguments[i];
				if( n && n < v ) v = n;
			}
			return v;
		}
		return {
			x: w.pageXOffset || e.scrollLeft || b.scrollLeft || 0,
			y: w.pageYOffset || e.scrollTop || b.scrollTop || 0,
			cx: min( e.clientWidth, b.clientWidth, w.innerWidth ),
			cy: min( e.clientHeight, b.clientHeight, w.innerHeight )
		};
	}
	
	// hide helper and restore added classes and the title
	function hide() {
		// clear timeout if possible
		if(tID)
			clearTimeout(tID);
		// no more current element
		current = null;
		helper.hide();
		// remove optional class
		if( this.tSettings.extraClass ) {
			helper.removeClass( this.tSettings.extraClass);
		}
		
		// restore title and remove this listener
		$(this)
			.attr('title', oldTitle)
			.unbind('mouseout', hide);
			
		// remove PNG background fix for IE
		if( this.tSettings.fixPNG && $.browser.msie ) {
			helper.each(function () {
				$(this).css({'filter': '', backgroundImage: ''});
			});
		}
	}
	
	// define global defaults, editable by client
	$.fn.Tooltip.defaults = {
		delay: 250,
		event: "mouseover",
		track: false,
		showURL: true,
		showBody: null,
		extraClass: null,
		fixPNG: false
	};

})(jQuery);/*
 * Treeview 1.0 - jQuery plugin to hide and show branches of a tree
 *
 * Copyright (c) 2006 Jörn Zaefferer, Myles Angell
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.treeview.js 1195 2007-01-25 12:33:29Z joern $
 *
 */

/**
 * Takes an unordered list and makes all branches collapsable.
 *
 * The "treeview" class is added if not already present.
 *
 * To hide branches on first display, mark their li elements with
 * the class "closed". If the "collapsed" option is used, mark intially open
 * branches with class "open".
 *
 * @example .treeview, .treeview ul { 
 * 	padding: 0;
 * 	margin: 0;
 * 	list-style: none;
 * }	
 * 
 * .treeview li { 
 * 	position: relative;
 * 	margin: 0;
 * 	padding: 4px 0 3px 20px;
 * 	z-index: 10;
 * }
 * 
 * .treeview li { background: url(images/tv-item.gif) 0 0 no-repeat; }
 * .treeview .collapsable { background-image: url(images/tv-collapsable.gif); }
 * .treeview .expandable { background-image: url(images/tv-expandable.gif); }
 * .treeview .last { background-image: url(images/tv-item-last.gif); }
 * .treeview .lastCollapsable { background-image: url(images/tv-collapsable-last.gif); }
 * .treeview .lastExpandable { background-image: url(images/tv-expandable-last.gif); }
 * @desc The following styles are necessary in your stylesheet. There is an alternative set of images available.
 *
 * @example $("ul").Treeview();
 * @before <ul>
 *   <li>Item 1
 *     <ul>
 *       <li>Item 1.1</li>
 *     </ul>
 *   </li>
 *   <li class="closed">Item 2 (starts closed)
 *     <ul>
 *       <li>Item 2.1
 *         <ul>
 *           <li>Item 2.1.1</li>
 *           <li>Item 2.1.2</li>
 *         </ul>
 *       </li>
 *       <li>Item 2.2</li>
 *     </ul>
 *   </li>
 *   <li>Item 3</li>
 * </ul>
 * @desc Basic usage example
 *
 * @example $("ul").Treeview({ speed: "fast", collapsed: true});
 * @before <ul>
 *   <li class="open">Item 1 (starts open)
 *     <ul>
 *       <li>Item 1.1</li>
 *     </ul>
 *   </li>
 *   <li>Item 2
 *     <ul>
 *       <li>Item 2.1</li>
 *       <li>Item 2.2</li>
 *     </ul>
 *   </li>
 * </ul>
 * @desc Create a treeview that starts collapsed. Toggling branches is animated.
 *
 * @example $("ul").Treeview({ control: #treecontrol });
 * @before <div id="treecontrol">
 *   <a href="#">Collapse All</a>
 *   <a href="#">Expand All</a>
 *   <a href="#">Toggle All</a>
 * </div>
 * @desc Creates a treeview that can be controlled with a few links.
 * Very likely to be changed/improved in future versions.
 *
 * @param Map options Optional settings to configure treeview
 * @option String|Number speed Speed of animation, see animate() for details. Default: none, no animation
 * @option Boolean collapsed Start with all branches collapsed. Default: none, all expanded
 * @option <Content> control Container for a treecontrol, see last example.
 * @type jQuery
 * @name Treeview
 * @cat Plugins/Treeview
 */

(function($) {

	// classes used by the plugin
	// need to be styled via external stylesheet, see first example
	var CLASSES = {
		open: "open",
		closed: "closed",
		expandable: "expandable",
		collapsable: "collapsable",
		lastCollapsable: "lastCollapsable",
		lastExpandable: "lastExpandable",
		last: "last",
		hitarea: "hitarea"
	};
	
	// styles for hitareas
	var hitareaCSS = {
		height: 15,
		width: 15,
		position: "absolute",
		top: 1,
		left: -1,
		cursor: "pointer",
		zIndex: 50
	};
	
	// ie specific stlyes for hitareas
	if( $.browser.msie )
		$.extend( hitareaCSS, {
			background: "#fff",
			filter: "alpha(opacity=0)",
			left: -21
		});

	// necessary helper method
	$.fn.swapClass = function(c1,c2) {
		return this.each(function() {
			var $this = $(this);
			if ( $.className.has(this, c1) )
				$this.removeClass(c1).addClass(c2);
			else if ( $.className.has(this, c2) )
				$this.removeClass(c2).addClass(c1);
		});
	};
	
	// define plugin method
	$.fn.Treeview = function(settings) {
	
		// currently no defaults necessary, all implicit
		settings = $.extend({}, settings);
	
		// factory for treecontroller
		function treeController(tree, control) {
			// factory for click handlers
			function handler(filter) {
				return function() {
					// reuse toggle event handler, applying the elements to toggle
					// start searching for all hitareas
					toggler.apply( $("div." + CLASSES.hitarea, tree).filter(function() {
						// for plain toggle, no filter is provided, otherwise we need to check the parent element
						return filter ? $(this).parent("." + filter).length : true;
					}) );
					return false;
				}
			}
			// click on first element to collapse tree
			$(":eq(0)", control).click( handler(CLASSES.collapsable) );
			// click on second to expand tree
			$(":eq(1)", control).click( handler(CLASSES.expandable) );
			// click on third to toggle tree
			$(":eq(2)", control).click( handler() ); 
		}
	
		// handle toggle event
		function toggler() {
			// this refers to hitareas, we need to find the parent lis first
			$(this).parent()
				// swap classes
				.swapClass(CLASSES.collapsable, CLASSES.expandable)
				.swapClass(CLASSES.lastCollapsable, CLASSES.lastExpandable)
				// find child lists
				.find(">ul")
				// toggle them
				.toggle(settings.speed);
		}

		// add treeview class to activate styles
		this.addClass("treeview");
		
		// mark last tree items
		$("li:last-child", this).addClass(CLASSES.last);
		
		// collapse whole tree, or only those marked as closed, anyway except those marked as open
		$( (settings.collapsed ? "li" : "li." + CLASSES.closed) + ":not(." + CLASSES.open + ") > ul", this).hide();
		
		// find all tree items with child lists
		$("li[ul]", this)
			// handle closed ones first
			.filter("[>ul:hidden]")
				.addClass(CLASSES.expandable)
				.swapClass(CLASSES.last, CLASSES.lastExpandable)
				.end()
			// handle open ones
			.not("[>ul:hidden]")
				.addClass(CLASSES.collapsable)
				.swapClass(CLASSES.last, CLASSES.lastCollapsable)
				.end()
			// append hitarea
			.append("<div class=\"" + CLASSES.hitarea + "\">")
			// find hitarea
			.find("div." + CLASSES.hitarea)
			// apply styles to hitarea
			.css(hitareaCSS)
			// apply toggle event to hitarea
			.toggle( toggler, toggler );
		
		// if control option is set, create the treecontroller
		if(settings.control)
			treeController(this, settings.control);
		
		return this;
	}
})(jQuery);/*
 * quicksearch 1.0 - jQuery plugin to filter elements like lists or tables
 *
 * Copyright (c) 2007 Rik Lomas, Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.quicksearch.js 1219 2007-01-29 20:45:54Z joern $
 *
 */
 
(function($) {

$.fn.quicksearch = function (options) {
	
	this.timeout = null;
	
	this.settings = $.extend({
		position: 'prepend',
		attached: 'body',
		formId: 'quicksearch',
		labelText: 'Quick Search',
		labelClass: 'qs_label',
		inputText: null,
		inputClass: 'qs_input',
		loaderId: 'loader',
		loaderClass: 'loader',
		loaderImg: null,
		loaderText: 'Loading...',
		stripeRowClass: null,
		hideElement: null,
		delay: 250,
		focusOnLoad: false,
		randomElement: 'qs'+Math.floor(Math.random()*1000000)
	}, options);
	
	var el 		= this;
		
	var form1 	= new Form(this.settings);
	var key1	= new Key(this.settings);
	var loader	= new Loader(this.settings);
	var stripes = new Stripe(this.settings.stripeRowClass);	
	
	form1.initialize();
	loader.setTo('hide');	
	
	if(this.settings.stripeRowClass != null) {
		$(el).each(function () {			
			if(el.settings.hideElement == "grandparent") {
				stripes.go(this.parentNode.parentNode);
			} else if (el.settings.hideElement == "parent") {
				stripes.go(this.parentNode);
			} else {
				stripes.go(this);
			}
		});
		stripes.reset();
	}		
	
	$('form.quicksearch').submit( function () { return false; });
	
	$('input[@rel="'+this.settings.randomElement+'"]').keydown(function(e) {
		switch(e.keyCode) {
			case 9: 
			case 13:
			case 38: 
			case 40:
				e.preventDefault();
				break;
			default:
				clearTimeout(this.timeout);				
			
				this.timeout = setTimeout(function () {
						loader.setTo('show');
						setTimeout( function () {
						
							key1.setKey();
							
							$(el).each( function () {
							
								if(el.settings.hideElement == "grandparent") {
									var hide = $(this).parent().parent();
								} else if (el.settings.hideElement == "parent") {
									var hide = $(this).parent();
								} else {
									var hide = $(this)
								}
							
								$(hide)[ key1.test(this) ? "show" : "hide" ]();
								
								if(el.settings.stripeRowClass != null) {									
									if(el.settings.hideElement == "grandparent") {
										stripes.go(this.parentNode.parentNode);
									} else if (el.settings.hideElement == "parent") {
										stripes.go(this.parentNode);
									} else {
										stripes.go(this);
									}
								}				
							});						
							stripes.reset();
						}, el.settings.delay);						
						setTimeout( function () { 
							loader.setTo('hide');
						}, el.settings.delay);
				}, el.settings.delay);
				break;
		}
	});
};
	
function Key(set) {
	this.key = "";
	this.settings = set;
	this.getKey = function ()  {
		return this.key;
	};
	this.setKey = function () {
		var input = $('input[@rel="'+this.settings.randomElement+'"]').val();
		var string = input.replace(/\s{2,}/g, " ").toLowerCase();
		var arr = string.split(" ");
		for(var i in arr) {
			var regexp = new RegExp(/([^A-Za-z0-9])/gi);
			if(arr[i] == "") {
				arr.splice(i,1);
			}
		}
		this.key = arr;
	};
	this.test = function (el) {
		if( this.getKey() == '' ) {
			return true;
		} else {			
			var searchStrings = this.getKey();
			var text = $(el).html().replace(/<\/?[^>]+>/g, '').toLowerCase();	
			for (var i = 0; i < searchStrings.length; i++) {
				var test = text.indexOf(searchStrings[i]);	
				if (test == -1) {	
					return false;
				}
			}			
			return true;
		}
	}	
}
	
function Form(set) {	
	this.settings = set;
	
	this.initialize = function () {
		this.placeForm();
		if(this.settings.focusOnLoad) {
			this.focusOnLoad();
		}
		if(this.settings.inputText != "" && this.settings.inputText != null) {
			this.toggleText();
		}

	};
	this.placeForm = function () {
		var formPosition 	= this.settings.position;
		var formAttached 	= this.settings.attached;
					
		if(formPosition == 'before') {
			$(formAttached).before( makeForm(this.settings) );
		} else if(formPosition == 'prepend') {
			$(formAttached).prepend( makeForm(this.settings) );
		} else if(formPosition == 'append') {
			$(formAttached).append( makeForm(this.settings) );
		} else {
			$(formAttached).after( makeForm(this.settings) );
		}
	};
	this.focusOnLoad = function () {
		$('input[@rel="'+this.settings.randomElement+'"]').get(0).focus();
	};
	this.toggleText = function () {
		var el = this;
		$('input[@rel="'+this.settings.randomElement+'"]').focus(function () {
			if($(this).val() == el.settings.inputText) {
				$(this).val('');
			}
		});
		$('input[@rel="'+this.settings.randomElement+'"]').blur(function () {
			if($(this).val() == "") {
				$(this).val(el.settings.inputText);
			}
		})
	};	
};

function Loader(set) {
	this.settings = set;
	this.setTo = function (to) {
		if(this.settings.loaderId) {
			if(to == 'hide') {
				$('input[@rel="'+this.settings.randomElement+'"]').parent().find('.loader').hide();
			} else {
				$('input[@rel="'+this.settings.randomElement+'"]').parent().find('.loader').show();
			}			
		}
	};
}

function Stripe(set) {
	this.i = 0;
	this.set = set;
	this.go = function (el) {
		this.removeClasses(el);
		if(el.getAttribute('style') != "display: none;") {				
			$(el).addClass(this.set[this.i%this.set.length]);
			this.i += 1;
		}
	}; 
	this.removeClasses = function (el) {
		for(var j = 0; j < this.set.length; j++) {
			if(this.i%this.set.length != j) {
				$(el).removeClass(this.set[j]);
			}
		}
	};
	this.reset = function () {
		this.i = 0;
	};
}

function makeForm(set) {
	this.settings = set;
	this.mform = function () {
		return '<form action="#" ' + 
						'id="'+ this.settings.formId + '" ' +
						'class="quicksearch">' +
						this.mlabel() +
						this.minput() +
						this.mloader() +		
						'</form>';
	};
	this.mlabel = function () {
		if(!this.isEmpty(this.settings.labelText)) {
			return '<label for="' + this.settings.inputId + '" '+
						'class="' + this.settings.labelClass + '">'
						+ this.settings.labelText
						+ '</label> ';	
		}
		return '';
	};
	this.minput = function () {			
		var val = (!this.isEmpty(this.settings.inputText)) ? this.settings.inputText : "";
		return '<input type="text" ' +
					'value="' + val + '" ' + 
					'rel="' + this.settings.randomElement  + '" ' +
					'class="' + this.settings.inputClass + '" ' +
					'/> ';	
	};
	this.mloader = function () {
		if(!this.isEmpty(this.settings.loaderImg)) {
			return '<img src="' + this.settings.loaderImg + '" alt="Loading" id="' + this.settings.loaderId + '" class="' + this.settings.loaderClass + '" />';
		} else {
			return '<span id="' + this.settings.loaderId + '" class="' + this.settings.loaderClass + '">' + this.settings.loaderText + '</span>';
		}
	};
	this.isEmpty = function (input) {
		return (input == null || input == undefined || input == '' || input == 0) ? true: false;
	};
	return this.mform();
}

})(jQuery);/**
 * Tabs 2.6 - jQuery plugin for accessible, unobtrusive tabs
 *
 * http://stilbuero.de/tabs/
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($) { // simulate block scope

/**
 * Create an accessible, unobtrusive tab interface based on a particular HTML structure.
 *
 * The underlying HTML has to look like this:
 *
 * <div id="container">
 *     <ul>
 *         <li><a href="#section-1">Section 1</a></li>
 *         <li><a href="#section-2">Section 2</a></li>
 *         <li><a href="#section-3">Section 3</a></li>
 *     </ul>
 *     <div id="section-1">
 *
 *     </div>
 *     <div id="section-2">
 *
 *     </div>
 *     <div id="section-3">
 *
 *     </div>
 * </div>
 *
 * Each anchor in the unordered list points directly to a section below represented by one of the
 * divs (the URI in the anchor's href attribute refers to the fragment with the corresponding id).
 * Because such HTML structure is fully functional on its own, e.g. without JavaScript, the tab
 * interface is accessible and unobtrusive.
 *
 * A tab is also bookmarkable via hash in the URL. Use the History/Remote plugin (Tabs will
 * auto-detect its presence) to fix the back (and forward) button.
 *
 * @example $('#container').tabs();
 * @desc Create a basic tab interface.
 * @example $('#container').tabs(2);
 * @desc Create a basic tab interface with the second tab initially activated.
 * @example $('#container').tabs({disabled: [3, 4]});
 * @desc Create a tab interface with the third and fourth tab being disabled.
 * @example $('#container').tabs({fxSlide: true});
 * @desc Create a tab interface that uses slide down/up animations for showing/hiding tab
 *       content upon tab switching.
 *
 * @param Number initial An integer specifying the position of the tab (no zero-based index) that
 *                       gets first activated, e.g. on page load. If a hash in the URL of the page
 *                       refers to one fragment (tab container) of a tab interface, this parameter
 *                       will be ignored and instead the tab belonging to that fragment in that
 *                       specific tab interface will be activated. Defaults to 1 if omitted.
 * @param Object settings An object literal containing key/value pairs to provide optional settings.
 * @option Array<Number> disabled An array containing the position of the tabs (no zero-based index)
 *                                that should be disabled on initialization. Default value: null.
 * @option Boolean bookmarkable Boolean flag indicating if support for bookmarking and history (via
 *                              changing hash in the URL of the browser) is enabled. Default value:
 *                              false, unless the History/Remote plugin is included. In that case the
 *                              default value becomes true. @see $.ajaxHistory.initialize
 * @option Boolean remote Boolean flag indicating that tab content has to be loaded remotely from
 *                        the url given in the href attribute of the tab menu anchor elements.
 * @option Boolean fxFade Boolean flag indicating whether fade in/out animations are used for tab
 *                        switching. Can be combined with fxSlide. Will overrule fxShow/fxHide.
 *                        Default value: false.
 * @option Boolean fxSlide Boolean flag indicating whether slide down/up animations are used for tab
 *                         switching. Can be combined with fxFade. Will overrule fxShow/fxHide.
 *                         Default value: false.
 * @option String|Number fxSpeed A string representing one of the three predefined speeds ("slow",
 *                               "normal", or "fast") or the number of milliseconds (e.g. 1000) to
 *                               run an animation. Default value: "normal".
 * @option Object fxShow An object literal of the form jQuery's animate function expects for making
 *                       your own, custom animation to reveal a tab upon tab switch. Unlike fxFade
 *                       or fxSlide this animation is independent from an optional hide animation.
 *                       Default value: null. @see animate
 * @option Object fxHide An object literal of the form jQuery's animate function expects for making
 *                       your own, custom animation to hide a tab upon tab switch. Unlike fxFade
 *                       or fxSlide this animation is independent from an optional show animation.
 *                       Default value: null. @see animate
 * @option String|Number fxShowSpeed A string representing one of the three predefined speeds
 *                                   ("slow", "normal", or "fast") or the number of milliseconds
 *                                   (e.g. 1000) to run the animation specified in fxShow.
 *                                   Default value: fxSpeed.
 * @option String|Number fxHideSpeed A string representing one of the three predefined speeds
 *                                   ("slow", "normal", or "fast") or the number of milliseconds
 *                                   (e.g. 1000) to run the animation specified in fxHide.
 *                                   Default value: fxSpeed.
 * @option Boolean fxAutoHeight Boolean flag that if set to true causes all tab heights
 *                              to be constant (being the height of the tallest tab).
 *                              Default value: false.
 * @option Function onClick A function to be invoked upon tab switch, immediatly after a tab has
 *                          been clicked, e.g. before the other's tab content gets hidden. The
 *                          function gets passed three arguments: the first one is the clicked
 *                          tab (e.g. an anchor element), the second one is the DOM element
 *                          containing the content of the clicked tab (e.g. the div), the third
 *                          argument is the one of the tab that gets hidden. Default value: null.
 * @option Function onHide A function to be invoked upon tab switch, immediatly after one tab's
 *                         content got hidden (with or without an animation) and right before the
 *                         next tab is revealed. The function gets passed three arguments: the
 *                         first one is the clicked tab (e.g. an anchor element), the second one
 *                         is the DOM element containing the content of the clicked tab, (e.g. the
 *                         div), the third argument is the one of the tab that gets hidden.
 *                         Default value: null.
 * @option Function onShow A function to be invoked upon tab switch. This function is invoked
 *                         after the new tab has been revealed, e.g. after the switch is completed.
 *                         The function gets passed three arguments: the first one is the clicked
 *                         tab (e.g. an anchor element), the second one is the DOM element
 *                         containing the content of the clicked tab, (e.g. the div), the third
 *                         argument is the one of the tab that gets hidden. Default value: null.
 * @option String selectedClass The CSS class attached to the li element representing the
 *                              currently selected (active) tab. Default value: "tabs-selected".
 * @option String disabledClass The CSS class attached to the li element representing a disabled
 *                              tab. Default value: "tabs-disabled".
 * @option String hideClass The CSS class used for hiding inactive tabs. A class is used instead
 *                          of "display: none" in the style attribute to maintain control over
 *                          visibility in other media types than screen, most notably print.
 *                          Default value: "tabs-hide".
 * @option String loadingClass The CSS class used for indicating that an Ajax tab is currently
 *                             loading, for example by showing a spinner.
 *                             Default value: "tabs-loading".
 * @option String tabStruct A CSS selector or basic XPath expression reflecting a nested HTML
 *                          structure that is different from the default single div structure
 *                          (one div with an id inside the overall container holds one tab's
 *                          content). If for instance an additional div is required to wrap up the
 *                          several tab containers such a structure is expressed by "div>div".
 *                          Default value: "div".
 * @type jQuery
 *
 * @name tabs
 * @cat Plugins/Tabs
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
$.fn.tabs = function(initial, settings) {

    // settings
    if (typeof initial == 'object') settings = initial; // no initial tab given but a settings object
    settings = $.extend({
        initial: (initial && typeof initial == 'number' && initial > 0) ? --initial : 0,
        disabled: null,
        bookmarkable: $.ajaxHistory ? true : false,
        remote: false,
        fxFade: null,
        fxSlide: null,
        fxShow: null,
        fxHide: null,
        fxSpeed: 'normal',
        fxShowSpeed: null,
        fxHideSpeed: null,
        fxAutoHeight: false,
        onClick: null,
        onHide: null,
        onShow: null,
        selectedClass: 'tabs-selected',
        disabledClass: 'tabs-disabled',
        hideClass: 'tabs-hide',
        loadingClass: 'tabs-loading',
        tabStruct: 'div'
    }, settings || {});

    $.browser.msie6 = $.browser.msie6 || $.browser.msie && typeof XMLHttpRequest == 'function';

    // helper to prevent scroll to fragment
    function unFocus() {
        scrollTo(0, 0);
    }

    // initialize tabs
    return this.each(function() {

        var container = this;
        var tabs = $('>ul:eq(0)>li>a', this);

        // prepare remote tabs
        if (settings.remote) {
            var remoteUrls = {};
            tabs.each(function(i) {
                var id = 'tabs-remote-' + (i + 1);
                var hash = '#' + id;
                remoteUrls[hash] = this.href;
                this.href = hash;
                $(container).append('<div id="' + id + '" class="fragment"></div>');
            });
        }

        // retrieve active tab from hash in url
        if (location.hash) {
            tabs.each(function(i) {
                if (this.hash == location.hash) {
                    settings.initial = i;
                    // prevent page scroll to fragment
                    if (($.browser.msie || $.browser.opera) && !settings.remote) {
                        var toShow = $(location.hash);
                        var toShowId = toShow.attr('id');
                        toShow.attr('id', '');
                        setTimeout(function() {
                            toShow.attr('id', toShowId); // restore id
                        }, 500);
                    }
                    unFocus();
                    return false; // break
                }
            });
        }
        if ($.browser.msie) {
            unFocus(); // fix IE focussing bottom of the page for some unknown reason
        }

        // highlight tab accordingly
        $('>' + settings.tabStruct, this).filter(':eq(' + settings.initial + ')').show().end().not(':eq(' + settings.initial + ')').addClass(settings.hideClass);
        if (!settings.remote) {
            $('>ul:eq(0)>li:eq(' + settings.initial + ')', this).addClass(settings.selectedClass);
        }

        // setup auto height
        if (settings.fxAutoHeight) {
            // helper
            var tabsContents = $('>' + settings.tabStruct, container);
            var _setAutoHeight = function(reset) {
                // get tab heights in top to bottom ordered array
                var heights = $.map(tabsContents.get(), function(el) {
                    var h, jq = $(el);
                    if (reset) {
                        if ($.browser.msie6) {
                            el.style.removeExpression('behaviour');
                            el.style.height = '';
                            el.minHeight = null;
                        }
                        h = jq.css({'min-height': ''}).height(); // use jQuery's height() to get hidden element values
                    } else {
                        h = jq.height(); // use jQuery's height() to get hidden element values
                    }
                    return h;
                }).sort(function(a, b) {
                    return b - a;
                });
                if ($.browser.msie6) {
                    tabsContents.each(function() {
                        this.minHeight = heights[0] + 'px';
                        this.style.setExpression('behaviour', 'this.style.height = this.minHeight ? this.minHeight : "1px"'); // using an expression to not make print styles useless
                    });
                } else {
                    tabsContents.css({'min-height': heights[0] + 'px'});
                }
            };
            // call once for initialization
            _setAutoHeight();
            // trigger auto height adjustment if needed
            var cachedWidth = container.offsetWidth;
            var cachedHeight = container.offsetHeight;
            var watchFontSize = $('#tabs-watch-font-size').get(0) || $('<span id="tabs-watch-font-size">M</span>').css({display: 'block', position: 'absolute', visibility: 'hidden'}).appendTo(document.body).get(0);
            var cachedFontSize = watchFontSize.offsetHeight;
            setInterval(function() {
                var currentWidth = container.offsetWidth;
                var currentHeight = container.offsetHeight;
                var currentFontSize = watchFontSize.offsetHeight;
                if (currentHeight > cachedHeight || currentWidth != cachedWidth || currentFontSize != cachedFontSize) {
                    _setAutoHeight((currentWidth > cachedWidth || currentFontSize < cachedFontSize)); // if heights gets smaller reset min-height
                    cachedWidth = currentWidth;
                    cachedHeight = currentHeight;
                    cachedFontSize = currentFontSize;
                }
            }, 50);
        }

        // setup animations
        var showAnim = {}, hideAnim = {}, showSpeed = settings.fxShowSpeed || settings.fxSpeed, hideSpeed = settings.fxHideSpeed || settings.fxSpeed;
        if (settings.fxSlide || settings.fxFade) {
            if (settings.fxSlide) {
                showAnim['height'] = 'show';
                hideAnim['height'] = 'hide';
            }
            if (settings.fxFade) {
                showAnim['opacity'] = 'show';
                hideAnim['opacity'] = 'hide';
            }
        } else {
            if (settings.fxShow) {
                showAnim = settings.fxShow;
            } else { // use some kind of animation to prevent browser scrolling to the tab
                showAnim['min-width'] = 0; // avoid opacity, causes flicker in Firefox
                showSpeed = settings.bookmarkable ? 50 : 1; // as little as 50 is sufficient
            }
            if (settings.fxHide) {
                hideAnim = settings.fxHide;
            } else { // use some kind of animation to prevent browser scrolling to the tab
                hideAnim['min-width'] = 0; // avoid opacity, causes flicker in Firefox
                hideSpeed = settings.bookmarkable ? 50 : 1; // as little as 50 is sufficient
            }
        }

        // callbacks
        var onClick = settings.onClick, onHide = settings.onHide, onShow = settings.onShow;

        // attach activateTab event, required for activating a tab programmatically
        tabs.bind('triggerTab', function() {
            var hash = this.hash;
            if ($(hash).is(':hidden') && !$(this.parentNode).is('.' + settings.disabledClass)) { // trigger only if not already visible and not if disabled

                if ($.browser.msie) {

                    $(this).click();
                    if (settings.bookmarkable) {
                        $.ajaxHistory.update(hash);
                        location.hash = hash.replace('#', '');
                    }

                } else if ($.browser.safari) {

                    // Simply setting location.hash puts Safari into the eternal load state... ugh! Submit a form instead.
                    var tempForm = $('<form action="' + hash + '"><div><input type="submit" value="h" /></div></form>').get(0); // no need to append it to the body
                    tempForm.submit(); // does not trigger the form's submit event...
                    $(this).click(); // ...thus do stuff here
                    if (settings.bookmarkable) {
                        $.ajaxHistory.update(hash);
                    }

                } else {

                    if (settings.bookmarkable) {
                        location.hash = hash.replace('#', '');
                    } else {
                        $(this).click();
                    }

                }

            }
        });

        // attach disable event, required for disabling a tab
        tabs.bind('disableTab', function() {
            $(this.parentNode).addClass(settings.disabledClass);
        });

        // disabled from settings
        if (settings.disabled && settings.disabled.length) {
            for (var i = 0, k = settings.disabled.length; i < k; i++) {
                tabs.eq(--settings.disabled[i]).trigger('disableTab').end();
            }
        };

        // attach enable event, required for reenabling a tab
        tabs.bind('enableTab', function() {
            var jq = $(this.parentNode);
            jq.removeClass(settings.disabledClass);
            if ($.browser.safari) {
                jq.fadeTo(1, 1.0).css({display: '', opacity: 1}); /* Fix disappearing tab after enabling in Safari... */
                setTimeout(function() {
                    jq.css({opacity: ''});
                }, 30); // ...do not chain and use little timeout, ugh!
            }
        });

        // attach click event
        tabs.bind('click', function(e) {

            var trueClick = e.clientX; // add to history only if true click occured, not a triggered click

            var jqLi = $(this.parentNode);

            // if tab is already selected or disabled stop here
            if (jqLi.is('.' + settings.selectedClass) || jqLi.is('.' + settings.disabledClass)) {
                this.blur();
                return false;
            }

            // show new tab
            var toShow = $(this.hash);
            if (toShow.size() > 0) {

                // prevent scrollbar scrolling to 0 and than back in IE7, happens only if bookmarking/history is enabled
                if ($.browser.msie && settings.bookmarkable) {
                    var toShowId = this.hash.replace('#', '');
                    toShow.attr('id', '');
                    setTimeout(function() {
                        toShow.attr('id', toShowId); // restore id
                    }, 0);
                }

                var clicked = this;
                var toHide = $('>' + settings.tabStruct + ':visible', container);

                if (typeof onClick == 'function') {
                    // without this timeout Firefox gets really confused and calls callbacks twice...
                    setTimeout(function() {
                        onClick(clicked, toShow[0], toHide[0]);
                    }, 0);
                }

                // switch tab, animation prevents browser scrolling to the fragment
                function switchTab() {
                    if (settings.bookmarkable && trueClick) { // add to history only if true click occured, not a triggered click
                        $.ajaxHistory.update(clicked.hash);
                    }
                    toHide.animate(hideAnim, hideSpeed, function() { //
                        $(clicked.parentNode).addClass(settings.selectedClass).siblings().removeClass(settings.selectedClass);
                        if (typeof onHide == 'function') {
                            onHide(clicked, toShow[0], toHide[0]);
                        }
                        toHide.addClass(settings.hideClass).css({display: '', overflow: '', height: '', opacity: ''}); // maintain flexible height and accessibility in print etc.
                        toShow.removeClass(settings.hideClass).animate(showAnim, showSpeed, function() {
                            toShow.css({overflow: '', height: '', opacity: ''}); // maintain flexible height and accessibility in print etc.
                            if ($.browser.msie) {
                                toHide[0].style.filter = '';
                                toShow[0].style.filter = '';
                            }
                            if (typeof onShow == 'function') {
                                onShow(clicked, toShow[0], toHide[0]);
                            }
                        });
                    });
                }

                if (!settings.remote) {
                    switchTab();
                } else {
                    var jqThis = $(this);
                    jqThis.addClass(settings.loadingClass);
                    setTimeout(function() { // Timeout is again required in IE, "wait" for id being restored
                        $(clicked.hash).load(remoteUrls[clicked.hash], function() {
                            switchTab();
                            jqThis.removeClass(settings.loadingClass);
                        });
                    }, 0);
                }

            } else {
                alert('There is no such container.');
            }

            // Set scrollbar to saved position - need to use timeout with 0 to prevent browser scroll to target of hash
            var scrollX = window.pageXOffset || document.documentElement && document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            var scrollY = window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
            setTimeout(function() {
                window.scrollTo(scrollX, scrollY);
            }, 0);

            this.blur(); // prevent IE from keeping other link focussed when using the back button

            return settings.bookmarkable;

        });

        // trigger load of initial Ajax tab
        if (settings.remote) {
            tabs.eq(settings.initial).trigger('click').end();
        }

        // enable history support if bookmarking and history is turned on
        if (settings.bookmarkable) {
            $.ajaxHistory.initialize(function() {
                tabs.eq(settings.initial).trigger('click').end();
            });
        }

    });

};

/**
 * Activate a tab programmatically with the given position (no zero-based index),
 * as if the tab itself were clicked.
 *
 * @example $('#container').triggerTab(2);
 * @desc Activate the second tab of the tab interface contained in <div id="container">.
 * @example $('#container').triggerTab(1);
 * @desc Activate the first tab of the tab interface contained in <div id="container">.
 * @example $('#container').triggerTab();
 * @desc Activate the first tab of the tab interface contained in <div id="container">.
 *
 * @param Number position An integer specifying the position of the tab (no zero-based
 *                        index) to be activated. If this parameter is omitted, the first
 *                        tab will be activated.
 * @type jQuery
 *
 * @name triggerTab
 * @cat Plugins/Tabs
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Disable a tab, so that clicking it has no effect.
 *
 * @example $('#container').disableTab(2);
 * @desc Disable the second tab of the tab interface contained in <div id="container">.
 *
 * @param Number position An integer specifying the position of the tab (no zero-based
 *                        index) to be disabled. If this parameter is omitted, the first
 *                        tab will be disabled.
 * @type jQuery
 *
 * @name disableTab
 * @cat Plugins/Tabs
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Enable a tab that has been disabled.
 *
 * @example $('#container').enableTab(2);
 * @desc Enable the second tab of the tab interface contained in <div id="container">.
 *
 * @param Number position An integer specifying the position of the tab (no zero-based
 *                        index) to be enabled. If this parameter is omitted, the first
 *                        tab will be enabled.
 * @type jQuery
 *
 * @name enableTab
 * @cat Plugins/Tabs
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

var tabEvents = ['triggerTab', 'disableTab', 'enableTab'];
for (var i = 0; i < tabEvents.length; i++) {
    $.fn[tabEvents[i]] = (function(tabEvent) {
        return function(tabIndex) {
            return this.each(function() {
                var i = tabIndex && tabIndex > 0 && tabIndex - 1 || 0; // fall back to 0
                $('>ul:eq(0)>li>a', this).eq(i).trigger(tabEvent);
            });
        };
    })(tabEvents[i]);
}

})(jQuery);/*  
===============================================================================
Chili is a code highlighter based on jQuery
...............................................................................
                                               Copyright 2007 / Andrea Ercolino
-------------------------------------------------------------------------------
LICENSE: http://www.opensource.org/licenses/mit-license.php
MANUAL:  http://www.mondotondo.com/aercolino/noteslog/?page_id=79
UPDATES: http://www.mondotondo.com/aercolino/noteslog/?cat=8
===============================================================================
*/


ChiliBook = {
/* this object must stay global */ 

	  version:            "1.5" // 2007/01/26

	, elementPath:        "code" // elementPath is a jQuery selector for the element to highlight
	, elementClass:       "" // elementClass is the class of the element addressed by elementPath

	, recipeLoading:      true
	, recipeFolder:       "" // it will be used this way: recipeFolder + recipeName + '.js'
	, stylesheetLoading:  true
	, stylesheetFolder:   "" // it will be used this way: stylesheetFolder + recipeName + '.css'

	, defaultReplacement: '<span class="$0">$$</span>'

	, replaceSpace:       "&#160;"                   // use an empty string for not replacing 
	, replaceTab:         "&#160;&#160;&#160;&#160;" // use an empty string for not replacing
	, replaceNewLine:     "&#160;<br/>"              // use an empty string for not replacing

	, recipes:            {} //repository
};


//-----------------------------------------------------------------------------
( function($) {
//main
$( function() {

	function cook( ingredients, recipe ) {

		function prepareStep( stepName, step ) {
			var exp = ( typeof step.exp == "string" ) ? step.exp : step.exp.source;
			steps.push( {
				stepName: stepName
				, exp: "(" + exp + ")"
				, length: 1                         // add 1 to account for the newly added parentheses
					+ (exp                          // count number of submatches in here
						.replace( /\\./g, "%" )     // disable any escaped character
						.replace( /\[.*?\]/g, "%" ) // disable any character class
						.match( /\((?!\?)/g )       // match any open parenthesis, not followed by a ?
					|| []                           // make sure it is an empty array if there are no matches
					).length                        // get the number of matches
				, replacement: (step.replacement) ? step.replacement : ChiliBook.defaultReplacement 
			} );
		} // function prepareStep( stepName, step )
	
		function knowHow() {
			var prevLength = 0;
			var exps = new Array;
			for (var i = 0; i < steps.length; i++) {
				var exp = steps[ i ].exp;
				// adjust backreferences
				exp = exp.replace( /\\\\|\\(\d+)/g, function( m, aNum ) {
					return !aNum ? m : "\\" + ( prevLength + 1 + parseInt( aNum ) );
				} );
				exps.push( exp );
				prevLength += steps[ i ].length;
			}
			var source = exps.join( "|" );
			return new RegExp( source, (recipe.ignoreCase) ? "gi" : "g" );
		} // function knowHow()

		function escapeHTML( str ) {
			return str.replace( /&/g, "&amp;" ).replace( /</g, "&lt;" );
		} // function escapeHTML( str )

		function replaceSpaces( str ) {
			return str.replace( / +/g, function( spaces ) {
				return spaces.replace( / /g, replaceSpace );
			} );
		} // function replaceSpaces( str )

		function filter( str ) {
			str = escapeHTML( str );
			if( replaceSpace ) {
				str = replaceSpaces( str );
			}
			return str;
		} // function filter( str )

		function chef( matched ) {
			var i = 0;  // iterate steps
			var j = 1;	// iterate chef's arguments
			var step;
			while (step = steps[ i++ ]) {
				var aux = arguments; // this unmasks chef's arguments inside the next function
				if (aux[ j ]) {
					var pattern = /(\\\$)|(?:\$\$)|(?:\$(\d+))/g;
					var replacement = step.replacement
						.replace( pattern, function( m, escaped, K ) {
							var bit = '';
							if( escaped ) {       /* \$ */ 
								return "$";
							}
							else if( !K ) {       /* $$ */ 
								return filter( aux[ j ] );
							}
							else if( K == "0" ) { /* $0 */ 
								return step.stepName;
							}
							else {                /* $K */
								return filter( aux[ j+parseInt(K,10) ] );
							}
						} );

					var offset = arguments[ arguments.length - 2 ];
					var input = arguments[ arguments.length - 1 ];
					var unmatched = input.substring( lastIndex, offset );
					lastIndex = offset + matched.length; // lastIndex for the next call to chef

					perfect += filter( unmatched ) + replacement; // use perfect for all the replacing
					return replacement;
				} 
				else {
					j+= step.length;
				}
			}
		} // function chef( matched )

		var replaceSpace = ChiliBook.replaceSpace;
		var steps = new Array;
		for (var stepName in recipe.steps) {
			prepareStep( stepName, recipe.steps[ stepName ] );
		}

		var perfect = ""; //replace doesn't provide a handle to the ongoing partially replaced string
		var lastIndex = 0; //regexp.lastIndex is available after a string.match, but not in a string.replace
		ingredients.replace( knowHow(), chef );
		var lastUnmatched = ingredients.substring( lastIndex, ingredients.length );
		perfect += filter( lastUnmatched );

		return perfect;

	} // function cook( ingredients, recipe )

	function checkCSS( recipe, stylesheetPath ) {
		var id = recipe.cssId;

		if( !( id && $( '#' + id ).length > 0 ) ) {
			recipe.cssId = "css_" + (new Date()).valueOf();
			var link = '<link rel="stylesheet" type="text/css"'
					+   ' id="' + recipe.cssId   + '"'
					+ ' href="' + stylesheetPath + '">'
			;
			if ($.browser.msie) {
				var domLink = document.createElement( link );
				var $domLink = $(domLink);
				$("head").append( $domLink );
			}
			else {
				$("head").append( link );
			}
		}
	} // function checkCSS( recipeName )

	function makeDish( el, recipe ) {
//		var ingredients = $(el).text();
		var ingredients = el.childNodes[0].data;

		// hack for IE: IE uses \r in lieu of \n
		ingredients = ingredients.replace(/\r\n?/g, "\n");

		var dish = cook( ingredients, recipe ); // all happens here
	
		if( ChiliBook.replaceTab ) {
			dish = dish.replace( /\t/g, ChiliBook.replaceTab );
		}
		if( ChiliBook.replaceNewLine ) {
			dish = dish.replace( /\n/g, ChiliBook.replaceNewLine );
		}

		$(el).html( dish );
	} // function makeDish( el )

	function getPath( recipeName, options ) {
		var settingsDef = {
			  recipeFolder:     ChiliBook.recipeFolder
			, recipeFile:       recipeName + ".js"
			, stylesheetFolder: ChiliBook.stylesheetFolder
			, stylesheetFile:   recipeName + ".css"
		};
		var settings;
		if( options && typeof options == "object" )
			settings = $.extend( settingsDef, options );
		else
			settings = settingsDef;
		return {
			  recipe    : settings.recipeFolder     + settings.recipeFile
			, stylesheet: settings.stylesheetFolder + settings.stylesheetFile
		};
	} //function getPath( recipeName, options )


//-----------------------------------------------------------------------------
// initializations
	if( $.metaobjects ) $.metaobjects({ selector: "object.chili" });
	var selectClass = new RegExp( "\\b" + ChiliBook.elementClass + "\\b", "gi" );

//-----------------------------------------------------------------------------
// the coloring starts here
	$( ChiliBook.elementPath ).each( function() {
		var el = this;
		var elClass = $(el).attr( "class" );
		if( !elClass ) return;
		var recipeName = $.trim( elClass.replace( selectClass, "" ) );
		if( '' != recipeName ) {
			var path = getPath( recipeName, el.chili );
			var recipe = ChiliBook.recipes[ path.recipe ];
			if( !recipe ) {
				try {
// FIXME version 2.0 (I hope)
// currently in a dynamic setup, if there is not enough delay between an access to the 
// repository and the previous download request, then the same recipe is downloaded twice
// 
//					ChiliBook.recipes[ recipePath ] = {}; //placeholder
// 
// I tried to use the the above line as a fix, but it does not work as expected: a recipe is 
// downloaded once but the elements coreesponding to subsequent requests don't get highlighted 
// because makeDish is called with an empty object, instead of waiting
					$.getJSON( path.recipe, function( recipeLoaded ) {
						ChiliBook.recipes[ path.recipe ] = recipeLoaded;
						if( ChiliBook.stylesheetLoading ) {
							checkCSS( recipeLoaded, path.stylesheet );
						}
						makeDish( el, recipeLoaded );
					} );
				}
				catch (recipeNotAvailable) {
					alert( "recipe unavailable for: " + recipeName + '@' + recipePath );
				}
			}
			else {
				makeDish( el, recipe );
			}
		}
	} );
//-----------------------------------------------------------------------------

} );
} ) ( jQuery );

ChiliBook.recipes[ "javascript.js" ] = 
{
	steps: {
		  mlcom   : { exp: /\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\// }
		, com     : { exp: /\/\/.*/ }
		, regexp  : { exp: /\/[^\/\\\n]*(?:\\.[^\/\\\n]*)*\/[gim]*/ }
		, string  : { exp: /(?:\'[^\'\\\n]*(?:\\.[^\'\\\n]*)*\')|(?:\"[^\"\\\n]*(?:\\.[^\"\\\n]*)*\")/ }
		, numbers : { exp: /\b[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?\b/ }
		, keywords: { exp: /\b(arguments|break|case|catch|continue|default|delete|do|else|false|for|function|if|in|instanceof|new|null|return|switch|this|true|try|typeof|var|void|while|with)\b/ }
		, jquery  : { exp: /(\$|jQuery)/ }
		, global  : { exp: /\b(toString|valueOf|window|element|prototype|constructor|document|escape|unescape|parseInt|parseFloat|setTimeout|clearTimeout|setInterval|clearInterval|NaN|isNaN|Infinity)\b/ }
	}
};

ChiliBook.recipes[ "html.js" ] = 
{
	steps: {		
		  mlcom : { exp: /\<!--(?:.|\n)*?--\>/ }
		, tag   : { exp: /(?:\<\w+)|(?:\>)|(?:\<\/\w+\>)|(?:\/\>)/ }
		, aname : { exp: /\s+\w+(?=\s*=)/ }
        , avalue: { exp: /([\"\'])(?:(?:[^\1\\\r\n]*?(?:\1\1|\\.))*[^\1\\\r\n]*?)\1/ }
		, entity: { exp: /&[\w#]+?;/ }
	}
}; 