class BudgetCalculator {
    constructor() {

        this.TotalIncome = []
        this.TotalExpense = []
        this.IncomeDisplay = 0
        this.ExpenseDisplay = 0
        this.percentage = 0
        this.deleteEntry;

        this.Selectors = {
            type: '[data-type]',
            save: '[data-save]',
            description: '[data-description]',
            amount: '[data-value]',
            displayInncome: '[data-showIncome]',
            displayExpense: '[data-ShowExpense]',
            masterDisplay: '[data-master]',
            percentDisplay: '[data-percent]'
        }
    }

    initializeCalculator() {

        this.type = document.querySelector(this.Selectors.type);
        this.save = document.querySelector(this.Selectors.save);
        this.description = document.querySelector(this.Selectors.description);
        this.amount = document.querySelector(this.Selectors.amount);
        this.showIncome = document.querySelector(this.Selectors.displayInncome);
        this.showExpense = document.querySelector(this.Selectors.displayExpense);
        this.mainScreen = document.querySelector(this.Selectors.masterDisplay);
        this.showPercent = document.querySelector(this.Selectors.percentDisplay);

        this.addEventListeners();
    }

    addEventListeners() {

        const mainDriver = () => {

            if (this.description.value !== "" && this.amount.value !== "" && this.amount.value < 10001) {

                if (this.type.value === "Expense") {
                    this.createNewExpenseEntry()
                    this.deleteEntry = document.querySelectorAll(".entry__delete");
                    this.totalValue(this.TotalExpense, this.ExpenseDisplay)
                    this.totalBudget()
                    if (this.IncomeDisplay !== "" && this.ExpenseDisplay !== "") return this.calculatePercent(this.IncomeDisplay, this.ExpenseDisplay)

                } else {
                    this.createNewIncomeEntry()
                    this.deleteEntry = document.querySelectorAll(".entry__delete");
                    this.totalValue(this.TotalIncome, this.IncomeDisplay)
                    this.totalBudget()
                    if (this.IncomeDisplay !== 0 && this.ExpenseDisplay !== 0) return this.calculatePercent(this.IncomeDisplay, this.ExpenseDisplay)
                }

            }



        }
        window.addEventListener('click', e => {
            if (e.target.parentNode.id === "delete") {
                const a = e.target.parentNode;
                const b = a.parentNode;
                const c = b.parentNode;
                const test = a.previousSibling.previousSibling.innerHTML.substring(2)
                const symbol = a.previousSibling.previousSibling.innerHTML.substring(0, 1)
        
                if (symbol === "+") {
                    this.IncomeDisplay = this.IncomeDisplay - test

                    this.TotalIncome = this.TotalIncome.filter(x => {
                        return x !== test
                    })
                    this.totalBudget();
                    this.showIncome.innerHTML = "+ " + this.IncomeDisplay
                    c.remove()
                    if (this.IncomeDisplay !== 0 || this.ExpenseDisplay !== 0) return this.calculatePercent(this.IncomeDisplay, this.ExpenseDisplay)
                    return this.showPercent.innerHTML = "0%"
                } else {
                    this.ExpenseDisplay = this.ExpenseDisplay - test
                    this.TotalExpense = this.TotalExpense.filter(x => {
                        return x !== test
                    })
                    this.totalBudget();
                    this.showExpense.innerHTML = "- " + this.ExpenseDisplay
                    c.remove()
                    if (this.IncomeDisplay !== 0 || this.ExpenseDisplay !== 0) return this.calculatePercent(this.IncomeDisplay, this.ExpenseDisplay)
                    return this.showPercent.innerHTML = "0%"
                }
            }
        });

        window.addEventListener('keyup', e => {
            e.keyCode === 13 && mainDriver()
        })

        this.save.addEventListener('click', mainDriver)


    }


    createNewIncomeEntry() {
        const entry = document.getElementById('income').innerHTML
        let sp1 = document.createElement("div")
        let sp2 = document.querySelector(".income__entry")
        let parentDiv = document.querySelector(".main__income")
        sp1.classList.add("income__entry")
        sp1.setAttribute('data-income', "")
        sp1.innerHTML = entry
        sp1.firstElementChild.innerHTML = this.description.value
        parentDiv.insertBefore(sp1, sp2)
        let sp3 = document.querySelector(".entry__value--income")
        sp3.innerHTML = "+ " + this.amount.value
        this.TotalIncome.push(this.amount.value)
        this.amount.value = "";
        this.description.value = ""

    }

    createNewExpenseEntry() {
        const entry = document.getElementById('expense').innerHTML
        let sp1 = document.createElement("div")
        let sp2 = document.querySelector(".expenses__entry")
        let parentDiv = document.querySelector(".main__expenses")
        sp1.classList.add("expenses__entry")
        sp1.setAttribute('data-expenses', "")
        sp1.innerHTML = entry
        sp1.firstElementChild.innerHTML = this.description.value
        parentDiv.insertBefore(sp1, sp2)
        let sp3 = document.querySelector(".entry__value--expense")
        sp3.innerHTML = "- " + this.amount.value
        this.TotalExpense.push(this.amount.value)
        this.amount.value = "";
        this.description.value = ""

    }

    totalValue(value, display) {
        if (value.length === 1) {
            display = value[0];
            if (this.type.value === "Expense") {
                this.ExpenseDisplay = display
                this.showExpense.innerHTML = "- " + this.ExpenseDisplay
            } else {
                this.IncomeDisplay = display
                this.showIncome.innerHTML = "+ " + this.IncomeDisplay
            }

        } else {
            var result = value.map(x => {
                return parseFloat(x, 10);
            });
            result.reduce((prev, now) => {
                return display = prev + now;
            });
            display.toFixed(2) % 1 > 0 ? display = display.toFixed(2) : display = display


            if (this.type.value === "Expense") {
                this.ExpenseDisplay = display
                this.showExpense.innerHTML = "- " + this.ExpenseDisplay
            } else {
                this.IncomeDisplay = display
                this.showIncome.innerHTML = "+ " + this.IncomeDisplay
            }
        }
    }

    totalBudget() {
        let x = this.IncomeDisplay - this.ExpenseDisplay
        let y = parseFloat(x)
        this.mainScreen.innerHTML = y % 1 > 0 ? y.toFixed(2) : y.toFixed()
    }

    calculatePercent(income, expanse) {
        this.percentage = (expanse / income) * 100
        if (this.percentage > 0) return this.showPercent.innerHTML = this.percentage.toFixed(2) + "%"

    }

}