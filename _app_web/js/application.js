function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


var kPortfolioFile = 1;
var kThumbnail = 2;
var kSmallThumbnail = 3;
var kOriginalFile = 4;
var kFeaturedImage = 5;
var kJobSeekerAvatar = 6;
var kGroupImage = 7;
var kGroupAvatar = 8;
var kGroupBanner = 9;
var kProjectHomeThumbnail = 10;
var kJobSeekerMiniAvatar = 11;

var k_activity_view = 1;
var k_activity_likey = 2;
var k_activity_comment = 3;
var k_activity_file_featured = 4;
var k_activity_recent = 5;
var k_activity_shout = 6;
var k_activity_follow = 7;
var k_activity_create_group = 8;
var k_activity_join_group = 9;
var k_activity_job_seeker_featured = 10;
var k_activity_likey_undo = 11;
var k_activity_job_seeker_coroflot_join = 12;
var k_activity_facebook_app_add = 13;
var k_activity_facebook_app_remove = 14;
var k_job_alert = 15;
var k_publish_project = 16;

var k_root_path = 'http://www.coroflot.com/';

var coroflot = function () {
    var isIE6;
    var ieVersion;
    function browserTest() {
        //
        // Some browser and OS testing. 
        // 
        // Classes written to the body for good browsers, as there doesn't seem to be a performance hit doing that
        // IE seems to have an incredible performance hit doing that, so use conditional comments for it.
        //
        if (navigator.appVersion.indexOf("Mac") != -1) {
            isMac = true;
            $('body').addClass("isMac");
        }
        function searchVersion(browser) {
            var dataString = navigator.userAgent;
            var index = dataString.indexOf(browser);
            if (index == -1) return;
            var bVersion = parseFloat(dataString.substring(index + browser.length + 1));
            if (browser = "Firefox") {
                return bVersion.toString();
            } else {
                return bVersion.toString().split(".")[0];
            }
        }
        // Webkit
        if ($.browser.webkit) {
            $('body').addClass("isWebkit");
        }
        // Mozilla versioning
        if ($.browser.mozilla) {
            $('body').addClass("isMozilla");
            version = searchVersion("Firefox") || "";
            version = version.replace(".", "-");
            $('body').addClass("isMozilla" + version);
        }
        // IE versioning
        isIE = jQuery.browser.msie;
        if (isIE) {
            version = searchVersion("MSIE") || "";
            isIE6 = (version == 6) ? true : false;
            ieVersion = version;
            if (isIE6) {
                ie6Helpers();
            }
        }
    }
    function defaultValues() {

        $("input[placeholder], textarea[placeholder]").each(function () {
            if ($(this).attr("value") == "") {

                var initVal = $(this).attr("placeholder");

                $(this).val(initVal).removeAttr("placeholder").addClass("placeholder");

                //
                $(this).focus(function () {
                    if ($(this).val() == initVal) {
                        $(this).val("").removeClass("placeholder");
                    }
                });
                $(this).blur(function () {
                    if ($(this).val() == "") {
                        $(this).val(initVal).addClass("placeholder");
                    }
                });
            }
        });

        $('form.reply textarea').each(function () {
            var initVal = $(this).val();
            //
            $(this).focus(function () {
                $(this).val("");
            });
            $(this).blur(function () {
                if ($(this).val() == "") {
                    $(this).val(initVal);
                }
            });
        });
    }
    function ie6Helpers() {
        //
        // Gah!
        //
    }
    var filters = function () {
        var verticalFilters = function () {
            var currentOpen = $("nav.filters-vert li.current ul");
            currentOpen.hide().show();
            //
            $(".filters-vert a[href=#]").live("click", function (event) { event.preventDefault(); });
            //
            $(".filters-vert > ul > li > a").live("click", function (event) {
                if (!$(this).parent().hasClass("current")) {
                    currentOpen.slideUp(250).parent().removeClass("current");
                    currentOpen = $(this).next();
                    currentOpen.slideDown(250).parent().addClass("current");
                } else {
                    $(this).next().slideUp(250).parent().removeClass("current");
                }
            });
        } ();
    };
    var lightboxes = function () {
        var $lbBG = "";
        var $lb = "";
        var lightBoxMaskHTML = '<div id="lb_m" style="display: none;"> </div>';
        var productImages = new Array();
        var productImageIndex = 0
        //
        function openLightbox(content, project, topPos, imgIndex) {
            showLightboxBG(project);
            $lbBG.addClass("loading");
            //
            if (!project) {
                if (content != "#") {

                    $lbBG.after('<iframe src="' + content + '" style="display: none;" id="lb_c" scrolling="no" frameborder="0"></iframe>');
                    $lb = $("#lb_c");

                    function delayed() {

                        if ($lb.is(":visible")) {
                            resizeLightbox();

                        } else {
                            $lbBG.removeClass("loading");
                            $lb
                                .css("top", "100px")
                                .fadeIn(300, function () {
                                    // resizing at the end, in case firefox didn't get a height of the iframe earlier
                                    resizeLightbox();
                                });
                            // resize it so it fades in nice (this triggers before the afterfinish one)
                            resizeLightbox();
                        };
                        $lb.contents().find(".closeLB a, a.cancel, #done").click(function (event) {
                            // bind the close lightbox button
                            closeLightbox();
                            event.preventDefault();
                        });
                    }
                    // on iframe load, do some stuff
                    $lb.attr("src", content).load(function () {
                        setTimeout(delayed, 10);
                    });

                }
            } else {
                $.scrollTo("#coroflot", 100);
                //$("html").css({ overflow: "hidden "});                
                $lbBG.after('<div style="display: none;" id="lb_c" class="wh"></div>');
                $lb = $("#lb_c");
                if (productImages.length == 0) {
                    productImages = $(".img");
                }
                var imgsTotal = productImages.length;
                productImageIndex = imgIndex;
                var designer = $("#body header h1").text();
                var product = $("#body .col260 h2").text();
                var title = productImages.eq(productImageIndex).find("img").attr("alt");

                var paginatorString = "";
                if (imgsTotal > 1) {
                    paginatorString = (imgsTotal == imgIndex) ? paginatorString + '<a href="#" class="next" style="display: none;">Next</a>' : paginatorString + '<a href="#" class="next">Next</a>';
                    paginatorString = (imgIndex == 0) ? paginatorString + '<a href="#" class="prev" style="display: none;">Previous</a>' : paginatorString + '<a href="#" class="prev">Previous</a>';
                }
                var img = new Image();
                img.onload = function () {
                    var imgWidth = (img.width > $lbBG.width() - 100) ? $lbBG.width() - 120 : img.width;
                    $lbBG.removeClass("loading");
                    //$lb.append('<div style="width: '+imgWidth+'px; margin-left: '+imgWidth/-2+'px"><p class="title"><strong>'+title+'</strong> by '+designer+'</p><p class="product">Part of <em>'+product+'</em></p><img src="'+content+'" style="width: '+imgWidth+'px;" /></div>'+paginatorString+'<p class="closeLB"><a href="#">Close</a></p>').fadeIn(300);

                    $lb.append('<div style="width: ' + imgWidth + 'px;"><p class="title"><strong>' + title + '</strong> by ' + designer + '</p><p class="product">Part of <em>' + product + '</em></p><img src="' + content + '" style="width: ' + imgWidth + 'px;" /></div>' + paginatorString + '<p class="closeLB"><a href="#">Close</a></p>').fadeIn(300);
                    $("#coroflot").hide();
                }
                img.src = content;
            }
        }
        var resizeLightbox = function () {
            var newHeight = $lb.contents().find("form").height();
            var newWidth = $lb.contents().find("form").width();
            var topVal = ($(window).height() - newHeight) / 2;
            $lb.css({
                height: newHeight,
                width: newWidth,
                marginLeft: newWidth / -2,
                top: topVal
            });
        }
        var closeLightbox = function () {
            $("#coroflot").show();
            hideLightboxBG();
            $lb.fadeOut(300, function () {
                $lb.remove();
                $lb = "";
            });
        }
		$("#lb_m").live("click", function() {
			closeLightbox();
            $("#lb_c").remove();
         
		});
        function showLightboxBG(project) {
            $(lightBoxMaskHTML).appendTo("body");
            $lbBG = $("#lb_m");
            if (project) {
                $lbBG.addClass("wh")
            }
            if (isIE) {
                $(window).scrollTop(0);
                $lbBG.show();
            } else {
                $lbBG.fadeIn(300);
            }
        }
        function hideLightboxBG() {
            if (isIE) {
                $lbBG.remove();
            } else {
                $lbBG.fadeOut(300, function () {
                    $lbBG.remove();
                });
            }
        }
        function loadNewImg() {
            $lbBG.addClass("loading");
            $("#lb_c div").fadeOut(250, function () {
                var img = new Image();
                img.onload = function () {
                    var imgWidth = (img.width > $lbBG.width() - 120) ? $lbBG.width() - 120 : img.width;
                    $lbBG.removeClass("loading");
                    $("#lb_c div p.title strong").text(productImages.eq(productImageIndex).find("img").attr("alt"));
                    $("#lb_c div img").attr("src", productImages.eq(productImageIndex).find("a").attr("href")).attr("style", "width:" + imgWidth + "px;");
                    $("#lb_c div").css({
                        width: imgWidth + "px"
                        //marginLeft: imgWidth/-2+'px'
                    }).fadeIn(250);
                }
                img.src = productImages.eq(productImageIndex).find("a").attr("href");
            });
        }
        function nextImg() {
            if (productImageIndex < productImages.length) {
                loadNewImg();
                productImageIndex++;
                updateNextPrev();
            }
        }
        function prevImg() {
            if (productImageIndex > 0) {
                loadNewImg();
                productImageIndex--;
                updateNextPrev();
            }
        }
        function updateNextPrev() {
            if (productImageIndex + 1 >= productImages.length) {
                $("#lb_c .next").hide();
            } else {
                $("#lb_c .next").show();
            }
            if (productImageIndex == 0) {
                $("#lb_c .prev").hide();
            } else {
                $("#lb_c .prev").show();
            }
        }
        //
        $("#lb_c .closeLB a, #lb_c a.cancel").live("click", function (event) {
            event.preventDefault();
            closeLightbox();
        });

        $(window).keyup(function (event) {
            if (event.keyCode == 27 && $lbBG != "") {
                closeLightbox();
            }
        });

        //
        $("a[rel=lightbox]").live("click", function (event) {
            event.preventDefault();
            var href = $(this).attr("href");
            openLightbox(href, false, false, false);
        });
        var badIE = ($.browser.msie && $.browser.version.substr(0, 1) < 7) ? true : false;
        /*$(".portfolio_project .img a").click(function (event) {
            event.preventDefault();
            if (!badIE) {
                var href = $(this).attr("href");
                openLightbox(href, true, $(this).offset().top, $(".portfolio_project .img a").index($(this)));
            }
        });*/
        //

        $("#lb_c .next").live("click", function (event) {
            event.preventDefault();
            nextImg();
        });

        $("#lb_c .prev").live("click", function (event) {
            event.preventDefault();
            prevImg();
        });

        function keyPresses() {
            $(document).keydown(function (e) {
                if ($("#lb_c").is(":visible")) {
                    switch (e.keyCode) {
                        case 37:
                            // left arrow
                            $("#lb_c .prev").addClass("active");
                            break;
                        case 39:
                            // right arrow
                            $("#lb_c .next").addClass("active");
                            break;
                    }
                }
            });
            $(document).keyup(function (e) {
                if ($("#lb_c").is(":visible")) {
                    switch (e.keyCode) {
                        case 37:
                            // move left
                            $("#lb_c .prev").removeClass("active");
                            if ($("#lb_c .prev").is(":visible")) {
                                prevImg();
                            }
                            break;
                        case 39:
                            // move right
                            $("#lb_c .next").removeClass("active");
                            if ($("#lb_c .next").is(":visible")) {
                                nextImg()
                            }
                            break;
                    }
                }
            });
        }
        if ($(".portfolio_project .img a").length > 0) {
            keyPresses();
        }

        return {
            closeLightbox: closeLightbox,
            resizeLightbox: resizeLightbox
        }
    } ();
    function dropdowns() {

        var open = false;

        function openDropdown(el) {
            $(el).parent().addClass("dd-open").find("ul").removeClass("hide");
            open = true;
        }

        function closeDropdown() {
            $(".dd-open").removeClass("dd-open").find("ul").addClass("hide");
            open = false;
        }

        function bodyClick(event) {
            if (open) {
                if ($(event.target).is('.dd a')) { return; }
                if ($(event.target).is('.dd ul li a')) { return; }
                event.preventDefault();
                closeDropdown();
            }
        }

        $("body").click(function (event) {
            bodyClick(event);
        });
        /*
        $(".dd > a").click(function(event){
        event.preventDefault();
        if(!open) {
        closeDropdown();
        openDropdown(this);
        } else {
        closeDropdown();
        }
        });
        */
        $("nav.secondary").hover(function() {
										
		}, function() {
			closeDropdown();
		});
		
		$(".dd > a").hover(function () {
            closeDropdown();
            openDropdown(this);
        }, function () {
			//closeDropdown();
        }
        );
        $(".dd ul").hover(function () {

        }, function () {
            closeDropdown();
        }
        );

        $(window).keyup(function (event) {
            if (event.keyCode == 27) {
                closeDropdown();
            }
        });
    };
    /*function smoothScrolling(href) {
        $("a[href^=#]").not("a[href=#csc]").click(function (event) {
            var href = $(this).attr("href");
            if (href.length > 1) {
                event.preventDefault();
                $.scrollTo(href, 500);
            }
        });
    }*/
    /*function projectTools() {
        if ($(".project-tools").length > 0) {

            var $pt = $(".project-tools");

            $pt.insertAfter("#coroflot");

            var initPosition = $(window).height();
            var upperLimit = $(".cols").offset().top + $(".col260").height() + 80;
            //var lowerLimit = $(".cols").offset().top + $(".cols").height() + $("aside#comments").outerHeight() + $("aside#favorites").outerHeight() + 20;
			var lowerLimit = lowerLimit = $("ul.listing_porfolio").offset().top - 30;
            var scrollTopNum = $(window).scrollTop();

            initPosition = (initPosition > upperLimit) ? initPosition : upperLimit;

            $(".col719 .img img").load(function () {
                //lowerLimit = $(".cols").offset().top + $(".cols").height() + $("aside#comments").outerHeight() + $("aside#favorites").outerHeight() - 30;
				lowerLimit = $("ul.listing_porfolio").offset().top - 30;
            });

            $pt.show().css({ position: "absolute", top: initPosition + "px" });


            $(window).scroll(function (event) {
                scrollTopNum = $(window).scrollTop();

                var lower = lowerLimit - $(window).height() + 40;
                var upper = upperLimit - $(window).height() + 40;

                if ($(window).height() > upperLimit) {
                    if (scrollTopNum > 40 && scrollTopNum < lower) {
                        $pt.css({ position: "fixed", top: "auto", bottom: "20px" });
                    } else if (scrollTopNum > lower) {
                        $pt.css({ position: "absolute", top: lowerLimit + "px" });
                    } else {
                        $pt.css({ position: "absolute", top: initPosition + "px", bottom: "auto" });
                    }
                } else {
                    if (scrollTopNum > upper && scrollTopNum < lower) {
                        $pt.css({ position: "fixed", top: "auto", bottom: "20px" });
                    } else if (scrollTopNum > lower) {
                        $pt.css({ position: "absolute", top: lowerLimit + "px" });
                    } else {
                        $pt.css({ position: "absolute", top: initPosition + "px", bottom: "auto" });
                    }
                }

            });

            function setInitPos() {
                initPosition = ($(window).height() > upperLimit) ? $(window).height() : upperLimit;
            }

            $(window).resize(function () {
                setInitPos();
            });

        }
    }*/
    function passwordCheckLength() {
        $(".check_length").each(function () {
            var $this = $(this);
            $this.after('<span class="tooShort" style="display: none;">Too short</span>');
            var $tooShort = $this.next();
            //
            $this.keyup(function () {
                if ($this.val().length < 10) {
                    $tooShort.show();
                } else {
                    $tooShort.hide();
                }
            });
        });
    }
    function csc() {
        // card security number, on post a job payment
        if ($("#csc").length > 0) {
            var initScrollTop = 0;
            $("a[href=#csc]").click(function (event) {
                event.stopImmediatePropagation();
                event.preventDefault();
                $("#csc").slideToggle();
            });
        }
    }
    function faq() {
        if ($("#coroflot.faq").length > 0) {

            $("#coroflot.faq section").each(function () {
                var $section = $(this);
                var $expand = $section.find(".hideShow a.expand");
                var $collapse = $section.find(".hideShow a.collapse");
                $collapse.parent().addClass("disable");
                //
                $expand.click(function () {
                    if (!$expand.parent().hasClass("disable")) {
                        $section.find("div:hidden").slideDown(200);
                        $section.find("h3").addClass("open");
                        $expand.parent().addClass("disable");
                        $collapse.parent().removeClass("disable");
                    }
                });
                $collapse.click(function () {
                    if (!$collapse.parent().hasClass("disable")) {
                        $section.find("div:visible").slideUp(200);
                        $section.find("h3").removeClass("open");
                        $collapse.parent().addClass("disable");
                        $expand.parent().removeClass("disable");
                    }
                });
                $section.find("h3").click(function () {
                    $(this).toggleClass("open").next().slideToggle(200);
                    $expand.parent().removeClass("disable");
                    $collapse.parent().removeClass("disable");
                    if ($section.find("h3.open").length == 0) {
                        $collapse.parent().addClass("disable");
                    }
                    if ($section.find("h3.open").length == $section.find("h3").length) {
                        $expand.parent().addClass("disable");
                    }
                });
            });
        }
    }
    function portfolioViews() {
        if ($("#graph_data").length > 0) {
            var hits = [];
            var maxValue = 0;

            $("#graph_data thead th").each(function (index, el) {
                var theDate = $.datepicker.parseDate("d M", $(el).text());
                printf(theDate);
                var timeStamp = Date.parse(theDate);
                var hitsValue = $("#graph_data tbody td").eq(index).find("span:first").text() * 1;
                //var hitsValue = $("#graph_data tbody td span:first-child").text() * 1;
                maxValue = (hitsValue > maxValue) ? hitsValue : maxValue;
                hits.push([timeStamp, hitsValue]);
            });

            var plot = $.plot($("#graph"),
                   [{ data: hits, color: "#ef482b", shadowSize: 0}], {
                       series: {
                           lines: { show: true, lineWidth: 1.5 },
                           points: { show: true, fill: true, fillColor: "#ef482b", radius: 3 }
                       },
                       grid: { hoverable: true, color: "#d9d9d9", borderWidth: 1 },
                       yaxis: { min: 0, max: maxValue + 2, show: false },
                       xaxis: { mode: "time", color: "#a7a7a7", tickColor: "#f0f0f0", ticks: 2 }
                   });

            $("#graph_data").css({
                position: "absolute",
                left: "-9999em",
                top: "-9999em"
            });

            function showTooltip(x, y, contents) {
                $('<div id="graph_tooltip">' + contents + '</div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y + 10,
                    left: x - 40
                }).appendTo("body").fadeIn(0);
            }

            var previousPoint = null;
            $("#graph").bind("plothover", function (event, pos, item) {
                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#graph_tooltip").remove();
                        var tt_contents = "<strong>" + $("#graph_data thead th").eq(item.dataIndex).html() + "</strong> <br />" + $("#graph_data tbody td").eq(item.dataIndex).html();

                        showTooltip(item.pageX, item.pageY, tt_contents);
                    }
                }
                else {
                    $("#graph_tooltip").remove();
                    previousPoint = null;
                }
            });
        }
    }
    function listingClicks() {
        //
        // Some blocks want to be clickable and have hover states, yet aren't themselves links - they just contain a link
        // eg. listings
        // html 5 links as blocks can't be used, as some of these blocks will contain more than one link
        //
        //var applyTo = $("ul.listing_favorites li, ul.listing_edit_portfolio_projects li");
        var applyTo = $("ul.listing_favorites li");
        //
        applyTo.each(function () {
            // find the first link, its assumed that that is the prime link
            var href = $(this).find("a:first").attr("href");
            var hover = false;
            var $this = $(this);
            //
            // 1. on hover, add a class, change the pointer, and decorate the link
            // 2. on click, go to to the prime link location
            // 3. .section links inside of these blocks still need to be active
            //
            $this.hover(function () {
                //$this.addClass("hover").css("cursor","pointer").find("a:first").css("text-decoration","underline");
                $this.addClass("hover");
                hover = true;
            }, function () {
                //$this.removeClass("hover").find("a:first").css("text-decoration","none");
                $this.removeClass("hover");
                hover = false;
            }
            ).click(function (event) {
                event.preventDefault();
                if (href != "#" && href != undefined && href.length > 1) {
                    window.location = href;
                }
            }).find("a").click(function (event) {
                event.stopPropagation();
            });
        });
    }
    function edit_portfolio_projects() {
         //MPG --- added options to pass to sortable
        /*var options = {
            //connectWith: '.listing_edit_portfolio_projects', 
            cursor: 'move',
            handle: '.move',
			revert: true,
            scroll: true,
            update: function (event, ui) {
                var sort_order = $(this).sortable('toArray').toString();
                var visible_projects_were_sorted = (this.id == "sortable-1");
                $.post('/individual/projects_update_order', { "new_sort_order": sort_order, "target_visible_projects" : visible_projects_were_sorted }, function (data) { });
            }
        }; */
		 var options = {
            //connectWith: '.listing_edit_portfolio_projects', 
            cursor: 'move',
            handle: '.move',
			revert: true,
            scroll: true,
            update: function (event, ui) {
				var sort_order = $(this).sortable('toArray').toString();
				var project_id = $("#project_id").val(); //this is in a hidden input in a form on the same page
				$.post('/individual/project_files_update_order', { "project_id": project_id, "new_sort_order": sort_order }, function (data) { });
			},
        }; 


        if ($("#coroflot.account_editPortfolio").length > 0) {
            // MPG --- added offset to start event when firefox is detected  
            if ($.browser.mozilla) {

                // MPG --- added conditional function call to correct the options sent to firefox 
                /*$("ul.listing_edit_portfolio_projects").sortable({
                   
					revert: true,
					start: function (event, ui) {
                        ui.item.css('margin-top', $(window).scrollTop())
                    },
                    beforeStop: function (event, ui) {
                        ui.item.css('margin-top', 0);
                    },
					//beforeStop: function (event, ui) {
						//printf("let go");
						//printf(ui);
						//ui.item.animate({
							//left: ui.placeholder.position.left,
							//top: ui.placeholder.position.top
						//}, 500);
					//},
                    //connectWith: '.listing_edit_portfolio_projects', 
                    update: function (event, ui) {
                        var sort_order = $(this).sortable('toArray').toString();
                        var visible_projects_were_sorted = (this.id == "sortable-1");
                        $.post('/individual/projects_update_order', { "new_sort_order": sort_order, "target_visible_projects": visible_projects_were_sorted }, function (data) { });
                    },
                    cursor: 'move',
                    handle: '.move',
                    scroll: true
                });*/
                //$(".listing_edit_portfolio_projects").disableSelection();

                $("div.project_edit ul.listing_edit_portfolio_projects").sortable({

                    start: function (event, ui) {
                        ui.item.css('margin-top', $(window).scrollTop())
                    },
                    beforeStop: function (event, ui) {
                        ui.item.css('margin-top', 0)
                    },
					revert: true,
                    //connectWith: '.listing_edit_portfolio_projects', 
                    cursor: 'move',
                    update: function (event, ui) {
                        var sort_order = $(this).sortable('toArray').toString();
                        var project_id = $("#project_id").val(); //this is in a hidden input in a form on the same page
                        $.post('/individual/project_files_update_order', { "project_id": project_id, "new_sort_order": sort_order }, function (data) { });
                    },
                    handle: '.move',
                    scroll: true
                });
                $("div.project_edit ul.listing_edit_portfolio_projects").disableSelection();


            } else {
				$("div.project_edit ul.listing_edit_portfolio_projects").sortable(options);
				$("div.project_edit ul.listing_edit_portfolio_projects").disableSelection();
               /* $(".listing_edit_portfolio_projects").sortable(options);
                $(".listing_edit_portfolio_projects").disableSelection();*/
            }

            /*if ($.browser.mozilla) {
                $(".listing_edit_portfolio_projects input[type=text]").click(function (event) {
                    $(this).addClass("focus").focus().next().show();
                });
                $(".listing_edit_portfolio_projects .cancel").click(function (event) {
					$(this).parent().prev().removeClass("focus");
                    $(".listing_edit_portfolio_projects input[type=text]").removeClass("focus").blur().next().hide();
					
                });
				$(".listing_edit_portfolio_projects input[type=text]").live("blur", function() {
					$(this).removeClass("focus");																		 
				});
            }*/

            /*if (ieVersion < 8) {
                $(".listing_edit_portfolio_projects input[type=text]").focus(function (event) {
                    $(this).addClass("focus").next().show();
                });
                $(".listing_edit_portfolio_projects input[type=text]").blur(function (event) {
                    $(this).removeClass("focus").next().hide();
                });
            }*/


            $(".project_images .showMore a").click(function (event) {
                event.preventDefault();
                alert("click!");
            });

            $(".project_videos .showMore a").click(function (event) {
                event.preventDefault();
                alert("click!");
            });
        }



        $(".sortable").sortable({ 
				cursor: 'move', 
				handle: '.reorder', 
				revert: true, 
				scroll: true, 
				update: function (event, ui) {
					var sort_order = $(this).sortable('toArray').toString();
					$.post('', { "new_sort_order": sort_order }, function (data) { });
            	} 
		});
        $(".sortable").disableSelection();
    }
    function selectVideo() {
        $(".listing_vimeo_videos a").click(function (event) {
            event.preventDefault();
            if (!$(this).parent().hasClass("selected")) {
                $("#video_selection").val($(this).attr("href"));
            } else {
                $("#video_selection").val("");
            }
            $(this).parent().toggleClass("selected");
        });
    }

    function homepageFeatures() {
        var reallyBadIE = ($.browser.msie && $.browser.version.substr(0, 1) < 8) ? true : false;
        if ($("#coroflot.home").length > 0 && !reallyBadIE) {

            var imageList = $("#features .features");
            var images = $("#features .features li img");
            var max = imageList.children().length;
            var middleItem = Math.round(max / 2) - 1;
            var imageWidths = [];
            var currentPos = 0;
            var next = $("#features .next a");
            var prev = $("#features .prev a");
            var current = middleItem;
            var animating = false;
            var totalWidth = 0;
            var maxMinusValue = 0;
            var minMinusValue = 0;
            //
            function fixInitPos() {
                var runningTotal = 0;
                var leftGap = ($(window).width() - 980) / 2;
                for (var i = 0; i < current; i++) {
                    runningTotal += imageWidths[i];
                }
                currentPos = (runningTotal - leftGap) * -1;
                imageList.css({ left: currentPos + "px" });

                // calculate when we need to stop showing the next button
                maxMinusValue = 0;
                var targetWidth = 980 + (($(window).width() - 980) / 2);
                var rT = 0;
                imageWidths.reverse();
                for (var i = 0; i < max; i++) {
                    rT += imageWidths[i];
                    maxMinusValue = (rT > targetWidth) ? maxMinusValue : i + 2;
                }
                imageWidths.reverse();

                // calculate when we need to stop showing the prev button
                minMinusValue = 0;
                targetWidth = targetWidth - 980;
                rT = 0;
                for (var i = 0; i < max; i++) {
                    rT += imageWidths[i];
                    minMinusValue = (rT > targetWidth) ? minMinusValue : i + 1;
                }

                updatePaginator()
            }
            //
            function updatePaginator() {
                prev.parent().show();
                next.parent().show();
                if (current <= minMinusValue) {
                    prev.parent().hide();
                }
                //var maxMinusValue = ((imageWidths[max-1] + imageWidths[max-2]) < (980 + ($(window).width() - 980) / 2)) ? 3 : 2;
                if (current > max - maxMinusValue) {
                    next.parent().hide();
                }
            }
            //
            function moveNext() {
                if (!animating && next.parent().is(":visible")) {
                    animating = true;
                    current++;
                    currentPos = currentPos - imageWidths[current - 1];
                    imageList.animate({ left: currentPos + "px" }, 300, function () {
                        animating = false;
                    });
                    updatePaginator();
                    fadeLogoOut();
                }
            }
            function movePrev() {
                if (!animating && prev.parent().is(":visible")) {
                    animating = true;
                    current--;
                    currentPos = currentPos + imageWidths[current];
                    imageList.animate({ left: currentPos + "px" }, 300, function () {
                        animating = false;
                    });
                    updatePaginator();
                    fadeLogoOut();
                }
            }
            //
            function fadeLogoOut() {
                var logo = $("#features .logo");
                if (logo.is(":visible")) {
                    logo.fadeOut(300);
                }
            }
            //
            function keyPresses() {
                $(document).keydown(function (e) {
                    switch (e.keyCode) {
                        case 37:
                            // left arrow
                            prev.addClass("active");
                            break;
                        case 39:
                            // right arrow
                            next.addClass("active");
                            break;
                    }
                });
                $(document).keyup(function (e) {
                    switch (e.keyCode) {
                        case 37:
                            // move left
                            prev.removeClass("active");
                            movePrev();
                            break;
                        case 39:
                            // move right
                            next.removeClass("active");
                            moveNext();
                            break;
                    }
                });
            }

            if (max > 1) {
                next.click(function (event) {
                    event.preventDefault();
                    moveNext();
                });
                prev.click(function (event) {
                    event.preventDefault();
                    movePrev();
                });
                /*
                imageList.find("img").each(function(index){
                var newImage = new Image();
                var $this = $(this);
                //
                newImage.onload = function() {
                $this.fadeIn(300, function(){ $this.css({ display: "block" }) }); 
                }
                newImage.src = $(this).attr("src");
                });
                */
                images.each(function () {
                    imageWidths.push($(this).attr("width") * 1);
                    totalWidth += $(this).attr("width") * 1;
                });

                imageList.css({ width: totalWidth + "px" });

                if ($(window).width() > totalWidth) {
                    next.parent().hide();
                    prev.parent().hide();
                } else {
                    next.parent().show();
                    prev.parent().show();
                }

                var badIE = ($.browser.msie && $.browser.version.substr(0, 1) < 8) ? true : false;
                if (badIE) {
                    images.hover(function () {
                        fadeLogoOut()
                    });
                }

                $(window).resize(function () {
                    fixInitPos();
                });

                keyPresses();
                fixInitPos();
            }

            $("#head h1 a").click(function (event) {
                event.preventDefault();
                var logo = $("#features .logo");
                if (logo.is(":hidden")) {
                    logo.fadeIn(300);
                }
            });

        }
    }
    /*function hideSponsor() {
        if ($("#sponsor").length > 0) {

            var hideSponsor = readCookie("coroflotSponsor");
            if (!hideSponsor) {
                $("#sponsor").slideDown(300);
            }

            $("#sponsor .close a").click(function (event) {
                event.preventDefault();
                eraseCookie("coroflotSponsor");
                $("#sponsor").slideUp(300);
                createCookie("coroflotSponsor", true, 1);
            });


        }
    }*/
    /*function specialties() {
        if ($(".post_a_job .specialties").length > 0) {

            var label = $(".specialties legend em");
            var count = $(".specialties input[type=checkbox]:checked").length;
            var attemptCount = 0;

            $(".specialties input[type=checkbox]").click(function (event) {
                if ($(this).is(":checked")) {
                    if (count < 6) {
                        count++;
                    } else {
                        event.preventDefault();
                        wrongAttempt();
                    }
                } else {
                    count--;
                    attemptCount = 0;
                    label.removeClass("highlighted");
                }
            });

            function wrongAttempt() {
                attemptCount++;
                if (attemptCount > 1 && attemptCount < 5) {
                    label.addClass("highlighted").fadeOut(300, function () { $(this).addClass("highlighted") }).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300, function () { $(this).removeClass("highlighted") }).fadeIn(300);
                }
                if (attemptCount > 4) {
                    alert("You can select up to 6 specialties.");
                }
            }
        }
    }*/
    /*function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    function eraseCookie(name) {
        createCookie(name, "", -1);
    }*/

    /* form validation edit employer porfile MPG
    function validateEditEmployerProfileForm() {
    var jVal = {
    'company_name' : function() {

    $('body').append('<div id="company_nameInfo" class="info"></div>');

    var company_nameInfo = $('#company_nameInfo');
    var ele = $('#company_name');
    var pos = ele.offset();

    company_nameInfo.css({
    top: pos.top-8,
    left: pos.left+ele.width()+25
    });

    ele.keyup(function(){
    if(ele.val().length < 1) {
    jVal.errors = true;
    company_nameInfo.removeClass('correct').addClass('error').html(' at least 1 character').show();
    ele.removeClass('normal').addClass('wrong');
    } else {
    company_nameInfo.removeClass('error').addClass('correct').html('').show();
    ele.removeClass('wrong').addClass('normal');
    }
    });
			
    },
		
    'company_description' : function() {

    $('body').append('<div id="company_descriptionInfo" class="info"></div>');

    var company_descriptionInfo = $('#company_descriptionInfo');
    var ele = $('#company_description');
    var pos = ele.offset();

    company_descriptionInfo.css({
    top: pos.top,
    left: pos.left+ele.width()+25
    });

    ele.keyup(function(){
    if(ele.val().length < 10) {
    jVal.errors = true;
    company_descriptionInfo.removeClass('correct').addClass('error').html('&larr; this needs to be more than 10 charcters').show();
    ele.removeClass('normal').addClass('wrong').css({'font-weight': 'normal'});
    } else {
    company_descriptionInfo.removeClass('error').addClass('correct').html('&radic;').show();
    ele.removeClass('wrong').addClass('normal');
    }
    });
			
			
			
    },
		
    'company_address_line_1' : function() {

    $('body').append('<div id="company_address_line_1Info" class="info"></div>');

    var company_address_line_1Info = $('#company_address_line_1Info');
    var ele = $('#address_line_1');
    var pos = ele.offset();

    company_address_line_1Info.css({
    top: pos.top,
    left: pos.left+ele.width()+25
    });
			
    ele.keyup(function(){
    if(ele.val().length < 1) {
    jVal.errors = true;
    company_address_line_1Info.removeClass('correct').addClass('error').html('&larr; at least 1 character').show();
    ele.removeClass('normal').addClass('wrong');
    } else {
    company_address_line_1Info.removeClass('error').addClass('correct').html('&radic;').show();
    ele.removeClass('wrong').addClass('normal');
    }
    });
			
			
    },
		
    'company_city' : function() {

    $('body').append('<div id="company_cityInfo" class="info"></div>');

    var company_cityInfo = $('#company_cityInfo');
    var ele = $('#city');
    var pos = ele.offset();

    company_cityInfo.css({
    top: pos.top,
    left: pos.left+ele.width()+25
    });

    ele.keyup(function(){
    if(ele.val().length < 1) {
    jVal.errors = true;
    company_cityInfo.removeClass('correct').addClass('error').html('&larr; at least 1 character').show();
    ele.removeClass('normal').addClass('wrong');
    } else {
    company_cityInfo.removeClass('error').addClass('correct').html('&radic;').show();
    ele.removeClass('wrong').addClass('normal');
    }
    });
			
			
    },
		
    'company_post_code' : function() {

    $('body').append('<div id="company_post_codeInfo" class="info"></div>');

    var company_post_codeInfo = $('#company_post_codeInfo');
    var ele = $('#post_code');
    var pos = ele.offset();

    company_post_codeInfo.css({
    top: pos.top,
    left: pos.left+ele.width()+25
    });

    ele.keyup(function(){
    if(ele.val().length < 3) {
    jVal.errors = true;
    company_post_codeInfo.removeClass('correct').addClass('error').html('&larr; at least 3 characters').show();
    ele.removeClass('normal').addClass('wrong');
    } else {
    company_post_codeInfo.removeClass('error').addClass('correct').html('&radic;').show();
    ele.removeClass('wrong').addClass('normal');
    }
    });
			
			
    },

    'sendIt' : function (){
    if(!jVal.errors) {
    $('#edit_Company_Profile').submit();
    }
    }
    };

    // ====================================================== //

    $('#update').click(function (){
    if(!jVal.errors) {
    $('#edit_Company_Profile').submit();
    } else {
		
    var obj = $.browser.webkit ? $('body') : $('html');
    obj.animate({ scrollTop: $('#edit_Company_Profile').offset().top }, 750, function (){
    jVal.errors = false;
    jVal.company_name();
    jVal.company_description();
    jVal.company_address_line_1();
    jVal.company_city();
    jVal.company_post_code();
	
    });
    }
    return false;
    });

    jVal.errors = false;
    jVal.company_name();
    jVal.company_description();
    jVal.company_address_line_1();
    jVal.company_city();
    jVal.company_post_code();
    $('#company_name').change(jVal.company_name);
    $('#company_description').change(jVal.company_description);
    $('#address_line_1').change(jVal.company_address_line_1);
    $('#city').change(jVal.company_city);
    $('#post_code').change(jVal.company_post_code);
    	
    }
    */
	
	
	

    $(document).ready(function () {
        
		
		browserTest();

        if (!isIE6) {
            passwordCheckLength();
            selectVideo();
        }

        if ($("#coroflot").length > 0) {
            filters();
            //lightboxes(); // runs itself
            dropdowns();
            //smoothScrolling();
            //projectTools();
            defaultValues();
            csc();
            faq();
            //portfolioViews();
            listingClicks();
            edit_portfolio_projects();
            //messages();
            homepageFeatures();
            //hideSponsor();
            //specialties();
            //validateEditEmployerProfileForm();
        }
    });
    return {
        lightboxes: lightboxes
    }
} ();
/// easing
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

