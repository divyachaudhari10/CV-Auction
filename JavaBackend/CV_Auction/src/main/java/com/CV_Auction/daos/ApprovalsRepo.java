package com.CV_Auction.daos;

import com.CV_Auction.beans.Approvals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApprovalsRepo extends JpaRepository<Approvals,Integer> {
}
