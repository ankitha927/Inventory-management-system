package com.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dto.UserLoginResponse;
import com.backend.entity.Product;
import com.backend.entity.User;
import com.backend.service.AuthService;
import com.backend.service.ProductService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") 
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        User registeredUser = authService.register(user);
        if (registeredUser == null) {
            return ResponseEntity.badRequest().body("Registration failed: Email already exists");
        }
        return ResponseEntity.ok("Registration successful");
    }

   @PostMapping("/login")
public ResponseEntity<UserLoginResponse> login(@RequestBody User user) {
    User loggedInUser = authService.login(user.getEmail(), user.getPassword());
    if (loggedInUser == null) {
        return ResponseEntity.status(401).build(); 
    }

    UserLoginResponse response = new UserLoginResponse(
        loggedInUser.getId(),
        loggedInUser.getUsername(),
        loggedInUser.getEmail(),
        loggedInUser.getRole(),
        loggedInUser.getRole().equalsIgnoreCase("ADMIN")
    );

    return ResponseEntity.ok(response);
}


@GetMapping("/users")
public ResponseEntity<?> getAllUsers() {
    List<User> users = authService.getAllUsers();
    if (users.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No users found.");
    }
    return ResponseEntity.ok(users);
}
  @Autowired
    private ProductService productService;
@GetMapping("/user/{userEmail}/products")
public ResponseEntity<List<Product>> getProductsByUser(@PathVariable String userEmail) {
    List<Product> products = productService.getProductsByUser(userEmail);
    return ResponseEntity.ok(products);
}




}