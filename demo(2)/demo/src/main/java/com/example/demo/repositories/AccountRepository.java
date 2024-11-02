package com.example.demo.repositories;

import com.example.demo.entities.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account,String> {
    boolean existsByRole(int role);
}
