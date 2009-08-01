/*
 * jQuery web framework
 * 
 * Copyright (c) 2007 Jörn Zaefferer
 * Dual licensed under the MIT and GPL licenses.
 * 
 * $Id: Response.java 2533 2007-07-31 08:06:48Z joern.zaefferer $
 */
package com.jquery.web;

import java.io.IOException;

import javax.portlet.ActionResponse;
import javax.portlet.PortletResponse;
import javax.portlet.PortletURL;
import javax.portlet.RenderResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * Provides a threadlocal reference to the current response.
 * 
 * Encapsulates creation of action and render URLs for portlets.
 */
public class Response {
	
	private static final ThreadLocal responseHolder = new ThreadLocal();
	
	static void set(HttpServletResponse response) {
		responseHolder.set(response);
	}
	
	static void set(PortletResponse response) {
		responseHolder.set(response);
	}
	
	private static HttpServletResponse servletResponse() {
		return (HttpServletResponse) responseHolder.get();
	}
	
	private static ActionResponse actionResponse() {
		return (ActionResponse) responseHolder.get();
	}
	
	private static RenderResponse renderResponse() {
		return (RenderResponse) responseHolder.get();
	}
	
	private static boolean isPortletResponse() {
		return responseHolder.get() instanceof PortletResponse;
	}
	
	public static String actionURL() {
		return renderResponse().createActionURL().toString();
	}
	
	public static String actionURL(String key, String name) {
		PortletURL url = renderResponse().createActionURL();
		url.setParameter(key, name);
		return url.toString();
	}
	
	public static String portletID() {
		return renderResponse().getNamespace();
	}

	public static void redirect(String location) {
		try {
			if(isPortletResponse()) {
				actionResponse().sendRedirect(location);
			} else {
				servletResponse().sendRedirect(location);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
