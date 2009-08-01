package com.jquery;

public abstract class Event {

	public final Element target;
	public final Element source;
	
	Event(Element source, Element target) {
		this.source = source;
		this.target = target;
	}
	
	public abstract void preventDefault();
	public abstract void stopPropagation();
	
}
