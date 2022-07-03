
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// SVG page load Animation
		$top01 = $('.top01PL');
		$top02 = $('.top02PL');
		$bottom01 = $('.bottom01PL');
		$bottom02 = $('.bottom02PL');

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
				$top01.addClass('top01');
				$top02.addClass('top02');
				$bottom01.addClass('bottom01');
				$bottom02.addClass('bottom02');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});

})(jQuery);


const headerBar = document.getElementById('headerDiv');
const headerLinks = document.getElementById('headerLinks');
const introSection = document.getElementById('intro');
const mainSections = document.querySelectorAll('.main');
const contactSection = document.getElementById('contact');
const spans = document.querySelectorAll('.word span');
const headerParagraphs = document.querySelectorAll('.headerP')
const whatP = document.getElementById('one');
const whoP = document.getElementById('two');
const workP = document.getElementById('work');


const mutationObserver = new MutationObserver(e => {
	headerParagraphs.forEach(child => {
		child.classList.remove('headerHighlight');
	})
	if(introSection.classList.contains('inactive')){
		headerBar.style.display = 'flex'
		headerLinks.style.display = 'none'
	}else{
		headerBar.style.display = 'none'
		headerLinks.style.display = 'initial'
	}
	if(!whatP.classList.contains('inactive')){
		document.querySelector('.whatP').classList.add('headerHighlight');
	}
	if(!whoP.classList.contains('inactive')){
		document.querySelector('.whoP').classList.add('headerHighlight');
	}
	if(whatP.classList.contains('inactive') && whoP.classList.contains('inactive') && contactSection.classList.contains('inactive')){
		document.querySelector('.portP').classList.add('headerHighlight');
	}
	if(!contactSection.classList.contains('inactive')){
		document.querySelector('.connectP').classList.add('headerHighlight');
		spans.forEach((span, idx) => {
			span.addEventListener('click', (e) => {
			  e.target.classList.add('active');
			});
			span.addEventListener('animationend', (e) => {
			  e.target.classList.remove('active');
			});
			setTimeout(() => {
				span.classList.add('active');
			  }, 750 * (idx+1))
		  });
	}
});

mainSections.forEach(section => {
	mutationObserver.observe(section, {attributes: true})
})



spans.forEach((span, idx) => {
  span.addEventListener('click', (e) => {
    e.target.classList.add('active');
  });
  span.addEventListener('animationend', (e) => {
    e.target.classList.remove('active');
  });
  
  // Initial animation
  setTimeout(() => {
    span.classList.add('active');
  }, 750 * (idx+1))
});
