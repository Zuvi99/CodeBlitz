package com.adedoyin.codesculpt.controller;


import com.adedoyin.codesculpt.service.executor.CodeExecutionData;
import com.adedoyin.codesculpt.service.executor.CodeExecutionResponse;
import com.adedoyin.codesculpt.service.executor.ExecutionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class CodeExecutorController {
    private final ExecutionService executorService;

    @Value("${code.sculpt.api}")
    private String codeSculptApi;

    public CodeExecutorController(ExecutionService executorService) {
        this.executorService = executorService;
    }

    @PostMapping("/execute")
    public Mono<CodeExecutionResponse> execute(@RequestBody CodeExecutionData data) {
        System.out.println(data);
        return executorService.executeCode(data);
    }

    @GetMapping("/hello")
    public String helloWorld() {
        return "hello";
    }

    @GetMapping("/hello/response")
    public Mono<String> helloWorldResponse() {
        WebClient webClient = WebClient.builder().baseUrl(codeSculptApi).build();
        return webClient.get().uri("/api/hello").retrieve().bodyToMono(String.class);
    }

}
