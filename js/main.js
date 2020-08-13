(function($){
	"use strict";
	jQuery(document).on('ready', function () {
        // Header Sticky
		$(window).on('scroll',function() {
            if ($(this).scrollTop() > 120){  
                $('.navbar-light').addClass("is-sticky");
            }
            else{
                $('.navbar-light').removeClass("is-sticky");
            }
        });

        $('.navbar .navbar-nav li a').on('click', function(){
			$('.navbar-collapse').collapse('hide');
		});

        // Navbar Menu JS
        $('.navbar .navbar-nav li a, .down_arrow .scroll_down').on('click', function(e){
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1500);
            e.preventDefault();
        });

        // Home Slides
        $(".home-slides").owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            touchDrag: true,
            mouseDrag: true,
            autoplay: true,
            animateOut: 'slideOutRight',
            animateIn: 'slideInLeft',
            smartSpeed: 700,
            loop: true,
            navText: [
            "<i class='icon icon-Arrow'></i>",
            "<i class='icon icon-Arrow'></i>"
            ]
        });
        $(".home-slides").on("translate.owl.carousel", function(){
            $(".main-banner h5").removeClass("animated fadeInDown").css("opacity", "0");
            $(".main-banner h1").removeClass("animated fadeInUp").css("opacity", "0");
            $(".main-banner p").removeClass("animated zoomIn").css("opacity", "0");
            $(".main-banner .btn, .main-banner .video-btn").removeClass("animated fadeInDown").css("opacity", "0");
        });
        $(".home-slides").on("translated.owl.carousel", function(){
            $(".main-banner h5").addClass("animated fadeInDown").css("opacity", "1");
            $(".main-banner h1").addClass("animated fadeInUp").css("opacity", "1");
            $(".main-banner p").addClass("animated zoomIn").css("opacity", "1");
            $(".main-banner .btn, .main-banner .video-btn").addClass("animated fadeInDown").css("opacity", "1");
        });

        // About Slides
        $(".about-slides").owlCarousel({
            items: 1,
            nav: false,
            dots: true,
            touchDrag: true,
            mouseDrag: true,
            autoplay: true,
            smartSpeed: 700,
            loop: true,
            navText: [
            "<i class='icon icon-Arrow'></i>",
            "<i class='icon icon-Arrow'></i>"
            ]
        });

  
        // Team Slider
        $('.team-slides').owlCarousel({
            loop: true,
            autoplay:true,
            nav: false,
            mouseDrag: true,
            autoplayHoverPause: true,
            responsiveClass: true,
            dots: true,
            navText: [
                "<i class='icon icon-Arrow'></i>",
                "<i class='icon icon-Arrow'></i>"
            ],
            responsive:{
                0:{
                    items:1,
                },
                576:{
                    items:2,
                },
                768:{
                    items:3,
                },
                1200:{
                    items:4,
                }
            }
        });

        // Feedback Slides
        $('.feedback-slides').owlCarousel({
            loop: true,
            autoplay: true,
            nav: false,
            mouseDrag: true,
            autoplayHoverPause: true,
            responsiveClass: true,
            dots: true,
            navText: [
            "<i class='icofont-double-left'></i>",
            "<i class='icofont-double-right'></i>"
            ],
            responsive:{
                0:{
                    items:1,
                },
                768:{
                    items:2,
                },
                1200:{
                    items:3,
                }
            }
        });

        // Pricing Tabs
        $(".tab-slider-body").hide();
        $(".tab-slider-body:first").show();
        $(".tab-slider-nav li").on('click', function() {
            $(".tab-slider-body").hide();
            var activeTab = $(this).attr("rel");
            $("#"+activeTab).fadeIn();
            if($(this).attr("rel") == "yearly"){
                $('.tab-slider-tabs').addClass('slide');
            }else{
                $('.tab-slider-tabs').removeClass('slide');
            }
            $(".tab-slider-nav li").removeClass("active");
            $(this).addClass("active");
        });

        // Partner Slides
        $('.partner-slides').owlCarousel({
            loop: true,
            autoplay:true,
            nav: false,
            mouseDrag: true,
            autoplayHoverPause: true,
            responsiveClass: true,
            dots: false,
            navText: [
            "<i class='icofont-double-left'></i>",
            "<i class='icofont-double-right'></i>"
            ],
            responsive:{
                0:{
                    items:2,
                },
                768:{
                    items:4,
                },
                1200:{
                    items:6,
                }
            }
        });

        // Go to Top
        $(function(){
            //Scroll event
            $(window).on('scroll', function(){
                var scrolled = $(window).scrollTop();
                if (scrolled > 300) $('.go-top').fadeIn('slow');
                if (scrolled < 300) $('.go-top').fadeOut('slow');
            });  
            //Click event
            $('.go-top').on('click', function() {
                $("html, body").animate({ scrollTop: "0" },  500);
            });
        });
		
		// Subscribe form
		$(".newsletter-form").validator().on("submit", function (event) {
			if (event.isDefaultPrevented()) {
			// handle the invalid form...
				formErrorSub();
				submitMSGSub(false, "Please enter your email correctly.");
			} else {
				// everything looks good!
				event.preventDefault();
			}
		});

		function callbackFunction (resp) {
			if (resp.result === "success") {
				formSuccessSub();
			}
			else {
				formErrorSub();
			}
		}
		function formSuccessSub(){
			$(".newsletter-form")[0].reset();
			submitMSGSub(true, "Thank you for subscribing!");
			setTimeout(function() {
				$("#validator-newsletter").addClass('hide');
			}, 4000)
		}
		function formErrorSub(){
			$(".newsletter-form").addClass("animated shake");
			setTimeout(function() {
				$(".newsletter-form").removeClass("animated shake");
			}, 1000)
		}
		function submitMSGSub(valid, msg){
			if(valid){
				var msgClasses = "validation-success";
			} else {
				var msgClasses = "validation-danger";
			}
			$("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
		}
		// AJAX MailChimp
		$(".newsletter-form").ajaxChimp({
			url: "https://salakit.us20.list-manage.com/subscribe/post?u=a5891eb96ac2e08f22da1faf3&amp;id=a1861bcb1e", // Your url MailChimp
			callback: callbackFunction
		});
    });

    // Page Loader
    jQuery(window).on('load', function() {
        $('.preloader-area').fadeOut();
    });
}(jQuery));