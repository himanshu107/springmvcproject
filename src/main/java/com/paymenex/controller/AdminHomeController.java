package com.paymenex.controller;

	import javax.servlet.http.HttpServletRequest;
	import org.apache.log4j.Logger;
	import org.springframework.stereotype.Controller;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestMethod;
	import org.springframework.web.bind.annotation.ResponseBody;
	import org.springframework.web.servlet.ModelAndView;

	@Controller
	public class AdminHomeController {
		
		private static final Logger logger= Logger.getLogger(AdminHomeController.class);
		
		@RequestMapping(value="/adminlogin",method={RequestMethod.GET,RequestMethod.POST})
		public ModelAndView HomePageLogin(HttpServletRequest request){
			logger.info("First Home Page - HomeController");
			ModelAndView modelAndView=new ModelAndView();
			modelAndView.setViewName("static/admin/adminindex.html");
			return modelAndView;
		}
		
		@RequestMapping(value="/adminloginhome",method={RequestMethod.GET,RequestMethod.POST})
		public ModelAndView homeLogin(){
			logger.info("Second Home Page - HomeController");
			ModelAndView modelAndView=new ModelAndView();
			modelAndView.setViewName("static/admin/adminlogin.html");
			return modelAndView;
		}              
		
		@RequestMapping(value="/adminDashboard",method={RequestMethod.GET,RequestMethod.POST})
		public ModelAndView adminDashboard(HttpServletRequest request){
			logger.info("First Home Page - DashoboardController");
			ModelAndView modelAndView=new ModelAndView();
			modelAndView.setViewName("static/admin/admindashboard.html");
			return modelAndView;
		}
		           
		@RequestMapping(value="/adminDashboardHome",method={RequestMethod.GET,RequestMethod.POST})
		public ModelAndView adminDashboardPage(){
			logger.info("Second Home Page - DashoboardController");
			ModelAndView modelAndView=new ModelAndView();
			modelAndView.setViewName("static/admin/admindashboardpage.html");
			return modelAndView;
		}
		
		@RequestMapping(value="/superadminredirect",method={RequestMethod.GET,RequestMethod.POST})
		public @ResponseBody String superadminredirect(HttpServletRequest request){
			return "./adminDashboard";
		}
		
}



