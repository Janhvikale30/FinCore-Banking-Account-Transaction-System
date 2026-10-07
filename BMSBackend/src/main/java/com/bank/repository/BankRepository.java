package com.bank.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.entity.Account;

@Repository
public interface BankRepository extends JpaRepository<Account, Integer>{
	public Optional<Account> findByUsernameAndPassword(String un, String ps);
	public Optional<Account> findByaccno(long accno);

}
