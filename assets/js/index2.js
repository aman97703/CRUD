
// for update
const update_user = document.getElementById("update_user");
update_user.addEventListener('submit',function(event){
    event.preventDefault();
    // alert('Data Updated Successfully');
    var unindexed_array = $(this).serializeArray();
    var data = {}
    $.map(unindexed_array, function(n,i){
        data[n["name"]] = n["value"];
    })
    console.log(data);
    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data" : data            
    }
    $.ajax(request).done(function(response){
        alert("data Updated successfully");
    })

});