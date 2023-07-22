package com.adedoyin.codesculpt.service.executor.judge0;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

public class JudgeResponse {
    public static record SubmissionToken(String token) {
    }

    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static record Submission(String stdout, int statusId, int languageId, String stderr) {
    }
}
