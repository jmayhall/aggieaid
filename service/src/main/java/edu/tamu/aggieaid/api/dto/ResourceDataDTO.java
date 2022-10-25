package edu.tamu.aggieaid.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResourceDataDTO {
    private String name;
    private String url;
}
