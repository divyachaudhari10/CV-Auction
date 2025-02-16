package com.CV_Auction.controllers;

import com.CV_Auction.beans.OrderRequest;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/create-order")
public class OrderGenerationController {

    @Value("${spring.razorpay.key}")
    private String key;

    @Value("${spring.razorpay.secret}")
    private String secret;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        try {
            RazorpayClient client = new RazorpayClient(key, secret);

            Map<String, Object> options = new HashMap<>();
            options.put("amount", request.getAmount());
            options.put("currency", request.getCurrency());
            options.put("receipt", "order_rcptid_" + UUID.randomUUID().toString().substring(0, 8));

            Order order = client.orders.create(new JSONObject(options));

            return ResponseEntity.ok().body(Map.of("orderId", order.get("id").toString()));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
        }
    }
}
