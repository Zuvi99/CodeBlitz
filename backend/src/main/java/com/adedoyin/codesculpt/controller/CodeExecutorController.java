package com.adedoyin.codesculpt.controller;


import com.adedoyin.codesculpt.service.executor.CodeExecutionData;
import com.adedoyin.codesculpt.service.executor.ExecutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CodeExecutorController {
    @Autowired
    private ExecutorService executorService;

    @PostMapping("/execute")
    public void execute(@RequestBody CodeExecutionData data) {
        System.out.println(data);
        executorService.executeCode(data);
    }
}
