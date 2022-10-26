package edu.tamu.aggieaid.service;

import java.nio.file.Path;
import java.util.stream.Stream;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    public void init();
    public Path save(MultipartFile file);
    public Resource load(String fileName);
    public void deleteAll();
    public Stream<Path> loadAll();
}
