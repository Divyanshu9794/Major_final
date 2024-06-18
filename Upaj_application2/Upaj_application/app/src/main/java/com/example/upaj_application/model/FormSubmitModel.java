package com.example.upaj_application.model;


import com.google.firebase.Timestamp;

public class FormSubmitModel {


    private String phone;
    private String username;
    private Timestamp createdTimestamp;
    private String userId;

    private String fcmToken;

    private String email,region,nitrogen,phosphorus,potassium,temperature,humidity,rainfall,ph,area,season;

    public FormSubmitModel() {
    }

    public FormSubmitModel(String phone, String username, Timestamp createdTimestamp, String userId, String email, String region, String nitrogen, String phosphorus, String potassium, String temperature, String humidity, String rainfall, String ph, String area, String season) {
        this.phone = phone;
        this.username = username;
        this.createdTimestamp = createdTimestamp;
        this.userId = userId;
        this.email = email;
        this.region = region;
        this.nitrogen = nitrogen;
        this.phosphorus = phosphorus;
        this.potassium = potassium;
        this.temperature = temperature;
        this.humidity = humidity;
        this.rainfall = rainfall;
        this.ph = ph;
        this.area = area;
        this.season = season;
    }

    public String getPhone() {
        return phone;
    }

    public String getUsername() {
        return username;
    }

    public Timestamp getCreatedTimestamp() {
        return createdTimestamp;
    }

    public String getUserId() {
        return userId;
    }

    public String getFcmToken() {
        return fcmToken;
    }

    public String getEmail() {
        return email;
    }

    public String getRegion() {
        return region;
    }

    public String getNitrogen() {
        return nitrogen;
    }

    public String getPhosphorus() {
        return phosphorus;
    }

    public String getPotassium() {
        return potassium;
    }

    public String getTemperature() {
        return temperature;
    }

    public String getHumidity() {
        return humidity;
    }

    public String getRainfall() {
        return rainfall;
    }

    public String getPh() {
        return ph;
    }

    public String getArea() {
        return area;
    }

    public String getSeason() {
        return season;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCreatedTimestamp(Timestamp createdTimestamp) {
        this.createdTimestamp = createdTimestamp;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setNitrogen(String nitrogen) {
        this.nitrogen = nitrogen;
    }

    public void setPhosphorus(String phosphorus) {
        this.phosphorus = phosphorus;
    }

    public void setPotassium(String potassium) {
        this.potassium = potassium;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public void setRainfall(String rainfall) {
        this.rainfall = rainfall;
    }

    public void setPh(String ph) {
        this.ph = ph;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public void setSeason(String season) {
        this.season = season;
    }


}
