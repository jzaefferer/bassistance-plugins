function parse( f ) {
	var c = [], bm, m;
	var blockMatch = /\/\*\*\s*((.|\n)*?)\s*\*\//g;
	var paramMatch = /\@(\S+) *((.|\n)*?)(?=\n\@|!!!)/m;
	
	while ( bm = blockMatch.exec(f) ) {
		block = bm[1].replace(/^\s*\* ?/mg,"") + "!!!";
		console.log("block: %o", block);
		var ret = { params: [], examples: [], tests: [], options: [] };
	
		while ( m = paramMatch.exec( block ) ) {
			block = block.replace( paramMatch, "" );

			var n = m[1];
			var v = m[2]
				.replace(/\s*$/g,"")
				.replace(/^\s*/g,"")
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				 || 1;
	
			if ( n == 'param' || n == 'option' ) {
				var args = v.split(/\s+/);
				v = args.slice( 2, args.length );
				v = { type: args[0], name: args[1], desc: v.join(' ') };
				n = n + "s";
			} else if ( n == 'example' ) {
				v = { code: v };
				n = "examples";
			} else if ( n == 'test' ) {
				n = "tests";
			}
	
			if ( n == 'desc' || n == 'before' || n == 'after' || n == 'result' ) {
				ret.examples[ ret.examples.length - 1 ][ n ] = v;
			} else {
				if ( ret[ n ] ) {
					if ( ret[ n ].constructor == Array ) {
						ret[ n ].push( v );
					} else {
						ret[ n ] = [ ret[ n ], v ];
					}
				} else {
					ret[ n ] = v;
				}
			}
		}
  	
		ret.desc = block.replace(/\s*!!!$/,"")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;");
				//.replace(/\n\n/g, "<br/><br/>")
				//.replace(/\n/g, " ");
	
		var m = /^((.|\n)*?(\.|$))/.exec( ret.desc );
		if ( m ) ret['short'] = m[1];
	
		if ( ret.name ) c.push( ret );
	}

	return c;
}

Object.toXML = function( obj, tag ) {
  if ( obj.constructor == Array ) {
    var ret = "";
    for ( var i = 0; i < obj.length; i++ )
      ret += Object.toXML( obj[i], tag );
    return ret;
  } else if ( obj.constructor == Object ) {
    var tag = tag || "tmp";
    var p = "", child = "";

    for ( var i in obj )
      if ( ( obj[i].constructor != String && obj[i].constructor != Number ) || /</.test(obj[i] + "") || Object.toXML.force[i] )
        child += Object.toXML( obj[i], i );
      else
        p += " " + i + "='" + (obj[i] + "").replace(/'/g, "&apos;") + "'";

    return "<" + tag + p + ( child ?  ">\n" + child + "</" + tag + ">\n" : "/>\n" );
  } else if ( obj.constructor == String || obj.constructor == Number ) {
    return "<" + tag + ">" + obj + "</" + tag + ">\n";
  }

  return "";
};

Object.toXML.force = {};

function format( c ) {
	Object.toXML.force = { desc: 1, code: 1, before: 1, result: 1 };
	var xml = Object.toXML( { method: c }, "docs" );

	return "<?xml version='1.0' encoding='ISO-8859-1'?>\n" + xml
}
