package com.gateway.ApiGateway.filter;

import org.apache.hc.core5.http.HttpHeaders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.gateway.ApiGateway.exception.AuthenticationException;
import com.gateway.ApiGateway.util.JwtUtil;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {


    private RouteValidator routeValidator;

  
    private JwtUtil jwtUtil;


    private Logger log= LoggerFactory.getLogger(AuthenticationFilter.class);

    @Autowired
    public AuthenticationFilter(RouteValidator routeValidator,JwtUtil jwtUtil){
        super(Config.class);
        this.routeValidator=routeValidator;
        this.jwtUtil=jwtUtil;
      
    }

  

    @Override
    public GatewayFilter apply(Config config) {
      
        return (exchange, chain) -> {
                log.debug("Request arrrive. ");
            if(routeValidator.isSecured().test(exchange.getRequest())){
                //check header
                log.debug(exchange.getRequest().getHeaders().getFirst("Authorization")+" Requeect coming");

                if(!exchange.getRequest().getHeaders().containsKey("Authorization")){
                    throw new AuthenticationException("No Authorization Header present");
                }
                String authHeader= exchange.getRequest().getHeaders().getFirst("Authorization");
                if(authHeader!=null && authHeader.startsWith("Bearer ")){
                    authHeader=authHeader.substring(7);
                }

                try{
                

                 jwtUtil.validateToken(authHeader);

                }catch ( Exception err){
                       throw new RuntimeException("Invalid token!");
                }
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {
        
    }
}
