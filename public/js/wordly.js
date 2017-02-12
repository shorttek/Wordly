window.Wordly = (function() {
	
	return function(canvas) {

		var _canvas = canvas;
		var ctx = _canvas.getContext('2d');

		var player1;
		var allMovables = [];

		var movable = function(x, y, width, height) {
			var _x = x;
			var _y = y;
			var _width = width;
			var _height = height;

			var velocityIncrease = 0;
			var rotationIncrease = 0;
			var direction = 0;

			_vx = 0;
			_vy = 0;

			var move = function() {

				if (velocityIncrease != 0) {
					_vx = _vx + (1 * velocityIncrease);
					_vy = _vy + (1 * velocityIncrease);
				}

				if (_vx < 0) { _vx = 0; }
				if (_vy < 0) { _vy = 0; }

				if (_vx == 0 && _vy == 0) {
					velocityIncrease = 0;
				}

				_x = _x + _vx;
				_y = _y + _vx;

				if (_x > _canvas.width) {
					_x = _canvas.width - _x;
				}

				if (_y > canvas.height) {
					_y = _canvas.height - _y;
				}
			}

			var getX = function() { return _x; }
			var getY = function() { return _y; }
			var getWidth = function() { return _width; }
			var getHeight = function() { return _height; }

			var offsetVX = function(offsetVx) {
				_vx = _vx + offsetVx;
			}

			var offsetVY = function(offsetVy) {
				_vy = _vy + offsetVy;
			}

			var setVelocityDirection = function(dir) {
				
				velocityIncrease = velocityIncrease + dir;
				console.log(velocityIncrease);
			}

			var setRotationIncrease = function(rot) {
				rotationIncrease = rot;
			}

			return {
				move : move,
				getX : getX,
				getY : getY,
				getWidth : getWidth,
				getHeight : getHeight,
				setVelocityDirection: setVelocityDirection,
				setRotationIncrease: setRotationIncrease
			};
		}

		var updateAllObjects = function() {
			for (var i = 0; i < allMovables.length; i++) {
				var m = allMovables[i];
				m.move();
			}
		}

		var draw = function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (var i = 0; i < allMovables.length; i++) {
				var m = allMovables[i];
				ctx.fillRect(m.getX() ,m.getY(), m.getWidth(), m.getHeight());
				ctx.stroke();
			}
			
		}

		var update = function() {
			updateAllObjects();
			draw();

			setTimeout(update, 50);
		}

		var start = function(document) {
			player1  = new movable(20, 20, 10, 10);
			allMovables.push(player1);

			document.onkeydown = function(e) {
				if (!player1) return;

				switch(e.keyCode) {
					case 37:
						console.log('left');
						break;
					case 38:
						console.log('up');
						player1.setVelocityDirection(1);
						break;
					case 39:
						console.log('right')
						break;
					case 40:
						console.log('down');
						player1.setVelocityDirection(-1);
						break;
				}
			}

			document.onkeyup = function(e) {

				if (!player1) return;
				switch(e.keyCode) {
					case 37:
						console.log('left released');
						break;
					case 38:
						console.log('up released');
						player1.setVelocityDirection(0);
						break;
					case 39:
						console.log('right released')
						break;
					case 40:
						console.log('down released');
						player1.setVelocityDirection(0);
						break;
				}
			}

			

			update();
		}


		return {
			start : start
		}
	};
})();