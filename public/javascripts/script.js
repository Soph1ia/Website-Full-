AOS.init();
//var arrComment = [];

$(document).ready(function () {
    /* load in already posted comments */
    $("#commentSec").hide();
    $("#loadBtn").click(function () {
        $("#commentSec").toggle("slow");
        $("#loadBtn").hide();
    })
    
     /*stops from refreshing */
    $("#formInput").submit(function (e) {
        e.preventDefault();
    });
    /* ----------------- form -------------
    
    
    /* onclick 
    $('#postBtn').click(function () {
        var comment = {};
        var output = "";
        var temp = {};
        var postdate = Date.now();

        comment.handle = "@" + $("#inputName").val();
        comment.comment = $("#textArea").val();
        comment.postDate = postdate;

        /* places variables into temp object 
        for (var i = 0; i < Object.keys(comment).length; i++) {
            temp.handle = comment.handle;
            temp.comment = comment.comment;
            temp.postDate = comment.postDate;
        }

        arrComment.push(temp); // puts them into array
        console.log(arrComment);
        $('#formInput')[0].reset(); // clears the form

        // prints out the output
        for (var i = 0; i < arrComment.length; i++) {
            var TimeElapsed = postdate - arrComment[i].postDate;

            console.log("NAME" + arrComment[i].handle + arrComment[i].comment);
            if (TimeElapsed === 0) {
                output += "<div class='output'><p><span class='name'>" + arrComment[i].handle + "</span>" + "<br>" + arrComment[i].comment + "<span class='time'> <br> just now</span></p></div>";
            } else if (TimeElapsed / 1000 < 60) {
                output += "<div class='output'><p><span class='name'>" + arrComment[i].handle + "</span>" + "<br>" + arrComment[i].comment + "<br>" + Math.round(TimeElapsed / 1000) + "<span class='time'>s ago</span></p></div>";
            } else if (TimeElapsed / 60000 < 60) {
                output += "<div class='output'><p><span class='name'>" + arrComment[i].handle + "</span><br>" + arrComment[i].comment + "<br>" + Math.round(TimeElapsed / 60000) + "<span class='time'> m ago</span></p></div>";
            } else if (TimeElapsed / 60000 > 60) {
                output += "<div class='output'><p><span class='name'>" + arrComment[i].handle + "</span><br>" + arrComment[i].comment + "<br>" + Math.round((TimeElapsed / 60000) / 60) + "<span class='time'>Hrs ago</span></p></div>";
            }
        }
        $("#output").html(output);
    })
    */
});
