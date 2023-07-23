package com.adedoyin.codesculpt.service.executor;

import com.adedoyin.codesculpt.service.executor.judge0.JudgeExecutionData;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionData;

import java.util.List;
import java.util.Optional;

public record CodeExecutionData(SupportedLanguage language, String sourceCode, CodeExecutor executor,
                                Optional<String> commandLineArguments, Optional<String> standardInput,
                                boolean isSelfHosted) {
    public PistonExecutionData toPiston() {
        return new PistonExecutionData(getPistonLanguage(), getPistonVersion(),
                List.of(new PistonExecutionData.File(Optional.of(""), sourceCode)));
    }

    public String getPistonLanguage() {
        String apiLang = "";
        if (this.language == SupportedLanguage.PYTHON) {
            apiLang = "python";
        } else if (this.language == SupportedLanguage.JAVASCRIPT) {
            apiLang = "javascript";
        } else if (this.language == SupportedLanguage.JAVA) {
            apiLang = "java";
        } else if (this.language == SupportedLanguage.KOTLIN) {
            apiLang = "kotlin";
        } else if (this.language == SupportedLanguage.TYPESCRIPT) {
            apiLang = "typescript";
        } else if (this.language == SupportedLanguage.DART) {
            apiLang = "dart";
        }
        return apiLang;
    }
    public  String getPistonVersion() {
        String langVersion = "";
        if (this.language == SupportedLanguage.PYTHON) {
            langVersion = "3.10.0";
        } else if (this.language == SupportedLanguage.JAVASCRIPT) {
            langVersion = "18.15.0";
        } else if (this.language == SupportedLanguage.JAVA) {
            langVersion = "15.0.2";
        } else if (this.language == SupportedLanguage.KOTLIN) {
            langVersion = "1.8.20";
        } else if (this.language == SupportedLanguage.TYPESCRIPT) {
            langVersion = "5.0.3";
        } else if (this.language == SupportedLanguage.DART) {
            langVersion = "2.19.6";
        }
        return langVersion;
    }

    public JudgeExecutionData toJudge() {
        return new JudgeExecutionData("I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=", 52);
    }
}
