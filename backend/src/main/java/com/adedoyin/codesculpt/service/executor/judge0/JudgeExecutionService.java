package com.adedoyin.codesculpt.service.executor.judge0;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class JudgeExecutionService {

    private final WebClient webClient;

    public JudgeExecutionService() {
        this.webClient = WebClient.builder().baseUrl("https://judge0-ce.p.rapidapi.com")
                .defaultHeader("X-RapidAPI-Key",
                        "fdfeda65aemsh96dbe4fd47f1bc2p1561cajsnc7d33b5ad4f4")
                .defaultHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com").build();
    }

    public Mono<Object> execute(JudgeExecutionData data) {
        Mono<JudgeResponse.SubmissionToken> token = this.webClient.post().uri("/submissions?base64_encoded=true&wait" +
                        "=false")
                .body(Mono.just(data),
                        JudgeExecutionData.class).retrieve().bodyToMono(JudgeResponse.SubmissionToken.class);
        return token.flatMap(submissionToken -> {
            try {
                Thread.sleep(6000 * 2);
            } catch (InterruptedException e) {
                return Mono.error(new RuntimeException(e));
            }
            return this.webClient.get().uri(uriBuilder -> uriBuilder.path("/submissions" +
                    "/{token}").queryParam("base64_encoded", true).build(submissionToken.token())).retrieve().bodyToMono(Object.class);
        });
    }

}
