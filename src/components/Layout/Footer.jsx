const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full z-10 relative mt-10">
      <div className="bg-primary h-[35px] flex items-center">
        <span className="text-center text-white p4">
          &copy; {currentYear} EWSD Group 9
        </span>
      </div>
    </footer>
  );
};

export default Footer;
