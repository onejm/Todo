package com.todo.todo_project.service;

import com.todo.todo_project.dto.LoginRequest;
import com.todo.todo_project.dto.SignupRequest;
import com.todo.todo_project.entity.User;
import com.todo.todo_project.repository.UserRepository;
import com.todo.todo_project.config.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public void signup(SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername()))
            throw new IllegalArgumentException("이미 사용 중인 사용자명입니다.");
        if (userRepository.existsByEmail(request.getEmail()))
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        if (userRepository.existsByPhone(request.getPhone()))
            throw new IllegalArgumentException("이미 사용 중인 전화번호입니다.");

        String encodedPw = passwordEncoder.encode(request.getPassword());

        userRepository.save(User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(encodedPw)
                .build());
    }

    public String login(LoginRequest request) {
        String id = request.getUsername();
        User user = userRepository.findByUsernameOrEmailOrPhone(id, id, id)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        return jwtProvider.createToken(user.getUsername());
    }
}
