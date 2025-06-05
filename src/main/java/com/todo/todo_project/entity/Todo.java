package com.todo.todo_project.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.todo.todo_project.entity.enums.Priority;
import com.todo.todo_project.entity.enums.TodoStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "todo")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;


    @Enumerated(EnumType.STRING)
    private TodoStatus status;

    @Enumerated(EnumType.STRING)
    private Priority priority;


    private String tags;         // 예: "공부,개발,운동" (프론트에서 배열 처리)

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
