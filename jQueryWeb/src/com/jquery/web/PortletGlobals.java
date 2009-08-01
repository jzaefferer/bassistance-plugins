/*
 * jQuery web framework
 * 
 * Copyright (c) 2007 Jörn Zaefferer
 * Dual licensed under the MIT and GPL licenses.
 * 
 * $Id: PortletGlobals.java 2533 2007-07-31 08:06:48Z joern.zaefferer $
 */
package com.jquery.web;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Function;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.tools.shell.Main;
import org.springframework.context.ApplicationContext;

/**
 * Modified {@link Globals} for a portlet request. Exposes a
 * spring {@link ApplicationContext}.
 */
public class PortletGlobals {

	public static void load(Context cx, Scriptable thisObj, Object[] args, Function funObj) {
		for (int i = 0; i < args.length; i++) {
			Main.processFile(cx, thisObj, Context.toString(args[i]));
		}
	}

	public final String contextPath;
	public final String realPath;
	public final String page;
	public final ApplicationContext context;

	public PortletGlobals(String contextPath, String realPath, String page, ApplicationContext context) {
		this.contextPath = contextPath;
		this.realPath = realPath;
		this.page = page;
		this.context = context;
	}

	public static void init(ScriptableObject scope, String contextPath, String realPath, String page, ApplicationContext context) {
		scope.defineFunctionProperties(new String[] { "load" }, PortletGlobals.class, ScriptableObject.DONTENUM);
		scope.defineProperty("request", new PortletGlobals(contextPath, realPath, page, context), ScriptableObject.DONTENUM);
	}

}
