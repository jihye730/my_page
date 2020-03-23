
// SBS 슬라이더 시작
function SliderSbs__setAutoplayAvailable($slider, available) {
    $(this).data('slider-sbs-autoplay-available', available);
}

function SliderSbs__showRight($slider) {
    var $current = $slider.find('> .slides > div.active');
    var $post = $current.next();
    
    if ( $post.length == 0 ) {
        $post = $slider.find('> .slides > div:first-child');
    }
    
    SliderSbs__show($slider, $post.index(), 'right');
}

function SliderSbs__showLeft($slider) {
    var $current = $slider.find('> .slides > div.active');
    var $post = $current.prev();
    
    if ( $post.length == 0 ) {
        $post = $slider.find('> .slides > div:last-child');
    }
    
    SliderSbs__show($slider, $post.index(), 'left');
}

function SliderSbs__show($slider, index, dir) {
    if ( $slider.data('slider-sbs-now-animating') ) {
        return;
    }
    
    var animateDuration = $slider.data('slider-sbs-animate-duration');

    var $current = $slider.find(' > .slides > div.active');
    var $post = $slider.find(' > .slides > div').eq(index);

    if ( $current.index() == $post.index() ) {
        return;
    }

    $slider.find(' > .page-menu > div.active').removeClass('active');
    $slider.find(' > .page-menu > div').eq(index).addClass('active');

    $slider.data('slider-sbs-now-animating', true);

    if ( dir == 'right' ) {
        $post.css('left', '100%');

        $post.stop().animate({
            left:'0%'
        }, animateDuration);

        $current.stop().animate({
            left:'-100%'
        }, animateDuration);
    }
    else {
        $post.css('left', '-100%');

        $post.stop().animate({
            left:'0%'
        }, animateDuration);

        $current.stop().animate({
            left:'100%'
        }, animateDuration);
    }

    setTimeout(function() {
        $slider.data('slider-sbs-now-animating', false);
    }, animateDuration);

    $post.addClass('active');
    $current.removeClass('active');
}

function SliderSbs__init() {
    $('.slider-sbs > .page-menu > div').click(function() {
        var $clicked = $(this);
        var $slider = $clicked.closest('.slider-sbs');
        var index = $clicked.index();
        var dir = index > $slider.find('> .page-menu > div.active').index() ? 'right' : 'left';
        
        SliderSbs__show($slider, index, dir);
    });

    $('.slider-sbs > .nav-btns > div').click(function() {
        var $clicked = $(this);
        var $slider = $clicked.closest('.slider-sbs');
        var dir = $clicked.index() == 0 ? 'left' : 'right';
        
        if ( dir == 'left') {
            SliderSbs__showLeft($slider);
        }
        else {
            SliderSbs__showRight($slider);
        }
    });
    
    $('.slider-sbs').data('slider-sbs-autoplay-available', true);
    
    $('.slider-sbs').mouseenter(function() {
        $(this).data('slider-sbs-autoplay-available', false);
    });
    
    $('.slider-sbs').mouseleave(function() {
        $(this).data('slider-sbs-autoplay-available', true);
    });
    
    $('.slider-sbs').each(function(index, node) {
        var $slider = $(node);
        
        if ( typeof $slider.attr('data-slider-sbs-animate-duration') != 'undefined' ) {
            var animateDuration = parseInt($slider.attr('data-slider-sbs-animate-duration'));
            
            $slider.data('slider-sbs-animate-duration', animateDuration);
        }
        else {
            $slider.data('slider-sbs-animate-duration', 500);
        }
        
        if ( typeof $slider.attr('data-slider-sbs-autoplay') != 'undefined' ) {
            var autoplayTimeout = parseInt($slider.attr('data-slider-sbs-autoplay'));
            
            setInterval(function() {
                if ( $slider.data('slider-sbs-autoplay-available') ) {
                    SliderSbs__showRight($slider);
                }
            }, autoplayTimeout);
        }
    });
}

SliderSbs__init();
