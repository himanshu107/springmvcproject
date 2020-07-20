package com.paymenex.services;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.paymenex.common.RepositoryDependencyBean;
import com.paymenex.model.User;
	@Service
	public class UserServiceImpl extends RepositoryDependencyBean implements UserService{

		public User getUserDetailsByEmail(String email) {
			Query query = new Query(Criteria.where("email").is(email));
			User user = mongoTemplate.findOne(query, User.class);
			
			return user;
		}

		public User getUserData() {
			User currentUser = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
			if(currentUser != null) {
				return currentUser;
			}else
			return null;
		}
}
	