jQuery.easing.def = "easeInOutExpo";
////

jQuery.autocomplete = function(input, options) {
	// Create a link to self
	var me = this;

	// Create jQuery object for input element
	var $input = $(input).attr("autocomplete", "off");

	// Apply inputClass if necessary
	if (options.inputClass) $input.addClass(options.inputClass);

	// Create results
	var results = document.createElement("div");
	// Create jQuery object for results
	var $results = $(results);
	$results.hide().addClass(options.resultsClass).css("position", "absolute");
	if( options.width > 0 ) $results.css("width", options.width);

	// Add to body element
	$("body").append(results);

	input.autocompleter = me;

	var timeout = null;
	var prev = "";
	var active = -1;
	var cache = {};
	var keyb = false;
	var hasFocus = false;
	var lastKeyPressCode = null;

	// flush cache
	function flushCache(){
		cache = {};
		cache.data = {};
		cache.length = 0;
	};

	// flush cache
	flushCache();

	// if there is a data array supplied
	if( options.data != null ){
		var sFirstChar = "", stMatchSets = {}, row = [];

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( typeof options.url != "string" ) options.cacheLength = 1;

		// loop through the array and create a lookup structure
		for( var i=0; i < options.data.length; i++ ){
			// if row is a string, make an array otherwise just reference the array
			row = ((typeof options.data[i] == "string") ? [options.data[i]] : options.data[i]);

			// if the length is zero, don't add to list
			if( row[0].length > 0 ){
				// get the first character
				sFirstChar = row[0].substring(0, 1).toLowerCase();
				// if no lookup array for this character exists, look it up now
				if( !stMatchSets[sFirstChar] ) stMatchSets[sFirstChar] = [];
				// if the match is a string
				stMatchSets[sFirstChar].push(row);
			}
		}

		// add the data items to the cache
		for( var k in stMatchSets ){
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			addToCache(k, stMatchSets[k]);
		}
	}

	$input
	.keydown(function(e) {
		// track last key pressed
		lastKeyPressCode = e.keyCode;
		switch(e.keyCode) {
			case 38: // up
				e.preventDefault();
				moveSelect(-1);
				break;
			case 40: // down
				e.preventDefault();
				moveSelect(1);
				break;
			case 9:  // tab
			case 13: // return
				if( selectCurrent() ){
					// make sure to blur off the current field
					$input.get(0).blur();
					e.preventDefault();
				}
				break;
			default:
				active = -1;
				if (timeout) clearTimeout(timeout);
				timeout = setTimeout(function(){onChange();}, options.delay);
				break;
		}
	})
	.focus(function(){
		// track whether the field has focus, we shouldn't process any results if the field no longer has focus
		hasFocus = true;
	})
	.blur(function() {
		// track whether the field has focus
		hasFocus = false;
		hideResults();
	});

	hideResultsNow();

	function onChange() {
		// ignore if the following keys are pressed: [del] [shift] [capslock]
		if( lastKeyPressCode == 46 || (lastKeyPressCode > 8 && lastKeyPressCode < 32) ) return $results.hide();
		var v = $input.val();
		if (v == prev) return;
		prev = v;
		if (v.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			requestData(v);
		} else {
			$input.removeClass(options.loadingClass);
			$results.hide();
		}
	};

 	function moveSelect(step) {

		var lis = $("li", results);
		if (!lis) return;

		active += step;

		if (active < 0) {
			active = 0;
		} else if (active >= lis.size()) {
			active = lis.size() - 1;
		}

		lis.removeClass("ac_over");

		$(lis[active]).addClass("ac_over");

		// Weird behaviour in IE
		// if (lis[active] && lis[active].scrollIntoView) {
		// 	lis[active].scrollIntoView(false);
		// }

	};

	function selectCurrent() {
		var li = $("li.ac_over", results)[0];
		if (!li) {
			var $li = $("li", results);
			if (options.selectOnly) {
				if ($li.length == 1) li = $li[0];
			} else if (options.selectFirst) {
				li = $li[0];
			}
		}
		if (li) {
			selectItem(li);
			return true;
		} else {
			return false;
		}
	};

	function selectItem(li) {
		if (!li) {
			li = document.createElement("li");
			li.extra = [];
			li.selectValue = "";
		}
		var v = $.trim(li.selectValue ? li.selectValue : li.innerHTML);
		input.lastSelected = v;
		prev = v;
		$results.html("");
		$input.val(v);
		hideResultsNow();
		if (options.onItemSelect) setTimeout(function() { options.onItemSelect(li) }, 1);
	};

	// selects a portion of the input string
	function createSelection(start, end){
		// get a reference to the input element
		var field = $input.get(0);
		if( field.createTextRange ){
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart("character", start);
			selRange.moveEnd("character", end);
			selRange.select();
		} else if( field.setSelectionRange ){
			field.setSelectionRange(start, end);
		} else {
			if( field.selectionStart ){
				field.selectionStart = start;
				field.selectionEnd = end;
			}
		}
		field.focus();
	};

	// fills in the input box w/the first match (assumed to be the best match)
	function autoFill(sValue){
		// if the last user key pressed was backspace, don't autofill
		if( lastKeyPressCode != 8 ){
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(prev.length));
			// select the portion of the value not typed by the user (so the next character will erase)
			createSelection(prev.length, sValue.length);
		}
	};

	function showResults() {
		// get the position of the input field right now (in case the DOM is shifted)
		var pos = findPos(input);
		// either use the specified width, or autocalculate based on form element
		var iWidth = (options.width > 0) ? options.width : $input.width();
		// reposition
		$results.css({
			width: parseInt(iWidth) + "px",
			top: (pos.y + input.offsetHeight) + "px",
			left: pos.x + "px"
		}).show();
	};

	function hideResults() {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		if (timeout) clearTimeout(timeout);
		$input.removeClass(options.loadingClass);
		if ($results.is(":visible")) {
			$results.hide();
		}
		if (options.mustMatch) {
			var v = $input.val();
			if (v != input.lastSelected) {
				selectItem(null);
			}
		}
	};

	function receiveData(q, data) {
		if (data) {
			$input.removeClass(options.loadingClass);
			results.innerHTML = "";

			// if the field no longer has focus or if there are no matches, do not display the drop down
			if( !hasFocus || data.length == 0 ) return hideResultsNow();

			if ($.browser.msie) {
				// we put a styled iframe behind the calendar so HTML SELECT elements don't show through
				$results.append(document.createElement('iframe'));
			}
			results.appendChild(dataToDom(data));
			// autofill in the complete box w/the first match as long as the user hasn't entered in more data
			if( options.autoFill && ($input.val().toLowerCase() == q.toLowerCase()) ) autoFill(data[0][0]);
			showResults();
		} else {
			hideResultsNow();
		}
	};

	function parseData(data) {
		if (!data) return null;
		var parsed = [];
		var rows = data.split(options.lineSeparator);
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				parsed[parsed.length] = row.split(options.cellSeparator);
			}
		}
		return parsed;
	};

	function dataToDom(data) {
		var ul = document.createElement("ul");
		var num = data.length;

		// limited results to a max number
		if( (options.maxItemsToShow > 0) && (options.maxItemsToShow < num) ) num = options.maxItemsToShow;

		for (var i=0; i < num; i++) {
			var row = data[i];
			if (!row) continue;
			var li = document.createElement("li");
			if (options.formatItem) {
				li.innerHTML = options.formatItem(row, i, num);
				li.selectValue = row[0];
			} else {
				li.innerHTML = row[0];
				li.selectValue = row[0];
			}
			var extra = null;
			if (row.length > 1) {
				extra = [];
				for (var j=1; j < row.length; j++) {
					extra[extra.length] = row[j];
				}
			}
			li.extra = extra;
			ul.appendChild(li);
			$(li).hover(
				function() { $("li", ul).removeClass("ac_over"); $(this).addClass("ac_over"); active = $("li", ul).indexOf($(this).get(0)); },
				function() { $(this).removeClass("ac_over"); }
			).click(function(e) { e.preventDefault(); e.stopPropagation(); selectItem(this) });
		}
		return ul;
	};

	function requestData(q) {
		if (!options.matchCase) q = q.toLowerCase();
		var data = options.cacheLength ? loadFromCache(q) : null;
		// recieve the cached data
		if (data) {
			receiveData(q, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			$.get(makeUrl(q), function(data) {
				data = parseData(data);
				addToCache(q, data);
				receiveData(q, data);
			});
		// if there's been no data found, remove the loading class
		} else {
			$input.removeClass(options.loadingClass);
		}
	};

	function makeUrl(q) {
		var url = options.url + "?q=" + encodeURI(q);
		for (var i in options.extraParams) {
			url += "&" + i + "=" + encodeURI(options.extraParams[i]);
		}
		return url;
	};

	function loadFromCache(q) {
		if (!q) return null;
		if (cache.data[q]) return cache.data[q];
		if (options.matchSubset) {
			for (var i = q.length - 1; i >= options.minChars; i--) {
				var qs = q.substr(0, i);
				var c = cache.data[qs];
				if (c) {
					var csub = [];
					for (var j = 0; j < c.length; j++) {
						var x = c[j];
						var x0 = x[0];
						if (matchSubset(x0, q)) {
							csub[csub.length] = x;
						}
					}
					return csub;
				}
			}
		}
		return null;
	};

	function matchSubset(s, sub) {
		if (!options.matchCase) s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};

	this.flushCache = function() {
		flushCache();
	};

	this.setExtraParams = function(p) {
		options.extraParams = p;
	};

	this.findValue = function(){
		var q = $input.val();

		if (!options.matchCase) q = q.toLowerCase();
		var data = options.cacheLength ? loadFromCache(q) : null;
		if (data) {
			findValueCallback(q, data);
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			$.get(makeUrl(q), function(data) {
				data = parseData(data)
				addToCache(q, data);
				findValueCallback(q, data);
			});
		} else {
			// no matches
			findValueCallback(q, null);
		}
	}

	function findValueCallback(q, data){
		if (data) $input.removeClass(options.loadingClass);

		var num = (data) ? data.length : 0;
		var li = null;

		for (var i=0; i < num; i++) {
			var row = data[i];

			if( row[0].toLowerCase() == q.toLowerCase() ){
				li = document.createElement("li");
				if (options.formatItem) {
					li.innerHTML = options.formatItem(row, i, num);
					li.selectValue = row[0];
				} else {
					li.innerHTML = row[0];
					li.selectValue = row[0];
				}
				var extra = null;
				if( row.length > 1 ){
					extra = [];
					for (var j=1; j < row.length; j++) {
						extra[extra.length] = row[j];
					}
				}
				li.extra = extra;
			}
		}

		if( options.onFindValue ) setTimeout(function() { options.onFindValue(li) }, 1);
	}

	function addToCache(q, data) {
		if (!data || !q || !options.cacheLength) return;
		if (!cache.length || cache.length > options.cacheLength) {
			flushCache();
			cache.length++;
		} else if (!cache[q]) {
			cache.length++;
		}
		cache.data[q] = data;
	};

	function findPos(obj) {
		var curleft = obj.offsetLeft || 0;
		var curtop = obj.offsetTop || 0;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
		return {x:curleft,y:curtop};
	}
}

