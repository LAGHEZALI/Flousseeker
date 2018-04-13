package com.digimons.flousseeker.dev.model;

import java.io.Serializable;

public class Important implements Serializable {



    double prc;
    long nb;
    Geolocalisation geolocalisation;
    public Important(double prc, long nb, Geolocalisation geolocalisation) {
        this.prc = prc;
        this.nb = nb;
        this.geolocalisation = geolocalisation;
    }
    public Important(long polarity, Geolocalisation geolocalisation) {
        this.nb = polarity;
        this.geolocalisation = geolocalisation;
    }
    public long getPolarity() {
        return nb;
    }

    public Geolocalisation getGeolocalisation() {
        return geolocalisation;
    }

    public void setPolarity(long polarity) {
        this.nb = polarity;
    }

    public void setGeolocalisation(Geolocalisation geolocalisation) {
        this.geolocalisation = geolocalisation;
    }
}
