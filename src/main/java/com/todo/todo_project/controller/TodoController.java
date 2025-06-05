package com.todo.todo_project.controller;

import com.todo.todo_project.entity.Todo;
import com.todo.todo_project.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class TodoController {

    private final TodoRepository todoRepository;

    // 1. 전체 목록 조회
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        return ResponseEntity.ok(todoRepository.findAll());
    }

    // 2. ID로 조회
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        Optional<Todo> todo = todoRepository.findById(id);
        return todo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3. 날짜별 조회
    @GetMapping("/day/{date}")
    public ResponseEntity<List<Todo>> getTodosByDate(@PathVariable String date) {
        LocalDate targetDate = LocalDate.parse(date);
        List<Todo> result = todoRepository.findAll().stream()
                .filter(todo -> {
                    LocalDate start = todo.getStartDate();
                    LocalDate end = todo.getEndDate();
                    return (targetDate.isEqual(start) || targetDate.isEqual(end) ||
                            (targetDate.isAfter(start) && targetDate.isBefore(end)));
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // 4. 등록
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        return ResponseEntity.ok(todoRepository.save(todo));
    }

    // 5. 수정
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        Optional<Todo> existing = todoRepository.findById(id);
        if (existing.isPresent()) {
            Todo todo = existing.get();
            todo.setTitle(updatedTodo.getTitle());
            todo.setDescription(updatedTodo.getDescription());
            todo.setStartDate(updatedTodo.getStartDate());
            todo.setEndDate(updatedTodo.getEndDate());
            todo.setPriority(updatedTodo.getPriority());
            todo.setStatus(updatedTodo.getStatus());
            todo.setTags(updatedTodo.getTags());
            return ResponseEntity.ok(todoRepository.save(todo));
        }
        return ResponseEntity.notFound().build();
    }

    // 6. 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }


}
