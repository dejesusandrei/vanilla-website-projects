import { Transaction } from "../../data/transaction.js";

// get the current user from localStorage to associate transactions with the user
const saveUser = JSON.parse(localStorage.getItem('currentUser'));
let userTransaction;

if(saveUser){
    userTransaction = new Transaction(`transaction-${saveUser}`);
} else{
    window.location.href = 'login.html';
}

userTransaction.isTransactionEmpty();
console.log(saveUser);