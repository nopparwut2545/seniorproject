package com.example.demo.Service;
import com.example.demo.Model.FavouriteNanny;
import com.example.demo.Model.Nanny;
import com.example.demo.Repository.FavouriteNannyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteNannyService {

    @Autowired
    private FavouriteNannyRepository favouriteNannyRepository;

    public List<FavouriteNanny> gettest() {
        return favouriteNannyRepository.findAll();
    }
    public FavouriteNanny saveFavoriteNanny(FavouriteNanny favoriteNanny) {

        return favouriteNannyRepository.save(favoriteNanny);
    }

    public List<FavouriteNanny> getNannyIdsByCustomerId(Long customerId) {
        return favouriteNannyRepository.findFavoriteNanniesByCustomerID(customerId);
    }



}
