package com.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bank.entity.Account;
import com.bank.entity.TraHistory;
import com.bank.service.BankServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BankController {
	
	@Autowired
	BankServiceImpl bs;
	
	@PostMapping("/bank/create")
	public Account Create(@RequestBody Account a){
		 return bs.createAccount(a);
	}
	
	@GetMapping("/bank/login/{un}/{ps}")
	public Account Login(@PathVariable String un, @PathVariable String ps) {
		return bs.login(un, ps);
	}
	
	@GetMapping("/bank/checkbalance/{accno}")
	public Double checkBalance(@PathVariable Long accno) {
		return bs.checkBalance(accno);
	}
	
	@GetMapping("/bank/deposit/{accno}/{amount}")
	public Account depositAmount(@PathVariable long accno, @PathVariable double amount) {
		return bs.depositMoney(accno, amount);
	}
	
	@GetMapping("/bank/withdraw/{accno}/{amount}")
	public Account withdrawAmount(@PathVariable long accno, @PathVariable double amount) {
		return bs.withdrawMoney(accno, amount);
	}
	
	@GetMapping("/bank/viewhistory/{accno}")
	public List<TraHistory> viewHistory(@PathVariable long accno){
		return bs.viewTraHistory(accno);
	}
	@GetMapping("/bank/account/{accno}")
	public Account getAccount(@PathVariable long accno) {
	    return bs.getAccount(accno);
	}

}
