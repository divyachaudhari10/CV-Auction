package com.CV_Auction.daos;

import com.CV_Auction.beans.DepositPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface DepositRepo extends JpaRepository<DepositPayment,Integer> {

    @Query(value = "select sum(amt) from depositpayment where uid = :id;",nativeQuery = true)
    Long getDepositAmount(int id);

    @Query(value = "select transactiontime from depositpayment where uid = :uid order by transactiontime limit 1",nativeQuery = true)
    Optional<LocalDateTime> getFirstDate(int uid);

}
