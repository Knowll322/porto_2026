import { useState, useEffect } from 'react';
import AccordionGallery from './components/AccordionGallery';
import OptionWheel from './components/OptionWheel';
import CurvedInput from './components/CurvedInput';
import CardNav from './components/CardNav';
import StaggeredMenu from './components/StaggeredMenu';
import FaultyTerminal from './components/FaultyTerminal';
import ThemeToggleButton from './components/ThemeToggle';
import BorderGlow from './components/BorderGlow';
import Skiper31 from './components/Skiper31';
import LineSidebar from './components/LineSidebar';
import Lanyard from './components/Lanyard';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [lang, setLang] = useState('id');
  const [isDark, setIsDark] = useState(false); // DEFAULT TO LIGHT THEME
  const [selectedWheelIndex, setSelectedWheelIndex] = useState(0);
  const [selectedEduIndex, setSelectedEduIndex] = useState(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [navStyle, setNavStyle] = useState('cardNav'); // 'cardNav' | 'staggeredMenu'

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  const staggeredMenuItems = [
    { label: lang === 'id' ? 'Beranda' : 'Home', ariaLabel: 'Home', link: '#' },
    { label: lang === 'id' ? 'Pendidikan' : 'Education', ariaLabel: 'Education', link: '#education' },
    { label: lang === 'id' ? 'Roda Opsi' : 'Option Wheel', ariaLabel: 'Option Wheel', link: '#wheel-section' },
    { label: lang === 'id' ? 'Galeri Akordeon' : 'Accordion Gallery', ariaLabel: 'Accordion Gallery', link: '#showcase' },
    { label: lang === 'id' ? 'Pengalaman' : 'Experience', ariaLabel: 'Experience', link: '#experience' },
    { label: lang === 'id' ? 'Kontak' : 'Contact', ariaLabel: 'Contact', link: '#contact' }
  ];

  const staggeredSocialItems = [
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'Instagram', link: 'https://instagram.com' }
  ];

  // AMERICAN RETRO DYNAMIC CARD NAV ITEMS
  const cardNavItems = [
    {
      label: lang === 'id' ? 'Pendidikan' : 'Education',
      bgColor: isDark ? '#282522' : '#e2e8f0',
      textColor: isDark ? '#DCC9A9' : '#1A1918',
      links: [
        { label: lang === 'id' ? 'Pendidikan' : 'Education', href: '#education', ariaLabel: 'Education' }
      ]
    },
    {
      label: lang === 'id' ? 'Karya' : 'Showcase',
      bgColor: isDark ? '#4E6851' : '#282522',
      textColor: '#DCC9A9',
      links: [
        { label: lang === 'id' ? 'Galeri Akordeon' : 'Accordion Gallery', href: '#showcase', ariaLabel: 'Featured Projects' },
        { label: lang === 'id' ? 'Roda Keahlian' : 'Skill Wheel', href: '#wheel-section', ariaLabel: 'Skill Wheel' }
      ]
    },
    {
      label: lang === 'id' ? 'Kontak' : 'Contact',
      bgColor: isDark ? '#B83A2D' : '#B83A2D',
      textColor: isDark ? '#DCC9A9' : '#DCC9A9',
      links: [
        { label: lang === 'id' ? 'Kirim Email' : 'Email Zain', href: 'mailto:zainyarfa@gmail.com', ariaLabel: 'Email Zain' },
        { label: lang === 'id' ? 'Form Lengkung' : 'Curved Input Form', href: '#contact', ariaLabel: 'Curved Input Form' }
      ]
    }
  ];

  const educationItems = [
    'UDINUS Semarang (2026 — Sekarang)',
    'SMK Hidayah (2023 — 2026)',
    'SMP Negeri 1 Madukara (2020 — 2023)',
    'SD Negeri Kutayasa (2014 — 2020)'
  ];

  const educationDetails = [
    {
      period: '2026 — Sekarang',
      title: 'Universitas Dian Nuswantoro (UDINUS) Semarang',
      degree: 'S1 Ilmu Komunikasi',
      icon: 'fa-university',
      desc: lang === 'id'
        ? 'Mengintegrasikan strategi komunikasi digital, komunikasi pemasaran, serta keahlian teknologi web fullstack.'
        : 'Integrating digital communication strategy, marketing communications, and fullstack web skillsets.'
    },
    {
      period: '2023 — 2026',
      title: 'SMK Hidayah',
      degree: 'Pengembangan Web & Multimedia',
      icon: 'fa-school',
      desc: lang === 'id'
        ? 'Mempelajari fondasi dasar pemrograman web frontend, desain visual Canva Pro, serta perancangan media interaktif.'
        : 'Studied core web development, Canva Pro visual design, and interactive media creation.'
    },
    {
      period: '2020 — 2023',
      title: 'SMP Negeri 1 Madukara',
      degree: 'Pendidikan Menengah Pertama',
      icon: 'fa-book-reader',
      desc: lang === 'id'
        ? 'Pengembangan potensi akademik awal, keorganisasian sekolah, dan pengenalan ilmu komputer dasar.'
        : 'Early academic growth, student organizational skills, and foundational computer literacy.'
    },
    {
      period: '2014 — 2020',
      title: 'SD Negeri Kutayasa',
      degree: 'Pendidikan Dasar Pertama',
      icon: 'fa-pencil-alt',
      desc: lang === 'id'
        ? 'Pembentukan fondasi karakter, logika dasar, dan minat awal terhadap teknologi informasi.'
        : 'Foundational character building, basic logic, and early passion for digital technology.'
    }
  ];

  const wheelItems = [
    'Fullstack Web',
    'Canva Design',
    'PPT Pitch Deck',
    'Strategic Comm',
    'Brand Identity',
    'Global Clients'
  ];

  const wheelDetails = [
    {
      title: 'Fullstack Web Development',
      icon: 'fa-code',
      desc: lang === 'id' 
        ? 'Membangun aplikasi web responsif berkinerja tinggi dari Frontend (React, Vue, HTML/CSS) hingga Backend (Node.js, Express, PHP, MySQL).' 
        : 'Building high-performance responsive web apps from Frontend (React, Vue, HTML/CSS) to Backend (Node.js, Express, PHP, MySQL).'
    },
    {
      title: 'Canva Pro & Visual Design',
      icon: 'fa-palette',
      desc: lang === 'id' 
        ? 'Mendesain materi grafis profesional, media sosial kit, poster, dan brand asset berkualitas tinggi menggunakan Canva Pro.' 
        : 'Designing professional graphic assets, social media kits, posters, and brand elements using Canva Pro.'
    },
    {
      title: 'Custom PPT Pitch Deck',
      icon: 'fa-file-powerpoint',
      desc: lang === 'id' 
        ? 'Merancang presentasi PowerPoint manual premium untuk investor pitch deck dan profil perusahaan yang memikat pendana.' 
        : 'Crafting bespoke, high-converting manual PowerPoint presentations for investor pitch decks and corporate profiles.'
    },
    {
      title: 'Strategic Communication (UDINUS)',
      icon: 'fa-bullhorn',
      desc: lang === 'id' 
        ? 'Latar belakang Ilmu Komunikasi Universitas Dian Nuswantoro untuk menyusun pesan branding & strategi komunikasi pemasaran digital.' 
        : 'UDINUS Communication Science background for crafting precise digital marketing communication & branding strategy.'
    },
    {
      title: 'Corporate Brand Identity',
      icon: 'fa-vector-square',
      desc: lang === 'id' 
        ? 'Menciptakan identitas visual merek yang konsisten dari logo, palet warna, tipografi, hingga panduan gaya brand.' 
        : 'Creating comprehensive visual brand identity from logos, color palettes, typography to full brand style guides.'
    },
    {
      title: 'International Client Experience',
      icon: 'fa-globe',
      desc: lang === 'id' 
        ? 'Pengalaman magang industri kreatif menangani 95% klien internasional dengan standar komunikasi lintas budaya yang profesional.' 
        : 'Creative agency internship experience handling 95% global clients with professional cross-cultural standards.'
    }
  ];

  const galleryItems = [
    {
      image: '/ilkom-udinus-project.png',
      label: 'ILKOM UDINUS — Bukan Cuma Ngomong, Tapi Bikin Dampak',
      link: '#showcase'
    },
    {
      image: '/giglio-project.png',
      label: 'GIGLIO — Define Your Everyday Elegance (Collection 2024)',
      link: '#showcase'
    }
  ];

  const handleCurvedSubmit = (val) => {
    if (val && val.trim()) {
      setSubmittedEmail(val);
      setContactSubmitted(true);
      setTimeout(() => setContactSubmitted(false), 5000);
    }
  };

  return (
    <div className={`portfolio-app ${isDark ? 'dark-mode' : 'light-mode'}`}>
      {/* REACT BITS FULLSCREEN FAULTY TERMINAL BACKGROUND */}
      <div className="fullscreen-faulty-terminal-bg">
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={isDark ? 0.5 : 0.25}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={0.8}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint={isDark ? "#B83A2D" : "#4E6851"}
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={isDark ? 0.5 : 0.75}
        />
      </div>

      {/* REACT BITS NAVIGATION COMPONENTS */}
      {navStyle === 'cardNav' ? (
        <CardNav
          items={cardNavItems}
          baseColor={isDark ? "#1A1918" : "#DCC9A9"}
          menuColor={isDark ? "#DCC9A9" : "#1A1918"}
          buttonBgColor="#B83A2D"
          buttonTextColor="#DCC9A9"
          ctaText={lang === 'id' ? 'Sewa Saya' : 'Hire Me'}
          ease="power3.out"
        />
      ) : (
        <StaggeredMenu
          position="right"
          items={staggeredMenuItems}
          socialItems={staggeredSocialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor={isDark ? "#DCC9A9" : "#1A1918"}
          openMenuButtonColor={isDark ? "#DCC9A9" : "#1A1918"}
          colors={isDark ? ['#282522', '#B83A2D', '#1A1918'] : ['#4E6851', '#B83A2D', '#DCC9A9']}
          accentColor="#B83A2D"
          isFixed={true}
        />
      )}

      {/* FIXED BOTTOM LEFT FLOATING BAR FOR NAV SWITCHER, LANGUAGE & THEME TOGGLE */}
      <div className="bottom-left-bar">
        <ThemeToggleButton 
          isDark={isDark} 
          onToggle={(nextState) => setIsDark(nextState)} 
          variant="circle" 
          start="bottom-left" 
        />

        <div className="nav-toggle-switch">
          <button 
            className={navStyle === 'cardNav' ? 'active' : ''} 
            onClick={() => setNavStyle('cardNav')}
            title="CardNav"
          >
            <i className="fas fa-layer-group"></i> CardNav
          </button>
          <button 
            className={navStyle === 'staggeredMenu' ? 'active' : ''} 
            onClick={() => setNavStyle('staggeredMenu')}
            title="StaggeredMenu"
          >
            <i className="fas fa-bars"></i> Staggered
          </button>
        </div>

        <div className="lang-switcher">
          <button className={lang === 'id' ? 'active' : ''} onClick={() => setLang('id')}>ID</button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
        </div>
      </div>

      {/* HERO SECTION WITH 3D LANYARD CARD ON THE LEFT SIDE */}
      <header className="hero-section">
        <div className="hero-grid-container">
          {/* LEFT SIDE: 3D LANYARD ID CARD */}
          <div className="hero-left-card">
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} lanyardWidth={1} />
          </div>

          {/* RIGHT SIDE: HERO CONTENT */}
          <div className="hero-right-content">
            <div className="hero-badge">
              <i className="fas fa-sparkles"></i> Fullstack Dev & Creative Designer
            </div>
            <h1>
              {lang === 'id' ? 'Halo, Saya' : "Hello, I'm"}{' '}
              <span className="gradient-text">Zain Yarfa Mubarok</span>
            </h1>
            <p className="hero-lead">
              {lang === 'id'
                ? 'Mahasiswa Ilmu Komunikasi UDINUS yang menggabungkan coding fullstack, desain kreatif Canva/PPT, dan komunikasi strategis untuk klien internasional.'
                : 'UDINUS Communication Science student combining fullstack web development, Canva/PPT design, and strategic communication for global clients.'}
            </p>
            <div className="hero-btns">
              <a href="#showcase" className="btn btn-primary">
                <i className="fas fa-eye"></i> {lang === 'id' ? 'Lihat Galeri Live' : 'View Live Gallery'}
              </a>
              <a href="#wheel-section" className="btn btn-outline">
                <i className="fas fa-dharmachakra"></i> {lang === 'id' ? 'Putar Roda Opsi' : 'Spin Option Wheel'}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* EDUCATION SECTION INTEGRATED WITH REACT BITS LINE SIDEBAR */}
      <section id="education" className="education-section">
        <div className="section-container">
          <div className="section-head">
            <span className="badge-tag"><i className="fas fa-graduation-cap"></i> BITS LINE SIDEBAR</span>
            <h2>{lang === 'id' ? 'Peta Perjalanan Pendidikan' : 'Education Roadmap Path'}</h2>
            <p>{lang === 'id' ? 'Sorot atau klik jenjang pendidikan di sebelah kiri untuk melihat detail perjalanannya.' : 'Hover or click education levels on the left to inspect detailed milestones.'}</p>
          </div>

          <div className="education-sidebar-layout">
            <div className="education-sidebar-wrap">
              <LineSidebar
                items={educationItems}
                accentColor="#B83A2D"
                textColor={isDark ? "#DCC9A9" : "#1A1918"}
                markerColor={isDark ? "#4E6851" : "#B83A2D"}
                showIndex={true}
                showMarker={true}
                proximityRadius={120}
                maxShift={25}
                falloff="smooth"
                markerLength={50}
                markerGap={10}
                tickScale={0.5}
                scaleTick={true}
                itemGap={24}
                fontSize={0.95}
                smoothing={100}
                defaultActive={0}
                onItemClick={(index) => setSelectedEduIndex(index)}
              />
            </div>

            <div className="education-detail-card">
              <div className="node-badge">
                <i className={`fas ${educationDetails[selectedEduIndex].icon}`}></i>
              </div>
              <span className="node-period">{educationDetails[selectedEduIndex].period}</span>
              <h4>{educationDetails[selectedEduIndex].title}</h4>
              <span className="node-degree">{educationDetails[selectedEduIndex].degree}</span>
              <p>{educationDetails[selectedEduIndex].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKIPER UI 31 SCROLL ANIMATION COMPONENT */}
      <Skiper31 />

      {/* OPTION WHEEL INTEGRATION SECTION */}
      <section id="wheel-section" className="wheel-section">
        <div className="section-container">
          <div className="section-head">
            <span className="badge-tag"><i className="fas fa-sliders-h"></i> BITS OPTION WHEEL</span>
            <h2>{lang === 'id' ? 'Pilih Keahlian dengan Roda Interaktif' : 'Explore Skills via Option Wheel'}</h2>
            <p>{lang === 'id' ? 'Putar atau drag roda opsi di sebelah kiri untuk melihat detail keahlian Zain.' : 'Drag or scroll the wheel on the left to inspect Zain\'s key expertise.'}</p>
          </div>

          <div className="wheel-layout">
            <div className="wheel-container">
              <OptionWheel
                items={wheelItems}
                defaultSelected={0}
                side="left"
                fontSize={2.2}
                spacing={1.4}
                curve={1}
                tilt={6}
                blur={1.8}
                fade={0.25}
                smoothing={180}
                inset={30}
                draggable={true}
                activeColor={isDark ? "#B83A2D" : "#1A1918"}
                textColor={isDark ? "#C8B696" : "#4E6851"}
                onChange={(idx) => setSelectedWheelIndex(idx)}
              />
            </div>

            <div className="wheel-detail-card">
              <div className="detail-icon">
                <i className={`fas ${wheelDetails[selectedWheelIndex].icon}`}></i>
              </div>
              <span className="detail-step">0{selectedWheelIndex + 1} / 0{wheelItems.length}</span>
              <h3>{wheelDetails[selectedWheelIndex].title}</h3>
              <p>{wheelDetails[selectedWheelIndex].desc}</p>
              <div className="detail-tags">
                <span className="tag">UDINUS</span>
                <span className="tag">95% Global</span>
                <span className="tag">Fullstack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCORDION GALLERY INTEGRATION SECTION */}
      <section id="showcase" className="gallery-section">
        <div className="section-container">
          <div className="section-head">
            <span className="badge-tag"><i className="fas fa-layer-group"></i> BITS ACCORDION</span>
            <h2>{lang === 'id' ? 'Galeri Akordeon Interaktif' : 'Interactive Accordion Gallery'}</h2>
            <p>{lang === 'id' ? 'Arahkan kursor atau sentuh panel untuk mengeksplorasi karya visual pilihan.' : 'Hover or tap panels to explore featured visual works.'}</p>
          </div>

          <div className="accordion-wrapper">
            <AccordionGallery
              items={galleryItems}
              defaultIndex={2}
              expandRatio={0.55}
              height={480}
              gap={14}
              radius={20}
              accentColor="#B83A2D"
              overlayColor="#1A1918"
              textColor="#DCC9A9"
              trigger="hover"
              tilt={4}
              parallax={0.25}
              grayscale={false}
              duration={0.85}
              ease="power4.out"
            />
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="skills-section">
        <div className="section-container">
          <div className="section-head">
            <span className="badge-tag"><i className="fas fa-bolt"></i> SKILLSET</span>
            <h2>{lang === 'id' ? 'Perpaduan Tiga Keahlian' : 'Triple Core Skillset'}</h2>
          </div>

          <div className="skills-grid">
            <div className="skill-card">
              <div className="icon-box"><i className="fas fa-code"></i></div>
              <h3>Fullstack Web</h3>
              <p>HTML5, CSS3, JavaScript, React.js, Node.js, PHP, MySQL, REST API</p>
            </div>
            <div className="skill-card">
              <div className="icon-box"><i className="fas fa-palette"></i></div>
              <h3>Creative Design</h3>
              <p>Canva Pro, Pitch Deck PPT Manual, Brand Identity, Visual Storytelling</p>
            </div>
            <div className="skill-card">
              <div className="icon-box"><i className="fas fa-comments"></i></div>
              <h3>Strategic Comm</h3>
              <p>Mahasiswa UDINUS, Client Relations, Cross-Cultural Communication (95% Global)</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION WITH BORDER GLOW INTEGRATION */}
      <section id="experience" className="experience-section">
        <div className="section-container">
          <div className="section-head">
            <span className="badge-tag"><i className="fas fa-magic"></i> BITS BORDER GLOW</span>
            <h2>{lang === 'id' ? 'Pengalaman Agensi & Internasional' : 'Agency & Global Experience'}</h2>
          </div>

          <BorderGlow
            edgeSensitivity={30}
            glowColor="184 58 45"
            backgroundColor={isDark ? "#282522" : "#DCC9A9"}
            borderRadius={20}
            glowRadius={40}
            glowIntensity={1.2}
            coneSpread={25}
            animated={true}
            colors={['#B83A2D', '#DCC9A9', '#4E6851']}
          >
            <div className="exp-card-full">
              <div className="exp-icon"><i className="fas fa-laptop-code"></i></div>
              <div className="exp-content">
                <h3>Pelatihan Fullstack Web Developer — Crocodic</h3>
                <span className="exp-agency">Crocodic Studio</span>
                <p>
                  {lang === 'id'
                    ? 'Berhasil menyelesaikan program pelatihan intensif pengembangan web fullstack di Crocodic Studio. Menguasai arsitektur sistem web modern, logika database, dan pengembangan aplikasi tingkat lanjut.'
                    : 'Successfully completed intensive fullstack web development training at Crocodic Studio. Mastered modern web architecture, database design, and advanced app development.'}
                </p>
              </div>
            </div>
          </BorderGlow>

          <div style={{ marginTop: '1.25rem' }}>
            <BorderGlow
              edgeSensitivity={30}
              glowColor="184 58 45"
              backgroundColor={isDark ? "#282522" : "#DCC9A9"}
              borderRadius={20}
              glowRadius={40}
              glowIntensity={1.2}
              coneSpread={25}
              animated={true}
              colors={['#B83A2D', '#4E6851', '#DCC9A9']}
            >
              <div className="exp-card-full">
                <div className="exp-icon"><i className="fas fa-user-shield"></i></div>
                <div className="exp-content">
                  <h3>Pelatihan Cybersecurity — Telkom Indonesia</h3>
                  <span className="exp-agency">Telkom Indonesia • Cybersecurity Specialist Program</span>
                  <p>
                    {lang === 'id'
                      ? 'Mengikuti program pelatihan dan pengembangan keahlian Cybersecurity dari Telkom Indonesia. Menguasai fondasi keamanan siber, proteksi sistem jaringan, analisis kerentanan aplikasi web, serta audit keamanan informasi.'
                      : 'Participated in the Cybersecurity training program by Telkom Indonesia. Mastered cybersecurity fundamentals, network protection, web vulnerability assessment, and information security auditing.'}
                  </p>
                </div>
              </div>
            </BorderGlow>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <BorderGlow
              edgeSensitivity={30}
              glowColor="78 104 81"
              backgroundColor={isDark ? "#282522" : "#DCC9A9"}
              borderRadius={20}
              glowRadius={40}
              glowIntensity={1.2}
              coneSpread={25}
              animated={true}
              colors={['#4E6851', '#DCC9A9', '#B83A2D']}
            >
              <div className="exp-card-full">
                <div className="exp-icon"><i className="fas fa-globe"></i></div>
                <div className="exp-content">
                  <h3>Creative Developer & Designer Intern</h3>
                  <span className="exp-agency">Creative Industry Agency (2024) • 95% Klien Luar Negeri</span>
                  <p>
                    {lang === 'id'
                      ? 'Bertanggung jawab dalam pembuatan website, desain grafis Canva Pro, presentasi pitch deck manual, serta komunikasi strategis langsung dengan 95% klien internasional.'
                      : 'Responsible for web development, Canva Pro graphic design, manual pitch decks, and direct strategic communication with 95% international clients.'}
                  </p>
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION WITH CURVED INPUT INTEGRATION */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <div className="contact-card">
            <span className="badge-tag"><i className="fas fa-envelope-open-text"></i> BITS CURVED INPUT</span>
            <h2>{lang === 'id' ? 'Mari Berkolaborasi Proyek Baru' : 'Let\'s Work Together'}</h2>
            <p>{lang === 'id' ? 'Ketikkan email Anda pada form lengkung di bawah ini untuk memulai konsultasi proyek.' : 'Enter your email in the curved bar below to start project consultation.'}</p>
            
            <div className="curved-input-wrapper">
              <CurvedInput
                placeholder={lang === 'id' ? 'Ketik email atau pesan Anda...' : 'Enter your email or message...'}
                buttonText={lang === 'id' ? 'Kirim Pesan' : 'Get Started'}
                theme="dark"
                bend={26}
                height={66}
                width="100%"
                fontSize={16}
                buttonColor="#B83A2D"
                backgroundColor="#1A1918"
                borderColor="rgba(184, 58, 45, 0.4)"
                onSubmit={handleCurvedSubmit}
              />
            </div>

            {contactSubmitted && (
              <div className="submit-toast">
                <i className="fas fa-check-circle"></i>{' '}
                {lang === 'id' 
                  ? `Terima kasih! Pesan dari (${submittedEmail}) me-reach Zain.` 
                  : `Thank you! Message from (${submittedEmail}) reached Zain.`}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Zain Yarfa Mubarok. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
