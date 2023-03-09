package com.edan.demologin.login.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Table(name = "T_USERS", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "userName"),
      @UniqueConstraint(columnNames = "userEmail") 
    })
public class UserModel {
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Long id;

	  @NotBlank
	  @Size(max = 20)
	  private String userName;

	  @NotBlank
	  @Size(max = 50)
	  @Email
	  private String userEmail;

	  @NotBlank
	  @Size(max = 120)
	  private String userPassword;

	  @ManyToMany(fetch = FetchType.LAZY)
	  @JoinTable(  name = "T_USER_ROLES", 
	        joinColumns = @JoinColumn(name = "user_id"), 
	        inverseJoinColumns = @JoinColumn(name = "role_id"))
	  private Set<RoleModel> userRoles = new HashSet<>();

	  public UserModel() {
	  }

	  public UserModel(String userName, String userEmail, String userPassword) {
	    this.userName = userName;
	    this.userEmail = userEmail;
	    this.userPassword = userPassword;
	  }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public Set<RoleModel> getRoles() {
		return userRoles;
	}

	public void setRoles(Set<RoleModel> userRoles) {
		this.userRoles = userRoles;
	}

	  

}
