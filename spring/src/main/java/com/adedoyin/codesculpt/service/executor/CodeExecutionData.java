package com.adedoyin.codesculpt.service.executor;

import com.adedoyin.codesculpt.service.executor.judge0.JudgeExecutionData;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionData;

import java.util.List;
import java.util.Optional;

public record CodeExecutionData(SupportedLanguage language, String sourceCode, CodeExecutor executor,
                                String[] pistonCommandLineArguments, String pistonStandardInput,
                                String judgeCommandLineArguments, String judgeStandardInput) {
    public PistonExecutionData toPiston() {
        return new PistonExecutionData(getPistonLanguage(), getPistonVersion(),
                List.of(new PistonExecutionData.File(Optional.of(""), sourceCode)), pistonStandardInput, pistonCommandLineArguments);
    }

    public String getPistonLanguage() {
        String apiLang = "";
        if (this.language == SupportedLanguage.PYTHON) {
            apiLang = "python";
        } else if (this.language == SupportedLanguage.JAVASCRIPT) {
            apiLang = "javascript";
        } else if (this.language == SupportedLanguage.JAVA) {
            apiLang = "java";
        } else if (this.language == SupportedLanguage.TYPESCRIPT) {
            apiLang = "typescript";
        } else if (this.language == SupportedLanguage.CPP) {
            apiLang = "c++";
        } else if (this.language == SupportedLanguage.RUBY) {
            apiLang = "ruby";
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
        } else if (this.language == SupportedLanguage.TYPESCRIPT) {
            langVersion = "5.0.3";
        } else if (this.language == SupportedLanguage.CPP) {
            langVersion = "10.2.0";
        } else if (this.language == SupportedLanguage.RUBY) {
            langVersion = "3.0.1";
        }
        return langVersion;
    }

    public JudgeExecutionData toJudge() {
        return new JudgeExecutionData(sourceCode, getJudgeLangId(), judgeStandardInput, judgeCommandLineArguments);
    }

    public int getJudgeLangId() {
        int langId = 0;
        if (this.language == SupportedLanguage.PYTHON) {
            langId = 71;
        } else if (this.language == SupportedLanguage.JAVASCRIPT) {
            langId = 63;
        } else if (this.language == SupportedLanguage.JAVA) {
            langId = 62;
        } else if (this.language == SupportedLanguage.TYPESCRIPT) {
            langId = 74;
        } else if (this.language == SupportedLanguage.CPP) {
            langId = 54;
        } else if (this.language == SupportedLanguage.RUBY) {
            langId = 72;
        }
        return langId;
    }
}