jQuery.fn.autocomplete = function(url, options, data) {
	// Make sure options exists
	options = options || {};
	// Set url as option
	options.url = url;
	// set some bulk local data
	options.data = ((typeof data == "object") && (data.constructor == Array)) ? data : null;

	// Set default values for required options
	options.inputClass = options.inputClass || "ac_input";
	options.resultsClass = options.resultsClass || "ac_results";
	options.lineSeparator = options.lineSeparator || "\n";
	options.cellSeparator = options.cellSeparator || "|";
	options.minChars = options.minChars || 1;
	options.delay = options.delay || 400;
	options.matchCase = options.matchCase || 0;
	options.matchSubset = options.matchSubset || 1;
	options.matchContains = options.matchContains || 0;
	options.cacheLength = options.cacheLength || 1;
	options.mustMatch = options.mustMatch || 0;
	options.extraParams = options.extraParams || {};
	options.loadingClass = options.loadingClass || "ac_loading";
	options.selectFirst = options.selectFirst || false;
	options.selectOnly = options.selectOnly || false;
	options.maxItemsToShow = options.maxItemsToShow || -1;
	options.autoFill = options.autoFill || true;
	options.width = parseInt(options.width, 10) || 0;

	this.each(function() {
		var input = this;
		new jQuery.autocomplete(input, options);
	});

	// Don't break the chain
	return this;
}

