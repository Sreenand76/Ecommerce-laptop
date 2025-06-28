package sreenand76.ecommerce_backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import jakarta.transaction.Transactional;
import sreenand76.ecommerce_backend.entity.WishList;
import sreenand76.ecommerce_backend.entity.Laptop;

public interface WishListRepository extends JpaRepository<WishList, Long> {

    List<WishList> findByUserEmail(String email);

    @Transactional
    @Modifying
    @Query("DELETE FROM WishList w WHERE w.userEmail = :userEmail AND w.laptop = :laptop")
    int deleteByUserEmailAndLaptop(String userEmail, Laptop laptop);
}

