package com.paymenex.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.paymenex.services.UserService;

@Controller
public class ServiceDependencyBean {
	
	@Autowired protected UserService userService;
	
}
