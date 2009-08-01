/*
 * jQuery web framework
 * 
 * Copyright (c) 2007 Jörn Zaefferer
 * Dual licensed under the MIT and GPL licenses.
 * 
 * $Id: RequestTest.java 2533 2007-07-31 08:06:48Z joern.zaefferer $
 */
package com.jquery.web;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import junit.framework.TestCase;

import org.springframework.mock.web.MockHttpServletRequest;

import de.bassistance.blog.domain.Comment;

public class RequestTest extends TestCase {
	
	public class Person {

		private int age;

		private String firstname;
		
		private boolean checked;

		private boolean nonsense;
		
		private List<String> middleNames;

		public String[] getMiddleNames() {
			return middleNames.toArray(new String[0]);
		}

		public void setMiddleNames(String[] middleNames) {
			this.middleNames = Arrays.asList(middleNames);
		}

		public int getAge() {
			return age;
		}

		public void setAge(int age) {
			this.age = age;
		}

		public String getFirstname() {
			return firstname;
		}

		public void setFirstname(String firstname) {
			this.firstname = firstname;
		}

		public boolean isChecked() {
			return checked;
		}

		public boolean isNonsense() {
			return nonsense;
		}

	}
	
	@Override
	protected void setUp() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		request.setParameter("age", "16");
		request.setParameter("firstname", "Peter");
		request.setParameter("checked", "1");
		request.setParameter("nonsense", "true");
		request.setParameter("middleNames", middleNames);
		this.request = request;
		Request.set(request);
	}
	
	HttpServletRequest request;
	
	String[] middleNames = { "A.", "J.", "P." };

	public void testServletRequestToBean() {
		assertPerson(new Request(request).mapTo(new Person()));
	}
	
	public void testRequestContextHolderToBean() {
		assertPerson(Request.map(new Person()));
	}

	private void assertPerson(Person person) {
		assertEquals(16, person.getAge());
		assertEquals("Peter", person.getFirstname());
		assertEquals(true, person.isChecked());
		assertEquals(true, person.isNonsense());
		assertEquals(middleNames.length, person.getMiddleNames().length);
	}

	public void testPostComment() {
		MockHttpServletRequest request = new MockHttpServletRequest();
		request.setParameter("author", "Björk Glenström");
		request.setParameter("email", "b.g@glen.se");
		request.setParameter("body", "Hi all!");
		Comment comment = new Request(request).mapTo(new Comment());
		assertEquals("Björk Glenström", comment.getAuthor());
		assertEquals("b.g@glen.se", comment.getEmail());
		assertNull(comment.getUrl());
		assertEquals("Hi all!", comment.getBody());
	}
	
}
