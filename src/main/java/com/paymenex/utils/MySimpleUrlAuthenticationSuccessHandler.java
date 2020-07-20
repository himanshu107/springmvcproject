package com.paymenex.utils;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.paymenex.model.User;
import com.paymenex.repository.UserRepository;

public class MySimpleUrlAuthenticationSuccessHandler implements AuthenticationSuccessHandler{
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	@Autowired protected ServletContext context;
	@Autowired public UserRepository userRepository;

	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		String targetUrl = null;

		RequestAttributes attribs = RequestContextHolder.getRequestAttributes();
		if (RequestContextHolder.getRequestAttributes() != null) {
		    request = ((ServletRequestAttributes) attribs).getRequest();
		}
		
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			 User currentUser = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());

			 if(currentUser!=null){
		    	if(currentUser.getAccess().equalsIgnoreCase("USER")){
				    targetUrl = "/userDashboardRedirect";
				}else
				
				 if(currentUser.getAccess().equalsIgnoreCase("SUPERADMIN")) { targetUrl =
				 "/superadminredirect"; }
				 
			else if(currentUser.getAccess().equalsIgnoreCase("ADMIN")) {
				targetUrl = "/adminDashboardRedirect";
			}
		    }
		} 
		redirectStrategy.sendRedirect(request, response, targetUrl);
	}
	
	public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
		this.redirectStrategy = redirectStrategy;
	}

	protected RedirectStrategy getRedirectStrategy() {
		return redirectStrategy;
	}

}