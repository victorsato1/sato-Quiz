const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
		{
			question: 'What is 2 + 2?',
			choice1: '2',
			choice2: '12',
			choice3: '27',
			choice4: '4',
			answer: 4,
		},
		{
			question: 'What is 4 + 4?',
			choice1: '12',
			choice2: '3',
			choice3: '8',
			choice4: '10',
			answer: 3,
		},
		{
			question: 'What is 2 x 8?',
			choice1: '4',
			choice2: '16',
			choice3: '36',
			choice4: '12',
			answer: 2,
		},
		{
			question: 'What is 2 x 2?',
			choice1: '4',
			choice2: '14',
			choice3: '19',
			choice4: '8',
			answer: 1,
		},

		{
			question: 'Who is Amospikins to us?',
			choice1: 'Enemy',
			choice2: 'Fraudster',
			choice3: 'Mentor',
			choice4: 'Professor',
			answer: 3,
		},
		{
			question: 'The name Xane in hebrew means what?',
			choice1: 'Shen',
			choice2: 'Tickle',
			choice3: 'Die',
			choice4: 'forever',
			answer: 1,
		},
		{
			question: 'Who is The founder of microsoft?',
			choice1: 'Bill gate',
			choice2: 'Micheal faraday',
			choice3: 'Guber schawezzle',
			choice4: 'Amos ruben',
			answer: 1,
		},
		{
			question: 'How many states does nigeria have?',
			choice1: '45',
			choice2: '36',
			choice3: '12',
			choice4: '42',
			answer: 2,
		},
		{
			question: 'Which of these food contains Carbohydrate?',
			choice1: 'Beans, Banana, Egg',
			choice2: 'Vegetable oil, Salt, Pear',
			choice3: 'Yam, Bread, Maize',
			choice4: 'Fish, Plaintain, Meat',
			answer: 3,
		},
		{
			question: 'Who won the 1994 africa nations cup golden boot',
			choice1: 'Kanu nwankwo',
			choice2: 'Samson siasia',
			choice3: 'Rashidi yekinni',
			choice4: 'Austin jj okocha',
			answer: 3,
		}
		
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 10

startGame = () => {
	questionCounter = 0
	score = 0
	availableQuestions = [...questions]
	getNewQuestion()
}

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score)

		return window.location.assign('end.html')
	}
	questionCounter++
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
	progressBarFull.style.width = `${(questionCounter) / (MAX_QUESTIONS) * 100}%`

	const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
	currentQuestion = availableQuestions[questionsIndex]
	question.innerText = currentQuestion.question

	choices.forEach(choice => {
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})

	availableQuestions.splice(questionsIndex, 1)

	acceptingAnswers = true
}

choices.forEach(choice => {
	choice.addEventListener('click', e => {
	if (!acceptingAnswers) return

		acceptingAnswers = false
	const selectedChoice = e.target
	const selectedAnswer = selectedChoice.dataset['number']
	
	let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

	if (classToApply === 'correct') {
		incrementScore(SCORE_POINTS)
	}

	selectedChoice.parentElement.classList.add(classToApply)

setTimeout(() => {
	selectedChoice.parentElement.classList.remove(classToApply)
	getNewQuestion()

}, 600)

	})
})

incrementScore = num => {
	score +=num
	scoreText.innerText = score
}

startGame()