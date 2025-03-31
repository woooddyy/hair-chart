$(document).ready(function() {
    // 사진 영역 캐로셀
    let currentIndex = 0;
    const slides = $('.carousel-slide');
    const totalSlides = slides.length;
    const slideWidth = slides.outerWidth();
    function moveSlide(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }

        $('.carousel').css('transform', `translateX(-${currentIndex * slideWidth}px)`);
    }
    
    let startX = 0;
    let endX = 0;

    $('.carousel').on('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    $('.carousel').on('touchmove', e => {
        endX = e.touches[0].clientX;
    });
    
    $('.carousel').on('touchend', () => {
        if (startX > endX + 5) {
            currentIndex ++;
        } else if (startX < endX - 5) {
            currentIndex --;
        }
        currentIndex = Math.max(0, Math.min(currentIndex, totalSlides-1));
        $('.carousel').css('transform', `translateX(-${currentIndex * slideWidth}px)`);
    });


    // 좌측 버튼 클릭
    $('.prev').click(function() {
        moveSlide(-1);
    });

    // 우측 버튼 클릭
    $('.next').click(function() {
        moveSlide(1);
    });

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
    // 건너뛰기
    $('#skipBtn').on('click', function() {
        window.location.href='./chart_consult.html';
    });

    // 아이템 행추가/행삭제
    $(".add-item-btn").click(function() {
        var id = $(this).attr("id");
        var type = id.split("_")[1];
        var cnt = $("#"+type+"Check .check-item").length-1;
        if (cnt == 99) {
            return false;
        } else {
            if (cnt < 9) {
                cnt = '0' + (cnt+1)
            } else {
                cnt += 1
            }
        }
        $("#"+type+"Check").append('<p class="check-item add-item" id="'+type+cnt+'"><input type="text" class="item-input"/></p>');
    });
    $(".remove-item-btn").click(function() {
        var id = $(this).attr("id");
        var type = id.split("_")[1];
        $('.add-item.on').each(function() {
            $(this).css({"display" : "none"});
        });
    });

    // 시술 선택 이벤트
    $('.check-items-area').on('click', '.check-item', function() {
        // 이미 on 인경우 on 해제
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
        } else {
            $(this).addClass('on');
        }
    });
});