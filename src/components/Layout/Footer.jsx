const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="py-4 text-center text-sm text-gray-400 flex items-center justify-center">
        &copy; {currentYear} EWSD Group 9
      </footer>
    );
  };
  
  export default Footer;