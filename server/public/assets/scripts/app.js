$(document).ready(function (){
    var names = [];
    var numOfGroups = 0;
    var heightOf1 = 0;

    $.ajax({
        url: '/data',
        success: function(data){
            names = $.makeArray(data);
            names.shift();
            console.log(names);
        }
    }); //ajax call

    $('.selector').on('click', function(){
        numOfGroups = $(this).data('id');
        $('.group').children().remove();
        $('.group').addClass('hide');
        $('.group').removeAttr("style");
    });

    $('.randomizer').on('click', function(){
        if (numOfGroups == 0){
            alert("Please select a number of groups.");
        } else {
            superArrayShuffle(names);
            var thunderDome = names.slice();
            while (thunderDome.length > 0) {
                for (var j = numOfGroups; j > 0 && thunderDome.length > 0; j--) {
                    var currentGroup = $('.groupUp');
                    var nextGroup = currentGroup.next();
                    currentGroup.removeClass('hide').append('<div class="person"><br>' + thunderDome.pop() + '</div>');
                    nextGroup.addClass('groupUp');
                    currentGroup.removeClass('groupUp');
                }
                $('.results').contents().removeClass('groupUp');
                $('.group').first().addClass('groupUp');
            }
            heightOf1 = $('.group').first().css('height');

            $('.group').css("height", heightOf1);
            console.log("css.('height of 1') " + heightOf1);
        }
    });

    function superArrayShuffle(array){
        console.log(array);
        var numToShuffle = array.length;
        var shuffled = [];
        for (var i = numToShuffle; i > 0; i--){
            var index = Math.floor(Math.random() * i);
            var target = array[index];
            shuffled.unshift(target);
            array.splice(index, 1);
        }
        names = shuffled;
    }

}); //doc ready