package com.gateway.ApiGateway.util;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
 private static final String SECRET_KEY ="357638792F423F4428472B4B6250655368566D597133743677397A2443264629";
    private static final String ISSUER = "SagarTech";

     private static final Logger log=LoggerFactory.getLogger(JwtUtil.class);


     private JwtUtil() {
      
    }

    private static  Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        Key k= Keys.hmacShaKeyFor(keyBytes);
     
        log.info("Generated Key is:" +Arrays.toString(k.getEncoded()));
        return k;
    }


     public static void validateToken(String jwtToken) {
        Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody();

    }

  


}
