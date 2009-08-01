package de.bassistance.blog.domain;

import java.util.Date;

public class Comment {

	private String author;

	private String url;

	private String email;

	private String body;

	private Date date;

	public Comment(String author, String body, Date date) {
		this.author = author;
		this.body = body;
		this.date = date;
	}
	
	public Comment(String author, String url, String email, String body, Date date) {
		this(author, body, date);
		this.url = url;
		this.email = email;
	}



	public String getAuthor() {
		return author;
	}

	public String getBody() {
		return body;
	}

	public Date getDate() {
		return date;
	}

	public String getEmail() {
		return email;
	}

	public String getUrl() {
		return url;
	}

}
