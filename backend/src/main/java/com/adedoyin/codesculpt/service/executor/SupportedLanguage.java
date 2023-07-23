package com.adedoyin.codesculpt.service.executor;

public enum SupportedLanguage {
    PYTHON("python"),
    JAVASCRIPT("javascript"),
    JAVA("java"),
    KOTLIN("kotlin"),
    TYPESCRIPT("typescript"),
    DART("dart");
    private final String value;

    SupportedLanguage(String value) {
        this.value = value;
    }
}
