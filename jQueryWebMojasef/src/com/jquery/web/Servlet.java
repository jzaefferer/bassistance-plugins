package com.jquery.web;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.ImporterTopLevel;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;



public class Servlet extends HttpServlet {
	
	
	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println(request.getServletPath() + request.getPathInfo());
		response.setContentType("text/html; charset=UTF-8");
		
		String realPath = getServletContext().getRealPath("WEB-INF/");
		Context rhinoContext = Context.enter();
//		ScriptableObject scope = rhinoContext.initStandardObjects();
		ScriptableObject scope = new ImporterTopLevel(rhinoContext);
		Globals.init(scope, request.getContextPath(), getServletContext().getRealPath("WEB-INF/"));
		ScriptableObject.putProperty(scope, "realPath", realPath);
//		ScriptableObject.putProperty(scope, "contextPath", request.getContextPath());
		Object result = eval(rhinoContext, scope, "blog", realPath);
		response.getWriter().write(result.toString());
		Context.exit();
	}

	private Object eval(Context context, Scriptable scope, String name, String realPath) {
		try {
			return context.evaluateReader(scope, findFile(realPath + "/" + name), name + ".js", 1, null);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private Reader findFile(String filename) {
		try {
			return new FileReader(filename + ".js");
		} catch (FileNotFoundException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}
	
	
}
