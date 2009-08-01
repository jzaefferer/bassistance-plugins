/*
String extensions: Extensions to the built-in Javascript String object
Copyright (C) 2006  Jörn Zaefferer (http://bassistance.de)

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA
*/

/**
 * Returns a string with with leading and trailing whitespace removed.
 *
 * @example " Hello Boys and Girls!   ".trim()
 * @result "Hello Boys and Girls!"
 *
 * @name trim
 * @type String
 */
String.prototype.trim = function(){ 
	return this.replace(/(^\s+|\s+$)/g, "");
};

/**
 * Return a camelized String, removing all underscores and dashes
 * and replacing the next character with it's uppercase representation.
 *
 * @example "font-weight".camelize()
 * @result "fontWeight"
 *
 * @example "border_width_bottom".camelize()
 * @result "borderWidthBottom"
 *
 * @example "border_width-bottom".camelize()
 * @result "borderWidthBottom"
 *
 * @name camelize
 * @type String
 */
String.prototype.camelize = function() {
	return this.replace( /[-_]([a-z])/ig, function(z,b){ return b.toUpperCase();} );
};

/**
 * Tests if this string starts with a prefix.
 *
 * @example "goldvein".startsWith("go")
 * @result true
 * 
 * @example "goldvein".startsWith("god")
 * @result false
 *
 * @name startsWith
 * @type Boolean
 * @param prefix The prefix to test
 */
 
 /**
 * Tests if this string starts with a prefix, beginning at an offset.
 * Returns false if the offset is negative or greater then the length
 * of this string.
 *
 * @example "goldvein".startsWith("ld", 2)
 * @result true
 * 
 * @example "goldvein".startsWith("old", 2)
 * @result false
 *
 * @name startsWith
 * @type Boolean
 * @param prefix The prefix to test
 * @param offset From where to start testing
 */
String.prototype.startsWith = function(prefix, offset) {
	var offset = offset || 0;
	if(offset < 0 || offset > this.length) return false;
	return this.substring(offset, offset + prefix.length) == prefix;
};

/**
 * Tests if this string ends with the specified suffix.
 *
 * @example "goldvein".endsWith("ein")
 * @result true
 *
 * @example "goldvein".endsWith("vei")
 * @result false
 *
 * @name endsWith
 * @type Boolean
 * @param suffix The suffix to test
 */
String.prototype.endsWith = function(suffix) {
	return this.substring(this.length - suffix.length) == suffix;
};

/**
 * Tests if this string contains only digits.
 *
 * @example "123".isDigit()
 * @result true
 *
 * @example "1ab".isDigit()
 * @result false
 *
 * @name isDigit
 * @type Boolean
 */
 
 /**
 * Tests if this string contains only lower case characters.
 *
 * @example "abc".isLower()
 * @result true
 *
 * @example "aBC".isLower()
 * @result false
 *
 * @name isLower
 * @type Boolean
 */
 
 /**
 * Tests if this string contains only upper case characters.
 *
 * @example "ABC".isUpper()
 * @result true
 *
 * @example "Abc".isUpper()
 * @result false
 *
 * @name isUpper
 * @type Boolean
 */
 
 /**
 * Tests if this string contains only alphabetical characters (a-z, A-Z).
 *
 * @example "aBc".isAlpha()
 * @result true
 *
 * @example "a12B".isAlpha();
 * @result false
 *
 * @name isAlpha
 * @type Boolean
 */
 
 /**
 * Tests if this string contains only alphabetical characters (a-z, A-Z) and digits (0-9).
 *
 * @example "abcABC123".isAlphaNum()
 * @result true
 *
 * @example "abc-ABC 123".isAlpha()
 * @result false
 *
 * @name isAlphaNum
 * @type Boolean
 */

new function() {
	var is = {
		Digit: "[0-9]",
		Lower: "[a-z]",
		Upper: "[A-Z]",
		Alpha: "[a-zA-Z]",
		AlphaNum: "[a-zA-Z0-9]"
	};
	for(var checks in is) new function() {
		var check = checks;
		String.prototype["is" + check] = function() {
			for(var i=0; i < this.length; i++) {
				if( !this[i].match(is[check]) ) {
					return false;
				}
			}
			return true;
		};
	};
}();
