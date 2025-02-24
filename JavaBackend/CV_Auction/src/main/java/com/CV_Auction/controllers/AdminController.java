package com.CV_Auction.controllers;

import com.CV_Auction.beans.Admin;
import com.CV_Auction.services.AdmminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdmminService admminService;

    @GetMapping
    public ResponseEntity<?> getAdmins(){
        List<Admin> admins = admminService.getAll();
        if(admins == null){
            return new ResponseEntity<>("No admin found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admins,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addAdmin(@RequestBody Admin request){
        System.out.println(request.getEmail());
        System.out.println(request.getName());
        System.out.println(request.getPassword());
        Admin admin = admminService.saveAddmin(request);
        if(admin == null){
            return new ResponseEntity<>("Unable to add admin", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admin,HttpStatus.OK);
    }

    @PutMapping("/{aid}")
    public ResponseEntity<?> update(@PathVariable int aid,@RequestBody Admin request){
        Admin admin = admminService.updateAdmin(aid,request);
        if(admin == null){
            return new ResponseEntity<>("Unable to update admin", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admin,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id){
        boolean res = admminService.delete(id);
        if(res){
            return new ResponseEntity<>("Deleted successfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("admin with this id doesn't exist", HttpStatus.NOT_FOUND);
    }
}