jQuery.fn.autocompleteArray = function(data, options) {
	return this.autocomplete(null, options, data);
}

jQuery.fn.indexOf = function(e){
	for( var i=0; i<this.length; i++ ){
		if( this[i] == e ) return i;
	}
	return -1;
};

function utils_findXY(elem) {

    if (!elem) { return { "x": 0, "y": 0 }; }

    var xy = { "x": elem.offsetLeft, "y": elem.offsetTop }
    var par = utils_findXY(elem.offsetParent);
    for (var key in par) {
        xy[key] += par[key];
    }
    return xy;
}


Date.prototype.monthNames = [
	"January", "February", "March",
	"April", "May", "June",
	"July", "August", "September",
	"October", "November", "December"
];

Date.prototype.dayNames = [
	"Sunday", "Monday", "Tuesday",
	"Wednesday", "Thursday", "Friday",
	"Saturday"
];


Date.prototype.getMonthName = function () {
	return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {
	return this.getMonthName().substr(0, 3);
};

Date.prototype.getDayName = function () {
	return this.dayNames[this.getDay()];
};
Date.prototype.getShortDayName = function () {
	return this.dayNames().substr(0, 3);
};

function hourDiff(date1, date2) {
    return Math.floor((date1.getTime() - date2.getTime()) / 1000 / 60 / 60);
}

function format_job_location(city, state_abbr, state_name, country_code, country_name) {
    var location = '';
    location = city;
    if (country_code == 217) {
        if (city == '') {
            location = state_abbr;
        }
        else {
            location = location + ', ' + state_abbr;
        }
    }
    else {
        if (location == '') {
            location = country_name;
        }
        else {
            location = location + ', ' + country_name;
        }
    }

    return location;
}

function display_jobs_data(data) {
    var currentTime = new Date();
    jQuery.each(data, function (i, val) {

        var _html = new String();
        
        var _job_detail_url = '';
        _job_detail_url = '/jobs/' + val.id + '/' + val.custom_url;
        
        var _job_logo_url = '';
        _job_logo_url = val.logo;
        
        if (window.location.hash != '') {
            _job_detail_url += window.location.hash + '&';
        }
        else {
            _job_detail_url += '#';
        }

        _job_detail_url += 'from=search';
		
		if (val.is_featured) {
			_html += '<li class="featured_job">';
		} else {
			_html += '<li>';
		}
		
        /*_html += '<a href="' + _job_detail_url + '"><strong>' + val.title + '</strong> at <span class="emp">' + val.company_name + '</span> <span class="loc">' + format_job_location(val.city, val.state_name, val.state_name_text, val.country, val.country_name) + '</span> ';*/

		var logo_loc = this.logo != "" && this.logo != undefined ? this.logo : "/images/hold-avatar-company_small_50.gif";
		_html += '<a style="background: url(' + logo_loc + ') no-repeat 20px 23px;" href="' + _job_detail_url + '"><strong>' + val.title + '</strong>  <p><span class="emp">' + val.company_name + '</span>  <span class="loc">' + format_job_location(val.city, val.state_name, val.state_name_text, val.country, val.country_name) + '</span></p>';
		
        if (val.is_featured) {
            _html += '<em class="new">Featured</em>';
        }
        else if (hourDiff(currentTime, (new Date(parseInt(val.date_to_sort_by.substr(6))))) < 24) {
            _html += '<em class="new">New</em>';
        }
        else {
            _html += '<em>' + (new Date(parseInt(val.date_to_sort_by.substr(6)))).getShortMonthName() + ' ' + (new Date(parseInt(val.date_to_sort_by.substr(6)))).getDate() + '</em>';
        }
        _html += '</a></li>';
        
		$("div#jobs_cont").css({
			opacity: 1,
			background: "none",
			height: "auto",
			"margin-top": 0
		});
        
        $(".listing_jobs").append(_html).fadeIn(1000, function () {
            $("p.showMore").css({
                opacity: 1,
                background: "none",
				width: "auto",
                height: "38px",
                "margin-top": "0px"
            }).fadeIn(400, function () {
                $("p.showMore a").fadeIn();
            });

        });

    });
}

function get_portfolio_thumbnails_path(portfolio_ids, portfolio_info_string) {
    
	
	var return_json = '';
    var number_of_images = 0;
    var number_of_pdfs = 0;
    var number_of_videos = 0;

    var portfolio_thumbnails_path;
    portfolio_thumbnails_path = "";
    var thumbnail_file_name, file_name, fetch_local_file;
    var portfolio_ids_array, portfolio_info_array;
    var split_into_columns, nested_portfolio_id;
    var number_to_show_in_batch;
    var same_set, last_set_id, temp_set_id, temp_set_name, temp_user_id, temp_project_url_name, temp_user_url_name;
    var project_url;
    

    try {
        portfolio_ids_array = portfolio_ids.split(",");
        portfolio_info_array = portfolio_info_string.split("|");
        number_to_show_in_batch = portfolio_info_array.length;
        portfolio_count = portfolio_info_array.length + 1;

        if (number_to_show_in_batch > 3) {
            number_to_show_in_batch = 3;
        }

        last_set_id = 0;
        same_set = true;

        try {
            if (number_to_show_in_batch >= 0) {
                for (var i = 0; i < number_to_show_in_batch; i++) {
                    split_into_columns = portfolio_info_array[i].split(",");
                    thumbnail_file_name = split_into_columns[0]; 	        //file name of portfolio
                    fetch_local_file = split_into_columns[1] == '1'; 	        //fetch local file
                    temp_set_id = split_into_columns[3];
                    temp_set_name = split_into_columns[4];
                    temp_project_url_name = split_into_columns[5];
                    temp_user_url_name = split_into_columns[6];
                    temp_user_id = split_into_columns[7];
                    
                    if ((last_set_id > 0) && (same_set)) {
                        if (temp_set_id != last_set_id) {
                            same_set = false
                        }
                    }

                    last_set_id = temp_set_id;

                    var src = get_project_cover_image(thumbnail_file_name, fetch_local_file);
                    project_url = '/' + temp_user_url_name + '/' + temp_project_url_name;
                    portfolio_thumbnails_path = portfolio_thumbnails_path + '<a href="'+ project_url + '"><img src="' + src + '" height="100"></a>';

                }   //for (var i=0;i==number_to_show_in_batch;i++){
            }       //if(number_to_show_in_batch >=0){

            if (same_set) {
                set_id = temp_set_id;
                set_name = temp_set_name;
            }
        }
        catch (e) {
            nested_portfolio_id = 0;
            return { number_of_images: 0, number_of_pdfs: 0, number_of_videos: 0, portfolio_thumbnails_path: '', project_name: '', project_id: 0 };
        }
    }
    catch (e) {
    }
	printf("p_id= " + temp_set_id);
    return { number_of_images: number_of_images, number_of_pdfs: number_of_pdfs, number_of_videos: number_of_videos, portfolio_thumbnails_path: portfolio_thumbnails_path, project_name: temp_set_name, project_id: temp_set_id, project_url: project_url };
}           //function get_portfolio_thumbnails_path(portfolio_ids, portfolio_info_string)

function is_file_video_convertable(file_name) {
    try {
        var kVideo_types = ["mov", "wmv", "avi", "flv", "mpg", "mpeg", "mp4", "qt"];
        var extension = '';
        extension = get_file_extension(file_name);
        return (jQuery.inArray(extension, kVideo_types) > -1);
    }
    catch (e) {
        return false;
    }
}

function has_image_file_extension(file_name) {
    try {
        var result, valid_extension_list, file_extension;
        result = false;
        valid_extension_list = ".jpg.jpeg.png.gif";
        file_extension = Right(file_name, file_name.length - file_name.lastIndexOf("."));
        file_extension = file_extension.toLowerCase();
        result = (valid_extension_list.indexOf(file_extension) > -1);
        return result;
    }
    catch (e) {
        return false;
    }
}

function has_pdf_file_extension(file_name) {
    try {
        var result, valid_extension_list, file_extension;
        result = false;

        valid_extension_list = ".pdf";
        file_extension = Right(file_name, file_name.length - file_name.lastIndexOf("."));
        file_extension = file_extension.toLowerCase();
        result = (valid_extension_list.indexOf(file_extension) > -1);
        return result;
    }
    catch (e) {
        return false;
    }
}


function get_file_extension(file_name) {
    try {
        return file_name.substr((file_name.lastIndexOf('.') + 1)).toLowerCase();
    }
    catch (e) {
        return '';
    }
}

function is_vimeo_file(file_extension) {
    try {
        var vimeo_extension = '';
        vimeo_extension = ".vimeo"
        if ((vimeo_extension.indexOf(file_extension) > -1) && (file_extension != "")) {
            return true;
        }
        return false;
    }
    catch (e) {
        return false;
    }
}

function time_string(seconds) {
    try {
        //if verbose = false, returns
        //something like
        //02:22.08
        //if true, returns
        //2 hours, 22 minutes, and 8 seconds

        var lHrs, lMinutes, lSeconds;

        lSeconds = seconds;

        lHrs = parseInt(lSeconds / 3600);
        lMinutes = (parseInt(lSeconds / 60)) - (lHrs * 60);
        lSeconds = parseInt(lSeconds % 60);

        var sAns;


        if (lSeconds == 60) {
            lMinutes = lMinutes + 1;
            lSeconds = 0;
        }

        if (lMinutes == 60) {
            lMinutes = 0;
            lHrs = lHrs + 1;
        }

        sAns = Right("0" + lMinutes.toString(), 2) + ":" + Right("0" + lSeconds.toString(), 2);

        if (lHrs > 0) {
            sAns = Right("0" + lHrs.toString(), 2) + ":" + sAns;
        }

        return sAns;
    }
    catch (e) {
        return '';
    }
}

function Left(str, n) {
    try {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0, n);
    }
    catch (e) {
        return
    }
}
function Right(str, n) {
    try {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else {
            var iLen = String(str).length;
            return String(str).substring(iLen, iLen - n);
        }
    }
    catch (e) {
        return '';
    }
}

