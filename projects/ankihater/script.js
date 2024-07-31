var array = [] 
var kana = 0
var kanji = 0
var definition = 0

function displayFile(input) {
    const file = input.files[0];
    document.getElementById('display').innerHTML = `<h3>     using deck: ${file.name}</h3>`;
    placeFileContent(document.getElementById('content-target'),input.files[0])
    
}

function loadFile(input) {
    var deck = document.getElementById('content-target').value;

    array = deck.split('\n')
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].split('\t')
    }
    console.log(array)
    array.shift()
    startQuiz()
}

function placeFileContent(target, file) {
    readFileContent(file).then(content => {
     	target.value = content
    }).catch(error => console.log(error))
}

function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
    })
}

function startQuiz() {
    document.getElementById('setup').innerHTML = `<input type="text" id="answer" autocomplete="off">`;
    document.getElementById('question-title').innerHTML = ``;
    questionUpdate()
    document.getElementById('answer').addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkAnswer();
        }
    })

}

function checkAnswer() {
    var response = ''
    var temp = array[0][2].split('')
    var temp_answer =  document.getElementById('answer').value.split('');
    
    for(let i = 0; i < Math.min(temp.length,temp_answer.length); i++) {
        if(temp[i] == temp_answer[i]) {
            response = response + '◯'
        } else {
            response += '×'
        }
    }
    response += '×'.repeat(Math.max(0, temp.length-temp_answer.length))


    if(array[0][2] == document.getElementById('answer').value) {
        document.getElementById('previous').innerHTML = `<h4>${array[0][1]}</h4>`
        document.getElementById('previous2').innerHTML = `<h4>${array[0][2]}</h4>`
        document.getElementById('previous3').innerHTML = `<h4 style="transform: translate(-100%, 0);">${array[0][4]}\n${array[0][3]}</h4>`
        array.push(array.shift())
        questionUpdate()
        console.log('yay')
        document.getElementById('question-response').innerHTML = `<h1></h1>`
        onCorrect()
        document.getElementById('answer').value = ''
        return
    }
    
    console.log(response)
    document.getElementById('question-response').innerHTML = `<h1>${response}</h1>`
    onWrong()

}

function questionUpdate() {
    document.getElementById('question-text').innerHTML = `<h1>${array[0][1]}</h1>`
    document.getElementById('question-response').innerHTML = `<h1></h1>`
}



function triggerNext() {
    console.log('a')
    document.getElementById('previous').innerHTML = `<h4>${array[0][1]}</h4>`
    document.getElementById('previous2').innerHTML = `<h4>${array[0][2]}</h4>`
    document.getElementById('previous3').innerHTML = `<h4 style="transform: translate(-100%, 0);">${array[0][4]}\n${array[0][3]}</h4>`
    
    document.getElementById('question-response').innerHTML = `<h1>${array[0][2]}</h1>`
    array.push(array.shift())
    console.log('bruh')
    document.getElementById('answer').value = ''

    setTimeout(() => {
        document.getElementById('question-text').innerHTML = `<h1></h1>`
        document.getElementById('question-response').innerHTML = `<h1></h1>`
        setTimeout(() => {
            questionUpdate()
        }, 400);
    }, 1400);

    
    return
}

