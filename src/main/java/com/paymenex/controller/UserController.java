package com.paymenex.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.paymenex.common.ServiceDependencyBean;
import com.paymenex.model.User;


@Controller
public class UserController extends ServiceDependencyBean{

	@RequestMapping(value="/getUserByEmail",method={RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody User getUserByEmail(@RequestParam String email){
		User user = userService.getUserDetailsByEmail(email.toLowerCase());
		if(user != null) {
			user.setDumId(user.getId().toString());
			return user;
		}else
			return null;
	}
	
	@RequestMapping(value="/getUser",method={RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody User getUser(){
		User user = userService.getUserData();
		if(user != null) {
			user.setDumId(user.getId().toString());
			return user;
		}else
			return null;
	}
}
