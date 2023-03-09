package com.edan.demologin.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.edan.demologin.login.entity.UserModel;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {
	  private static final long serialVersionUID = 1L;

	  private Long id;

	  private String userName;

	  private String userEmail;

	  @JsonIgnore
	  private String userPassword;

	  private Collection<? extends GrantedAuthority> authorities;

	  public UserDetailsImpl(Long id, String userName, String userEmail, String userPassword,
	      Collection<? extends GrantedAuthority> authorities) {
	    this.id = id;
	    this.userName = userName;
	    this.userEmail = userEmail;
	    this.userPassword = userPassword;
	    this.authorities = authorities;
	  }

	  public static UserDetailsImpl build(UserModel user) {
	    List<GrantedAuthority> authorities = user.getRoles().stream()
	        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
	        .collect(Collectors.toList());

	    return new UserDetailsImpl(
	        user.getId(), 
	        user.getUserName(), 
	        user.getUserEmail(),
	        user.getUserPassword(), 
	        authorities);
	  }

	  @Override
	  public Collection<? extends GrantedAuthority> getAuthorities() {
	    return authorities;
	  }

	  public Long getId() {
	    return id;
	  }

	  public String getEmail() {
	    return userEmail;
	  }

	  @Override
	  public String getPassword() {
	    return userPassword;
	  }

	  @Override
	  public String getUsername() {
	    return userName;
	  }

	  @Override
	  public boolean isAccountNonExpired() {
	    return true;
	  }

	  @Override
	  public boolean isAccountNonLocked() {
	    return true;
	  }

	  @Override
	  public boolean isCredentialsNonExpired() {
	    return true;
	  }

	  @Override
	  public boolean isEnabled() {
	    return true;
	  }

	  @Override
	  public boolean equals(Object o) {
	    if (this == o)
	      return true;
	    if (o == null || getClass() != o.getClass())
	      return false;
	    UserDetailsImpl user = (UserDetailsImpl) o;
	    return Objects.equals(id, user.id);
	  }
	}