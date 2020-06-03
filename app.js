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
            percentDisplay: '[data-percent]',
            monthDisplay: '[data-month]'
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
        this.showDate = document.querySelector(this.Selectors.monthDisplay);

        this.addEventListeners();
        this.showMonth()
    }

    addEventListeners() {

        const mainDriver = () => {
            
            if (this.description.value !== "" && this.amount.value !== "" && this.amount.value < 10001) {

                if (this.type.value === "Expense") {
                    if (this.amount.value.charAt(0) === "+") this.amount.value = this.amount.value.replace("+", '')
                    if (this.amount.value.charAt(0) === "-") this.amount.value = this.amount.value.replace("-", '')
                    this.createNewEntry('expense', ".expenses__entry", ".main__expenses", 'data-expenses', ".entry__value--expense", "- ", this.TotalExpense, )
                    this.deleteEntry = document.querySelectorAll(".entry__delete");
                    this.totalValue(this.TotalExpense, this.ExpenseDisplay)
                    this.totalBudget()
                    if (this.IncomeDisplay !== "" && this.ExpenseDisplay !== "") return this.calculatePercent(this.IncomeDisplay, this.ExpenseDisplay)

                } else {
                    if (this.amount.value.charAt(0) === "+") this.amount.value = this.amount.value.replace("+", '')
                    if (this.amount.value.charAt(0) === "-") this.amount.value = this.amount.value.replace("-", '')
                    this.createNewEntry('income', ".income__entry", ".main__income", 'data-income', ".entry__value--income", "+ ", this.TotalIncome, )
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
                    this.showIncome.innerHTML = "+ " + this.IncomeDisplay % 1 > 0 ? this.IncomeDisplay.toFixed(2) : this.IncomeDisplay.toFixed()
                    c.remove()
                    if (this.IncomeDisplay !== 0 || this.ExpenseDisplay !== 0) return this.calculatePercent(this.IncomeDisplay, this.ExpenseDisplay)
                    return this.showPercent.innerHTML = "0%"
                } else {
                    this.ExpenseDisplay = this.ExpenseDisplay - test
                    this.TotalExpense = this.TotalExpense.filter(x => {
                        return x !== test
                    })
                    this.totalBudget();
                    this.showExpense.innerHTML = "- " + this.ExpenseDisplay % 1 > 0 ? this.ExpenseDisplay.toFixed(2) : this.ExpenseDisplay.toFixed()
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

    createNewEntry(clas1, clas2, clas3, clas4, clas5, symbol, type) {
        const entry = document.getElementById(clas1).innerHTML
        let sp1 = document.createElement("div")
        let sp2 = document.querySelector(clas2)
        let parentDiv = document.querySelector(clas3)
        sp1.classList.add(clas2.substring(1))
        sp1.setAttribute(clas4, "")
        sp1.innerHTML = entry
        sp1.firstElementChild.innerHTML = this.description.value
        parentDiv.insertBefore(sp1, sp2)
        let sp3 = document.querySelector(clas5)
        sp3.innerHTML = symbol + this.amount.value
        type.push(this.amount.value)
        this.amount.value = "";
        this.description.value = ""
    }

    totalValue(value, display) {
        const chooseSymbol = () => {
            if (this.type.value === "Expense") {
                this.ExpenseDisplay = display
                this.ExpenseDisplay > 0 ? this.showExpense.innerHTML = "- " + this.ExpenseDisplay : this.showExpense.innerHTML = this.ExpenseDisplay;
            } else {
                this.IncomeDisplay = display
                this.IncomeDisplay > 0 ? this.showIncome.innerHTML = "+ " + this.IncomeDisplay : this.showIncome.innerHTML = this.IncomeDisplay;
            }
        }

        if (value.length === 1) {
            display = value[0];
            chooseSymbol()

        } else {
            var result = value.map(x => {
                return parseFloat(x, 10);
            });
            result.reduce((prev, now) => {
                return display = prev + now;
            });
            display.toFixed(2) % 1 > 0 ? display = display.toFixed(2) : display = display

            chooseSymbol()
        }
    }

    totalBudget() {
        let x = this.IncomeDisplay - this.ExpenseDisplay
        let y = parseFloat(x)
        this.mainScreen.innerHTML = y % 1 > 0 ? y.toFixed(2) : y.toFixed()
    }

    calculatePercent(income, expanse) {
        expanse < 0 ? expanse = 0 : null;
        if (income === 0 && expanse === 0) {
            income = 0;
            expanse = 0
        }
        this.percentage = (expanse / income) * 100
        if (this.percentage > 0) return this.showPercent.innerHTML = this.percentage.toFixed(2) + "%"
    }

    showMonth() {
        const months = ['Styczniu','Lutym','Marcu','Kwietniu','Maju','Czerwcu','Lipcu','Sierpniu','Wrześniu','Październiku','Listopadzie','Grudniu']
        const date = new Date().getMonth()     
        this.showDate.innerHTML = months[date]
    }

}