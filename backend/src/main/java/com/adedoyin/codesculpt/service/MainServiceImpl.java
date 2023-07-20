package com.adedoyin.codesculpt.service;

import com.adedoyin.codesculpt.model.Main;
import com.adedoyin.codesculpt.repository.MainRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainServiceImpl implements MainService {
    @Autowired
    private MainRepo mainRepo;
    @Override
    public Main addData(Main main) {
        return mainRepo.save(main);
    }
}
