package com.gateway.ApiGateway.filter;

import org.apache.hc.core5.http.HttpHeaders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
import com.gateway.ApiGateway.exception.AuthenticationException;
import com.gateway.ApiGateway.external.dto.UserResponseDto;
import com.gateway.ApiGateway.external.services.AuthService;
import com.gateway.ApiGateway.util.JwtUtil;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    private RouteValidator routeValidator;
    private AuthService authService;
    private JwtUtil jwtUtil;
    private Logger log = LoggerFactory.getLogger(AuthenticationFilter.class);

    public AuthenticationFilter(RouteValidator routeValidator, JwtUtil jwtUtil, @Lazy AuthService authService) {
        super(Config.class);
        this.routeValidator = routeValidator;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            log.debug("Request arrived.");

            if (routeValidator.isSecured().test(exchange.getRequest())) {
                // Check for Authorization header
                String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
                
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    throw new AuthenticationException("No Authorization Header present or invalid format");
                }

                // Extract token from Authorization header
                String authToken = authHeader.substring(7);

                // Validate JWT token
                try {
                    jwtUtil.validateToken(authToken);

                    // Perform role-based authorization
                    UserResponseDto loginUser = authService.getCurrentUser(authToken);
                    String role = loginUser.role();

                    log.info(loginUser.email());
                    if (!isAuthorized(role, exchange.getRequest().getURI().getPath())) {
                        throw new RuntimeException("Unauthorized access");
                    }
                } catch (Exception err) {
                    log.error(err.getMessage());
                    throw new RuntimeException("Invalid token or unauthorized access");
                }
            }

            return chain.filter(exchange);
        };
    }

    private boolean isAuthorized(String role, String requestPath) {

        log.info(role);
        log.info(requestPath);
        if (role.equals("ROLE_ADMIN")) {

            return true;
        } else if (role.equals("ROLE_CATALOGER") && requestPath.startsWith("/catalog")) {

            return true;

        } else if (role.equals("ROLE_LIBRARIAN")&& (requestPath.startsWith("/catalog") || requestPath.startsWith("/membershipService"))) {

            return true;

        } else if (role.equals("ROLE_ACCOUNTANT") && requestPath.startsWith("/transaction")) {
            
            return true;
        }
        return false;
    }

    public static class Config {
       
    }
}