function get_thumbnail(thumbnail_name, file_name, fetch_local) {
    try {
        var result, add_root_path;
        add_root_path = true;
        if (thumbnail_name.indexOf("non_image_") > -1) {
            file_name = thumbnail_name.replace("non_image_", "");
            thumbnail_name = "";
        }
        else if (Right(thumbnail_name, 2) == "_1") {
            thumbnail_name = Left(thumbnail_name, thumbnail_name.length - 2);
            fetch_local = true;
        }
        else if (Right(thumbnail_name, 2) == "_0") {
            thumbnail_name = Left(thumbnail_name, thumbnail_name.length - 2);
            fetch_local = false;
        }


        if ((thumbnail_name != "") && (thumbnail_name != "sm_")) {
            result = get_image_base_url(kThumbnail, fetch_local) + thumbnail_name;
            add_root_path = false;
        }
        else {
            if (has_image_file_extension(file_name)) {
                result = "default_thumbnail_image_file.jpg";
            }
            else {
                if (has_pdf_file_extension(file_name)) {
                    result = "default_thumbnail_pdf_file.jpg";
                }
                else if (has_swf_file_extension(file_name)) {
                    result = "default_thumbnail_swf_file.jpg";
                }
                else {
                    result = "default_thumbnail_movie_file.jpg";
                }
            }
            if (add_root_path) {
                result = k_root_path + "images/" + result;
            }
        }
        return result;
    }
    catch (e) {
        return '';
    }
}

