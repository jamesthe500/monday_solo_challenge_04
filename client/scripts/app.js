var names = [];
var numOfGroups = 0;
var heightOf1 = 0;

$.ajax({
    url: '/data',
    success: function(data){
        names = $.makeArray(data);
        names.shift();
    }
}); //ajax call

// array shuffler of my own making
function superArrayShuffle(array){
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

$(document).ready(function (){
    // checks to see if a number has been clicked first
    // runs shuffle, writes a temp array
    // while there are people in the thunderdome, drop them into groups in turn
    // after each "row" is written, clear out the groupUp identifier, set the 1st group to it.
    $('.randomizer').on('click', function(){
        if (numOfGroups == 0){
            alert("Please select a number of groups.");
        } else {
            superArrayShuffle(names);
            var thunderDome = names.slice();
            var k = 0;
            while (thunderDome.length > 0) {
                // does a single pass of names to each group per iteration
                for (var j = numOfGroups; j > 0 && thunderDome.length > 0; j--) {
                    var currentGroup = $('.groupUp');
                    var nextGroup = currentGroup.next();
                    currentGroup.removeClass('hide').append('<div class="person"><br>' + thunderDome.pop() + '</div>');
                    currentGroup.children().last().hide().delay(k * 200).slideDown(200);
                    nextGroup.addClass('groupUp');
                    currentGroup.removeClass('groupUp');
                    k++;
                }
                // resets in preparation for the next pass of name distribution.
                $('.results').contents().removeClass('groupUp');
                $('.group').first().addClass('groupUp');
            }
            // sets height of groups to the height needed to accommodate the largest group(s) at this font size.
            heightOf1 = 56 + Math.ceil((names.length/numOfGroups)*50.9);
            $('.group').css("height", heightOf1 + "px");
        }
    });

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
}); //doc ready