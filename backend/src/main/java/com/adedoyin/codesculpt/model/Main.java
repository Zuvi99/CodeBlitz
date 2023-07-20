package com.adedoyin.codesculpt.model;

import jakarta.persistence.*;

@Entity
public class Main {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int language_id;
    private String prog_language;
    private String user_code;
    private String standard_input;
    private String cli_args;

    public int getLanguage_id() {
        return language_id;
    }

    public void setLanguage_id(int language_id) {
        this.language_id = language_id;
    }

    public String getProg_language() {
        return prog_language;
    }

    public void setProg_language(String prog_language) {
        this.prog_language = prog_language;
    }

    public String getUser_code() {
        return user_code;
    }

    public void setUser_code(String user_code) {
        this.user_code = user_code;
    }

    public String getStandard_input() {
        return standard_input;
    }

    public void setStandard_input(String standard_input) {
        this.standard_input = standard_input;
    }

    public String getCli_args() {
        return cli_args;
    }

    public void setCli_args(String cli_args) {
        this.cli_args = cli_args;
    }
}
