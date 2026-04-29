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
  constructor(username, balance = 0) {
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

const myAccount = new Account("snow-patrol", 1000.0);
console.log(myAccount.describe());


let balance = 500.0;

class Withdrawal {
  constructor(amount) {
    this.amount = amount;
  }

  commit() {
    balance -= this.amount;
  }
}
// / --
t1 = new Withdrawal(50.25);
t1.commit();
console.log("Transaction 1:", t1);

t2 = new Withdrawal(9.99);
t2.commit();
console.log("Transaction 2:", t2);

console.log("Balance:", balance);

// > 1. Deposit class
class Deposit {
  constructor(amount) {
    this.amount = amount;
  }

  commit() {
    balance += this.amount;
  }
}

t3 = new Deposit(120.0);
t3.commit();
console.log("Transaction 3:", t3);
console.log("Balance:", balance);