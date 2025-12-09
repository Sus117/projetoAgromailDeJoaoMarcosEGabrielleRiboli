/* ============================================
   CONTROLES JS — PAINEL DE CONFIGURAÇÕES E RECLAMAÇÕES
============================================ */

/* === PAINEL DE CONFIGURAÇÕES === */
document.addEventListener('DOMContentLoaded', function() {
    const settingsToggle = document.getElementById("settingsToggle");
    const themePanel = document.getElementById("themePanel");
    
    if (settingsToggle && themePanel) {
        settingsToggle.onclick = () => {
            themePanel.classList.toggle("active");
            // Fechar outros painéis se estiverem abertos
            if (feedbackPanel && feedbackPanel.classList.contains('active')) {
                feedbackPanel.classList.remove("active");
                resetForm();
            }
            if (cursorPanel && cursorPanel.classList.contains('active')) {
                cursorPanel.classList.remove("active");
            }
            // Fechar modal Sobre Nós se estiver aberto
            if (aboutOverlay && aboutOverlay.style.display === 'flex') {
                aboutOverlay.style.display = 'none';
            }
        };
    }
    
    // Fechar painel clicando fora
    document.addEventListener('click', (e) => {
        if (themePanel && themePanel.classList.contains('active') && 
            !themePanel.contains(e.target) && 
            !settingsToggle.contains(e.target)) {
            themePanel.classList.remove("active");
        }
    });
    
    // Fechar painel com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && themePanel && themePanel.classList.contains('active')) {
            themePanel.classList.remove("active");
        }
    });
});

