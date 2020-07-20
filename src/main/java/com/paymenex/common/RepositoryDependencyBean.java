package com.paymenex.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Controller;

import com.paymenex.repository.UserRepository;

@Controller
public class RepositoryDependencyBean {
	
	@Autowired protected UserRepository userRepository;
	//@Autowired protected ClickRepository clickRepository;
	//@Autowired protected OrderRepository OrderRepository;
	//@Autowired protected CardPaymentRepository cardPaymentRepository;
	//@Autowired protected ProfessionalFeatureRepository professionalFeatureRepository;
	//@Autowired protected UserOderConversationRepository userOderConversationRepository;
	//@Autowired protected PaymentCredentialRepository paymentCredentialRepository;
	@Autowired @Qualifier(value="mongoTemplate") protected MongoTemplate mongoTemplate;
	
	
}
