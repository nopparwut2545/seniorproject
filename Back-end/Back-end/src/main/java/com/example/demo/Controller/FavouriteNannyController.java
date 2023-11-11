package com.example.demo.Controller;
import com.example.demo.Model.Customer;
import com.example.demo.Model.FavouriteNanny;
import com.example.demo.Model.Nanny;
import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Service.FavouriteNannyService;
import com.example.demo.Service.NannyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/favouriteNanny")
@CrossOrigin(origins = "http://localhost:3000")
public class FavouriteNannyController {

    @Autowired
    FavouriteNannyService favouriteNannyService;

    @GetMapping
    public List<FavouriteNanny> gettest() {
        return favouriteNannyService.gettest();
    }


    @GetMapping("/getbyId/{customerId}")
    public List<FavouriteNanny> getAllfavNannies(@PathVariable Long customerId) {
        return favouriteNannyService.getNannyIdsByCustomerId(customerId);
    }


    @PostMapping
    public FavouriteNanny createFavoriteNanny(@RequestBody FavouriteNanny favoriteNanny) {
        return favouriteNannyService.saveFavoriteNanny(favoriteNanny);
    }


}
