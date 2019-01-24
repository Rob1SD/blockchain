function isInstalled() {
    if (typeof web3 !== 'undefined'){
        console.log('MetaMask is installed')
    } 
    else{
        console.log('MetaMask is not installed')
    }
}

function isLocked() {
    web3.eth.getAccounts(function(err, accounts){
        if (err != null) {
            console.log(err)
        }
        else if (accounts.length === 0) {
            console.log('MetaMask is locked')
        }
        else {
            console.log('MetaMask is unlocked')
        }
    });
}

function test() {
    var abiFileContract = web3.eth.contract(votingABI);
    var fileContract = abiFileContract.at(votingAddresse);
}