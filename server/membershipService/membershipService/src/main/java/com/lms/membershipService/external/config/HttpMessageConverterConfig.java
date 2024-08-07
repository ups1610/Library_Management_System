package com.lms.membershipService.external.config;



import org.springframework.beans.factory.ObjectFactory;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.SpringDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.codec.*;


@Configuration
public class HttpMessageConverterConfig {
    @Bean
    public Decoder feignDecoder() {

        ObjectFactory<HttpMessageConverters> messageConverters = () -> {
           return  new HttpMessageConverters();
          
        };
        return new SpringDecoder(messageConverters);
    }
}
