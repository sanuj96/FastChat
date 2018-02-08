// Make connection

var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
var	 handle = document.getElementById('handle');
var	 btn = document.getElementById('send');
var  output = document.getElementById('output');
var feedback = document.getElementById('feedback');

message.addEventListener('keypress',function() {
	socket.emit('typing',handle.value);
});

//Emit events
btn.addEventListener('click',function () {
	socket.emit('chat',{
		message: message.value,
		handle: handle.value 
	});
	message.value="";
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Listen for events
socket.on('chat',function (data) {
	feedback.innerHTML="";
	// output.innerHTML += '<table class="table table-striped"><thead><tr><th><i class="glyphicon glyphicon-user" style="margin-right: 10px;"></i> User </th><th><i class="glyphicon glyphicon-envelope" style="margin-right: 10px;"></i> Message</th></tr></thead><tbody><div id="output" ><tr><td> ' + data.handle + ' </td><td> ' + data.message + ' </td></tr></tbody></table>';
	 // output.innerHTML += '<div class="row"><div class="col-sm-1"><p><span class="glyphicon glyphicon-user"></span></p></div><div class="col-sm-1"><p><strong>' + data.handle + '</strong> : ' + data.message + '</p></div></div>';
	 
	 output.innerHTML += '<tr><td><i class="glyphicon glyphicon-user"> </i> <strong> ' + capitalizeFirstLetter(data.handle) + ' </strong></td><td> ' + data.message + ' </td></tr>';
});

socket.on('typing',function (data) {
	feedback.innerHTML ='<div class="alert alert-info alert-dismissable fade in"><p class="close" data-dismiss="alert" aria-label="close">&times;</p><strong>'+ data +'</strong> is typing a message</div>';
	// feedback.innerHTML = '<p>'+ data +' is typing a message </p>';
});
