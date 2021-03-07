// Modal
const Modal = {
    open(){
        // Abrir modal
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close() {
        // Fechar modal
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

// Array de transacoes
const transactions = [
    {
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
    incomes(){
        // Soma das entradas
    },
    expenses(){
        // Soma das saidas
    },
    total(){
        // Entradas - Saidas
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
        const CSSclass = transaction.amount > 0 ? "income":"expense";

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
    }
}

// Funcoes uteis
const Utils = {
    // Formatacao de moeda
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-":"";

        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style:"currency",
            currency: "BRL"
        });

        return signal + value;
    }
}

// Adicao de transacoes na tabela
transactions.forEach(function (transaction){
    DOM.addTransaction(transaction);
});