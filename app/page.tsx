"use client";

import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Mail, 
  Github, 
  Linkedin, 
  Code2, 
  Menu,
  ChevronDown,
  Award,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

// Tipos para los datos
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  category: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  company: string;
}

// Componente de navegación fuera del componente principal
const NavMenu = ({ onNavigate }: { onNavigate: (sectionId: string) => void }) => (
  <nav className="flex gap-12">
    <button 
      onClick={() => onNavigate("inicio")}
      className="text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all duration-300 font-light"
    >
      INICIO
    </button>
    <button 
      onClick={() => onNavigate("sobre-mi")}
      className="text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all duration-300 font-light"
    >
      SOBRE MÍ
    </button>
    <button 
      onClick={() => onNavigate("proyectos")}
      className="text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all duration-300 font-light"
    >
      PROYECTOS
    </button>
    <button 
      onClick={() => onNavigate("testimonios")}
      className="text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all duration-300 font-light"
    >
      TESTIMONIOS
    </button>
    <button 
      onClick={() => onNavigate("contacto")}
      className="text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all duration-300 font-light"
    >
      CONTACTO
    </button>
  </nav>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCount, setShowCount] = useState(3);
  const [showCountTestimonials, setShowCountTestimonials] = useState(3);
  const [formData, setFormData] = useState({
    name: "",
    asunto: "",
    message: ""
  });
  

  useEffect(() => {
    AOS.init();
  }, []);

  // Estados para datos JSON
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Cargar datos desde JSON
  useEffect(() => {
    // Cargar proyectos
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error loading projects:', err));

    // Cargar testimonios
    fetch('/data/testimonials.json')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Error loading testimonials:', err));
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const phone = "51" + "980439371";

      let text = '';
      
      const nameText = formData.name.trim();
      const asuntoText = formData.asunto.trim();
      const mensajeText = formData.message.trim();

      text += `Nombres: ${nameText}\n`;
      text += `Asunto: ${asuntoText}\n\n`;
      text += `Mensaje: ${mensajeText}`;

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

      window.open(url, "_blank");
  };


  return (
    <div className="min-h-screen bg-[#efece3]">
      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-[#FAFAF8]/80 backdrop-blur-md border-b border-neutral-200/50 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <h1 className="text-base font-light tracking-[0.3em] text-[#1A1A1A]">ERICK JUNIOR</h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavMenu onNavigate={scrollToSection} />
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-4 w-4 text-neutral-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-[#FAFAF8]">
               <DialogTitle className="sr-only">Menú de navegación</DialogTitle>
                <DialogDescription className="sr-only">
                  Opciones de navegación del sitio
                </DialogDescription>
              <nav className="flex flex-col gap-6 mt-12">
                <button 
                  onClick={() => scrollToSection("inicio")}
                  className="text-left text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all font-light"
                >
                  INICIO
                </button>
                <button 
                  onClick={() => scrollToSection("sobre-mi")}
                  className="text-left text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all font-light"
                >
                  SOBRE MÍ
                </button>
                <button 
                  onClick={() => scrollToSection("proyectos")}
                  className="text-left text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all font-light"
                >
                  PROYECTOS
                </button>
                <button 
                  onClick={() => scrollToSection("testimonios")}
                  className="text-left text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all font-light"
                >
                  TESTIMONIOS
                </button>
                <button 
                  onClick={() => scrollToSection("contacto")}
                  className="text-left text-[13px] tracking-wide text-neutral-600 hover:text-neutral-900 transition-all font-light"
                >
                  CONTACTO
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="pt-20 px-8 lg:px-8 py-20 mt-5  flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 mt-10 md:mt-0 gap-12 md:gap-24 items-center">
              
              {/* Imagen - Primero en móvil, segundo en desktop */}
              <div className="relative order-1 md:order-2" data-aos="fade-down">
                <div className="w-full  from-[#B4846C]/10 to-[#8B9D83]/10 rounded-none overflow-hidden">
                  <Image
                    src="/perfil.webp"
                    alt="Erick Junior"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
                  />
                </div>
              </div>

              {/* Contenido - Segundo en móvil, primero en desktop */}
              <div className="space-y-8 order-2 md:order-1" data-aos="fade-down">
                <div className="space-y-6">
                  <p className="text-[11px] tracking-[0.3em] text-[#B4846C] font-light uppercase">
                    Disponible para colaboraciones
                  </p>
                  
                  <h2 className="text-3xl lg:text-6xl font-light text-[#1A1A1A] leading-[1.1] tracking-tight">
                    <span className="italic font-light">Programador de<br /> Aplicaciones Web</span>
                  </h2>
                  
                  <p className="text-base text-[#6B6B6B] leading-relaxed font-light max-w-md">
                      Programador full stack con un enfoque en la innovación, 
                      creando soluciones web que combinan diseño y funcionalidad.
                  </p>

                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-4">
                  <Button 
                    onClick={() => scrollToSection("proyectos")}
                    className="bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] w-full sm:w-auto px-8 py-6 text-[13px] tracking-wide font-light rounded-none"
                  >
                    VER PROYECTOS
                  </Button>
                  
                  <Button 
                    onClick={() => scrollToSection("contacto")}
                    variant="ghost" 
                    className="text-[#1A1A1A] hover:bg-transparent hover:text-[#B4846C] w-full sm:w-auto px-8 py-6 text-[13px] tracking-wide font-light"
                  >
                    CONTACTAR
                  </Button>
                </div>

                <div className="flex justify-center md:justify-start gap-4 pt-8">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-neutral-600 hover:text-[#B4846C] hover:bg-transparent w-10 h-10 rounded-full"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-neutral-600 hover:text-[#B4846C] hover:bg-transparent w-10 h-10 rounded-full"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-neutral-600 hover:text-[#B4846C] hover:bg-transparent w-10 h-10 rounded-full"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre mí Section */}
        <section id="sobre-mi" className="py-32 px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Intro Section */}
            <div className="flex flex-col gap-8  mb-32 ">
              
              <div className="" data-aos="fade-up">
                <div className="md:sticky md:top-32">
                  <p className="text-[11px] tracking-[0.3em] text-[#B4846C] font-light uppercase mb-8">
                    Sobre mí
                  </p>
                  <h3 className="text-3xl md:text-4xl font-light text-[#1A1A1A] leading-[1.2] tracking-tight">
                    Construyendo soluciones digitales con propósito
                  </h3>
                </div>
              </div>

              <div className="md:col-span-8 space-y-10 content-center ">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 items-center px-0 py-0 md:px-8 md:py-6" data-aos="fade-right">
                    <p className="text-[15px] text-[#6B6B6B] leading-[1.8] font-light">
                      Transformo ideas en experiencias digitales. Me dedico al desarrollo de sistemas web que no solo resuelven problemas, sino que también inspiran a quienes los utilizan.
                      Desarrollo sistemas pensados para impactar, optimizar procesos, automatizar tareas y ayudar a las empresas a reducir costos operativos mediante soluciones digitales.
                    </p> <br />
                    <p className="text-[15px] text-[#6B6B6B] leading-[1.8] font-light">
                      Con experiencia en desarrollo full-stack, me especializo en transformar 
                      ideas complejas en aplicaciones intuitivas y escalables, siempre con un 
                      enfoque innovador y la atención al detalle.
                    </p>
                  </div>
                  <div className="mt-6" data-aos="fade-left"> 
                    <Image
                    src="/perfil.webp"
                    alt="Erick Junior"
                    width={600}
                    height={600}
                    className="w-64 h-64 "
                  />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-neutral-200/50 text-center" data-aos="fade-up">
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-light text-[#1A1A1A]">3+</p>
                    <p className="text-[12px] text-[#6B6B6B] font-light tracking-wide uppercase">Años de experiencia</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl md:text-4xl font-light text-[#1A1A1A]">6+</p>
                    <p className="text-[12px] text-[#6B6B6B] font-light tracking-wide uppercase">Proyectos completados</p>
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <p className="text-3xl md:text-4xl font-light text-[#1A1A1A]">5+</p>
                    <p className="text-[12px] text-[#6B6B6B] font-light tracking-wide uppercase">Certificaciones</p>
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <p className="text-3xl md:text-4xl font-light text-[#1A1A1A]">6+</p>
                    <p className="text-[12px] text-[#6B6B6B] font-light tracking-wide uppercase">Recomendaciones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experiencia y Educación */}
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              <div data-aos="fade-right">
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-8 h-8 flex items-center justify-center border border-[#B4846C]/20 bg-[#B4846C]/5">
                    <Briefcase className="h-4 w-4 text-[#B4846C]" />
                  </div>
                  <h4 className="text-[11px] tracking-[0.3em] text-[#1A1A1A] font-light uppercase">
                    Experiencia Profesional
                  </h4>
                </div>
                
                <div className="space-y-10">
                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px">
                    <div className="absolute left-0 top-1/2 w-2 h-2 -ml-[3.5px] rounded-full bg-[#B4846C]"></div>
                    <p className="text-[10px] tracking-[0.2em] text-[#B4846C] font-light uppercase mb-3">2024 - 2025</p>
                    <h5 className="text-[17px] font-light text-[#1A1A1A] mb-2 tracking-tight">Desarrollador Full Stack</h5>
                    <p className="text-[13px] text-[#6B6B6B] font-light mb-3">Nuestros Pequeños Hermanos</p>
                    <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                      Participé en el desarrollo de un sistema de automatización de  procesos administrativos internos.
                    </p>
                  </div>
                  
                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px">
                    <div className="absolute left-0 top-1/2 w-2 h-2 -ml-[3.5px] rounded-full bg-[#B4846C]"></div>
                    <p className="text-[10px] tracking-[0.2em] text-[#B4846C] font-light uppercase mb-3">2023 - 2024</p>
                    <h5 className="text-[17px] font-light text-[#1A1A1A] mb-2 tracking-tight">Desarrollador Full Stack</h5>
                    <p className="text-[13px] text-[#6B6B6B] font-light mb-3">J&L Biker Cañete</p>
                    <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                      Desarrolle un sistema punto de venta e inventario permitiendo agilizar el stock de sus bienes.
                    </p>
                  </div>

                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px">
                    <div className="absolute left-0 top-1/2 w-2 h-2 -ml-[3.5px] rounded-full bg-[#B4846C]"></div>
                    <p className="text-[10px] tracking-[0.2em] text-[#B4846C] font-light uppercase mb-3">2022 - 2023</p>
                    <h5 className="text-[17px] font-light text-[#1A1A1A] mb-2 tracking-tight">Desarrollador Frontend</h5>
                    <p className="text-[13px] text-[#6B6B6B] font-light mb-3">San Isidro Labrador</p>
                    <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                      Desarrollé una plataforma web que permite fácilmente la información relevante sobre la institución.
                    </p>
                  </div>
                </div>
              </div>

              <div data-aos="fade-left">
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-8 h-8 flex items-center justify-center border border-[#8B9D83]/20 bg-[#8B9D83]/5">
                    <GraduationCap className="h-4 w-4 text-[#B4846C]" />
                  </div>
                  <h4 className="text-[11px] tracking-[0.3em] text-[#1A1A1A] font-light uppercase">
                    Educación y Certificaciones
                  </h4>
                </div>
                
                <div className="space-y-10">
                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px">
                    <div className="absolute left-0 top-1/2 w-2 h-2 -ml-[3.5px] rounded-full bg-[#B4846C]"></div>
                    <p className="text-[10px] tracking-[0.2em] text-[#B4846C] font-light uppercase mb-3">2022 - 2025</p>
                    <h5 className="text-[17px] font-light text-[#1A1A1A] mb-2 tracking-tight">Análisis de Sistemas</h5>
                    <p className="text-[13px] text-[#6B6B6B] font-light mb-3">Valle Grande</p>
                    <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                      Formación en análisis, diseño y desarrollo de sistemas informáticos, con enfoque en automatización de procesos y optimización de recursos.
                    </p>
                  </div>
                  
                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px">
                    <div className="absolute left-0 top-1/2 w-2 h-2 -ml-[3.5px] rounded-full bg-[#B4846C]"></div>
                    <p className="text-[10px] tracking-[0.2em] text-[#B4846C] font-light uppercase mb-3">2024</p>
                    <h5 className="text-[17px] font-light text-[#1A1A1A] mb-2 tracking-tight">Formacion Empresarial</h5>
                    <p className="text-[13px] text-[#6B6B6B] font-light mb-3">PAD Universidad de Piura</p>
                    <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                      Formación en dirección de proyectos, gestión de equipos y visión estratégica para entornos digitales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proyectos Section */}
        <section id="proyectos" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16" data-aos="fade-up">
              <p className="text-[11px] tracking-[0.3em] text-[#B4846C] font-light uppercase mb-4">
                Proyectos Seleccionados
              </p>
              <h3 className="text-3xl font-light text-[#1A1A1A] leading-tight">
                Trabajos recientes
              </h3>
            </div>

            <div className="space-y-24">
              {projects.slice(0, showCount).map((project, index) => (
                <div 
                  key={project.id} 
                  className={`grid md:grid-cols-2 gap-6 md:gap-12 items-center ${
                    index % 2 === 1 ? 'md:grid-flow-dense' : ''
                  }`} data-aos="fade-up"
                >
                  <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                    <div className=" from-[#B4846C]/5 to-[#8B9D83]/5 rounded-none overflow-hidden group">
                      <video
                        src={project.image} // Asegúrate de que project.video contenga la URL del video
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-all duration-500 scale-105 opacity-90"
                        autoPlay
                        loop
                        muted
                      />
                    </div>
                  </div>

                  <div className={`space-y-2 lg:space-y-6 ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                    <div>
                      <p className="text-[11px] tracking-[0.3em] text-[#B4846C] font-light uppercase mb-1 lg:mb-3">
                        {project.category}
                      </p>
                      <h4 className="text-2xl font-light text-[#1A1A1A] mb-1 lg:mb-4">
                        {project.title}
                      </h4>
                      <p className="text-[15px] text-[#6B6B6B] leading-relaxed font-light ">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="text-[11px] tracking-wide px-3 py-1.5 bg-white border border-neutral-200 text-[#6B6B6B] font-light"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Button 
                      asChild
                      variant="ghost"
                      className="text-[#1A1A1A] hover:text-[#B4846C] hover:bg-transparent p-0 h-auto text-[13px] tracking-wide font-light group"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        VER PROYECTO
                        <ArrowUpRight className="h-3 w-3 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {showCount < projects.length && (
              <div className="mt-20 text-center" data-aos="fade-up">
                <Button
                  onClick={() => setShowCount(prev => Math.min(prev + 3, projects.length))}
                  variant="ghost"
                  className="text-[#1A1A1A] hover:text-[#B4846C] hover:bg-transparent text-[13px] tracking-wide font-light"
                >
                  VER MÁS PROYECTOS
                  <ChevronDown className="h-3 w-3 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Habilidades Section */}
        <section id="habilidades" className="py-32 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center max-w-2xl mx-auto" data-aos="fade-up">
              <p className="text-[11px] tracking-[0.3em] text-[#B4846C] font-light uppercase mb-4">
                Habilidades
              </p>
              <h3 className="text-3xl font-light text-[#1A1A1A] leading-tight">
                Tecnologías y herramientas
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-12" >
              <div className="text-center space-y-4 p-8 border border-neutral-200 bg-[#FAFAF8]" data-aos="fade-up">
                <Code2 className="h-6 w-6 text-[#B4846C] mx-auto" />
                <h4 className="text-base font-light text-[#1A1A1A] tracking-wide">
                  Frontend
                </h4>
                <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                  Angular, React, Next.js, TypeScript, Tailwind CSS, Bootstrap, shadcn/ui
                </p>
              </div>

              <div className="text-center space-y-4 p-8 border border-neutral-200 bg-[#FAFAF8]" data-aos="fade-up">
                <Briefcase className="h-6 w-6 text-[#8B9D83] mx-auto" />
                <h4 className="text-base font-light text-[#1A1A1A] tracking-wide">
                  Backend
                </h4>
                <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                  Java Spring boot, Node.js, Express, JWT, PostgreSQL, Apps script
                </p>
              </div>

              <div className="text-center space-y-4 p-8 border border-neutral-200 bg-[#FAFAF8]" data-aos="fade-up">
                <Award className="h-6 w-6 text-[#B4846C] mx-auto" />
                <h4 className="text-base font-light text-[#1A1A1A] tracking-wide">
                  Herramientas
                </h4>
                <p className="text-[13px] text-[#6B6B6B] font-light leading-relaxed">
                  Git, Docker, Vercel, Render, Figma, Google Workspace, Canva, 
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios Section */}
        <section id="testimonios" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center max-w-2xl mx-auto" data-aos="fade-up">
              <p className="text-[11px] tracking-[0.3em] text-[#B4846C] font-light uppercase mb-4">
                Testimonios
              </p>
              <h3 className="text-3xl font-light text-[#1A1A1A] leading-tight">
                Mis recomendaciones 
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, showCountTestimonials).map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-white border border-neutral-200 p-8 space-y-6" data-aos="fade-up"
                >
                  <p className="text-[15px] text-[#6B6B6B] leading-relaxed font-light italic">
                    {testimonial.comment}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
                    <Avatar className="h-12 w-12 rounded-full">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback className="from-[#B4846C]/20 to-[#8B9D83]/20 text-[#1A1A1A] font-light">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-light text-[#1A1A1A]">{testimonial.name}</p>
                      <p className="text-[12px] text-[#6B6B6B] font-light">{testimonial.role}</p>
                      <p className="text-[11px] text-[#B4846C] font-light tracking-wide">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showCountTestimonials < testimonials.length && (
              <div className="mt-20 text-center" data-aos="fade-up">
                <Button
                  onClick={() => setShowCountTestimonials(prev => Math.min(prev + 3, testimonials.length))}
                  variant="ghost"
                  className="text-[#1A1A1A] hover:text-[#B4846C] hover:bg-transparent text-[13px] tracking-wide font-light"
                >
                  VER MÁS COMENTARIOS
                  <ChevronDown className="h-3 w-3 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Contacto Section */}
        <section id="contacto" className="py-32 px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center" data-aos="fade-up">
              <p className="text-[11px] tracking-[0.3em] text-[#B4846C] font-light uppercase mb-4">
                Contacto
              </p>
              <h3 className="text-3xl font-light text-[#1A1A1A] leading-tight mb-6">
                Trabajemos juntos
              </h3>
              <p className="text-[15px] text-[#6B6B6B] font-light max-w-xl mx-auto">
                Estoy disponible para nuevos proyectos y colaboraciones. 
                No dudes en contactarme para discutir tu próxima idea.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto" data-aos="fade-up">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[12px] tracking-wide text-[#1A1A1A] font-light uppercase">
                    Tus Datos
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nombres y Apellidos"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-neutral-300 rounded-none bg-[#FAFAF8] focus:border-[#B4846C] focus:ring-[#B4846C] font-light"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="asunto" className="text-[12px] tracking-wide text-[#1A1A1A] font-light uppercase">
                    Asunto
                  </Label>
                  <Input
                    id="asunto"
                    placeholder="Menciona el asunto"
                    value={formData.asunto}
                    onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                    className="border-neutral-300 rounded-none bg-[#FAFAF8] focus:border-[#B4846C] focus:ring-[#B4846C] font-light"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[12px] tracking-wide text-[#1A1A1A] font-light uppercase">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  placeholder="Escribe un mensaje..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="border-neutral-300 rounded-none bg-[#FAFAF8] focus:border-[#B4846C] focus:ring-[#B4846C] min-h-40 font-light"
                  required
                />
              </div>
              
              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  className="bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] px-12 py-6 text-[13px] tracking-wide font-light rounded-none"
                >
                  ENVIAR MENSAJE
                </Button>
              </div>
            </form>

            <div className="mt-16 flex justify-center gap-8" data-aos="fade-up">
              <a href="https://www.linkedin.com/in/erick-flores-lizarbe/" className="text-[13px] text-[#6B6B6B] hover:text-[#B4846C] transition-colors font-light tracking-wide">
                LinkedIn
              </a>
              <span className="text-[#6B6B6B]">•</span>
              <a href="mailto:erick.junior.developer@gmail.com" className="text-[13px] text-[#6B6B6B] hover:text-[#B4846C] transition-colors font-light tracking-wide">
                erick.junior.developer@gmail.com
              </a>
              <span className="text-[#6B6B6B]">•</span>
              <a href="#" className="text-[13px] text-[#6B6B6B] hover:text-[#B4846C] transition-colors font-light tracking-wide">
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-base font-light tracking-[0.3em] mb-4">ERICK JUNIOR</h3>
              <p className="text-[13px] text-neutral-400 font-light leading-relaxed">
                Desarrollador de sistemas especializado en crear experiencias web excepcionales.
              </p>
            </div>

            <div>
              <h4 className="text-[12px] tracking-[0.2em] font-light mb-4 text-neutral-400 uppercase">Navegación</h4>
              <nav className="flex flex-col gap-3">
                <button 
                  onClick={() => scrollToSection("inicio")}
                  className="text-[13px] text-neutral-400 hover:text-white transition-colors text-left font-light"
                >
                  Inicio
                </button>
                <button 
                  onClick={() => scrollToSection("sobre-mi")}
                  className="text-[13px] text-neutral-400 hover:text-white transition-colors text-left font-light"
                >
                  Sobre mí
                </button>
                <button 
                  onClick={() => scrollToSection("proyectos")}
                  className="text-[13px] text-neutral-400 hover:text-white transition-colors text-left font-light"
                >
                  Proyectos
                </button>
                <button 
                  onClick={() => scrollToSection("contacto")}
                  className="text-[13px] text-neutral-400 hover:text-white transition-colors text-left font-light"
                >
                  Contacto
                </button>
              </nav>
            </div>

            <div>
              <h4 className="text-[12px] tracking-[0.2em] font-light mb-4 text-neutral-400 uppercase">Redes</h4>
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-neutral-400 hover:text-white hover:bg-white/5 w-10 h-10 rounded-full"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-neutral-400 hover:text-white hover:bg-white/5 w-10 h-10 rounded-full"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-neutral-400 hover:text-white hover:bg-white/5 w-10 h-10 rounded-full"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-neutral-800 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-neutral-400 font-light tracking-wide">
              © 2025 Erick Junior. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-[12px] text-neutral-400">
              <button className="hover:text-white transition-colors font-light">
                Privacidad
              </button>
              <button className="hover:text-white transition-colors font-light">
                Términos
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}