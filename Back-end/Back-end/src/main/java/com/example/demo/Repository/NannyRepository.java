//package com.example.demo.Repository;
//
//import com.example.demo.Model.Nanny;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface NannyRepository  extends JpaRepository<Nanny, Long> {
//
//
//}

package com.example.demo.Repository;

import com.example.demo.Model.Nanny;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface NannyRepository extends JpaRepository<Nanny, Long> {

    // Custom query to update the status of a nanny by username
    @Modifying
    @Transactional
    @Query("UPDATE Nanny n SET n.status = 'Inactive' WHERE n.username = ?1")
    void updateStatusByUsername(String username);

    @Query("SELECT n FROM Nanny n WHERE n.username = ?1")
   Nanny findNannyByUsername(String username);

    @Modifying
    @Transactional
    @Query("UPDATE Nanny n SET n.score = n.score + :newScore WHERE n.nannyId = :nannyId")
    void updateScoreByAdding(@Param("nannyId") Long nannyId, @Param("newScore") double newScore);

    @Query("SELECT n FROM Nanny n group by n.score order by n.score desc")
    List<Nanny> findNannyRankingByScore();

    @Query("SELECT n FROM Nanny n WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword%")
    List<Nanny> findByFullNameContaining(@Param("keyword") String keyword);

    Optional<Nanny> findByEmail(String email);


}