function has_swf_file_extension(file_name) {
    try {
        var result, valid_extension_list, file_extension;
        result = false;
        valid_extension_list = ".swf";
        file_extension = Right(file_name, file_name.length - file_name.lastIndexOf("."));
        file_extension = file_extension.toLowerCase();
        result = (valid_extension_list.indexOf(file_extension) > -1);
        return result;
    }
    catch (e) {
        return false;
    }
}

function get_image_base_url(object_type, fetch_local) {
    try {
        var key, image_base_url, fetch_from_amazon;
        fetch_from_amazon = false;
        switch (object_type) {
            case kPortfolioFile:
            case kOriginalFile:
                key = "user_files/individual_files/";
                break;
            case kThumbnail:
            case kSmallThumbnail:
                key = "user_files/individual_files/thumbnails/";
                break;
            case kFeaturedImage:
                key = "user_files/individual_files/featured/";
                break;
            case kJobSeekerAvatar:
                key = "user_files/individual_files/avatars/";
                break;
            case kProjectHomeThumbnail:
                key = "user_files/individual_files/ph/";
                break;
            case kGroupImage:
                key = "user_files/individual_files/groups/";
                break;
            case kGroupAvatar:
                key = "user_files/group_files/avatars/";
                break;
            case kGroupBanner:
                key = "user_files/group_files/banners/";
                break;
            default:
                key = "";
                break;
        }

        var amazonS3_enabled = true;
        if (amazonS3_enabled) {
            if (!fetch_local) {
                fetch_from_amazon = true;

            }
        }

        var amazon_down = false;
        var root_path = k_root_path;
        var storage_url = 'storage/';
        var amazonS3_bucket_url = 'http://s3images.coroflot.com/';

        if (!fetch_local && amazon_down) {
            image_base_url = root_path + storage_url + key;
        }
        else {
            if (fetch_from_amazon) {
                image_base_url = amazonS3_bucket_url + key;
            }
            else {
                image_base_url = root_path + key;
            }
        }

        return image_base_url;
    }
    catch (e) {
        return '';
    }
}

