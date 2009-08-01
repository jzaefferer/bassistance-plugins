/*
 * jQuery web framework
 * 
 * Copyright (c) 2007 Jörn Zaefferer
 * Dual licensed under the MIT and GPL licenses.
 * 
 * $Id: Portlet.java 2612 2007-08-08 15:34:27Z joern.zaefferer $
 */
package com.jquery.web;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.GenericPortlet;
import javax.portlet.PortletException;
import javax.portlet.PortletRequest;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.ImporterTopLevel;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;
import org.mozilla.javascript.tools.ToolErrorReporter;
import org.springframework.context.ApplicationContext;
import org.springframework.web.portlet.context.PortletApplicationContextUtils;

/**
 * Generic portlet mapping portlet modes to views.
 * 
 * Configure "views" init-parameter to setup the folder
 * where to look for view files.
 * 
 * Example:
 * <pre>&lt;init-param&gt;
 *	&lt;name&gt;views&lt;/name&gt;
 *	&lt;value&gt;views/grid&lt;/value&gt;
 * &lt;/init-param&gt;</pre>
 * 
 * That sets up the portlet to look for files at views/grid, eg. for
 * view mode there'd have to be views/grid/view.js and views/grid.view.html.
 * 
 * Actions are searched by appending "-action", so actions for view mode
 * are defined in view-action.js.
 */
public class Portlet extends GenericPortlet {
	
	private final static Log log = LogFactory.getLog(Portlet.class);
	
	public void processAction(ActionRequest request, ActionResponse response) throws PortletException, IOException {
		Request.set(request);
		Response.set(response);
		ScriptableObject scope = new ImporterTopLevel(Context.enter());
		Context.getCurrentContext().setErrorReporter(new ToolErrorReporter(true, System.err));
		PortletGlobals.init(scope, request.getContextPath(), realPath(), page(request), context());
		eval(scope, page(request) + "-action.js");
		Context.exit();
	}

	public void render(RenderRequest request, RenderResponse response) {
		Request.set(request);
		Response.set(response);
		response.setContentType("text/html; charset=UTF-8");
		ScriptableObject scope = new ImporterTopLevel(Context.enter());
		Context.getCurrentContext().setErrorReporter(new ToolErrorReporter(true, System.err));
		PortletGlobals.init(scope, request.getContextPath(), realPath(), page(request), context());
		try {
			Object result = eval(scope, page(request) + ".js");
			response.getWriter().write(result.toString());
		} catch (Throwable e) {
			try {
				response.getWriter().write("<h1>The following exception occcured:</h1><pre>");
				e.printStackTrace(response.getWriter());
				response.getWriter().write("</pre>");
				log.error(e.getMessage(), e);
			} catch (IOException ex) {
				e.printStackTrace();
			}
		} finally {
			Context.exit();
		}
	}
	
	private ApplicationContext context() {
		return PortletApplicationContextUtils.getRequiredWebApplicationContext(getPortletContext());
	}

	private String realPath() {
		return getPortletContext().getRealPath(getInitParameter("views"));
	}
	
	private String page(PortletRequest request) {
		return request.getPortletMode().toString().toLowerCase();
	}

	private Object eval(Scriptable scope, String name) {
		try {
			return Context.getCurrentContext().evaluateReader(scope, findFile(realPath() + "/" + name), name, 1, null);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private Reader findFile(String filename) {
		try {
			return new FileReader(filename);
		} catch (FileNotFoundException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}

}
