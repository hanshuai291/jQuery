$(function () {

    showHide();
    subMenu();
    searchShow();
    shareShow();
    addressShow();
    addressTab();
    miniCartShow();
    infoShow();
    moveImg();
    showMediumPic();
    showBigImg();

    //实现显示隐藏操作
    function showHide() {
        $("[name=show_hide]").hover(function () {
                var id = this.id + "_items";
                $("#" + id).show()
            },
            function () {
                var id = this.id + "_items";
                $("#" + id).hide();
            })
    }

    //实现二级菜单
    function subMenu() {
        var $menu = $("#category_items>div");
        $menu.hover(function () {
            $(this).children(':last').show();
        }, function () {
            $(this).children(':last').hide();
        })
    }

    //实现搜索栏显示
    function searchShow() {
        $("#txtSearch").on("focus keyup", function () {
            var txt = this.value.trim();
            if (txt) {
                $("#search_helper").show();
            }

        })
            .blur(function () {
                $("#search_helper").hide();
            })
    }

    //实现分享栏显示
    function shareShow() {
        var $shareMore = $("#shareMore");
        var $parent = $shareMore.parent();
        var $as = $shareMore.prevAll(":lt(2)");
        var $b = $shareMore.children();
        var isClose = true;
        $shareMore.click(function () {
            if (isClose) {
                isClose = false;
                $parent.css("width", 200);
                $as.show();
                $b.addClass("backword");
            } else {
                isClose = true;
                $parent.css("width", 155);
                $as.hide();
                $b.removeClass("backword");
            }
        })
    }

    //实现地址显示
    function addressShow() {
        $("#store_select").hover(function () {
            $("#store_select").children(":gt(0)").show();
        }, function () {
            $("#store_select").children(":gt(0)").hide();
        })
            .children(":last").click(function () {
            $("#store_select").children(":gt(0)").hide();
        })
    }

    //时间地址栏切换

    function addressTab() {
        $("#store_tabs>li").click(function () {
            $("#store_tabs>li").removeClass("hover");
            this.className = "hover";
        })
    }

    //加入购物车显示
    function miniCartShow() {
        $("#minicart").hover(function () {
            this.className = "miniCartShow";
            $(this).children(":last").show();
        }, function () {
            this.className = "";
            $(this).children(":last").hide();
        })
    }

    //显示商品信息切换
    function infoShow() {
        var $lsts = $(".main_tabs>li");
        var $contents = $("#product_detail>div:gt(0)");
        $lsts.click(function () {
            $lsts.removeClass();
            this.className = "current";
            $contents.hide();
            var index = $(this).index();
            $contents.eq(index).show();
        })
    }

    //实现移动图片按钮
    function moveImg() {
        var $as = $("#preview>h1");
        var $lst = $("#icon_list");
        var $backward = $as.children("a:first");
        var $forward = $as.children("a:last");
        var SHOW_COUNT = 5;
        var moveCount = 0;
        var imgWidth = $lst.children(":first").width();
        var imgCount = $lst.children("li").length;

        $forward.click(function () {
            if (moveCount === imgCount - SHOW_COUNT) {
                return
            }
            moveCount++;
            $backward.attr("class", "backward");
            if (moveCount === imgCount - SHOW_COUNT) {
                $forward.attr("class", "forward_disabled");
            }
            console.log(moveCount);
            $lst.css({
                left: -imgWidth * moveCount,
            })


        });

        $backward.click(function () {
                if (moveCount === 0) {
                }
                moveCount--;
                $forward.attr("class", "forward");
                console.log(moveCount);
                if (moveCount <= 0) {
                    $backward.attr("class", "backward_disabled");
                }
                $lst.css({
                    left: -imgWidth * moveCount,
                })
            }
        )
    }

    //显示中图
    function showMediumPic() {
        $lst = $("#icon_list>li");
        $lst.hover(function () {
            $(this).children().addClass("hoveredThumb");
            var src = $(this).children().attr("src").replace(".jpg", "-m.jpg");
            $('#mediumImg').attr("src", src);
        }, function () {
            $(this).children().removeClass();
        })
    }

    //显示大图
    function showBigImg() {
        var $mediumImg = $("#mediumImg");
        var $mask = $("#mask");
        var $maskTop = $('#maskTop');
        var $maskWidth = $mask.width();
        var $maskHeight = $mask.height();
        var $maskTopWidth = $maskTop.width();
        var $maskTopHeight = $maskTop.height();
        var $largeImgContainer = $("#largeImgContainer");
        var $loading = $("loading");
        var $largeImg = $("#largeImg");


        $maskTop.hover(function () {
            $mask.show();
            var src = $mediumImg.attr("src").replace("-m", "-l");
            $largeImg.attr("src", src);
            $largeImgContainer.show();
            $largeImgContainer.css({
                width: $largeImg.width() / 2,
                height: $largeImg.height() / 2,

            });
            $largeImg.on("load", function () {
                $maskTop.mousemove(function (event) {
                    var left = 0;
                    var top = 0;
                    left = event.offsetX - $maskWidth / 2;
                    top = event.offsetY - $maskHeight / 2;
                    console.log(top);
                    if (left < 0) {
                        left = 0;
                    } else if (left > $maskTopWidth - $maskWidth) {
                        left = $maskTopWidth - $maskWidth;
                    }
                    if (top < 0) {
                        top = 0;
                    } else if (top > $maskTopHeight - $maskHeight) {
                        top = $maskTopHeight - $maskHeight;
                    }

                    $mask.css({
                        left: left,
                        top: top
                    });

                    left = -left * $largeImg.width() / $maskTopWidth;
                    top = -top * $largeImg.height() / $maskTopHeight;
                    $largeImg.css({
                        left: left,
                        top: top,
                    });
                    $largeImg.show();
                    $loading.hide()
                });

            })
        }, function () {
            $mask.hide();
            $largeImgContainer.hide();
            $largeImg.hide();
        })

    }

})