function get_file_type_text(number_of_images, number_of_pdfs, number_of_videos, k_activity_type) {
    try {
        var file_type_text;
        file_type_text = "";
        var item_sub_text_for_file_types;
        item_sub_text_for_file_types = "";
        var total_files;
        total_files = 0;

        if (!jQuery.isNumeric(number_of_images)) number_of_images = 0;
        if (!jQuery.isNumeric(number_of_pdfs)) number_of_pdfs = 0;
        if (!jQuery.isNumeric(number_of_videos)) number_of_videos = 0;
        total_files = number_of_images + number_of_pdfs + number_of_videos;

        if (number_of_images == 0 && number_of_pdfs > 0 && number_of_videos > 0) {
            file_type_text = "file";
        }
        else if (number_of_images > 0 && number_of_pdfs == 0 && number_of_videos > 0) {
            file_type_text = "file";
        }
        else if (number_of_images > 0 && number_of_pdfs > 0 && number_of_videos == 0) {
            file_type_text = "file";
        }
        else if (number_of_images == 0 && number_of_pdfs == 0 && number_of_videos > 0) {
            file_type_text = "video";
        }
        else if (number_of_images == 0 && number_of_pdfs > 0 && number_of_videos == 0) {
            file_type_text = "file";
        }
        else if (number_of_images > 0 && number_of_pdfs == 0 && number_of_videos == 0) {
            file_type_text = "image";
        }
        else {
            file_type_text = "file";
        }


        if (total_files > 1) file_type_text = file_type_text + "s";

        item_sub_text_for_file_types = file_type_text;

        return item_sub_text_for_file_types;
    }
    catch (e) {
        return '';
    }
}

