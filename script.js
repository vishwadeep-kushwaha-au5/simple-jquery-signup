var parsedData,errorFlag,actionButtons,viewModel,X={};

function renderView(index){
    $('#viewModel').empty();
    viewModel = '<b>Fullname: </b>'+parsedData[index].name+'<br /><b>Email: </b>'+parsedData[index].email+'<br /><b>Moile: </b>'+parsedData[index].mobile;
    $('#viewModel').append(viewModel);
}

function deleteUser(index){
    $.ajax({
        type:'POST',
        url:'users.json'

    })
}

$(document).ready(function(){
    var name = $('#name');
    var email = $('#eMail');
    var mobile = $('#phoneNumber');


    console.log("oko");
    $.ajax({
        type:'GET',
        url:'users.json',
        dataType:'text',
        success: function(data){
            parsedData=JSON.parse(data);
            $.each(parsedData, function(index,key){
                actionButtons = '<button onclick="renderView('+index+')" type="button" class="btn btn-outline-secondary btn-xs">View</button>&nbsp;<button onclick="deleteUser('+index+')" type="button" class="btn btn-outline-danger btn-xs">Delete</button>';
                $('table').append("<tr><td>"+key.name+"</td>"+"<td>"+key.email+"</td>"+"<td>"+key.mobile+"</td>"+"<td>"+actionButtons+"</td></tr>");
            })
        },
        error: function(error,exception){

         }
    });

    $('#signUp').on("click",function(){
        errorFlag = 0;
        $('#nameError').empty();
        $('#emailError').empty();
        $('#mobileError').empty();
        if(!(name.val().length>=3 && name.val().length<=20) || !name.val().replace(/\s/g, '').length){
            $('#nameError').append("Name must be 3-20 characters long.");
            errorFlag =1;
        }
        else if(!/^[a-zA-Z. ]*$/.test(name.val())){
            $('#nameError').append("Name can only contain alphabet,space or/and dot.");
            errorFlag =1;
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.val())){
            $('#emailError').append("Please enter a valid email.");
            errorFlag =1;
        }
        if(!(mobile.val().length==10)){
            $('#mobileError').append("Mobile number must be of 10 character.");
            errorFlag =1;
        }
        else if(!/^[0-9]*$/.test(mobile.val())){
            $('#mobileError').append("Mobile number can only contain numbers.");
            errorFlag =1;
        }
        if(errorFlag)
            return false;

        console.log("ok1");
        $.ajax({
            method: 'POST',
            url: 'users.json',
            dataType: 'text',
            data: JSON.stringify({
                "name1": name.val(),
                "email1": email.val(),
                "mobile1" : mobile.val()
            }),
            success: function(newUser){
                console.log("success"+newUser);
            }
        });
    });
});