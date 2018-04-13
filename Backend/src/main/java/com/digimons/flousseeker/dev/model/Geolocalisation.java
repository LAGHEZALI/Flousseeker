package com.digimons.flousseeker.dev.model;

import java.io.Serializable;

public class Geolocalisation implements Serializable {

    private String label;
    private double lat;
    private double lng;

    public Geolocalisation(String label, double lat, double lng) {
        this.label = label;
        this.lat = lat;
        this.lng = lng;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    @Override
    public boolean equals(Object o) {
        return this.label.equals(((Geolocalisation)o).label);
    }

    @Override
    public String toString() {
        return "Geolocalisation{" +
                "label='" + label + '\'' +
                ", lat=" + lat +
                ", lng=" + lng +
                '}';
    }
}
