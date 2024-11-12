package com.example.demo.models;

import com.example.demo.entities.Account;

public class AccountModel {
    private String login;
    private String password;
    public static AccountModel toModel(Account account){
        AccountModel model = new AccountModel();
        model.setLogin(account.getLogin());
        model.setPassword(account.getPassword());
        return model;
    }
    public static Account fromModel(AccountModel model, int role){
        Account account = new Account();
        account.setLogin(model.getLogin());
        account.setPassword(model.getPassword());
        account.setRole(role);
        return account;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
