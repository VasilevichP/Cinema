package com.example.demo.controllers;

import com.example.demo.entities.Account;
import com.example.demo.models.AccountModel;
import com.example.demo.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authorization")
@CrossOrigin
public class AuthorizationController {
    @Autowired
    private AccountService accountService;

    //    @PostMapping("/authorize")
//    public ResponseEntity<?> authorize(@RequestBody AccountModel account){
//        System.out.println(account.getLogin());
//        if (accountService.findAccByLogin(account.getLogin())) {
//            Account acc = accountService.getAcc(account.getLogin());
//            if(accountService.checkPassword(account.getPassword(),acc)) {
//                if (acc.getRole()==0)
//                    return ResponseEntity.ok("0");
//                if (acc.getRole()==1)
//                    return ResponseEntity.ok("1");
//            }
//        }
//        return ResponseEntity.ok("Неправильный логин или пароль");
//    }
    @PostMapping("/authorize")
    public int authorize(@RequestBody AccountModel account) {
        System.out.println(account.getLogin());
        if (accountService.findAccByLogin(account.getLogin())) {
            Account acc = accountService.getAcc(account.getLogin());
            if (accountService.checkPassword(account.getPassword(), acc)) {
                return acc.getRole();
            }
        }
        return -1;
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody AccountModel account) {
        if (accountService.findAccByLogin(account.getLogin()))
            return ResponseEntity.ok("Пользователь " + account.getLogin() + " уже есть в системе");
        else {
            if(accountService.doesAdminExist())
                accountService.addAccountToDB(account.getLogin(), account.getPassword(), 0);
            else accountService.addAccountToDB(account.getLogin(), account.getPassword(), 1);
            return ResponseEntity.ok("-");
        }
    }

}
