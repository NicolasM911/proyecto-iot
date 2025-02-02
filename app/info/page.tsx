'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { motion } from 'framer-motion';

const InfoPage: React.FC = () => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <div className="flex min-h-screen flex-col">
            <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            <div className="flex-1 flex">
                <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}/>
                <main className="flex-1 p-6">
                    <div className="container mx-auto space-y-6">
                        {/* Sección Introductoria */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                                Introducción al Forraje Verde Hidropónico
                            </h1>
                            <p className="text-lg  dark:text-white">
                                El forraje verde hidropónico (FVH) es una técnica innovadora que permite cultivar forraje nutritivo para el ganado sin la necesidad de suelo...
                            </p>
                        </div>

                        {/* Imagen Principal */}
                        <div className="flex justify-center mb-8">
                            <motion.img
                                src="/images/forraje1.jpeg"// Reemplaza con la URL de tu imagen
                                alt="Cultivo de Forraje Verde Hidropónico"
                                className="w-full md:w-3/4 lg:w-2/3 rounded-lg shadow-lg border-2 border-green-300"
                                initial={{ scale: 1 }}
                                animate={{
                                    y: [0, -10, 0, 10, 0],
                                    transition: {
                                        duration: 3,
                                        ease: 'easeInOut',
                                        repeat: Infinity,
                                    }
                                }}
                            />
                        </div>

                        {/* Más Información */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                                ¿Por qué elegir el Forraje Verde Hidropónico?
                            </h2>
                            <p className="text-lg mb-4  dark:text-white">
                                El FVH no solo es eficiente en términos de recursos, sino que también es altamente nutritivo. Este método de cultivo permite a los agricultores producir forraje de calidad en cualquier entorno, incluso en áreas con suelo pobre o condiciones climáticas desfavorables.
                            </p>
                            <p className="text-lg mb-4  dark:text-white">
                                Además, el uso de técnicas de cultivo sin suelo elimina la dependencia de agroquímicos, haciendo del FVH una opción más saludable tanto para los animales como para los consumidores finales.
                            </p>
                            <p className="text-lg  dark:text-white">
                                Con la implementación de tecnologías avanzadas, los productores pueden controlar y optimizar todos los aspectos del crecimiento del forraje, desde el riego hasta la iluminación, asegurando una producción constante y de alta calidad.
                            </p>
                        </div>

                        {/* Imágenes Adicionales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {[
                                '/images/forraje2.jpg',
                                '/images/forraje3.jpg',
                                '/images/forraje4.jpeg',
                            ].map((src, index) => (
                                <div className="flex justify-center" key={index}>
                                    <motion.img
                                        src={src}
                                        alt={`Cultivo de Forraje Verde ${index + 1}`}
                                        className="w-full h-auto rounded-lg shadow-md border-2 border-green-300"
                                        initial={{ scale: 1 }}
                                        animate={{
                                            y: [0, -10, 0, 10, 0],
                                            transition: {
                                                duration: 3,
                                                ease: 'easeInOut',
                                                repeat: Infinity,
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Implementación y Beneficios del IoT en el FVH */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                                Implementación del IoT en el Cultivo de FVH
                            </h2>
                            <p className="text-lg mb-4  dark:text-white">
                                La implementación del Internet de las Cosas (IoT) en el cultivo de Foraje Verde Hidropónico transforma la manera en que los productores manejan sus cultivos. Al integrar sensores y dispositivos conectados, es posible monitorizar en tiempo real factores críticos como la humedad, temperatura y calidad del agua. Estos datos se pueden analizar para optimizar el uso de recursos y mejorar la producción. La automatización del riego y la alimentación de nutrientes garantiza que las plantas reciban exactamente lo que necesitan, lo que no solo aumenta la eficiencia, sino que también reduce el desperdicio y maximiza el rendimiento. Al final, esta tecnología no solo impulsa la producción agrícola, sino que también contribuye a un enfoque más sostenible y responsable en la agricultura moderna.
                            </p>

                            {/* Contenedor para centrar la imagen */}
                            <div className="flex justify-center mb-12">
                                <motion.img
                                    src="/images/forraje5.jpeg" // Reemplaza con la URL de tu imagen
                                    alt="Implementación del IoT en FVH"
                                    className="w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-lg border-2 border-green-300"
                                    initial={{ scale: 1 }}
                                    animate={{
                                        y: [0, -10, 0, 10, 0],
                                        transition: {
                                            duration: 3,
                                            ease: 'easeInOut',
                                            repeat: Infinity,
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Beneficios del IoT */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                                Beneficios del Internet de las Cosas en el Cultivo
                            </h2>
                            <ul className="list-disc list-inside text-lg  dark:text-white mx-auto md:w-2/3 lg:w-1/2">
                                <li className="mb-2">Monitoreo en tiempo real de las condiciones ambientales.</li>
                                <li className="mb-2">Optimización del uso del agua con riego automatizado.</li>
                                <li className="mb-2">Mayor eficiencia en la producción de forraje con menos recursos.</li>
                                {/* <li className="mb-2">Control de plagas y enfermedades a través de análisis de datos.</li>
                                <li className="mb-2">Aumento en la rentabilidad mediante la reducción de costos operativos.</li><br></br> */}
                            </ul>

                            {/* Imágenes de Beneficios del IoT */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {[
                                    '/images/forraje6.jpeg',
                                    '/images/forraje7.jpeg',
                                    '/images/forraje8.jpg',
                                ].map((src, index) => (
                                    <div className="flex justify-center" key={index}>
                                        <motion.img
                                            src={src}
                                            alt={`Beneficio del IoT ${index + 1}`}
                                            className="w-full h-auto rounded-lg shadow-md border-2 border-green-300"
                                            initial={{ scale: 1 }}
                                            animate={{
                                                y: [0, -10, 0, 10, 0],
                                                transition: {
                                                    duration: 3,
                                                    ease: 'easeInOut',
                                                    repeat: Infinity,
                                                }
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default InfoPage;
