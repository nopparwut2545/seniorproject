package com.example.demo.Repository;
import com.example.demo.Model.Customer;
import com.example.demo.Model.FavouriteNanny;
import com.example.demo.Model.Nanny;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface FavouriteNannyRepository extends JpaRepository<FavouriteNanny, Long> {



    @Query("SELECT n FROM FavouriteNanny n WHERE n.customer_id = ?1")
    List<FavouriteNanny> findFavoriteNanniesByCustomerID(@Param("customerId") Long customerId);


}
