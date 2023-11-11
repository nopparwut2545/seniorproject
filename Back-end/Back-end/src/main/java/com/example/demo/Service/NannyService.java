package com.example.demo.Service;

import com.example.demo.Model.Nanny;
import com.example.demo.Repository.NannyRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NannyService {
    @Autowired
    private NannyRepository nannyRepository;
    @Autowired
    private CommonService commonService;

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

}
