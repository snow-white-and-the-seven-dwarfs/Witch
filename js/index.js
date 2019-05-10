// 初始化
screen();
// 设置默认为4列
$('.composition ul')[0].current = 'four';
$('.small_screen .menu')[0].isShow = false;
// 设置默认.composition_list ul的高度
var imgHeight = $('.composition_list img').height();
$('.composition_list ul').height(imgHeight * 4);

// 可视区大小发生变化时触发
$(window).resize(screen);
// 可视区监测
function screen() {
    var height = $(window).height();
    var width = $(window).width() - 1;
    var imgHeight = $('.composition_list img').height();
    if (width > 800) {
        var current = $('.composition ul')[0].current;
        $('.composition_list ul li').height(imgHeight);
        $('.nav > ul li').css({ width: width, height: height });
        $('.nav').css({ height: height });
        $('.w').width(width * 0.9);
    }
    if (width >= height) {
        $('.nav .background_img').css('height', height);
    } else {
        $('.nav .background_img').css('width', width);
    }
    if (current === 'four') {
        $('.composition_list li').height(imgHeight).eq(15).css('display', 'block');
        $('.composition_list ul').height(imgHeight * 4);
    } else if (current === 'third') {
        $('.composition_list li').height(imgHeight).eq(15).css('display', 'none');
        $('.composition_list ul').height(imgHeight * 5);
    }
    if (width < 900) {
        $('.small_screen')[0].isSmallScreen = true;
        $('.small_screen')[0].previousHeight = $(window).scrollTop;
        $('.small_screen')[0].isShow = true;
        $('.small_screen').slideDown(500);
    } else {
        $('.small_screen').css('display', 'none');
        $('.small_screen')[0].isSmallScreen = false;
    }
}
// 自动轮播
var index = 0;
// 自动放大第一个轮播项中的张图片
function autoShow() {
    if (index == 0) {
        $('.nav .background_img').addClass('bimg_anima');
        $('.nav .text').addClass('text_anima');
        var $parent = $('.nav .banner li:eq(0)').find('.des');
        $parent.find('.son').css({ opacity: 0 });
        setTimeout(function () {
            textAutoShow($parent, 70, 1, 80);
        }, 1000);
    } else {
        $('.nav .background_img').removeClass('bimg_anima');
        $('.nav .text').removeClass('text_anima');
    }
}
// 自动弹出文字
function textAutoShow(selector, initTop, tragetIndex, speed) {
    var v = 0;
    var _top = initTop;
    var index = 0;
    clearInterval($('.nav .banner')[0].t_timer);
    selector.find('.mouse').removeClass('zoom');
    selector.find('.son').css({ opacity: 0, top: initTop });
    $('.nav .banner')[0].t_timer = setInterval(function () {
        v += 0.1;
        _top -= 10;
        if (_top <= 0) {
            _top = 0;
        }
        selector.find('.son').eq(index).css({ opacity: v, top: _top });
        if (v >= 1) {
            index++;
            v = 0;
            _top = initTop;
            if (index >= tragetIndex) {
                clearInterval($('.nav .banner')[0].t_timer);
                selector.find('.mouse').addClass('zoom');
            }
        }
    }, speed);
}
// 自动轮播
function autoPlay() {
    index++;
    if (index >= 3) {
        index = 0;
    }
    $('.nav .banner li').eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
    autoShow();
    if (index != 0) {
        var $parent = $('.nav .banner li').eq(index).find('.des');
        textAutoShow($parent, 50, 5, 40);
    }
}
// 重新排版
// 参数：num字符串
//   'third':三列显示
//   'four':四列显示
function reTypeset(num) {
    var index = 0;
    var v = 1;
    var timer = setInterval(function () {
        v -= 0.1;
        $('.composition_list li').eq(index).css('opacity', v);
        if (v <= 0) {
            v = 1;
            index++;
            if (index >= 17) {
                clearInterval(timer);
                if (num === 'third') {
                    var $selector = $('.composition_list li').addClass('third_row');
                    floatUp($selector, 150, 10, 15);
                } else if (num === 'four') {
                    var $selector = $('.composition_list li').removeClass('third_row');
                    floatUp($selector, 100, 10, 16);
                }
            }
        }
    }, 10);
}
// 盒子从下浮上来的效果
function floatUp(selector, initTop, speed, tragetIndex) {
    var v = initTop;
    var index = 0;
    var opacity = 0;
    var current = $('.composition ul')[0].current;
    var imgHeight = $('.composition_list li:eq(0) img').height();
    if (current === 'four') {
        $('.composition_list li').height(imgHeight).eq(15).css('display', 'block');
        $('.composition_list ul').height(imgHeight * 4);
    } else if (current === 'third') {
        $('.composition_list li').height(imgHeight).eq(15).css('display', 'none');
        $('.composition_list ul').height(imgHeight * 5);
    }
    selector.eq(index).css({ top: v, opacity: opacity });
    var timer = setInterval(function () {
        v -= 10;
        if (v <= 0) {
            v = 0;
        }
        opacity += 0.1;
        selector.eq(index).css({ top: v, opacity: opacity });
        if (opacity >= 1 && v <= 0) {
            v = initTop;
            opacity = 0;
            index++;
            selector.eq(index).css({ top: v, opacity: opacity });
            if (index >= tragetIndex) {
                clearInterval(timer);
            }
        }
    }, speed);
}

