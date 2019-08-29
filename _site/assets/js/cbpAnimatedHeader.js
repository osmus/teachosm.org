/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-fixed-top' ),
		verticalHeader = document.querySelector( '.vertical-landing-page-menu' ),
		horizontalHeader = document.querySelector( '.horizontal-landing-page-menu' ),
		didScroll = false,
		changeHeaderOn = 170;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'navbar-shrink' );
			classie.add( verticalHeader, 'disappear' );
			classie.add( horizontalHeader, 'appear' );
		}
		else {
			classie.remove( header, 'navbar-shrink' );
			classie.remove( verticalHeader, 'disappear' );
			classie.remove( horizontalHeader, 'appear' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();