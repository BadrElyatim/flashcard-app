const flashcard = document.querySelector('.flashcard')

function getQuestion() {
    fetch('https://quizapi.io/api/v1/questions?apiKey=RK8yv6GOoDlzMn4eVVdzY8939Kh4Dl5rInTeG50K&limit=1')
        .then(res => res.json())
        .then(([question]) => {
            document.querySelector('.question')
                .textContent = question.question

            const answer = getCorrectAnswer(question)

            document.querySelector('.answer')
                .textContent = answer

        })
        .catch(err => console.log(err))
}

function getCorrectAnswer(question) {
    if (question.correct_answer) 
        return question.answers[question.correct_answer]

    const correct_answers = Object.keys(question.correct_answers)
        .filter(q => question.correct_answers[q] === 'true')

    return correct_answers.length == 1 
        ? question.answers[correct_answers[0].replace('_correct', '')] 
        : '?'
}

function resetCard(front, back) {
    getQuestion()
    front.classList.remove('is-flipped')
    back.classList.add('is-flipped')
}

getQuestion()

flashcard.addEventListener('click', () => {
    const front = document.querySelector('.front.face')
    front.classList.add('is-flipped')
    
    const back = document.querySelector('.back.face')
    back.classList.remove('is-flipped')

    setTimeout(resetCard, 2000, front, back)
})



