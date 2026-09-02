package com.logitrack.logitrack.controller;

import com.logitrack.logitrack.dto.request.ClientRequest;
import com.logitrack.logitrack.dto.response.ClientResponse;
import com.logitrack.logitrack.mapper.ClientMapper;
import com.logitrack.logitrack.entity.Client;
import com.logitrack.logitrack.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;
    private final ClientMapper clientMapper;

    public ClientController(ClientService clientService, ClientMapper clientMapper) {
        this.clientService = clientService;
        this.clientMapper = clientMapper;
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping
    public ResponseEntity<ClientResponse> addClient(@Valid @RequestBody ClientRequest request) {
        Client client = clientMapper.toEntity(request);
        Client savedClient = clientService.saveClient(client);
        return ResponseEntity.ok(clientMapper.toReponse(savedClient));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping
    public ResponseEntity<Page<ClientResponse>> getAllClients(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10")int size,
            @RequestParam(defaultValue = "name")String sortby,
            @RequestParam(defaultValue = "asc")String direction

    ) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ?Sort.by(sortby).descending()
                :Sort.by(sortby).ascending();
        Pageable pageable = PageRequest.of(page,size,sort);
        Page<ClientResponse> clients = clientService.getAllClients(pageable)
                .map(clientMapper::toReponse);
        return ResponseEntity.ok(clients);
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping("/{id}")
    public ResponseEntity<ClientResponse> getClientById(@PathVariable Long id) {
        Client client = clientService.getClientById(id);
        return ResponseEntity.ok(clientMapper.toReponse(client));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PutMapping("/{id}")
    public  ResponseEntity<ClientResponse> updateClient(@Valid @PathVariable Long id,@RequestBody ClientRequest request){
        Client updatedClient = clientService.updateClient(id,request);
        return ResponseEntity.ok(clientMapper.toReponse(updatedClient));
    }
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping("/count")
    public ResponseEntity<Long> getClientCount() {
        return ResponseEntity.ok(clientService.getClientCount());
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    @GetMapping("/search")
    public ResponseEntity<Page<ClientResponse>> searchClients(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortby,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortby).descending()
                : Sort.by(sortby).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ClientResponse> clients = clientService.searchClients(keyword, pageable)
                .map(clientMapper::toReponse);
        return ResponseEntity.ok(clients);
    }
}
