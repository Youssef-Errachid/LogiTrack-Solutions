package com.logitrack.logitrack.service;

import com.logitrack.logitrack.dto.request.ProductRequest;
import com.logitrack.logitrack.mapper.ProductMapper;
import com.logitrack.logitrack.model.Product;
import com.logitrack.logitrack.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getProductsByPriceLessThan(Double price) {
        return productRepository.findByPriceLessThan(price);
    }

    public List<Product> getLowStockProducts() {
        return productRepository.findLowStockProducts();
    }


    public Product updateProduct(Long id, ProductRequest request) {
        Product product = getProductById(id);
        productMapper.updateProductFromRequest(request,product);
        return productRepository.save(product);
    }
}