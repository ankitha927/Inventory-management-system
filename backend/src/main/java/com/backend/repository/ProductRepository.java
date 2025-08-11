package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entity.Product;
import com.backend.entity.User;


public interface ProductRepository extends JpaRepository<Product, Long> {
    
    

    Optional<Product> findByName(String name);
    Optional<Product> findBySku(String sku);

    List<Product> findByCategory(String category);
    List<Product> findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(String name, String sku);
   
     List<Product> findByUserEmail(String userEmail);

    List<Product> findByNameContainingAndUserEmail(String name, String userEmail);

    List<Product> findByCategoryAndUserEmail(String category, String userEmail);

    long countByUserEmail(String userEmail);

    @Query("SELECT SUM(p.quantity) FROM Product p WHERE p.userEmail = :userEmail")
    Long sumQuantityByUserEmail(@Param("userEmail") String userEmail);
    

    List<Product> findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCaseAndUserEmail(
    String name, String category, String userEmail
);

List<Product> findByCategoryContainingIgnoreCaseAndUserEmail(String category, String userEmail);

List<Product> findByUser(User user);
}
