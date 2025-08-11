package com.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Product;
import com.backend.entity.User;
import com.backend.repository.UserRepository;
import com.backend.service.ProductService;


@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductService productService;

    // 1. Get list of all users
    @GetMapping("/users")
    public List<String> getAllUserEmails() {
        List<User> users = userRepo.findAll();
        List<String> emails = new ArrayList<>();
        for (User user : users) {
            if (!user.getRole().equalsIgnoreCase("ADMIN")) {
                emails.add(user.getEmail());
            }
        }
        return emails;
    }

    // 2. Get products of a user
    @GetMapping("/products")
    public List<Product> getUserProducts(@RequestParam String userEmail) {
        return productService.getProductsByUser(userEmail);
    }

    // 3. Admin Dashboard Summary (global)
    @GetMapping("/dashboard")
    public Map<String, Object> getGlobalDashboard() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalProducts", productService.getTotalCount());
        summary.put("totalQuantity", productService.getTotalQuantity());
        return summary;
    }


    @PostMapping("/user/{userId}/products")
public ResponseEntity<Product> addProductForUser(@PathVariable Long userId, @RequestBody Product product) {
    Product saved = productService.addProductForUser(userId, product);
    return ResponseEntity.ok(saved);
}

}
