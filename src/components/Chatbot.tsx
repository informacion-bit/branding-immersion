'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const Chatbot = () => {
  const t = useTranslations('chatbot';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('en'); // Default to English

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect language from URL
    const lang = window.location.pathname.split('/')[1] || 'en';
    setLanguage(lang);
  }, []);

  useEffect(() => {
    if (language) {
      fetch(`/chatbot_prompt_${language}.txt`)
        .then(response => response.text())
        .then(text => setPrompt(text))
        .catch(error => console.error('Error fetching prompt:', error));
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages, prompt }),
      });

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { role: 'assistant', content: t('error') }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setMessages([]); // Clear messages when language changes
  };


  return (
    <div className="z-[9999]">
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-[9999]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col z-[9999]">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Sara</h3>
            <div className="flex space-x-2">
              <button onClick={() => handleLanguageSelect('es')} className={`px-2 py-1 text-sm rounded ${language === 'es' ? 'bg-white text-blue-600' : 'bg-transparent text-white'}`}>ES</button>
              <button onClick={() => handleLanguageSelect('en')} className={`px-2 py-1 text-sm rounded ${language === 'en' ? 'bg-white text-blue-600' : 'bg-transparent text-white'}`}>EN</button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-2 rounded-lg bg-gray-200">
                    {t('typing')}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('placeholder')}
              />
              <button
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                {t('send')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
