package com.adedoyin.codesculpt.service.executor.piston;



import java.util.List;
import java.util.Optional;

public record PistonExecutionData(String language, String version, List<File> files, String stdin, String[] args) {
    public static record File(Optional<String> name, String content) {
    }
}
