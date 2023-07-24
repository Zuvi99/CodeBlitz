package com.adedoyin.codesculpt.service.executor;

import com.adedoyin.codesculpt.service.executor.judge0.JudgeExecutionData;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionData;

import java.util.Base64;
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
        } else if (this.language == SupportedLanguage.CPP) {
            apiLang = "c++";
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
        } else if (this.language == SupportedLanguage.CPP) {
            langVersion = "10.2.0";
        }
        return langVersion;
    }

    public JudgeExecutionData toJudge() {
        String encodedSourceCode = Base64.getEncoder().encodeToString(sourceCode.getBytes());
        return new JudgeExecutionData(encodedSourceCode, getJudgeLangId());
    }

    public int getJudgeLangId() {
        int langId = 0;
        if (this.language == SupportedLanguage.PYTHON) {
            langId = 71;
        } else if (this.language == SupportedLanguage.JAVASCRIPT) {
            langId = 93;
        } else if (this.language == SupportedLanguage.JAVA) {
            langId = 91;
        } else if (this.language == SupportedLanguage.KOTLIN) {
            langId = 78;
        } else if (this.language == SupportedLanguage.TYPESCRIPT) {
            langId = 94;
        } else if (this.language == SupportedLanguage.DART) {
            langId = 90;
        } else if (this.language == SupportedLanguage.CPP) {
            langId = 54;
        }
        return langId;
    }
}
