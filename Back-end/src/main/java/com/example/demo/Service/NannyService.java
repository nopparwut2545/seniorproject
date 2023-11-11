package com.example.demo.Service;

import com.example.demo.Model.ActivityProgram;
import com.example.demo.Model.BookingHistory;

import com.example.demo.Model.BookingQueue;
import com.example.demo.Model.Nanny;
import com.example.demo.Repository.BookingHistoryRepository;
import com.example.demo.Repository.NannyRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class NannyService {
    @Autowired
    private NannyRepository nannyRepository;
    @Autowired
    private CommonService commonService;
    @Autowired
    private BookingHistoryRepository bookingHistoryRepository;

    public List<Nanny> getAllNannies() {
        return nannyRepository.findAll();
    }

    public Nanny getNanniesById(Long id) {

        return nannyRepository.findById(id).orElse(null);
    }

    public List<Nanny> findNannyRankingByScore() {

        return nannyRepository.findNannyRankingByScore();
    }
//    public Nanny saveNanny(Nanny nanny) {
//        return nannyRepository.save(nanny);
//    }

    public Nanny saveNanny(Nanny nanny) {
        if (commonService.isEmailUnique(nanny.getEmail())) {
            return nannyRepository.save(nanny);
        } else {
            throw new IllegalArgumentException("Email is already in use.");
        }
    }

    public Nanny saveNannyByAdmin(Nanny nanny) {
            return nannyRepository.save(nanny);
    }

    public void updateNannyStatusToInactive(String username) {
        nannyRepository.updateStatusByUsername(username);
    }

    public  Nanny findNannyByUsername(String username) {
       return  nannyRepository.findNannyByUsername(username);
    }



    public void deleteNanny(Long id) {
        nannyRepository.deleteById(id);
    }

    @Transactional
    public void updateScoreByAdding(Long nannyId, double newScore) {
        Nanny nanny = nannyRepository.findById(nannyId).orElse(null);
        if (nanny != null) {
            double currentScore = nanny.getScore();
            double updatedScore = currentScore + newScore;
            nanny.setScore(updatedScore);
            nannyRepository.save(nanny);
        }
    }

    public List<Nanny> findByFullNameContaining(String keyword) {
        return nannyRepository.findByFullNameContaining("%" + keyword + "%");
    }

    public Nanny findByEmail(String email) {

        return nannyRepository.findByEmail(email).orElse(null);
    }

    public List<Nanny> findByFullNameContainingAndRoleLevelAndType(String keyword, String roleLevel, String typeWork) {
        return nannyRepository.findByFullNameContainingAndRoleLevelAndType("%" + keyword + "%", roleLevel, typeWork);
    }

    public List<Nanny> findByRoleLevel(String roleLevel) {
        return nannyRepository.findByRoleLevel(roleLevel);
    }


    public List<Nanny> findByFullNameContainingAndRoleLevel(String keyword, String roleLevel) {
        return nannyRepository.findByFullNameContainingAndRoleLevel("%" + keyword + "%", roleLevel);
    }

    public List<Nanny> findByFullNameContainingAndTypeOfWork(String keyword, String typeWork) {
        return nannyRepository.findByFullNameContainingAndTypeOfWork("%" + keyword + "%", typeWork);
    }

    public List<Nanny> findByRoleLevelAndTypeOfWork(String roleLevel, String typeWork) {
        return nannyRepository.findByRoleLevelAndTypeOfWork(roleLevel, typeWork);
    }


    public List<Nanny> findNanniesByTypeOfWork(String type_work) {
        return nannyRepository.findByTypeOfWork(type_work);
    }

    // New
    public List<Nanny> findByGender(String gender) {
        return nannyRepository.findByGender(gender);
    }

    public List<Nanny> findByGenderAndTypeOfWork(String type_work, String gender) {
        return nannyRepository.findByTypeOfWorkAndGender(type_work, gender);
    }

    public List<Nanny> findByGenderAndRoleLevel(String roleLevel, String gender) {
        return nannyRepository.findByRoleLevelAndGender(roleLevel, gender);
    }

    public List<Nanny> findByGenderAndFullNameContaining(String keyword, String gender) {
        return nannyRepository.findByFullNameContainingAndGender("%" + keyword + "%",gender);
    }

    public List<Nanny> findByGenderAndTypeOfWorkAndRoleLevel(String roleLevel,String typeWork, String gender) {
        return nannyRepository.findByTypeOfWorkAndRoleLevelAndGender( roleLevel,typeWork, gender);
    }

    public List<Nanny> findsByGenderAndTypeOfWorkAndFullNameContaining(String keyword,String typeWork,String gender) {
        return nannyRepository.findByTypeOfWorkAndFullNameContainingAndGender( "%" + keyword + "%",typeWork,gender);
    }

    public List<Nanny> findByGenderAndRoleLevelAndFullNameContaining(String keyword, String roleLevel, String gender) {
        return nannyRepository.findByRoleLevelAndFullNameContainingAndGender("%" + keyword + "%",roleLevel,gender);
    }

    public List<Nanny> findByGenderAndTypeOfWorkAndRoleLevelAndFullNameContaining(String keyword,String roleLevel,String typeWork,String gender) {
        return nannyRepository.findByTypeOfWorkAndRoleLevelAndFullNameContainingAndGender( "%" + keyword + "%",roleLevel,typeWork,gender);
    }
    //

    // for District
    public List<Nanny> findNanniesByDistrict(String district) {
        return nannyRepository.findByDistrict(district);
    }

    public List<Nanny> findByGenderAndTypeOfWorkAndRoleLevelAndFullNameContainingandDistrict(String keyword,String roleLevel,String typeWork,String gender , String district) {
        return nannyRepository.findByTypeOfWorkAndRoleLevelAndFullNameContainingAndGenderAndDistrict( "%" + keyword + "%",roleLevel,typeWork,gender ,district );
    }

    public List<Nanny> findByRoleLevelAndTypeOfWorkAndFullNameContainingAndDistrict(String keyword, String roleLevel, String typeWork, String district) {
        return nannyRepository.findByRoleLevelAndTypeOfWorkAndFullNameContainingAndDistrict(keyword, roleLevel, typeWork, district);
    }

    public List<Nanny> findByGenderAndRoleLevelAndFullNameContainingAndDistrict(String keyword, String roleLevel, String gender, String district) {
        return nannyRepository.findByGenderAndRoleLevelAndFullNameContainingAndDistrict(keyword, roleLevel, gender, district);
    }

    public List<Nanny> findByGenderAndTypeOfWorkAndFullNameContainingAndDistrict(String keyword, String typeWork, String gender, String district) {
        return nannyRepository.findByGenderAndTypeOfWorkAndFullNameContainingAndDistrict(keyword, typeWork, gender, district);
    }

    public List<Nanny> findByFullNameContainingAndDistrict(String keyword, String district) {
        return nannyRepository.findByFullNameContainingAndDistrict(keyword, district);
    }

    public List<Nanny> findByRoleLevelAndDistrict(String roleLevel, String district) {
        return nannyRepository.findByRoleLevelAndDistrict(roleLevel, district);
    }

    public List<Nanny> findByTypeOfWorkAndDistrict(String typeWork, String district) {
        return nannyRepository.findByTypeOfWorkAndDistrict(typeWork, district);
    }

    public List<Nanny> findByGenderAndDistrict(String gender, String district) {
        return nannyRepository.findByGenderAndDistrict(gender, district);
    }
    //

//    public List<Object[]> getBookingHistoryByNannyId(Long nannyId) {
//        return bookingHistoryRepository.findByNannyId(nannyId);
//    }

    public List<BookingHistory> getBookingDataByNannyIdBH(Long nannyId) {
        return nannyRepository.findByNannyIdBH(nannyId);
    }

    public List<BookingQueue> getBookingDataByNannyIdBQ(Long nannyId) {
        return nannyRepository.findByNannyIdBQ(nannyId);
    }

    public List<BookingQueue> findPendingBQByNannyID(Long nannyId) {
        return nannyRepository.findBQByNannyIDAndNannyChoose(nannyId);
    }

    public List<BookingQueue> findBQByNannyIDStatusBookings(Long nannyId) {
        return nannyRepository.findBQByNannyIDStatusBookings(nannyId);
    }


}
