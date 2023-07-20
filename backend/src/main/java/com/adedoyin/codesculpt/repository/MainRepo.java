package com.adedoyin.codesculpt.repository;

import com.adedoyin.codesculpt.model.Main;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainRepo extends JpaRepository<Main, Integer> {

}
