console.log('my-note app.js');

$(function () {
    if(localStorage.getItem('note')) {
        $('#memo').val(localStorage.getItem('note'));
    }
    $(".btn-about").paulund_modal_box();
});

$(".btn-newnote").on("click", function(){
    window.localStorage.clear();
    location.reload();
    console.log("new note click!!");
    // $("#memo").val('');
    return false;
});

$('.btn-savenote').click( function() {
    console.log("save note click!!");
    var note = $('#memo').val();
    localStorage.setItem('note', note);
    return false;
});

$(".btn-fullscreen").click(function () {
    $(document).toggleFullScreen();
});
