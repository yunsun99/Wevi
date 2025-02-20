package com.ssafy.wevi.domain.schedule;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "other_schedules")
@DiscriminatorValue("other_schedule")
@NoArgsConstructor
public class OtherSchedule extends Schedule{
    private String detail;
}
