package com.adedoyin.codesculpt.service.executor;

import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionData;

import java.util.List;
import java.util.Optional;

public record CodeExecutionData(SupportedLanguage language, String sourceCode, CodeExecutor executor,
                                Optional<String> commandLineArguments, Optional<String> standardInput,
                                boolean isSelfHosted) {
    public PistonExecutionData toPiston() {
        return new PistonExecutionData("js", "18.15.0",
                List.of(new PistonExecutionData.File(Optional.of(""), "console.log('hello world')")));
    }
}
