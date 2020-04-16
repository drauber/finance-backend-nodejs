import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Transaction type is one of <income | outcome>');
    }
    if (type === 'outcome') {
      const saldo = this.transactionsRepository.getBalance().total - value;
      if (saldo < 0) {
        throw Error(
          `Balance cannot be negative! With this launch I would be ${saldo}`,
        );
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
