package com.todo.todo_project.dto;

import lombok.Getter;

@Getter
public class SignupRequest {
    private String username;
    private String email;
    private String phone;
    private String password;
}
