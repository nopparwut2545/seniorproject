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

import com.example.demo.Model.BookingHistory;

import com.example.demo.Model.BookingQueue;
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

    @Query("SELECT n FROM Nanny n WHERE n.role_level = :roleLevel")
    List<Nanny> findByRoleLevel(@Param("roleLevel") String roleLevel);



    // New custom query to search by type of work
    // New custom query methods
    @Query("SELECT n FROM Nanny n WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% AND n.type_work = :typeWork")
    List<Nanny> findByFullNameContainingAndTypeOfWork(@Param("keyword") String keyword, @Param("typeWork") String typeWork);

    @Query("SELECT n FROM Nanny n WHERE n.role_level = :roleLevel AND n.type_work = :typeWork")
    List<Nanny> findByRoleLevelAndTypeOfWork(@Param("roleLevel") String roleLevel, @Param("typeWork") String typeWork);

    ///////////////////////////////
    @Query("SELECT n FROM Nanny n WHERE n.type_work = :type_work")
    List<Nanny> findByTypeOfWork(@Param("type_work") String type_work);


    @Query("SELECT n FROM Nanny n WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% AND n.role_level = :roleLevel")
    List<Nanny> findByFullNameContainingAndRoleLevel(@Param("keyword") String keyword, @Param("roleLevel") String roleLevel);

    @Query("SELECT n FROM Nanny n WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% AND n.role_level = :roleLevel AND n.type_work = :typeWork")
    List<Nanny> findByFullNameContainingAndRoleLevelAndType(@Param("keyword") String keyword, @Param("roleLevel") String roleLevel, @Param("typeWork") String typeWork);

    // New for Gender
    @Query("SELECT n FROM Nanny n WHERE n.gender = :gender")
    List<Nanny> findByGender(@Param("gender") String gender);

    @Query("SELECT n FROM Nanny n WHERE n.type_work = :type_work AND n.gender = :gender")
    List<Nanny> findByTypeOfWorkAndGender(@Param("type_work") String typeWork, @Param("gender") String gender);

    @Query("SELECT n FROM Nanny n WHERE n.role_level = :roleLevel AND n.gender = :gender")
    List<Nanny> findByRoleLevelAndGender(@Param("roleLevel") String roleLevel, @Param("gender") String gender);

    @Query("SELECT n FROM Nanny n WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% AND n.gender = :gender")
    List<Nanny> findByFullNameContainingAndGender(@Param("keyword") String keyword, @Param("gender") String gender);

    @Query("SELECT n FROM Nanny n WHERE  n.role_level = :roleLevel AND n.type_work = :type_work  AND n.gender = :gender")
    List<Nanny> findByTypeOfWorkAndRoleLevelAndGender(@Param("roleLevel") String roleLevel,@Param("type_work") String type_work, @Param("gender") String gender);

    @Query("SELECT n FROM Nanny n WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% AND  n.type_work = :type_work AND  n.gender = :gender")
    List<Nanny> findByTypeOfWorkAndFullNameContainingAndGender(@Param("keyword") String keyword , @Param("type_work") String typeWork, @Param("gender") String gender);

    @Query("SELECT n FROM Nanny n WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% AND n.role_level = :role_level  AND n.gender = :gender")
    List<Nanny> findByRoleLevelAndFullNameContainingAndGender(@Param("keyword") String keyword,@Param("role_level") String roleLevel, @Param("gender") String gender);

    @Query("SELECT n FROM Nanny n WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% AND n.role_level = :role_level  AND n.type_work = :type_work  AND n.gender = :gender")
    List<Nanny> findByTypeOfWorkAndRoleLevelAndFullNameContainingAndGender(@Param("keyword") String keyword,@Param("role_level") String role_level, @Param("type_work") String typeWork, @Param("gender") String gender);

    /////

  /// New for district
  @Query("SELECT n FROM Nanny n WHERE n.district LIKE %:district%")
  List<Nanny> findByDistrict(@Param("district") String district);

 @Query("SELECT n FROM Nanny n WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% AND n.role_level = :role_level  " +
         "AND n.type_work = :type_work  AND n.gender = :gender AND n.district LIKE %:district% ")
 List<Nanny> findByTypeOfWorkAndRoleLevelAndFullNameContainingAndGenderAndDistrict(@Param("keyword") String keyword,@Param("role_level")
 String role_level, @Param("type_work") String typeWork, @Param("gender") String gender, @Param("district") String district);

 @Query("SELECT n FROM Nanny n " +
         "WHERE n.role_level = :roleLevel " +
         "AND n.type_work = :typeWork " +
         "AND CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% " +
         "AND n.district LIKE %:district%")
 List<Nanny> findByRoleLevelAndTypeOfWorkAndFullNameContainingAndDistrict(
         @Param("keyword") String keyword,
         @Param("roleLevel") String roleLevel,
         @Param("typeWork") String typeWork,
         @Param("district") String district
 );

 @Query("SELECT n FROM Nanny n " +
         "WHERE n.gender = :gender " +
         "AND n.role_level = :roleLevel " +
         "AND CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% " +
         "AND n.district LIKE %:district%")
 List<Nanny> findByGenderAndRoleLevelAndFullNameContainingAndDistrict(
         @Param("keyword") String keyword,
         @Param("roleLevel") String roleLevel,
         @Param("gender") String gender,
         @Param("district") String district
 );

 @Query("SELECT n FROM Nanny n " +
         "WHERE n.gender = :gender " +
         "AND n.type_work = :typeWork " +
         "AND CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% " +
         "AND n.district LIKE %:district%")
 List<Nanny> findByGenderAndTypeOfWorkAndFullNameContainingAndDistrict(
         @Param("keyword") String keyword,
         @Param("typeWork") String typeWork,
         @Param("gender") String gender,
         @Param("district") String district
 );

 @Query("SELECT n FROM Nanny n " +
         "WHERE CONCAT(n.firstName, ' ', n.lastName) LIKE %:keyword% " +
         "AND n.district LIKE %:district%")
 List<Nanny> findByFullNameContainingAndDistrict(
         @Param("keyword") String keyword,
         @Param("district") String district
 );

 @Query("SELECT n FROM Nanny n " +
         "WHERE n.role_level = :roleLevel " +
         "AND n.district LIKE %:district%")
 List<Nanny> findByRoleLevelAndDistrict(
         @Param("roleLevel") String roleLevel,
         @Param("district") String district
 );

 @Query("SELECT n FROM Nanny n " +
         "WHERE n.type_work = :typeWork " +
         "AND n.district LIKE %:district%")
 List<Nanny> findByTypeOfWorkAndDistrict(
         @Param("typeWork") String typeWork,
         @Param("district") String district
 );

 @Query("SELECT n FROM Nanny n " +
         "WHERE n.gender = :gender " +
         "AND n.district LIKE %:district%")
 List<Nanny> findByGenderAndDistrict(
         @Param("gender") String gender,
         @Param("district") String district
 );

 ////
