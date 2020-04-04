package entities;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Topic {
    private int id;
    private String topic;
    private String nick;
    private Long time;
}
