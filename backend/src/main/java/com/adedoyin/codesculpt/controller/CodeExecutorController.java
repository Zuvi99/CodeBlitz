package com.adedoyin.codesculpt.controller;


import com.adedoyin.codesculpt.service.executor.CodeExecutionData;
import com.adedoyin.codesculpt.service.executor.ExecutionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CodeExecutorController {
    private final ExecutionService executorService;

    public CodeExecutorController(ExecutionService executorService) {
        this.executorService = executorService;
    }

    @PostMapping("/execute")
    public void execute(@RequestBody CodeExecutionData data) {
        System.out.println(data);
        executorService.executeCode(data);
    }

    @GetMapping("/hello")
    public String helloWorld() {
        return "hello";
    }
}
