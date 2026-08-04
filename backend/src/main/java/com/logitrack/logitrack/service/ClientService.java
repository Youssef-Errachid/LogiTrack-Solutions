package com.logitrack.logitrack.service;

import com.logitrack.logitrack.dto.request.ClientRequest;
import com.logitrack.logitrack.mapper.ClientMapper;
import com.logitrack.logitrack.model.Client;
import com.logitrack.logitrack.repository.ClientRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public ClientService(ClientRepository clientRepository, ClientMapper clientMapper) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
    }

    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
    }

    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    public Client updateClient(Long id, ClientRequest request) {
        Client client = getClientById(id);
        clientMapper.updateClientFromRequest(request,client);
        return clientRepository.save(client);
    }
}