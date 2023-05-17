var Books = (function() {

	var transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		$books = $( '#bk-list > li > div.bk-book' ), booksCount = $books.length, currentbook = -1;

	function init() {

		$books.each( function( i ) {

			var $book = $( this ),
				$other = $books.not( $book ),
				$parent = $book.parent(),
				$page = $book.children( 'div.bk-page' ),
				$content = $page.children( 'div.bk-content' ), current = 0;

			if( i < booksCount / 2 ) {
				$parent.css( 'z-index', i ).data( 'stackval', i );
			}
			else {
				$parent.css( 'z-index', booksCount - 1 - i ).data( 'stackval', booksCount - 1 - i );
			}

			$book.on( 'click', function() {
				if( currentbook !== -1 && currentbook !== $parent.index() ) {
					closeCurrent();
				}

				if( $book.data( 'opened' ) ) {
					$book.data( 'opened', false ).removeClass( 'bk-viewinside' ).on( transEndEventName, function() {
						$( this ).off( transEndEventName ).removeClass( 'bk-outside' );
						$parent.css( 'z-index', $parent.data( 'stackval' ) );
						currentbook = -1;
					} );
				}
				else {
					$book.data( 'opened', true ).addClass( 'bk-outside' ).on( transEndEventName, function() {
						$( this ).off( transEndEventName ).addClass( 'bk-viewinside' );
						$parent.css( 'z-index', booksCount );
						currentbook = $parent.index();
					} );
					current = 0;
					$content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
				}

			} );

			if( $content.length > 1 ) {

				var $navPrev = $( '<span class="bk-page-prev">&lt;</span>' ),
					$navNext = $( '<span class="bk-page-next">&gt;</span>' );

				$page.append( $( '<nav></nav>' ).append( $navPrev, $navNext ) );

				$navPrev.on( 'click', function() {
					if( current > 0 ) {
						--current;
						$content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
					}
					return false;
				} );

				$navNext.on( 'click', function() {
					if( current < $content.length - 1 ) {
						++current;
						$content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
					}
					return false;
				} );

			}

		} );

	}

	function closeCurrent() {

		var $book = $books.eq( currentbook ),
			$parent = $book.parent();

		$book.data( 'opened', false ).removeClass( 'bk-viewinside' ).on( transEndEventName, function(e) {
			$( this ).off( transEndEventName ).removeClass( 'bk-outside' );
			$parent.css( 'z-index', $parent.data( 'stackval' ) );
		} );

	}

	return { init : init };

})();

const books = document.querySelectorAll(".book-list .book");

$(books[1]).toggle(function(){
	$(this).parent().find('.book-menu').eq(0).animate({height:175},200);
},function(){
	$(this).parent().find('.book-menu').eq(0).animate({height:0},200);
});

$(books[2]).toggle(function(){
	$(this).parent().find('.book-menu').eq(0).animate({height:270},200);
},function(){
	$(this).parent().find('.book-menu').eq(0).animate({height:0},200);
});

$(books[3]).toggle(function(){
	$(this).parent().find('.book-menu').eq(0).animate({height:130},200);
},function(){
	$(this).parent().find('.book-menu').eq(0).animate({height:0},200);
});

$('.book-title').each(function(index, item) {
	$(item).click(function() {
		$('.book-container').each(function() {
			$(this).fadeOut(500);
		});

		const bookId = $(this).data('id');
		$('#book-' + bookId).fadeIn(500);
	})
});


$('.week').each(function(index, item) {
	$(item).click(function() {
		$('.week').each(function() {
			$(this).removeClass("active");
		});
		$(this).addClass("active");
		$('.week-content').each(function() {
			$(this).fadeOut(500);
		});
		index = 0;
		const weekId = $(this).data('id');
		$('#week-' + weekId).fadeIn(500);
	});
});

$('#modal1_anchor').click(function() {
	$('#modal1').fadeIn(500);
})

$('#modal1').click(function() {
	$('#modal1').fadeOut(500);
});

$('#modal2_anchor').click(function() {
	$('#modal2').fadeIn(500);
})

$('#modal2').click(function() {
	$('#modal2').fadeOut(500);
});

$('#modal3_anchor').click(function() {
	$('#modal3').fadeIn(500);
})

$('#modal3').click(function() {
	$('#modal3').fadeOut(500);
});

$('.fall-4').addClass('active');

setTimeout(() => {
	$('.fall-3').addClass('active');
}, 200);

setTimeout(() => {
	$('.fall-2').addClass('active');
}, 400);

setTimeout(() => {
	$('.fall-1').addClass('active');
}, 600);

$('#menu_wrapper').click(function() {
	$('.left').css('display', 'block');
});

$('#close_wrapper').click(function() {
	$('.left').css('display', 'none');
});

let index = 0;

$('.book-container-imgs .prev').click(function() {
	if (index > 0) {
		index--;
		$(this).parent().find('.normal').each(function(i, item) {
			if (i === index) {
				$(item).css('display', 'block');
			} else {
				$(item).css('display', 'none');
			}
		});
	}
});

$('.book-container-imgs .next').click(function() {
	const normalImgs = $(this).parent().find('.normal');
	if (index < normalImgs.length - 1) {
		index++;
		normalImgs.each(function(i, item) {
			if (i === index) {
				$(item).css('display', 'block');
			} else {
				$(item).css('display', 'none');
			}
		});
	}
});