/* ============================================
   CONTROLES DO MODAL "SOBRE NÓS"
============================================ */
document.addEventListener('DOMContentLoaded', function() {
    const openAboutBtn = document.getElementById("openAboutBtn");
    const aboutOverlay = document.getElementById("aboutOverlay");
    const closeAboutBtn = document.getElementById("closeAboutBtn");

    // Abrir modal "Sobre Nós"
    if (openAboutBtn) {
        openAboutBtn.onclick = () => {
            if (aboutOverlay) {
                aboutOverlay.style.display = "flex";
                // Fechar painéis se estiverem abertos
                if (themePanel) themePanel.classList.remove("active");
                if (feedbackPanel) feedbackPanel.classList.remove("active");
                if (cursorPanel) cursorPanel.classList.remove("active");
                // Fechar modal de login se estiver aberto
                const overlay = document.getElementById("menuOverlay");
                if (overlay) overlay.style.display = "none";
            }
        };
    }

    // Fechar modal "Sobre Nós"
    if (closeAboutBtn) {
        closeAboutBtn.onclick = () => {
            if (aboutOverlay) aboutOverlay.style.display = "none";
        };
    }

    // Fechar modal "Sobre Nós" clicando fora
    if (aboutOverlay) {
        aboutOverlay.onclick = (e) => {
            if (e.target === aboutOverlay) {
                aboutOverlay.style.display = "none";
            }
        };
    }

    // Fechar modal "Sobre Nós" com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutOverlay && aboutOverlay.style.display === 'flex') {
            aboutOverlay.style.display = 'none';
        }
    });

    // Tooltip para o botão "Sobre Nós"
    if (openAboutBtn) {
        openAboutBtn.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.id = 'aboutTooltip';
            tooltip.textContent = 'Clique para saber mais sobre nós';
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0,0,0,0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '14px';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '2001';
            tooltip.style.top = '70px';
            tooltip.style.left = '0';
            tooltip.style.pointerEvents = 'none';
            
            // Remover tooltip anterior se existir
            const existingTooltip = document.getElementById('aboutTooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            openAboutBtn.parentNode.appendChild(tooltip);
        });

        openAboutBtn.addEventListener('mouseleave', () => {
            const tooltip = document.getElementById('aboutTooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    }
});

/* ============================================
   CONTROLES DO CURSOR DO MOUSE
============================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do cursor
    const cursorToggle = document.getElementById("cursorToggle");
    const cursorPanel = document.getElementById("cursorPanel");
    const cancelCursor = document.getElementById("cancelCursor");
    const applyCursor = document.getElementById("applyCursor");
    const cursorOptions = document.querySelectorAll(".cursor-type");
    const circleYes = document.getElementById("circleYes");
    const circleNo = document.getElementById("circleNo");
    
    // Estado atual das configurações
    let currentCursorType = localStorage.getItem("cursorType") || "default";
    let circleEnabled = localStorage.getItem("circleEnabled") !== "false"; // true por padrão
    
    // Inicializar configurações salvas do cursor
    function loadCursorSettings() {
        // Definir cursor ativo
        if (cursorOptions) {
            cursorOptions.forEach(option => {
                if (option.dataset.cursor === currentCursorType) {
                    option.classList.add("active");
                } else {
                    option.classList.remove("active");
                }
            });
        }
        
        // Definir círculo ativo
        if (circleYes && circleNo) {
            if (circleEnabled) {
                circleYes.classList.add("active");
                circleNo.classList.remove("active");
            } else {
                circleYes.classList.remove("active");
                circleNo.classList.add("active");
            }
        }
        
        // Aplicar cursor atual
        applyCursorToBody();
    }
    
    // Aplicar cursor ao body
    function applyCursorToBody() {
        document.body.style.cursor = currentCursorType;
        
        // Se circleEnabled for true, adicionar evento de clique para mostrar círculo
        if (circleEnabled) {
            document.addEventListener('click', showClickCircle);
        } else {
            document.removeEventListener('click', showClickCircle);
        }
    }
    
    // Mostrar círculo no clique
    function showClickCircle(e) {
        // Criar elemento do círculo
        const circle = document.createElement('div');
        circle.style.position = 'fixed';
        circle.style.width = '40px';
        circle.style.height = '40px';
        circle.style.borderRadius = '50%';
        circle.style.pointerEvents = 'none';
        circle.style.zIndex = '9999';
        circle.style.transform = 'translate(-50%, -50%)';
        circle.style.animation = 'clickCircle 0.5s ease-out forwards';
        
        // Definir cor baseada no tema
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            circle.style.backgroundColor = '#fff'; // Branco no tema escuro
            circle.style.border = '2px solid #fff';
        } else {
            circle.style.backgroundColor = '#cc6600'; // Laranja no tema claro
            circle.style.border = '2px solid #cc6600';
        }
        
        // Posicionar onde foi clicado
        circle.style.left = `${e.clientX}px`;
        circle.style.top = `${e.clientY}px`;
        
        // Adicionar ao body
        document.body.appendChild(circle);
        
        // Remover após animação
        setTimeout(() => {
            circle.remove();
        }, 500);
    }
    
    // Estilo para a animação do círculo
    const circleStyle = document.createElement('style');
    circleStyle.textContent = `
        @keyframes clickCircle {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0.8;
            }
            100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(circleStyle);
    
    // Abrir/fechar painel de cursor
    if (cursorToggle && cursorPanel) {
        cursorToggle.onclick = (e) => {
            e.stopPropagation();
            loadCursorSettings(); // Carregar configurações salvas
            cursorPanel.classList.toggle("active");
            // Fechar outros painéis
            closeAllPanelsExcept('cursor');
        };
    }
    
    // Fechar painel de cursor
    if (cancelCursor) {
        cancelCursor.onclick = () => {
            cursorPanel.classList.remove("active");
        };
    }
    
    // Selecionar tipo de cursor
    if (cursorOptions) {
        cursorOptions.forEach(option => {
            option.addEventListener('click', () => {
                cursorOptions.forEach(opt => opt.classList.remove("active"));
                option.classList.add("active");
                currentCursorType = option.dataset.cursor;
                
                // Aplicar cursor à prévia
                const preview = option.querySelector('.cursor-preview');
                if (preview) {
                    preview.style.cursor = currentCursorType;
                }
            });
        });
    }
    
    // Selecionar opção de círculo
    if (circleYes && circleNo) {
        circleYes.addEventListener('click', () => {
            circleYes.classList.add("active");
            circleNo.classList.remove("active");
            circleEnabled = true;
        });
        
        circleNo.addEventListener('click', () => {
            circleYes.classList.remove("active");
            circleNo.classList.add("active");
            circleEnabled = false;
        });
    }
    
    // Aplicar configurações do cursor
    if (applyCursor) {
        applyCursor.addEventListener('click', () => {
            // Salvar configurações
            localStorage.setItem("cursorType", currentCursorType);
            localStorage.setItem("circleEnabled", circleEnabled);
            
            // Aplicar configurações
            applyCursorToBody();
            
            // Fechar painel
            cursorPanel.classList.remove("active");
            
            // Mostrar feedback visual
            showTemporaryMessage("Configurações do cursor aplicadas!", "success");
        });
    }
    
    // Fechar todos os painéis exceto um específico
    function closeAllPanelsExcept(except) {
        const panels = {
            'cursor': cursorPanel,
            'feedback': feedbackPanel,
            'theme': themePanel
        };
        
        for (const [key, panel] of Object.entries(panels)) {
            if (key !== except && panel) {
                panel.classList.remove("active");
            }
        }
        
        // Fechar modais também
        if (aboutOverlay) aboutOverlay.style.display = 'none';
        const overlay = document.getElementById("menuOverlay");
        if (overlay) overlay.style.display = 'none';
    }
    
    // Mostrar mensagem temporária
    function showTemporaryMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.right = '20px';
        messageDiv.style.padding = '12px 20px';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.zIndex = '2000';
        messageDiv.style.fontWeight = '600';
        messageDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#48bb78';
            messageDiv.style.color = 'white';
        } else {
            messageDiv.style.backgroundColor = '#f56565';
            messageDiv.style.color = 'white';
        }
        
        document.body.appendChild(messageDiv);
        
        // Remover após 3 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
    
    // Fechar painel de cursor com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cursorPanel && cursorPanel.classList.contains('active')) {
            cursorPanel.classList.remove("active");
        }
    });
    
    // Inicializar configurações do cursor ao carregar a página
    window.addEventListener('load', () => {
        loadCursorSettings();
    });
});

/* ============================================
   CONTROLES DO PAINEL DE RECLAMAÇÕES
============================================ */
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const feedbackToggle = document.getElementById("feedbackToggle");
    const feedbackPanel = document.getElementById("feedbackPanel");
    const cancelFeedback = document.getElementById("cancelFeedback");
    const feedbackForm = document.getElementById("feedbackForm");
    const statusMessage = document.getElementById("statusMessage");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const submitBtn = document.getElementById("submitBtn");
    
    // Email de destino (altere este valor conforme necessário)
    const DESTINATION_EMAIL = "joaomarcosdasilvapereira13579@gmail.com";

    // Abrir/fechar painel de reclamações
    if (feedbackToggle && feedbackPanel) {
        feedbackToggle.onclick = (e) => {
            e.stopPropagation();
            feedbackPanel.classList.toggle("active");
            // Fechar outros painéis se estiverem abertos
            if (themePanel && themePanel.classList.contains('active')) {
                themePanel.classList.remove("active");
            }
            if (cursorPanel && cursorPanel.classList.contains('active')) {
                cursorPanel.classList.remove("active");
            }
            // Fechar modal Sobre Nós se estiver aberto
            if (aboutOverlay && aboutOverlay.style.display === 'flex') {
                aboutOverlay.style.display = 'none';
            }
        };
    }

    // Fechar painel de reclamações
    if (cancelFeedback) {
        cancelFeedback.onclick = () => {
            feedbackPanel.classList.remove("active");
            resetForm();
        };
    }

    // Fechar painel clicando fora
    document.addEventListener('click', (e) => {
        if (feedbackPanel.classList.contains('active') && 
            !feedbackPanel.contains(e.target) && 
            !feedbackToggle.contains(e.target)) {
            feedbackPanel.classList.remove("active");
            resetForm();
        }
    });

    // Fechar painel com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && feedbackPanel.classList.contains('active')) {
            feedbackPanel.classList.remove("active");
            resetForm();
        }
    });

    // Resetar formulário
    function resetForm() {
        if (feedbackForm) {
            feedbackForm.reset();
            hideStatusMessage();
            hideLoading();
        }
    }

    // Mostrar loading
    function showLoading() {
        if (loadingSpinner) {
            loadingSpinner.style.display = "block";
        }
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando...";
        }
    }

    // Esconder loading
    function hideLoading() {
        if (loadingSpinner) {
            loadingSpinner.style.display = "none";
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Enviar Mensagem";
        }
    }

    // Mostrar mensagem de status
    function showStatusMessage(message, type) {
        if (statusMessage) {
            statusMessage.textContent = message;
            statusMessage.className = "status-message status-" + type;
            statusMessage.style.display = "block";
            
            // Rolagem suave para a mensagem
            statusMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // Esconder mensagem de status
    function hideStatusMessage() {
        if (statusMessage) {
            statusMessage.style.display = "none";
            statusMessage.textContent = "";
        }
    }

    // Validar email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Formatador de texto para email
    function formatEmailContent(data) {
        return `NOVA MENSAGEM DO AGROMAIL\n\n` +
               `==================== DADOS DO REMETENTE ====================\n` +
               `Nome: ${data.name}\n` +
               `Email: ${data.email}\n` +
               `Tipo: ${data.type}\n` +
               `Data/Hora: ${data.timestamp}\n\n` +
               `======================= MENSAGEM ========================\n` +
               `${data.message}\n\n` +
               `=======================================================\n` +
               `Enviado através do sistema AgroMail Feedback`;
    }

    // Processar envio do formulário
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            // Prevenir envio padrão
            e.preventDefault();
            
            // Coletar dados do formulário
            const name = document.getElementById('feedbackName').value.trim();
            const email = document.getElementById('feedbackEmail').value.trim();
            const type = document.getElementById('feedbackType').value;
            const message = document.getElementById('feedbackMessage').value.trim();

            // Validação básica
            if (!name || !email || !type || !message) {
                showStatusMessage("❌ Por favor, preencha todos os campos.", "error");
                return;
            }

            // Validar email
            if (!validateEmail(email)) {
                showStatusMessage("❌ Por favor, insira um email válido.", "error");
                document.getElementById('feedbackEmail').style.borderColor = '#f56565';
                return;
            }

            // Mostrar loading
            showLoading();
            hideStatusMessage();

            // Preparar dados para envio
            const formData = {
                name: name,
                email: email,
                type: type,
                message: message,
                timestamp: new Date().toLocaleString('pt-BR')
            };

            console.log("📤 Preparando mensagem para envio:", formData);
            
            // Mostrar mensagem de processamento
            showStatusMessage("⏳ Preparando sua mensagem...", "success");

            // Simular processamento
            setTimeout(() => {
                // Preparar assunto do email
                const emailSubject = `AgroMail - Nova ${type}: ${name.substring(0, 20)}${name.length > 20 ? '...' : ''}`;
                
                // Preparar corpo do email
                const emailBody = formatEmailContent(formData);
                
                // Codificar para URL
                const encodedSubject = encodeURIComponent(emailSubject);
                const encodedBody = encodeURIComponent(emailBody);
                
                // Mostrar mensagem de sucesso
                showStatusMessage("✅ Mensagem preparada com sucesso!", "success");
                
                // Criar link mailto
                const mailtoLink = `mailto:${DESTINATION_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
                
                // Tentar abrir o cliente de email
                try {
                    // Abrir em nova aba/guia
                    window.open(mailtoLink, '_blank');
                    
                    // Mensagem final
                    setTimeout(() => {
                        showStatusMessage("📧 Cliente de email aberto! Complete o envio clicando em 'Enviar'.", "success");
                        hideLoading();
                        
                        // Fechar painel após 5 segundos
                        setTimeout(() => {
                            feedbackPanel.classList.remove("active");
                            resetForm();
                        }, 5000);
                    }, 1000);
                    
                } catch (error) {
                    console.error("Erro ao abrir cliente de email:", error);
                    
                    // Fallback: mostrar dados para copiar e colar
                    hideLoading();
                    showStatusMessage("📋 Email preparado! Copie os dados abaixo e envie manualmente:\n\n" +
                                    `Para: ${DESTINATION_EMAIL}\n` +
                                    `Assunto: ${emailSubject}\n\n` +
                                    `${emailBody}`, "success");
                    
                    // Manter painel aberto para usuário copiar
                }
                
            }, 1500);
        });
    }

    // Validação visual em tempo real do email
    const emailInput = document.getElementById('feedbackEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            
            if (email && !validateEmail(email)) {
                this.style.borderColor = '#f56565';
                showStatusMessage("⚠️ Formato de email inválido. Exemplo: nome@exemplo.com", "error");
            } else {
                this.style.borderColor = '';
                hideStatusMessage();
            }
        });
        
        emailInput.addEventListener('input', function() {
            this.style.borderColor = '';
            hideStatusMessage();
        });
    }

    // Validação visual do campo de nome
    const nameInput = document.getElementById('feedbackName');
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length < 2) {
                this.style.borderColor = '#f56565';
                showStatusMessage("⚠️ Nome deve ter pelo menos 2 caracteres", "error");
            } else {
                this.style.borderColor = '';
                hideStatusMessage();
            }
        });
    }

    // Validação visual do campo de mensagem
    const messageInput = document.getElementById('feedbackMessage');
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (this.value.trim().length < 10) {
                this.style.borderColor = '#f56565';
                showStatusMessage("⚠️ Mensagem muito curta. Detalhe sua solicitação.", "error");
            } else {
                this.style.borderColor = '';
                hideStatusMessage();
            }
        });
    }

    // Adicionar contador de caracteres para a mensagem
    if (messageInput) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.textAlign = 'right';
        charCounter.style.fontSize = '0.8rem';
        charCounter.style.color = 'var(--text)';
        charCounter.style.marginTop = '5px';
        charCounter.textContent = '0/1000 caracteres';
        
        messageInput.parentNode.appendChild(charCounter);
        
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length}/1000 caracteres`;
            
            if (length > 1000) {
                charCounter.style.color = '#f56565';
                this.style.borderColor = '#f56565';
            } else if (length > 900) {
                charCounter.style.color = '#f59f3f';
                this.style.borderColor = '#f59f3f';
            } else {
                charCounter.style.color = 'var(--text)';
                this.style.borderColor = '';
            }
        });
    }

    // Adicionar CSS para o contador de caracteres
    const style = document.createElement('style');
    style.textContent = `
        .char-counter {
            font-size: 0.8rem;
            color: var(--text);
            text-align: right;
            margin-top: 5px;
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
});

/* === FUNÇÃO PARA VERIFICAR SE ESTÁ NA PÁGINA DE LOGIN === */
function isLoginPage() {
    return window.location.pathname.includes('login.html') || 
           window.location.pathname.includes('login') ||
           window.location.pathname.includes('signin');
}

/* === FUNÇÃO MODIFICADA PARA O BOTÃO VOLTAR === */
function setupBackButton() {
    const backButton = document.querySelector('.button.secondary[onclick*="history.back"]');
    if (backButton) {
        // Remover o onclick existente primeiro
        backButton.removeAttribute('onclick');
        
        backButton.onclick = function(e) {
            e.preventDefault();
            
            // Verificar o histórico
            if (window.history.length > 1) {
                // Verificar se a página anterior era de login
                if (document.referrer) {
                    const referrer = new URL(document.referrer);
                    if (referrer.pathname.includes('login.html') || 
                        referrer.pathname.includes('signin')) {
                        // Se a última página for login, vamos para a home
                        window.location.href = 'index.html';
                        return;
                    }
                }
                
                // Se não for login, usa o histórico normal
                history.back();
            } else {
                // Se não houver histórico, vai para a home
                window.location.href = 'index.html';
            }
        };
    }
}

/* === GESTÃO DE AUTENTICAÇÃO === */
function checkAuthStatus() {
    // Esta função verifica se o usuário está logado
    const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true' || 
                        sessionStorage.getItem('userLoggedIn') === 'true' ||
                        document.cookie.includes('user_id');
    
    const authStatus = document.getElementById('authStatus');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (userLoggedIn) {
        // Usuário logado
        if (authStatus) {
            authStatus.textContent = 'Usuário autenticado';
            authStatus.className = 'auth-status logged-in';
        }
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        // Usuário não logado
        if (authStatus) {
            authStatus.textContent = 'Usuário não autenticado';
            authStatus.className = 'auth-status logged-out';
        }
        if (loginBtn) loginBtn.style.display = 'block';
        if (signupBtn) signupBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

/* === CONFIGURAR LOGOUT === */
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            // Limpar dados de autenticação
            localStorage.removeItem('userLoggedIn');
            sessionStorage.removeItem('userLoggedIn');
            
            // Limpar cookie (simplificado)
            document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            
            // Recarregar a página para atualizar o estado
            window.location.reload();
        };
    }
}

/* === TEMA === */
function initThemeControls() {
    const light = document.getElementById("lightMode");
    const dark = document.getElementById("darkMode");
    
    if (!light || !dark) return;
    
    function applyTheme(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            if (dark) dark.classList.add("active");
            if (light) light.classList.remove("active");
        } else {
            document.body.classList.remove("dark-mode");
            if (light) light.classList.add("active");
            if (dark) dark.classList.remove("active");
        }
        localStorage.setItem("theme", theme);
    }
    
    if (light) light.onclick = () => applyTheme("light");
    if (dark) dark.onclick = () => applyTheme("dark");
    
    // Aplicar tema salvo ou padrão
    applyTheme(localStorage.getItem("theme") || "light");
}

function voltarLogin(btn) {
    const url = btn.dataset.url;
    window.location.href = url;
}

/* === CONTROLE DE BRILHO === */
function initBrightnessControls() {
    const brightnessSlider = document.getElementById("brightnessSlider");
    const brightnessValue = document.getElementById("brightnessValue");
    const brightnessDecrease = document.getElementById("brightnessDecrease");
    const brightnessIncrease = document.getElementById("brightnessIncrease");
    
    if (!brightnessSlider && !brightnessDecrease && !brightnessIncrease) return;
    
    let currentBrightness = parseFloat(localStorage.getItem("brightnessAmount")) || 100;
    
    function updateBrightness(value) {
        currentBrightness = Math.min(Math.max(value, 50), 150);
        document.documentElement.style.setProperty("--brightness", `${currentBrightness}%`);
        if (brightnessSlider) brightnessSlider.value = currentBrightness;
        if (brightnessValue) brightnessValue.textContent = `Brilho: ${currentBrightness}%`;
        localStorage.setItem("brightnessAmount", currentBrightness);
    }
    
    updateBrightness(currentBrightness);
    
    if (brightnessSlider) {
        brightnessSlider.addEventListener("input", () => updateBrightness(parseFloat(brightnessSlider.value)));
    }
    
    if (brightnessDecrease) {
        brightnessDecrease.addEventListener("click", () => updateBrightness(currentBrightness - 5));
    }
    
    if (brightnessIncrease) {
        brightnessIncrease.addEventListener("click", () => updateBrightness(currentBrightness + 5));
    }
}

/* === CONTROLE DE FONTE - VERSÃO COMPLETA === */
function initFontControls() {
    // Encontrar todos os elementos de controle de fonte possíveis
    const fontIncreaseBtn = document.getElementById("fontIncrease");
    const fontDecreaseBtn = document.getElementById("fontDecrease");
    const fontValueEl = document.getElementById("fontValue");
    const fontValueDisplay = document.querySelector('.font-value span');
    
    // Tamanhos de fonte disponíveis (em pixels) - com 17.5px como padrão
    const fontSizes = [14, 15, 16, 17.5, 19, 21, 23];
    const fontSizeKey = "fontSizeBase";
    
    // Verificar se há um tamanho salvo no localStorage
    const savedFontSize = parseFloat(localStorage.getItem(fontSizeKey));
    let currentFontIndex;
    
    if (savedFontSize) {
        // Encontrar o índice exato do tamanho salvo
        currentFontIndex = fontSizes.findIndex(size => size === savedFontSize);
        if (currentFontIndex === -1) {
            // Se não encontrar exato, usar o mais próximo
            const closest = fontSizes.reduce((prev, curr) => {
                return Math.abs(curr - savedFontSize) < Math.abs(prev - savedFontSize) ? curr : prev;
            });
            currentFontIndex = fontSizes.indexOf(closest);
        }
    } else {
        currentFontIndex = 3; // Começa com 17.5px (índice 3)
    }
    
    // Atualiza o valor exibido no painel
    function updateFontDisplay() {
        const selectedSize = fontSizes[currentFontIndex];
        
        // Calcular porcentagem baseada em 17.5px como 100%
        const percent = Math.round((selectedSize / 17.5) * 100);
        
        // Atualizar todos os displays possíveis
        if (fontValueDisplay) {
            fontValueDisplay.textContent = `Tamanho: ${percent}%`;
        }
        
        if (fontValueEl) {
            fontValueEl.textContent = `Tamanho: ${percent}%`;
        }
    }
    
    // Aplica o tamanho de fonte em TODA a página
    function applyFontSize() {
        const selectedSize = fontSizes[currentFontIndex];
        
        // 1. Definir a variável CSS raiz
        document.documentElement.style.setProperty('--font-base', selectedSize + 'px');
        
        // 2. Salvar no localStorage
        localStorage.setItem(fontSizeKey, selectedSize.toString());
        
        // 3. Forçar reflow para garantir que as mudanças sejam aplicadas
        // Isso é importante para elementos com transições
        document.body.style.animation = 'none';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10);
        
        console.log(`Fonte aplicada: ${selectedSize}px (${Math.round((selectedSize / 17.5) * 100)}%)`);
    }
    
    // Configurar botões A+ (aumentar)
    function setupIncreaseButton(button) {
        if (button) {
            // Remover event listeners antigos
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentFontIndex < fontSizes.length - 1) {
                    currentFontIndex++;
                    applyFontSize();
                    updateFontDisplay();
                }
            });
        }
    }
    
    // Configurar botões A- (diminuir)
    function setupDecreaseButton(button) {
        if (button) {
            // Remover event listeners antigos
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentFontIndex > 0) {
                    currentFontIndex--;
                    applyFontSize();
                    updateFontDisplay();
                }
            });
        }
    }
    
    // Configurar TODOS os botões de controle de fonte possíveis
    
    // Sistema novo (IDs específicos)
    setupIncreaseButton(fontIncreaseBtn);
    setupDecreaseButton(fontDecreaseBtn);
    
    // Sistema antigo (classes específicas)
    const oldFontButtons = document.querySelectorAll('.font-btn');
    oldFontButtons.forEach((btn, index) => {
        if (btn.textContent.includes('+') || btn.textContent.includes('A+')) {
            setupIncreaseButton(btn);
        } else if (btn.textContent.includes('-') || btn.textContent.includes('A-')) {
            setupDecreaseButton(btn);
        }
    });
    
    // Botões genéricos com classes específicas
    const genericIncrease = document.querySelector('.btn-aumentar-fonte, [data-action="increase-font"]');
    const genericDecrease = document.querySelector('.btn-diminuir-fonte, [data-action="decrease-font"]');
    
    setupIncreaseButton(genericIncrease);
    setupDecreaseButton(genericDecrease);
    
    // Inicializar o sistema
    function initializeFontSystem() {
        // Aplicar o tamanho salvo ou padrão
        applyFontSize();
        updateFontDisplay();
        
        // Adicionar um listener para quando a página carrega completamente
        window.addEventListener('load', function() {
            // Aplicar novamente para garantir que todos os elementos estejam renderizados
            setTimeout(applyFontSize, 100);
        });
        
        // Observar mudanças no DOM para aplicar fonte a elementos dinâmicos
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    // Aplicar fonte a novos elementos
                    setTimeout(applyFontSize, 50);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Inicializar
    initializeFontSystem();
}

/* === BOTÕES AUTOMÁTICOS PARA ORDENS === */
function initOrdensButtons() {
    const currentPath = window.location.pathname;
    const container = document.getElementById("nav-dynamic-buttons");

    if (!container) return;

    const isOrdens = currentPath.includes("/ordens");
    const isMinhas = currentPath.includes("/ordens_minhas");

    // Só mostra os botões nessas duas páginas
    if (isOrdens || isMinhas) {
        container.innerHTML = `
            <a class="button" href="${window.location.origin}/ordens">Abrir Ordem</a>
            <a class="button" href="${window.location.origin}/ordens_minhas">Minhas Ordens</a>
        `;
    }
}

/* === AUTO-REMOVER FLASH MESSAGES === */
function autoRemoveFlashMessages() {
    const flashes = document.querySelectorAll('.flash');
    flashes.forEach((el) => {
        setTimeout(() => {
            el.remove();
        }, 3000);
    });
}

/* === VERIFICAR PÁGINA DE LOGIN === */
function checkLoginPageRedirect() {
    if (isLoginPage()) {
        const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true' || 
                            sessionStorage.getItem('userLoggedIn') === 'true' ||
                            document.cookie.includes('user_id');
        
        if (userLoggedIn) {
            // Se já está logado e tentando acessar login, redireciona para home
            window.location.href = 'index.html';
        }
    }
}

/* ============================================
   INICIALIZAÇÃO COMPLETA
============================================ */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando sistema de controle de fontes...');
    
    // 1. Verificar status de autenticação
    checkAuthStatus();
    
    // 2. Configurar botão de logout
    setupLogout();
    
    // 3. Configurar botão voltar com lógica personalizada
    setupBackButton();
    
    // 4. Inicializar controles de tema
    initThemeControls();
    
    // 5. Inicializar controles de brilho
    initBrightnessControls();
    
    // 6. Inicializar controles de fonte (SISTEMA ATUALIZADO E COMPLETO)
    initFontControls();
    
    // 7. Inicializar botões de ordens
    initOrdensButtons();
    
    // 8. Auto-remover flash messages
    autoRemoveFlashMessages();
    
    // 9. Verificar se está na página de login e redirecionar se já estiver logado
    checkLoginPageRedirect();
    
    // 10. Garantir que o controle de fonte seja aplicado após todos os recursos carregarem
    window.addEventListener('load', function() {
        setTimeout(() => {
            const savedFontSize = parseFloat(localStorage.getItem("fontSizeBase"));
            if (savedFontSize) {
                document.documentElement.style.setProperty('--font-base', savedFontSize + 'px');
            }
        }, 200);
    });
});

/* === FUNÇÃO PARA SIMULAR LOGIN (use isso nas suas páginas de login) === */
function simulateLogin() {
    localStorage.setItem('userLoggedIn', 'true');
    checkAuthStatus();
}

/* === FUNÇÃO PARA SIMULAR CADASTRO (use isso na página de signup) === */
function simulateSignup() {
    localStorage.setItem('userLoggedIn', 'true');
    checkAuthStatus();
}

/* === FUNÇÃO AUXILIAR PARA FORÇAR APLICAÇÃO DE FONTE === */
function forceFontRefresh() {
    const savedFontSize = parseFloat(localStorage.getItem("fontSizeBase")) || 17.5;
    document.documentElement.style.setProperty('--font-base', savedFontSize + 'px');
    
    // Disparar um evento de redimensionamento para forçar reflow
    window.dispatchEvent(new Event('resize'));
    
    // Forçar reflow em elementos específicos
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
}

document.addEventListener("readystatechange", function () {
    if (document.readyState === "interactive") {

        const page = window.location.pathname;

        if (page.includes("login") ||
            page.includes("signup")) {

            const s = document.getElementById("settingsToggle");
            const f = document.getElementById("feedbackToggle");
            const c = document.getElementById("cursorToggle");

            // Aplica animação curta ANTES de mudar posição
            const applySnapAnimation = (btn) => {
                if (btn) {
                    btn.style.transition = "all 0.0001s linear"; 
                }
            };

            if (s) {
                applySnapAnimation(s);
                s.style.position = "fixed";
                s.style.top = "-8px";
                s.style.right = "37px";
            }

            if (f) {
                applySnapAnimation(f);
                f.style.position = "fixed";
                f.style.top = "-8px";
                f.style.right = "100px";
            }
            
            if (c) {
                applySnapAnimation(c);
                c.style.position = "fixed";
                c.style.top = "-8px";
                c.style.right = "163px";
            }
        }
    }
});

document.addEventListener("readystatechange", function () {
    if (document.readyState === "interactive") {

        const page = window.location.pathname;

        if (page.includes("cultivares") ||
            page.includes("index") ||
            page.includes("ordens") || 
            page.includes("ordens_minhas") || 
            page.includes("ordens_todas") || 
            page.includes("ordens_minhas")) {

            const s = document.getElementById("settingsToggle");
            const f = document.getElementById("feedbackToggle");
            const c = document.getElementById("cursorToggle");

            // Aplica animação curta ANTES de mudar posição
            const applySnapAnimation = (btn) => {
                if (btn) {
                    btn.style.transition = "all 0.0001s linear"; 
                }
            };

            if (s) {
                applySnapAnimation(s);
                s.style.position = "fixed";
                s.style.top = "8px";
                s.style.right = "37px";
            }

            if (f) {
                applySnapAnimation(f);
                f.style.position = "fixed";
                f.style.top = "8px";
                f.style.right = "100px";
            }
            
            if (c) {
                applySnapAnimation(c);
                c.style.position = "fixed";
                c.style.top = "8px";
                c.style.right = "163px";
            }
        }
    }
});

/* === CONTROLE DE FONTE - COMPLETO === */
function initFontControls() {
    // Encontrar elementos de controle de fonte
    const fontIncreaseBtn = document.getElementById("fontIncrease");
    const fontDecreaseBtn = document.getElementById("fontDecrease");
    const fontValueEl = document.getElementById("fontValue");
    
    if (!fontIncreaseBtn || !fontDecreaseBtn) return;
    
    // Tamanhos de fonte disponíveis (em pixels)
    const fontSizes = [14, 15, 16, 17.5, 19, 21, 23];
    const fontSizeKey = "fontSizeBase";
    
    // Verificar tamanho salvo
    const savedFontSize = parseFloat(localStorage.getItem(fontSizeKey));
    let currentFontIndex;
    
    if (savedFontSize) {
        currentFontIndex = fontSizes.findIndex(size => size === savedFontSize);
        if (currentFontIndex === -1) {
            const closest = fontSizes.reduce((prev, curr) => {
                return Math.abs(curr - savedFontSize) < Math.abs(prev - savedFontSize) ? curr : prev;
            });
            currentFontIndex = fontSizes.indexOf(closest);
        }
    } else {
        currentFontIndex = 3; // 17.5px é o padrão (índice 3)
    }
    
    // Atualizar display
    function updateFontDisplay() {
        const selectedSize = fontSizes[currentFontIndex];
        const percent = Math.round((selectedSize / 17.5) * 100);
        
        if (fontValueEl) {
            fontValueEl.textContent = `Tamanho: ${percent}%`;
        }
    }
    
    // Aplicar tamanho de fonte
    function applyFontSize() {
        const selectedSize = fontSizes[currentFontIndex];
        document.documentElement.style.setProperty('--font-base', selectedSize + 'px');
        localStorage.setItem(fontSizeKey, selectedSize.toString());
        
        // Forçar reflow
        document.body.style.animation = 'none';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10);
    }
    
    // Configurar botões
    fontIncreaseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentFontIndex < fontSizes.length - 1) {
            currentFontIndex++;
            applyFontSize();
            updateFontDisplay();
        }
    });
    
    fontDecreaseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentFontIndex > 0) {
            currentFontIndex--;
            applyFontSize();
            updateFontDisplay();
        }
    });
    
    // Inicializar
    updateFontDisplay();
    applyFontSize();
}