// Configuração da aplicação Cartesi
export const CARTESI_CONFIG = {
    // Endereço do contrato da aplicação Cartesi
    appAddress: "0xa966c86F18D463C90DA64940053B411Be671E77E" as `0x${string}`,
    
    // Endereço do node Cartesi
    nodeAddress: "http://localhost:8080",
    
    // Configurações adicionais
    defaultTimeout: 30000, // 30 segundos
    maxRetries: 3,
  };
  