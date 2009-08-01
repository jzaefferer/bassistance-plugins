package de.bassistance.blog.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Blog {

	private String name;

	private String description;

	private final Map<String, Post> posts = new LinkedHashMap<String, Post>();

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Post> getRecentPosts() {
		return getPosts().subList(0, posts.size() < 3 ? posts.size() : 3);
	}

	public List<Post> getPosts() {
		List result = new ArrayList<Post>(posts.values());
		Collections.reverse(result);
		return result;
	}

	public void addBlogEntry(Post post) {
		posts.put(post.getId(), post);
	}

	public Post getPost(String id) {
		return posts.get(id);
	}
}
