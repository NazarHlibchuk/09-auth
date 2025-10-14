import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Nazar Hlibchuk</p>
          <p>
            Contact us: <a href="mailto:123.nazar79@gmail.com">123.nazar79@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
