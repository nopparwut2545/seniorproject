package com.example.demo.Controller;
import com.example.demo.Model.Nanny;
import com.example.demo.Service.NannyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

}
