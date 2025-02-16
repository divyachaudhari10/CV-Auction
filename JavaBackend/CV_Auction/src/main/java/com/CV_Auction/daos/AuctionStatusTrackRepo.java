package com.CV_Auction.daos;

import com.CV_Auction.beans.AuctionStatusTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionStatusTrackRepo extends JpaRepository<AuctionStatusTrack,Integer> {

    @Query(value = "SELECT priceoffered FROM auctionstatustrack WHERE auctionid = :auctionId AND alloweduseruid = :uid", nativeQuery = true)
    Long finalAmount(@Param("uid") int uid, @Param("auctionId") int auctionId);

}
