import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(transaction => {
      return transaction.type === 'income';
    });

    const outcomes = this.transactions.filter(transaction => {
      return transaction.type === 'outcome';
    });

    const income = incomes.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const outcome = outcomes.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const total = income - outcome;
    const balance = { income, outcome, total };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
