function bookdetails(id,count,elementid,idx){
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes/"+id,
        type: "GET",
        success: function (resp) {
            var id = $('<h5 class="center-align">' + resp.id+ '</h5>');
            var infolink = resp.volumeInfo.infoLink
            var title =$('<h5 class="center-align" style="color:#57CBCC;font-weight: bold;">' +'<a href="'+infolink+'">'+ resp.volumeInfo.title + '</a>'+ '</h5>');
            
            if(count)
                var stockcount  = $('<h5 class="center-align" style="color:#31A745;">' + "In Stock : "+count + '</h5>');
            else
                var stockcount  = $('<h5 class="center-align" style="color:#B30707;">' + "Out of Stock : "+count + '</h5>');
            var removebtn = $('<button class="center-align btn btn-success" id="'+resp.id+'" onclick="removefoo(this.id)">'+"Remove"+'</button>');
            var updatebtn = $('<button class="center-align btn btn-success" id="'+resp.id+'" onclick="updatefoo(this.id)">'+"Update"+'</button>');
            var img = $('<img class="center-align" src="'+resp.volumeInfo.imageLinks.thumbnail+'" width="180" height="250" style="margin-bottom: 10px;margin-top:0%;"/>');

            img.appendTo(elementid);
            console.log(elementid);
            title.appendTo(elementid);
            stockcount.appendTo(elementid);
            removebtn.appendTo(elementid);
            document.getElementById(idx).innerHTML += '       ';
            updatebtn.appendTo(elementid);
            document.getElementById(idx).innerHTML += '<br>';
            document.getElementById(idx).innerHTML += '<br>';
            document.getElementById(idx).innerHTML += '<br>';
        }
    });
}
function removefoo(id) {
    removebook(id);
  }

function removebook(id){
    var data = 'id='+id;
    $.ajax({
        url: "/removebook/ajax/",
        type: "POST",
        data: data,
        success: function (resp) {
            window.location.reload();
        }
    });
}

function updatefoo(id) {
    updatebook(id);
  }

function updatebook(id){
    var data = 'id='+id;
    $.ajax({
        url: "/updatebook?id="+id,
        type: "GET",
        success: function (resp) {
            window.location.href = "/updatebook/"+id;
        }
    });
}    
window.addEventListener('load', function () {
    $.ajax({
        url: "/inventory/ajax/",
        type: "GET",
        success: function (response) {

            var count ="";
            var idx =1;
            for(i=0;i<response.length;i++){
                var elementid = "booktiles";

                if(i%4==0){
                    var new_row = document.createElement('div');
                    new_row.className = "row";
                    for(;idx<=4;idx++){
                       var idd = idx+i;
                       var innerdiv = '<div class="col-sm-3" id="'+idd+'">'+ "" +'</div>';
                     new_row.innerHTML += innerdiv;

                   }
                   document.getElementById(elementid).appendChild(new_row);
                    
                    
                    idx =1;
                }
            }

            for(i=0;i<response.length;i++){
                var idx = i+1;
                var elementid = "#"+idx;
                bookdetails(response[i]._id,response[i].count,elementid,idx);
            }
            
        }
    });


}

);
