/**
 * Created by jessedavila on 11/1/16.
 */
"use strict";

var tiles = $('div.tile'),
    start = $("#start");

var game = { // game object holds most of the working game info that is needed
    userSeq: [],
    simonSeq: [],
    level: 0,
    start: false
};

start.click(function () { //makes sure the game hasn't starte yet, then begins a new game.
    if (game.start) {
        alert('game has already started');
    } else {
        game.start = true;
        start.fadeOut();
        colorTiles();
        newLevel();
        $("#status").html("");
    }
});

function colorTiles() { //turns gray tiles to colored tiles to begin the game.
    tiles.removeClass("gray");
    tiles.addClass("shadow");
}

function newLevel() { // ups level counter and resets userSeq to begin next round
    ++game.level;
    randomPad();
    game.userSeq = [];
    lightUp(game.simonSeq);
    $("#level").html("Level: " + game.level);
}

function randomPad() { //function to push a random number form 1-4 to simonSeq.
    var random = Math.floor(Math.random() * 4) + 1;
    game.simonSeq.push(random);
}

function light(tile) { //adds the lit class to tile that is pushed to it
    var $tile = $('[data-value=' + tile + ']').addClass('lit');
    playTone(tile);
    window.setTimeout(function () {
        $tile.removeClass('lit');
    }, 400);
}

function lightUp(data) { // passes each tile in simonSeq in a timed interval to light function.
    var i = 0;
    var interval = setInterval(function () {
        light(data[i]);
        i++;
        if (i >= data.length) {
            clearInterval(interval);
        }
    }, 700);
}

function playTone(tile) { //plays a tone in light function
    var audio = $('<audio autoplay></audio>');
    audio.html('<source src="data/808-Tom' + tile + '.wav" type="audio/wav">');
}

tiles.click(function () { // when tile is clicked, value is pushed to userSeq.
    if (game.start) {
        var tile = $(this).data('value');
        light(tile);
        var value = parseInt(tile);
        game.userSeq.push(value);
        compare();
    } else {
        $("#status").html("Press start");
    }
});

function compare() { //with each click of a tile, a comparison is made between both seq arrays
    if (game.userSeq.length == game.simonSeq.length) {
        if (game.userSeq[game.userSeq.length - 1] == game.simonSeq[game.simonSeq.length - 1]) {
            newLevel();
        } else if (game.userSeq[game.userSeq.length - 1] !== game.simonSeq[game.simonSeq.length - 1]) {
            youLost();
        }
    } else if (game.userSeq[game.userSeq.length - 1] !== game.simonSeq[game.userSeq.length - 1]) {
        youLost();
    }
}

function youLost() { // rest counters and allow user to start again
    $("#status").html("You Lose");
    start.fadeIn();
    game.start = false;
    game.userSeq = [];
    game.simonSeq = [];
    game.level = 0;
}

tiles.hover(
    function () {
        $(this).addClass('lit');
    },
    function () {
        $(this).removeClass('lit');
    }
);

start.hover(
    function () {
        $(this).css("opacity", ".7");
    },
    function () {
        $(this).css("opacity", "1");
    }
);


