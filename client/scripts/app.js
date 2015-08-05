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

    // sets the number of groups to whatever was clicked.
    // clears out any names from previous runs
    // makes all groups hidden
    // removes the height attribute for the next click of random
    $('.selector').on('click', function(){
        $('.selector').removeClass('active');
        numOfGroups = $(this).data('id');
        $('.group').children().remove();
        $('.group').addClass('hide');
        $('.group').removeAttr("style");
        $(this).addClass('active');
    });

    // checks to see if a number has been clicked first
    // runs shuffle, writes a temp array
    // while there are people in the thunderdome, drop them into groups in turn
    // after each "row" is written, clear out the groupUp identifier, set the 1st group to it.
    // after all are written, set the height of all to the height of the first
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

    // array shuffler of my own making
    //
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