// @Query("SELECT bh,bq FROM BookingHistory bh JOIN BookingQueue bq on bh.booking_id = bq.bookingID WHERE bq.nanny_id = :nannyId")
// List<BookingHistory> findByNannyId(@Param("nannyId") Long nannyId);

 @Query("SELECT bh FROM BookingHistory bh JOIN BookingQueue bq on bh.booking_id = bq.bookingID WHERE bq.nanny_id = :nannyId")
 List<BookingHistory> findByNannyIdBH(@Param("nannyId") Long nannyId);

 @Query("SELECT bq FROM BookingHistory bh JOIN BookingQueue bq on bh.booking_id = bq.bookingID WHERE bq.nanny_id = :nannyId")
 List<BookingQueue> findByNannyIdBQ(@Param("nannyId") Long nannyId);

 @Query("SELECT bq FROM BookingQueue bq WHERE bq.nanny_id = :nannyId AND bq.status_payment = 'Bookings'")
 List<BookingQueue> findBQByNannyIDStatusBookings(@Param("nannyId") Long nannyId);

 @Query("SELECT bq FROM BookingQueue bq WHERE bq.nanny_id = :nannyId AND bq.status_payment = 'Pending'")
 List<BookingQueue> findBQByNannyIDAndNannyChoose(@Param("nannyId") Long nannyId);
}
