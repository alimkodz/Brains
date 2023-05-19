$(function(){
	$('.header__icon').on('click', () => {
		$('.menu').slideToggle('is-open');
		$('.header__button').toggleClass('close');
	});

	const video = document.getElementById('video');
	const progressBar = document.getElementById('progressBar');
	const progress = progressBar.firstElementChild;
	const volume = document.getElementById('volume');
	const volumeValue = volume.firstElementChild;
	video.volume = 0.5;
	$('.video__button').on('click', () => {
		if (video.paused) {
			video.play();
			$('.video__buttons').css('display', 'block');
		} else {
			video.pause();
			$('.video__buttons').css('display', 'none');
		}
		$('.video__button').toggleClass('start');
	});
	$(video).on('timeupdate', () => {
		$(progress).css('width', video.currentTime / video.duration * 100 + '%');
	});
	$(progressBar).on('click', (evt) => {
		video.currentTime = evt.offsetX / progressBar.clientWidth * video.duration;
	});
	$(volume).on('click', (evt) => {
		video.volume = evt.offsetY / volume.clientHeight;
	});
	$(video).on('volumechange', () => {
		$(volumeValue).css('height', video.volume * 100 + '%');
	});
	$(video).on('ended', () => {
		$('.video__button').toggleClass('start');
	});

	const comments = $('#comMove').children();
	let thePlace = 0, moveX, activeEl = 0, flag890, flag;
	if (window.innerWidth < 890) {
		moveX = 105;
		flag890 = true;

	} else {
		moveX = 48;
		flag = true;
	}
	window.addEventListener('resize', () => {
		if (window.innerWidth < 890) {
			if (!flag890) {
				moveX = 105;
				zeroing();
				flag890 = true;
				flag = false;
			}
		} else {
			if (!flag) {
				moveX = 48;
				zeroing();
				flag890 = false;
				flag = true;
			}
		}
	});
	$('#com-next').on('click', () => {
		$('#com-prev').css('opacity', 1);
		if (activeEl != comments.length - 1) {
			activeEl++;
			thePlace -= moveX;
			$('#comMove').animate({
				translate: thePlace + '%'
			}, 300);
			comments.removeClass('active');
			comments[activeEl].classList.add('active');
			if (activeEl == comments.length - 1) {
				$('#com-next').css('opacity', 0.5);
			}
		}
	});
	$('#com-prev').on('click', () => {
		$('#com-next').css('opacity', 1);
		if (activeEl != 0) {
			activeEl--;
			thePlace += moveX;
			$('#comMove').animate({
				translate: thePlace + '%'
			}, 300);
			comments.removeClass('active');
			comments[activeEl].classList.add('active');
			if (activeEl == 0) {
				$('#com-prev').css('opacity', 0.5);
			}
		}
	});

	$('#submit-btn').on('click', (evt) => {
		evt.preventDefault();
	});

	function zeroing () {
		activeEl = 0;
		thePlace = 0;
		comments.removeClass('active');
		comments[0].classList.add('active');
		$('#comMove').css('translate', 0);
		$('#com-prev').css('opacity', 0.5);
		$('#com-next').css('opacity', 1);
	}

	$("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        var $this = $(this);
            blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("#nav").removeClass("active");
        $("#nav_toggle").removeClass("active");
        $("#nav a").removeClass("active");
        $this.addClass("active");
        
        $("html, body").animate({
            scrollTop: blockOffset
        }, 500);
    });
});