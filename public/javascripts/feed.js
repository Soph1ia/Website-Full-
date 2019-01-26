/* Feed.js  */
$(document).ready(
    function () {
        var likes = 0;
        var downvotes = 0;

        /* Edits number of characters allowed */
        var totalCharacters = 280;

        $("#postForm").keyup(function (event) {
            var inputText = event.target.value;
            $("#charRemaining").html(totalCharacters -
                inputText.length);
        });

        getComments();

        function getComments() {
            $.ajax({
                url: '/getComments/',
                type: 'GET',
                success: function (data) {
                    var posts = " ";
                    for (var i = 0; i < data.length; i++) {
                        posts += "<div class='container col-md-6' id='outputSec output'>" + "<div class='container output' >" + data[i].comment + "</br><div class='row'>" + 
                            //upvotes
                            "<div class='col-sm-3' ><button type='button' id='upvote' name='" + data[i]._id + " up'>❤︎"+data[i].up_votes+"</button></div>"+
                            // downvotes
                            "<div class='col-sm-3' ><button type='button' id='downvote' name='" + data[i]._id + " down'>↯ "+data[i].down_votes+"</button></div>"
                        //delete
                            + "<div class='col-sm-3' ><button type='button' id='del' name='" + data[i]._id + " del'> ✖</button></div>" + "</div></div></div>";
                    }
                    $("#outputSec").html(posts);
                }
            });
            window.setTimeout(getComments, 10000);
        }

        /*Add Comment Through post button*/ 
        $("#postBtn").click(function (event) {
             event.preventDefault();
            $.ajax({
                url: '/addComment/',
                type: 'POST',
                data: {
                    user_name: "SOFIA",
                    comment: $('#inputPost').val()
                },
                success: function (data) {
                    getComments();
                }

            });

        });
        // keeps track of the clicks to see if clicked on the delete button.
        $("#outputSec").click(function (event) {
            console.log(event.target.name);
            var array = event.target.name.split(" ");
            console.log(array[1]);
            console.log(array[0]);
            var del = false;
            if (array[1] == "del"){
                del = true;
            } 
            console.log(del);
            if (event.target.name && del == true) {
                $.ajax({
                    url: '/deleteComment/' + array[0],
                    type: 'DELETE',
                    success: function (result) {      
                        console.log(result);
                        getComments();
                    }
                });
            }
        });
        /* Keeps track of the clicks to see if clicked on the upvote */ 
         $("#outputSec").click(function (event) {
            console.log(event.target.name);
            var array = event.target.name.split(" ");
            console.log(array[1]);
            console.log(array[0]);
            var up = false;
            if (array[1] == "up"){
                up = true;
            } 
            console.log(up);
            if (event.target.name && up == true) {
                $.ajax({
                    url: '/upVoteComment/' + array[0],
                    type: 'POST',
                    success: function (result) {      
                        console.log(result);
                        getComments();
                    }
                });
            }
        });
   
    // keeps track of the clicks to see if downvote has been clicked
        $("#outputSec").click(function (event) {
            console.log(event.target.name);
            var array = event.target.name.split(" ");
            console.log(array[1]);
            console.log(array[0]);
            var down = false;
            if (array[1] == "down"){
                down = true;
            } 
            console.log(down);
            if (event.target.name && down == true) {
                $.ajax({
                    url: '/downVote/' + array[0],
                    type: 'POST',
                    success: function (result) {      
                        console.log(result);
                        getComments();
                    }
                });
            }
        });
  });
