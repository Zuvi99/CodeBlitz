package com.adedoyin.codesculpt.config;

import com.adedoyin.codesculpt.service.executor.ExecutionService;
import com.adedoyin.codesculpt.service.executor.ExecutionServiceImpl;
import com.adedoyin.codesculpt.service.executor.judge0.JudgeExecutionService;
import com.adedoyin.codesculpt.service.executor.piston.PistonExecutionService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CodesculptConfig {
    @Bean
    public ExecutionService executorService() {
        return new ExecutionServiceImpl(new PistonExecutionService(), new JudgeExecutionService());
    }

    @Bean
    public CorsWebFilter corsFilter() {

        CorsConfiguration config = new CorsConfiguration();

        // Possibly...
        // config.applyPermitDefaultValues()

        config.setAllowCredentials(true);
        config.addAllowedOrigin("https://code-sculpt.vercel.app");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}
