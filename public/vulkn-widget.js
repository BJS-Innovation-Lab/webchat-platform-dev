/**
 * VULKN Chat Widget
 * 
 * Embed this script on any website to add a floating chat bubble
 * that connects visitors to your VULKN AI agent.
 * 
 * Usage:
 * <script src="https://app.vulkn.ai/vulkn-widget.js" data-org="tu-negocio"></script>
 * 
 * Options (data attributes):
 * - data-org: Your organization slug (required)
 * - data-position: "right" (default) or "left"
 * - data-color: Primary color (default: "#7C3AED" - VULKN violet)
 * - data-greeting: Custom greeting text
 * - data-delay: Delay before showing bubble (ms, default: 1000)
 */

(function() {
  'use strict';
  
  // Prevent multiple initializations
  if (window.VULKNWidget) return;
  
  // Get script configuration
  const script = document.currentScript || document.querySelector('script[data-org]');
  if (!script) {
    console.error('VULKN Widget: No script element found');
    return;
  }
  
  const config = {
    org: script.getAttribute('data-org'),
    position: script.getAttribute('data-position') || 'right',
    color: script.getAttribute('data-color') || '#7C3AED',
    greeting: script.getAttribute('data-greeting') || '¡Hola! ¿En qué puedo ayudarte?',
    delay: parseInt(script.getAttribute('data-delay')) || 1000,
    baseUrl: script.src.replace('/vulkn-widget.js', '') || 'https://app.vulkn.ai'
  };
  
  if (!config.org) {
    console.error('VULKN Widget: data-org attribute is required');
    return;
  }
  
  // CSS Styles
  const styles = `
    #vulkn-widget-container {
      position: fixed;
      bottom: 20px;
      ${config.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    #vulkn-widget-bubble {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #F97316 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      animation: vulkn-pulse 2s ease-in-out infinite;
    }
    
    #vulkn-widget-bubble:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 30px rgba(124, 58, 237, 0.5);
    }
    
    #vulkn-widget-bubble svg {
      width: 28px;
      height: 28px;
      fill: white;
    }
    
    #vulkn-widget-bubble.open svg.chat-icon {
      display: none;
    }
    
    #vulkn-widget-bubble.open svg.close-icon {
      display: block;
    }
    
    #vulkn-widget-bubble svg.close-icon {
      display: none;
    }
    
    @keyframes vulkn-pulse {
      0%, 100% { box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4); }
      50% { box-shadow: 0 4px 30px rgba(236, 72, 153, 0.5); }
    }
    
    #vulkn-widget-greeting {
      position: absolute;
      bottom: 70px;
      ${config.position === 'left' ? 'left: 0;' : 'right: 0;'}
      background: white;
      padding: 12px 16px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      max-width: 250px;
      font-size: 14px;
      color: #1f2937;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
    }
    
    #vulkn-widget-greeting.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    
    #vulkn-widget-greeting::after {
      content: '';
      position: absolute;
      bottom: -8px;
      ${config.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid white;
    }
    
    #vulkn-widget-greeting-close {
      position: absolute;
      top: 4px;
      right: 8px;
      background: none;
      border: none;
      font-size: 16px;
      color: #9ca3af;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }
    
    #vulkn-widget-greeting-close:hover {
      color: #6b7280;
    }
    
    #vulkn-widget-iframe-container {
      position: absolute;
      bottom: 70px;
      ${config.position === 'left' ? 'left: 0;' : 'right: 0;'}
      width: 380px;
      height: 550px;
      max-height: calc(100vh - 100px);
      max-width: calc(100vw - 40px);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
      background: #0A0A0A;
    }
    
    #vulkn-widget-iframe-container.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    
    #vulkn-widget-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    
    #vulkn-widget-unread {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 20px;
      height: 20px;
      background: #EF4444;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: bold;
      color: white;
      border: 2px solid white;
    }
    
    #vulkn-widget-unread.visible {
      display: flex;
    }
    
    @media (max-width: 480px) {
      #vulkn-widget-iframe-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        max-height: none;
        max-width: none;
        border-radius: 0;
      }
      
      #vulkn-widget-container {
        bottom: 10px;
        ${config.position === 'left' ? 'left: 10px;' : 'right: 10px;'}
      }
      
      #vulkn-widget-bubble {
        width: 56px;
        height: 56px;
      }
    }
  `;
  
  // HTML Template
  const template = `
    <div id="vulkn-widget-container">
      <div id="vulkn-widget-greeting">
        <button id="vulkn-widget-greeting-close">&times;</button>
        ${config.greeting}
      </div>
      <div id="vulkn-widget-iframe-container">
        <iframe id="vulkn-widget-iframe" title="Chat VULKN"></iframe>
      </div>
      <button id="vulkn-widget-bubble">
        <span id="vulkn-widget-unread">1</span>
        <svg class="chat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
        <svg class="close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  `;
  
  // Initialize widget
  function init() {
    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    
    // Inject HTML
    const container = document.createElement('div');
    container.innerHTML = template;
    document.body.appendChild(container.firstElementChild);
    
    // Get elements
    const bubble = document.getElementById('vulkn-widget-bubble');
    const greeting = document.getElementById('vulkn-widget-greeting');
    const greetingClose = document.getElementById('vulkn-widget-greeting-close');
    const iframeContainer = document.getElementById('vulkn-widget-iframe-container');
    const iframe = document.getElementById('vulkn-widget-iframe');
    const unreadBadge = document.getElementById('vulkn-widget-unread');
    
    let isOpen = false;
    let iframeLoaded = false;
    let greetingDismissed = localStorage.getItem('vulkn_greeting_dismissed') === 'true';
    
    // Show greeting after delay (first time only)
    if (!greetingDismissed) {
      setTimeout(() => {
        if (!isOpen) {
          greeting.classList.add('visible');
        }
      }, config.delay + 2000);
    }
    
    // Close greeting
    greetingClose.addEventListener('click', (e) => {
      e.stopPropagation();
      greeting.classList.remove('visible');
      greetingDismissed = true;
      localStorage.setItem('vulkn_greeting_dismissed', 'true');
    });
    
    // Toggle chat
    bubble.addEventListener('click', () => {
      isOpen = !isOpen;
      
      if (isOpen) {
        // Load iframe on first open
        if (!iframeLoaded) {
          iframe.src = `${config.baseUrl}/embed/${config.org}`;
          iframeLoaded = true;
        }
        
        bubble.classList.add('open');
        iframeContainer.classList.add('open');
        greeting.classList.remove('visible');
        unreadBadge.classList.remove('visible');
      } else {
        bubble.classList.remove('open');
        iframeContainer.classList.remove('open');
      }
    });
    
    // Listen for messages from iframe
    window.addEventListener('message', (event) => {
      // Verify origin
      if (!event.origin.includes(new URL(config.baseUrl).host)) return;
      
      const data = event.data;
      
      if (data.type === 'vulkn-new-message' && !isOpen) {
        // Show unread badge
        unreadBadge.classList.add('visible');
      }
      
      if (data.type === 'vulkn-close') {
        isOpen = false;
        bubble.classList.remove('open');
        iframeContainer.classList.remove('open');
      }
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        bubble.classList.remove('open');
        iframeContainer.classList.remove('open');
      }
    });
  }
  
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose API
  window.VULKNWidget = {
    open: function() {
      document.getElementById('vulkn-widget-bubble').click();
    },
    close: function() {
      const bubble = document.getElementById('vulkn-widget-bubble');
      if (bubble.classList.contains('open')) {
        bubble.click();
      }
    },
    isOpen: function() {
      return document.getElementById('vulkn-widget-bubble').classList.contains('open');
    }
  };
  
})();
