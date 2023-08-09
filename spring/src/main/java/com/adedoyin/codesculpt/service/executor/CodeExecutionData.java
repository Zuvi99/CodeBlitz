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
        switch (language) {
            case JAVA -> {
                return "java";
            }
            case PYTHON -> {
                return "python";
            }
            case TYPESCRIPT -> {
                return "typescript";
            }
            case RUBY -> {
                return "ruby";
            }
            case CPP -> {
                return "cpp";
            }
            case DART -> {
                return "dart";
            }
            case PASCAL -> {
                return "pascal";
            }
            case SWIFT -> {
                return "swift";
            }
            case SCALA -> {
                return "scala";
            }
            case C -> {
                return "c";
            }
            case ELIXIR -> {
                return "elixir";
            }
            case PERL -> {
                return "perl";
            }
            case RUST -> {
                return  "rust";
            }
            default -> {
                return "";
            }
        }
    }
    public  String getPistonVersion() {
        switch (language) {
            case JAVA -> {
                return "15.0.2";
            }
            case PYTHON -> {
                return "3.10.0";
            }
            case TYPESCRIPT -> {
                return "5.0.3";
            }
            case RUBY -> {
                return "3.0.1";
            }
            case CPP, C -> {
                return "10.2.0";
            }
            case DART -> {
                return "2.19.6";
            }
            case PASCAL, SCALA -> {
                return "3.2.2";
            }
            case SWIFT -> {
                return "5.3.3";
            }
            case ELIXIR -> {
                return "1.11.3";
            }
            case PERL -> {
                return "5.36.0";
            }
            case RUST -> {
                return  "1.68.2";
            }
            default -> {
                return "";
            }
        }
    }

    public SelfHostExecutionData toPistonServer() {
        return new SelfHostExecutionData(getPistonLanguage(), getPistonVersion(),
                List.of(new SelfHostExecutionData.File(Optional.of(""), sourceCode)), pistonStandardInput,
                pistonCommandLineArguments);
    }
}
