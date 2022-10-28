package edu.tamu.aggieaid.api.controller;

import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import edu.tamu.aggieaid.api.dto.ErrorDTO;
import edu.tamu.aggieaid.api.dto.ResourceDataDTO;
import edu.tamu.aggieaid.service.FileStorageService;

@Controller()
@RequestMapping("/api/resources")
public class ImageResourceController {
    
    @Autowired
    FileStorageService storageService;

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            Path filePath = storageService.save(file);
            return ResponseEntity.status(HttpStatus.OK).body(ResourceDataDTO.builder()
                .name(filePath.getFileName().toString())    
                .url("http://localhost:8080" + "/api/resources/public/" + filePath.getFileName().toString())
                .build());
        } catch (Exception e) {
            e.printStackTrace();
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(ErrorDTO.builder()
                .error(HttpStatus.EXPECTATION_FAILED.name())
                .path("/api/resources/upload")
                .message(message)
                .build());
        }
    }

    @GetMapping("/public/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

}
