// src/components/Navbar.tsx
'use client'

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('navbar'); // Obtiene las traducciones para el navbar

  const navigation = [
    { name: t('item1'), href: '/' },
    { name: t('item2'), href: '#conocenos' },
    { name: t('item3'), href: '#formulario', className: 'btn-presupuesto' },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 lg:px-8 backdrop-blur-sm">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt="Company Logo"
              src="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FGroup%20(1).svg?alt=media&token=f5cb6700-36a5-4511-90b4-c7f6d34096de"
              width={140}
              height={120}
              priority // Asegúrate de que la imagen se cargue rápido
            />
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-50"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 text-slate-50 ${item.className || ''}`}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <LanguageSwitcher /> 
        </div>
      </nav>

      {/* Menú móvil */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black opacity-30" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-400 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt="Company Logo"
                src="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FGroup%20(2).svg?alt=media&token=d436efbf-b713-485d-badf-22e0363b8bec"
                width={100}
                height={80}
                priority // Asegúrate de que la imagen se cargue rápido
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:underline"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );

};

export default Navbar;