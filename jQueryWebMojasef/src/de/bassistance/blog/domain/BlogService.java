package de.bassistance.blog.domain;

import java.util.Calendar;
import java.util.Date;

import de.mxcit.jsf.util.RequestUtil;

public class BlogService {

	private static Blog blog;

	static {
		blog = new Blog();
		blog.setName("bassistance.de");
		blog.setDescription("Bass, Geeks and Rock'n'Roll");
		blog.addBlogEntry(new Post("1", "Release: Accordion menu plugin 1.4",
				"Its out! Get it while its hot.", date(2007, 7, 9)));
		blog.addBlogEntry(new Post(
						"2",
						"Surface Computing",
						"<blockquote>One day, your computer will be a big ass table!</blockquote><p>Eine amüante Parodie auf Microsoft Surface:</p>",
						date(2007, 7, 10)));
		blog.addBlogEntry(new Post(
						"3",
						" Er bockt, sie bockt, es bockt, ich verbocke.",
						"In Anlehnung an Es bockt!, hier ein kurzer Schadensbericht zu meinem eigenen Verbocken. Das ich in letzter Zeit ein paar Probleme mit meinem eigenen PC hatte, hat der ein oder andere im engeren Umfeld ja mitgekommen. Angefangen hat es mit meinem Versuch, den Rechner leiser zu bekommen, durch entfernen drei alter HDDs und zweier CD-Laufwerke, zu ersetzen durch zwei fixe und leise SATA-Laufwerke (400GB HDD, Samsung DVD Brenner).<p>Das entfernen der eklig lauten 40er-Platte hätte eigentlich schon gereicht, und eine Menge Frust vermieden.</p>",
						date(2007, 7, 11)));
		Post whyOS = new Post(
				"4",
				"Why open source?",
				"<p>While glancing over Dr. Dobb's article Getting Started With jQuery I read this:</p><blockquote>Whether the motivation behind making their labors freely available is a matter of seeking recognition, resume building, free advertising for other services, bragging rights, or just plain old-fashioned altruism, we can gratefully take advantage of these tools. jQuery is one such tool.</blockquote><p>Cool.</p>",
				date(2007, 7, 13));
		blog.addBlogEntry(whyOS);
		whyOS.addComment(new Comment("Hike Halsup", "Open-source changed my life!", date(2007, 7, 13)));
		whyOS.addComment(new Comment("anonymous user", "http://google.com", "mail@google.com", "No way!", date(2007, 7, 24)));
	}

	private static Date date(int year, int month, int day) {
		Calendar result = Calendar.getInstance();
		result.set(Calendar.YEAR, year);
		result.set(Calendar.MONTH, month - 1);
		result.set(Calendar.DATE, day);
		return result.getTime();
	}

	/**
	 * Gets the blog.
	 * 
	 * @return a Blog instance
	 */
	public Blog getBlog() {
		return blog;
	}
	
	public Post[] getRecentPosts() {
		return blog.getRecentPosts().toArray(new Post[0]);
	}

}
