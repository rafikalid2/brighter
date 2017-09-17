/**
 * show popups in inputs, like date picker or autocomplete
 */
(function($){
	$._inputInitPopup	= function($input, $popup){
		$input
			.focus(function(){
				$input.parent().addClass('input-open');
				_adjustPosition($popup);
			})
			.before(
				$.ce('span')
					.className('drop-close')
					.click(function(){
						$input.parent().removeClass('input-open');
					})
					.get(0)
			);
		$popup.addClass('input-popup');

		return {
			close	: function(){
				$input.parent().removeClass('input-open');
			}
		};
	};

	function _adjustPosition($popup){
		$popup.css({
			top		: '100%',
			bottom	: 'auto',
			left	: 0,
			right	: 'auto',
			margin	: '-1px 0 0 0'
		});
		var pos	= $popup.offset();
		// Y
			if(pos.top + $popup.height() - scrollY > document.body.clientHeight){
				$popup.css({
					top		: 'auto',
					bottom	: '100%',
					margin	: '0 0 -1px 0'
				});
				pos	= $popup.offset();
				if(pos.top < scrollY){
					$popup.css({
						bottom	: 'calc(100% - ' + (scrollY - pos.top) + 'px)'
					});
				}
			}
		// X
			if(pos.left + $popup.width() - scrollX > document.body.clientWidth){
				$popup.css({
					left	: 'auto',
					right	: '100%'
				});
				pos	= $popup.offset();
				if(pos.left < scrollX){
					$popup.css({
						right	: 'calc(100% - ' + (scrollX - pos.left) + 'px)'
					});
				}
			}

	}

	// function _adjustAx($popup, )
})(jQuery);