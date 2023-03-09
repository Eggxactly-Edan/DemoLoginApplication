package com.edan.demologin.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edan.demologin.login.entity.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {
	Optional<UserModel> findByUserName(String userName);

	Boolean existsByUserName(String userName);

	Boolean existsByUserEmail(String userEmail);
}
