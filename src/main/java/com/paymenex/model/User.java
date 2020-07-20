package com.paymenex.model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
	public class User {
		
		@Id
		private ObjectId id;

		private String dumId;
		
		private String fullName;
		
		private String email;
		
		private String password;
		
		private String access;
		
		private Date createdDate;
		
		private String firstName;
		
		private String lastName;
		
		@Transient
		private String websiteURL;
		
		@Transient
		private long noOfClicks;
		
		@Transient
		private Double amount;
		
		@Transient
		private String dumOrderId;
		

		public ObjectId getId() {
			return id;
		}

		public void setId(ObjectId id) {
			this.id = id;
		}

		public String getDumId() {
			return dumId;
		}

		public void setDumId(String dumId) {
			this.dumId = dumId;
		}

		public String getFullName() {
			return fullName;
		}

		public void setFullName(String fullName) {
			this.fullName = fullName;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getAccess() {
			return access;
		}

		public void setAccess(String access) {
			this.access = access;
		}

		public Date getCreatedDate() {
			return createdDate;
		}

		public void setCreatedDate(Date createdDate) {
			this.createdDate = createdDate;
		}


		public String getWebsiteURL() {
			return websiteURL;
		}

		public void setWebsiteURL(String websiteURL) {
			this.websiteURL = websiteURL;
		}

		public long getNoOfClicks() {
			return noOfClicks;
		}

		public void setNoOfClicks(long noOfClicks) {
			this.noOfClicks = noOfClicks;
		}

		public Double getAmount() {
			return amount;
		}

		public void setAmount(Double amount) {
			this.amount = amount;
		}

		public String getDumOrderId() {
			return dumOrderId;
		}

		public void setDumOrderId(String dumOrderId) {
			this.dumOrderId = dumOrderId;
		}

		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		
		
	}