function get_portfolios_count_in_group(portfolios_ids) {
    try {
        var portfolio_ids_array, portfolios_count;
        portfolio_ids_array = portfolios_ids.split(",");
        portfolios_count = portfolio_ids_array.length + 1;

        if (portfolios_count > 3)
            return portfolios_count - 4;
        else
            return 0;
    }
    catch (e) {
        return 0;
    }

}

function create_links(strText) {
    try {
        strText = " " + strText;
        strText = ereg_replace(strText, '(^|[\n ])([\w]+?://[^ ,"\s<]*)', '$1<a href="$2">$2</a>');
        strText = ereg_replace(strText, '(^|[\n ])((www|ftp)\.[^ ,"\s<]*)', '$1<a href="http://$2">$2</a>');

        strText = Right(strText, strText.length - 1);
        return strText;
    }
    catch (e) {
        return '';
    }
}

function ereg_replace(strOriginalString, strPattern, strReplacement) {
    try {
        // Function replaces pattern with replacement
        var objRegExp = new RegExp(/strPattern/g / i);
        var text_to_return = objRegExp.replace(strOriginalString, strReplacement);
        objRegExp = null;
        return text_to_return;
    }
    catch (e) {
        return strOriginalString;
    }
}

function get_users_string(user_ids, user_info_string) {
    try {
        var individual_user_path;
        individual_user_path = "";
        var m_user_id, user_full_name, avatar_image, fetch_local_avatar, user_profile_thmbnail;
        var portfolio_ids_array, portfolio_info_array;
        var split_into_columns, nested_portfolio_id;
        var number_to_show_in_batch;

        user_ids_array = user_ids.split(",");
        user_info_array = user_info_string.split("|");
        number_to_show_in_batch = user_ids_array.length;
        user_count = user_ids_array.length + 1;
        if (number_to_show_in_batch > 3) {
            number_to_show_in_batch = 3;
        }

        for (var i = 0; i < number_to_show_in_batch; i++) {
            split_into_columns = user_info_array[i].split(",");
            user_full_name = split_into_columns[0]		                //user full name
            avatar_image = split_into_columns[1]				        //avatar image
            fetch_local_avatar = split_into_columns[2].toString() == "1"		//fetch local avatar
            profile_thumbnail = split_into_columns[3]		            //profile thumbnail
            m_user_id = split_into_columns[4]		                        //job seeker id
            m_user_url_name = split_into_columns[5]		                        //job seeker url name

            if (individual_user_path != "") {
                individual_user_path = individual_user_path + ", ";
            }

            if (user_id.toString() == m_user_id.toString()) {
                individual_user_path = individual_user_path + "you";
            }
            else {
                individual_user_path = individual_user_path + '<a href="/' + m_user_url_name + '">' + user_full_name + '</a>';
            }


        }
        return individual_user_path;
    }
    catch (e) {
        return '';
    }
}

function get_group_avatar(avatar_image_name, fetch_local) {
    try {
        var result;
        if (avatar_image_name != "") {
            result = get_image_base_url(kGroupAvatar, fetch_local) + avatar_image_name;
        }
        else {
            result = k_root_path + "images/default_group_avatar_file.jpg";
        }
        return result;
    }
    catch (e) {
        return '';
    }
}

function get_job_seeker_avatar(avatar_image_name, fetch_local) {
    try {
        var result;
        if (avatar_image_name != "") {
            result = get_image_base_url(kJobSeekerAvatar, fetch_local) + avatar_image_name;
        }
        else {
            result = k_root_path + "images/hold-avatar-individual_small.gif";
        }
        return result;
    }
    catch (e) {
        return '';
    }
}

function get_project_cover_image(project_cover_image, fetch_local)
{
try{
    if (!fetch_local) {
        return 'http://s3images.coroflot.com/user_files/individual_files/projects/' + project_cover_image;
    }
    else {
        return k_root_path + '/user_files/individual_files/projects/' + project_cover_image;
    }
}
catch(ex)
{
return '';
}
}

function url_public_job_seeker_profile(id, url_name) {

    if (url_name != null) {
        if (url_name.length > 0)
            return "/" + url_name;
    }
    else return "/people/profile?id=" + id.toString();
}
// global success from modal screen function
function success_slide_down(message, _href) {	
	$("#lb_m").fadeOut({"queue":false});
	$("iframe#lb_c").fadeOut({"queue":false});
	//$("#lb_m").fadeOut({"queue":false});
	//$("#lb_c").remove();
	
	var _html = "<div id='top_slide_success'>";
		_html += "<div class='success'><p><strong>Success</strong> &mdash; " + message + " </p><span> </span></div>";
	$(_html).hide().appendTo($("div#body"));
	var left_position = ($(document).width() / 2) - ($("div#top_slide_success").width() / 2);
	printf("lp: " + left_position);
	$("div#top_slide_success").css({left: left_position + "px"}).slideDown(200);
	if (_href != undefined) {
		setTimeout(function() {
			$("div#top_slide_success").slideUp(200, function() {
				window.location = _href;												 
			});
			
		}, 1300);
	} else {
		var element = document.getElementById('lb_c');
		element.parentNode.removeChild(element);
		setTimeout(function() {
			$("div#top_slide_success").slideUp(200);
			
		}, 1300);
		
	}
	

}

function printf(to_print) {
	if (window.console && window.console.log) {
		window.console.log(to_print);
	}	
}
var coro_var = {
	is_show: false,
	tool_timeout: ""
}
$("a[data-tooltip], span[data-tooltip], li[data-tooltip]").live({
	mouseover: function(event) {
		printf("ello");
		var mouse_coord = { 
			x: (event.pageX + 10),
			y: (event.pageY - 10)
		};
		var tooltip_text = $(this).attr("data-tooltip");
		if ($("div#tooltiper").length == 0) {
			var _html = "<div id='tooltiper'></div>";
			$(_html).appendTo($("#coroflot"));
		}
		
		var $tool_tip = $("div#tooltiper");
		
		if (!coro_var.is_show) {
			coro_var.tool_timeout = setTimeout(function() { 
				$tool_tip.text(tooltip_text).css({ top: mouse_coord.y - $("div#tooltiper").height(), left: mouse_coord.x }).fadeIn();
				coro_var.is_show = true;
			}, 800);
		}
		
		
	}, 
	mouseout: function(event) {
		clearTimeout(coro_var.tool_timeout);
		coro_var.is_show = false;
		$("div#tooltiper").fadeOut();
	}
});

String.prototype.truncate_str = function(cut_str, _len) {
	if (this.length > _len) {
		return this.slice(0, _len) + cut_str;
	} else {
		return this;
	}
}



