package com.filtness.activityservice.model;

import java.time.LocalDateTime;
import java.util.Map;

public class Activity {
    private String id;
    private String userId;
    private ActivityType type;
    private Integer duration;
    private Integer caloriesBurned;
    private LocalDateTime startedTime;
    private Map<String, Object> additionalMatrics;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
