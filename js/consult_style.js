$(document).ready(function() {

    // 사진 촬영 / 불러오기 영역
    $('#captureBtn, #uploadBtn').on('click', function() {
        var input = $('<input type="file" accept="image/*">');
        input.on('change', function(e) {
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    $('#preview').attr('src', event.target.result);
                    $('#preview').show();
                    $('#noImgMsg').css('display','none');
                    $('#nextBtn').removeClass('disabled');
                };
                reader.readAsDataURL(file);
            }
        });
        input.click();
    });

    $('#styleMemo').on('input', function() {
        console.log($(this).val().length)
        var memo = $(this).val();
        if (memo.length > 0) {
            $('#nextBtn').removeClass('disabled');
        } else {
            $('#nextBtn').addClass('disabled');
        }
    })
});