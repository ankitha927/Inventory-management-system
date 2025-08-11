package com.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.Product;
import com.backend.service.ProductService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService productService;

@GetMapping
public List<Product> getAll(@RequestParam String userEmail,
                            @RequestParam(required = false) String search,
                            @RequestParam(required = false) String category) {

    boolean hasSearch = search != null && !search.trim().isEmpty();
    boolean hasCategory = category != null && !category.trim().isEmpty();

    if (hasSearch && hasCategory) {
        return productService.searchByNameAndCategory(search, category, userEmail);
    } else if (hasSearch) {
        return productService.searchProductsByUser(search, userEmail);
    } else if (hasCategory) {
        return productService.filterByCategoryAndUser(category, userEmail);
    } else {
        return productService.getProductsByUser(userEmail);
    }
}

@GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

  @PostMapping
public Product create(@Valid @RequestBody Product product,
                      @RequestHeader("X-User-Email") String userEmail) {
    product.setUserEmail(userEmail); 
    return productService.createProduct(product);
}



    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @Valid @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardSummary(@RequestParam String userEmail) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalProducts", productService.getTotalCountByUser(userEmail));
        summary.put("totalQuantity", productService.getTotalQuantityByUser(userEmail));
        return summary;
    }


    @GetMapping("/user/{userId}/products")
public ResponseEntity<List<Product>> getProductsForUser(@PathVariable Long userId) {
    List<Product> products = productService.getProductsForUser(userId);
    return ResponseEntity.ok(products);
}

}
