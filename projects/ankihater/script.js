var array = [] 

function displayFile(input) {
    const file = input.files[0];
    document.getElementById('display').innerHTML = `<h3>using deck: ${file.name}</h3>`;
    placeFileContent(document.getElementById('content-target'),input.files[0])
    
}

function loadFile(input) {
    var deck = document.getElementById('content-target').value;

    array = deck.split('\n')
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].split(',')
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
            response += '✕'
        }
    }

    if(array[0][2] == document.getElementById('answer').value) {
        array.push(array.shift())
        questionUpdate()
        console.log('yay')
        document.getElementById('answer').value = ''
    }
    
    console.log(response)
    document.getElementById('question-response').innerHTML = `<h1>${response}</h1>`


}

function questionUpdate() {
    document.getElementById('question-text').innerHTML = `<h1>${array[0][1]}</h1>`
}