package com.bank.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TraHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	   private Integer tid;  
	   //autogenerate      
	   private String traType;      
	   //deposite  or  withdraw     
	   private  Double traAmount;     
	   private String traDate;
	   
	   public Integer getTid() {
		   return tid;
	   }
	   public void setTid(Integer tid) {
		   this.tid = tid;
	   }
	   public String getTraType() {
		   return traType;
	   }
	   public void setTraType(String traType) {
		   this.traType = traType;
	   }
	   public Double getTraAmount() {
		   return traAmount;
	   }
	   public void setTraAmount(Double traAmount) {
		   this.traAmount = traAmount;
	   }
	   public String getTraDate() {
		   return traDate;
	   }
	   public void setTraDate(String traDate) {
		   this.traDate = traDate;
	   } 

}
