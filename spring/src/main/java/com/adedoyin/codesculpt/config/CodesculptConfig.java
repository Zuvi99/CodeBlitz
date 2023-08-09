package com.adedoyin.codesculpt.config;

import com.adedoyin.codesculpt.service.executor.ExecutionService;
import com.adedoyin.codesculpt.service.executor.ExecutionServiceImpl;
import com.adedoyin.codesculpt.service.executor.piston_self_host.SelfHostExecutionService;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CodesculptConfig {
//
//    @Value("${piston.api.url}")
//    private String pistonAPIUrl;
//
//    @Value(("${piston.server.url}"))
//    private String pistonServerUrl;

    @Bean
    public ExecutionService executorService() {
        return new ExecutionServiceImpl(new PistonExecutionService(),
                new SelfHostExecutionService());
    }

//    @Bean
//    public CorsWebFilter corsFilter() {
//
//        CorsConfiguration config = new CorsConfiguration();
//
//        // Possibly...
//        // config.applyPermitDefaultValues()
//
//        config.setAllowCredentials(true);
//        config.addAllowedOrigin("http://localhost:5173/");
//        config.addAllowedHeader("*");
//        config.addAllowedMethod("*");
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//
//        return new CorsWebFilter(source);
//    }

}
