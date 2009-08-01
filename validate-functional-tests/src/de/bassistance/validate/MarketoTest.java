package de.bassistance.validate;

import com.thoughtworks.selenium.DefaultSelenium;
import com.thoughtworks.selenium.Selenium;

import junit.framework.TestCase;

public class MarketoTest extends TestCase {
	
private Selenium selenium;
	
	public void setUp() {
		selenium = new DefaultSelenium("localhost", 4444, "*iexplore", "http://localhost/");
		selenium.start();
    }
	
	public void tearDown() {
		selenium.stop();
    }
	
	public void testStep1() throws InterruptedException {
		selenium.open("/plugins/validate/demo/marketo/");
		assertFalse(selenium.isElementPresent("css=label.error"));
		selenium.click("css=input[type=submit]");
		assertTrue(selenium.isTextPresent("You missed 12 fields. They have been highlighted below."));
		assertTrue(selenium.isElementPresent("css=#co_name.error"));
		selenium.type("co_name", "CompanyName");
		selenium.fireEvent("co_name", "blur");
		selenium.fireEvent("co_name", "focusout");
		assertFalse(selenium.isElementPresent("css=#co_name.error"));
		selenium.type("co_url", "http://blabla1");
		selenium.fireEvent("co_url", "blur");
		selenium.fireEvent("co_url", "focusout");
		assertTrue(selenium.isElementPresent("css=#co_url.error"));
		assertTrue(selenium.isTextPresent("Please enter a valid URL."));
		selenium.type("co_url", "http://blabla.com");
		selenium.fireEvent("co_url", "blur");
		selenium.fireEvent("co_url", "focusout");
		assertFalse(selenium.isElementPresent("css=#co_url.error"));
		selenium.click("css=input[type=submit]");
		assertTrue(selenium.isTextPresent("You missed 10 fields. They have been highlighted below."));
		selenium.type("first_name", "Peter");
		selenium.type("last_name", "Pan");
		selenium.type("address1", "Marketo Street");
		selenium.select("state", "label=Georgia");
		selenium.click("css=input[type=submit]");
		assertTrue(selenium.isTextPresent("You missed 6 fields. They have been highlighted below."));
		selenium.select("state", "label=Choose State:");
		selenium.click("css=input[type=submit]");
		assertTrue(selenium.isTextPresent("You missed 7 fields. They have been highlighted below."));
		selenium.select("state", "label=California");
		selenium.type("city", "Market Town");
		selenium.type("phone", "1231231234");
		selenium.type("zip", "12345");
		selenium.click("css=input[type=submit]");
		assertTrue(selenium.isTextPresent("You missed 3 fields. They have been highlighted below."));
		selenium.type("email", "glen@marketo.com");
		selenium.fireEvent("email", "blur");
		selenium.fireEvent("email", "focusout");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if ("glen@marketo.com is already taken, please enter a different address.".equals(selenium.getText("css=label.error[for=email]"))) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		assertTrue(selenium.isElementPresent("css=input.error[name=email]"));
		assertTrue(selenium.isTextPresent("glen@marketo.com is already taken, please enter a different address."));
		selenium.type("email", "glen@market#");
		selenium.fireEvent("email", "blur");
		selenium.fireEvent("email", "focusout");
		assertTrue(selenium.isTextPresent("Please enter a valid email address, example: you@yourdomain.com"));
		selenium.type("email", "peter@pan.com");
		selenium.fireEvent("email", "blur");
		selenium.fireEvent("email", "focusout");
		assertFalse(selenium.isElementPresent("css=input.error[name=email]"));
		selenium.type("password1", "abc");
		selenium.fireEvent("password1", "blur");
		selenium.fireEvent("password1", "focusout");
		assertTrue(selenium.isElementPresent("css=input.error[name=password1]"));
		assertFalse(selenium.isTextPresent("abc"));
		selenium.type("password1", "abc123");
		selenium.fireEvent("password1", "blur");
		selenium.fireEvent("password1", "focusout");
		assertFalse(selenium.isElementPresent("css=input.error[name=password1]"));
		selenium.click("css=input[type=submit]");
		assertTrue(selenium.isTextPresent("You missed 1 field. It has been highlighted below."));
		selenium.type("password2", "abc");
		selenium.fireEvent("password2", "blur");
		selenium.fireEvent("password2", "focusout");
		assertTrue(selenium.isElementPresent("css=input.error[name=password2]"));
		assertTrue(selenium.isTextPresent("Please enter the same password as above"));
		selenium.type("password2", "abc123");
		selenium.fireEvent("password2", "blur");
		selenium.fireEvent("password2", "focusout");
		assertFalse(selenium.isElementPresent("css=input.error[name=password2]"));
		selenium.click("css=input[type=submit]");
		assertEquals("submit! use link below to go to the other step", selenium.getAlert());

	}
	
	public void testStep2() {
		selenium.open("/plugins/validate/demo/marketo/step2.htm");
		selenium.click("css=input[type=submit]");
		assertTrue(selenium.isTextPresent("You missed 3 fields. They have been highlighted below."));
		selenium.type("creditcard", "1234123412341234");
		selenium.click("bill_to_co");
		selenium.click("css=input[type=submit]");
		assertTrue(selenium.isTextPresent("You missed 10 fields. They have been highlighted below."));
		selenium.click("bill_to_co");
		selenium.click("css=input[type=submit]");
		assertTrue(selenium.isTextPresent("You missed 2 fields. They have been highlighted below."));
		assertTrue(selenium.isElementPresent("css=select.error[name=cc_type]"));
		selenium.select("cc_type", "label=Discover");
		selenium.fireEvent("cc_type", "blur");
		selenium.fireEvent("cc_type", "focusout");
		assertFalse(selenium.isElementPresent("select.error[name=cc_type]"));
		assertTrue(selenium.isElementPresent("css=input.error[name=cc_cvv]"));
		selenium.type("ccNumber", "12");
		selenium.fireEvent("ccNumber", "blur");
		selenium.fireEvent("ccNumber", "focusout");
		assertFalse(selenium.isElementPresent("css=input.error[name=ccNumber]"));
		assertFalse(selenium.isElementPresent("css=div.error[style=\"display: none;\"]"));
		selenium.click("css=input[type=submit]");
		assertEquals("submit! use link below to go to the other step", selenium.getAlert());
	}

}
