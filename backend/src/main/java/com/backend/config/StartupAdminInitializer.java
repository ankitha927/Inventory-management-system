package com.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.backend.entity.User;
import com.backend.repository.UserRepository;

@Component
public class StartupAdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@gmail.com";

        if (userRepo.findByEmail(adminEmail) == null) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123")); // You can change this
            admin.setRole("ADMIN");

            userRepo.save(admin);
            System.out.println(" Default admin created: " + adminEmail);
        } else {
            System.out.println("ℹ Admin already exists: " + adminEmail);
        }
    }
}
