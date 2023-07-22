package com.adedoyin.codesculpt.service.executor.piston;

import com.adedoyin.codesculpt.service.executor.CodeExecutionResponse;

import java.util.Optional;

public record PistonResponse(Run run, String language, String version) {

    public static record Run(String stdout, String stderr, int code, Optional<String> signal, String output) {
    }

    public CodeExecutionResponse toResponse() {
        return new CodeExecutionResponse(this.run.stdout);
    }
}
