package com.adedoyin.codesculpt.service.executor;

public record CodeExecutionData(SupportedLanguage language, String sourceCode, CodeExecutor executor,
                                String commandLineArguments, String standardInput) {
}
