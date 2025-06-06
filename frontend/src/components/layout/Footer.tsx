
import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 border-t mt-auto bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            <p>Contact: <a href="mailto:contact@nemosora.com" className="text-accent hover:underline">contact@nemosora.com</a></p>
          </div>
          <div>
            <p className="text-accent font-serif">Nemosora — Recall. Refine. Radiate.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
