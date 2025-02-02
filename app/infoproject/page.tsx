'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { motion } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';

// Configurar el Worker de pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

const InfoPageProject: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadPDF = async () => {
      const pdfUrl = '/archive/HydroHarmony.pdf'; // Reemplaza con la URL de tu archivo PDF
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const numPages = pdf.numPages;
      const images: string[] = [];

      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context!,
          viewport: viewport,
        }).promise;

        images.push(canvas.toDataURL());
      }
      setSlides(images);
    };

    loadPDF();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <div className="flex-1 flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <main className="flex-1 p-6">
          <div className="container mx-auto space-y-6">
            {/* Sección Introductoria */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Introducción al Forraje Verde Hidropónico
              </h1>
              <p className="text-lg dark:text-white">
                El forraje verde hidropónico (FVH) es una técnica innovadora que permite cultivar forraje nutritivo para el ganado sin la necesidad de suelo...
              </p>
            </div>

            {/* Diapositivas del PDF */}
            {slides.length > 0 && (
              <div className="flex justify-center mb-8 relative">
                <motion.img
                  src={slides[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full md:w-3/4 lg:w-2/3 rounded-lg shadow-lg border-2 border-green-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <div className="absolute top-1/2 left-0 right-0 flex justify-between">
                  <button
                    onClick={prevSlide}
                    className="bg-green-500 text-white p-2 rounded-full"
                  >
                    Prev
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-green-500 text-white p-2 rounded-full"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InfoPageProject;
