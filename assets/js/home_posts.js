{
  // 1st part function which handles the submission of the post // sends the data to controller action
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form"); // getting form

    newPostForm.submit(function (e) {
      // whenever this form submited i don't want to submit it naturally so i did e.preventDefault();
      e.preventDefault();

      // manually submiting as we using ajax then we submiting using ajax
      // parrallely ajax request
      $.ajax({
        type: "post", // type post req
        url: "/posts/create", // same as in the form action
        // and we need to send in data that we are creating the post for
        // newPostForm.serialize() this converts post form data into json like content would be the and value filled in the form

        data: newPostForm.serialize(), // newPostForm.serialize() will take all of the input values from the form (e.g. text fields, checkboxes, radio buttons) and format them into a string with the format name1=value1&name2=value2&....

        success: function (data) {
          // console.log(data);
          let newPost = newPostDom(data.data.post);

          $("#posts-list-container>ul").prepend(newPost);

          // adding button deletePost to the new post created by ajax
          deletePost($(" .delete-post-button", newPost));

          // call the create comment class
          new PostComments(data.data.post._id);

          // CHANGE :: enable the functionality of the toggle like button on the new post
          new ToggleLike($(" .toggle-like-button", newPost));

          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // 2nd method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
                <p>
                    
                    <small>
                        <a class="delete-post-button"  href="/posts/destroy/${post._id}">DeletePostAjax</a>
                    </small>
                   
                    ${post.content}
                    <br>
                    <small>
                    ${post.user.name}
                    </small>
                    <br>
                        <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                    0 Likes
                                </a>
                            
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

  // method to delete a post from DOM // function which recieves the data of the created post and displays over home page
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"), //getting value of href in a tag
        success: function (data) {
          // assume that we will be getting data which has the id of post which was deleted
          // it will remove the post
          $(`#post-${data.data.post_id}`).remove(); // this a jQuery method call that removes an HTML element from the page.
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();
}
