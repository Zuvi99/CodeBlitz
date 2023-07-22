package com.adedoyin.codesculpt.service.executor;

import com.adedoyin.codesculpt.service.executor.judge0.JudgeExecutionData;
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

    public JudgeExecutionData toJudge() {
        return new JudgeExecutionData("I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=", 52);
    }
}
