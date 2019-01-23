function getTurn() {
    return 3;
}

function getOriginelCandidates() {
    var candidates = [1, 2, 3, 4];
    return candidates;
}

function getSecondTurnCandidates(results) {
    var candidates = [2, 3];
    return candidates;
}

function getResultsFirstTurn() {
    var resultFirst = { 1 : 1, 2 : 40, 3: 20, 4 : 1 };
    return resultFirst;
}

function getResultsSecondTurn() {
    var resultSecond = { 2 : 20, 3 : 10 };
    return resultSecond;
}

function fillResultsFirstTurn(results) {
    var tot = 0;

    for (var property in results) {
        tot += results[property];
    }

    for (var property in results) {
        $("#firstTurn").append(`<tr><td>${property}</td><td>${results[property]}</td><td>${results[property] * 100 / tot}</td></tr>`)
    }
}

function fillWinnerFirstTurn(results) {
    var winnerStr = ""

    for (var property in results) {
        if (results[property] >= 50){
            document.getElementById("winnerFirst").innerHTML = `Le gagnant est ${property}`;
            return;
        }
        else if (results[property] > 5) {
            winnerStr += property;
            winnerStr += ", ";
        }
    }

    winnerStr = winnerStr.substring(0, winnerStr.length-2);

    document.getElementById("winnerFirst").innerHTML = `Les gagnants du premier tour sont ${winnerStr}`;
}

function fillWinnerSecondTurn(results) {
    var winnerStr = ""
    var winnerMax = 0

    for (var property in results) {
        if(results[property] > winnerMax) {
            winnerStr = property;
            winnerMax = results[property];
        }
    }

    document.getElementById("winnerSecond").innerHTML = `Le gagnant du second tour est ${winnerStr}`;
}

function fillResultsSecondTurn(results) {
    var tot = 0;

    for (var property in results) {
        tot += results[property];
    }

    for (var property in results) {
        $("#secondTurn").append(`<tr><td>${property}</td><td>${results[property]}</td><td>${results[property] * 100 / tot}</td></tr>`)
    }
}

function fillCandidates(candidates) {
    console.log(candidates);
    for (var property in candidates) {
        $("#toVote").append(`<tr><td>${property}</td><td><a name="votefor-${property}" class="btn btn-outline-info my-2 my-sm-0 votefor"  role="button">vote</a></td></tr>`)
    }   
}

$(document).ready(function(){
    var page = $("#page").val();
    var turn = getTurn();

    switch (turn) {
        case 1:
            if (page == "vote") {
                var candidates = getOriginelCandidates();
                fillCandidates(candidates);
            }
            break;
        case 2:
            if (page == "vote") {
                var candidates = getSecondTurnCandidates();
                fillCandidates(candidates);
            }
            else if (page == "results") {
                var results = getResultsFirstTurn();
                fillResultsFirstTurn(results);
                fillWinnerFirstTurn(results);
            }
            break;
        case 3:
            if (page == "results") {
                var results1 = getResultsFirstTurn();
                fillResultsFirstTurn(results1);
                fillWinnerFirstTurn(results1);
                var results2 = getResultsSecondTurn();
                fillResultsSecondTurn(results2);
                fillWinnerSecondTurn(results2);
            }
            break;
    }

    $(".votefor").click(function(){
        var voted = $(this)[0].name.split('-')[1];
        console.log(voted);
    });
});