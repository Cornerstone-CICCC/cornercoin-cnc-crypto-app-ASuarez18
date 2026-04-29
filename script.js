/*
! Features:
- Allow multiple accounts to be created
- Each account can have many transactions
- Allow withdrawals and deposits into accounts
- Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
- Allow us to retrieve the current balance of the account at any time
- Don't allow withdrawals that exceed the remaining balance of the account
*/

// > 2. Account class
class Account {
  constructor(username, balance = 500.00) {
    this.balance = balance;
    this.username = username;
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    transaction.commit();
  }

  describe() {
    return `Account for ${this.username} has a balance of $${this.balance}. \nTransaction history: ${this.transactions}`;
  }
}

// > 4. Transaction class
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
}

class Withdrawal extends Transaction {
  commit() {
    this.account.balance -= this.amount;
  }
}

// > 1. Deposit class
class Deposit extends Transaction {
  commit() {
    this.account.balance += this.amount;
  }
}

// ` ---------------------------------
const myAccount = new Account("snow-patrol");

console.log(`Starting Balance: ${myAccount.balance}`);

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log("Transaction 1:", t1);

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log("Transaction 2:", t2);

const t3 = new Deposit(120.0, myAccount);
t3.commit();
console.log("Transaction 3:", t3);

console.log("Final Balance:", myAccount.balance);