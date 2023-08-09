package com.adedoyin.codesculpt.service.executor.piston;

import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class PistonExecutionService {

    private final WebClient webClient;

    public PistonExecutionService() {
        this.webClient = WebClient.builder().baseUrl("https://emkc.org/api/v2/piston").build();
    }

    public Mono<PistonResponse> execute(PistonExecutionData data) {
        return this.webClient.post().uri("/execute").body(Mono.just(data), PistonExecutionData.class).retrieve().bodyToMono(PistonResponse.class);
    }
}
