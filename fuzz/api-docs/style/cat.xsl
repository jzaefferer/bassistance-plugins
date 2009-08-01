<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"
	doctype-public="-//W3C//DTD HTML 4.01//EN" 
	doctype-system="http://www.w3.org/TR/html4/strict.dtd"  />
	
	<xsl:template name="ref">
		<xsl:value-of select="translate(@name, '$.|', '')"/>
		<xsl:for-each select="params">
			<xsl:value-of select="translate(@type, '&lt;&gt;|$.', '')" />
		</xsl:for-each>
	</xsl:template>

	<xsl:template name="href">
		<xsl:attribute name="href">
			<xsl:text>#</xsl:text>
			<xsl:call-template name="ref" />
		</xsl:attribute>
	</xsl:template>
	
	<xsl:template name="id">
		<xsl:attribute name="id">
			<xsl:call-template name="ref" />
		</xsl:attribute>
	</xsl:template>
	
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
	
	<xsl:template name="printMethod">
		<li>
			<a>
				<xsl:call-template name="href" />
				<xsl:value-of select="@name" />
				<xsl:if test="not(@property)">
					<xsl:text>(</xsl:text>
					<xsl:for-each select="params">
						<span class='arg-type tooltip'><xsl:value-of select="@type"/></span>
						<xsl:if test="position() != last()">, </xsl:if>
					</xsl:for-each>
					<xsl:text>)</xsl:text>
				</xsl:if>
			</a>
		</li>
	</xsl:template>
	
	<xsl:template name="cats">
		<ul>
		<xsl:for-each select="cat">
			<li>
				<xsl:value-of select="@value" />
				<ul>
				<xsl:for-each select="method[not(@private)]">
					<xsl:sort select="translate(@name,'$.','')"/>
					<xsl:sort select="count(params)"/>
					<xsl:call-template name="printMethod"/>
				</xsl:for-each>
				</ul>
				<xsl:if test="./cat">
					<xsl:call-template name="cats" />
				</xsl:if>
	 		</li>
		</xsl:for-each>
		</ul>
	</xsl:template>
	
	<xsl:template match="/*">
	<html>
	<head>
		<title>jQuery <xsl:value-of select="/docs/@version" /> API Browser </title>
		<link rel="stylesheet" href="style/screen.css" media="screen,projector" />
		<link rel="stylesheet" href="style/print.css" media="print" />
		<!-- 
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery.tooltip.js"></script>
		<script type="text/javascript" src="js/jquery.treeview.js"></script>
		<script type="text/javascript" src="js/jquery.tabs.js"></script>
		<script type="text/javascript" src="js/jquery.highlight.js"></script>
		<script type="text/javascript" src="js/jquery.quicksearch.js"></script>
		<script type="text/javascript" src="js/chili-1.5.js"></script>
		 -->
		<script type="text/javascript" src="js/browser.pack.js"></script>
		<script type="text/javascript" src="js/doc.js"></script>
	</head>
	<body>
		<h1><a href="http://jquery.com"><img src="style/images/jquery_logo.gif" alt="jQuery Logo" /></a></h1>
		<div id="header"><xsl:value-of select="/docs/@version" /> API Browser <span>(<a href="jquery-api-browser.zip">Download</a>)</span></div>
		<div id="content">
			<div id="nav">
				<h2>Navigation</h2>
				<ul class="tabs-nav">
					<li><a href="#navCat">Category</a></li>
					<li><a href="#navAlpha">Alphabetical</a></li>
				</ul>
				<div class="navsub" id="navCat">
					<h3>Categorized</h3>
					<div class="treecontrol">
						<a href="#">Collapse All</a>
						<a href="#">Expand All</a>
						<a href="#">Toggle All</a>
					</div>
					<xsl:call-template name="cats" />
				</div>
				<div class="navsub" id="navAlpha">
					<h3>Alphabetic</h3>
					<div class="treecontrol">
						<a href="#">Collapse All</a>
						<a href="#">Expand All</a>
						<a href="#">Toggle All</a>
					</div>
					<ul>
						<xsl:variable name="current" select="'$'" />
						<xsl:for-each select="//method[not(@private)]">
							<xsl:variable name="namePrev" select="substring(translate(@name,'$.', ''), 1, 1)" />
							<xsl:variable name="name" select="substring(translate(@name,'$.', ''), 1, 1)" />
							<xsl:sort select="translate(@name,'$.','')"/>
							<xsl:sort select="count(params)"/>
							<xsl:call-template name="printMethod" />
						</xsl:for-each>
					</ul>
				</div>
			</div>
			<ul id="docs">
				<xsl:for-each select="//method[not(@private)]">
					<xsl:sort select="translate(@name,'$.','')"/>
					<xsl:sort select="count(params)"/>
					<li>
						<xsl:call-template name="id" />
						<span class='fn'>
							<a class='name'>
								<xsl:call-template name="href" />
								<xsl:value-of select="@name"/>
							</a>
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
									<pre><code class="javascript"><xsl:value-of select="code"/></code></pre>
									<xsl:if test="before">
										<h4>HTML:</h4>
										<pre><code class="html"><xsl:value-of select="before"/></code></pre>
									</xsl:if>
									<xsl:if test="result">
										<h4>Result:</h4>
										<pre><code class="html"><xsl:value-of select="result"/></code></pre>
									</xsl:if>
								</div>
							</xsl:for-each>
						</div>
					</li>
				</xsl:for-each>
			</ul>
		</div>
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
