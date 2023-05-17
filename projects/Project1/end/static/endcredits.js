/*
 * jQuery endcredits Plugin
 *
 * Copyright (c) 2014 Daniel Malkafly <malk@epichail.com>
 * Dual licensed under the MIT or GPL Version 2 licenses or later.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */
$(document).ready(function () {
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    $('#titles').css({
        'width': maskWidth,
        'height': maskHeight
    });

    $('#titles').fadeIn(1000);
    $('#titles').fadeTo("slow");
    $('#titles').fadeIn();
    $('#credits').css("left", (($('#credits').parent().width() - $('#credits').outerWidth()) / 2) + "px");
    $('#credits').css("bottom", maskHeight / 2 - 150);
    $('#credits').show('slow');

    startAnimation(maskHeight);
});

function startAnimation(maskHeight) {
    $('#credits').animate({
        bottom: maskHeight + "px"
    }, {
        duration: 30000,
        complete: function () {
            // $('#titles').fadeOut();
            // $('.window').fadeOut();
            // $('#credits').css("bottom", "-" + (maskHeight * 2) + "px");
            $('#credits').css("bottom", -300);
            startAnimation(maskHeight);
        },
        step: function (n, t) {
            var pos = $(this).position();
            console.log('X: ' + pos.left.toFixed(2) + ' Y: ' + pos.top.toFixed(2));
        }
    });
}

document.getElementById("prev_btn").addEventListener("click", function() {
    window.location.href = "../mainpage/mainpage.html";
  });

  document.getElementById("next_btn").addEventListener("click", function() {
    window.location.href = "../scroll/scroll.html";
  });