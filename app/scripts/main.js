(function() {
  var addClickHandler, postToHtml, tagToHtml;

  $(function() {
    var posts, postsUrl, tags, tagsUrl;
    posts = [];
    postsUrl = "http://lit-shore-9728.herokuapp.com/api/get_recent_posts/?callback=?";
    $.getJSON(postsUrl, {}, function(result) {
      var container, post, postsHtml, _i, _len;
      container = $("#post-container");
      posts = result.posts;
      postsHtml = '';
      for (_i = 0, _len = posts.length; _i < _len; _i++) {
        post = posts[_i];
        postsHtml += postToHtml(post);
      }
      container.html(postsHtml);
      return container.isotope({
        itemSelector: ".post",
        layoutMode: "masonry"
      });
    });
    tags = [];
    tagsUrl = "http://lit-shore-9728.herokuapp.com/api/get_tag_index/?callback=?";
    return $.getJSON(tagsUrl, {}, function(result) {
      var container, tag, tagButtons;
      tags = result.tags;
      container = $("#filters");
      tagButtons = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = tags.length; _i < _len; _i++) {
          tag = tags[_i];
          _results.push(addClickHandler($(tagToHtml(tag))));
        }
        return _results;
      })();
      container.append(tagButtons);
      return $("#filters a").click(function() {
        var selector;
        selector = $(this).attr('data-filter');
        $("#post-container").isotope({
          filter: selector
        });
        return false;
      });
    });
  });

  addClickHandler = function(button) {
    return button;
  };

  tagToHtml = function(tag) {
    return "<li><a href=\"#\" data-filter=\".tag-id-" + tag.id + "\">" + tag.title + "</a></li>";
  };

  postToHtml = function(post) {
    var tags;
    tags = post.tags.map(function(tag) {
      return "tag-id-" + tag.id;
    }).join(' ');
    return "<div class=\"post " + tags + "\">\n	<h4>" + post.title + "</h4>\n	" + post.content + "\n</div>";
  };

}).call(this);
