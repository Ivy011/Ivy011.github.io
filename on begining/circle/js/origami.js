window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/**
 * 
 * 
 * @author Hakim El Hattab | http://hakim.se
 */
(function(){
	var canvas = document.body.appendChild( document.createElement( 'canvas' ) ),
	    context = canvas.getContext( '2d' ),
		width = window.innerWidth,
		height = window.innerHeight,
		dirtyRegions = [],
		
		// The number of papers to generate
		quantity = 16,
		
		// Constructed Paper objects
		papers = [],

		// Texts
		texts = ['Lucky coin','Reading','Friends','Good weather','A hot shower', 'A warm milk ', 'Eat a chocolate', 'Lay down','A good talk','Watch a movie','Take a walk','Play with animals','Painting','Tidy up room','Exercise','Write a diary'],

		// Colors
		colors = [
			'#ff5722','#ff9800','#ffc107','#ffeb3a',
            '#cddc39','#8bc34a','#4daf50','#009688',
            '#00bcd4','#01a9f4','#2196f3','#3f51b5',
            '#673ab7','#9c27b0','#e82663','#f44336',
			],
		
		// The index of the current layout
		layoutIndex = 0,
		
		// Used to automatically swap out layours
		layoutInterval = -1,
		
		// Available layout modes
		layouts = [
			// Large circular flower (center fold, two step)
			function() {
				papers.forEach( function( paper, i ) {
					var radius = 2,
						x = Math.sin( i/quantity * Math.PI*2 ) * radius,
						y = Math.cos( i/quantity * Math.PI*2 ) * radius,
						angle = Math.atan2( y, x ) * 180/Math.PI - 45,
						size = 90 * (1 + (i % 2));

					paper.interpolations = { x: x, y: y, size: size, angle: angle };
					paper.speed = 1;
				} );
			},
			// Spiral
			function() {
				papers.forEach( function( paper, i ) {
					var radius = Math.max( i / (quantity*0.75), 0.4 ),
						x = Math.sin( i/quantity * Math.PI*2 ) * radius,
						y = Math.cos( i/quantity * Math.PI*2 ) * radius,
						angle = Math.atan2( y, x ) * 180/Math.PI,
						size = radius*radius*150;

					paper.interpolations = { x: x, y: y, size: size, angle: angle };
					paper.speed = Math.min( 0.5 + ( ( quantity - i ) / quantity ), 1 );
				} );
			},
			// Grid
			function() {
				papers.forEach( function( paper, i ) {
					var x = ( i % 4 ) - 2,
						y = Math.floor( i / 4 ) - 2,
						angle = 0,
						size = 120;

					paper.interpolations = { x: x, y: y, size: size, angle: angle };
					paper.speed = Math.min( 0.5 + i / quantity, 1 );
				} );
			},
			// Large circular flower (rotation fold)
			function() {
				papers.forEach( function( paper, i ) {
					var radius = 2,
						x = Math.sin( i/quantity * Math.PI*2 ) * radius,
						y = Math.cos( i/quantity * Math.PI*2 ) * radius,
						angle = Math.atan2( y, x ) * 180/Math.PI,
						size = 100;

					paper.interpolations = { x: x, y: y, size: size, angle: angle };
					paper.speed = 0.7;
				} );
			},
			function() {
				papers.forEach( function( paper, i ) {
					var radius = 0.001,
						x = Math.sin( i/quantity * Math.PI*2 ) * radius,
						y = Math.cos( i/quantity * Math.PI*2 ) * radius,
						angle = Math.atan2( y, x ) * 180/Math.PI,
						size = 100;
					
					paper.interpolations = { x: x, y: y, size: size, angle: angle };
					paper.speed = 1;
				} );
			},
		];
	
	// Generate the papers
	for( var i = 0; i < quantity; i++ ) {
		papers.push( new Paper( 0, 0, 0, 1, i/quantity, texts[i], colors[i] ) );
	}
	
	setLayout( 0 );
	
	window.addEventListener( 'resize', resize, false );
	canvas.addEventListener( 'click', click, false );
	document.addEventListener( 'keydown', keydown, false );
	
	resize();
	let start = false;
	for (let i = 0; i < 100; i++) {
		animate();
		if (i === 99) {
			start = true;
			animate();
		}
	}
	
	// Start automatically changing layouts
	layoutInterval = setInterval( function() {
		nextLayout();
	}, 5000 );
	
	function keydown( event ) {
		switch( event.keyCode ) {
			case 32: clearInterval( layoutInterval ); nextLayout(); break;
			case 37: clearInterval( layoutInterval ); previousLayout(); break;
			case 39: clearInterval( layoutInterval ); nextLayout(); break;
		}
	}
	
	function click() {
		nextLayout();
		clearInterval( layoutInterval );
	}
	
	function resize() {
	    canvas.width = width = window.innerWidth;
	    canvas.height = height = window.innerHeight;
	}
	
	function previousLayout() {
		setLayout( layoutIndex - 1 );
	}
	
	function nextLayout() {
		setLayout( layoutIndex + 1 );
	}
	
	function setLayout( i ) {
		layoutIndex = ( i < 0 ? layouts.length - Math.abs(i) : i ) % layouts.length; 
		layouts[ layoutIndex ]();
	}
	
	function invalidate( x, y, w, h, angle ) {
		
		var tx = x; // TODO
		var ty = y;
		
		var region = new Region();
		region.inflate( tx, ty );
		region.inflate( tx + w, ty + w );
		region.expand( 4, 4 );
		
		dirtyRegions.push( region );
	}
	
	function animate() {
		context.clearRect( 0, 0, canvas.width, canvas.height );
		
		while( dirtyRegions.length ) {
			var region = dirtyRegions.pop()
//			context.clearRect( region.left, region.top, region.right-region.left, region.bottom-region.top );
			
//			context.fillStyle = 'rgba(0,255,0,0.4)';
//			context.fillRect( region.left, region.top, region.right-region.left, region.bottom-region.top );
		}
		
		for( var i = 0; i < papers.length; i++ ) {
			var paper = papers[i];
			
			paper.step( 0.01 );
			
			var x = ~~(paper.x*paper.size + width*0.5);
			var y = ~~(paper.y*paper.size + height*0.5);
			
			invalidate( x, y, paper.size, paper.size, paper.angle );
			
			context.save();
			context.translate( x, y );
			context.rotate( paper.angle * Math.PI/180 );
			
			// Flipside
			context.beginPath();
			context.fillStyle = paper.colorB.toString();
			context.fillRect( 0, 0, paper.size, paper.size );

			context.fillStyle = "#000000";
			context.font="14px Times New Roman";
			context.fillText(paper.text, paper.size / 2 - context.measureText(paper.text).width / 2, paper.size / 2 + 10);
			context.restore();
		}

		if (start) {
			requestAnimFrame( animate );
		}
	}
	
	function Paper( x, y, angle, size, progress, text, colorB ) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.size = size;
		this.fold = this.size;
		this.colorA = new HSL().randomize();
		this.colorB = colorB;
		this.progress = progress || 0;
		this.speed = 1;
		this.text = text;
		
		// Used to change properties over time based on layout
		this.interpolations = { 
			x: this.x, 
			y: this.y, 
			angle: this.angle, 
			size: this.size
		};
		
		this.step = function( v ) {
			// this.progress += v;
			// this.progress /= 1.005;
			// this.fold = this.size * this.progress;
			//
			// this.colorA.l = 30 + ( this.progress * 20 );
			// this.colorB.l = 20 + ( (1-this.progress) * 30 );
			//
			// if( this.progress >= 1 ) {
			// 	this.reset();
			// }
			
			this.interpolate( 0.15 * this.speed );
		}
		
		this.interpolate = function( v ) {
			for( var property in this.interpolations ) {
				this[ property ] += ( this.interpolations[ property ] - this[ property ] ) * v;
			}
		}
		
		this.reset = function() {
			this.progress = 0;
			this.fold = 0;
			
			var temp = this.colorB;
			
			this.colorB = this.colorA;
			this.colorA = temp.randomize();
		}
	}
	
	function HSL( h, s, l ) {
		this.h = h || 0;
		this.s = s || 100;
		this.l = l || 50;
		
		this.randomize = function() {
			this.h = ~~(Math.random()*360);
			this.s = ~~(30 + Math.random()*50);
			this.l = 50;
			
			return this;
		}
		
		this.toString = function() {
			return 'hsl('+this.h+','+this.s+'%,'+this.l+'%)'
		}
	}
	
	function Region() {
		this.reset = function() {
			this.left = 999999; 
			this.top = 999999; 
			this.right = 0; 
			this.bottom = 0; 
		};
		
		this.inflate = function( x, y ) {
			this.left = Math.min(this.left, x);
			this.top = Math.min(this.top, y);
			this.right = Math.max(this.right, x);
			this.bottom = Math.max(this.bottom, y);
		};
		
		this.expand = function( x, y ) {
			this.left -= x;
			this.top -= y;
			this.right += x;
			this.bottom += y;
		};
		
		this.reset();
	}
	
})()
document.getElementById("prev_btn").addEventListener("click", function() {
	window.location.href = "../mainpage/mainpage.html";
  });

  document.getElementById("next_btn").addEventListener("click", function() {
	window.location.href = "../flower/flower.html";
  });