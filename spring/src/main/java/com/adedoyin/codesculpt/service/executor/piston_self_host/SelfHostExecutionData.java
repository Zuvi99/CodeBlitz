package com.adedoyin.codesculpt.service.executor.piston_self_host;


import java.util.List;
import java.util.Optional;

public record SelfHostExecutionData(String language, String version, List<File> files, String stdin, String[] args) {

    public static record File(Optional<String> name, String content) {

    }
}
