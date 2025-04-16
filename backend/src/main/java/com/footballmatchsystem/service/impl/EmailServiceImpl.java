package com.footballmatchsystem.service.impl;

import com.footballmatchsystem.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // 存储验证码（线程安全）
    private final ConcurrentHashMap<String, String> verificationCodes = new ConcurrentHashMap<>();

    @Override
    public void sendVerificationEmail(String toEmail) {
        String code = generateVerificationCode();
        verificationCodes.put(toEmail, code);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom("brucewan1021@foxmail.com"); // 建议提取成配置
        message.setSubject("Email Verification Code");
        message.setText("Your verification code is: " + code);

        mailSender.send(message);
    }

    @Override
    public boolean verifyCode(String email, String code) {
        return code.equals(verificationCodes.get(email));
    }

    private String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }
}
