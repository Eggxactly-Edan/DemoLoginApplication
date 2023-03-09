package com.edan.demologin.payload.response;

import java.util.List;

public class JwtResponse {
	  private String token;
	  private String type = "Bearer";
	  private Long id;
	  private String userName;
	  private String userEmail;
	  private List<String> userRoles;

	  public JwtResponse(String accessToken, Long id, String userName, String userEmail, List<String> userRoles) {
	    this.token = accessToken;
	    this.id = id;
	    this.userName = userName;
	    this.userEmail = userEmail;
	    this.userRoles = userRoles;
	  }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public List<String> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(List<String> userRoles) {
		this.userRoles = userRoles;
	}

	 
	}
