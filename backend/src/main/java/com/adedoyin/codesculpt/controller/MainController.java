package com.adedoyin.codesculpt.controller;

import com.adedoyin.codesculpt.model.Main;
import com.adedoyin.codesculpt.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/main")
public class MainController {
    @Autowired
    private MainService mainService;

    @PostMapping("/add")
    public String add(@RequestBody Main main) {
        mainService.addData(main);
        return "New data added.";
    }
}
