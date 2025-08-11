package com.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.entity.Product;
import com.backend.entity.User;
import com.backend.repository.ProductRepository;
import com.backend.repository.UserRepository;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product createProduct(Product product) {
        if (productRepository.findByName(product.getName()).isPresent()) {
            throw new RuntimeException("Product name already exists");
        }
        if (productRepository.findBySku(product.getSku()).isPresent()) {
            throw new RuntimeException("SKU already exists");
        }
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setSku(productDetails.getSku());
        product.setCategory(productDetails.getCategory());
        product.setQuantity(productDetails.getQuantity());
        product.setPrice(productDetails.getPrice());
        product.setDescription(productDetails.getDescription());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(query, query);
    }

    public List<Product> filterByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public long getTotalCount() {
        return productRepository.count();
    }

    public int getTotalQuantity() {
        return productRepository.findAll().stream().mapToInt(Product::getQuantity).sum();
    }

public List<Product> searchProductsByUser(String search, String userEmail) {
    return productRepository.findByNameContainingAndUserEmail(search, userEmail);
}

public List<Product> filterByCategoryAndUser(String category, String userEmail) {
    return productRepository.findByCategoryContainingIgnoreCaseAndUserEmail(category, userEmail);
}


public List<Product> getProductsByUser(String userEmail) {
    return productRepository.findByUserEmail(userEmail);
}

public long getTotalCountByUser(String userEmail) {
    return productRepository.countByUserEmail(userEmail);
}

public long getTotalQuantityByUser(String userEmail) {
    return productRepository.sumQuantityByUserEmail(userEmail);
}

public List<Product> searchByNameAndCategory(String name, String category, String userEmail) {
    return productRepository.findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCaseAndUserEmail(
        name, category, userEmail
    );


    

}
@Autowired
    private UserRepository userRepository;
public Product addProductForUser(Long userId, Product product) {
    User user = userRepository.findById(userId).orElseThrow();
    product.setUser(user);
    return productRepository.save(product);
}


public List<Product> getProductsForUser(Long userId) {
    User user = userRepository.findById(userId).orElseThrow();
    return productRepository.findByUser(user);
}


}
