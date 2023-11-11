package com.example.demo.Controller;
import com.example.demo.Model.ActivityProgram;
import com.example.demo.Model.BookingHistory;

import com.example.demo.Model.BookingQueue;
import com.example.demo.Model.Nanny;
import com.example.demo.Service.NannyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/api/nannies")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from localhost:3000

public class NannyController {

    @Autowired
    NannyService nannyService;

    @GetMapping
    public List<Nanny> getAllNannies() {
        return nannyService.getAllNannies();
    }


    @GetMapping("/getby/{id}")
    public Nanny getNannyById(@PathVariable Long id) {
        return nannyService.getNanniesById(id);
    }

    @GetMapping("/getbyranking")
    public List<Nanny> getNannyRankingByScore() {
        return nannyService.findNannyRankingByScore();
    }

    @PostMapping("/register")
    public Nanny createNanny(@RequestBody Nanny nanny) {
        return nannyService.saveNanny(nanny);
    }

    @PutMapping("/{id}")
    public Nanny updateNanny(@PathVariable Long id, @RequestBody Nanny nanny) {
        // You should add logic to handle the update.
        // For simplicity, this example directly saves the received object.
        return nannyService.saveNanny(nanny);
    }

    @DeleteMapping("/{id}")
    public void deleteNanny(@PathVariable Long id) {
        nannyService.deleteNanny(id);
    }

    // Add a new endpoint to update the status to "Inactive"
    @PutMapping("/updateStatus/{username}")
    public ResponseEntity<String> updateNannyStatusToInactive(@PathVariable String username) {
        try {
            nannyService.updateNannyStatusToInactive(username);
            return ResponseEntity.ok("Nanny status updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating nanny status");
        }
    }

    @GetMapping("/getbyusername/{username}")
    public Nanny findNannyByUsername(@PathVariable String username) {
        return nannyService.findNannyByUsername(username);
    }

    @PutMapping("/updateScore/{nannyId}")
    public ResponseEntity<String> updateNannyScore(@PathVariable Long nannyId, @RequestParam double newScore) {
        try {
            nannyService.updateScoreByAdding(nannyId, newScore);
            return ResponseEntity.ok("Nanny score updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating nanny score");
        }
    }

    @GetMapping("/search")
    public List<Nanny> searchNanniesByFullName(@RequestParam String keyword) {
        return nannyService.findByFullNameContaining(keyword);
    }

    @GetMapping("/searchtest")
    public List<Nanny> searchNanniesByCriteria(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String role_level,
            @RequestParam(required = false) String type_work) {
        if (keyword != null && role_level != null) {
            return nannyService.findByFullNameContainingAndRoleLevel(keyword, role_level);
        } else if (keyword != null) {
            return nannyService.findByFullNameContaining(keyword);
        } else if (role_level != null) {
            return nannyService.findByRoleLevel(role_level);
        } else if (type_work != null) {
            return nannyService.findNanniesByTypeOfWork(type_work);
        } else {
            return Collections.emptyList(); // Return an empty list when no criteria are provided.
        }
    }

