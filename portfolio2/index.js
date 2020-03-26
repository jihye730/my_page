setTimeout(function () {
    $(window).scrollTop(3400);
}, 0);

//첫 화면 애니메이션
setTimeout(function () {
    $('body').addClass('bg-active');
}, 500);

// 헤더 메뉴바 스크롤시 변화
function NotScrollTop0__init() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 20) {
        $('html').addClass('not-scroll-top-0');
    } else {
        $('html').removeClass('not-scroll-top-0');
    }
}

$(window).scroll(NotScrollTop0__init);
NotScrollTop0__init();

//light box 
lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    disableScrolling: false,
    fitImagesInViewport: false
});

// tab menu
$('.wrap2 .page2 .part1 .tab-con .tab-menu ul li').click(function () {
    var $this = $(this);
    var index = $this.index();

    $this.addClass('active');
    $this.siblings('.active').removeClass('active');

    var $tab__con = $this.closest('.tab-con');

    var $current = $tab__con.find(' > .tab-list.active');
    var $post = $tab__con.find(' > .tab-list').eq(index);

    $current.removeClass('active');
    $post.addClass('active');
})


//typing
var typingBool = false;
var typingIdx = 0;
var liIndex = 0;
var liLength = $(".wrap2 .page1 > .row > .cell:first-child > .tag > li").length;

// 타이핑될 텍스트를 가져온다 
var typingTxt = $(".wrap2 .page1 > .row > .cell:first-child > .tag > li").eq(liIndex).text();
//liIndex 인덱스로 구분해 한줄씩 가져옴

typingTxt = typingTxt.split(""); // 한글자씩 잘라 배열로만든다

if (typingBool == false) { // 타이핑이 진행되지 않았다면 
    typingBool = true;
    var tyInt = setInterval(typing, 50); // 반복동작 
}

function typing() {
    $(".typing ul li").removeClass("on");
    $(".typing ul li").eq(liIndex).addClass("on");
    //현재 타이핑되는 문장에만 커서 애니메이션을 넣어준다.

    if (typingIdx < typingTxt.length) { // 타이핑될 텍스트 길이만큼 반복 
        $(".typing ul li").eq(liIndex).append(typingTxt[typingIdx]); // 한글자씩 이어준다. 
        typingIdx++;
    } else { //한문장이끝나면
        if (liIndex < liLength - 1) {
            //다음문장으로  가기위해 인덱스를 1증가
            liIndex++;
            //다음문장을 타이핑하기위한 셋팅
            typingIdx = 0;
            typingBool = false;
            typingTxt = $(".wrap2 .page1 > .row > .cell:first-child > .tag > li").eq(liIndex).text();

            //다음문장 타이핑전 1초 쉰다
            clearInterval(tyInt);
            //타이핑종료

            setTimeout(function () {
                //1초후에 다시 타이핑 반복 시작
                tyInt = setInterval(typing, 50);
            }, 500);
        } else if (liIndex == liLength - 1) {

            //마지막 문장까지 써지면 반복종료
            clearInterval(tyInt);

            //1초후
            setTimeout(function () {
                //사용했던 변수 초기화
                typingBool = false;
                liIndex = 0;
                typingIdx = -0;

                //첫번째 문장으로 셋팅
                typingTxt = $(".wrap2 .page1 > .row > .cell:first-child > .tag > li").eq(liIndex).text();
                //타이핑 결과 모두 지우기
                $(".typing ul li").html("")

                //반복시작
                tyInt = setInterval(typing, 100);
            }, 3000);


        }
    }
}



// SBS 슬라이더 시작
function SliderSbs__setAutoplayAvailable($slider, available) {
    $(this).data('slider-sbs-autoplay-available', available);
}

function SliderSbs__showRight($slider) {
    var $current = $slider.find('> .slides > div.active');
    var $post = $current.next();

    if ($post.length == 0) {
        $post = $slider.find('> .slides > div:first-child');
    }

    SliderSbs__show($slider, $post.index(), 'right');
}

function SliderSbs__showLeft($slider) {
    var $current = $slider.find('> .slides > div.active');
    var $post = $current.prev();

    if ($post.length == 0) {
        $post = $slider.find('> .slides > div:last-child');
    }

    SliderSbs__show($slider, $post.index(), 'left');
}

function SliderSbs__show($slider, index, dir) {
    if ($slider.data('slider-sbs-now-animating')) {
        return;
    }

    var animateDuration = $slider.data('slider-sbs-animate-duration');

    var $current = $slider.find(' > .slides > div.active');
    var $post = $slider.find(' > .slides > div').eq(index);

    if ($current.index() == $post.index()) {
        return;
    }

    $slider.find(' > .page-menu > div.active').removeClass('active');
    $slider.find(' > .page-menu > div').eq(index).addClass('active');

    $slider.data('slider-sbs-now-animating', true);

    if (dir == 'right') {
        $post.css('left', '100%');

        $post.stop().animate({
            left: '0%'
        }, animateDuration);

        $current.stop().animate({
            left: '-100%'
        }, animateDuration);
    } else {
        $post.css('left', '-100%');

        $post.stop().animate({
            left: '0%'
        }, animateDuration);

        $current.stop().animate({
            left: '100%'
        }, animateDuration);
    }

    setTimeout(function () {
        $slider.data('slider-sbs-now-animating', false);
    }, animateDuration);

    $post.addClass('active');
    $current.removeClass('active');
}

