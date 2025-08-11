package com.backend.dto;

public class UserLoginResponse {
    private Long id;
    private String username;
    private String email;
    private String role;
    private boolean isAdmin;

    // Constructors
    public UserLoginResponse() {}

    public UserLoginResponse(Long id, String username, String email, String role, boolean isAdmin) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.isAdmin = isAdmin;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public boolean isIsAdmin() { return isAdmin; }
    public void setIsAdmin(boolean isAdmin) { this.isAdmin = isAdmin; }
}
