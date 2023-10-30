package com.mp.ar.reservation.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class Config {
    @Bean("apiConsume")
    public RestTemplate registerRestTemplate(){
        return new RestTemplate();
    }
}
