import { linkWhatsapp } from "@/lib/site-config";

export function WhatsAppButton() {
  return (
    <a
      href={linkWhatsapp("Olá! Vi o site da Multiplic Imóveis e gostaria de mais informações.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.24-1.37a9.9 9.9 0 0 0 4.8 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.78 14.14c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.02.28-3.42-.7-2.9-1.16-4.72-4.1-4.86-4.3-.14-.2-1.16-1.55-1.16-2.96s.72-2.1.98-2.4c.24-.28.53-.34.7-.34s.35 0 .5.01c.16.01.37-.06.58.44.24.56.8 1.94.87 2.08.07.14.11.3.02.48-.09.18-.14.28-.28.44-.14.16-.29.36-.42.48-.14.14-.28.28-.12.56.16.28.7 1.16 1.52 1.88 1.05.93 1.93 1.22 2.2 1.36.28.14.44.12.6-.07.16-.2.7-.82.89-1.1.18-.28.37-.23.62-.14.25.09 1.6.76 1.87.9.27.14.45.2.52.32.07.12.07.68-.17 1.36Z" />
      </svg>
    </a>
  );
}
