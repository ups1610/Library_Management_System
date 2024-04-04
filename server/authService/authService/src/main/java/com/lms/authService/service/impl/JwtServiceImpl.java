package com.lms.authService.service.impl;

import java.util.Arrays;
import java.util.Date;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import io.jsonwebtoken.SignatureAlgorithm;


@Component
public class JwtServiceImpl {

    private static final String SECRET_KEY ="357638792F423F4428472B4B6250655368566D597133743677397A2443264629";
    private static final String ISSUER = "SagarTech";

     private static final Logger log=LoggerFactory.getLogger(JwtServiceImpl.class);


     private JwtServiceImpl() {
      
    }

    private static  Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        Key k= Keys.hmacShaKeyFor(keyBytes);
     
        log.info("Generated Key is:" +Arrays.toString(k.getEncoded()));
        return k;
    }


     public static boolean validateToken(String jwtToken) {
        return parseToken(jwtToken) != null;
    }

    private static Claims parseToken(String jwtToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody();
        } catch (Exception e) {
            log.error(e.getMessage());
            log.info(jwtToken);
            
            return null;
        }
    }

    public static String getUserNameFromToken(String jwtToken) {
        Claims claims = parseToken(jwtToken);
        if (claims == null) {
            return null; // Token parsing failed, return null
        }
        return claims.getSubject();
    }

 public static String generateToken(String username) {
    long currentTimeMillis = System.currentTimeMillis();
    long jwtExpMillis = currentTimeMillis + 600 * 60 * 1000; // 20 minutes later
    Date currentDate = new Date(currentTimeMillis);
    Date jwtExpDate = new Date(jwtExpMillis);



    return Jwts.builder()
        .setId(UUID.randomUUID().toString())
        .setIssuer(ISSUER)
        .setSubject(username)
        .signWith(getSignKey(), SignatureAlgorithm.HS256) // Use the generated signing key
        .setIssuedAt(currentDate)
        .setExpiration(jwtExpDate)
        .compact();
}






}
