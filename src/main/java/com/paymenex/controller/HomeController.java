package com.paymenex.controller;


import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class HomeController {

	private static final Logger logger= Logger.getLogger(HomeController.class);
	
	@RequestMapping("/")
	public ModelAndView homePage(ModelAndView mav) {
		logger.info("Home request");
		mav.setViewName("static/front/home.html");
		return mav;
	}
	
	@RequestMapping(value="/logoutFromApp",method={RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody String logout(HttpServletRequest request, HttpServletResponse response){
		logger.info("Second Home Page - HomeController");
		 Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		    if (auth != null){   
		        new SecurityContextLogoutHandler().logout(request, response, auth);
		    }
		return "logout";
	}
	
	@RequestMapping(value="/isUserAlive",method={RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody String isUserAlive(Principal principal){
		String status="";
		if(principal!=null){
			status="success";
		}else{
			status="failure";
		}
		return status;
	}
	
}
