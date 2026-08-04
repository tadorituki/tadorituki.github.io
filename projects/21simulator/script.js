
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        document.getElementById("start").click()
    }
})

function Start() {
    if (document.getElementById('dealer').value ==  "" || document.getElementById('player1').value == "" || document.getElementById('player2').value == ""){
        alert('at least one field is empty, the program will bug :(')
    }
    var dealer = document.getElementById('dealer').value
    if (dealer == "A" || dealer == "a" || dealer == 1) {
        dealer = 11
    }
    if (dealer == "J" || dealer == "Q" || dealer == "K" || dealer == "j" || dealer == "q" || dealer == "k") {
        dealer = 10
    }
    dealer = Number(dealer)


    var player1 = document.getElementById('player1').value
    if (player1 == "A" || player1 == "a" || player1 == 1) {
        player1 = 11
    }
    if (player1 == "J" || player1 == "Q" || player1 == "K" || player1 == "j" || player1 == "q" || player1 == "k") {
        player1 = 10
    }
    player1 = Number(player1)

    var player2 = document.getElementById('player2').value
    if (player2 == "A" || player2 == "a" || player2 == 1) {
        player2 = 11
    }
    if (player2 == "J" || player2 == "Q" || player2 == "K" || player2 == "j" || player2 == "q" || player2 == "k") {
        player2 = 10
    }
    player2 = Number(player2)


    if (document.querySelector('input[name="hard"]:checked').value == 0) {var hardgoal = 0} else {
            var hardgoal = Number(document.getElementById('hardtarget').value)
    }
    if (document.querySelector('input[name="soft"]:checked').value == 0) {var softgoal = 0} else {
            var softgoal = Number(document.getElementById('softtarget').value)
    }

    var total = 0
    for (let i = 0; i < 10000000; i++) {
        total += Simulate(dealer, player1, player2, softgoal, hardgoal)
    }
    document.getElementById('result').innerHTML = `<h1 style="animation: slideIn2 0.5s;">${(total/10000000).toFixed(4)}</h1>`


}

function Simulate(dealer, player1, player2, softgoal, hardgoal) {
    var deck = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11]
    if (deck.indexOf(Number(dealer)) > -1) {deck.splice(deck.indexOf(Number(dealer)), 1)}
    if (deck.indexOf(Number(player1)) > -1) {deck.splice(deck.indexOf(Number(player1)), 1)}
    if (deck.indexOf(Number(player2)) > -1) {deck.splice(deck.indexOf(Number(player2)), 1)}

    var dealercards = [dealer]
    var playercards = [player1, player2]
    var playersum = player1 + player2
    if (playersum == 22) {playersum = 12}
    if (player1 == 11 || player2 == 11) {var playersoft = true} else {var playersoft = false}
    var dealersum = dealer
    if (dealer == 11) {var dealersoft = true} else {var dealersoft = false}
    var tempindex = 0
    var tempcard = 0
    while ((playersoft == true && playersum < softgoal)||(playersoft == false && playersum < hardgoal)) {
        tempindex = Math.floor(Math.random() * deck.length)
        tempcard = deck[tempindex]
        deck.splice(tempindex, 1); 
        playercards.push(tempcard)


        if (tempcard == 11) {
            if (playersum <= 10) {
                playersoft = true
                playersum += 11
            } else {
                playersum += 1
            }
        } else {
            playersum += tempcard
        }

        if (playersoft == true && playersum > 21) {
            playersoft = false
            playersum -= 10
        }
        if (playersum > 21) {
            //console.log("player bust:")
            //console.log(playercards)
            return 0

        }
        if (playersum == 21) {
            //console.log("player 21:")
            //console.log(playercards)
            return 80
        }

    }

    while (dealersum < 17) {
        tempindex = Math.floor(Math.random() * deck.length)
        tempcard = deck[tempindex]
        deck.splice(tempindex, 1); 
        dealercards.push(tempcard)

        if (tempcard == 11) {
            if (dealersum <= 10) {
                dealersoft = true
                dealersum += 11
            } else {
                dealersum += 1
            }
        } else {
            dealersum += tempcard
        }

        if (dealersoft == true && dealersum > 21) {
            dealersoft = false
            dealersum -= 10
        }
        if (dealersum > 21) {
            //console.log("dealer bust:")
            //console.log(playercards)
            //console.log(dealercards)
            return 30
        }
    }

    if (playersum == dealersum) {
        //console.log("push:")
        //console.log(playercards)
        //console.log(dealercards)
        return 15
    }
    if (playersum < dealersum) {
        //console.log("player lose:")
        //console.log(playercards)
        //console.log(dealercards)
        return 0
    }
    else {
        //console.log("player win:")
        //console.log(playercards)
        //console.log(dealercards)
        return 30
    }

}