function SliderSbs__init() {
    $('.slider-sbs > .page-menu > div').click(function () {
        var $clicked = $(this);
        var $slider = $clicked.closest('.slider-sbs');
        var index = $clicked.index();
        var dir = index > $slider.find('> .page-menu > div.active').index() ? 'right' : 'left';

        SliderSbs__show($slider, index, dir);
    });

    $('.slider-sbs > .nav-btns > div').click(function () {
        var $clicked = $(this);
        var $slider = $clicked.closest('.slider-sbs');
        var dir = $clicked.index() == 0 ? 'left' : 'right';

        if (dir == 'left') {
            SliderSbs__showLeft($slider);
        } else {
            SliderSbs__showRight($slider);
        }
    });

    $('.slider-sbs').data('slider-sbs-autoplay-available', true);

    $('.slider-sbs').mouseenter(function () {
        $(this).data('slider-sbs-autoplay-available', false);
    });

    $('.slider-sbs').mouseleave(function () {
        $(this).data('slider-sbs-autoplay-available', true);
    });

    $('.slider-sbs').each(function (index, node) {
        var $slider = $(node);

        if (typeof $slider.attr('data-slider-sbs-animate-duration') != 'undefined') {
            var animateDuration = parseInt($slider.attr('data-slider-sbs-animate-duration'));

            $slider.data('slider-sbs-animate-duration', animateDuration);
        } else {
            $slider.data('slider-sbs-animate-duration', 500);
        }

        if (typeof $slider.attr('data-slider-sbs-autoplay') != 'undefined') {
            var autoplayTimeout = parseInt($slider.attr('data-slider-sbs-autoplay'));

            setInterval(function () {
                if ($slider.data('slider-sbs-autoplay-available')) {
                    SliderSbs__showRight($slider);
                }
            }, autoplayTimeout);
        }
    });
}

SliderSbs__init();

// hover-txt-box
function Box1__init() {
    $('.tab-list > ul > li').each(function (index, node) {
        var $box1 = $(node);

        var $hoverTxtBox = $box1.find('.item > .hover-txt-box');

        $box1.data('hover-txt-box', $hoverTxtBox);
        $box1.data('hover-txt-box-width', $hoverTxtBox.width());
    });

    $('.tab-list > ul > li').mousemove(function (e) {
        var $box1 = $(this);
        var $hoverTxtBox = $box1.data('hover-txt-box');
        var hoverTxtBoxWidth = $box1.data('hover-txt-box-width');

        var x = e.offsetX - hoverTxtBoxWidth / 2 - 10;
        var y = e.offsetY + 40;

        $hoverTxtBox.css({
            left: x + 'px',
            top: y + 'px'
        });
    });
}

Box1__init();

//view_more
lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    disableScrolling: false,
    fitImagesInViewport: false,
    maxWidth: 1000
})

//form js 시작
function nl2br(str) {
    return str.replace(/\n/g, "<br />");
}

function Email__callback(data) {
    if (data.resultCode.substr(0, 2) == 'S-') {
        document.sendEmailForm.reset();
    }

    alert(data.msg);
}

function sendEmailFormSubmit(form) {
    if (form.receiverName.value.length == 0) {
        alert('폼안에 receiverName 의 value 를 입력해주세요.');
        return false;
    }

    if (form.receiverEmail.value.length == 0) {
        alert('폼안에 receiverEmail 의 value 를 입력해주세요.');
        return false;
    }

    form.senderName.value = form.senderName.value.trim();

    if (form.senderName.value.length == 0) {
        alert('당신의 이름을 입력해주세요.');
        form.senderName.focus();
        return false;
    }

    form.senderEmail.value = form.senderEmail.value.trim();

    if (form.senderEmail.value.length == 0) {
        alert('당신의 이메일을 입력해주세요.');
        form.senderEmail.focus();
        return false;
    }

    form.body.value = form.body.value.trim();

    if (form.body.value.length == 0) {
        alert('내용을 입력해주세요.');
        form.senderEmail.focus();
        return false;
    }

    var senderName = form.senderName.value;
    var senderEmail = form.senderEmail.value;
    var title = '[이력서 보고 연락 드립니다]';
    var body = nl2br(form.body.value);
    var receiverName = form.receiverName.value;
    var receiverEmail = form.receiverEmail.value;

    var url = 'https://email.oa.gg/doSendEmail2.php?senderName=' + senderName + '&senderEmail=' + senderEmail + '&receiverName=' + receiverName + '&receiverEmail=' + receiverEmail + '&title=' + title + '&body=' + body;

    //console.log("URL : " + url);

    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script)
}
