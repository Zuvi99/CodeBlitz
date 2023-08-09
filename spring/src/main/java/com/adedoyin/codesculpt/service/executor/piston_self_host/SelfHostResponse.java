package com.adedoyin.codesculpt.service.executor.piston_self_host;

import com.adedoyin.codesculpt.service.executor.CodeExecutionResponse;

public record SelfHostResponse(Run run, String language, String version) {

    public static record Run(String output) {
    }

    public CodeExecutionResponse toResponse() {
        return new CodeExecutionResponse(this.run.output);
    }
}

