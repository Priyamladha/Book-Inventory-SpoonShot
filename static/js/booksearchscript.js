var response;
function booksearch() {
    var search = document.getElementById('book_keyword').value
    document.getElementById('book_keyword').value =""
    if(search==""){
        alert("Invalid Search");
    }
    else{
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q="+search,
        type: "GET",
        success: function (resp) {
            response = resp;
            printresp();
        }
    });
}
}

function addbook(id){
    var data = 'id='+id;
    $.ajax({
        url: "/addbook/ajax/",
        type: "POST",
        data: data,
        success: function (resp) {
        }
    });
}
function checkbook(id,elementid,titledata,imgdata,link,bookid){
    var data = 'id='+id;
    var checkk;
    $.ajax({
        url: "/checkbook/ajax/",
        type: "POST",
        data: data,
        //async: false,
        success: function (resp) {
            var title ="";
            var id ="";
            var available_result = "";
            var stock ="";
            var br = $('<br>');
            var addbtn ="";
            var img ="";
            var br ="";

           if(!resp)
            checkk =[0];
           else
           {
               checkk = [1,resp.count];
            }
            if(checkk[0]){
            
            if(checkk[1])
                    available_result = $('<h5 class="center-align" style="color:#31A745;">' + "Available - In Stock" + '</h5>')
      
                else
                    available_result = $('<h5 class="center-align" style="color:#31A745;">' + 'Available - <span style="color:#B30707;">Out of Stock</span>' + '</h5>')
            }
            else
                available_result = $('<h5 class="center-align" style="color:#B30707;">' + "Not Available" + '</h5>')
            
            title = $('<h5 class="center-align" style="color:#57CBCC;font-weight: bold;">' +'<a href="'+link+'">'+ titledata + '</a>'+'</h5>');
            img = $('<img class="center-align" src="'+imgdata+'" width="150" height="200" style="margin-bottom: 10px;margin-top:0%;"/>');

            addbtn = $('<button class="center-align btn btn-success" id="'+bookid+'" onclick="addfoo(this.id)">'+"Add Book"+'</button>');
            br = $('<br>');
            
            img.appendTo(elementid);
            title.appendTo(elementid);
            available_result.appendTo(elementid);
    
            if(!checkk[0])
                addbtn.appendTo(elementid);
        }
    });
}
function alertfoo(id){
    alert("Book with id - "+id+" added");
}
function addfoo(id){
    addbook(id);
    alertfoo(id);
}
function printresp(){
    document.getElementById('book_results').innerHTML = "";

    for(i=0;i<response.items.length;i++){
        var idx = i+1;
        document.getElementById(idx).innerHTML = "";
        var elementid = '#'+idx;
        id = response.items[i].id;
        var title = response.items[i].volumeInfo.title;
        var img = response.items[i].volumeInfo.imageLinks.thumbnail;
        var infolink = response.items[i].volumeInfo.infoLink
        checkbook(id,elementid,title,img,infolink,id);
    }

}

var input = document.getElementById("book_keyword");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("search_button").click();
     console.log("yes");
    }
  });

document.getElementById('search_button').addEventListener('click',booksearch,false)