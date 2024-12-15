package com.example.demo.login;

/* JpaRepository: Spring Data JPA에서 제공하는 기본 인터페이스로,
데이터베이스의 CRUD 작업을 간단하게 처리할 수 있는 메서드들을 제공합니다.
UserRepository는 UserEntity에 대해 기본적인 CRUD 작업을 수행합니다. */
import org.springframework.data.jpa.repository.JpaRepository;

/* Long: UserEntity의 id 필드가 Long 타입이므로,
JpaRepository에서 UserEntity와 Long을 제네릭 타입으로 지정합니다. */
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);
}
