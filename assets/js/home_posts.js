{
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      // whenever this form submited i don't want to submit it naturally so i did e.preventDefault();
      e.preventDefault();

      // submiting using ajax
      $.ajax({
        type: "post", // type post req
        url: "/posts/create", // same as in the form action
        // and we need to send in data that we are creating the post for
        // newPostForm.serialize() this converts post form data into json like content would be the and value filled in the form
        data: newPostForm.serialize(),
        success: function (data) {
          // console.log(data);
          let newPost = newPostDom(data.data.post);

          $("#posts-list-container>ul").prepend(newPost);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };
  // method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
                <p>
                    
                    <small>
                        <a class="delete-post-button"  href="/posts/destroy/${post.id}">X</a>
                    </small>
                   
                    ${post.content}
                    <br>
                    <small>
                    ${post.user.name}
                    </small>
                </p>
                <div class="post-comments">
                    
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type Here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}" >
                            <input type="submit" value="Add Comment">
                        </form>
           
            
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
                </div>
                
            </li>`);
  };

  // method to delete a post from DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();
}
