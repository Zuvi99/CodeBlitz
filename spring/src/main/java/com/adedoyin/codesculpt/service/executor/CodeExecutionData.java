package com.adedoyin.codesculpt.service.executor;

import com.adedoyin.codesculpt.service.executor.piston_self_host.SelfHostExecutionData;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionData;

import java.util.List;
import java.util.Optional;

public record CodeExecutionData(SupportedLanguage language, String sourceCode, CodeExecutor executor,
                                String[] pistonCommandLineArguments, String pistonStandardInput) {
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

    public SelfHostExecutionData toPistonServer() {
        return new SelfHostExecutionData(getPistonLanguage(), getPistonVersion(),
                List.of(new SelfHostExecutionData.File(Optional.of(""), sourceCode)), pistonStandardInput,
                pistonCommandLineArguments);
    }
}
