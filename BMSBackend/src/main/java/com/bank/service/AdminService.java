package com.bank.service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.entity.Account;
import com.bank.repository.BankRepository;

import exception.AccountNotFoundException;

@Service
public class AdminService implements AdminServiceI {

	@Autowired
	BankRepository br;

	@Override
	public List<Account> login(String un, String ps) {
		if (un.equals("admin") && ps.equals("admin@1234")) {
			return br.findAll();
		} else {
			return null;
		}

	}

	@Override
	public Account searchcustomer(long accno) {
		Account account = br.findByaccno(accno).orElseThrow(()-> new AccountNotFoundException("Account not found"));
       
		
		return account;
	}

	@Override
	public Account viewDetails(long accno) {
		Account ac = br.findByaccno(accno).orElseThrow(()-> new AccountNotFoundException("Account not found"));
		
		
		return ac;
	}

	@Override
	public Account updateAccount(Account acc) {
		Account ac = br.findByaccno(acc.getAccno()).orElseThrow(()-> new AccountNotFoundException("Account not found"));
		
		ac.setName(acc.getName());
		ac.setDob(acc.getDob());
		ac.setContact(acc.getContact());
		ac.setAge(acc.getAge());
		ac.setGender(acc.getGender());
		ac.setAccountType(acc.getAccountType());
		return br.save(acc);
	}

}
