package com.bank.service;

import java.util.List;

import com.bank.entity.Account;

public interface AdminServiceI {
	public List<Account> login(String un, String password);
	public Account searchcustomer(long accno);
    public Account viewDetails(long accno);
    public Account updateAccount(Account ac);
}
