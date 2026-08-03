package com.logitrack.logitrack.controller;

import com.logitrack.logitrack.dto.request.ProductRequest;
import com.logitrack.logitrack.dto.response.ProductResponse;
import com.logitrack.logitrack.mapper.ProductMapper;
import com.logitrack.logitrack.model.Product;
import com.logitrack.logitrack.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    public ProductController(ProductService productService, ProductMapper productMapper) {

        this.productService = productService;
        this.productMapper = productMapper;
    }

    @PostMapping
    public ResponseEntity<ProductResponse> addProduct(@RequestBody ProductRequest request) {
        Product product  = productMapper.toEntity(request);
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(productMapper.toResponse(savedProduct));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(productMapper.toResponseList(products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(productMapper.toResponse(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponse>> getByCategory(@PathVariable String category) {
        List<Product> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(productMapper.toResponseList(products));    }

    @GetMapping("/price/{price}")
    public ResponseEntity<List<ProductResponse>> getByPriceLessThan(@PathVariable Double price) {
        List<Product> products = productService.getProductsByPriceLessThan(price);
        return ResponseEntity.ok(productMapper.toResponseList(products));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductResponse>> getLowStock() {
        List<Product> products = productService.getLowStockProducts();
        return ResponseEntity.ok(productMapper.toResponseList(products));
    }
}