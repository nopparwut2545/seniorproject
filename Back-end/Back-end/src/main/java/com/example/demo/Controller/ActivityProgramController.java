package com.example.demo.Controller;
import com.example.demo.Model.ActivityProgram;
import com.example.demo.Service.ActivityProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/activityprogram")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityProgramController {

    @Autowired
    ActivityProgramService activityProgramService;

    @GetMapping
    public List<ActivityProgram> getAllActivityprogram() {
        return activityProgramService.getAllActivityprogram();
    }

    @GetMapping("/getbyusername/{customer_id}")
    public List<ActivityProgram> getActivityProgramById(@PathVariable Long customer_id) {
        return activityProgramService.getActivityProgramById(customer_id);
    }

    @PutMapping("/{customer_id}")
    public ActivityProgram updateActivityProgram(@PathVariable Long customer_id, @RequestBody ActivityProgram activityProgram){
        return activityProgramService.saveActivityProgram(activityProgram);
    }

    @PostMapping
    public ActivityProgram createActivityProgram(@RequestBody ActivityProgram activityProgram) {

        return activityProgramService.saveActivityProgram(activityProgram);
    }
}