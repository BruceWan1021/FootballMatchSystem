package com.footballmatchsystem.service;

public interface EmailService {

    void sendVerificationEmail(String toEmail);

    boolean verifyCode(String email, String code);
}
