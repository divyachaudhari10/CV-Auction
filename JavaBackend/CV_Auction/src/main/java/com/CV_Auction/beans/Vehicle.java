package com.CV_Auction.beans;
import jakarta.persistence.*;

@Entity
@Table(name = "allvehiclesdetails")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleid;

    @Column(name = "regno", unique = true, nullable = false, length = 255)
    private String regno;

    @Column(name = "regyear")
    private Integer regyear;

    @Column(name = "manufacname", length = 255)
    private String manufacname;

    @Column(name = "modelname", length = 255)
    private String modelname;

    @Column(name = "fueltype", length = 255)
    private String fueltype;

    @Column(name = "insurance", length = 255)
    private String insurance;

    @Column(name = "kmdriven")
    private Integer kmdriven;

    @Column(name = "rtopassing", length = 255)
    private String rtoPassing;

    @Column(name = "yearofmanufacturing")
    private Integer yearofmanufacturing;

    @Column(name = "parkinglocation", length = 255)
    private String parkinglocation;

    @Column(name = "imgurls", length = 1500)
    private String imgUrls;

    @Column(name = "pdfreporturl", length = 400)
    private String pdfReportUrl;

    public Vehicle() {}

    public Vehicle(int vehicleid, String reg_no, Integer reg_year, String manufac_name, String model_name, String fuel_type, String insurance, Integer km_driven, String rtoPassing, Integer year_of_manufacturing, String parking_location, String imgUrls, String pdfReportUrl) {
        this.vehicleid = vehicleid;
        this.regno = reg_no;
        this.regyear = reg_year;
        this.manufacname = manufac_name;
        this.modelname = model_name;
        this.fueltype = fuel_type;
        this.insurance = insurance;
        this.kmdriven = km_driven;
        this.rtoPassing = rtoPassing;
        this.yearofmanufacturing = year_of_manufacturing;
        this.parkinglocation = parking_location;
        this.imgUrls = imgUrls;
        this.pdfReportUrl = pdfReportUrl;
    }

    public int getVehicleid() {
        return vehicleid;
    }

    public void setVehicleid(int vehicleid) {
        this.vehicleid = vehicleid;
    }

    public String getRegno() {
        return regno;
    }

    public void setRegno(String regno) {
        this.regno = regno;
    }

    public Integer getRegyear() {
        return regyear;
    }

    public void setRegyear(Integer regyear) {
        this.regyear = regyear;
    }

    public String getManufacname() {
        return manufacname;
    }

    public void setManufacname(String manufacname) {
        this.manufacname = manufacname;
    }

    public String getModelname() {
        return modelname;
    }

    public void setModelname(String modelname) {
        this.modelname = modelname;
    }

    public String getFueltype() {
        return fueltype;
    }

    public void setFueltype(String fueltype) {
        this.fueltype = fueltype;
    }

    public String getInsurance() {
        return insurance;
    }

    public void setInsurance(String insurance) {
        this.insurance = insurance;
    }

    public Integer getKmdriven() {
        return kmdriven;
    }

    public void setKmdriven(Integer kmdriven) {
        this.kmdriven = kmdriven;
    }

    public String getRtoPassing() {
        return rtoPassing;
    }

    public void setRtoPassing(String rtoPassing) {
        this.rtoPassing = rtoPassing;
    }

    public Integer getYearofmanufacturing() {
        return yearofmanufacturing;
    }

    public void setYearofmanufacturing(Integer yearofmanufacturing) {
        this.yearofmanufacturing = yearofmanufacturing;
    }

    public String getParkinglocation() {
        return parkinglocation;
    }

    public void setParkinglocation(String parkinglocation) {
        this.parkinglocation = parkinglocation;
    }

    public String getImgUrls() {
        return imgUrls;
    }

    public void setImgUrls(String imgUrls) {
        this.imgUrls = imgUrls;
    }

    public String getPdfReportUrl() {
        return pdfReportUrl;
    }

    public void setPdfReportUrl(String pdfReportUrl) {
        this.pdfReportUrl = pdfReportUrl;
    }
}
