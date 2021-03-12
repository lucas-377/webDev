// Modal
const Modal = {
    open() {
        // Abrir modal
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close() {
        // Fechar modal
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

// Transacao
const Transaction = {
    // Array de transacoes
    all: [
        {
            description: 'Luz',
            amount: 12000,
            date: '10/03/2021'
        },
        {
            description: 'Água',
            amount: 4000,
            date: '22/03/2021'
        },
        {
            description: 'Internet',
            amount: -10000,
            date: '10/03/2021'
        }
    ],

    // Adiciona transacao
    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },

    remove (index) {
        Transaction.all.splice(index, 1);

        App.reload();
    },

    incomes() {
        let income = 0;
        // Soma das entradas
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        });

        return income;
    },
    expenses() {
        let expense = 0;
        // Soma das saidas
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount
            }
        });

        return expense;
    },
    total() {
        // Entradas - Saidas
        return Transaction.incomes() + Transaction.expenses();
    }
}

// Tabela de transacoes
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction) {
        // Verifica o valor da transacao e aplica a devida classe css
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        // Aplica a formatacao de moeda
        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><i class="fas fa-minus-circle"></i></td>
        </tr>
        `

        return html;
    },

    updateBalance() {
        document.querySelector('#income-display').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.querySelector('#expense-display').innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.querySelector('#total-display').innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
}

// Funcoes uteis
const Utils = {
    // Formatacao de moeda
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        return signal + value;
    }
}

// Formulario
const Form = {
    description: document.querySelector('#description'),
    amount: document.querySelector('#amount'),
    date: document.querySelector('#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date} = Form.getValues();

        if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
            throw new Error('Por favor, preencha todos os campos!')
        }
    },

    submit(event) {
        event.preventDefault();

        // Validacao do formulario
        try {
            Form.validateFields();
        } catch (error) {
            alert(error.message);
        }
    }
}

// App
const App = {
    init() {
        // Adicao de transacoes na tabela
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction);
        });

        DOM.updateBalance();

    },
    reload() {
        DOM.clearTransactions();
        App.init();
    }
}

// Inicia a aplicacao
App.init();