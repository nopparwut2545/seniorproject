package com.example.demo.Repository;
import com.example.demo.Model.ActivityProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ActivityProgramRepository extends JpaRepository<ActivityProgram, Long> {

    @Query("SELECT ap.NormalPeriod1 FROM ActivityProgram ap")
    String findNormalPeriod1();

    @Query("SELECT a FROM ActivityProgram a WHERE a.customer_id =?1")
    List<ActivityProgram> findActivityProgramByCustomerId(Long customer_id);


}

