package com.adedoyin.codesculpt.service.executor.judge0;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record JudgeExecutionData(String sourceCode, int languageId, String stdin, String commandLineArguments) {
}
