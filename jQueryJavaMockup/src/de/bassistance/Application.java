package de.bassistance;

import static com.jquery.jQuery.jQuery;

import com.jquery.Element;
import com.jquery.Event;
import com.jquery.EventListener;
import com.jquery.ReadyListener;
import com.jquery.jQuery;

public class Application {
	
	public void main() {
		jQuery(new ReadyListener() {
			public void handle(Element document) {
				jQuery("input:checked").val("newvalue").val();
				
				// need to split declaration and call to click, otherwise
				// we'd get "The local variable anchors may not have been initialized"
				final jQuery anchors = jQuery("a");
				anchors.click(new EventListener() {
					public void handle(Event e) {
						e.preventDefault();
						jQuery(e.target).val("foo");
						anchors.val("bar");
					}
				});
			}
		});
	}

}
