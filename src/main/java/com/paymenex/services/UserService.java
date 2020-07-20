package com.paymenex.services;

import com.paymenex.model.User;

public interface UserService {

	public User getUserDetailsByEmail(String lowerCase);

	public User getUserData();
	  
	
	  
}
