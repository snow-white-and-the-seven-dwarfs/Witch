// 四个方向上的浮动
function float(selector, init, direction, speed, fn) {
    var v = init;
    var opcaty = 0;
    if (direction === 'left') {
        selector.css({ left: init, opcaty: 0, display: 'block' });
    } else if (direction === 'right') {
        selector.css({ right: init, opcaty: 0, display: 'block' });
    } else if (direction === 'top') {
        selector.css({ top: init, opcaty: 0, display: 'block' });
    } else if (direction === 'bottom') {
        selector.css({ bottom: init, opcaty: 0, display: 'block' });
    }
    selector[0].timer = setInterval(function () {
        v -= 10;
        opcaty += 0.1;
        if (v < 0) {
            v = 0;
        }
        switch (direction) {
            case 'left':
                selector.css({ left: v, opcaty: opcaty });
                break;
            case 'right':
                selector.css({ right: v, opcaty: opcaty });
                break;
            case 'top':
                selector.css({ top: v, opcaty: opcaty });
                break;
            case 'bottom':
                selector.css({ bottom: v, opcaty: opcaty });
                break;
        }
        if (v == 0 && opcaty >= 1) {
            clearInterval(selector[0].timer);
            if (fn instanceof Function) {
                fn();
            }
        }
    }, speed);
}

// 轮播中的横向移动
function move(selector, targetValue, speed) {
    clearInterval(selector[0].timer1);
    selector[0].timer1 = setInterval(function () {
        var v = selector.position().left;
        if(v == targetValue) {
            clearInterval(selector[0].timer1);
            return;
        }
        if (Math.abs(targetValue - v) < speed) {
            selector.css({left:targetValue});
          } else {
            if (targetValue > v) {
              v = v + speed;
            } else {
              v = v - speed;
            }
            selector.css({left:v});
          }
    }, 10);
}


// 实现图片浮上来，文字左右移动出来的效果
float($('.xinMing-show .products-iPhone img'), 200, 'top', 30, function () {
    var $show_l = $('.xinMing-show .show-l > div');
    var $show_r = $('.xinMing-show .show-r > div');
    var i = 0;
    var timer = setInterval(function () {
        if (i == 3) {
            clearInterval(timer);
            return;
        }
        float($($show_l[i]), 200, 'right', 30);
        float($($show_r[i]), 200, 'left', 30);
        i++;
    }, 300);
});

// 轮播
var view_width = $('.router-Chart .view').width();
$('.router-Chart .view .list')[0].index = 0;
$('.router-Chart .view .list')[0].timer = setInterval(function () {
    var $selector = $('.router-Chart .view .list');
    // clearInterval($selector[0].timer);
    var index = $selector[0].index;
    if (index == 0) {
        $selector.css({left:0});
    }
    index ++;
    var v = index * - view_width;
    move($selector,v,10);
    if (index == 7) {
        index = 0;
    }
    $('.router-Chart .dot li').eq(index).addClass('active').siblings().removeClass('active');
    $selector[0].index = index;
}, 5000);

// 点击小点切换
$('.router-Chart .dot').on('click','li',function(e){
    var index = $(e.target.parentNode).index();
    var v = index * - view_width; 
    $('.router-Chart .view .list')[0].index = index;
    $('.router-Chart .dot li').eq(index).addClass('active').siblings().removeClass('active');
    $('.router-Chart .view .list').fadeOut(500,function(){
        $('.router-Chart .view .list').css({left:v}).fadeIn(500);
    });
})
