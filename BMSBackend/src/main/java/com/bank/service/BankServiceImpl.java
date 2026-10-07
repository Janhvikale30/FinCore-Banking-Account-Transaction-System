package com.bank.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.entity.Account;
import com.bank.entity.TraHistory;
import com.bank.repository.BankRepository;

import exception.AccountNotFoundException;
import exception.InsufficientBalanceException;

@Service
public class BankServiceImpl implements BankService {

	@Autowired
	BankRepository br;

	@Override
	public Account createAccount(Account a) {
		Account ac = br.save(a);
		return ac;
	}

	@Override
	public Account login(String un, String ps) {
		Account ac = br.findByUsernameAndPassword(un, ps)
				.orElseThrow(() -> new AccountNotFoundException("Invalid Username or password"));
		return ac;

	}

	@Override
	public Account viewProfile(long accno) {
		return br.findByaccno(accno).orElseThrow(() -> new AccountNotFoundException("Account not found"));

	}

	@Override
	public Double checkBalance(long accno) {
		Account ac = br.findByaccno(accno).orElseThrow(() -> new AccountNotFoundException("Account not found"));
		return ac.getBalance();
	}

	@Override
	public Account depositMoney(long accno, double amount) {
		Account account = br.findByaccno(accno).orElseThrow(() -> new AccountNotFoundException("Account not found"));

		if (amount <= 0) {
			throw new IllegalArgumentException("Deposit amount must be greater than 0");
		}

		account.setBalance(account.getBalance() + amount);

		TraHistory th = new TraHistory();
		th.setTraType("Deposit");
		th.setTraAmount(amount);
		th.setTraDate(LocalDateTime.now().toString());

		account.getTlist().add(th);

		return br.save(account);
	}

	@Override
	public Account withdrawMoney(long accno, double amount) {
		Account account = br.findByaccno(accno).orElseThrow(() -> new AccountNotFoundException("Account not found"));

		

		if (amount <= 0) {
			throw new IllegalArgumentException("Withdraw amount must me greater than 0");
		}
		if (amount > account.getBalance()) {
			throw new InsufficientBalanceException("Insufficient balance");
		}
		account.setBalance(account.getBalance() - amount);

		TraHistory th = new TraHistory();
		th.setTraType("Withdraw");
		th.setTraAmount(amount);
		th.setTraDate(LocalDateTime.now().toString());

		account.getTlist().add(th);

		return br.save(account);

	}

	@Override
	public List<TraHistory> viewTraHistory(long accno) {
		Account account = br.findByaccno(accno).orElseThrow(()-> new AccountNotFoundException("Account not found"));
		
		return account.getTlist();
	}
	@Override
	public Account getAccount(long accno) {

	    return br.findByaccno(accno)
	             .orElseThrow(() ->
	                 new AccountNotFoundException("Account not found"));
	}

}
