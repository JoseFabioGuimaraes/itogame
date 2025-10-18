'use client'; 

import { useState } from 'react';

export default function Home() {
    
    // --- Nossos Estados (Sem alteração) ---
    const [theme, setTheme] = useState("Aperte para gerar um tema!");
    const [isThemeLoading, setIsThemeLoading] = useState(false);
    const [themeError, setThemeError] = useState(null);
    const [cardNumber, setCardNumber] = useState('?');
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // --- Nossas Funções (COM ALTERAÇÕES) ---

    const handleGetTheme = async () => {
        setIsThemeLoading(true);
        setThemeError(null);
        setTheme("Gerando...");
        try {
            const response = await fetch('/api/get-theme'); 
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Falha na requisição");
            }
            const data = await response.json();
            setTheme(data.theme);
        } catch (error) {
            console.error(error);
            setThemeError("Erro ao gerar. Tente de novo!");
            setTheme("Aperte para gerar um tema!"); 
        } finally {
            setIsThemeLoading(false);
        }
    };

    // --- NOVA FUNÇÃO HELPER ---
    // Gera um número aleatório criptograficamente seguro entre 1 e 100
    function getCryptoRandomInt() {
        // Cria um "array" para guardar um número de 32 bits
        const randomBuffer = new Uint32Array(1);

        // Preenche o array com um valor aleatório seguro
        window.crypto.getRandomValues(randomBuffer);

        // Pega o valor (um número entre 0 e 4294967295)
        const randomValue = randomBuffer[0];

        // Converte esse valor para um percentual (0.0 a 0.999...)
        // 4294967296 é 2^32
        const percentile = randomValue / 4294967296; 

        // Multiplica pelo nosso range (100) e arredonda para baixo (0-99),
        // depois soma 1 (1-100).
        return Math.floor(percentile * 100) + 1;
    }
    // --- FIM DA NOVA FUNÇÃO ---


    const handleDrawCard = () => {
        if (isCardFlipped) return; 
        
        // --- A GRANDE MUDANÇA ESTÁ AQUI ---
        // const newNumber = Math.floor(Math.random() * 100) + 1; // <-- Método antigo
        const newNumber = getCryptoRandomInt(); // <-- NOVO MÉTODO CRIPTOGRÁFICO
        
        setCardNumber(newNumber);
        setIsCardFlipped(true);
    };

    // --- Nosso JSX (O HTML) ---
    return (
        <main className="main-wrapper">
            
            {/* Ícone de Informação */}
            <div id="info-icon" className="info-icon" onClick={() => setShowModal(true)}>
                i
            </div>

            {/* 1. ÁREA DO TEMA (Topo) */}
            <div className="theme-container">
                <h2 id="theme-display">
                    {themeError ? themeError : theme}
                </h2>
            </div>

            {/* 2. ÁREA DA CARTA (Meio) */}
            <div className="container">
                <div 
                    id="card" 
                    className={!isCardFlipped ? "card-back" : ""} 
                    onClick={handleDrawCard}
                >
                    <span 
                        id="number-display" 
                        className={isCardFlipped ? "reveal-animation" : ""}
                    >
                        {cardNumber}
                    </span>
                    
                    {!isCardFlipped && <div className="card-detail"></div>}
                </div>
            </div>

            {/* 3. ÁREA DE CONTROLES (Baixo) */}
            <div className="controls-container">
                
                <button 
                    id="theme-button" 
                    onClick={handleGetTheme} 
                    disabled={isThemeLoading}
                >
                    {isThemeLoading ? "Gerando..." : "Gerar Tema"}
                </button>
                
                {!isCardFlipped && (
                    <>
                        <button id="draw-button" onClick={handleDrawCard}>
                            Puxar minha carta
                        </button>
                        <p className="instructions">
                            Puxe sua carta e <strong>não mostre</strong> para ninguém!
                        </p>
                    </>
                )}
                
                <p className="footer-credits">
                    @jfabioguimaraes :)
                </p>
            </div>

            {/* Modal de Regras */}
            {showModal && (
                <div 
                    id="info-modal" 
                    className="modal-overlay visible"
                    onClick={() => setShowModal(false)}
                >
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span 
                            id="close-modal" 
                            className="close-modal"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
                        <h2>Como jogar?</h2>
                        <p>O objetivo é organizar as cartas de todos (1-100) em ordem crescente, <strong>sem dizer seu número!</strong></p>
                        <ol>
                            {/* Corrigido para o linter (usando &apos;) */}
                            <li>Um 'tema' é escolhido (ex: 'Nível de pânico').</li>
                            <li>Se seu número for baixo (ex: 3), sua pista deve ser algo calmo (ex: 'Ver TV em casa').</li>
                            <li>Se seu número for alto (ex: 98), sua pista deve ser desesperadora (ex: 'O avião caindo').</li>
                        </ol>
                    </div>
                </div>
            )}
        </main>
    );
}