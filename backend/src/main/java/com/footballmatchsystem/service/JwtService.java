package com.footballmatchsystem.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECURET_KEY = "secretKey";//用于签名的密钥，后期将存放在配置文件中

    //生成JWT令牌
    public String generateToken(String username) {
        return JWT.create()
                .withSubject(username)//set token main body
                .withIssuedAt(new Date())//set time
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000*60*60))//设置过期时间
                .sign(Algorithm.HMAC256(SECURET_KEY));//使用HMAC SHA-256 算法进行签名
    }

    //验证令牌
    public boolean validationToken(String token, String username){
        String tokenUsername = extractUsername(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }

    //从JWT令牌中提取用户名
    public String extractUsername(String token) {
        return JWT.require(Algorithm.HMAC256(SECURET_KEY))
                .build()
                .verify(token)
                .getSubject();
    }

    //检查JWT是否过期
    private boolean isTokenExpired(String token) {
        return extracExpiration(token).before(new Date());
    }

    private Date extracExpiration(String token) {
        return JWT.require(Algorithm.HMAC256(SECURET_KEY))
                .build()
                .verify(token)
                .getExpiresAt();
    }


}
