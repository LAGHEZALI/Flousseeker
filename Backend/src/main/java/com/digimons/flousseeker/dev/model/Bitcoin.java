package com.digimons.flousseeker.dev.model;

import java.io.Serializable;

public class Bitcoin implements Serializable {

    String value;
    long Date;



    public Bitcoin(String value) {
        this.value = value;
        Date=System.currentTimeMillis() / 1000L;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public long getDate() {return Date;}

    public void setDate(long date) {Date = date;}
}
