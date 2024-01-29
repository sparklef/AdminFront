export default function Footer() {
    return (
      <footer className="bg-dark" >
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light"><i className="fab fa-facebook"></i> Facebook</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light"><i className="fab fa-instagram"></i>   Instagram</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light"><i className="fab fa-linkedin"></i> LinkedIn</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light"><i className="fab fa-github"></i> GitHub</a>
          </li>
        </ul>
        <p className="nav justify-content-center pb-3 text-light">© 2024 Projet Cloud, Mr Rojo</p>
      </footer>
    );
  }
  