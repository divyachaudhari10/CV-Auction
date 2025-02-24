package com.CV_Auction.daos;

import com.CV_Auction.beans.AuctionStatusTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionStatusTrackRepo extends JpaRepository<AuctionStatusTrack,Integer> {

    @Query(value = "SELECT priceoffered FROM auctionstatustrack WHERE auctionid = :auctionId AND alloweduseruid = :uid", nativeQuery = true)
    Long finalAmount(@Param("uid") int uid, @Param("auctionId") int auctionId);

    @Query(value = "select auctionid from auctionstatustrack where alloweduseruid = :id",nativeQuery = true)
    List<Integer> findUserParticipation(int id);

    @Query(value = "SELECT MAX(priceoffered) FROM auctionstatustrack WHERE auctionid = :auctionId", nativeQuery = true)
    Long findMaxBid(@Param("auctionId") int auctionId);

    @Query(value = "SELECT alloweduseruid FROM auctionstatustrack WHERE priceoffered = (SELECT MAX(priceoffered) FROM auctionstatustrack WHERE auctionid = :auctionid) AND auctionid = :auctionid LIMIT 1", nativeQuery = true)
    int getHighestBidder(int auctionid);

}
