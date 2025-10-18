'use client'; 

import { useState } from 'react';

export default function Home() {
    
    // --- Nossos Estados ---
    const [theme, setTheme] = useState("Aperte para gerar um tema!");
    const [isThemeLoading, setIsThemeLoading] = useState(false);
    const [themeError, setThemeError] = useState(null);
    const [cardNumber, setCardNumber] = useState('?');
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // --- Nossas Funções ---
    const handleGetTheme = async () => {
        setIsThemeLoading(true);
        setThemeError(null);
        setTheme("Gerando...");
        try {
            // Usamos o modelo que funcionou (gemini-2.0-flash ou outro)
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

    const handleDrawCard = () => {
        if (isCardFlipped) return; // Não deixa virar de novo
        const newNumber = Math.floor(Math.random() * 100) + 1;
        setCardNumber(newNumber);
        setIsCardFlipped(true);
    };

    // --- Nosso JSX (HTML) ---
    return (
        <main className="main-wrapper">
            
            {/* Ícone de Informação (continua no topo) */}
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

                {/* Mostra o botão "Puxar" e instruções SÓ se a carta não estiver virada */}
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

                {/* Seu footer de créditos */}
                <p className="footer-credits">
                    @jfabioguimaraes :)
                </p>
            </div>

            {/* Modal de Regras (só aparece se showModal for true) */}
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