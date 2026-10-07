package com.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bank.entity.Account;
import com.bank.service.AdminService;

@RestController
public class AdminController {
	
	@Autowired
	AdminService as;
	
	@GetMapping("/admin/login/{un}/{ps}")
	public List<Account> login(@PathVariable String un, @PathVariable String ps){
		return as.login(un, ps);
	}
	
    @GetMapping("/admin/search/{accno}")
	public Account searchById(@PathVariable long accno) {
		return as.searchcustomer(accno);
	}
    
    @GetMapping("/admin/details/{accno}")
    public Account viewCustomerDetails(@PathVariable long accno) {
    	return as.viewDetails(accno);
    }
    
    @PutMapping("/admin/update")
    public Account updateAccount(@RequestBody Account account) {
    	return as.updateAccount(account);
    }

}
