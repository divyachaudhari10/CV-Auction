package com.CV_Auction.daos;

import com.CV_Auction.beans.WinnerTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WinnerTableRepo extends JpaRepository<WinnerTable, Integer> {

    @Query(value = "SELECT auctionid FROM winnertable WHERE winnerid = :id", nativeQuery = true)
    List<Integer> auctionWon(@Param("id") int id);

    @Query("SELECT w FROM WinnerTable w WHERE w.alloweduseruid = :alloweduseruid")
    List<WinnerTable> findByAllowedUserUid(@Param("alloweduseruid") int alloweduseruid);

}
