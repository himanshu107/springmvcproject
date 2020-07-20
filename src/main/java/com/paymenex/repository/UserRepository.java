package com.paymenex.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.paymenex.model.User;


public interface UserRepository extends MongoRepository<User, ObjectId>{

	User findById(String userId);
	
	User findByEmail(String email);
	
	User findByEmailAndAccess(String email,String access);

	User findById(ObjectId objectId);

}
