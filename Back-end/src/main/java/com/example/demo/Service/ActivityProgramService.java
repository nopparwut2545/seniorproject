package com.example.demo.Service;
import com.example.demo.Model.ActivityProgram;
import com.example.demo.Model.BookingQueue;

import com.example.demo.Repository.ActivityProgramRepository;
import com.example.demo.Repository.BookingQueueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityProgramService {

    @Autowired
    private ActivityProgramRepository activityProgramRepository;

    public List<ActivityProgram> getAllActivityprogram() {
        return activityProgramRepository.findAll();
    }

    public String getNormalPeriod1(){
        return activityProgramRepository.findNormalPeriod1();
    }

    public ActivityProgram saveActivityProgram(ActivityProgram activityProgram) {

        return activityProgramRepository.save(activityProgram);
    }

    public List<ActivityProgram> getActivityProgramById(Long customer_id){
        return activityProgramRepository.findActivityProgramByCustomerId(customer_id);
    }
}
