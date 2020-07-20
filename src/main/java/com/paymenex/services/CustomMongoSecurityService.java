package com.paymenex.services;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.paymenex.model.User;
import com.paymenex.repository.UserRepository;

/**
 * Authentication of the user by checking is the user existed in database or not with the help of Spring security framework.
 * @author KesavuluReddy
 *
 */
@Service()
public class CustomMongoSecurityService implements UserDetailsService {
	
	@Autowired UserRepository userRepository;

	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);
		if (user == null){
			 throw new UsernameNotFoundException("No User Exist With This Username");
		 }
		 
	    Collection<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getAccess());
        grantedAuthorities.add(grantedAuthority);
	        
	    return new org.springframework.security.core.userdetails.User(email, user.getPassword(),grantedAuthorities);
	}
	
	
}
