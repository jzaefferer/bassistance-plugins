<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml"
	doctype-public="-//W3C//DTD HTML 4.01//EN" 
	doctype-system="http://www.w3.org/TR/html4/strict.dtd"  />
	
	<xsl:template name="type">
		<xsl:attribute name="title">
			<xsl:choose>
				<xsl:when test="@type='jQuery'">A jQuery object.</xsl:when>
				<xsl:when test="@type='Boolean'">true or false.</xsl:when>
				<xsl:when test="@type='Object'">A simple Javascript object..</xsl:when>
				<xsl:when test="@type='String'">A string of characters.</xsl:when>
				<xsl:when test="@type='Number'">A valid numeric.</xsl:when>
				<xsl:when test="@type='String|Number'">A string of characters or a number.</xsl:when>
				<xsl:when test="@type='Element'">The Javascript object representation of a DOM Element.</xsl:when>
				<xsl:when test="@type='Element|Array&lt;Element&gt;'">One or more DOM Elements (a single one or an array).</xsl:when>
				<xsl:when test="@type='Map'">A Javascript object that contains key/value pairs in the form of properties and values.</xsl:when>
				<xsl:when test="@type='Array&lt;Element&gt;'">An Array of DOM Elements.</xsl:when>
				<xsl:when test="@type='Array&lt;String&gt;'">An Array of strings.</xsl:when>
				<xsl:when test="@type='Function'">A reference to a Javascript function.</xsl:when>
				<xsl:when test="@type='XMLHttpRequest'">An XMLHttpRequest object (referencing a HTTP request).</xsl:when>
				<xsl:when test="@type='&lt;Content&gt;'">A String (to generate HTML on-the-fly), a DOM Element, an Array of DOM Elements or a jQuery object.</xsl:when>
			</xsl:choose>
		</xsl:attribute>
		<xsl:value-of select="@type"/>
	</xsl:template>
	
	<xsl:template match="/*">
	<html>
		<body>
			<ul id="docs">
				<xsl:for-each select="//method[not(@private)]">
					<xsl:sort select="translate(@name,'$.','')"/>
					<xsl:sort select="count(params)"/>
					<li class="method">
						<span class='fn'>
							<xsl:value-of select="@name"/>
								<xsl:if test="not(@property)"><xsl:text>( </xsl:text>
									<xsl:for-each select="params">
										<span class='arg-type tooltip'>
											<xsl:call-template name="type" />
										</span>
										<xsl:text> </xsl:text>
										<span class='arg-name tooltip' title='{desc}'><xsl:value-of select="@name"/></span>
										<xsl:if test="position() != last()">, </xsl:if>
									</xsl:for-each>
									<xsl:text> )</xsl:text>
								</xsl:if>
							<xsl:text> returns </xsl:text><span class='type'><span class='tooltip'><xsl:call-template name="type" /></span></span>
						</span>
						<div class='more'>
							<div class='desc'>
								<xsl:for-each select="desc">
									<xsl:call-template name="break" />
								</xsl:for-each>
							</div>
							<xsl:if test="options">
								<h3>Options</h3>
								<ul class="options">
									<xsl:for-each select="options">
										<li>
											<xsl:value-of select="@name"/>
											<xsl:text> (</xsl:text>
											<span class='arg-type tooltip'>
												<xsl:call-template name="type" />
											</span>
											<xsl:text>): </xsl:text><xsl:value-of select="desc"/>
										</li>
									</xsl:for-each>
								</ul>
							</xsl:if>
							<xsl:for-each select="examples">
								<div class='example'>
									<h3>Example:</h3>
									<xsl:if test="desc">
										<p><xsl:value-of select="desc"/></p>
									</xsl:if>
									<pre><xsl:value-of select="code"/></pre>
									<xsl:if test="before">
										<h4>HTML:</h4>
										<pre><xsl:value-of select="before"/></pre>
									</xsl:if>
									<xsl:if test="result">
										<h4>Result:</h4>
										<pre><xsl:value-of select="result"/></pre>
									</xsl:if>
								</div>
							</xsl:for-each>
						</div>
					</li>
				</xsl:for-each>
			</ul>
		</body>
	</html>
	</xsl:template>

	<xsl:template name="break">
		<xsl:param name="text" select="." />
		<xsl:choose>
			<xsl:when test="contains($text, '&#xa;&#xa;')">
				<xsl:value-of select="substring-before($text, '&#xa;&#xa;')" />
				<br /><br />
				<xsl:call-template name="break">
					<xsl:with-param name="text"	select="substring-after($text, '&#xa;&#xa;')" />
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$text" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>
