package com.bank.service;

import java.util.List;

import com.bank.entity.Account;
import com.bank.entity.TraHistory;

public interface BankService {
	public Account createAccount(Account a);
	public Account login(String un, String ps);
	public Account viewProfile(long accno);
	public Double checkBalance(long accno);
	public Account depositMoney(long accno, double amount);
	public Account withdrawMoney(long accno, double amount);
    public List<TraHistory> viewTraHistory(long accno);
	public Account getAccount(long accno);
}
