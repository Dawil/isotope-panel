$ ->
	posts = []
	postsUrl = "http://lit-shore-9728.herokuapp.com/api/get_recent_posts/?callback=?"
	$.getJSON postsUrl, {},
		(result) ->
			container = $ "#post-container"
			posts = result.posts
			postsHtml = ''
			postsHtml += postToHtml(post) for post in posts
			container.html postsHtml
			container.isotope
				itemSelector: ".post"
				layoutMode: "masonry"

	tags = []
	tagsUrl = "http://lit-shore-9728.herokuapp.com/api/get_tag_index/?callback=?"
	$.getJSON tagsUrl, {},
		(result) ->
			tags = result.tags
			container = $ "#filters"
			tagButtons = addClickHandler $(tagToHtml tag) for tag in tags
			container.append tagButtons
			$("#filters a").click ->
				selector = $(this).attr('data-filter')
				$("#post-container").isotope
					filter: selector
				false

addClickHandler = (button) ->
	button

tagToHtml = (tag) ->
	"""
	<li><a href="#" data-filter=".tag-id-#{tag.id}">#{tag.title}</a></li>
	"""

postToHtml = (post) ->
	tags = post.tags.map( (tag) -> "tag-id-" + tag.id ).join ' '
	"""
	<div class="post #{ tags }">
		<h4>#{post.title}</h4>
		#{post.content}
	</div>
	"""