    // ล่าสุดใช้้ได้
//    @GetMapping("/searchtestall")
//    public List<Nanny> searchNanniesByCriteriaall(
//            @RequestParam(required = false) String keyword,
//            @RequestParam(required = false) String role_level,
//            @RequestParam(required = false) String type_work) {
//        if (keyword != null && role_level != null && type_work != null) {
//            return nannyService.findByFullNameContainingAndRoleLevelAndType(keyword, role_level, type_work);
//        } else if (keyword != null && role_level != null) {
//            return nannyService.findByFullNameContainingAndRoleLevel(keyword, role_level);
//        } else if (keyword != null && type_work != null) {
//            return nannyService.findByFullNameContainingAndTypeOfWork(keyword, type_work);
//        } else if (role_level != null && type_work != null) {
//            return nannyService.findByRoleLevelAndTypeOfWork(role_level, type_work);
//        } else if (keyword != null) {
//            return nannyService.findByFullNameContaining(keyword);
//        } else if (role_level != null) {
//            return nannyService.findByRoleLevel(role_level);
//        } else if (type_work != null) {
//            return nannyService.findNanniesByTypeOfWork(type_work);
//        } else {
//            return Collections.emptyList(); // Return an empty list when no criteria are provided.
//        }
//    }
    // ล่าสุด มี gender
//    @GetMapping("/searchtestall")
//    public List<Nanny> searchNanniesByCriteriaall(
//            @RequestParam(required = false) String keyword,
//            @RequestParam(required = false) String role_level,
//            @RequestParam(required = false) String type_work,
//            @RequestParam(required = false) String gender) {
//        if (keyword != null && role_level != null && type_work != null && gender != null) {
//            return nannyService.findByGenderAndTypeOfWorkAndRoleLevelAndFullNameContaining(keyword, role_level, type_work, gender);
//        } else if (keyword != null && role_level != null && type_work != null) {
//            return nannyService.findByFullNameContainingAndRoleLevelAndType(keyword, role_level, type_work);
//
//        }else if (role_level != null && type_work != null && gender != null ) {
//            return nannyService.findByGenderAndTypeOfWorkAndRoleLevel(role_level, type_work, gender);
//
//        }else if ( keyword != null && type_work != null && gender != null ) {
//            return nannyService.findsByGenderAndTypeOfWorkAndFullNameContaining(keyword, type_work, gender);
//
//        }else if ( keyword != null && role_level != null && gender != null) {
//            return nannyService.findByGenderAndRoleLevelAndFullNameContaining(keyword,  role_level,  gender);
//
//        } else if (keyword != null && role_level != null) {
//            return nannyService.findByFullNameContainingAndRoleLevel(keyword, role_level);
//        } else if (keyword != null && type_work != null) {
//            return nannyService.findByFullNameContainingAndTypeOfWork(keyword, type_work);
//
//        } else if (keyword != null && gender != null) {
//            return nannyService.findByGenderAndFullNameContaining(keyword, gender);
//        } else if (role_level != null && type_work != null) {
//            return nannyService.findByRoleLevelAndTypeOfWork(role_level, type_work);
//
//        } else if (role_level != null && gender != null) {
//            return nannyService.findByGenderAndRoleLevel(role_level,  gender);
//        } else if ( type_work != null && gender != null ) {
//            return nannyService.findByGenderAndTypeOfWork(type_work,  gender);
//
//        } else if (keyword != null) {
//            return nannyService.findByFullNameContaining(keyword);
//        } else if (role_level != null) {
//            return nannyService.findByRoleLevel(role_level);
//        } else if (type_work != null) {
//            return nannyService.findNanniesByTypeOfWork(type_work);
//        } else if (gender != null) {
//            return nannyService.findByGender(gender);
//        } else {
//            return Collections.emptyList(); // Return an empty list when no criteria are provided.
//        }
//    }
//    @GetMapping("/searchtestall")
//    public List<Nanny> searchNanniesByCriteriaall(
//            @RequestParam(required = false) String keyword,
//            @RequestParam(required = false) String role_level,
//            @RequestParam(required = false) String type_work,
//            @RequestParam(required = false) String gender,
//            @RequestParam(required = false) String district) {
//        if (keyword != null && role_level != null && type_work != null && gender != null && district != null) {
//            return nannyService.findByGenderAndTypeOfWorkAndRoleLevelAndFullNameContainingandDistrict(keyword, role_level, type_work, gender, district);
//        } else if (keyword != null && role_level != null && type_work != null) {
//            return nannyService.findByGenderAndTypeOfWorkAndRoleLevelAndFullNameContaining(keyword, role_level, type_work, gender);
//        } else if (role_level != null && type_work != null && gender != null) {
//            return nannyService.findByGenderAndTypeOfWorkAndRoleLevel(role_level, type_work, gender);
//        } else if (keyword != null && type_work != null && gender != null) {
//            return nannyService.findsByGenderAndTypeOfWorkAndFullNameContaining(keyword, type_work, gender);
//        } else if (keyword != null && role_level != null && gender != null) {
//            return nannyService.findByGenderAndRoleLevelAndFullNameContaining(keyword, role_level, gender);
//        } else if (keyword != null && role_level != null) {
//            return nannyService.findByFullNameContainingAndRoleLevel(keyword, role_level);
//        } else if (keyword != null && type_work != null) {
//            return nannyService.findByFullNameContainingAndTypeOfWork(keyword, type_work);
//        } else if (keyword != null && gender != null) {
//            return nannyService.findByGenderAndFullNameContaining(keyword, gender);
//        } else if (role_level != null && type_work != null) {
//            return nannyService.findByRoleLevelAndTypeOfWork(role_level, type_work);
//        } else if (role_level != null && gender != null) {
//            return nannyService.findByGenderAndRoleLevel(role_level, gender);
//        } else if (type_work != null && gender != null) {
//            return nannyService.findByGenderAndTypeOfWork(type_work, gender);
//        } else if (keyword != null) {
//            return nannyService.findByFullNameContaining(keyword);
//        } else if (role_level != null) {
//            return nannyService.findByRoleLevel(role_level);
//        } else if (type_work != null) {
//            return nannyService.findNanniesByTypeOfWork(type_work);
//        } else if (gender != null) {
//            return nannyService.findByGender(gender);
//        } else if (district != null) {
//            return nannyService.findNanniesByDistrict(district);
//        } else {
//            return Collections.emptyList(); // Return an empty list when no criteria are provided.
//        }
//    }
    @GetMapping("/searchtestall")
    public List<Nanny> searchNanniesByCriteriaall(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String role_level,
            @RequestParam(required = false) String type_work,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String district) {
        if (keyword != null && role_level != null && type_work != null && gender != null && district != null) {
            return nannyService.findByGenderAndTypeOfWorkAndRoleLevelAndFullNameContainingandDistrict(keyword, role_level, type_work, gender, district);
        } else if (keyword != null && role_level != null && type_work != null && district != null) {
            return nannyService.findByRoleLevelAndTypeOfWorkAndFullNameContainingAndDistrict(keyword, role_level, type_work, district);
        } else if (keyword != null && role_level != null && gender != null && district != null) {
            return nannyService.findByGenderAndRoleLevelAndFullNameContainingAndDistrict(keyword, role_level, gender, district);
        } else if (keyword != null && type_work != null && gender != null && district != null) {
            return nannyService.findByGenderAndTypeOfWorkAndFullNameContainingAndDistrict(keyword, type_work, gender, district);
        } else if (keyword != null && district != null) {
            return nannyService.findByFullNameContainingAndDistrict(keyword, district);
        } else if (role_level != null && district != null) {
            return nannyService.findByRoleLevelAndDistrict(role_level, district);
        } else if (type_work != null && district != null) {
            return nannyService.findByTypeOfWorkAndDistrict(type_work, district);
        } else if (gender != null && district != null) {
            return nannyService.findByGenderAndDistrict(gender, district);
        } else if (keyword != null && role_level != null && type_work != null) {
            return nannyService.findByGenderAndTypeOfWorkAndRoleLevelAndFullNameContaining(keyword, role_level, type_work, gender);
        } else if (keyword != null && role_level != null && gender != null) {
            return nannyService.findByGenderAndRoleLevelAndFullNameContaining(keyword, role_level, gender);
        } else if (keyword != null && type_work != null && gender != null) {
            return nannyService.findsByGenderAndTypeOfWorkAndFullNameContaining(keyword, type_work, gender);
        } else if (keyword != null && role_level != null) {
            return nannyService.findByFullNameContainingAndRoleLevel(keyword, role_level);
        } else if (keyword != null && type_work != null) {
            return nannyService.findByFullNameContainingAndTypeOfWork(keyword, type_work);
        } else if (keyword != null && gender != null) {
            return nannyService.findByGenderAndFullNameContaining(keyword, gender);
        } else if (role_level != null && type_work != null) {
            return nannyService.findByRoleLevelAndTypeOfWork(role_level, type_work);
        } else if (role_level != null && gender != null) {
            return nannyService.findByGenderAndRoleLevel(role_level, gender);
        } else if (type_work != null && gender != null) {
            return nannyService.findByGenderAndTypeOfWork(type_work, gender);
        } else if (keyword != null) {
            return nannyService.findByFullNameContaining(keyword);
        } else if (role_level != null) {
            return nannyService.findByRoleLevel(role_level);
        } else if (type_work != null) {
            return nannyService.findNanniesByTypeOfWork(type_work);
        } else if (gender != null) {
            return nannyService.findByGender(gender);
        } else if (district != null) {
            return nannyService.findNanniesByDistrict(district);
        } else {
            return Collections.emptyList(); // Return an empty list when no criteria are provided.
        }
    }


