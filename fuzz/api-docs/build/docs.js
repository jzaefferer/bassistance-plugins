load("build/xml.js", "build/writeFile.js", "build/parse.js");

Object.toXML.force = { desc: 1, code: 1, before: 1, result: 1 };
var xml = Object.toXML( categorize( parse( read(arguments[0]) ) ), "docs" );
writeFile( arguments[1] + "/plugins.xml",
	"<?xml version='1.0' encoding='ISO-8859-1'?>\n" +
	"<?xml-stylesheet type='text/xsl' href='style/cat.xsl'?>\n" + xml
);
