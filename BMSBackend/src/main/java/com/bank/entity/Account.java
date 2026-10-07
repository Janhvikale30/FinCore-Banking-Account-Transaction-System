package com.bank.entity;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Integer id;      
	 private Long accno; 
	 private String name;
	
	 private String dob;     
	 private Long contact;     
	 private int age;     
	 private String gender;     
	 private String accountType;     
	 //saving  or  current     
	 private Double balance;
	 private String username;
	 private String password;
	 
	 public String getUsername() {
		return username;
	}
	 public void setUsername(String username) {
		 this.username = username;
	 }
	 public String getPassword() {
		 return password;
	 }
	 public void setPassword(String password) {
		 this.password = password;
	 }
	 @OneToMany(cascade = CascadeType.ALL)
	 private List<TraHistory> tlist = new ArrayList<TraHistory>();
	 
	 public Integer getId() {
		 return id;
	 }
	 public void setId(Integer id) {
		 this.id = id;
	 }
	 public Long getAccno() {
		 return accno;
	 }
	 public void setAccno(Long accno) {
		 this.accno = accno;
	 }
	 public String getDob() {
		 return dob;
	 }
	 public void setDob(String dob) {
		 this.dob = dob;
	 }
	 public Long getContact() {
		 return contact;
	 }
	 public void setContact(Long contact) {
		 this.contact = contact;
	 }
	 public int getAge() {
		 return age;
	 }
	 public void setAge(int age) {
		 this.age = age;
	 }
	 public String getGender() {
		 return gender;
	 }
	 public void setGender(String gender) {
		 this.gender = gender;
	 }
	 public String getAccountType() {
		 return accountType;
	 }
	 public void setAccountType(String accountType) {
		 this.accountType = accountType;
	 }
	 public Double getBalance() {
		 return balance;
	 }
	 public void setBalance(Double balance) {
		 this.balance = balance;
	 } 
	 public String getName() {
			return name;
		}
		 public void setName(String name) {
			 this.name = name;
		 }
		 public List<TraHistory> getTlist() {
			 return tlist;
		 }
		 public void setTlist(List<TraHistory> tlist) {
			 this.tlist = tlist;
		 }
		
}
