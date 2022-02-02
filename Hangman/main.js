//All elements needed
const btnStart = document.querySelector("#btnStart");
const letter = document.querySelector("#letter");
const submitLetter = document.querySelector("#submit");
const letterMsg = document.querySelector(".msg");
const solution = document.querySelector("#solution");
const mainDiv = document.querySelector(".main");
const stallPic = document.querySelector("#stall");
const resetBtn = document.querySelector("#resetBtn");
const showVowelsBtn = document.querySelector("#showVowelsBtn");
const msgUsed = document.querySelector(".msgUsed");

//Hangman picture
let img = document.createElement("img");
img.className = "img";
img.src = "imgs/stall.jpg";
mainDiv.appendChild(img);

//Letters used
const usedLetters = document.createTextNode("Letters used so far: ");
const lettersUsed = document.createElement("div");
mainDiv.insertBefore(lettersUsed, showVowelsBtn);
lettersUsed.className = "lettersUsed";
lettersUsed.appendChild(usedLetters);
lettersUsed.style.visibility = "hidden";

//Array for inputting letters already checked
let checkLetter = [];

//Words in the game. Randomly chosen for each game. 
const wordArray = ["pear", "apple", "banana", "strawberry", "plum", "grape", "lemon", "orange", "kiwi", "blueberry", "coconut", "currant", "mango", "tangerine"];
const chosenWordIndex = Math.floor(Math.random() * wordArray.length);
const chosenWord = wordArray[chosenWordIndex];


let wrongWordCount = 0;
const vowelArray = ["a", "e", "i", "o", "u"];
let vowelsShown = 0;

//Function from: https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt=function(index, character) {
    return this.substring(0, index) + character + this.substring(index+character.length);
 }

submitLetter.addEventListener("click", letterSubmit);
btnStart.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
showVowelsBtn.addEventListener("click", showVowels);

//When start game is clicked
function startGame(){
    btnStart.style.visibility = "hidden";
    letter.style.visibility = "visible";
    submitLetter.style.visibility = "visible";
    letterMsg.style.visibility = "visible";
    showVowelsBtn.style.visibility = "visible";
    lettersUsed.style.visibility = "visible";

    solution.value = "#".repeat(chosenWord.length);
    solution.style.visibility = "visible";
}

//When a letter is submitted
function letterSubmit(){
    if(/[0-9]/.test(letter.value)){
        msgUsed.style.visibility = "visible";
        msgUsed.innerHTML = "Number cannot be used!";
        setTimeout(function(){ msgUsed.innerHTML = ""; }, 1500);
    }

    else if(letter.value.length > 1 || letter.value.length < 1){
        msgUsed.style.visibility = "visible";
        msgUsed.innerHTML = "Please enter only one letter!"
        setTimeout(function(){ msgUsed.innerHTML = ""; }, 1500);
    }

    else if(checkLetter.includes(letter.value.toLowerCase())){
        msgUsed.style.visibility = "visible";
        msgUsed.innerHTML = "You already used that letter!"
        setTimeout(function(){ msgUsed.innerHTML = ""; }, 1500);
    }

    else if(chosenWord.includes(letter.value.toLowerCase())){
        checkLetter.push(letter.value.toLowerCase());
        lettersUsed.append(`${letter.value}, `);
        for(var i=0; i<chosenWord.length; i++){
            if(chosenWord[i] == letter.value.toLowerCase()){
                console.log("Letter guessed");
                solution.value = solution.value.replaceAt(i, letter.value.toLowerCase());
            }
        }
        if(wordArray.includes(solution.value)){
            alert("You won!");
            letter.remove();
            showVowelsBtn.remove();
            submitLetter.remove();
            resetBtn.style.visibility = "visible";
        }
    }
    
    else{
        checkLetter.push(letter.value.toLowerCase());
        lettersUsed.append(`${letter.value}, `);
        console.log("Letter not guessed!");
        wrongWordCount++;
        if(wrongWordCount == 1){
            img.src = "imgs/head.jpg";
        }
        else if(wrongWordCount == 2){
            img.src = "imgs/body.jpg";
        }
        else if(wrongWordCount == 3){
            img.src = "imgs/larm.jpg";
        }
        else if(wrongWordCount == 4){
            img.src = "imgs/rarm.jpg";
        }
        else if(wrongWordCount == 5){
            img.src = "imgs/lleg.jpg";
        }
        else if(wrongWordCount == 6){
            img.src = "imgs/rleg.jpg";
            alert("You lost the game!");
            letter.remove();
            showVowelsBtn.remove();
            submitLetter.remove();
            resetBtn.style.visibility = "visible";
        }
    }
}

//Reset clicked
function resetGame(){
    location.reload();
}

//Show vowels button clicked
function showVowels(){
    if(vowelsShown == 0){
        if(vowelArray.some(v => chosenWord.includes(v))){
            for(var i=0; i<chosenWord.length; i++){
                for(var j=0; j<vowelArray.length;j++){
                    if(chosenWord[i] == vowelArray[j]){
                        solution.value = solution.value.replaceAt(i, vowelArray[j]);
                    }
                }
            }
        }

        vowelArray.forEach(v=> {
            if(!checkLetter.includes(v)){
                 checkLetter.push(v);
                 lettersUsed.append(`${v}, `);
            }
        });
        vowelsShown = 1;
    }
}
