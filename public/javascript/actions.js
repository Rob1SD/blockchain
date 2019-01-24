var myContract;

function getTurn() {
    return 2;
}

function getOriginelCandidates() {
    var candidates = [];
    return myContract.methods.getNumOfCandidates().call().then((result) => {
        for(var i = 1; i <= result; i++) {
            candidates.push(i);
        }
        return candidates;
    });
}

function getSecondTurnCandidates(results) {
    return getOriginelCandidates();
}

function getResultsFirstTurn() {
    return getOriginelCandidates().then((candidates) => {
        var promises = []
        for(var i = 1; i <= candidates.length; i++) {
            promises.push(myContract.methods.totalVotes(i).call());
        }
        return Promise.all(promises).then(function(values) {
            var dict = {};
            for(var j = 0; j < values.length; j++) {
                dict[j + 1] = values[j];
            }
            return dict;
        });
    });
}

function getResultsSecondTurn() {
    var resultSecond = { 2 : 20, 3 : 10 };
    return resultSecond;
}

function fillResultsFirstTurn(results) {
    var tot = 0;

    for (var property in results) {
        tot += parseInt(results[property]);
    }
    
    for (var property in results) {
        if(tot == 0 || results[property] == 0) {
            $("#firstTurn").append(`<tr><td>${property}</td><td>${results[property]}</td><td>0%</td></tr>`) 
        }
        else {
            $("#firstTurn").append(`<tr><td>${property}</td><td>${results[property]}</td><td>${results[property] * 100 / tot}%</td></tr>`)
        }
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
    for (var property in candidates) {
        $("#toVote").append(`<tr><td>${candidates[property]}</td><td><a class="btn btn-outline-info my-2 my-sm-0 votefor" role="button" onclick="vote(${candidates[property]})">vote</a></td></tr>`)
    }   
}

function addCandidate(i) {
    myContract.methods.addCandidate(i).send({ from: web3.eth.defaultAccount }).then((result) => {
        console.log(result);
    }).catch(function(err){
        console.log('err...\n'+err);
    });   
}

function vote(i) {
    myContract.methods.vote(web3.eth.defaultAccount, i).send({ from: web3.eth.defaultAccount }).then((result) => {
       console.log(result); 
    });
}

$(document).ready(function(){
    if (typeof web3 !== 'undefined') {
        web3js = new Web3(web3.currentProvider);
    } else {
        console.log("no web3js");
        return;
    }
    myContract = new web3js.eth.Contract(votingABI, contraAddresse);

    var page = $("#page").val();
    var turn = getTurn();

    switch (turn) {
        case 1:
            if (page == "vote") {
                getOriginelCandidates().then((candidates) => {
                    fillCandidates(candidates); 
                });
            }
            break;
        case 2:
            if (page == "vote") {
                getSecondTurnCandidates().then((candidates) => {
                    fillCandidates(candidates); 
                });
            }
            else if (page == "results") {
                getResultsFirstTurn().then((results) => {
                    fillResultsFirstTurn(results);
                    fillWinnerFirstTurn(results); 
                });
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
});