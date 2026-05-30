/*
	Photon by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1141px',  '1680px' ],
			large:    [ '981px',   '1140px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '321px',   '480px'  ],
			xxsmall:  [ null,      '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Back to Top Button (with on-page debug)
		var backToTopButton = $('#backToTop');

		// If jQuery didn't find it, check native DOM and rewrap
		if ((!backToTopButton || backToTopButton.length === 0) && document.getElementById('backToTop')) {
			backToTopButton = $(document.getElementById('backToTop'));
			console.log('BackToTop: found via document.getElementById');
		}

		// If still missing, create a fallback button and append to body
		if (!backToTopButton || backToTopButton.length === 0) {
			console.warn('BackToTop button missing; creating fallback instance');
			var fallback = '<a id="backToTop" class="back-to-top" href="#header"><i class="fas fa-chevron-up"></i></a>';
			$body.append(fallback);
			backToTopButton = $('#backToTop');
		}

		if (!backToTopButton || backToTopButton.length === 0) {
			console.warn('BackToTop button not found: #backToTop');
		} else {
			console.log('BackToTop button found, ready');
		}

		$window.on('scroll', function() {
			var st = $window.scrollTop();
			if (backToTopButton && backToTopButton.length) {
				if (st > 100) {
					backToTopButton.addClass('show');
				} else {
					backToTopButton.removeClass('show');
				}
			}
		});

		// Trigger a scroll event on load to set initial state
		$window.trigger('scroll');

		// Avoid colliding with the footer: compute and adjust bottom offset
		(function() {
			var $footer = $('#footer');
			var defaultBottom = null;

			function adjustForFooter() {
				if (!backToTopButton || !backToTopButton.length) return;
				if (!defaultBottom) {
					var computedBottom = NaN;
					try {
						var cs = window.getComputedStyle(backToTopButton[0]);
						if (cs) computedBottom = parseFloat(cs.getPropertyValue('bottom'));
					} catch (e) {
						computedBottom = NaN;
					}
					if (!isFinite(computedBottom)) {
						var cb = backToTopButton.css('bottom');
						computedBottom = cb ? parseFloat(cb) : NaN;
					}
					defaultBottom = isFinite(computedBottom) ? computedBottom : 80; // px fallback
				}

				if (!$footer || $footer.length === 0) {
					backToTopButton.css('bottom', defaultBottom + 'px');
					return;
				}

				var footerTop = $footer.offset().top;
				var st = $window.scrollTop();
				var wh = $window.height();
				var visibleOverlap = (st + wh) - footerTop;

				if (visibleOverlap > 0) {
					var margin = 16; // px gap between button and footer
					var newBottom = defaultBottom + visibleOverlap + margin;
					backToTopButton.css('bottom', newBottom + 'px');
				} else {
					backToTopButton.css('bottom', defaultBottom + 'px');
				}
			}

			// Call on scroll and resize
			$window.on('scroll resize', adjustForFooter);
			// Initial adjust
			adjustForFooter();
		})();

		backToTopButton.on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({scrollTop: 0}, 600);
		});

})(jQuery);