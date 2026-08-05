
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        document.getElementById("start").click()
    }
})

function addText(text) {
    document.getElementById('debug').innerHTML += `<br /><h5 class="debugtext">${text}</h5>`

}

function Start(times) {
    
    document.getElementById('debug').innerHTML = ``
    if (times == 100) {
        addText("scroll down for debug text, JKQ are all treated as 10 in logs.")
        addText("")
    }
    if (document.getElementById('dealer').value ==  "" || (document.getElementById('player1').value == "" && document.getElementById('player2').value == "" && document.getElementById('players').value == "")){
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

    var extracards = document.getElementById('players').value.split(",")
    for (j = 0; j < extracards.length; j++) {
        if (extracards[j] == "A" || extracards[j] == "a" || extracards[j] == 1) {
            extracards[j] = 11
        }
        if (extracards[j] == "J" || extracards[j] == "Q" || extracards[j] == "K" || extracards[j] == "j" || extracards[j] == "q" || extracards[j] == "k") {
            extracards[j] = 10
        }
        extracards[j] = Number(extracards[j])
    }

    if (document.querySelector('input[name="hard"]:checked').value == 0) {var hardgoal = 0} else {
            var hardgoal = Number(document.getElementById('hardtarget').value)
    }
    if (document.querySelector('input[name="soft"]:checked').value == 0) {var softgoal = 0} else {
            var softgoal = Number(document.getElementById('softtarget').value)
    }

    var total = 0
    var tally = [0,0,0,0,0,0]
    var temp = [0,0]
    for (let i = 0; i < times; i++) {
        temp = Simulate(dealer, player1, player2, softgoal, hardgoal, times, extracards)
        total += temp [0]
        tally[temp[1]]++
    }
    if (times == 100) {
        addText("scroll down for debug text, JKQ are all treated as 10 in logs.")
    }
    document.getElementById('result').innerHTML = `<h1 style="animation: slideIn2 0.5s;">${(total/times).toFixed(4)}</h1>`
    document.getElementById('twentyone').style.width = `${tally[0]/times*100}%`
    document.getElementById('twentyone').innerHTML = `<h6 class="hovertext">${(tally[0]/times*100).toFixed(2)}% twenty-one</h6>`

    document.getElementById('dealerbust').style.width = `${tally[1]/times*100}%`
    document.getElementById('dealerbust').innerHTML = `<h6 class="hovertext">${(tally[1]/times*100).toFixed(2)}% dealer bust</h6>`

    document.getElementById('playerwin').style.width = `${tally[2]/times*100}%`
    document.getElementById('playerwin').innerHTML = `<h6 class="hovertext">${(tally[2]/times*100).toFixed(2)}% player win</h6>`

    document.getElementById('push').style.width = `${tally[3]/times*100}%`
    document.getElementById('push').innerHTML = `<h6 class="hovertext">${(tally[3]/times*100).toFixed(2)}% push</h6>`

    document.getElementById('playerlose').style.width = `${tally[4]/times*100}%`
    document.getElementById('playerlose').innerHTML = `<h6 class="hovertext">${(tally[4]/times*100).toFixed(2)}% player lose</h6>`

    document.getElementById('playerbust').style.width = `${tally[5]/times*100}%`
    document.getElementById('playerbust').innerHTML = `<h6 class="hovertext">${(tally[5]/times*100).toFixed(2)}% player bust</h6>`



}



function Simulate(dealer, player1, player2, softgoal, hardgoal, times, extracards) {
    var deck = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11]
    if (deck.indexOf(Number(dealer)) > -1) {deck.splice(deck.indexOf(Number(dealer)), 1)}

    var dealercards = [dealer]
    var playercards = [player1, player2]
    playercards = playercards.concat(extracards).filter(num => num !== 0)
    var playersum = 0
    var playersoft = 0
    //if (playersum == 22) {playersum = 12}
    //if (playersum == 21) {if (times == 100) {addText("natural 21")}; return 80}

    for (k = 0; k < playercards.length; k++) {
        if (playercards[k] == 0) {continue;}
        playersum += playercards[k]
        if (playercards[k] == 11) {playersoft ++}
        if (deck.indexOf(Number(playercards[k])) > -1) {deck.splice(deck.indexOf(Number(playercards[k])), 1)}
    }

    while (playersum > 21 && playersoft > 0) {
        playersoft --
        playersum -= 10
    }

    if (playersum > 21) {if (times == 100) {addText("player bust")}; addText("player cards: ".concat(playercards)); addText(""); return [0,5]}
    if (playersum == 21) {if (times == 100) {addText("player 21")}; addText("player cards: ".concat(playercards)); addText(""); return [80,0]}

    var dealersum = dealer
    if (dealer == 11) {var dealersoft = true} else {var dealersoft = false}
    var tempindex = 0
    var tempcard = 0
    while ((playersoft > 0 && playersum < softgoal)||(playersoft == 0 && playersum < hardgoal)) {
        tempindex = Math.floor(Math.random() * deck.length)
        tempcard = deck[tempindex]
        deck.splice(tempindex, 1); 
        playercards.push(tempcard)


        if (tempcard == 11) {
            if (playersum <= 10) {
                playersoft ++
                playersum += 11
            } else {
                playersum += 1
            }
        } else {
            playersum += tempcard
        }

        if (playersoft > 0 && playersum > 21) {
            playersoft--
            playersum -= 10
        }
        if (playersum > 21) {
            if (times == 100) {
                addText("player bust")
                addText("player cards: ".concat(playercards))
                addText("")
            }
            return [0,5]

        }
        if (playersum == 21) {
            if (times == 100) {
                addText("player 21")
                addText("player cards: ".concat(playercards))
                addText("")

            }
            return [80,0]
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
            if (times == 100) {
                addText("dealer bust")
                addText("player cards: ".concat(playercards))
                addText("dealer cards: ".concat(dealercards))
                addText("")
            }
            return [30,1]
        }
    }

    if (playersum == dealersum) {
        if (times == 100) {
            addText("push")
            addText("player cards: ".concat(playercards))
            addText("dealer cards: ".concat(dealercards))
            addText("")
        }
        return [15,3]
    }
    if (playersum < dealersum) {
        if (times == 100) {
            addText("player lose")
            addText("player cards: ".concat(playercards))
            addText("dealer cards: ".concat(dealercards))
            addText("")
        }
        return [0,4]
    }
    else {
        if (times == 100) {
            addText("player win")
            addText("player cards: ".concat(playercards))
            addText("dealer cards: ".concat(dealercards))
            addText("")
        }
        return [30,2]
    }

}