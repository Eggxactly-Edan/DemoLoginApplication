package com.edan.demologin.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edan.demologin.login.entity.RoleEnum;
import com.edan.demologin.login.entity.RoleModel;

@Repository
public interface RoleRepository extends JpaRepository<RoleModel, Long> {
	Optional<RoleModel> findByName(RoleEnum name);
}
