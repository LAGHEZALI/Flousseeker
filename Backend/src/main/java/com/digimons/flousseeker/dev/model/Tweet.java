package com.digimons.flousseeker.dev.model;

import java.io.Serializable;

public class Tweet implements Serializable{

    String username;
    String text;
    long date;



    int polarity;
    Geolocalisation geolocalisation;

    public Tweet(String username, String text, long time, Geolocalisation geolocalisation,int polarity) {
        this.username = username;
        this.text = text;
        this.date = time;
        this.geolocalisation = geolocalisation;
        this.polarity=polarity;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public long getDate() {
        return date;
    }

    public void setDate(long time) {
        this.date = time;
    }

    public Geolocalisation getLocation() {
        return geolocalisation;
    }

    public void setLocation(Geolocalisation geolocalisation) {
        this.geolocalisation = geolocalisation;
    }

    public int getPolarity() { return polarity;}

    public void setPolarity(int polarity) {this.polarity = polarity; }
    @Override
    public String toString() {
        return this.username + " %flousseeker% " + this.text + " %flousseeker% " + this.date + " %flousseeker% " +
                this.geolocalisation.getLabel() +" %flousseeker% " +
                this.geolocalisation.getLat() + " %flousseeker% " + this.geolocalisation.getLng();
    }

    /*public static Tweet deserialized(String value)
    {
        String values[] = value.split("%flousseeker%");
        return new Tweet(values[0].trim(), values[1].trim(), Long.parseLong(values[2].trim()),
                new Geolocalisation(    values[3].trim(),
                                        Double.parseDouble(values[4].trim()),
                                        Double.parseDouble(values[5].trim())
                                    )
        );
    }*/

    public boolean egale(Double lng,Double lat)
    {
        return (((this.getLocation().getLng())==lng)&&
                ((this.getLocation().getLat())==lat));
    }
    @Override
    public boolean equals(Object o) {

            return (((this.getLocation().getLng())==(((Tweet) o).getLocation().getLng()))&&
                    ((this.getLocation().getLat())==(((Tweet) o).getLocation().getLat())));
    }

}
