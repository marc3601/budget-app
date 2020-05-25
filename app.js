class BudgetCalculator {
    constructor() {
        this.OperationType = []
        this.OperationDescription = []
        this.OperationIncome = []
        this.OperationExpense = []


        this.Selectors = {
            type: '[data-type]',
            save: '[data-save]',
            description: '[data-description]',
            amount: '[data-value]',
            parentI: '[data-parentI]',
            income: '[data-income]',
            parentE: '[data-parentE]',
            expenses: '[data-expenses]'

        }
    }

    initializeCalculator() {
        this.type = document.querySelector(this.Selectors.type);
        this.save = document.querySelector(this.Selectors.save);
        this.description = document.querySelector(this.Selectors.description);
        this.amount = document.querySelector(this.Selectors.amount);
        this.parentI = document.querySelector(this.Selectors.parentI);
        this.income = document.querySelector(this.Selectors.income);
        this.parentE = document.querySelector(this.Selectors.parentE);
        this.expenses = document.querySelector(this.Selectors.expenses);
        this.addEventListeners();
    }

    addEventListeners() {

        this.save.addEventListener('click', () => {
            if (this.description.value !== "" && this.amount.value !== "") {

                // this.OperationType.push(this.type.value)
                // this.OperationDescription.push(this.description.value)
                // this.type.value === "Expense" ? this.OperationExpense.push(this.amount.value) : this.OperationIncome.push(this.amount.value);
                this.createNewIncomeEntry()
            }
        })


    }

    createNewIncomeEntry() {
        const entry = document.getElementById('entry').innerHTML
                let sp1 = document.createElement("div")
                let sp2 = document.querySelector(".income__entry")
                let parentDiv = document.querySelector(".main__income")
                sp1.classList.add("income__entry")
                sp1.setAttribute('data-income',"")
                sp1.innerHTML = entry
                sp1.firstElementChild.innerHTML = this.description.value
                parentDiv.insertBefore(sp1,sp2)
    }
}