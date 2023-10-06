import React from "react";
import "../footer/Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer
        class="footer"
        style={{ backgroundColor: "rgb(255,255,255)", marginTop: "3rem" }}
      >
        <div class="footer__addr">
          <h1 class="footer__logo" style={{ fontWeight: "bolder" }}>
            Leo Sitter
          </h1>

          <h2>Contact</h2>

          <address>
            5534 Somewhere In. The World 22193-10212
            <br />
            <NavLink class="footer__btn" href="mailto:example@gmail.com">
              Email Us
            </NavLink>
          </address>
        </div>

        <ul class="footer__nav">
          <li class="nav__item">
            <h2 class="nav__title">Media</h2>

            <ul class="nav__ul">
              <li>
                <NavLink href="#">Online</NavLink>
              </li>

              <li>
                <NavLink href="#">Print</NavLink>
              </li>

              <li>
                <NavLink href="#">Alternative Ads</NavLink>
              </li>
            </ul>
          </li>

          <li class="nav__item nav__item--extra">
            <h2 class="nav__title">Technology</h2>

            <ul class="nav__ul nav__ul--extra">
              <li>
                <NavLink href="#">Hardware Design</NavLink>
              </li>

              <li>
                <NavLink href="#">Software Design</NavLink>
              </li>

              <li>
                <NavLink href="#">Digital Signage</NavLink>
              </li>

              <li>
                <NavLink href="#">Automation</NavLink>
              </li>

              <li>
                <NavLink href="#">Artificial Intelligence</NavLink>
              </li>

              <li>
                <NavLink href="#">IoT</NavLink>
              </li>
            </ul>
          </li>

          <li class="nav__item">
            <h2 class="nav__title">Legal</h2>

            <ul class="nav__ul">
              <li>
                <NavLink href="#">Privacy Policy</NavLink>
              </li>

              <li>
                <NavLink href="#">Terms of Use</NavLink>
              </li>

              <li>
                <NavLink href="#">Sitemap</NavLink>
              </li>
            </ul>
          </li>
        </ul>

        <div class="legal">
          <p>&copy; 2023 Something. All rights reserved.</p>

          <div class="legal__links">
            <span>
              Made with <span class="heart">Rana Uzair</span> remotely from PK
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
