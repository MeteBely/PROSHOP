const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="">
        <div className="text-center py-3">
          <p>Proshop &copy; {year}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
