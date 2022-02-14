class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement) {  /* où s'affichera le texte */
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()  /* effacer lors d'un nouveau calcul */
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined   /* ce qui se passe quand on clique sur All Clear */
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return /* si il y a déjà un point dans le calcul on ne peut pas en remettre un */
        this.currentOperand = this.currentOperand.toString() + number.toString() /* conversion des nombres en string pour ne pas faire 1 + 1 = 11 mais 1 + 1 = 2, pour ne pas qu'il ajoute les nombres mais les calculent*/
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') { /* grâce à cette ligne, quand on fait plusieurs opérations, il calcule directement avant de passer à l'autre opération, qui sont les 3 prochaines lignes */
            this.compute()
        }
        this.operation = operation /* on tape le calcul */
        this.previousOperand = this.currentOperand /* le calcul qui était currentOperand devient previousOperand */
        this.currentOperand = '' /* on efface le currentOperand */
    }

    compute() {
        let computation /* résultat du compute */
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return /* || -> ou & isNaN -> is not */
        switch(this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ""
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
}) /* pour les nombres */

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
}) /* pour les opérations */

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
}) /* pour le signe "=" */

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
}) /* pour effacer une opération */

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
}) /* pour effacer un caractère */
