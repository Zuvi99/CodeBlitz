package com.adedoyin.codesculpt.service.executor;


import reactor.core.publisher.Mono;

public interface ExecutionService {
    Mono<CodeExecutionResponse> executeCode(CodeExecutionData codeExecutionData);
}
