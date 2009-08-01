
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.HashMap;
import java.util.Map;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.PortletException;
import javax.portlet.PortletRequest;
import javax.portlet.PortletSession;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.RhinoException;
import org.mozilla.javascript.Scriptable;
import org.mozilla.javascript.ScriptableObject;

		// Invoke the JSP to render, replace with the actual jsp name
		response.setContentType(request.getResponseContentType());
		try {
			Context context = Context.enter();
			ScriptableObject scope = context.initStandardObjects();
			eval(context, scope, "env");
			ScriptableObject.putProperty(scope, "realPath", getPortletConfig().getPortletContext().getRealPath("jquery-mvc"));
			ScriptableObject.putProperty(scope, "contextPath", request.getContextPath() + "/jquery-mvc/");
			eval(context, scope, "setup");
			eval(context, scope, "jquery");
			Object result = eval(context, scope, "marketadmin");
			response.getWriter().write(result.toString());
			Context.exit();
		} catch (RhinoException e) {
			response.getWriter().write("<script type=\"text/javascript\">console.error('" + e.getMessage() + "');</script>");
			e.printStackTrace();
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private Object eval(Context context, Scriptable scope, String name) {
		try {
			return context.evaluateReader(scope, findFile(name), name + ".js", 1, null);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	private Reader findFile(String filename) {
		try {
			return new FileReader(getPortletConfig().getPortletContext().getRealPath("/jquery-mvc/" + filename + ".js"));
		} catch (FileNotFoundException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}

	
	
}
