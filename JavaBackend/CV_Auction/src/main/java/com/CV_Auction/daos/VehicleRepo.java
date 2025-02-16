package com.CV_Auction.daos;

import com.CV_Auction.beans.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepo extends JpaRepository<Vehicle,Integer> {

//    @Query(value = "SELECT v FROM Vehicle where v where v.vehicleid = :vid",nativeQuery = false)
//    Vehicle getByVehicleId(int vid);
    @Query(value = "SELECT v FROM Vehicle v WHERE v.vehicleid = :vid",nativeQuery = false)
    Vehicle getByVehicleId(@Param("vid") int vid);



}
