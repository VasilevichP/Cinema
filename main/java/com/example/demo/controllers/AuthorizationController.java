package com.example.demo.controllers;

import com.example.demo.entities.Account;
import com.example.demo.models.AccountModel;
import com.example.demo.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AuthorizationController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/authorize")
    public int authorize(@RequestBody AccountModel account) {
        if (accountService.findAccByLogin(account.getLogin())) {
            Account acc = accountService.getAcc(account.getLogin());
            if (accountService.checkPassword(account.getPassword(), acc)) {
                return acc.getRole();
            }
        }
        return -1;
    }

    @PostMapping("/add")
    public int add(@RequestBody AccountModel account) {
        if (accountService.findAccByLogin(account.getLogin()))
            return 0;
        else {
            if (accountService.doesAdminExist())
                accountService.addAccountToDB(account.getLogin(), account.getPassword(), 0);
            else accountService.addAccountToDB(account.getLogin(), account.getPassword(), 1);
            return 1;
        }
    }

    @GetMapping("/accounts")
    public List<Account> getAccounts() {
        return (List<Account>) accountService.getAllAccounts();
    }

    @DeleteMapping("/delete/{loginDel}")
    public int deleteAccount(@PathVariable String loginDel){
        if(accountService.getAcc(loginDel).getRole()==1) return 0;
        else{
            accountService.deleteAccountByLogin(loginDel);
            return 1;
        }
    }
}
