package com.jquery;

import static com.jquery.Window.document;

public class jQuery {

	// use an array instead of a list to guarantee non-destructive behaviour
	private final Element[] elements;

	// private constructors
	private jQuery(Element element) { elements = new Element[] { element }; }
	private jQuery(Element[] elements) { this.elements = elements; }
	
	// factories
	public static jQuery jQuery(String expression) {
		return new jQuery(document).find(expression);
	}
	public static jQuery jQuery(Element element) {
		return new jQuery(element);
	}
	public static jQuery jQuery(Element[] elements) {
		return new jQuery(elements);
	}
	public static jQuery jQuery(String expression, Element context) {
		return new jQuery(context).find(expression);
	}
	public static void jQuery(ReadyListener listener) {
		new jQuery(document).ready(listener);
	}

	// DOM ready event, manages ready list
	public void ready(ReadyListener listener) {}
	
	// provide access to all or a single element
	public Element[] get() { return elements; }
	public Element get(int index) { return elements[index]; }

	// find elements and return new jQuery object
	public jQuery find(String expression) { return jQuery(new Element[] {}); }
	
	// iterate through elements and apply a function
	public jQuery each(Function handler) {
		for (Element current : elements) {
			handler.apply(current);
		}
		return this;
	}
	
	// get value of first element
	public String val() { return elements[0].getAttribute("value"); }
	
	// set value of all elements
	public jQuery val(final String value) {
		// use each to iterate
		// actually a for loop would be more efficient here, less code
		return this.each(new Function() {
			public void apply(Element element) {
				element.setAttribute("value", value);
			}
		});
	}

	// manages click event handlers
	public jQuery click(EventListener listener) { return this; }

}
