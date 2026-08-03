package com.logitrack.logitrack.controller;

import com.logitrack.logitrack.dto.request.ClientRequest;
import com.logitrack.logitrack.dto.response.ClientResponse;
import com.logitrack.logitrack.mapper.ClientMapper;
import com.logitrack.logitrack.model.Client;
import com.logitrack.logitrack.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clientService;
    private final ClientMapper clientMapper;

    public ClientController(ClientService clientService, ClientMapper clientMapper) {
        this.clientService = clientService;
        this.clientMapper = clientMapper;
    }

    @PostMapping
    public ResponseEntity<ClientResponse> addClient(@RequestBody ClientRequest request) {
        Client client = clientMapper.toEntity(request);
        Client savedClient = clientService.saveClient(client);
        return ResponseEntity.ok(clientMapper.toReponse(savedClient));
    }

    @GetMapping
    public ResponseEntity<List<ClientResponse>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        return ResponseEntity.ok(clientMapper.toResponseList(clients));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponse> getClientById(@PathVariable Long id) {
        Client client = clientService.getClientById(id);
        return ResponseEntity.ok(clientMapper.toReponse(client));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
