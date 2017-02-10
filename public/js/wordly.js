window.Wordly = (function() {
	
	return function(canvas) {

		var _canvas = canvas;
		var ctx = _canvas.getContext('2d');

		var allMovables = [];

		var movable = function(x, y, width, height) {
			var _x = x;
			var _y = y;
			var _width = width;
			var _height = height;

			_vx = 1;
			_vy = 1;

			var move = function() {
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

			return {
				move : move,
				getX : getX,
				getY : getY,
				getWidth : getWidth,
				getHeight : getHeight
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

			setTimeout(update, 1);
		}

		var start = function() {
			allMovables.push(new movable(20, 20, 10, 10));

			update();
		}


		return {
			start : start
		}
	};
})();