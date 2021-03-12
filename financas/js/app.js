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

// Array de transacoes
const transactions = [{
        id: 1,
        description: 'Luz',
        amount: 12000,
        date: '10/03/2021'
    },
    {
        id: 2,
        description: 'Água',
        amount: 4000,
        date: '22/03/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: 10000,
        date: '10/03/2021'
    }
]

// Transacao
const Transaction = {
    // Capta as transacoes do objeto
    all: transactions,

    // Adiciona transacao
    add(transaction) {
        Transaction.all.push(transaction);

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
        App.init();
    }
}

// Inicia a aplicacao
App.init();