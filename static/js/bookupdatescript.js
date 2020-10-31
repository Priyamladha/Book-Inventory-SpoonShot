function addbook(){
    var num = document.getElementById('addbook').value
    var id = document.getElementById('book_id').innerText
    var data = "id="+id+"&num="+num;
    $.ajax({
        url: "/addbooks/",
        type: "POST",
        data:data,
        success: function (resp) {
            window.location.href = "/updatebook/"+id;
        }
    });
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