    @GetMapping("/searchgender/{gender}")
    public List<Nanny> searchNanniesByGender(@PathVariable String gender) {
        return nannyService.findByGender(gender);
    }


    @PutMapping("/updatebyAdmin/{nannyId}")
    public Nanny updateActivityProgram(@PathVariable Long nannyId, @RequestBody Nanny nanny) {
        return nannyService.saveNannyByAdmin(nanny);
    }

    //    @GetMapping("/booking-history")
//    public List[] getBookingHistoryForNanny(@RequestParam Long nannyId) {
//        return nannyService.getBookingHistoryByNannyId(nannyId);
//    }
//
//    @GetMapping("/bookingtest/{nannyId}")
//    public List[] getBookingHistoryForNannytest(@PathVariable Long nannyId) {
//        return nannyService.getBookingHistoryByNannyId(nannyId);
//    }
    @GetMapping("/booking-dataBH/{nannyId}")
    public List<BookingHistory> getBookingDataByNannyIdBH(@PathVariable Long nannyId) {
        return nannyService.getBookingDataByNannyIdBH(nannyId);
    }

    @GetMapping("/booking-dataBQ/{nannyId}")
    public List<BookingQueue> getBookingDataByNannyIdBQ(@PathVariable Long nannyId) {
        return nannyService.getBookingDataByNannyIdBQ(nannyId);
    }

    @GetMapping("/booking-queues/pending/{nannyId}")
    public List<BookingQueue> getPendingBookingQueuesByNannyId(@PathVariable Long nannyId) {
        return nannyService.findPendingBQByNannyID(nannyId);
    }

    @GetMapping("/bookings/byNannyId/{nannyId}")
    public List<BookingQueue> findBQByNannyIDStatusBookings(@PathVariable Long nannyId) {
        return nannyService.findBQByNannyIDStatusBookings(nannyId);
    }
}
