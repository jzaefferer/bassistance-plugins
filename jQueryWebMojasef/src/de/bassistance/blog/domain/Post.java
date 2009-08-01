package de.bassistance.blog.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class Post {

	private String id;

	private String title;

	private String body;

	private Date date;
	
	private final List<Comment> comments = new ArrayList<Comment>();

	public Post(String id, String title, String body, Date date) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.date = date;
	}
	
	public void addComment(Comment comment) {
		comments.add(comment);
	}
	
	public List<Comment> getComments() {
		List<Comment> result = new ArrayList(comments);
		Collections.reverse(result);
		return result;
	}

	public String getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getBody() {
		return body;
	}

	public Date getDate() {
		return date;
	}

}
