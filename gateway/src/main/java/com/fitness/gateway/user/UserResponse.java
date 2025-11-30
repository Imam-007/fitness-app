package com.fitness.gateway.user;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserResponse {
    private String id;
    private String keyCloakId;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate createdDate;
    private LocalDate updatedAt;
}
