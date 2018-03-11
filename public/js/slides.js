/*!
* Slide logic
* Created by Korhan Akcura
*/

// Below contains example code from;
// https://github.com/steveathon/bootstrap-wysiwyg - MIT License
$(function() {
		function initToolbarBootstrapBindings()
		{
			var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
				'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
				'Times New Roman', 'Verdana'],
				fontTarget = $('[title=Font]').siblings('.dropdown-menu');

			$.each(fonts, function (idx, fontName)
			{
				fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
			});
			$('a[title]').tooltip({container:'body'});
			$('.dropdown-menu input').click(function() {return false;})
				.change(function ()
				{
					$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
				}).keydown('esc', function ()
					{
						this.value='';$(this).change();
					});
			$('[data-role=magic-overlay]').each(function ()
			{ 
				var overlay = $(this), target = $(overlay.data('target')); 
				overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
			});

			if ("onwebkitspeechchange"  in document.createElement("input")) 
			{
				var editorOffset = $('#editor').offset();
				//$('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
			}
			else
			{
				$('#voiceBtn').hide();
			}
		};

	initToolbarBootstrapBindings();  
	$('#editor').wysiwyg({ fileUploadError: showErrorAlert} );
	window.prettyPrint && prettyPrint();
});

function showErrorAlert (reason, detail)
{
	var msg='';
	if (reason==='unsupported-file-type')
	{
		msg = "Unsupported format " + detail;
	}
	else
	{
		console.log("error uploading file", reason, detail);
	}
	$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
		'<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
};

var slide_count = 1;
var current_slide = 1;

function nextSlide() {
	if (slide_count === current_slide) {
		$('#editor').attr('id', 's'+current_slide).hide();
		$("#template").clone().attr("id", "editor").show().appendTo( "#slides" );
		$('#editor').wysiwyg({ fileUploadError: showErrorAlert} );
		slide_count++;
		current_slide++;
	} else {
		$('#editor').attr('id', 's'+current_slide).hide();
		current_slide++;
		$('#s'+current_slide).attr('id', 'editor').show();
		$('#editor').wysiwyg({ fileUploadError: showErrorAlert} );
	}
};

function previousSlide() {
	if(current_slide !== 1){
		$('#editor').attr('id', 's'+current_slide).hide();
		current_slide--;
		$('#s'+current_slide).attr('id', 'editor').show();
		$('#editor').wysiwyg({ fileUploadError: showErrorAlert} );
	}
};
