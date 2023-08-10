package com.adedoyin.codesculpt.service.executor.piston;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class PistonExecutionService {

    private final WebClient webClient;

    private static final String PISTON_API_URL = "https://emkc.org/api/v2/piston";

    public PistonExecutionService() {
        this.webClient = WebClient.builder().baseUrl(PISTON_API_URL).build();
    }

    public Mono<PistonResponse> execute(PistonExecutionData data) {
        return this.webClient.post().uri("/execute").body(Mono.just(data), PistonExecutionData.class).retrieve().bodyToMono(PistonResponse.class);
    }
}
