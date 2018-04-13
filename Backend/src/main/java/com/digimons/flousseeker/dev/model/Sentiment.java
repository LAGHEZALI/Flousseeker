package com.digimons.flousseeker.dev.model;

import java.io.Serializable;

public class Sentiment implements Serializable {
    long pos;
    long neg;
    long neu;

    public Sentiment(long pos, long neg, long neu) {
        this.pos = pos;
        this.neg = neg;
        this.neu = neu;
    }

    public long getPos() {
        return pos;
    }

    public void setPos(long pos) {
        this.pos = pos;
    }

    public long getNeg() {
        return neg;
    }

    public void setNeg(long neg) {
        this.neg = neg;
    }

    public long getNeu() {
        return neu;
    }

    public void setNeu(long neu) {
        this.neu = neu;
    }
}
