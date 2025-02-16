package com.CV_Auction.beans;

import java.time.LocalDate;

public class UserDashboardResponse {
    private long securityAmount;
    private int limit;
    private long pending;
    private boolean packActive;
    private LocalDate planStart;
    public UserDashboardResponse() {}
    public UserDashboardResponse(long securityAmount, int limit, long pending, boolean packActive, LocalDate planStart) {
        this.securityAmount = securityAmount;
        this.limit = limit;
        this.pending = pending;
        this.packActive = packActive;
        this.planStart = planStart;
    }

    public long getSecurityAmount() {
        return securityAmount;
    }
    public void setSecurityAmount(long securityAmount) {
        this.securityAmount = securityAmount;
    }
    public int getLimit() {
        return limit;
    }
    public void setLimit(int limit) {
        this.limit = limit;
    }
    public long getPending() {
        return pending;
    }
    public void setPending(long pending) {
        this.pending = pending;
    }
    public boolean isPackActive() {
        return packActive;
    }
    public void setPackActive(boolean packActive) {
        this.packActive = packActive;
    }
    public LocalDate getPlanStart() {
        return planStart;
    }
    public void setPlanStart(LocalDate planStart) {
        this.planStart = planStart;
    }
}
