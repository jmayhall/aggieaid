package edu.tamu.aggieaid.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import edu.tamu.aggieaid.api.dto.ErrorDTO;
import edu.tamu.aggieaid.api.dto.ResourceDataDTO;
import edu.tamu.aggieaid.service.FileStorageService;

@RestController("/api/resources")
public class ImageResourceController {
    
    @Autowired
    FileStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            storageService.save(file);
            return ResponseEntity.status(HttpStatus.OK).body(ResourceDataDTO.builder()
                .name(file.getOriginalFilename())    
                .url(file.getResource().getURL().toString())
                .build());
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(ErrorDTO.builder()
                .error(HttpStatus.EXPECTATION_FAILED.name())
                .path("/api/resources/upload")
                .message(message)
                .build());
        }
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

}
