package com.adedoyin.codesculpt.service.executor.judge0;

import com.adedoyin.codesculpt.service.executor.CodeExecutionResponse;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.Base64;

public record JudgeResponse(String stdout, int statusId, int languageId, String stderr, Status status) {
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static record Status(int id, String description) {
    }
    public CodeExecutionResponse toResponse() {
        return new CodeExecutionResponse(stdout);
    }
}

