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
  constructor(username) {
    this.username = username;
    // > 7. Transactions
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions)
      balance += transaction.value;
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
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

  // > 5. commit() method
  commit() {
    if (!this.isAllowed()) return false;

    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// > 1. Deposit class
class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

// ` ---------------------------------
const myAccount = new Account("snow-patrol");

console.log("--- Initial State ---");
console.log(`Balance: ${myAccount.balance}`);

console.log("\n--- Doing Transactions ---");
const t1 = new Deposit(100.00, myAccount);
console.log("Deposit $100:", t1.commit());

const t2 = new Withdrawal(50.00, myAccount);
console.log("Withdraw $50:", t2.commit());

const t3 = new Withdrawal(1000.00, myAccount);
console.log("Withdraw $1000 (fail):", t3.commit());

console.log("\n--- Final State ---");
console.log(`Final Balance: ${myAccount.balance}`);
console.log("Total successful transactions:", myAccount.transactions.length);