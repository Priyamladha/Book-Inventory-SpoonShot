function addbook(){
    var num = document.getElementById('addbook').value
    if(num<0){
        alert("Please Enter a Valid Number")
    }
    else{
    var id = document.getElementById('book_id').innerText
    var data = "id="+id+"&num="+num;
    $.ajax({
        url: "/addbooks/",
        type: "POST",
        data:data,
        success: function (resp) {
            //window.location.href = "/updatebook/"+id;
            window.location.replace("/inventory/");
        }
    });
    }
}
function removebook(){
    var id = document.getElementById('book_id').innerText
    var data = 'id='+id;
    $.ajax({
        url: "/removebook/ajax/",
        type: "POST",
        data: data,
        success: function (resp) {
            window.location.replace("/inventory/");
        }
    });
}

document.getElementById('add_button').addEventListener('click',addbook,false)
document.getElementById('remove_button').addEventListener('click',removebook,false)