autoShow();

$('.nav .banner')[0].timer = setInterval(autoPlay, 6000);

// 点击进行轮播切换
$('.nav .next').click(function () {
    clearInterval($('.nav .banner')[0].t_timer);
    clearInterval($('.nav .banner')[0].timer);
    $('.nav .banner li').find('.son').css('opacity', 0);
    autoPlay();
    $('.nav .banner')[0].timer = setInterval(autoPlay, 6000);
});
$('.nav .prev').click(function () {
    clearInterval($('.nav .banner')[0].timer);
    clearInterval($('.nav .banner')[0].t_timer);
    $('.nav .banner li').find('.son').css('opacity', 0);
    index--;
    if (index < 0) {
        index = 2;
    }
    $('.nav li').eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
    autoShow();
    if (index != 0) {
        var $parent = $('.nav li').eq(index).find('.father');
        textAutoShow($parent, 50, 5, 40);
    }
    $('.nav .banner')[0].timer = setInterval(autoPlay, 6000);
});

// 微信二维码显示隐藏
$('.top .ma').mouseenter(function () {
    $('.top .erweima').show();
});
$('.top .ma').mouseleave(function () {
    $('.top .erweima').hide();
});

// 导航栏的显示与隐藏
$('.nav .lists,.fixed_top_nav .lists').mouseenter(function () {
    $(this).find('ul').css('display', 'block');
});
$('.nav .lists,.fixed_top_nav .lists').mouseleave(function () {
    $(this).find('ul').css('display', 'none');
});

// 固定定位导航的显示与隐藏
$(window).scroll(function (e) {
    var height = $(this).scrollTop();
    var nav_height = $('.nav li').height();
    var isSmall = $('.small_screen')[0].isSmallScreen;
    if (height >= nav_height) {
        $('.fixed_top_nav').stop().slideDown(300);
    } else {
        $('.fixed_top_nav').css('display', 'none');
    }
    if (isSmall) {
        var previousHeight = $('.small_screen')[0].previousHeight;
        var isShow = $('.small_screen')[0].isShow;
        if (previousHeight < height && !isShow) {
            $('.small_screen').slideDown(500);
            $('.small_screen')[0].isShow = true;
        } else if (previousHeight > height && isShow) {
            $('.small_screen').slideUp(500);
            $('.small_screen')[0].isShow = false;
        }
        $('.small_screen')[0].previousHeight = height;
    }
});

// 给banner注册点击事件
$('.nav .banner').on('click', '.mouse', function () {
    var height = $('.nav .banner li').outerHeight();
    $('html,body').animate({ scrollTop: height }, 800);
});

// 给切换列的按钮注册事件
$('.composition').on('click', '.btn', function () {
    var isLeftBtn = $(this).hasClass('left');
    var current = $('.composition ul')[0].current;
    if (isLeftBtn && current == 'third') {
        $(this).find('span').css('backgroundColor', '#222').end().next().find('span').css('backgroundColor', '#848484');
        $('.composition ul')[0].current = 'four';
        reTypeset('four');
    } else if (!isLeftBtn && current == 'four') {
        $(this).find('span').css('backgroundColor', '#222').end().prev().find('span').css('backgroundColor', '#848484');
        $('.composition ul')[0].current = 'third';
        reTypeset('third');
    }
});

// 给小屏幕下的菜单注册点击事件
$('.small_screen .menu').click(function () {
    var isShow = this.isShow;
    if(isShow == false) {
        $('.small_screen ul').slideDown(500);
        this.isShow = true;
    } else {
        $('.small_screen ul').slideUp(500);
        this.isShow = false;
    }
});